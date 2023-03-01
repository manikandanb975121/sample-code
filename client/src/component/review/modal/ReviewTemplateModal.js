import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import IconButton from '@mui/material/IconButton';
import DialogModal from "src/view/Admin/DialogModal";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@material-ui/icons/Close';

export default function ReviewTemplateModal({ show, onClose, onSubmit,reviewTemplateArray}) {

 
const capitalizeFirstLetter = (string) => {    
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const capitalizeAllLetter = (string) => {
  return string.toUpperCase();
}


  return <><div>
    {show && <DialogModal width="30%" open={show} title={
      <div style={{ display: "flex", justifyContent: 'space-between'}}>
        <h6 style={{ letterSpacing: '3px'}}>REVIEW TEMPLATE</h6>
        <IconButton onClick={onClose} color="primary"  component="label">
          <CloseIcon />
        </IconButton>
      </div>} 
      isTemplate={true}
    >
      <ul class="review_wrapper">  
        {reviewTemplateArray?.map((data)=>{
          return <li value={data} onClick={()=>{onSubmit(data)}}><button style={{ letterSpacing: '3px'}} type="button">{capitalizeAllLetter(data.template_name)}</button></li>
          })}
      </ul>
      <div class="review_submit_bt">
          <button onClick={onSubmit} type="button" class="submit_request_review">Save Changes</button>
      </div>
    </DialogModal> }
    {/* 
    Existing Code before reusble

    <Modal show={show} >
      <Modal.Header >
      <Modal.Title>Review Templates</Modal.Title>
        <button type="button" onClick={onClose}><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        
      </Modal.Header>
      <Modal.Body>
        <ul class="review_wrapper"> 
          
        {reviewTemplateArray?.map((data)=>{
          return <li value={data} onClick={()=>{onSubmit(data)}}><button type="button">{capitalizeFirstLetter(data.reviewTemplate.template_name)}</button></li>
          })}
        </ul>
        <div class="review_submit_bt">
             <button onClick={onSubmit} type="button" class="submit_request_review">Save Changes</button>
         </div>
      </Modal.Body>
    </Modal> 
    
    */}
  </div></>
}