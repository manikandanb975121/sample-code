import React, { useState, useEffect } from "react"; 
import {useDispatch,useSelector} from "react-redux";   
import Tree from "./Tree";
export default function PersonalGoal() { 

	return (  
        <div className="user_analytics_team">
          <Tree page="personalgoal"/>
        </div>  
        
	)
}