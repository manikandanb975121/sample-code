import React, { useEffect, useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AvatarImage from 'src/component/avatar/Avatar';
import InputLabel from '@mui/material/InputLabel';
import axiosIntance from 'src/helper/axios';
import { environment } from 'src/configs/environment';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';


const AddUser = ({ onClose, onSubmit, isEdit=false, userData={}, isDelete=false }) => {
    const [fname, setFirstName] = useState('');
    const [lname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [bio, setBio] = useState(null);
    const [role, setRole] = useState(null);
    const [profileImage, setProfileImage] = useState('');
    const inputFile = useRef(null);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartments] = useState(null);
    const [visible, setVisible] = useState(true);
    const [isEditClicked, setIsEditClicked] = useState(false);


   const roles = [
    {
        name: 'Admin',
        value: 'admin'
    },{
        name: 'ORG Admin',
        value: 'org_admin'
    }
   ]

    useEffect(() => {
        if (isEdit) {
            fetchUserById(userData.id)
            setFirstName(userData.fname);
            setLastName(userData.lname);
            setEmail(userData.email);
            setSelectedDepartments(userData.department)
        }
        async function fetchAllDepartmentAPI(rowPerPage = 10, page=1, search='', oid=localStorage.getItem('orgId')) {
            const response = await axiosIntance.get(environment.baseAPIUrl + environment.endpoints.department.getAllDepartments(rowPerPage, page, search, oid));
            setDepartments(response.data.data);
            setSelectedDepartments(response.data.data.find(x => x.name === userData.department.name));
        }
        async function fetchUserById(id) {
            const response = await axiosIntance.get(environment.baseAPIUrl + environment.endpoints.getUserById(id));
            const editUserData = response.data;
            setBio(editUserData.bio);
            setPhoneNumber(editUserData.phone);
            setVisible(false);
        }
        fetchAllDepartmentAPI();
    }, []);

    async function fetchAllDepartmentAPI(rowPerPage = 10, page=1, search='', oid=localStorage.getItem('orgId')) {
        const response = await axiosIntance.get(environment.baseAPIUrl + environment.endpoints.department.getAllDepartments(rowPerPage, page, search, oid));
        setDepartments(response.data.data);
        setSelectedDepartments(response.data.data.find(x => x.name === userData.department.name));
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (e.target.files) {
            setProfileImage(e.target.files[0]);
            var reader = new FileReader();
            reader.onloadend = function() {
                console.log('Encoded Base 64 File String:', reader.result);
                setProfileImage(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }


    const onSubmitHandler = () => {
        if (isEdit) {
            if (fname && lname && email && phoneNumber && bio && profileImage) {
                const updateUserDetails = {
                    fname,
                    lname,
                    email,
                    phoneNumber,
                    bio,
                    profileImage,
                    departmentId: selectedDepartment.id,
                    role
                }
                onSubmit(updateUserDetails);
            }
        return;

        } else {
            if (fname && lname && email && password ) {
                const addUserDetails = {
                    fname,
                    lname,
                    email,
                    password,
                    departmentId: selectedDepartment.id,
                }
                onSubmit(addUserDetails)
            }
            return 
        }
                
    }

    const handleChange = (event) => {
        const department = departments.find((x) => x.id === event.target.value);
        setSelectedDepartments(department);
    }

    const handleAutoCompleteChange = (event) => {
        console.log({event});
        const department = departments.find((x) => x.name === event);
        console.log({department});
        setSelectedDepartments(department);
    }

    const searchDepartment = (value) => {
        fetchAllDepartmentAPI(10, 1, value);
    }

    const handleRoleChange = (role) => {
        setRole(role.value)
    }
    return (
        <div style={{ lineHeight: '6.5em', padding: 10}}>
            <TextField value={fname} fullWidth id="outlined-basic" label="First Name" onChange={(e) => { setFirstName(e.target.value)}}  />
            <TextField value={lname} fullWidth id="outlined-basic" label="Last Name" onChange={(e) => { setLastName(e.target.value)}}/>
            <TextField value={email} fullWidth id="outlined-basic" label="Email" onChange={(e) => { setEmail(e.target.value)}}/>
            
            { !isEdit && 
                <div>
                    <TextField value={password} fullWidth id="outlined-basic" label="Password" onChange={(e) => { setPassword(e.target.value)}}/>
                    {/* <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        fullWidth
                        label='Role'
                        onChange={(event) => {setRole(event.target.value)}}
                        >
                        <MenuItem value={'Admin'}>Admin</MenuItem>
                        <MenuItem value={'User'}>User</MenuItem>
                    </Select> */}
                    {/* {selectedDepartment?.name } */}
                    <Select
                    fullWidth
                        // labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        defaultValue={selectedDepartment?.name || null}
                        label="Department"
                        onChange={handleChange}
                    >
                        {
                            departments.map((department) => (
                                <MenuItem value={department.id}>{department.name}</MenuItem>
                            ))
                        }
                        {/* <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                </div>
            }
            {
                isEdit && !visible &&<div>
                    <TextField value={phoneNumber} fullWidth id="outlined-basic" label="Phone Number" onChange={(e) => { setPhoneNumber(e.target.value)}}/>
                    <TextField value={bio} fullWidth id="outlined-basic" label="Bio" onChange={(e) => { setBio(e.target.value)}}/>
                    <Autocomplete
                        style={{ marginTop: '12px'}}
                        disablePortal
                        fullWidth
                        onChange={(event, newValue) => { handleRoleChange(newValue) }}
                        id="combo-box-demo"
                        options={roles}
                        getOptionLabel={(role) => role.name}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params}
                        label="Select Roles"
                        onChange={(event) => {searchDepartment(event.target.value)}}
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }} />}
                      />
                    
                    {
                        !isEditClicked &&  <div style={{ display: 'flex', justifyContent: 'flex-start'}}>
                        <h6 style={{ marginTop: '12px'}}>{selectedDepartment?.name }</h6>
                        <IconButton style={{ marginLeft: '12px'}} onClick={() => { setIsEditClicked(true) }} color="error" aria-label="upload picture" component="label">
                            <EditIcon />
                        </IconButton>
                    </div>
                    }
                   
                    {/* {
                        isEditClicked && <Select
                        fullWidth
                        defaultValue={selectedDepartment?.name || null}
                        label="Department"
                        onChange={handleChange}
                    >
                        {
                            departments.map((department) => (
                                <MenuItem value={department.id}>{department.name}</MenuItem>
                            ))
                        }
                        </Select>
                    } */}

                    {
                        isEditClicked && <Autocomplete
                        disablePortal
                        fullWidth
                        onChange={(event, newValue) => { handleAutoCompleteChange(newValue) }}
                        id="combo-box-demo"
                        options={departments.map((department) => department.name)}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params}
                        label="Search Departments"
                        onChange={(event) => {searchDepartment(event.target.value)}}
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }} />}
                      />
                    }
                    
                    {profileImage && <AvatarImage name={fname} profileImage={profileImage} /> }
                    <Button variant='outlined' onClick={() => { inputFile.current.click() }} type="button" className="refreshbt import-user-button">Upload Image</Button>
                    <input
                        style={{ display: 'none'}}
                        type="file"
                        onChange={handleFileChange}
                        ref={inputFile} 
                    />
                </div>
            }
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0px'}}>
                <Button variant="outlined" onClick={() => {onSubmitHandler()}}>{ isEdit ? 'Update' : 'Save'}</Button>
                <Button variant="outlined" onClick={() => {onClose(false)}}>Cancel</Button>
            </div>
        </div>
    )
}

export default AddUser;
