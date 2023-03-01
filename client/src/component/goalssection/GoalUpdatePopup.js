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

        <div className="GoalDisplay-Banner-right-container goalpopup">
                    
                    <button type="button" className='update-goal-right' onClick={handleClickUpdateOpen}> Update <div className="md-ripple-container"></div>
                    </button>

                    <Dialog
                        open={open2}
                        onClose={handleCloseUpdate}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className="updategoalpopup"
                    >
                        <DialogTitle id="alert-dialog-title">
                        <div className='poptitle'>PARENT TEST GOAL 9_14</div>
                        <div className='close_pop' onClick={handleCloseUpdate}><i className="fa-solid fa-xmark"></i></div>
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                        <div className="GoalDisplay-details-row">
                         <div className="GoalDisplay-details-column">
                           <h3 className="GoalDisplay-details-columnTitle"> Description </h3>
                           <p>This is my test goal for this week.</p>
                          </div>
                          <div className="GoalDisplay-details-column">
                           <h3 className="GoalDisplay-details-columnTitle"> Measurement </h3>
                           <p>I will know I achieved this goal because it's a test for this week.</p>
                          </div>
                        </div>
                        <h3 className="GoalDisplay-details-columnTitle">Predictions</h3>
                        <div data-current-week="14" id="ember348" className="PredictionTrend--full solicited-12 solicited-13 updatable-12 updatable-13 updatable-14 actionable ember-view">
                <span className="Trend-quarter">Q3:</span>
                <div data-week="1" id="ember350" className="Trend-week ember-view">
                    <span className="Trend-week-date"> 7/3 </span>
                    <div id="ember351" className="disabled ember-view">
                    <div id="ember352" className="Trend-scores ember-view">
                        <i className="Trend-score Trend-likelihood"></i>
                        <i className="Trend-score Trend-quality"></i>
                    </div>
                    </div>
                </div>
                <div data-week="2" id="ember354" className="Trend-week ember-view">
                    <span className="Trend-week-date"> 7/10 </span>
                    <div id="ember355" className="disabled ember-view">
                    <div id="ember356" className="Trend-scores ember-view">
                        <i className="Trend-score Trend-likelihood"></i>
                        <i className="Trend-score Trend-quality"></i>
                    </div>
                    </div>
                </div>
                <div data-week="3" id="ember358" className="Trend-week ember-view">
                    <span className="Trend-week-date"> 7/17 </span>
                    <div id="ember359" className="disabled ember-view">
                    <div id="ember360" className="Trend-scores ember-view">
                        <i className="Trend-score Trend-likelihood"></i>
                        <i className="Trend-score Trend-quality"></i>
                    </div>
                    </div>
                </div>
                <div data-week="4" id="ember362" className="Trend-week ember-view">
                    <span className="Trend-week-date"> 7/24 </span>
                    <div id="ember363" className="disabled ember-view">
                    <div id="ember364" className="Trend-scores ember-view">
                        <i className="Trend-score Trend-likelihood"></i>
                        <i className="Trend-score Trend-quality"></i>
                    </div>
                    </div>
                </div>
                <div data-week="5" id="ember366" className="Trend-week ember-view">
                    <span className="Trend-week-date"> 7/31 </span>
                    <div id="ember367" className="disabled ember-view">
                    <div id="ember368" className="Trend-scores ember-view">
                        <i className="Trend-score Trend-likelihood"></i>
                        <i className="Trend-score Trend-quality"></i>
                    </div>
                    </div>
                </div>
                <div data-week="6" id="ember370" className="Trend-week ember-view">
                    <span className="Trend-week-date"> 8/7 </span>
                    <div id="ember371" className="disabled ember-view">
                    <div id="ember372" className="Trend-scores ember-view">
                        <i className="Trend-score Trend-likelihood"></i>
                        <i className="Trend-score Trend-quality"></i>
                    </div>
                    </div>
                </div>
                <div data-week="7" id="ember374" className="Trend-week ember-view">
                    <span className="Trend-week-date"> 8/14 </span>
                    <div id="ember375" className="disabled ember-view">
                    <div id="ember376" className="Trend-scores ember-view">
                        <i className="Trend-score Trend-likelihood"></i>
                        <i className="Trend-score Trend-quality"></i>
                    </div>
                    </div>
                </div>
                <div data-week="8" id="ember378" className="Trend-week ember-view">
                    <span className="Trend-week-date"> 8/21 </span>
                    <div id="ember379" className="disabled ember-view">
                    <div id="ember380" className="Trend-scores ember-view">
                        <i className="Trend-score Trend-likelihood"></i>
                        <i className="Trend-score Trend-quality"></i>
                    </div>
                    </div>
                </div>
                <div data-week="9" id="ember382" className="Trend-week ember-view">
                    <span className="Trend-week-date"> 8/28 </span>
                    <div id="ember383" className="disabled ember-view">
                    <div id="ember384" className="Trend-scores ember-view">
                        <i className="Trend-score Trend-likelihood"></i>
                        <i className="Trend-score Trend-quality"></i>
                    </div>
                    </div>
                </div>
                <div data-week="10" id="ember386" className="Trend-week ember-view">
                    <span className="Trend-week-date"> 9/4 </span>
                    <div id="ember387" className="disabled ember-view">
                    <div id="ember388" className="Trend-scores ember-view">
                        <i className="Trend-score Trend-likelihood"></i>
                        <i className="Trend-score Trend-quality"></i>
                    </div>
                    </div>
                </div>
                <div data-week="11" id="ember390" className="Trend-week ember-view">
                    <span className="Trend-week-date"> 9/11 </span>
                    <div id="ember391" className="disabled ember-view">
                    <div id="ember392" className="Trend-scores ember-view">
                        <i className="Trend-score Trend-likelihood"></i>
                        <i className="Trend-score Trend-quality"></i>
                    </div>
                    </div>
                </div>
                <div data-week="12" id="ember394" className="Trend-week is-updatable is-solicited ember-view">
                    <span className="Trend-week-date"> 9/18 </span>
                    <div id="ember395" className="ember-view">
                    <div id="ember396" className="Trend-scores ember-view">
                        <i className="Trend-score Trend-likelihood"></i>
                        <i className="Trend-score Trend-quality"></i>
                    </div>
                    </div>
                </div>
                <div data-week="13" id="ember398" className="Trend-week is-updatable is-solicited ember-view">
                    <span className="Trend-week-date"> 9/25 </span>
                    <div id="ember399" className="ember-view">
                    <div id="ember400" className="Trend-scores ember-view">
                        <i className="Trend-score Trend-likelihood"></i>
                        <i className="Trend-score Trend-quality"></i>
                    </div>
                    </div>
                </div>
                <div data-week="14" id="ember402" className="Trend-week is-updatable ember-view">
                    <span className="Trend-week-date"> 9/30 </span>
                    <div id="ember403" className="ember-view">
                    <div id="ember404" className="Trend-scores ember-view">
                        <i className="Trend-score Trend-likelihood"></i>
                        <i className="Trend-score Trend-quality"></i>
                    </div>
                    </div>
                </div>
                <div id="ember405" className="FinalizedGraphic FinalizedGraphic-full-trend ember-view">
                    <i className="Finalized-score"></i>
                </div>
                        </div>

                        <div className="modal-subtitle">
                          <a href=''>
                          <i className="fa-solid fa-angle-left"></i>
                          </a>
                          <span>Your update for week 14 ending Sep 30, 2022</span>
                        </div>

                        <div id="ember1756" className="GoalStatusEntryForm ember-view"> 
                          <div id="ember1757" className="ScoreSelector ember-view"> 
                          <div className="ScoreSelector"> 
                            <p className="ScoreSelector-criteria">How likely are you to achieve this goal?</p>
                            <div className="ScoreSelector-scores">
                              <div className="ScoreSelector-score-wrapper"  data-ember-action="" data-ember-action-453="453">
      <i className="ScoreSelector-score likelihood js-score" data-score="0"></i>
      <label className="ScoreSelector-score-label">Not at all</label>
                              </div>
                              <div className="ScoreSelector-score-wrapper"  data-ember-action="" data-ember-action-455="455">
                                <i className="ScoreSelector-score likelihood js-score" data-score="1"></i>
                                <label className="ScoreSelector-score-label"></label>
                              </div>
                              <div className="ScoreSelector-score-wrapper"  data-ember-action="" data-ember-action-457="457">
                                <i className="ScoreSelector-score likelihood js-score" data-score="2"></i>
                                <label className="ScoreSelector-score-label">Unsure</label>
                              </div>
                              <div className="ScoreSelector-score-wrapper"  data-ember-action="" data-ember-action-459="459">
                                <i className="ScoreSelector-score likelihood js-score" data-score="3"></i>
                                <label className="ScoreSelector-score-label"></label>
                              </div>
                              <div className="ScoreSelector-score-wrapper" data-ember-action="" data-ember-action-461="461">
                               <i className="ScoreSelector-score likelihood js-score" data-score="4"></i>
                               <label className="ScoreSelector-score-label">Very likely</label>
                              </div>
                            </div>
                          </div>
                            
                          </div>

                          <div id="ember462" className="ScoreSelector ember-view">
                            <div className="ScoreSelector">
                            <p className="ScoreSelector-criteria">How do you feel about the quality of work done so far?</p>
                            <div className="ScoreSelector-scores">
                              <div className="ScoreSelector-score-wrapper" data-ember-action="" data-ember-action-464="464">
      <i className="ScoreSelector-score quality js-score" data-score="0"></i>
      <label className="ScoreSelector-score-label">Very bad</label>
                              </div>
                              <div className="ScoreSelector-score-wrapper"  data-ember-action="" data-ember-action-466="466">
      <i className="ScoreSelector-score quality js-score" data-score="1"></i>
      <label className="ScoreSelector-score-label"></label>
                              </div>
                              <div className="ScoreSelector-score-wrapper"  data-ember-action="" data-ember-action-468="468">
      <i className="ScoreSelector-score quality js-score" data-score="2"></i>
      <label className="ScoreSelector-score-label">Okay</label>
                              </div>
                              <div className="ScoreSelector-score-wrapper"  data-ember-action="" data-ember-action-470="470">
      <i className="ScoreSelector-score quality js-score" data-score="3"></i>
      <label className="ScoreSelector-score-label"></label>
                              </div>
                              <div className="ScoreSelector-score-wrapper"  data-ember-action="" data-ember-action-472="472">
      <i className="ScoreSelector-score quality js-score" data-score="4"></i>
      <label className="ScoreSelector-score-label">Very good</label>
                              </div>
                           </div>
                          </div>
                         </div>

                          <md-input-container id="ember473" className="md-block md-default-theme ember-view">  <label for="input-ember473">Comments about this week's update</label>
                            <textarea className="md-input" id="input-ember473" aria-describedby="ember473-char-count ember473-error-messages" rows="1"></textarea>
                            <div className="md-errors-spacer" id="ember473-char-count">
                            </div>
                          </md-input-container>


                        </div>


                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseUpdate}>Cancel</Button>
                        <Button onClick={handleCloseUpdate} autoFocus className='save_popup_goal'>
                            Save Update
                        </Button>
                        </DialogActions>
                    </Dialog>

                </div>

		
	)
}