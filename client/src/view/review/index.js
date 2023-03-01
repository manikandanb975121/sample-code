import React, { useState, useEffect } from "react"; 
import {useDispatch,useSelector} from "react-redux"; 
import Review from "src/component/review";
import {baseUrl} from '../../config'; 
import Header from '../common/Header'; 
import Sidebar from '../common/Sidebar';   

  
export default function ReviewPage() {
	const auth = useSelector(state=>state.auth);
  const token = auth.token;   
	return ( 
    <div className='wrapper'> 
    <div id="content">
    {/* <Loader loading={loader}/>   */}
    <Review/>
    </div>
    </div>
     
        
         
        
	)
}