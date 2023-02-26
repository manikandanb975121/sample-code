import React from 'react'

import {useSelector,useDispatch} from "react-redux";

import "../App.css";

import Accordion from 'react-bootstrap/Accordion';

import Userheader from "../component/userprofile/Userheader";
import Userleft from "../component/userprofile/Userleft";
import Userright from "../component/userprofile/Userright";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function DashboardCard() {

  const auth = useSelector(state=>state.auth);
  const couponData = useSelector(state=>state?.category?.coupon)
  const dispatch = useDispatch();

  const [isShow, setIsShow] = React.useState(false);

  const handleClick = () => {
    setIsShow(!isShow);
  };


	return (
		
    <div className='tab2profile'>
      <div className='col-sm-12 goalbody'>
              <div className='dashboard row'>
                <div className='col-sm-6 dashboardleft view-profile-3'>

                { isShow == false ?
                  <div className="PagePanel ProfileUser accent-color firstnote">
                    <h2 className="UserNotesPage-heading">
                      <div className="UserNotesPage-title">Notes</div>
                      <a href="#/user/17748/notes/new" id="ember1201" className="UserNotesPage-newLink md-primary md-default-theme md-button ember-view" onClick={handleClick} >New Note</a>
                    </h2>
                    <p className="PagePanel-note">Use this space to keep track of your 1:1 conversations with Kyle Fisher. Only you will be able to see the notes you take! Need help?
                      <a>Learn more here</a>.
                    </p>
                    <footer className="UserNotesPage-privacy-footer">
                      <p>
                      <i className="fa-regular fa-eye-slash"></i>
                        All notes are <em>private</em>. Only you can see them.
                      </p>
                    </footer>
                    
                    
                  </div>
                    : 
                  <div className="PagePanel ProfileUser accent-color second-note">
                    <div className="UserNotesPage-header primary-background-color">                    
                        <a  href="#/user/17748/notes" id="ember3867" className="ember-view">
                          <button onClick={handleClick} tabindex="0" id="ember3868" className="md-default-theme md-button md-icon-button ember-view md-ink-ripple" type="button">  
                            <i className="fa-solid fa-chevron-left"></i>
                          </button>
                        </a> 
                        <span className="UserNotesPage-headerTitle">Create a Note</span>
                    </div>

                    <div id="ember3870" className="NoteForm ember-view">
                      <md-input-container id="ember3871" className="md-block md-default-theme ember-view">  
                        <label for="input-ember3871">Title</label>
                        <input className="md-input" id="input-ember3871" aria-describedby="ember3871-char-count ember3871-error-messages" type="text"/>
                        <div className="md-errors-spacer" id="ember3871-char-count"></div>
                      </md-input-container>
                      <md-input-container id="ember3872" className="md-block md-default-theme ember-view">  
                       <label for="input-ember3872">Note</label>
                       <textarea className="md-input" id="input-ember3872" aria-describedby="ember3872-char-count ember3872-error-messages" rows="1"></textarea>
                       <div className="md-errors-spacer" id="ember3872-char-count"></div>
                      </md-input-container>
                      <div className="NoteForm-deleteContainer"></div>
                    </div>

                    <footer className="UserNotesPage-privacy-footer">
                      <p>
                      <i className="fa-regular fa-eye-slash"></i>
                        All notes are <em>private</em>. Only you can see them.
                      </p>
                    </footer>
                  </div>
                }
                  
                </div>

                <div className='col-sm-6 dashboardright view-profile-4'>
                  <div className="PagePanel ProfileUser accent-color">
                    <div className="layout-row layout-align-space-between-center">
                      <div className="layout-row">
                        <h2 className="PagePanel-heading">Goals</h2>
                        <div  id="ember1187" className="ember-view">  
                        <md-menu aria-owns="ember-basic-dropdown-content-ember1200" tabindex="-1" data-ebd-id="ember1200-trigger" role="button" id="ember1201" className="ember-basic-dropdown-trigger ember-view">
                          <span  id="ember1202" className="QuarterYearDisplay ember-view">
                            <span className="QuarterYearDisplay-text">
                              <select >
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
                   <a  href="/goals" id="ember1204" className="BriefGoalList-title-action ember-view">View List</a>
                    </div>
                    <Accordion>
                            <Accordion.Item eventKey="0">
                    <div id="ember1585" className="RallyCry ember-view">
                      <div className="BriefGoalList-RallyCry ribbon-simple primary-background-color">
                      <Accordion.Header>
                        <button tabindex="0" id="ember1603" className="md-default-theme md-button RallyCry-create-button ember-view md-ink-ripple" type="button">          
                          <i className="fa-solid fa-plus"></i> Add a Theme for Q4 2022
                          <div className="md-ripple-container"></div>
                        </button>
                      </Accordion.Header>
                      </div>
                    </div>

                    <Accordion.Body>
                      <h1 className="RallyCry-Form-title">Theme for Q4 2022</h1>
                      <label className="RallyCry-Form-label">
                        What is the primary focus of your organization right now?
                        <small>Provide a short, clear statement to focus efforts and serve as a "rally cry" for your organization.</small>
                      </label>

                      <md-input-container id="ember1504" className="md-block md-default-theme md-input-invalid ember-view">
                        <textarea className="view-textarea" id="input-ember1504" aria-describedby="ember1504-char-count ember1504-error-messages" rows="1"></textarea>
                        <div className="md-errors-spacer" id="ember1504-char-count">
                        </div>
                        <div className="md-input-messages-animation md-auto-hide" id="ember1504-error-messages">
                          <div id="error-input-ember1504-0" className="paper-input-error ng-enter ng-enter-active md-input-message-animation">
                            This is required.
                          </div>
                        </div>
                     </md-input-container>

                     <div className="RallyCry-Form-actions">
                       <a href="https://help.khorus.com/article/58-current-theme" target="_blank" className="RallyCry-Form-help-link" >
                         Need help defining a theme?
                       </a>
                      <div>
                        <button tabindex="0" id="ember1506" className="md-default-theme md-button md-primary md-raised ember-view md-ink-ripple" type="button">Save
                        <div className="md-ripple-container"></div>
                      </button>  
                      <button tabindex="0" id="ember1505" className="md-default-theme md-button ember-view md-ink-ripple" type="button">Cancel
                        <div className="md-ripple-container"></div>
                      </button>
                      
                      </div>
                    </div>
                    </Accordion.Body>

                    </Accordion.Item>
                    </Accordion>
                    <div id="ember1587" className="liquid-container ember-view">
                      <div id="ember1601" className="liquid-child ember-view">           
                        <ul className="PagePanel-list">
                          <li className="PagePanel-note">No goals to show</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>  
    </div>
				
		
	)
}