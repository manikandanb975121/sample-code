import React, { useState, useEffect } from "react"; 
import {useDispatch,useSelector} from "react-redux"; 
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import {toast } from 'react-toastify'; 
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import {GET,POST, getCountryList, updateUserProfile} from '../../helper/service'; 
import {baseUrl} from '../../config'; 
import Header from '../common/Header';
import Footer from '../common/Footer';
import Sidebar from '../common/Sidebar';  
import Loader from '../common/Loader';
import Toast from '../common/Toast';
import TacticList from './TacticList';

const moment = require('moment');

const initialValues = { 
  fname:'',
  lname:'',
  designation:'',
  bio:'',
  country:'',
  phone:''
}; 


export default function Profile() {
	const auth = useSelector(state=>state.auth);
  const token = auth.token; 
  const user_id = auth.user.id; 
  const img = baseUrl+"/users/profileImage?token="+token;
  const [countryList, setCountryList] = useState([]);
  const [notificationList, setNotificationList] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(initialValues);  
  const [selectedImage, setSelectedImage] = useState(img);   
  const [loader,setLoader]=useState(false); 
  const notify = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const [myGoalList, setMyGoalList] = useState([]);
  const [result, setResult] = useState({});
  const [totalAvgRate, settotalAvgRate] = useState({});

 
  
  useEffect(() => {  
    fetchProfile();  
    fetchCountryList(); 
    fetchNotification();
    averageRating();
    goalsTacticsProfile();
  }, []); 


  const goalsTacticsProfile = (e) => {
    const url = baseUrl + '/goals-tactics/profile/get';
    GET(url,token).then(data => {   
      setMyGoalList(data.result.goals);
      setResult(data.result); 
    })    
  }
  

  const averageRating = (e) => {
    const url = baseUrl + '/review/average-rating/'+user_id;
    GET(url,token).then(data => {    
      settotalAvgRate(data);  
    })    
  }
 

  const fetchNotification = () => {  
    setLoader(true); 
    const data = {} 
    const url = baseUrl + '/notifications/user/get';
    POST(url, data, token).then(res => {   
      setNotificationList(res.data);
      setLoader(false);
    }) 

  }


  // const fetchGoal = (e) => {
  //   var queryString = "";
  //   queryString = "?search=&sortBy=";
  //   const url = baseUrl + '/goals/user'+queryString;

  //   GET(url,token).then(data => {    
  //     setMyGoalList(data['result']); 
  //   })  
  // }

  const fetchProfile = (e) => {
    const url = baseUrl + '/users/profile';
    GET(url,token).then(data => {   
      setValues({...values,
        ['fname']: data.data.fname, 
        ['lname']: data.data.lname,
        ['phone']: data.data.phone,
        ['designation']: data.data.title,
        ['bio']: data.data.bio,
        ['country']: data.data.country
      });  
      setUserInfo(data.data);
    })    
  }
  

  const fetchCountryList = (e) => { 
    getCountryList(token).then(data => {    
      setCountryList(data.data);
    })  
  }

   


  const handleChange = (e) => { 
    const { name, value } = e.target;   
    setValues({...values,[name]: value,});
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));  
      setValues({...values,['selctedImage']: event.target.files[0]});
    }
   }


   
   const handleUpdate = () => {
    setLoader(true); 
    updateUserProfile(token, values).then(data => {   
      fetchProfile();
      setLoader(false); 
      notify('Profile updated successfully.'); 
    })  
  }


   


  const updatePushNotification = (id, type,enabled,index,userId, e) => {  
      const data = {
        "notifications": [
             {
                "id": id,
                "userId": userId,
                "notificationType": type,
                "enabled": (enabled ? false : true)
            }
        ]
    }
      
    setLoader(true);   
 
    const url = baseUrl + '/notifications/user/update';
    POST(url, data, token).then(res => {   
      fetchNotification(); 
    })

  }

 
 
	return ( 
		<div className="wrapper">
        <div id="content">
        <Loader loading={loader}/>
        <Toast/> 
          <div className="dashboard_main">
            <div className="row">
              <div className="col-md-12">
                <div className="my_profile_wrapper">
                  <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">My Details</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" id="pills-views-tab" data-toggle="pill" href="#pills-views"
                    role="tab" aria-controls="pills-views" aria-selected="false">Notifications</a>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">



                  <div className="tab-pane fade" id="pills-views" role="tabpanel" aria-labelledby="pills-views-tab">
                    <div className="mygoals_inner_section">
                      <div className="mydetails_section">
                        <div className="toggle-switch-section"> 

                          {notificationList?.map((e, index)=>{   
                          var label = "";
                          if(e.notificationType=="GOALS_REMINDER_EMAIL"){
                            label = "Goals Reminder";
                          } else if(e.notificationType=="TACTICS_REMINDER_EMAIL"){
                            label = "Tactics Reminder";
                          } else if(e.notificationType=="REVIEWS_REMINDER_EMAIL"){
                            label = "Reviews Reminder";
                          } else if(e.notificationType=="APPRAISALS_REMINDER_EMAIL"){
                            label = "Appraisals Reminder";
                          }
                          return ( 
                            <label className="toggle">
                            <span className="toggle-label">{label}</span>
                            <input className="toggle-checkbox" type="checkbox" name={e.notificationType} value={1} defaultChecked={(e.enabled ? true : false)} onChange={updatePushNotification.bind(this,e.id, e.notificationType, e.enabled, index, e.userId)} />
                            <div className="toggle-switch" />
                            </label> 
                          )
                          })} 

                          {/* <label className="toggle">
                            <span className="toggle-label">Appraisal Reminders</span>
                            <input className="toggle-checkbox" type="checkbox" defaultChecked />
                            <div className="toggle-switch" />
                          </label>
                          <label className="toggle">
                            <span className="toggle-label">Review Reminders</span>
                            <input className="toggle-checkbox" type="checkbox" defaultChecked />
                            <div className="toggle-switch" />
                          </label> */}
                        </div>
                      </div>
                    </div> 
                  </div>



                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                      <div className="mygoals_inner_section">
                        <div className="mydetails_section">
                          <div className="personal_info">
                            <div className="personal_info_details">
                              <div className="row">
                                <div className="col-md-6"> 
                                  <div className="upload_details">  
                                    <h5>Personal Info</h5>
                                    <p>Upload your photo and personal details here</p>
                                  </div>
                                </div>
                                <div className="col-md-6 personal_details_save">
                                  <button type="button" className="save_personal_info" onClick={handleUpdate}>Save</button>
                                </div>
                              </div>
                            </div>
                            <div className="name_info">
                              <div className="row">
                                <div className="col-md-2 customlabel">
                                  <label>Name</label>
                                </div>
                                
                                <div className="col-md-5">
                                  <input 
                                    type="text" 
                                    className="form-control custom-input" 
                                    placeholder="First name" 
                                    value={values.fname}
                                    name="fname"  
                                    onChange={handleChange}
                                    />
                                  </div>
                                  <div className="col-md-5">
                                  <input 
                                    type="text" 
                                    className="form-control custom-input" 
                                    placeholder="Last name" 
                                    value={values.lname}
                                    name="lname"  
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="email_info">
                              <div className="row">
                                <div className="col-md-2 customlabel">
                                  <label>Email</label>
                                </div>
                                <div className="col-md-9">
                                  <input type="text" className="form-control custom-input" placeholder="Email" readOnly value={userInfo?.email} />
                                </div>
                              </div>
                            </div>

                            <div className="email_info">
                              <div className="row">
                                <div className="col-md-2 customlabel">
                                  <label>Phone</label>
                                </div>
                                <div className="col-md-9">
                                  <input 
                                    type="number" 
                                    className="form-control custom-input" 
                                    placeholder="Phone" 
                                    value={values.phone}
                                    name="phone"  
                                    onChange={handleChange}
                                    />
                                </div>
                              </div>
                            </div>


                            <div className="your_photo_info">
                              <div className="row">
                                <div className="col-md-2 customlabel">
                                  <label>Your Photo</label>
                                </div>
                                <div className="col-md-9">
                                  <div className="personal_info_pic_wrp">
                                    <div className="personal_pic_box">
                                    <img src={selectedImage} style={{width:"98px"}}/>
                                    </div>
                                    <div className="variants">
                                      <div className="file">
                                        <label htmlFor="input-file">
                                          <svg className="downloadfile" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                            <path d="M11 15H13V9H16L12 4L8 9H11V15Z" fill="#009FDF" />
                                            <path d="M20 18H4V11H2V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V11H20V18Z" fill="#009FDF" />
                                          </svg>
                                          Click to upload
                                          SVG, PNG, or JPG (max. 800x800px)
                                        </label>
                                        {/* <input id="input-file" type="file" /> */}
                                        <input type="file" onChange={onImageChange} className="filetype" id="input-file"/>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> 
                            <div className="designation_info">
                              <div className="row">
                                <div className="col-md-2 customlabel">
                                  <label>Designation</label>
                                </div>
                                <div className="col-md-9">
                                  <input 
                                    type="text" 
                                    className="form-control custom-input" 
                                    placeholder="Designation" 
                                    value={values.designation}
                                    name="designation"  
                                    onChange={handleChange}
                                    />

                                </div>
                              </div>
                            </div> 
                            <div className="designation_info">
                              <div className="row">
                                <div className="col-md-2 customlabel">
                                  <label>Country</label>
                                </div> 
                                <div className="col-md-9">
                                  <div className="select-option-info">
                                    <select className="form-control personal_info_select" name="country" onChange={handleChange} value={values.country} >
                                    <option value="">Country</option>
                                    {countryList.map(({ name, code }, index) => <option key={'country_'+index} value={code} >{name}</option>)} 
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="designation_info">
                              <div className="row">
                                <div className="col-md-2 customlabel">
                                  <label>Bio</label>
                                </div>
                                <div className="col-md-9">
                                  <textarea 
                                    placeholder="Enter your bio here" 
                                    className="custom-textarea"
                                    value={values.bio}
                                    name="bio"  
                                    onChange={handleChange}
                                    />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


					
                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                      <div className="row">
                        <div className="col-md-4 pd_right_0">
                          <div className="mygoals_inner_section">
                            <div className="user_profile_pic_wrap">
                              <div className="user_profile_pic"><img src={selectedImage}/></div>
                              <h2 className="user_info">{values.fname} {values.lname} <span>{values.title}</span></h2>
                              <div className="leftsection_info_profile"> 
                                  <div className="rating_star">
                                    <div id="full-stars-example-two">
                                      <div className="rating-group"> 
                                      <Stack spacing={1}> 
                                      <Rating name="half-rating-read" defaultValue={1} precision={0.1} readOnly />
                                      </Stack>

                                      </div>
                                    </div>
                                  </div> 
                              </div>
                            </div>
                            <div className="contact_information">
                              <h2>Contact Information</h2>
                              <ul>
                                <li>
                                  <div className="user_info_contact">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={17} height={12} viewBox="0 0 17 12" fill="none">
                                      <path d="M14.3332 -0.000488281H3.66566C2.19888 -0.000488281 0.998779 1.19961 0.998779 2.6664V9.33361C0.998779 10.8004 2.19888 12.0005 3.66566 12.0005H14.3332C15.8 12.0005 17.0001 10.8004 17.0001 9.33361V2.6664C17.0001 1.19961 15.8 -0.000488281 14.3332 -0.000488281ZM15.4 3.86649L10.1329 7.40012C9.7995 7.60013 9.39946 7.73348 8.99943 7.73348C8.5994 7.73348 8.19937 7.60013 7.866 7.40012L2.59891 3.86649C2.33222 3.66648 2.26555 3.26644 2.46557 2.93308C2.66558 2.6664 3.06561 2.59972 3.39897 2.79974L8.66607 6.33336C8.86609 6.46671 9.19945 6.46671 9.39946 6.33336L14.6666 2.79974C14.9999 2.59972 15.4 2.6664 15.6 2.99976C15.7333 3.26644 15.6666 3.66648 15.4 3.86649Z" fill="#009FDF" />
                                    </svg>
                                  </div>{userInfo.email}
                                </li>
                                <li><div className="user_info_contact"><svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" fill="none">
                                      <path d="M16.4953 12.7265C15.8109 12.0234 13.8656 10.7062 12.5906 10.7062C12.2953 10.7062 12.0375 10.7718 11.8266 10.9078C11.2031 11.3062 10.7062 11.6156 10.4672 11.6156C10.3359 11.6156 10.1953 11.4984 9.88593 11.2312L9.83437 11.1843C8.97655 10.439 8.79374 10.2468 8.46093 9.89995L8.37655 9.81089C8.31562 9.74995 8.26405 9.6937 8.21249 9.64214C7.92187 9.34214 7.71093 9.12651 6.96562 8.28276L6.9328 8.24526C6.57655 7.84214 6.34218 7.57964 6.32812 7.38745C6.31405 7.19995 6.47812 6.89526 6.89531 6.32808C7.40156 5.6437 7.4203 4.79995 6.95624 3.82026C6.58593 3.04683 5.98124 2.3062 5.44687 1.65464L5.39999 1.59839C4.94062 1.03589 4.40624 0.754639 3.81093 0.754639C3.14999 0.754639 2.60155 1.11089 2.31093 1.29839C2.28749 1.31245 2.26405 1.3312 2.24062 1.34526C1.58905 1.75776 1.11562 2.32495 0.937492 2.90151C0.670305 3.7687 0.49218 4.8937 1.77187 7.23276C2.87812 9.25776 3.88124 10.6171 5.47499 12.2531C6.97499 13.7906 7.64062 14.2875 9.13124 15.3656C10.7906 16.5656 12.3844 17.2546 13.5 17.2546C14.5359 17.2546 15.3516 17.2546 16.5141 15.8531C17.7328 14.3812 17.2266 13.4812 16.4953 12.7265Z" fill="#009FDF" />
                                    </svg></div>{userInfo.phone}
                                </li>
                                <li><div className="user_info_contact"><svg xmlns="http://www.w3.org/2000/svg" width={14} height={20} viewBox="0 0 14 20" fill="none">
                                      <path d="M7 0C3.135 0 0 3.135 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.135 10.865 0 7 0ZM7 9.5C5.62 9.5 4.5 8.38 4.5 7C4.5 5.62 5.62 4.5 7 4.5C8.38 4.5 9.5 5.62 9.5 7C9.5 8.38 8.38 9.5 7 9.5Z" fill="#009FDF" />
                                    </svg></div>{userInfo.country}
                                </li>
                              </ul>
                            </div>

                            <div className="bio_section">
                              <h2>Bio</h2>
                              <p>{values?.bio}</p>
                            </div>
                            <div className="info_user_organization">
                              <div className="organization_details">
                                <h2>Organization Name</h2>
                                <strong>{userInfo?.orgName}</strong>
                              </div>
                              <div className="organization_details">
                                <h2>Department</h2> 
                                <strong>{userInfo?.department?.name}</strong>
                              </div>
                            </div>

                          </div>
                        </div>

                        <div className="col-md-8">
                          <div className="mygoals_inner_section">
                            <div className="rating_box_wrap"> 
                              <div className="rating_box">
                                <h2>Ratings</h2>
                                <div className="rating_star">
                                  
                                  <div id="full-stars-example-two"> 
                                      {/* <input disabled defaultChecked className="rating__input rating__input--none" name="rating3" id="rating3-none" defaultValue={0} type="radio" />
                                      <label aria-label="1 star" className="rating__label" htmlFor="rating3-1">
                                        <i className="rating__icon rating__icon--star fa fa-star" />
                                      </label> */}
                                      {/* <input className="rating__input" name="rating3" id="rating3-1" defaultValue={1} type="radio" />
                                      <label aria-label="2 stars" className="rating__label" htmlFor="rating3-2"><i className="rating__icon rating__icon--star fa fa-star" /></label>
                                      <input className="rating__input" name="rating3" id="rating3-2" defaultValue={2} type="radio" />
                                      <label aria-label="3 stars" className="rating__label" htmlFor="rating3-3"><i className="rating__icon rating__icon--star fa fa-star" /></label>
                                      <input className="rating__input" name="rating3" id="rating3-3" defaultValue={3} type="radio" />
                                      <label aria-label="4 stars" className="rating__label" htmlFor="rating3-4"><i className="rating__icon rating__icon--star fa fa-star" /></label>
                                      <input className="rating__input" name="rating3" id="rating3-4" defaultValue={4} type="radio" />
                                      <label aria-label="5 stars" className="rating__label" htmlFor="rating3-5"><i className="rating__icon rating__icon--star fa fa-star" /></label>
                                      <input className="rating__input" name="rating3" id="rating3-5" defaultValue={5} type="radio" /> */}

                                    <Stack spacing={1}> 
                                    <Rating name="half-rating-read" 
                                    defaultValue={result.appraisalRating} 
                                    precision={0.1} 
                                    sx={{
                                      fontSize: '3rem',
                                    }}
                                    class="myGoalListRate"
                                    readOnly />
                                    </Stack>

                                     
                                  </div>
                                </div>
                              </div>
                              <div className="rating_box">
                                <h2>Goals Assigned</h2>
                                <span>{('0' + result.goalsAssigned).slice(-2)}</span>
                              </div>
                              <div className="rating_box">
                                <h2>Running Goals</h2>
                                <span>{('0' + result.runningGoals).slice(-2)}</span>
                              </div>
                              <div className="rating_box">
                                <h2>Completed Goals</h2>
                                <span>{('0' + result.completedGoals).slice(-2)}</span>
                              </div>
                            </div>

                            <div className="rating_stuts_wrapper">
                              <div className="row">

                              {myGoalList?.map((e, index)=>{
                              var clName = "";
                              if(index==0){
                                clName = "col-md-6 pd_right_0";
                              } else {
                                clName = "col-md-6";
                              } 

                              var percentage = e.completionPercent;

                              var imgs = "";
                              if(e.createdByProfileImage){
                                imgs = e.createdByProfileImage;
                              } else {
                                imgs = "/img/placeholder.png";
                              }
 

                              return(
                                <div className={clName}>
                                <div className="rating_stuts">
                                  <div className="top_header">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="goals_status"><label>Goal Status :</label><span>{e.status}</span></div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="completed_status_wrp">
                                          <div className="left_goals_status">
                                            <h4>Start Date
                                              <span>{moment(e.startDate).format('DD MMM YYYY')}</span>
                                            </h4>
                                          </div>
                                          <div className="right_goals_status">
                                            <h4>End Date<span>{moment(e.endDate).format('DD MMM YYYY')}</span></h4>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="goals_status_bar">

                                    <div className="left_status_bar">
                                      <div className="set-size charts-container">

                                      <div style={{ width:95}} className="pie-wrapper progress-45 style-2">
                                      <CircularProgressbar 
                                      value={percentage} 
                                      text={`${percentage}%`} 
                                      styles={buildStyles({ 
                                      strokeLinecap: 'butt',  
                                      pathTransitionDuration: 0.5,  
                                      pathColor: `rgb(250 183 50, ${percentage / 100})`,
                                      textColor: '#000',
                                      trailColor: '#fde9c1',
                                      backgroundColor: '#3e98c7',
                                      })}
                                      />
                                      </div> 
                                      </div>
                                    </div>

                                    <div className="right_status_bar" style={{width:"107px"}}>
                                      <h5>{e.type} Goals
                                      </h5>
                                      <span className="tactics">Tactics  {e.completed}/{e.total}</span>
                                    </div>
                                  </div>
                                  <div className="tactics_status">
                                    <TacticList tacticList={e.tactics}/>
                                    {/* <ul className="clearfix">
                                      <li>
                                        <div className="terms_condition_wrap">
                                          <div className="checked_box clearfix">
                                            <label className="container_checked">
                                              <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                              <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                          </div>
                                        </div>
                                        </li>
                                      <li>
                                        <div className="terms_condition_wrap">
                                          <div className="checked_box clearfix">
                                            <label className="container_checked">
                                              <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                              <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                          </div>
                                        </div>
                                        </li> 
                                    </ul> */}
                                  </div>
                                  <div className="completed_goals_user">
                                    <ul className="clearfix">
                                      <li> <div className="goals_complete_user">
                                          <div className="created_goals_user">
                                            <span>Created By</span>
                                            <div className="goals_user_box">
                                              <div className="user_pro_pic">
                                                <img src={imgs} />
                                              </div>
                                              <div className="created_name">
                                                <h2>{e.createdByName} <span style={{textAlign:"center"}}>{e.createdByTitle}</span></h2>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        </li> 
                                    </ul>
                                  </div>
                                </div>
                              </div> 
                              )
                              })}  
                              </div> 
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>	  
		
	)
}