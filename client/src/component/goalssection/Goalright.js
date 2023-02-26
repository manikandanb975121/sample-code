// import React from 'react'
import { Check } from 'react-feather';

import {useSelector,useDispatch} from "react-redux";

import React, { useState } from "react";
import ReactDOM from "react-dom";

import GoalUpdatePopup from "../goalssection/GoalUpdatePopup";

import GoalFormPopup from "../goalssection/GoalFormPopup";

import Accordion from 'react-bootstrap/Accordion';

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


export default function DashboardCard() {

  const auth = useSelector(state=>state.auth);
  const couponData = useSelector(state=>state?.category?.coupon)
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open2, setOpen2] = React.useState(false);
  const handleClickUpdateOpen = () => {
    setOpen2(true);
  };
  const handleCloseUpdate = () => {
    setOpen2(false);
  };

	return (

        <div className='GoalDisplay-details ember-view'>
            {/* Header part */}
        <header id="ember1789" className="GoalDisplay-details-header ember-view">
            <div className="GoalDisplay-details-header-goalSummary">
                <div className="GoalDisplay-details-header-goalSummaryText">
                    <div id="ember1790" className="mr-2 UserAvatar ember-view">  <div className="img-circle UserAvatar-no-link-img rightheadercircle" data-ember-action="" data-ember-action-1791="1791">KF</div>
                </div>
                    <div>
                    <h2 className="GoalDisplay-details-header-goalTitle">
                        PARENT TEST GOAL 9_14
                        <span className="GoalDisplay-details-header-goalQuater">
                        (Q3 2022)
                        </span>
                    </h2>
                    <div className="GoalDisplay-details-header-goalAuthor">
                        Kyle Fisher, CTO
                    </div>
                    </div>
                </div>
                <div className="GoalDisplay-details-header-goalActions">
                    <span id="ember1792" className="GoalFollowing ember-view">  <span className="fa-stack" data-ember-action="" data-ember-action-1793="1793">
                    <i className="fa icon-star fa-stack-2x"></i>
                </span>
                </span>
                    <a className="GoalDisplay-details-menu-icon" alt="Follow Goal" data-ember-action="" data-ember-action-1794="1794">
                        {/* <i id="GoalDisplay-details-menu-icon" className="icon icon-menu2 ember-tether-target ember-tether-element-attached-top ember-tether-element-attached-right ember-tether-target-attached-top ember-tether-target-attached-right">test</i> */}
                        <Button
                            id="demo-positioned-button"
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                           <i className="fa-solid fa-ellipsis-vertical"></i>
                        </Button>

      
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>
                {/* <i className="icon icon-close GoalDisplay-Menu-icon" data-ember-action="" data-ember-action-3276="3276"></i> */}
                <i className="fa-thin fa-xmark close-goal">X</i>
                <label className="GoalFilters-label">Primary Actions</label>
                <div id="ember3277" className="LinkGroup disable-active-highlight ember-view">
                <span className="LinkGroup-link GoalDisplay-Menu-item" data-ember-action="" data-ember-action-3278="3278">
                    <a href="" id="ember3279" className="ember-view">Update</a>
                </span>
                </div>
                <label className="GoalFilters-label">Advanced Actions</label>
                <div id="ember3280" className="LinkGroup disable-active-highlight ember-view">
                <span className="LinkGroup-link GoalDisplay-Menu-item" data-ember-action="" data-ember-action-3281="3281">
                    <a  href="" id="ember3282" className="ember-view">Review Publication Request</a>
                </span>
                <span className="LinkGroup-link GoalDisplay-Menu-item" data-ember-action="" data-ember-action-3283="3283">
                    <a href="" id="ember3284" className="ember-view"> Change Goal Ownership </a>
                </span>
                <span className="LinkGroup-link GoalDisplay-Menu-item"  data-ember-action="" data-ember-action-3285="3285">
                    <a data-ember-action="" data-ember-action-3286="3286"> Change Parent Goal </a>
                </span>
                </div>
                <label className="GoalFilters-label">Create Actions</label>
                <div id="ember3287" className="LinkGroup disable-active-highlight ember-view">
                <span className="LinkGroup-link GoalDisplay-Menu-item">
                    <a data-ember-action="" data-ember-action-3288="3288"> Create a Contributing Goal </a>
                </span>
                <span className="LinkGroup-link GoalDisplay-Menu-item">
                    <a data-ember-action="" data-ember-action-3289="3289">Create a Copy</a>
                </span>
                </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>

        </MenuItem>
        <MenuItem onClick={handleClose}>

        </MenuItem>
      </Menu>
                    </a>
                </div>
            </div>

            <nav className="GoalDisplay-details-header-nav">
                <div id="ember341" className="ember-view">
                    <a href="">Goal Hierarchy</a>
                </div>
            </nav>

        </header>
         {/* End header part */}

         {/* second section start */}
        <section id="GoalDisplay-details-body" className="GoalDisplay-details-body">

            <div id="ember838" className="GoalDisplay-Banner ember-view">
                <div className="GoalDisplay-Banner-left-container">
                    <div>
                    <i className="icon icon-review-out GoalDisplay-Banner-badge"></i>
                    </div>
                    <div>
                    This goal is pending manager review <br/>
                    <small className="GoalDisplay-Banner-subtitle">Submitted for review 14 days ago</small>
                    </div>
                </div>
                <div className="GoalDisplay-Banner-right-container">
                    
                </div>
            </div>

            <div id="ember349" className="GoalDisplay-Banner is-cta ember-view">
                <div className="GoalDisplay-Banner-left-container">
                    <div>
                    </div>
                    <div> This goal needs an update.
                    
                    </div>
                </div>
                
                <GoalUpdatePopup />

            </div>

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
                <div data-week="12" id="ember394" className="Trend-week is-updatable is-solicited ember-view" onClick={handleClickUpdateOpen} >
                    <span className="Trend-week-date"> 9/18 </span>
                    <div id="ember395" className="ember-view">
                    <div id="ember396" className="Trend-scores ember-view">
                        <i className="Trend-score Trend-likelihood"></i>
                        <i className="Trend-score Trend-quality"></i>
                    </div>
                    </div>
                </div>
                <div data-week="13" id="ember398" className="Trend-week is-updatable is-solicited ember-view" onClick={handleClickUpdateOpen}>
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

            <h3 className="GoalDisplay-details-columnTitle">History and Comments</h3>

            <section id="ember406" className="GoalCommentableList ember-view">
                <div id="ember445" className="GoalCommentableList-item GoalCommentableGoalStatus ember-view">
                <Accordion>
                            <Accordion.Item eventKey="0">
                    <div className="GoalCommentable-header">
                    <div className="GoalCommentable-graphic">
                        <div className="PredictionTrend--single-week">
                        <div id="ember446" className="Trend-week ember-view">
                            <div id="ember447" className="Trend-scores ember-view">
                            <i className="Trend-score Trend-likelihood"></i>
                            <i className="Trend-score Trend-quality"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="GoalCommentable-text-container">
                        <div className="GoalCommentable-title">Week 14</div>
                        <p className="GoalCommentable-subtitle"> likelihood, quality</p>
                    </div>
                    <div className="GoalCommentable-add-comment">
                    <Accordion.Header>
                        <button tabindex="0" id="ember448" className="md-default-theme md-button md-icon-button ember-view md-ink-ripple" type="button">
                        <span id="ember449" className="fa-stack AddCommentIcon-composed-icon ember-view">
                            <span className="fa-stack">
                            <i className="fa fa-comment-o fa-stack-2x" aria-hidden="true">+</i>
                            <i className="fa fa-plus fa-stack-1x" aria-hidden="true">+</i>
                            </span>
                        </span>
                        <div className="md-ripple-container"></div>
                        </button>
                    </Accordion.Header>
                    </div>
                    </div>
                    <div id="ember451" className="liquid-container ember-view">
                    
                    </div>
                    <Accordion.Body>
                        <div id="ember735" className="CommentForm is-private ember-view">
                        <form>
                        <md-input-container id="ember569" className="md-block md-default-theme ember-view">  <label for="input-ember569">Comment</label>
                        <textarea className="md-input ng-dirty" id="input-ember569" aria-describedby="ember569-char-count ember569-error-messages" rows="1"></textarea>
                        <div className="md-errors-spacer" id="ember569-char-count">
                        </div>
                        </md-input-container>
                        <div className="CommentForm-actions">
                            <button  disabled="" tabindex="-1" id="ember570" className="goals-accordion-btn md-default-theme md-button md-primary md-raised ember-view md-ink-ripple" type="button">Save
                                <div className="md-ripple-container"></div>
                            </button>      
                            <button  tabindex="0" id="ember571" className="md-default-theme md-button ember-view md-ink-ripple" type="button">Cancel
                                <div className="md-ripple-container"></div>
                            </button>
                        </div>
                        </form>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                </div>
                <div className="GoalCommentableList-bottom-border"></div>

                <div id="ember445" className="GoalCommentableList-item GoalCommentableGoalStatus ember-view">
                <Accordion>
                            <Accordion.Item eventKey="0">
                    <div className="GoalCommentable-header">
                    <div className="GoalCommentable-graphic">
                        <div className="PredictionTrend--single-week">
                        <div id="ember446" className="Trend-week ember-view">
                            <div id="ember447" className="Trend-scores ember-view">
                            <i className="Trend-score Trend-likelihood"></i>
                            <i className="Trend-score Trend-quality"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="GoalCommentable-text-container">
                        <div className="GoalCommentable-title">Week 14</div>
                        <p className="GoalCommentable-subtitle"> likelihood, quality</p>
                    </div>
                    <div className="GoalCommentable-add-comment">
                    <Accordion.Header>
                        <button tabindex="0" id="ember448" className="md-default-theme md-button md-icon-button ember-view md-ink-ripple" type="button">
                        <span id="ember449" className="fa-stack AddCommentIcon-composed-icon ember-view">
                            <span className="fa-stack">
                            <i className="fa fa-comment-o fa-stack-2x" aria-hidden="true">+</i>
                            <i className="fa fa-plus fa-stack-1x" aria-hidden="true">+</i>
                            </span>
                        </span>
                        <div className="md-ripple-container"></div>
                        </button>
                        </Accordion.Header>
                    </div>
                    </div>
                    <div id="ember451" className="liquid-container ember-view">
                    
                    </div>
                    <Accordion.Body>
                        <div id="ember735" className="CommentForm is-private ember-view">
                        <form>
                        <md-input-container id="ember569" className="md-block md-default-theme ember-view">  <label for="input-ember569">Comment</label>
                        <textarea className="md-input ng-dirty" id="input-ember569" aria-describedby="ember569-char-count ember569-error-messages" rows="1"></textarea>
                        <div className="md-errors-spacer" id="ember569-char-count">
                        </div>
                        </md-input-container>
                        <div className="CommentForm-actions">
                            <button  disabled="" tabindex="-1" id="ember570" className="goals-accordion-btn md-default-theme md-button md-primary md-raised ember-view md-ink-ripple" type="button">Save
                                <div className="md-ripple-container"></div>
                            </button>      
                            <button  tabindex="0" id="ember571" className="md-default-theme md-button ember-view md-ink-ripple" type="button">Cancel
                                <div className="md-ripple-container"></div>
                            </button>
                        </div>
                        </form>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                </div>
                <div className="GoalCommentableList-bottom-border"></div>


                <div id="ember445" className="GoalCommentableList-item GoalCommentableGoalStatus ember-view">
                <Accordion>
                            <Accordion.Item eventKey="0">
                    <div className="GoalCommentable-header">
                    <div className="GoalCommentable-graphic">
                        <div className="PredictionTrend--single-week">
                        <div id="ember446" className="Trend-week ember-view">
                            <div id="ember447" className="Trend-scores ember-view">
                            <i className="Trend-score Trend-likelihood"></i>
                            <i className="Trend-score Trend-quality"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="GoalCommentable-text-container">
                        <div className="GoalCommentable-title">Week 14</div>
                        <p className="GoalCommentable-subtitle"> likelihood, quality</p>
                    </div>
                    <div className="GoalCommentable-add-comment">
                    <Accordion.Header>
                        <button tabindex="0" id="ember448" className="md-default-theme md-button md-icon-button ember-view md-ink-ripple" type="button">
                        <span id="ember449" className="fa-stack AddCommentIcon-composed-icon ember-view">
                            <span className="fa-stack">
                            <i className="fa fa-comment-o fa-stack-2x" aria-hidden="true"></i>
                            <i className="fa fa-plus fa-stack-1x" aria-hidden="true"></i>
                            </span>
                        </span>
                        <div className="md-ripple-container"></div>
                        </button>
                    </Accordion.Header>
                    </div>
                    </div>
                    <div id="ember451" className="liquid-container ember-view">
                    
                    </div>
                    <Accordion.Body>
                        <div id="ember735" className="CommentForm is-private ember-view">
                        {/* <div className="CommentList-privacy-banner">
                        <div><strong>Private:</strong></div>
                        <div>Comments here are only visible to the Goal Owner, Manager, and Goal Admins</div>
                        </div> */}
                        <form>
                        <md-input-container id="ember569" className="md-block md-default-theme ember-view">  <label for="input-ember569">Comment</label>
                        <textarea className="md-input ng-dirty" id="input-ember569" aria-describedby="ember569-char-count ember569-error-messages" rows="1"></textarea>
                        <div className="md-errors-spacer" id="ember569-char-count">
                        </div>
                        </md-input-container>
                        <div className="CommentForm-actions">
                            <button  disabled="" tabindex="-1" id="ember570" className="goals-accordion-btn md-default-theme md-button md-primary md-raised ember-view md-ink-ripple" type="button">Save
                                <div className="md-ripple-container"></div>
                            </button>      
                            <button  tabindex="0" id="ember571" className="md-default-theme md-button ember-view md-ink-ripple" type="button">Cancel
                                <div className="md-ripple-container"></div>
                            </button>
                        </div>
                        </form>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                </div>


                <div className="GoalCommentableList-bottom-border"></div>


                
                <div id="ember472" className="GoalCommentableList-item GoalCommentableGoalStateTransition ember-view">
                <Accordion>
                            <Accordion.Item eventKey="0">
                    <div className="GoalCommentable-header">
                        <div className="GoalCommentable-graphic">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                        </div>
                        <div className="GoalCommentable-text-container">
                            <div className="GoalCommentable-title">Submitted for approval</div>
                            <p className="GoalCommentable-subtitle">by Kyle Fisher</p>
                            <p className="GoalCommentable-subtitle">Sep 15, 2022 1:42 AM</p>
                        </div>
                        <div className="GoalCommentable-add-comment">
                        <Accordion.Header>
                        <button tabindex="0" id="ember474" className="md-default-theme md-button md-icon-button ember-view md-ink-ripple" type="button">
                            <span id="ember475" className="fa-stack AddCommentIcon-composed-icon ember-view">
                            <span className="fa-stack">
                              <i className="fa fa-comment-o fa-stack-2x" aria-hidden="true"></i>
                              <i className="fa fa-plus fa-stack-1x" aria-hidden="true"></i>
                            </span>
                            </span>
                            <div className="md-ripple-container"></div>
                        </button>
                        </Accordion.Header>
                        </div>
                    </div>

                    <div id="ember477" className="liquid-container ember-view">
                        
                    </div>
                    <Accordion.Body>
                        <div id="ember735" className="CommentForm is-private ember-view">
                        <div className="CommentList-privacy-banner">
                        <div><strong>Private:</strong></div>
                        <div>Comments here are only visible to the Goal Owner, Manager, and Goal Admins</div>
                        </div>
                        <form>
                        <md-input-container id="ember569" className="md-block md-default-theme ember-view">  <label for="input-ember569">Comment</label>
                        <textarea className="md-input ng-dirty" id="input-ember569" aria-describedby="ember569-char-count ember569-error-messages" rows="1"></textarea>
                        <div className="md-errors-spacer" id="ember569-char-count">
                        </div>
                        </md-input-container>
                        <div className="CommentForm-actions">
                            <button  disabled="" tabindex="-1" id="ember570" className="goals-accordion-btn md-default-theme md-button md-primary md-raised ember-view md-ink-ripple" type="button">Save
                                <div className="md-ripple-container"></div>
                            </button>      
                            <button  tabindex="0" id="ember571" className="md-default-theme md-button ember-view md-ink-ripple" type="button">Cancel
                                <div className="md-ripple-container"></div>
                            </button>
                        </div>
                        </form>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                </div>


                <div className="GoalCommentableList-bottom-border"></div>


                <div id="ember472" className="GoalCommentableList-item GoalCommentableGoalStateTransition ember-view">
                <Accordion>
                            <Accordion.Item eventKey="0">
                    <div className="GoalCommentable-header">
                        <div className="GoalCommentable-graphic">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                        </div>
                        <div className="GoalCommentable-text-container">
                            <div className="GoalCommentable-title">Draft created</div>
                            <p className="GoalCommentable-subtitle">by Kyle Fisher</p>
                            <p className="GoalCommentable-subtitle">Sep 15, 2022 1:42 AM</p>
                        </div>
                        <div className="GoalCommentable-add-comment">
                        <Accordion.Header>
                        <button tabindex="0" id="ember474" className="md-default-theme md-button md-icon-button ember-view md-ink-ripple" type="button">
                            <span id="ember475" className="fa-stack AddCommentIcon-composed-icon ember-view">
                            <span className="fa-stack">
                                <i className="fa fa-comment-o fa-stack-2x" aria-hidden="true"></i>
                                <i className="fa fa-plus fa-stack-1x" aria-hidden="true"></i>
                            </span>
                            </span>
                            <div className="md-ripple-container"></div>
                        </button>
                        </Accordion.Header>
                        </div>
                    </div>

                    <div id="ember477" className="liquid-container ember-view">
                        
                    </div>
                    <Accordion.Body>
                    <div id="ember735" className="CommentForm is-private ember-view">
                    <div className="CommentList-privacy-banner">
                      <div><strong>Private:</strong></div>
                      <div>Comments here are only visible to the Goal Owner, Manager, and Goal Admins</div>
                    </div>
                    <form>
                    <md-input-container id="ember569" className="md-block md-default-theme ember-view">  <label for="input-ember569">Comment</label>
                      <textarea className="md-input ng-dirty" id="input-ember569" aria-describedby="ember569-char-count ember569-error-messages" rows="1"></textarea>
                     <div className="md-errors-spacer" id="ember569-char-count">
                     </div>
                    </md-input-container>
                   <div className="CommentForm-actions">
                      <button  disabled="" tabindex="-1" id="ember570" className="goals-accordion-btn md-default-theme md-button md-primary md-raised ember-view md-ink-ripple" type="button">Save
                        <div className="md-ripple-container"></div>
                      </button>      
                      <button  tabindex="0" id="ember571" className="md-default-theme md-button ember-view md-ink-ripple" type="button">Cancel
                        <div className="md-ripple-container"></div>
                      </button>
                    </div>
                    </form>
                    </div>
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                </div>
                <div className="GoalCommentableList-bottom-border"></div>
            
            </section>
            

            {/* <div id="ember340" className="GoalDisplay-Banner ember-view">
                <div className="GoalDisplay-Banner-left-container">
                    <div>
                        <i className="icon icon-review-out GoalDisplay-Banner-badge"></i>
                    </div>
                    <div>          This goal is pending manager review <br></br>
                        <small className="GoalDisplay-Banner-subtitle">Submitted for review 2 days ago</small>
                    </div>
                </div>
                <div className="GoalDisplay-Banner-right-container">
                </div>
            </div> */}

            
        </section>
           <GoalFormPopup />
        </div>

		
	)
}