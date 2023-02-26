import axios from "axios";
import React from "react";
import OrgChart from "./mytree";
import axiosInstance from "../../helper/helper";
import { baseUrl } from "../../config";
import {
    getAllNodeByIdURI,
    getAllNodeURI,
    updateNodeMappingURI,
    addSupervisorURI,
} from "../../helper/urlConfig";
import { useSelector } from "react-redux";
import SearchBar from "./searchBar";
import {
    GET,
    DELETE,
    POST,
    createGoal,
    createUser,
    deleteTacticData,
    addCreatedUserToSupervisor,
} from "../../helper/service";
import { useForm } from "react-hook-form";
import Toast from "../../view/common/Toast";
import { toast } from "react-toastify";
import AddSupervisor from "./addSupervisor";
import Loader from "../../view/common/Loader";

import { Modal, Button, Form } from "react-bootstrap";
import SearchSupervisor from "./SearchSupervisor";


const FORM_DEFAULT_VALUES = {
    file: undefined,
    fname: "",
    lname: "",
    email: "",
    password: "",
};

export default function Chart() {
    const auth = useSelector((state) => state.auth);
    const token = auth.token;
    const chartRef = React.useRef();

    const [userOrgData, setUserOrgData] = React.useState([]);
    const [values, setValues] = React.useState(FORM_DEFAULT_VALUES);
    const { register, handleSubmit, formState, getValues, setValue, watch } =
        useForm({
            mode: "all",
            reValidateMode: "onChange",
            defaultValues: FORM_DEFAULT_VALUES,
            criteriaMode: "all",
        });
  console.log("userOrg data : ",userOrgData);
    const [fname, lname, email, file] = watch([
        "fname",
        "lname",
        "email",
        "file",
    ]);

    const [profileImage, setProfileImage] = React.useState(null);

    const { dirtyFields, touchedFields, isValid, isValidating, errors } =
        formState;

    const [userList, setUserList] = React.useState([]);
    const [userId, setUserId] = React.useState();
    const [error, setError] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [show, setShow] = React.useState(false);

    const [showAddUser, setShowAddUser] = React.useState(false);
    const [generatedChartNodeData, setGeneratedChartNodeData] = React.useState({
        nodeId: undefined,
        nodePid: undefined,
        nodeMenuId: undefined,
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowAddUser = () => setShowAddUser(true);

    const handleShowUserAddClose = (removing = true) => {
        if (
            chartRef.current !== undefined &&
            generatedChartNodeData.nodeId !== null &&
            removing
        ) {
            chartRef.current.removeNode(generatedChartNodeData.nodeId);
        }
        setShowAddUser(false);
    };

    const [loader, setLoader] = React.useState(false);
    const [searchLoader, setSearchLoader] = React.useState(false);
    const [userNotExist, setUserNotExist] = React.useState(false);
    const [selectedSupervisor, setSelectedSupervisor] = React.useState(null);
    const [userForAddingSupervisor, setUserForAddingSupervisor] =
        React.useState(null);

    React.useEffect(() => {
        
        if (file !== undefined && Object.keys(file).length > 0) {
            const foundFile = file[0];
            setProfileImage(URL.createObjectURL(foundFile));
            setValues({ ...getValues(), ...{ profileImage: foundFile } });
        }
    }, [file]);

    React.useEffect(() => {
        console.log("in use-effect with query");
        let timeoutId;

        if (query) {
            timeoutId = setTimeout(() => {
                fetchUsers(query);
            }, 1000);
        } else {
            setUserList([]);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [query]);

    const getOrgTreeData = () => {
        console.log("calling getOrgTreeData");
        setLoader(true);
        axios
            .get(getAllNodeURI, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            })
            .then((res) => {
                let resTemp = [];
                res.data.data.map((arr) => {
                    resTemp.push(arr);
                });
                setUserOrgData(resTemp);
                setError(false);
                setLoader(false);
            })
            .catch((err) => {
                setError(true);
                setLoader(false);
            });
    };

    const getOrgTreeDataWithUserID = React.useCallback(
        (userId) => {
            console.log("calling getOrgTreeDateWithUserID");
            setLoader(true);

            axios
                .get(getAllNodeByIdURI + userId, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                })
                .then((res) => {
                    setUserNotExist(false);
                    if (res.data.message === "user not found") {
                        setUserNotExist(true);
                    }
                    let resTemp = [];
                    res.data.data.map((arr) => {
                        resTemp.push(arr);
                    });
                    setUserOrgData(resTemp);
                    setError(false);
                    setLoader(false);
                })
                .catch((err) => {
                    setError(true);
                    setLoader(false);
                    setUserNotExist(false);
                });
        },
        [token],
    );

    const updateTheNode = React.useCallback(
        (supervisorId, userId) => {
            setLoader(true);
            axios
                .put(
                    updateNodeMappingURI,
                    {
                        supervisorId: supervisorId,
                        employeeId: userId,
                    },
                    {
                        headers: {
                            Authorization: token ? `Bearer ${token}` : "",
                        },
                    },
                )
                .then((res) => {
                    if (res.status === 200) {
                        getOrgTreeDataWithUserID(supervisorId);

                        setError(false);
                        setLoader(false);
                    }
                })
                .catch((err) => {
                    alert("something went wrong while Updating the node");
                    setLoader(false);
                });
        },
        [getOrgTreeDataWithUserID],
    );

    const fetchUsers = React.useCallback(
        (value) => {
            setSearchLoader(true);
            let key = value;
            const url = baseUrl + "/users/search?search_name=" + key;
            GET(url, token)
                .then((response) => {
                    let newArray = [];
                    response.map((user) => {
                        return newArray.push({ label: user.name, id: user.id });
                    });
                    setUserList(newArray);
                    setSearchLoader(false);
                })
                .catch(() => {
                    setError(true);
                    setSearchLoader(false);
                });
        },
        [token],
    );

    const selectUser = (user) => {
        let id = user.id;
        setUserForAddingSupervisor(user);
        getOrgTreeDataWithUserID(id);
    };

    const selectSupervisor = (supervisor) => {
        setSelectedSupervisor(supervisor);
    };

    const addSupervisor = () => {
        let supervisorId = selectedSupervisor.id;
        let employeeId = userForAddingSupervisor.id;

        setLoader(true);

        axios
            .post(
                addSupervisorURI,
                {
                    supervisorId: supervisorId,
                    employeeId: employeeId,
                },
                {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                },
            )
            .then((res) => {
                getOrgTreeDataWithUserID(employeeId);
            })
            .catch((err) => {
                alert("something went wrong not able to add supervisor");
                setLoader(false);
            });
    };

    React.useEffect(() => {
        getOrgTreeData();
    }, [userId]);

    const handleClickOnTheNode = React.useCallback((id) => {
        setUserId(id);
    }, []);

    const handleDropOnTheNode = React.useCallback(
        (supervisorId, userId) => {
            updateTheNode(supervisorId, userId);
        },
        [updateTheNode],
    );

    const showModal = React.useCallback(() => {
        fetchUsers("");
        handleShow();
    }, [fetchUsers]);

    const showCreateUserModal = React.useCallback((nodeData) => {
        setGeneratedChartNodeData((oldGeneratedData) => ({
            ...oldGeneratedData,
            ...nodeData,
        }));
        handleShowAddUser();
    }, []);

    const handleOpen = () => {
        fetchUsers("");
        addSupervisor();
    };

    const onSubmit = async () => {
       
        if (!isValid || isValidating) setError(true);
        else {
            setLoader(true);
            let createdUserResponse = undefined;
            try {
                createdUserResponse = await toast.promise(
                    createUser(
                        {
                            ...values,
                            ...{ pid: generatedChartNodeData.nodePid },
                        },
                        token,
                    ),
                    {
                        pending: "Adding User...",
                        error: "Failed to add user",
                        success: "Added user successfully!",
                    },
                );
            } catch {
                toast.error("User already exist");
                setLoader(false);
                return;
            }

           
                const { id } = createdUserResponse;

                setLoader(false);

                const updatedNode = chartRef.current.getNode(
                    generatedChartNodeData.nodeId,
                );
                updatedNode.name = `${fname} ${lname}`;
                updatedNode.email = email;

                updatedNode.profileImage = profileImage;

                chartRef.current.updateNode(updatedNode);
                const didSucceed = addCreatedUserToSupervisor(
                    generatedChartNodeData.nodeMenuId,
                    id,
                    token,
                );

                if (didSucceed) {
                    toast.success(
                        "Successfully added supervisor to created user!",
                    );
                } else {
                    toast.error("Failed to add supervisor to created user!");
                }
          
        }

        handleShowUserAddClose(false);
    };

    if (error) {
        return <div>Something went wrong please refresh the page</div>;
    }

    return (
        <>
            <Loader loading={loader} />
            <Toast />
            <SearchBar
                fetchUsers={setQuery}
                userList={userList}
                selectUser={selectUser}
                loader={searchLoader}
            />
            {userNotExist ? (
                <AddSupervisor
                    userForAddingSupervisor={userForAddingSupervisor}
                    fetchUsers={setQuery}
                    userList={userList}
                    selectSupervisor={selectSupervisor}
                    loader={searchLoader}
                    addSupervisor={addSupervisor}
                />
            ) : (
                <div
                    style={{ height: "100%", width: "100%", color: "#b7c4d1" }}
                >
                    {
                        <OrgChart
                            chartRef={chartRef}
                            nodes={userOrgData}
                            handleClickOnTheNode={handleClickOnTheNode}
                            handleDropOnTheNode={handleDropOnTheNode}
                            getOrgTreeDataWithUserId={getOrgTreeDataWithUserID}
                            showModal={showModal}
                            showCreateUserModal={showCreateUserModal}
                            setNodeMenuId={(nodeId) =>
                                setGeneratedChartNodeData(
                                    (oldGeneratedNodeChartData) => ({
                                        ...oldGeneratedNodeChartData,
                                        nodeMenuId: nodeId,
                                    }),
                                )
                            }
                        />
                    }
                </div>
            )}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Supervisor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SearchSupervisor
                        fetchUsers={setQuery}
                        userList={userList}
                        selectSupervisor={selectSupervisor}
                        loader={loader}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleOpen}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showAddUser} onHide={handleShowUserAddClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form autoComplete="off">
                        <Form.Group className="mb-3" controlId="fname_form">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                {...register("fname", {
                                    required: {
                                        value: true,
                                        message: "First Name is required",
                                    },
                                    minLength: {
                                        value: 3,
                                        message:
                                            "First name must be at least 3 characters",
                                    },
                                })}
                                isValid={dirtyFields.fname && !errors.fname}
                                isInvalid={errors.fname}
                                placeholder="Enter first name"
                            />
                            {errors.fname && (
                                <Form.Control.Feedback type="invalid">
                                    <span>{errors.fname.message}</span>
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="lname_form">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                {...register("lname", {
                                    required: {
                                        value: true,
                                        message: "Last Name is required",
                                    },
                                    minLength: {
                                        value: 3,
                                        message:
                                            "Last name must be at least 3 characters",
                                    },
                                })}
                                isValid={dirtyFields.lname && !errors.lname}
                                isInvalid={errors.lname}
                                placeholder="Enter last name"
                            />
                            {errors.lname && (
                                <Form.Control.Feedback type="invalid">
                                    {" "}
                                    <span>{errors.lname.message}</span>
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email_form">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="email"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is required",
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Please Enter A Valid Email!",
                                    },
                                })}
                                isValid={dirtyFields.email && !errors.email}
                                isInvalid={errors.email}
                                placeholder="Enter email"
                            />
                            {errors.email && (
                                <Form.Control.Feedback type="invalid">
                                    {" "}
                                    <span className="error-msg">
                                        {errors.email.message}
                                    </span>
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password_form">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                autoComplete="new-password"
                                type="password"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required",
                                    },
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Password must be at least eight characters",
                                    },
                                    validate: (value) => {
                                        return (
                                            [
                                                /[a-z]/,
                                                /[A-Z]/,
                                                /[0-9]/,
                                                /[^a-zA-Z0-9]/,
                                            ].every((pattern) =>
                                                pattern.test(value),
                                            ) ||
                                            "Password must include upper,lower,number and special characters"
                                        );
                                    },
                                })}
                                isValid={
                                    dirtyFields.password && !errors.password
                                }
                                isInvalid={errors.password}
                                placeholder="Enter password"
                            />
                            {errors.password && (
                                <Form.Control.Feedback type="invalid">
                                    <span className="error-msg">
                                        {errors.password.message}
                                    </span>
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="confirmPassword"
                        >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="password"
                                {...register("confirmPassword", {
                                    required: {
                                        value: true,
                                        message: "Please confirm your pasword",
                                    },
                                    validate: (match) => {
                                        const password = getValues("password");
                                        return (
                                            match === password ||
                                            "Passwords should match!"
                                        );
                                    },
                                })}
                                isValid={
                                    dirtyFields.confirmPassword &&
                                    !errors.confirmPassword
                                }
                                isInvalid={errors.confirmPassword}
                                placeholder="Confirm password"
                            />
                            {errors.confirmPassword && (
                                <Form.Control.Feedback type="invalid">
                                    <span className="error-msg">
                                        {errors.confirmPassword.message}
                                    </span>
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="photo">
                            <Form.Label>Upload an image</Form.Label>
                            <Form.Control
                                {...register("file", {
                                    required: {
                                        value: true,
                                        message: "Please select an image",
                                    },
                                    validate: {
                                        lessThan10MB: (files) => {
                                            return (
                                                files[0]?.size < 200000 ||
                                                "Photo size must be less than 200KB"
                                            );
                                        },
                                    },
                                })}
                                type="file"
                                isValid={dirtyFields.file && !errors.file}
                                isInvalid={errors.file}
                                accept="image/png, image/jpeg, image/gif"
                                multiple={false}
                            />

                            {errors.file && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.file.message}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleShowUserAddClose}
                        >
                            Close
                        </Button>
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            variant="primary"
                            disabled={!isValid}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
}
