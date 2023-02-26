import React from 'react'

import {useSelector,useDispatch} from "react-redux";
import Button from '@mui/material/Button';

import "../App.css";

import Userheader from "../component/userprofile/Userheader";
import Userleft from "../component/userprofile/Userleft";
import Userright from "../component/userprofile/Userright";
import AssignManager from "../component/userprofilepopup/AssignManager";
import ChangePassword from "../component/userprofilepopup/ChangePassword";
import DeactivateUser from "../component/userprofilepopup/DeactivateUser";




import Userprofiletab2 from "../component/Userprofiletab2";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

export default function DashboardCard() {

  const auth = useSelector(state=>state.auth);
  const couponData = useSelector(state=>state?.category?.coupon)
  const dispatch = useDispatch();

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isShow, setIsShow] = React.useState(false);

  const handleClickeditprofile = () => {
    setIsShow(!isShow);
  };


	return (
		
    <div className='goals row profile-swap'>
        <div className='col-sm-12 goalmain'>
            <Userheader />
        </div>

        <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Personal" value="1" />
                <Tab label="1:1 Notes" value="2" />
            </TabList>
            </Box>
            <TabPanel value="1">
            <div className='col-sm-12 goalbody view-profile-1'>
              <div className='dashboard row'>
                <div className='col-sm-6 dashboardleft'>
                  

                  { isShow == false ?
                    <div className="PagePanel ProfileUser accent-color">
                      <div className="UserInfoCard-heading editprofile1">
                        <h2 className="PagePanel-heading">Details</h2>
                        <div className="UserInfoCard-heading-right">
                          <a href="/organization" id="ember943" className="UserInfoCard-heading-link ember-view">View in Org Chart</a>
                          <div id="ember944" className="UserInfoCard-Menu ember-view">
                              <div id="ember945" className="MoreMenu Dropdown Dropdown MoreMenu ember-view"> 
                                <button  
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                tabindex="0" className="md-default-theme md-button md-icon-button ember-view md-ink-ripple" type="button">
                                  <i className="fa-solid fa-ellipsis-vertical"></i>
                                </button>
                                <Menu
                                id="user_tab1_left"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                className="profile-tab1-viewchart"
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'left',
                                }}
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'left',
                                }}
                                >
                            <MenuItem onClick={handleClickeditprofile}>
                              Edit Profile Details
                            </MenuItem>
                            <MenuItem>
                            {/* <Link to= "/" >
                              Assign Manager</Link> */}
                              <AssignManager />
                            </MenuItem>
                            <MenuItem>
                            {/* <Link to= "/" >
                              Change Password</Link> */}
                              <ChangePassword />
                            </MenuItem>
                            <MenuItem>
                            {/* <Link to= "/" >
                              Deactivate</Link> */}
                              <DeactivateUser />
                            </MenuItem>
                            </Menu>
                              </div>
                          </div>
                      </div>
                      </div>
                      <div id="ember1169" className="liquid-container ember-view" >
                          <div id="ember1172" className="liquid-child ember-view" >            
                            <div id="ember1173" className="ember-view">
                              <div id="ember1174" className="ember-view">
                                <div id="ember1175" className="ember-view">
                                  <div id="ember1176" className="ember-view"></div>
                                </div>
                              </div>

                          <div id="ember1177" className="ember-view">
                            <div id="ember1178" className="ember-view">
                              <div id="ember1179" className="ember-view"> </div>
                            </div>
                          </div>

                          <section className="PagePanel-section ProfileUser-details">


                          <div className="ProfileUser-row">
                            <p>
                              <label className="ProfileUser-detail-label">Email:</label>
                              <a href="mailto:kyle.fisher@qs2500.com">kyle.fisher@qs2500.com</a>
                            </p>
                          </div>
                          <p>
                            <label className="ProfileUser-detail-label ProfileUser-role-label">Joined Khorus:</label>
                            Sep 14, 2022
                          </p>
                          <p>
                            <label className="ProfileUser-detail-label ProfileUser-role-label">Time Zone:</label>
                            Central Time (US &amp; Canada)
                          </p>
                          <p>
                            <label className="ProfileUser-detail-label ProfileUser-role-label">Roles:</label> Manager
                          </p>
                          <div id="user-roles-buttons"></div>
                          <label className="ProfileUser-detail-label">Manager</label>
                          <div className="ProfileUser-org-manager">
                            <div  id="ember1181" className="UserAvatar ember-view">  
                              <div className="img-circle UserAvatar-no-link-img" data-ember-action="" data-ember-action-1182="1182"></div>
                            </div>
                            <p className="ProfileUser-org-user">
                              <a  href="#/user/undefined" id="ember1183" className="name-title accent-color ember-view"></a> 
                              <small className="department"></small>
                            </p>
                          </div>

                        <label className="ProfileUser-detail-label">Direct Reports</label>
                        <div id="ember1184" className="ExpandableUserList ember-view">          
                          <span className="note">No direct reports</span>
                          </div>
                          </section>
                        </div>

                      </div>
                      </div>
                    </div>
                    :
                    <div className="PagePanel ProfileUser accent-color edit-profile-details">
                      <div className="UserInfoCard-heading editprofile2">
                        <h2 className="PagePanel-heading">Edit Profile</h2>
                        <div className="UserInfoCard-heading-right">
                          <a href="/organization" id="ember943" className="UserInfoCard-heading-link ember-view">View in Org Chart</a>
                          <div id="ember944" className="UserInfoCard-Menu ember-view">
                              <div id="ember945" className="MoreMenu Dropdown Dropdown MoreMenu ember-view"> 
                                
                              </div>
                          </div>
                      </div>
                      </div>
                      <form action="">
                      <div className="edit-profile">
                        <label for="p-username">Username</label>
                        <input type="text" id="p-username" tabindex="1" value='kylefisher' />
                      </div>
                      <div className="edit-profile">
                        <label for="p-email">Email</label>
                        <input type="text" id="p-email" tabindex="1" value='abc@example.com' />
                      </div>
                      <div className="edit-profile">
                        <label for="p-password">Password</label>
                        <input type="text" id="p-password" tabindex="1" value='********' />
                      </div>
                      <div className="edit-profile">
                        <label for="p-role">Role</label>
                        <input type="text" id="p-role" tabindex="1" value='Manager' />
                      </div>
                      </form>
                      
                      
                    </div>
                  }

                    


                  
                  <Userright />
                </div>

                <div className='col-sm-6 dashboardright'>
                <Userleft />
                </div>
              </div>
            </div>
            </TabPanel>
            <TabPanel value="2">
                <Userprofiletab2 />
            </TabPanel>
        </TabContext>
        </Box>

        

    </div>
				
		
	)
}