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

import Checkbox from '@mui/material/Checkbox';




export default function GoalUPdatePopup() {

  const auth = useSelector(state=>state.auth);
  const couponData = useSelector(state=>state?.category?.coupon)
  const [show1, toggleShow1] = React.useState(true);
  const [show2, toggleShow2] = React.useState(true);
  const dispatch = useDispatch();


  const [open2, setOpen2] = React.useState(false);
  const handleClickUpdateOpen = () => {
    setOpen2(true);
  };
  const handleCloseUpdate = () => {
    setOpen2(false);
  };

  const [checked, setChecked] = React.useState(true);
  const checkboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const [isShow, setIsShow] = React.useState(false);

  const handleClick = () => {
    setIsShow(!isShow);
  };

	return (

        <div className="GoalDisplay-Banner-right-container goalpopup">
                    
                    {/* <button type="button" className='update-goal-right' onClick={handleClickUpdateOpen}> Update <div className="md-ripple-container"></div>
                    </button> */}

            <div className="goal-circle-btn">
              <div className="fab1" onClick={handleClickUpdateOpen}>
                 <i className="fa-solid fa-plus"></i>
              </div>
           </div>

          
           

           
                    <Dialog
                        open={open2}
                        onClose={handleCloseUpdate}
                        aria-labelledby="alert-dialog-title1"
                        aria-describedby="alert-dialog-description"
                        className='popup-padding'
                    >
                        <DialogTitle id="alert-dialog-title1">
                        <div className="GoalFormArbiter-title-container primary-background-color">
                          <div className="GoalFormArbiter-title-placeholder"></div>
                          <div className="GoalFormArbiter-title">
                            <span className="GoalFormArbiter-title-text accent-text">Create Goal — Q3 2022</span>
                            <div id="ember1688" className="liquid-container ember-view"></div>  </div>
                              <button  tabindex="0" id="ember1691" className="md-default-theme md-button md-icon-button ember-view md-ink-ripple" type="button">  
                                <i className="fa-solid fa-up-down"></i>
                                <div className="md-ripple-container"></div>
                              </button>
                              <div id="ember1693" className="CreateAGoalHelpLink ember-view">
                                <a href="https://help.khorus.com/article/14-create-a-goal" target="_blank">
                                  <button tabindex="0" id="ember1694" className="md-default-theme md-button md-icon-button ember-view md-ink-ripple" type="button">
                                    <i className="fa-solid fa-circle-question"></i>
                                    <div className="md-ripple-container"></div>
                                  </button>
                                </a>
                              </div>
                        </div>
                        </DialogTitle>

                        { isShow == true ?
                        <div className=''>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                        <div id="ember1701" className="liquid-child ember-view ember-vieww ">  
                          <div className="GoalFormArbiter-parent-container">
                            <button tabindex="0" id="ember1702" className="md-default-theme md-button md-primary ember-view md-ink-ripple" type="button" onClick={handleClick}>  Select Parent Goal
                              <div className="md-ripple-container"></div>
                            </button>
                          </div>

                         <div id="ember1703" className="wormhole-form ember-view"><div className="form-group">
                           <div className="form-group-content">
                           <md-input-container id="ember1704" className="GoalForm-title md-block md-default-theme md-input-invalid ember-view">
                             <label for="input-ember1704" className="md-required">Title</label>
                             <input className="md-input ng-invalid  ng-dirty" id="input-ember1704" aria-describedby="ember1704-char-count ember1704-error-messages" type="text" />
                             <div className="md-errors-spacer" id="ember1704-char-count"></div>
                             {/* <div className="md-input-messages-animation md-auto-hide" id="ember1704-error-messages">
                               <div id="error-input-ember1704-0" className="paper-input-error ng-enter ng-enter-active md-input-message-animation" >
                                This is required.
                               </div>
                             </div> */}



</md-input-container>

    <md-input-container id="ember1705" className="GoalForm-description md-block md-default-theme ember-view">  
    <label for="input-ember1705">Description</label>


  <textarea className="md-input" id="input-ember1705" onClick={() => toggleShow1(!show1)} />

  {!show1 && 
  <div className="md-errors-spacer goalpopup-accordion" id="ember1705-char-count">
    <div id="ember443" className="liquid-container ember-view">
      <p>Use description to share context for this goal, such as:</p>
      <ul>
        <li>Why you are working on this goal?</li>
        <li>What are you going to do to achieve the goal?</li>
        <li>Why you are working on this goal?</li>
      </ul>
    </div>
  </div>
}



</md-input-container>

<div id="ember1707" className="liquid-container ember-view"></div>
    <md-input-container id="ember1710" className="GoalForm-measurement md-block md-default-theme ember-view"> 
    <label for="input-ember1710" className="md-required">Measurement</label>


  <textarea className="md-input ng-invalid" id="input-ember1710" onClick={() => toggleShow2(!show2)} />

  {!show2 && 
  <div className="md-errors-spacer goalpopup-accordion" id="ember1705-char-count">
    <div id="ember443" className="liquid-container ember-view">
      <ul>
         <li>Why you are working on this goal?</li>
        <li>Why you are working on this goal?</li>
      </ul>
    </div>
  </div>
}

  <div className="md-errors-spacer" id="ember1710-char-count">
  </div>



</md-input-container>
<div id="ember1712" className="liquid-container ember-view"></div>

    <div className="layout-row layout-align-space-between-center">
      <div>

        <div className="checkbox-popup">
      
      <Checkbox
      checked={checked}
      onChange={checkboxChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
            <div className="md-label">
              <span id="ember1715-label">
                Private Goal
              </span>
            </div>
        </div>
        
        <small className="smallTextt">
            Private goals have limited visibility and cannot be cascaded from.
        </small>
      </div>

        <div  id="ember1716" className="ember-view">  
    <md-menu aria-owns="ember-basic-dropdown-content-ember1722" tabindex="-1" data-ebd-id="ember1722-trigger" role="button" id="ember1723" className="ember-basic-dropdown-trigger ember-view">
        <i className="fa-regular fa-calendar-days"></i>
        <span id="ember1724" className="QuarterYearDisplay ember-view">
          <span className="QuarterYearDisplay-text">
          <select className="select-goal">
            <option>Q1 2022</option>
            <option>Q2 2022</option>
            <option>Q3 2022</option>
            <option>Q4 2022</option>
            <option>Q1 2021</option>
            <option>Q2 2021</option>
            <option>Q3 2021</option>
            <option>Q4 2021</option>
          </select>
        </span>
        </span>
    </md-menu>


  

</div>
    </div>
  </div>
</div>

</div>


</div>





                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseUpdate}>Cancel</Button>
                        <Button onClick={handleCloseUpdate}>Save Draft</Button>
                        <Button onClick={handleCloseUpdate} autoFocus className='save_popup_goal'>
                            Submit for approval
                        </Button>
                        </DialogActions>
                        </div>
                        
                          :

                        
                        <div className='goalpopmain'>
                          <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                        <div class='goalpopup-1'> 
                          <p>Who will own the new goal?</p>
                          <div class='goal-radio'>
                            <input type="radio" id="age1" name="age" value="30"/>
                            <label for="age1">Myself</label>
                          </div>
                          <div class='goal-radio'>
                            <input type="radio" id="age1" name="age" value="30"/>
                            <label for="age1">Someone Else</label>
                          </div>

                          {/* <div id="ember1119" className="liquid-container ember-view">
                            <div id="ember1127" className="liquid-child ember-view">
                            <label>Select a goal owner</label>
                              <div id="ember1128" className="PowerSelectUser ember-view">
                          <div  id="ember1131" className="ember-power-select-trigger ember-basic-dropdown-trigger ember-view">    
                          <span className="ember-power-select-placeholder">Select a user</span>
                          <select>
                            <option className="ember-power-select-placeholder"></option>
                          </select>

                          <span className="ember-power-select-status-icon"></span>
                          </div>
                            <div id="ember-basic-dropdown-content-ember1130" className="ember-basic-dropdown-content-placeholder" ></div>

                          </div>
                          </div>
                          </div>                      */}

                        </div>

                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClick}>Next</Button>
                        </DialogActions>
                        </div>

                      }
                        
                       

                    </Dialog>
      

                   

        </div>

		
	)
}