import React, { useState, useEffect } from 'react';
import CircularProgress from '../common/CircularProgress';
const moment = require('moment');

export default function Sidebar(props) { 
  const [showCompanyGoal, setShowCompanyGoal] = useState(true); 
  const [showTeamGoal, setShowTeamGoal] = useState(false);
  const [showIndividualGoal, setShowIndividualGoal] = useState(false);

  const userInfo = props.details;

  const companyGoals = userInfo?.companyGoals?.[0];
  const personalGoals = userInfo?.personalGoals?.[0];

  const companyGoalsAll = userInfo?.companyGoals;
  const personalGoalsAll = userInfo?.personalGoals;

  console.log("companyGoals userInfo ==== ", userInfo)
 
  
	return (
        <div className="goalsmain_inner_section">
        <div className="goalsreminders_haeder analticheadertop">
          <div className="row">
            <div className="col-lg-4">
              <img className="img-fluid" src={(userInfo?.profileImage ? '' : '/img/report_analtics.png')} />
            </div>
            <div className="col-lg-8">
              <div className="report_analtic_user">
                <div className="left_analytic">
                  <h5>{userInfo?.name}<span>{userInfo?.title}</span></h5>
                </div>
                <div className="right_analytic">
                  <button type="button"><svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" fill="none">
                      <rect width={28} height={28} rx={10} fill="#009FDF" />
                      <path d="M12.8804 20.5898C13.0134 20.7199 13.1713 20.823 13.3451 20.8934C13.5189 20.9638 13.7052 21 13.8933 21C14.0814 21 14.2677 20.9638 14.4415 20.8934C14.6153 20.823 14.7732 20.7199 14.9062 20.5898L19.2038 16.3898C19.4712 16.1271 19.6211 15.7714 19.6206 15.4008C19.62 15.0302 19.4692 14.675 19.201 14.4129C18.9329 14.1509 18.5693 14.0034 18.1901 14.0029C17.8109 14.0024 17.447 14.1488 17.1781 14.4102L15.3258 16.2203V8.4C15.3258 8.0287 15.1749 7.6726 14.9063 7.41005C14.6376 7.1475 14.2732 7 13.8933 7C13.5134 7 13.149 7.1475 12.8803 7.41005C12.6117 7.6726 12.4607 8.0287 12.4607 8.4V16.2203L10.6085 14.4102C10.3396 14.1488 9.97565 14.0024 9.59644 14.0029C9.21723 14.0034 8.8537 14.1509 8.58556 14.4129C8.31742 14.675 8.16654 15.0302 8.16602 15.4008C8.16549 15.7714 8.31535 16.1271 8.58275 16.3898L12.8804 20.5898Z" fill="white" />
                    </svg></button>
                </div>
              </div>
              <span className="analytic_assigned_goals">Assigned Goals: {('0' + userInfo?.assignedGoals).slice(-2)}</span>
            </div>
          </div>
        </div>
        <div className="analyticgoalscompetative">
          {/* company goals start tab here*/}
          <div className="analytic_company_goals_wrp">
            <button className="analytic_company_goals_bt" onClick={()=>showCompanyGoal ? setShowCompanyGoal(false) : setShowCompanyGoal(true)}>Company Goals  
              <div className="direct_reports_right report_analtic_progress">
                <div className="set-size">

                <CircularProgress 
                        width="40" 
                        percentage={(companyGoals?.completionPercent ? companyGoals?.completionPercent : 0)} 
                        pathColor="#52C249" 
                        textColor='#fff' 
                        trailColor='#fde9c1' 
                        backgroundColor='#3e98c7'
                        />  


                  {/* <div className="pie-wrapper progress-45 style-2">
                    <span className="label">83<span className="smaller">%</span></span>
                    <div className="pie">
                      <div className="left-side half-circle" />
                      <div className="right-side half-circle" />
                    </div>
                    <div className="shadow" />
                  </div> */}
                </div> 
              </div> 
              <span id="donar" className={showCompanyGoal ? 'reports_analytic_down' : 'reports_analytic_up'}><img src="/img/reports_analytic_up.svg" /></span>
            </button>  

            {(companyGoalsAll?.length > 0 ? <>
              <div id="analic_report_tab" className={(showCompanyGoal ? 'analytic_company_goals showdata' : 'analytic_company_goals hidedata')}>
             <div className="date_reminder analic_report_date company_goals">
               <div className="left_section">
                 <h5>Start Date<span>{moment(companyGoals?.startDate).format('DD MMM YYYY')}</span></h5>
               </div>
               <div className="right_section">
                 <h5>End Date<span>{moment(companyGoals?.endDate).format('DD MMM YYYY')}</span></h5>
               </div>
             </div>
             <div className="company_goals_tactic">

             {companyGoals?.tactics?.map((res, index) => {  
               return (
                 <>
                 <div className="tactic_wrp_new analytic_tactic"> 
                 <div className="form-group">
                   <input type="checkbox" id="html4" checked={(res.status == "Completed" ? true : false)}/>
                   <label htmlFor="html4">{res.name}</label>
                 </div>
                 <h5 className="tactic_assign">Assigned to: <b>{res.userName}</b></h5>
               </div> 
               </>
               )
               }
               )
             } 
             </div>  
             <div className="analytic_tactic_table">
               <table className="table table-bordered">
                 <tbody>
                   <tr>
                     <td>Created By:</td>
                     <td>{companyGoals?.createdByName}</td>
                   </tr>
                   <tr>
                     <td>Created On:</td>
                     <td>{moment(companyGoals?.startDate).format('DD MMM YYYY')}</td>
                   </tr> 
                   <tr>
                     <td>Due Date:</td>
                     <td>{moment(companyGoals?.endDate).format('DD MMM YYYY')}</td>
                   </tr>
                 </tbody>
               </table>
             </div>
           </div> 
            </> : '')} 
          </div> 
        


          <div className="analytic_company_goals_wrp">
            <button className="analytic_company_goals_bt Individual_bt" onClick={()=>showIndividualGoal ? setShowIndividualGoal(false) : setShowIndividualGoal(true)}>Personal Goal  
              <div className="direct_reports_right report_analtic_progress">
                <div className="set-size">
                <CircularProgress 
                        width="40" 
                        percentage={(personalGoals?.completionPercent ? personalGoals?.completionPercent : 0)} 
                        pathColor="#52C249" 
                        textColor='#fff' 
                        trailColor='#fde9c1' 
                        backgroundColor='#3e98c7'
                        />  
                  {/* <div className="pie-wrapper progress-45 style-2">
                    <span className="label">83<span className="smaller">%</span></span>
                    <div className="pie">
                      <div className="left-side half-circle" />
                      <div className="right-side half-circle" />
                    </div>
                    <div className="shadow" />
                  </div> */}
                </div>
              </div>
              <span id="donar3" className={showIndividualGoal ? 'reports_analytic_down' : 'reports_analytic_up'}><img src="/img/reports_analytic_up.svg" /></span>
            </button>

    
            {(personalGoalsAll?.length > 0 ? <>
              <div id="individual_goal" className={(showIndividualGoal ? 'analytic_company_goals showdata' : 'analytic_company_goals hidedata')}>
              <div className="date_reminder analic_report_date company_goals">
                <div className="left_section">
                  <h5>Start Date<span>{moment(personalGoals?.startDate).format('DD MMM YYYY')}</span></h5>
                </div>
                <div className="right_section">
                  <h5>End Date<span>{moment(personalGoals?.startDate).format('DD MMM YYYY')}</span></h5>
                </div>
              </div>
              <div className="company_goals_tactic">
              {personalGoals?.tactics?.map((res, index) => {  
               return (
                 <>
                 <div className="tactic_wrp_new analytic_tactic"> 
                 <div className="form-group">
                   <input type="checkbox" id="html4" checked={(res.status == "Completed" ? true : false)}/>
                   <label htmlFor="html4">{res.name}</label>
                 </div>
                 <h5 className="tactic_assign">Assigned to: <b>{res.userName}</b></h5>
               </div> 
               </>
               )
               }
               )
             }  
              
              
              </div>
              <div className="analytic_tactic_table">
                <table className="table table-bordered">
                <tbody>
                   <tr>
                     <td>Created By:</td>
                     <td>{personalGoals?.createdByName}</td>
                   </tr>
                   <tr>
                     <td>Created On:</td>
                     <td>{moment(personalGoals?.startDate).format('DD MMM YYYY')}</td>
                   </tr> 
                   <tr>
                     <td>Due Date:</td>
                     <td>{moment(personalGoals?.endDate).format('DD MMM YYYY')}</td>
                   </tr>
                 </tbody>
                  {/* <tbody>
                    <tr>
                      <td>Created By:</td>
                      <td>Anit</td>
                    </tr>
                    <tr>
                      <td>Created On:</td>
                      <td>12/16/2022</td>
                    </tr>
                    <tr>
                      <td>Assigned To:</td>
                      <td>Anand</td>
                    </tr>
                    <tr>
                      <td>Due Date:</td>
                      <td>12/20/2022</td>
                    </tr>
                  </tbody> */}
                </table>
              </div>
            </div>  
            </> : '')} 

          </div>
          {/*Individual Goal end here*/}
        </div>
      </div>
	)
}