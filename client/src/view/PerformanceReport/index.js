import React, { useState, useEffect } from "react"; 
import {useDispatch,useSelector} from "react-redux"; 
import {baseUrl} from '../../config'; 
import {GET} from '../../helper/service';   
import Loader from '../common/Loader';
const moment = require('moment');

export default function Index() {
	const auth = useSelector(state=>state.auth);
  const [performenceReport, setPerformenceReport] = useState([]);
  const [loader,setLoader]=useState(false); 
  const token = auth.token;   

  useEffect(() => {  
    getPerformanceReport();    
  }, []); 

  const getPerformanceReport = (e) => {
    setLoader(true); 
    const url = baseUrl + '/goals-tactics/performance/get/2';
    GET(url,token).then(data => { 
      console.log("data res ====== ", data)   
      setPerformenceReport(data.result); 
      setLoader(false); 
    })    
  }




	return (  
    <div className="wrapper">
      <Loader loading={loader}/>
        <div id="content"> 
          <div className="dashboard_main">
            <div className="col-md-12">
              <div className="mygoals_inner_section">
                {/* <div class="performence_date">
                   <h5> Report Date <span>16/12/2022</span></h5>
                </div> */}
                <div className="row">
                  <div className="col-md-4">
                  </div> 
                  <div className="col-md-4"> 
                    <h2 className="user_info">Performance Report</h2> 
                  </div> 
                  <div className="col-md-4">
                    <p className="performence_text">
                    </p><div className="performence_date">
                      <h5> Report Date <span>{moment(new Date()).format('DD/MM/YYYY')}</span></h5>
                    </div>             
                    <p />
                  </div>  
                </div> 
                <div className="performence_wrp">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="user_profile_pic"><img src={performenceReport?.profile?.profileImage}/></div>
                      <h2 className="user_info">{performenceReport?.profile?.fname} {performenceReport?.profile?.lname} <span>{performenceReport?.profile?.title}</span></h2>
                    </div> 
                    <div className="col-md-9">
                      <p className="performence_text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy Lorem Ipsum has been the industry's standard dummy text</p>
                    </div>  
                  </div>  
                </div>
                <div className="rating_box_wrap">
                  <div className="rating_box">
                    <h2>Ratings</h2>
                    <div className="rating_star">
                      <div id="full-stars-example-two">
                        <div className="rating-group">
                          <input disabled defaultChecked className="rating__input rating__input--none" name="rating3" id="rating3-none" defaultValue={0} type="radio" />
                          <label aria-label="1 star" className="rating__label" htmlFor="rating3-1">
                            <i className="rating__icon rating__icon--star fa fa-star" />
                          </label>
                          <input className="rating__input" name="rating3" id="rating3-1" defaultValue={1} type="radio" />
                          <label aria-label="2 stars" className="rating__label" htmlFor="rating3-2"><i className="rating__icon rating__icon--star fa fa-star" /></label>
                          <input className="rating__input" name="rating3" id="rating3-2" defaultValue={2} type="radio" />
                          <label aria-label="3 stars" className="rating__label" htmlFor="rating3-3"><i className="rating__icon rating__icon--star fa fa-star" /></label>
                          <input className="rating__input" name="rating3" id="rating3-3" defaultValue={3} type="radio" />
                          <label aria-label="4 stars" className="rating__label" htmlFor="rating3-4"><i className="rating__icon rating__icon--star fa fa-star" /></label>
                          <input className="rating__input" name="rating3" id="rating3-4" defaultValue={4} type="radio" />
                          <label aria-label="5 stars" className="rating__label" htmlFor="rating3-5"><i className="rating__icon rating__icon--star fa fa-star" /></label>
                          <input className="rating__input" name="rating3" id="rating3-5" defaultValue={5} type="radio" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rating_box">
                    <h2>Goals Assigned</h2>  
                    <span>04</span>
                  </div>
                  <div className="rating_box">
                    <h2>Running Goals</h2>
                    <span>02</span>
                  </div>
                  <div className="rating_box">
                    <h2>Completed Goals</h2>
                    <span>02</span>
                  </div>
                </div>
                <div className="rating_stuts_wrapper">
                  <div className="row">
                    <div className="col-md-6 pd_right_0">
                      <div className="rating_stuts">
                        <div className="top_header">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="goals_status"><label>Goal Status :</label><span>Completed</span></div>
                            </div>
                            <div className="col-md-6">
                              <div className="completed_status_wrp">
                                <div className="left_goals_status">
                                  <h4>Start Date
                                    <span>1 DEC 2022</span>
                                  </h4>
                                </div>
                                <div className="right_goals_status">
                                  <h4>End Date<span>5 DEC 2022</span></h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="goals_status_bar">
                          <div className="left_status_bar">
                            <div className="set-size charts-container">
                              <div className="pie-wrapper progress-45 style-2">
                                <span className="label">83<span className="smaller">%</span></span>
                                <div className="pie">
                                  <div className="left-side half-circle" />
                                  <div className="right-side half-circle" />
                                </div>
                                <div className="shadow" />
                              </div>
                            </div>
                          </div>
                          <div className="right_status_bar">
                            <h5>Company Goals
                            </h5>
                            <span className="tactics">Tactics  7/7</span>
                          </div>
                        </div>
                        <div className="tactics_status">
                          <ul className="clearfix">
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                          </ul>
                        </div>
                        <div className="completed_goals_user">
                          <ul className="clearfix">
                            <li> <div className="goals_complete_user">
                                <div className="created_goals_user">
                                  <span>Created By</span>
                                  <div className="goals_user_box">
                                    <div className="user_pro_pic">
                                      <img src="/img/user_info.png" />
                                    </div>
                                    <div className="created_name">
                                      <h2>Kyle Fisher <span>Manager</span></h2>
                                    </div>
                                  </div>
                                </div>
                              </div></li>
                            <li><div className="goals_complete_user">
                                <div className="created_goals_user">
                                  <span>Assigned to</span>
                                  <div className="goals_user_box">
                                    <div className="user_pro_pic">
                                      <img src="/img/user_info.png" />
                                    </div>
                                    <div className="created_name">
                                      <h2>Kyle Fisher <span>Manager</span></h2>
                                    </div>
                                  </div>
                                </div>
                              </div></li>
                            <li><div className="goals_complete_user">
                                <div className="created_goals_user">
                                  <span>&nbsp;</span>
                                  <div className="goals_user_box">
                                    <div className="user_pro_pic">
                                      <img src="/img/user_info.png" />
                                    </div>
                                    <div className="created_name">
                                      <h2>Kyle Fisher <span>Manager</span></h2>
                                    </div>
                                  </div>
                                </div>
                              </div></li>
                            <li>
                              <div className="goals_complete_user">
                                <div className="created_goals_user">
                                  <span>&nbsp;</span>
                                  <div className="goals_user_box">
                                    <div className="user_pro_pic">
                                      <img src="/img/user_info.png" />
                                    </div>
                                    <div className="created_name">
                                      <h2>Kyle Fisher <span>Manager</span></h2>
                                    </div>
                                  </div>
                                </div>
                              </div></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="rating_stuts right_top_header">
                        <div className="top_header">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="goals_status"><label>Goal Status :</label><span>Completed</span></div>
                            </div>
                            <div className="col-md-6">
                              <div className="completed_status_wrp">
                                <div className="left_goals_status">
                                  <h4>Start Date
                                    <span>1 DEC 2022</span>
                                  </h4>
                                </div>
                                <div className="right_goals_status">
                                  <h4>End Date<span>5 DEC 2022</span></h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="goals_status_bar">
                          <div className="left_status_bar">
                            <div className="set-size charts-container">
                              <div className="pie-wrapper progress-45 style-2">
                                <span className="label">83<span className="smaller">%</span></span>
                                <div className="pie">
                                  <div className="left-side half-circle" />
                                  <div className="right-side half-circle" />
                                </div>
                                <div className="shadow" />
                              </div>
                            </div>
                          </div>
                          <div className="right_status_bar">
                            <h5>Company Goals
                            </h5>
                            <span className="tactics">Tactics  7/7</span>
                          </div>
                        </div>
                        <div className="tactics_status">
                          <ul className="clearfix">
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                          </ul>
                        </div>
                        <div className="completed_goals_user">
                          <ul className="clearfix">
                            <li> <div className="goals_complete_user">
                                <div className="created_goals_user">
                                  <span>Created By</span>
                                  <div className="goals_user_box">
                                    <div className="user_pro_pic">
                                      <img src="/img/user_info.png" />
                                    </div>
                                    <div className="created_name">
                                      <h2>Kyle Fisher <span>Manager</span></h2>
                                    </div>
                                  </div>
                                </div>
                              </div></li>
                            <li><div className="goals_complete_user">
                                <div className="created_goals_user">
                                  <span>Assigned to</span>
                                  <div className="goals_user_box">
                                    <div className="user_pro_pic">
                                      <img src="/img/user_info.png" />
                                    </div>
                                    <div className="created_name">
                                      <h2>Kyle Fisher <span>Manager</span></h2>
                                    </div>
                                  </div>
                                </div>
                              </div></li>
                            <li><div className="goals_complete_user">
                                <div className="created_goals_user">
                                  <span>&nbsp;</span>
                                  <div className="goals_user_box">
                                    <div className="user_pro_pic">
                                      <img src="/img/user_info.png" />
                                    </div>
                                    <div className="created_name">
                                      <h2>Kyle Fisher <span>Manager</span></h2>
                                    </div>
                                  </div>
                                </div>
                              </div></li>
                            <li>
                              <div className="goals_complete_user">
                                <div className="created_goals_user">
                                  <span>&nbsp;</span>
                                  <div className="goals_user_box">
                                    <div className="user_pro_pic">
                                      <img src="/img/user_info.png" />
                                    </div>
                                    <div className="created_name">
                                      <h2>Kyle Fisher <span>Manager</span></h2>
                                    </div>
                                  </div>
                                </div>
                              </div></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 pd_right_0">
                      <div className="rating_stuts third_left_header">
                        <div className="top_header">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="goals_status"><label>Goal Status :</label><span>Completed</span></div>
                            </div>
                            <div className="col-md-6">
                              <div className="completed_status_wrp">
                                <div className="left_goals_status">
                                  <h4>Start Date
                                    <span>1 DEC 2022</span>
                                  </h4>
                                </div>
                                <div className="right_goals_status">
                                  <h4>End Date<span>5 DEC 2022</span></h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="goals_status_bar">
                          <div className="left_status_bar">
                            <div className="set-size charts-container">
                              <div className="pie-wrapper progress-45 style-2">
                                <span className="label">83<span className="smaller">%</span></span>
                                <div className="pie">
                                  <div className="left-side half-circle" />
                                  <div className="right-side half-circle" />
                                </div>
                                <div className="shadow" />
                              </div>
                            </div>
                          </div>
                          <div className="right_status_bar">
                            <h5>Company Goals
                            </h5>
                            <span className="tactics">Tactics  7/7</span>
                          </div>
                        </div>
                        <div className="tactics_status">
                          <ul className="clearfix">
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                          </ul>
                        </div>
                        <div className="completed_goals_user">
                          <ul className="clearfix">
                            <li> <div className="goals_complete_user">
                                <div className="created_goals_user">
                                  <span>Created By</span>
                                  <div className="goals_user_box">
                                    <div className="user_pro_pic">
                                      <img src="/img/user_info.png" />
                                    </div>
                                    <div className="created_name">
                                      <h2>Kyle Fisher <span>Manager</span></h2>
                                    </div>
                                  </div>
                                </div>
                              </div></li>
                            <li><div className="goals_complete_user">
                                <div className="created_goals_user">
                                  <span>Assigned to</span>
                                  <div className="goals_user_box">
                                    <div className="user_pro_pic">
                                      <img src="/img/user_info.png" />
                                    </div>
                                    <div className="created_name">
                                      <h2>Kyle Fisher <span>Manager</span></h2>
                                    </div>
                                  </div>
                                </div>
                              </div></li>
                            <li><div className="goals_complete_user">
                                <div className="created_goals_user">
                                  <span>&nbsp;</span>
                                  <div className="goals_user_box">
                                    <div className="user_pro_pic">
                                      <img src="/img/user_info.png" />
                                    </div>
                                    <div className="created_name">
                                      <h2>Kyle Fisher <span>Manager</span></h2>
                                    </div>
                                  </div>
                                </div>
                              </div></li>
                            <li>
                              <div className="goals_complete_user">
                                <div className="created_goals_user">
                                  <span>&nbsp;</span>
                                  <div className="goals_user_box">
                                    <div className="user_pro_pic">
                                      <img src="/img/user_info.png" />
                                    </div>
                                    <div className="created_name">
                                      <h2>Kyle Fisher <span>Manager</span></h2>
                                    </div>
                                  </div>
                                </div>
                              </div></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="rating_stuts four_right_top_header">
                        <div className="top_header">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="goals_status"><label>Goal Status :</label><span>Completed</span></div>
                            </div>
                            <div className="col-md-6">
                              <div className="completed_status_wrp">
                                <div className="left_goals_status">
                                  <h4>Start Date
                                    <span>1 DEC 2022</span>
                                  </h4>
                                </div>
                                <div className="right_goals_status">
                                  <h4>End Date<span>5 DEC 2022</span></h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="goals_status_bar">
                          <div className="left_status_bar">
                            <div className="set-size charts-container">
                              <div className="pie-wrapper progress-45 style-2">
                                <span className="label">83<span className="smaller">%</span></span>
                                <div className="pie">
                                  <div className="left-side half-circle" />
                                  <div className="right-side half-circle" />
                                </div>
                                <div className="shadow" />
                              </div>
                            </div>
                          </div>
                          <div className="right_status_bar">
                            <h5>Company Goals
                            </h5>
                            <span className="tactics">Tactics  7/7</span>
                          </div>
                        </div>
                        <div className="tactics_status">
                          <ul className="clearfix">
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                            <li><div className="terms_condition_wrap">
                                <div className="checked_box clearfix">
                                  <label className="container_checked">
                                    <input type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                    <span className="checkmark"><span className="check_tactics_status">Tactic1 </span></span> </label>
                                </div>
                              </div></li>
                          </ul>
                        </div>
                        <div className="completed_goals_user">
                          <ul className="clearfix">
                            <li> <div className="goals_complete_user">
                                <div className="created_goals_user">
                                  <span>Created By</span>
                                  <div className="goals_user_box">
                                    <div className="user_pro_pic">
                                      <img src="/img/user_info.png" />
                                    </div>
                                    <div className="created_name">
                                      <h2>Kyle Fisher <span>Manager</span></h2>
                                    </div>
                                  </div>
                                </div>
                              </div></li>
                            <li><div className="goals_complete_user">
                                <div className="created_goals_user">
                                  <span>Assigned to</span>
                                  <div className="goals_user_box">
                                    <div className="user_pro_pic">
                                      <img src="/img/user_info.png" />
                                    </div>
                                    <div className="created_name">
                                      <h2>Kyle Fisher <span>Manager</span></h2>
                                    </div>
                                  </div>
                                </div>
                              </div></li>
                            <li><div className="goals_complete_user">
                                <div className="created_goals_user">
                                  <span>&nbsp;</span>
                                  <div className="goals_user_box">
                                    <div className="user_pro_pic">
                                      <img src="/img/user_info.png" />
                                    </div>
                                    <div className="created_name">
                                      <h2>Kyle Fisher <span>Manager</span></h2>
                                    </div>
                                  </div>
                                </div>
                              </div></li>
                            <li>
                              <div className="goals_complete_user">
                                <div className="created_goals_user">
                                  <span>&nbsp;</span>
                                  <div className="goals_user_box">
                                    <div className="user_pro_pic">
                                      <img src="/img/user_info.png" />
                                    </div>
                                    <div className="created_name">
                                      <h2>Kyle Fisher <span>Manager</span></h2>
                                    </div>
                                  </div>
                                </div>
                              </div></li>
                          </ul>
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