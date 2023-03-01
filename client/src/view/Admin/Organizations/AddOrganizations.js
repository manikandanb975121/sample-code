import React, { useEffect, useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddOrganizations = ({ onClose, onSubmit, isEdit=false, userData={} }) => {

    const [name, setName] = useState(null);
    const [maxUsers, setMaxUser] = useState(0);

    useEffect(() => {
        if (isEdit) {
            setName(userData.name);
            setMaxUser(userData.maxUsers);
        }
    }, [])

    const onSubmitHandler = () => {
        if (isEdit) {
            const addOrganizationDetails = { name, maxUsers: Number(maxUsers), status: 1 };
            onSubmit(addOrganizationDetails, isEdit, userData.id);
        } else if (name && maxUsers) {
            const addOrganizationDetails = { name, maxUsers: Number(maxUsers), status: 1 };
            onSubmit(addOrganizationDetails, isEdit, userData.id);
        }
    }

    return (
        <div style={{ lineHeight: '6.5em', padding: 10}}>
            <TextField value={name} fullWidth id="outlined-basic" label="Organizations Name"  inputProps={{ maxLength: 50 }} onChange={(e) => { setName(e.target.value)}}  />
            {!isEdit && <TextField value={maxUsers} fullWidth id="outlined-basic" label="Max Users" onChange={(e) => { setMaxUser(e.target.value)}}/> }

            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0px'}}>
                <Button variant="outlined" onClick={() => {onSubmitHandler()}}>{ isEdit ? 'Update' : 'Save'}</Button>
                <Button variant="outlined" onClick={() => {onClose(false)}}>Cancel</Button>
            </div>

        </div>
    )
}

export default AddOrganizations