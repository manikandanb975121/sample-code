import React, { useState, useEffect } from "react"; 
import {useDispatch,useSelector} from "react-redux";   
import Tree from "./Tree";
export default function MyGoal() { 

	return (  
        <div className="user_analytics_team">
          <Tree page="mygoal"/>
        </div>  
        
	)
}