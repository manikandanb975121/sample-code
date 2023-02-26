// import React from 'react'
import { Check } from 'react-feather';

import {useSelector,useDispatch} from "react-redux";

import React, { useState } from "react";
import ReactDOM from "react-dom";

// import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// import useCollapse from 'react-collapsed';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function GoalUPdatePopup() {

  const auth = useSelector(state=>state.auth);
  const couponData = useSelector(state=>state?.category?.coupon)
  const dispatch = useDispatch();


  const [open2, setOpen2] = React.useState(false);
  const handleClickUpdateOpen = () => {
    setOpen2(true);
  };
  const handleCloseUpdate = () => {
    setOpen2(false);
  };

	return (

        <div className="GoalDisplay-Banner-right-container deactivate-profile">
                    
                    {/* <button type="button" className='update-goal-right' onClick={handleClickUpdateOpen}> Update <div className="md-ripple-container"></div>
                    </button> */}
                    <span onClick={handleClickUpdateOpen}>Deactivate</span>

                    <Dialog
                        open={open2}
                        onClose={handleCloseUpdate}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className="deactivatepopup"
                    >
                        <DialogTitle id="alert-dialog-title">
                        <div className='poptitle'>Deactivate User ?</div>
                        <div className='close_pop' onClick={handleCloseUpdate}><i className="fa-solid fa-xmark"></i></div>
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                         <p class='deactivate-p'>Do you really want us to deactivate your account? If yes then press 'DEACTIVATE' button.</p>
                        


                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseUpdate}>Cancel</Button>
                        <Button onClick={handleCloseUpdate} autoFocus className='save_popup_goal'>
                            DEACTIVATE
                        </Button>
                        </DialogActions>
                    </Dialog>

                </div>

		
	)
}