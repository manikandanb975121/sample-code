import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DialogModal = ({ open, title, children, isEdit=false, isDelete=false, isTemplate=false, width="50%" }) => {
  console.log({isDelete});
  return (
    <div>
        <Dialog
        fullWidth
        maxWidth="md"
        PaperProps={{
            sx: {
            width,
            height: `${isDelete ? 100: 500}`
            }
        }}
        open={open}
      >
        {!isTemplate && <DialogTitle>{title ? title : isEdit ? 'Update User': 'Add User'}</DialogTitle>}
        {isTemplate && <DialogTitle>{ title }</DialogTitle>}
        <DialogContent>
          <>{ children }</>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DialogModal;
