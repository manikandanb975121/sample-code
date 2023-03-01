
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Toast from '../common/Toast';
import { toast } from 'react-toastify';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import Loader from '../common/Loader';
import GoalSidebar from '../Goalsview/GoalSidebar';
import { baseUrl } from '../../config';
import { GET, PUT } from '../../helper/service';
import { withStyles } from '@material-ui/core/styles';
import { Box, Slider } from '@material-ui/core';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm } from "react-hook-form";
import { environment } from "../../configs/environment";


const initialValues = {
    goal_type: "Company"
};


const styles = theme => ({
    trashIcon: {
        height: "33px",
        width: "39px",
        display: "flex",
    },
}
);

const Goaledit = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loader, setLoader] = useState(false);
    const [values, setValues] = useState([]);
    const [error, setError] = useState(initialValues);
    const [goalDetails, setGoalDetails] = useState({});
    const [inputList, setInputList] = useState([]);
    const [progress, setProgress] = useState(0);
    const [goalDetailsSidebar, setGoalDetailsSidebar] = useState({});
    const [userList, setUserList] = useState([]);
    const [savedUserList, setSavedUserList] = useState([]);
    const notify = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);

    const changeValue = (w, index, event, value) => {
        //console.log("event, value",w, e, event, value)
        const list = [...inputList];
        list[index]['progress'] = value;
        setInputList(list);
    };



    const { classes } = props;
    const auth = useSelector(state => state.auth);
    const token = auth.token;
    const { id } = useParams();

    const getGoalById = () => {
        setLoader(true);
        GET(`${environment.baseAPIUrl}${environment.endpoints.getGoalById}/${id}`, token).then(data => {
            setGoalDetails(data.result);
            setGoalDetailsSidebar(data.result);
            setInputList(data.result.tactics);
            setValues(data.result.tactics);
            setLoader(false);
        })
    }
    useEffect(() => {
        getGoalById();
        fetchUsers();
    }, []);

    const handleAddClick = () => {
        setInputList([...inputList, {
            goal_name: "",
            description: "",
            assignee: "",
            startDate: "",
            endDate: "",
            frequency: "",
            tactic: "",
            tacticDescription: "",
            userId:""
        }]);
    };

    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGoalDetails({ ...goalDetails, [name]: value });
    };

    const ondateChange = (value, name, index) => {
        const list = [...inputList];
        list[index][name] = value;
        list[index]['enableEnddate'] = false;
        setInputList(list);
    };

    const deleteSelectedUser = (index) => {
        const list = [...inputList];
        list[index]['assignee'] = "";
        list[index]['assigneeName'] = "";
        setInputList(list);
    };


    const AssigneeChange = (value, index) => {
        let explodedName = value?.label.split(" ");
        var lastItem = explodedName?.pop();
        const list = [...inputList];
        list[index]['assignee'] = value?.id;
        list[index]['assigneeName'] = explodedName[0]?.charAt(0) + lastItem[0]?.charAt(0);
        list[index]['userId'] = value?.id;

        setInputList(list);
        setUserList(savedUserList);
    };

    const ManualSearch = (e) => {
        const { name, value } = e.target;
        // if(value.length >= 3){ 
        setTimeout(function () {
            searchUsers(value);
        }, 1000);
        // }
    };

    const fetchUsers = (e) => {
        let key = "";
        GET(`${environment.baseAPIUrl}${environment.endpoints.searchDirectReport}?searchParameter=${key}&limit=10000&page=1`, token).then(response => {
            let newArray = [];
            response.data.map((user) => {
                var nm = user.name.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
                return newArray.push({ "label": nm, "id": user.id });
            });
            setUserList(newArray);
            setSavedUserList(newArray);
        })
    }

    const searchUsers = (key, index) => {
        GET(`${environment.baseAPIUrl}${environment.endpoints.searchDirectReport}?searchParameter=${key}&limit=10000&page=1`, token).then(response => {
            let newArray = [];
            response.data.map((user) => {
                var nm = user.name.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
                return newArray.push({ "label": nm, "id": user.id });
            });
            setUserList(newArray);
            setLoader(false);
        })

    }


    const onSubmit = () => {
        var newObj = [];
        var isEmpty = false; 
 

        inputList.forEach(ele => { 

            if(!goalDetails.name || ele.name == "" || ele.startDate == "" || ele.endDate == "" || ele.userId==""){
              isEmpty = true; 
        }
        });

        if(isEmpty){
        notifyError("Please fill all the required fields");
        return false;
        }

   


        inputList.forEach((item) => {
            let obj = {
                "userId": item.userId,
                "name": item.name,
                "description": item.description,
                "frequency": item.frequency,
                "startDate": item.startDate,
                "endDate": item.endDate,
                "progress": (item.progress==0 ? 1 : item.progress)
            }
            newObj.push(obj);
        });
        const data = {
            "name": goalDetails.name,
            "description": goalDetails.description,
            "type": goalDetails.type,
            "startDate": new Date(),
            "endDate": new Date(),
            "tactics": newObj
        }
        setLoader(true);
        const url = baseUrl + '/goals-tactics/update/' + id;
        PUT(url, data, token).then(data => {
            notify('Goal updated successfully.');
            setLoader(false);
        })

    }

    const getText = (valu) => `${progress}`;

    return (
        <div className='wrapper'>
            {/* <Sidebar /> */}
            <div id="content">
                {/* <Header /> */}
                <div className="dashboard_main">
                    <div className="row">
                        <Loader loading={loader} />
                        <Toast />

                        <div className="col-md-8 pd_right_0">
                            <div className="mygoals_inner_section">
                                <div className="searchbaar_wrp">
                                    <h5 className="modal-title" id="exampleModalLongTitle" style={{ textAlign: "center", height: "65px" }}>Update Goal</h5>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12">
                                                <label className="form-label" for="form1Example1">Goal Name <span className="required-mark">*</span></label>
                                                <input
                                                    style={{ maxWidth: "100%" }}
                                                    type="text"
                                                    id="form1Example1"
                                                    className="form-control custom-input"
                                                    value={goalDetails.name}
                                                    name="name"
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="col-xs-12 col-sm-12">
                                                <label className="form-label" for="form1Example2">Type <span className="required-mark">*</span></label>
                                                <select
                                                    style={{ maxWidth: "100%" }}
                                                    className="form-control custom-input"
                                                    defaultValue={goalDetails.type}
                                                    name="type"
                                                    onChange={handleChange}
                                                >
                                                    <option value="Company">Company</option>
                                                    <option value="Personal">Personal</option>
                                                </select>
                                            </div>

                                            <div className="col-xs-12 col-sm-12">
                                                <div className="box">
                                                    <label className="form-label" for="form1Example2">Description</label>
                                                    <input
                                                        style={{ maxWidth: "100%" }}
                                                        type="text"
                                                        id="form1Example1"
                                                        className="form-control custom-input"
                                                        name="description"
                                                        value={goalDetails.description}
                                                        onChange={handleChange}
                                                    />

                                                </div>
                                            </div>

                                            

                                            {inputList?.map((x, i) => {
                                                let clname = classes.trashIcon + ' btn btn-danger btn-sm';
                                                var endDateStatus = true;
                                                if (inputList[i]['enableEnddate'] === false) {
                                                    var endDateStatus = false;
                                                }


                                                if (inputList.length > 0) {
                                                    if (inputList[i]?.hasOwnProperty("assigneeName")) {
                                                        var selectedName = inputList[i]?.assigneeName;
                                                    } else {
                                                        if (inputList[i]?.name) {

                                                            if(inputList[i].assignee !==""){     
                                                                let explodedName = inputList[i]?.userName.split(" ");
                                                                var lastItem = explodedName?.pop();
                                                                var selectedName = explodedName[0]?.charAt(0) + lastItem[0]?.charAt(0);
                                                            } else {
                                                                var selectedName = "";
                                                            }


                                                        } else {
                                                            var selectedName = "";
                                                        }
                                                    }
                                                } else {
                                                    var selectedName = "";
                                                }

                                                 
                                                

                                                return (
                                                    <div className="col-xs-12 col-sm-12">
                                                        <div className="row">

                                                            <div className="col-sm-7">
                                                                <div className="form-group">
                                                                    <label className="form-label" for="form1Example1">Tactic {i + 1} <span className="required-mark">*</span></label>

                                                                    <label className="ml-2">{inputList.length !== 1 &&
                                                                        <button className={clname} onClick={() => handleRemoveClick(i)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21" fill="none">
                                                                                <path d="M15.7759 7.56049H5.73406C5.29746 7.56049 4.93362 7.92432 5.00639 8.36092L6.17066 17.8934C6.24343 18.6211 6.89833 19.1304 7.626 19.1304H13.8112C14.5389 19.1304 15.1938 18.6211 15.2665 17.8934L16.4308 8.36092C16.5036 7.92432 16.2125 7.56049 15.7759 7.56049Z" fill="white" />
                                                                                <path d="M16.5761 3.19448H12.9377C12.9377 2.39404 12.2828 1.73914 11.4824 1.73914H10.0271C9.22662 1.73914 8.57171 2.39404 8.57171 3.19448H4.93337C4.13293 3.19448 3.47803 3.84938 3.47803 4.64981V5.37748C3.47803 5.81409 3.7691 6.10515 4.2057 6.10515H17.3038C17.7404 6.10515 18.0314 5.81409 18.0314 5.37748V4.64981C18.0314 3.84938 17.3765 3.19448 16.5761 3.19448Z" fill="white" />
                                                                            </svg>
                                                                        </button>
                                                                    }</label>

                                                                    <input
                                                                        style={{ maxWidth: "100%" }}
                                                                        type="text"
                                                                        id="form1Example1"
                                                                        name="name"
                                                                        className="form-control custom-input"
                                                                        value={values[i]?.name}
                                                                        onChange={e => handleInputChange(e, i)}
                                                                    />
                                                                </div>

                                                                <div className="form-group">
                                                                    <label className="form-label" for="form1Example2">Description </label>
                                                                    <textarea
                                                                        style={{ maxWidth: "100%" }}
                                                                        className="form-control custom-input"
                                                                        name="description"
                                                                        onChange={e => handleInputChange(e, i)}
                                                                        value={values[i]?.description}
                                                                    />
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-sm-4">
                                                                        <DatePicker
                                                                            className="form-control custom-input calendardate"
                                                                            placeholderText="Start Date"
                                                                            name="startDate"
                                                                            onChange={(date) => ondateChange(date, 'startDate', i)}
                                                                            minTime={new Date()}
                                                                            maxTime={new Date()}
                                                                            minDate={new Date()}
                                                                            dateFormat="d-MM-yyyy"
                                                                            selected={(inputList[i]['startDate'] ? new Date(inputList[i]['startDate']) : new Date())}
                                                                            //selected={(values[i]?.startDate ? new Date(values[i]?.startDate) : new Date)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-sm-4">
                                                                        <DatePicker
                                                                            className="form-control custom-input calendardate"
                                                                            placeholderText="End Date"
                                                                            name="endDate"
                                                                            onChange={(date) => ondateChange(date, 'endDate', i)}
                                                                            minTime={new Date()}
                                                                            maxTime={new Date()}
                                                                            minDate={new Date()}
                                                                            dateFormat="d-MM-yyyy"
                                                                            selected={(inputList[i]['endDate'] ? new Date(inputList[i]['endDate']) : new Date())}
                                                                            //selected={(values[i]?.endDate ? new Date(values[i]?.endDate) : new Date)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-sm-4" style={{ paddingTop: "8px" }}>
                                                                        <select
                                                                            defaultValue={inputList[i]?.frequency}
                                                                            className="form-control repeats_addgolas_control"
                                                                            name="frequency"
                                                                            onChange={e => handleInputChange(e, i)}
                                                                        >
                                                                            <option value="default">Repeats</option>
                                                                            <option value="monthly">Monthly</option>
                                                                            <option value="weekly">Weekly</option>
                                                                            <option value="daily">Daily</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div className="form-group">
                                                                    <label className="form-label" for="form1Example1">Assign to <span className="required-mark">*</span></label>
                                                                    {/* <input style={{maxWidth:"100%"}} type="text" id="form1Example1" className="form-control custom-input" />   */}

                                                                    <Autocomplete
                                                                        disablePortal
                                                                        id="combo-box-demo"
                                                                        fullWidth
                                                                        freeSolo
                                                                        defaultValue={values[i]?.userName}
                                                                        sx={{
                                                                            width: "100%",
                                                                            ".MuiOutlinedInput-root": {
                                                                                "&:hover": {
                                                                                    borderColor: "red",
                                                                                    borderWidth: 10
                                                                                }
                                                                            }
                                                                        }}
                                                                        onChange={(event, newValue) => {
                                                                            AssigneeChange(newValue, i);
                                                                        }}
                                                                        onInputChange={(event, newInputValue) => {
                                                                            //searchUsers(newInputValue,i);
                                                                        }}
                                                                        options={userList}
                                                                        renderInput={(params) => <TextField {...params} placeholder="Assign to" className="form-control dropdowns" name="searchEle" onChange={ManualSearch} />}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-sm-5" style={{ marginTop: "40px" }}>
                                                                <div style={{ marginTop: "5%" }}>
                                                                    <Slider
                                                                        style={{ width: "100%" }}
                                                                        min={0}
                                                                        max={100}
                                                                        step={1}
                                                                        value={parseInt((inputList[i]?.progress ? inputList[i]?.progress : 0))}
                                                                        marks
                                                                        onChange={changeValue.bind(this, 'a', i)}
                                                                        name="progress"
                                                                        getAriaValueText={getText}
                                                                        valueLabelDisplay="on"
                                                                        color="secondary"
                                                                    />
                                                                </div>

                                                            </div>




                                                            <div className="col-xs-12 col-sm-12" style={{ marginTop: "16px", marginLeft: "14px" }}>
                                                                {(selectedName.length > 0 ?
                                                                    <div className="row form-group">
                                                                        <div className="user_goals_name">
                                                                            <ul className="clearfix">
                                                                                <li><button type="button" className="user_goals_name_bt">{selectedName}
                                                                                    <span onClick={deleteSelectedUser.bind(this, i)} className="crossgoals_bt"><svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26" fill="none">
                                                                                        <g filter="url(#filter0_d_132_797)">
                                                                                            <circle cx={13} cy={12} r={8} fill="white" />
                                                                                        </g>
                                                                                        <path d="M15.9801 15.9438L13.3457 13.3094L10.6742 15.9809L9.62297 14.9296L12.2944 12.2581L9.67244 9.63616L10.6248 8.68383L13.2468 11.3058L15.9306 8.62199L16.9819 9.67326L14.298 12.3571L16.9324 14.9914L15.9801 15.9438Z" fill="#9D9D9D" />
                                                                                        <defs>
                                                                                            <filter id="filter0_d_132_797" x={0} y={0} width={26} height={26} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                                                                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                                                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                                                <feOffset dy={1} />
                                                                                                <feGaussianBlur stdDeviation="2.5" />
                                                                                                <feComposite in2="hardAlpha" operator="out" />
                                                                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                                                                                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_132_797" />
                                                                                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_132_797" result="shape" />
                                                                                            </filter>
                                                                                        </defs>
                                                                                    </svg></span>
                                                                                </button>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    : '')}
                                                            </div>
                                                        </div>

                                                        {inputList.length - 1 === i &&
                                                            <div className="col-xs-12 col-sm-12" style={{ marginTop: "40px" }}>
                                                                <div className="row form-group">
                                                                    <button type="button" className="add_tactic_bt" onClick={handleAddClick}>+ Add Tactic</button>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                )
                                            })}

                                            <div className="col-xs-12 col-sm-12">
                                                <div className="box" style={{ paddingTop: "25px" }}><button type="submit" className="add_goals_bt" onClick={handleSubmit(onSubmit)}>Update</button></div>
                                            </div>


                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <GoalSidebar goalDetailsdata={goalDetails} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(Goaledit);