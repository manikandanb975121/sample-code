import React from 'react'

import {useSelector,useDispatch} from "react-redux";

import Notification from '../../assets/clipboard.png';
import Clipboard  from '../../assets/notification.png';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

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

	return (

      <div className="PagePanel Reminders accent-color goal-header">
         <header id="layout-top-nav" className="primary-background-color">
           <div id="ember41" className="ember-view">
             <div className="container-fluid shadow-z-1">
             <div className="TopBar">
               <section className="TopBar-main">
               <h1 className="TopBar-title">
                  Goals
               </h1>
            </section>
            <section className="TopBar-actions">
               <ul>
                  <li id="ember45" className="NavDropdown NotificationDropdown ember-view">
                     <button tabindex="0" id="ember46" className="TopBar-btn md-default-theme md-button md-icon-button ember-view md-ink-ripple" type="button">
                        <i className="fa-solid fa-bell"><img src={Clipboard} /></i>
                        <div className="NavDropdown-badge bounceIn animated">
                           1
                        </div>
                        <div className="md-ripple-container"></div>
                     </button>
                     <div id="ember49" className="NavDropdown-panel liquid-container ember-view">
                     </div>
                  </li>
                  <li id="ember52" className="NavDropdown ActionItemDropdown ember-view">
                     <button tabindex="0" id="ember53" className="TopBar-btn md-default-theme md-button md-icon-button ember-view md-ink-ripple" type="button">
                        <i className="fa-solid fa-clipboard"><img src={Notification} /></i>
                        <div className="md-ripple-container"></div>
                     </button>
                     <div id="ember55" className="NavDropdown-panel liquid-container ember-view">
                     </div>
                  </li>
                  <li>
                     <div className="TopBar-user">
                        <div id="ember58" className="small UserAvatar ember-view">
                           <div className="img-circle UserAvatar-no-link-img" data-ember-action="" data-ember-action-59="59">KF</div>
                        </div>
                        <div id="ember60" className="Dropdown Dropdown UserMenu ember-view">
                           <div className="User--details">
                              <span className="User--name" 
                                  id="basic-button"
                                  aria-controls={open ? 'basic-menu' : undefined}
                                  aria-haspopup="true"
                                  aria-expanded={open ? 'true' : undefined}
                                  onClick={handleClick}
                                 >Kyle Fisher <i className="fa-solid fa-caret-down"></i></span>
                           </div>
                           <Menu
                              id="demo-positioned-menu"
                              aria-labelledby="demo-positioned-button"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              className="profile_logout"
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
                           <Link to= "/userprofile" >
                             View profile</Link>
                           </MenuItem>
                              
                              
                              
                              {/* <MenuItem onClick={handleClose}>
                                      View profile
                              </MenuItem> */}
                              <MenuItem onClick={handleClose}>
                                       Sign out
                              </MenuItem>
                              </Menu>
                           {/* <div className="Dropdown--container">
                              <div className="Dropdown--menu">
                                 <nav className="sheet">
                                    <ul>
                                       <li id="ember61" className="btn-user ember-view">View profile</li>
                                       <li className="signout" data-ember-action="" data-ember-action-62="62">Sign out</li>
                                    </ul>
                                 </nav>
                              </div>
                           </div> */}
                        </div>
                     </div>
                  </li>
               </ul>
            </section>
         </div>
      </div>
   </div>
   <div className="Subnav">
      <div className="Subnav-wrapper">
         <div className="Subnav-tabs">
         </div>
         <div className="Subnav-actions">
         </div>
      </div>
   </div>
</header>
        {/* <h2 className="PagePanel-heading">Company Goals Q2 2021</h2>
        <div id="ember67" className="liquid-container ember-view">
           <div id="ember149" className="liquid-child ember-view">
              <ul className="borderright PagePanel-list RemindersList">
                 <li id="ember152" className="PagePanel-list-item RemindersList-reminder ember-view">
                    Add Theme for Q2
                    <a href="" id="ember155" className="RemindersList-reminder-action accent-color ember-view">   
                        <i className="icon icon-add"></i>
                        Update
                    </a>
                 </li>
              </ul>
              
           </div>

        </div> */}
      </div>

		
	)
}