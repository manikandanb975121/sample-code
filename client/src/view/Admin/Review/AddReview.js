import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddReview = ({ onClose, onSubmit, isEdit=false, data}) => {
    const [templateName, setTemplateName] = useState(null);

    useEffect(() => {
        if (isEdit) {
            console.log({data});
            setTemplateName(data.template_name)
        }
    }, [])

    const onSubmitHandler = () => {
        if (isEdit) {
            console.log('update logic');
            const updateData = {
                templateName,
                id: data?.id,
                oid: localStorage.getItem('orgId')
            }
            onSubmit(updateData);
        } else {
            if (templateName && localStorage.getItem('orgId')) {
                const data = {
                    templateName,
                    oid: localStorage.getItem('orgId')
                }
                onSubmit(data);
            }
        }
    }
  return (
    <div style={{ marginTop: '10px'}}>
        <TextField value={templateName} fullWidth id="outlined-basic" label="Template Name" onChange={(e) => { setTemplateName(e.target.value)}}  />
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0px'}}>
            <Button variant="outlined" onClick={() => {onSubmitHandler()}}>{ isEdit ? 'Update' : 'Create'}</Button>
            <Button variant="outlined" onClick={() => {onClose(false)}}>Cancel</Button>
        </div>
    </div>
  )
}

export default AddReview