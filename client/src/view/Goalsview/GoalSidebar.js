import React, { useState, useEffect } from "react";   
import Norecordsfound from '../common/Norecordsfound';
import CircularProgress from '../common/CircularProgress';
import 'react-circular-progressbar/dist/styles.css';
const moment = require('moment');


  
export default function GoalSidebar(props) {
   const goal = props.goalDetailsdata;  

   var percentage = goal.completionPercent; 
   if(!percentage){
    percentage = 0;
   }
	return ( 
        <div className="col-md-4">
        <div className="goalsmain_inner_section">

          {(goal.name ? <>
            <div className="goalsreminders_haeder">
            <h4>{goal.name}</h4>
            <p>{goal.description}</p>
          </div>
          <div className="goalscompetativegol">
            <div className="set-size mygoals charts-container"> 
             
             <CircularProgress 
                  width="112" 
                  percentage={percentage} 
                  pathColor="#52C249" 
                  textColor='#000' 
                  trailColor='#fde9c1' 
                  backgroundColor='#3e98c7'
                />
            {/* <div style={{ width:112}} className="pie-wrapper progress-45 style-2">
              
               <CircularProgressbar 
                  value={percentage}  
                  text={`${percentage}%`} 
                  styles={buildStyles({ 
                  strokeLinecap: 'butt',  
                  pathTransitionDuration: 0.5,  
                  // pathColor: `rgb(250 183 50, ${percentage / 100})`,
                  pathColor: '#52C249',
                  textColor: '#000',
                  trailColor: '#fde9c1',
                  backgroundColor: '#3e98c7',
                  })}
                  /> 
             </div>*/}

            </div>
            <h3>{goal.type} Goal</h3> 
          </div>

          <div className="tactic_wrp_new_wrapper">
          {goal.tactics?.map((e, index)=>{ 
            var checked = false;
            if(e.status=="Completed"){
              checked = true;
            }
              return ( 
                <div className="tactic_wrp_new" key={Math.random()}> 
                <div className="form-group">
                  <input type="checkbox" id="html1" checked={checked}/>
                  <label htmlFor="html1">{e.name} </label>
                </div>
              </div> 
              )
          })} 
      </div>


        
          <div className="pertion_table">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Created By:</td>
                  <td>{goal.createdByName}</td>
                </tr>
                <tr>
                  <td>Created On:</td>
                  <td>{moment(goal.createdAt).format('MM/DD/YYYY')}</td>
                </tr> 
                <tr>
                  <td>Due Date:</td>
                  <td>{moment(goal.endDate).format('MM/DD/YYYY')}</td>
                </tr>
              </tbody>
            </table>
          </div>
          </> : 
              <div className="goalsreminders_haeder">
              <Norecordsfound message="Please select goal.."/>
              </div>
            )}

          

          
        </div>
      </div>
	)
}