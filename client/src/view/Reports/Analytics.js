import React, { useState, useEffect, Fragment } from "react"; 
import {useDispatch,useSelector} from "react-redux";  
import {baseUrl} from '../../config'; 
import {GET} from '../../helper/service';   
import Loader from '../common/Loader'; 
import Sidebar from './Sidebar';
import Mygoal from './MyGoal';
import Tree from './Tree';
import CompanyGoals from "./CompanyGoals";
import DirectReport from "./DirectReport";
import PersonalGoal from "./PersonalGoal"; 
const moment = require('moment');
 


export default function Analytics() {
const auth = useSelector(state=>state.auth);
const [analyticsData, setAnalyticsData] = useState([]);
const [activeId, setActiveId] = useState();
const [analyticsDetails, setAnalyticsDetails] = useState([]);
const [loader,setLoader]=useState(false);  
const [activeTab, setActiveTab] = useState('CompanyGoals');


const token = auth.token;   

  useEffect(() => {  
    getAnalytics();    
  }, []); 

  const getAnalytics = (e) => {
    setLoader(true); 
    const url = baseUrl + '/goals-tactics/analytics/get';
    GET(url,token).then(data => {  
      getAnalyticsDetails(data.result.reportee[0].id);
      setActiveId(data.result.reportee[0].id);
      setAnalyticsData(data.result); 
      setLoader(false); 
    })    
  }

  const getAnalyticsDetails = (id) => { 
    setLoader(true); 
    const url = baseUrl + '/goals-tactics/analytics/get/detail/reportee/'+id;
    GET(url,token).then(data => {   
      setAnalyticsDetails(data.result); 
      setLoader(false); 
    })    
  }


  const getDetails = (id) => { 
    getAnalyticsDetails(id);
    setActiveId(id);
  }


  // console.log("analyticsData 9861081560 ==== ", analyticsData)
  // console.log("analyticsDetails === 0", analyticsDetails)

	return (  
    <div className="wrapper">
      <Loader loading={loader}/> 
      <div id="content"> 
        <div className="dashboard_main">
          <div className="row">
            <div className="col-md-8 pd_right_0">
              <div className="mygoals_inner_section">
                <div className="searchbaar_wrp">
                  <div className="searchbaar_inner_wrp">
                    <div className="right_section">
                      <div className="searchbaarinput">
                        <input type="text" name placeholder="Search" />
                        <button type="button"><svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 17 17" fill="none">
                            <path d="M15.75 15.75L12.3855 12.3795M14.25 7.875C14.25 9.56576 13.5784 11.1873 12.3828 12.3828C11.1873 13.5784 9.56576 14.25 7.875 14.25C6.18424 14.25 4.56274 13.5784 3.36719 12.3828C2.17165 11.1873 1.5 9.56576 1.5 7.875C1.5 6.18424 2.17165 4.56274 3.36719 3.36719C4.56274 2.17165 6.18424 1.5 7.875 1.5C9.56576 1.5 11.1873 2.17165 12.3828 3.36719C13.5784 4.56274 14.25 6.18424 14.25 7.875V7.875Z" stroke="#717171" strokeWidth={2} strokeLinecap="round" />
                          </svg></button>
                      </div>
                    </div>
                  </div>
                </div>

 

                <div className="Reports_goals_analtic_wrp">
                  <div className="row">
                    <div className="col-lg-3" onClick={()=>{setActiveTab('CompanyGoals')}}>
                      <div id="report_analtic_goal" className={(activeTab=="CompanyGoals" ? 'analic_report active' : 'analic_report')}>
                        <h4>Company Goals <span>{analyticsData?.companyGoalsPercent}%</span></h4> 
                        {/* <div className="date_reminder analic_report_date">
                          <div className="left_section">
                            <h5>Start Date<span>1 DEC 2022</span></h5>
                          </div>
                          <div className="right_section">
                            <h5>End Date<span>5 DEC 2022</span></h5>
                          </div>
                        </div> */}
                      </div></div>
                    <div className="col-lg-3" onClick={()=>{setActiveTab('DirectReport')}}>
                      <div id="report_analtic_goal" className={(activeTab=="DirectReport" ? 'analic_report active' : 'analic_report')}>
                        <h4>Direct Reports <span>{analyticsData?.directReporteePercent}%</span></h4>
                        {/* <div className="date_reminder analic_report_date">
                          <div className="left_section">
                            <h5>Start Date<span>1 DEC 2022</span></h5>
                          </div>
                          <div className="right_section">
                            <h5>End Date<span>5 DEC 2022</span></h5>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="col-lg-3" onClick={()=>{setActiveTab('Mygoal')}}>
                      <div id="report_analtic_goal" className={(activeTab=="Mygoal" ? 'analic_report active' : 'analic_report')}>
                        <h4>My Goals <span>{analyticsData?.individualGoalsPercent}%</span></h4>
                        {/* <div className="date_reminder analic_report_date">
                          <div className="left_section">
                            <h5>Start Date<span>1 DEC 2022</span></h5>
                          </div>
                          <div className="right_section">
                            <h5>End Date<span>5 DEC 2022</span></h5>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="col-lg-3" onClick={()=>{setActiveTab('PersonalGoal')}}>
                      <div id="report_analtic_goal" className={(activeTab=="PersonalGoal" ? 'analic_report active' : 'analic_report')}>
                        <h4>Personal Goals <span>{analyticsData?.personalGoalsPercent}%</span></h4>
                        {/* <div className="date_reminder analic_report_date">
                          <div className="left_section">
                            <h5>Start Date<span>1 DEC 2022</span></h5>
                          </div>
                          <div className="right_section">
                            <h5>End Date<span>5 DEC 2022</span></h5>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div> 

                {(activeTab === "Mygoal" ? <Mygoal anaData={analyticsData} fetchDetails={getDetails} activeDiv={activeId}/> : '')}
                {(activeTab === "CompanyGoals" ? <CompanyGoals anaData={analyticsData} fetchDetails={getDetails} activeDiv={activeId}/> : '')}
                {(activeTab === "DirectReport" ? <DirectReport anaData={analyticsData} fetchDetails={getDetails} activeDiv={activeId}/> : '')}
                {(activeTab === "PersonalGoal" ? <PersonalGoal anaData={analyticsData} fetchDetails={getDetails} activeDiv={activeId}/> : '')}
                
 


              </div>
            </div>


        <div className="col-md-4">
              <Sidebar details={analyticsDetails} anaData={analyticsData}/> 
            </div>
          </div>
        </div>
      </div>
      </div>
        
         
        
	)
}