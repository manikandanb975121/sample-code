import React, { useState, useEffect } from "react"; 
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
export default function CircularProgress(props) {   
    const percentage = Math.ceil(props.percentage); 
	return ( 
        <div style={{ width:props.width}} className="pie-wrapper progress-45 style-2">
        <CircularProgressbar 
            value={percentage} 
            text={`${percentage}%`} 
            styles={buildStyles({ 
            strokeLinecap: 'butt',  
            pathTransitionDuration: 0.5,  
            pathColor: props.pathColor,
            textColor: props.textColor,
            trailColor: props.trailColor,
            backgroundColor: props.backgroundColor, 
        })}
        /> 
        </div>
	)
}


  