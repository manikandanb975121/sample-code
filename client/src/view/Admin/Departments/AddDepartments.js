import React, { useEffect, useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axiosIntance from 'src/helper/axios';
import { environment } from 'src/configs/environment.base';

const AddDepartments = ({ onClose, onSubmit, isEdit=false, userData={} }) => {
  const [name, setName] = useState(null);
  const [oid, setOID] = useState(localStorage.getItem('orgId'));

  useEffect(() => {
    if (isEdit) {
        setName(userData.name);
        setOID(userData.oid);
    }
  }, [])

  const onSubmitHandler = async () => {
    onSubmit({ name, oid })
    // const response = await axiosIntance.put(environment.baseAPIUrl + environment.endpoints.department.createDepartments, {name, oid});
  }

  return (
        <div style={{ lineHeight: '6.5em', padding: 10}}>
            <TextField value={name} fullWidth id="outlined-basic" label="Department Name"  inputProps={{ maxLength: 50 }} onChange={(e) => { setName(e.target.value)}}  />
            {/* {!isEdit && <TextField value={oid} fullWidth id="outlined-basic" label="Department OID" onChange={(e) => { setOID(e.target.value)}}/> } */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0px'}}>
                <Button variant="outlined" onClick={() => {onSubmitHandler()}}>{ isEdit ? 'Update' : 'Save'}</Button>
                <Button variant="outlined" onClick={() => {onClose(false)}}>Cancel</Button>
            </div>
        </div>
  )
}

export default AddDepartments