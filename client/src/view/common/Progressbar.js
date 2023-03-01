import React, { useState, useEffect } from "react"; 
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



export default function Progressbar(props) {   
    const percentage = Math.ceil(props.value);

	return (

        <div className="competativegol_wrp">
                <div className="competativegol">
                  <div className="set-size charts-container"> 
                    <div style={{ width:70, marginRight: "12px"}} className="pie-wrapper progress-45 style-2">
                        <CircularProgressbar 
                        value={percentage} 
                        text={`${percentage}%`} 
                        styles={buildStyles({  
                        strokeLinecap: 'butt',  
                        pathTransitionDuration: 0.5,  
                        pathColor: (props.color ? props.color : '#fab732'),
                        textColor: '#000',
                        trailColor: '#fde9c1',
                        backgroundColor: '#3e98c7', 
                        })}
                        /> 
                    </div> 
                  </div>
                  <h3>{props.title}</h3>
                </div>
                <div className="competativegol_right">
                  <div className="Tactics_goals">
                    <h5>Tactics<span className="smaller_tactics_goals">{props.completedGoal}/{props.totalGoal}</span></h5>
                  </div>
                </div>
            </div> 
	)
}


  