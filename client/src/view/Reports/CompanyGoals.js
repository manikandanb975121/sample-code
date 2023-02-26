import React, { useState, useEffect } from "react";  
import CircularProgress from '../common/CircularProgress';
import {useDispatch,useSelector} from "react-redux";   
import Tree from "./Tree";

export default function CompanyGoals(props) { 
  const res = props.anaData;
  const activeDivId = props.activeDiv;
 
	return (  
    <>
      <div className="user_analytics_goals">
                  <div className="row">
                    <div className="col-lg-6 text-right">
                      <div className="analytic_txt">
                        <h5>Company Goals</h5>
                        {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>  */}
                      </div>
                      {/* <div className="date_reminder analic_report_date">
                        <div className="left_section">
                          <h5>Start Date<span>1 DEC 2022</span></h5>
                        </div>
                        <div className="right_section">
                          <h5>End Date<span>5 DEC 2022</span></h5>
                        </div>
                      </div> */}
                    </div>
                    <div className="col-lg-6 text-right">
                      <div className="analtic_progress_end">
                        <div className="set-size">
                        <CircularProgress 
                        width="40" 
                        percentage={(res.companyGoalsPercent ? res.companyGoalsPercent : 0)} 
                        pathColor="#52C249" 
                        textColor='#000' 
                        trailColor='#fde9c1' 
                        backgroundColor='#3e98c7'
                        />  
                          {/* <div className="pie-wrapper progress-45 style-2">
                            <span className="label">{res.companyGoalsPercent}<span className="smaller">%</span></span>

                            


                            <div className="pie">
                              <div className="left-side half-circle" />
                              <div className="right-side half-circle" />
                            </div>
                            <div className="shadow" />
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="user_analytics_team">
                <Tree/>
                </div> */}

                

                <div className="user_analytics_team plainview"> 
                  <ul>
                  {res?.reportee?.map((x, i) => { 
                   return(
                    <li onClick={props.fetchDetails.bind(this,x.id)}>
                      <div className={(activeDivId==x.id ? 'analytic_deteails active' : 'analytic_deteails')}>
                        <div className="analyticpic">
                          <img className="img-fluid" src={(x.profileImage ? x.profileImage : '/img/analytic_team1.svg')} />
                        </div>
                        <div className="analytic_info">
                          <h2>{x.name}</h2>
                          <span>Goals : {('0' + x.assignedGoals).slice(-2)}</span>
                        </div>
                      </div>
                    </li>
                   )
                  })
                  }
                     
                  </ul> 
                </div> 

    </>
        
	)
}