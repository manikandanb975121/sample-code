import React, { useState, useEffect } from "react"; 
import {useDispatch,useSelector} from "react-redux";
import PredictionmatrixGraph from "./PredictionmatrixGraph"; 
import _ from 'lodash'; 
import "../../App.css";
import {baseUrl} from '../../config';  
import {GET} from '../../helper/service';   
import Loader from '../common/Loader';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

 

 
export default function CustomisableReports() {
	const auth = useSelector(state=>state.auth);  
  const [loader,setLoader]=useState(false); 
  const [activeData, setActiveData] = useState('treeList')
  const token = auth.token; 
 
   

	return (
		<div className='wrapper'> 
    <Loader loading={loader}/>
   
    <div id="content"> 
        <div className="dashboard_main">
          <div className="mygoals_inner_section">
            <div className="customisablewrapper">
              <div className="row">
                <div className="col-lg-3">
                  <div className={activeData=="treeList" ? 'customisable active' : 'customisable'} id="treeList" onClick={()=>{setActiveData('treeList')}}>
                    <h2>Goal list by tree</h2>
                    <p>Exportable list of goals organized by hierarchy starting with the corporate goals</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className={activeData=="resultList" ? 'customisable active' : 'customisable'} id="resultList" onClick={()=>{setActiveData('resultList')}}>
                    <h2>Goal list with result</h2>
                    <p>Exportable lisst of goals including all weekly status updates and end of quarter business results</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className={activeData=="powerPointList" ? 'customisable active' : 'customisable'} id="powerPointList" onClick={()=>{setActiveData('powerPointList')}}>
                    <h2>Goals Powerpoint</h2>
                    <p>Exportable powerpoint of goals including all weekly status updates and end of quarter business results</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className={activeData=="complianceList" ? 'customisable active' : 'customisable'} id="complianceList" onClick={()=>{setActiveData('complianceList')}}>
                    <h2>User list by compliance</h2>
                    <p>Exportable list of users who either have x goals, or have not finalized goals. List is organized by manager</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className={activeData=="userList" ? 'customisable active' : 'customisable'} id="userList" onClick={()=>{setActiveData('userList')}}>
                    <h2>User List by tree</h2>
                    <p>exportable list of users organized by hierarchy starting with the CEO</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className={activeData=="appraisalsList" ? 'customisable active' : 'customisable'} id="appraisalsList" onClick={()=>{setActiveData('appraisalsList')}}>
                    <h2>Employee Appraisals</h2>
                    <p>exportable list of all ratings and reviews for appraisals. List is filtered based on your role within the organization</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className={activeData=="appraisalComplianceList" ? 'customisable active' : 'customisable'} id="appraisalComplianceList" onClick={()=>{setActiveData('appraisalComplianceList')}}>
                    <h2>Appraisal Compliance</h2>
                    <p>Exportable list of employees, then managers, and then appraisal status. List is based on your role in the organization</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className={activeData=="updatesList" ? 'customisable active' : 'customisable'} id="updatesList" onClick={()=>{setActiveData('updatesList')}}>
                    <h2>Team Goal Updates</h2>
                    <p>printable view of the most recent goal updates by teams</p>
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