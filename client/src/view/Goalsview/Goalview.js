import React, { useState, useEffect } from "react";   
import { Link } from "react-router-dom";
import Norecordsfound from '../common/Norecordsfound';

  
export default function Goalview(props) {  

	return ( 
        <div className="mygoals_section">
                <div id="main"> 
                  {(props.mygoal.length === 0 ? <Norecordsfound message="Sorry No Records Found.."/> : '')} 
                  <div className="mygoals_accordion">
                    <div className="accordion" id="faq"> 
                    {props.mygoal.map((e, index)=>{
                      let keyname = "faq"+index;
                      let keyname1 = "#faq"+index;
                      let keyname2 = "faqhead"+index;  
                     
                      var ariaExpend = true;
                      var btnHeaderLink = "btn btn-header-link";
                      var collapse = "collapse";
                      if(props.selectedGoalId === e.id){
                          btnHeaderLink = "btn btn-header-link collapsed";
                          ariaExpend = false;
                          collapse = "collapse show";
                      }

                    let editPath = "/my-goal-edit/"+e.id;
                    return ( 
                      <React.Fragment>
                      {(index===0 ? <>
                        <div className="mygoalscheck" key={Math.random()} onClick={props.deleteGoal.bind(this,e.id)}>
                        <div className="card">
                          <div className="card-header" id={keyname2}>
                            <a href="#" className={btnHeaderLink} data-toggle="collapse" data-target={keyname1} aria-expanded={ariaExpend} aria-controls={keyname}><div className="innermygoalscheck">{e.name}</div>
                            <Link to={editPath}><button type="button" className="editbt"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                  <path d="M20.9009 5.1135L19.2629 3.47775C19.0938 3.30863 18.8714 3.22388 18.6494 3.22388C18.4274 3.22388 18.2054 3.30825 18.0363 3.47738L16.7261 4.78388L19.5907 7.64363L20.9009 6.3375C21.2396 5.99925 21.2396 5.45063 20.9009 5.1135Z" fill="#F18D00" />
                                  <path d="M8.2207 13.2735L11.0857 16.1336L18.9776 8.25637L16.1126 5.39624L8.2207 13.2735Z" fill="#F18D00" />
                                  <path d="M7.60235 13.8855L6.99072 17.355L10.4673 16.7452L7.60235 13.8855Z" fill="#F18D00" />
                                  <path d="M15.5224 18.9011H4.7201V8.09888H12.3435L14.2222 6.22388H4.05748C3.39035 6.22388 2.84473 6.7695 2.84473 7.43663V19.5638C2.84473 20.2309 3.39035 20.7765 4.05748 20.7765H16.1846C16.8517 20.7765 17.3974 20.2309 17.3974 19.5638V10.8934L15.5224 12.765V18.9011Z" fill="#F18D00" />
                                </svg></button></Link>
                            </a>
                          </div>
                          <div id={keyname} className={collapse} aria-labelledby={keyname2} data-parent="#faq">
                            <div className="card-body goalsview">
                              {e.description}
                            </div>
                          </div>
                        </div>
                      </div>
                        </> : <>
                        <div className="mygoalscheck"  key={Math.random()} onClick={props.deleteGoal.bind(this,e.id)}>
                        <div className="card">
                          <div className="card-header" id={keyname2}>
                            <a href="#" className={btnHeaderLink} data-toggle="collapse" data-target={keyname1} aria-expanded={ariaExpend} aria-controls={keyname}><div className="innermygoalscheck">{e.name}</div>
                            <Link to={editPath}><button type="button" className="editbt"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                  <path d="M20.9009 5.1135L19.2629 3.47775C19.0938 3.30863 18.8714 3.22388 18.6494 3.22388C18.4274 3.22388 18.2054 3.30825 18.0363 3.47738L16.7261 4.78388L19.5907 7.64363L20.9009 6.3375C21.2396 5.99925 21.2396 5.45063 20.9009 5.1135Z" fill="#F18D00" />
                                  <path d="M8.2207 13.2735L11.0857 16.1336L18.9776 8.25637L16.1126 5.39624L8.2207 13.2735Z" fill="#F18D00" />
                                  <path d="M7.60235 13.8855L6.99072 17.355L10.4673 16.7452L7.60235 13.8855Z" fill="#F18D00" />
                                  <path d="M15.5224 18.9011H4.7201V8.09888H12.3435L14.2222 6.22388H4.05748C3.39035 6.22388 2.84473 6.7695 2.84473 7.43663V19.5638C2.84473 20.2309 3.39035 20.7765 4.05748 20.7765H16.1846C16.8517 20.7765 17.3974 20.2309 17.3974 19.5638V10.8934L15.5224 12.765V18.9011Z" fill="#F18D00" />
                                </svg></button></Link>
                            </a> 
                          </div>
                          <div id={keyname} className={collapse} aria-labelledby={keyname2} data-parent="#faq">
                            <div className="card-body goalsview">
                            {e.description}
                            </div>
                          </div>
                        </div>
                      </div>
                        </>)} 
                        </React.Fragment>  
                      );})} 
                    </div>
                  </div>
                </div>
              </div>
	)
}