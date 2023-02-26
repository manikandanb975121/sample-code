import React, { useState, useEffect } from "react"; 
import {useDispatch,useSelector} from "react-redux"; 
import Toast from '../common/Toast';
import { toast } from 'react-toastify';
import {baseUrl} from '../../config'; 
import {GET, POST} from '../../helper/service'; 
import Header from '../common/Header'; 
import Sidebar from '../common/Sidebar';   
import Ritesidebar from './Ritesidebar';
import IndividualGoal from './IndividualGoal';
import DirectReport from './DirectReport';
import Loader from '../common/Loader';   


const initialValues = {rating5:'',rating4:'',notes:'',requestMeeting:'',searching:'',sorting:''}
 

export default function Index() {
	const auth = useSelector(state=>state.auth);
  const [MyAppraisal, setMyAppraisal] = useState([]);
  const [MyDirectReport, setMyDirectReport] = useState([]);
  const [MyApprDetails, setMyApprDetails] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState();
  const [selectedTactic, setSelectedTactic] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalDirectRecords, settotalDirectRecords] = useState(0);
  const [checked, setChecked] =useState(false);
  const [state, setState] = useState(initialValues); 
  const [isChecked, setIsChecked] = useState(false);
  const notify = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const [btnDisable, setBtnDisable] = useState(false);

  const token = auth.token;   
  const userId = auth.user.id; 
  let per_page = 5;
  let page = 0;
  var searchKey = "";
  var sortBy = "";


  useEffect(() => {    
    refreshScreen();
  }, []);

  // useEffect(() => {    
  //   fetchDirectReport(page,per_page,searchKey, sortBy);   
  // }, []);

  
  const refreshScreen = () => {
    fetchAppraisal(page,per_page,searchKey, sortBy);  
    fetchDirectReport(page,per_page,searchKey, sortBy);  
  };


  const handleOnChecked = () => {
    setIsChecked(!isChecked);
  };

  const fetchDirectReport = (page,per_page,searchKey, sortBy) => {  
    const url = baseUrl + '/appraisal/reportee/list?search='+searchKey+'&skip='+page*per_page+'&take='+per_page+'&sortBy='+sortBy;
    setLoader(true);
    GET(url,token).then(data => {    
      setMyDirectReport(data.result);  
      //MyAppraisalDetails(data.result[0]);
      settotalDirectRecords(data.total);
      setLoader(false);
    })  
  }

  const fetchAppraisal = (page,per_page,searchKey, sortBy) => {  
    const url = baseUrl + '/appraisal/list?search='+searchKey+'&skip='+page*per_page+'&take='+per_page+'&sortBy='+sortBy;
    setLoader(true);
    GET(url,token).then(data => {   
      setMyAppraisal(data.result);  
      MyAppraisalDetails(data.result[0]);
      setTotalRecords(data.total);
      setLoader(false);
    })  
  }

  const appraisalDetails = (userId, goalId) => { 
    const url = baseUrl + '/appraisal/detail?userId='+userId+'&goalId='+goalId;
    setLoader(true);
    GET(url,token).then(data => { 
      if(!data.result.speed){
        data.result.isDisabled = true;
      } else {
        data.result.isDisabled = false;
      }
      setMyApprDetails(data.result);  
      setLoader(false);
    })  
  }

  const handleSubmit = () => {   
    if(state.rating4===""){
      notifyError('Please rate for speed.');
      return false;
    }
    if(state.rating5===""){
      notifyError('Please rate for quality.');
      return false;
    }
    if(state.notes===""){
      notifyError('Please provide notes.');
      return false;
    }
    setLoader(true); 

    const data = {
        "userId":selectedUser,
        "goalId":selectedGoal,
        "quality":state.rating5,
        "speed":state.rating4,
        "notes":state.notes,
        "tacticId":selectedTactic,
        "requestMeeting":state.requestMeeting
    } 
    const url = baseUrl + '/appraisal';
      POST(url, data, token).then(data => {  
      setLoader(false); 
      setState(initialValues);
      setBtnDisable(true);
      notify('Appraisal created successfully.');  
  })

  }

  const MyAppraisalDetails = (res) => {  
    if(res){ 
      setSelectedGoal(res.goalId);
      setSelectedTactic(res.tacticId); 
      setSelectedUser(res.userId); 
      appraisalDetails(res.userId,res.goalId); 
    } else {
      setLoader(false);
    }

  };

  const getRecordByPage = (res) => {
    var searchKey = state.searching;
    var sorting = state.sorting;
    
    if(isChecked){
      fetchDirectReport(res,per_page,searchKey,sorting)
    } else {
      fetchAppraisal(res,per_page,searchKey,sorting);
    }

  };

   
 const handleOnchange = (e) => {    
  if(e.target.name === "meetRequest"){
    if(checked){
      setChecked(false);
      setState({ ...state, ['requestMeeting']: 0 });
      setMyApprDetails({ ...MyApprDetails, ['requestMeeting']: 0 });
    } else {
      setState({ ...state, ['requestMeeting']: 1 });
      setMyApprDetails({ ...MyApprDetails, ['requestMeeting']: 1 });
    }
  } else {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
    if(name=="rating4"){
      setMyApprDetails({ ...MyApprDetails, ['speed']: value });
    }
    if(name=="rating5"){
      setMyApprDetails({ ...MyApprDetails, ['quality']: value });
    }
    if(name=="notes"){
      setMyApprDetails({ ...MyApprDetails, ['notes']: value });
    }

    if(name==="sorting"){
        var searchKey = state.searching;
        var sorting = e.target.value;  
        if(isChecked){
          fetchDirectReport(page,per_page,searchKey,sorting)
        } else {
          fetchAppraisal(page,per_page,searchKey,sorting);
        }
    }
  }
};


const handleKeyPress = (e) => {   
  if (e.key === 'Enter') { 
      var searchKey = state.searching;
      var sorting = state.sorting; 
      if(isChecked){
        fetchDirectReport(page,per_page,searchKey,sorting)
      } else {
        fetchAppraisal(page,per_page,searchKey,sorting);
      }


  } else {
      if(state.searching==""){
          var searchKey = state.searching;
          var sorting = state.sorting;
          if(isChecked){
            fetchDirectReport(page,per_page,searchKey,sorting)
          } else {
            fetchAppraisal(page,per_page,searchKey,sorting);
          }
      }
  }
}

const handleSearchKey = (e) => {   
      var searchKey = state.searching;
      var sorting = state.sorting;
      // fetchAppraisal(page,per_page,searchKey,sorting); 
      if(isChecked){
        fetchDirectReport(page,per_page,searchKey,sorting)
      } else {
        fetchAppraisal(page,per_page,searchKey,sorting);
      }
}


  

	return ( 
    <div className='wrapper'> 
    <div id="content">
    <Loader loading={loader}/>  
    <Toast />
    <div className="dashboard_main">
            <div className="row">
              <div className="col-md-8 pd_right_0">
                <div className="mygoals_inner_section">
                <div class="refresh_mygoals">
                <div class="reminders_haeder">
                <button onClick={refreshScreen} type="button" class="refreshbt"> <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M15.4631 9.60713C15.4631 9.64062 15.4598 9.66405 15.4531 9.67745C15.0245 11.4721 14.1272 12.9269 12.7611 14.0418C11.395 15.1568 9.79457 15.7143 7.95975 15.7143C6.98207 15.7143 6.0362 15.5301 5.12214 15.1618C4.20808 14.7935 3.39279 14.2678 2.67627 13.5848L1.38051 14.8806C1.25328 15.0078 1.10261 15.0714 0.928502 15.0714C0.754395 15.0714 0.603725 15.0078 0.476493 14.8806C0.349261 14.7533 0.285645 14.6027 0.285645 14.4286V9.92856C0.285645 9.75446 0.349261 9.60379 0.476493 9.47655C0.603725 9.34932 0.754395 9.28571 0.928502 9.28571H5.4285C5.60261 9.28571 5.75328 9.34932 5.88051 9.47655C6.00774 9.60379 6.07136 9.75446 6.07136 9.92856C6.07136 10.1027 6.00774 10.2533 5.88051 10.3806L4.50439 11.7567C4.97984 12.1987 5.5189 12.5402 6.12158 12.7812C6.72426 13.0223 7.35038 13.1428 7.99993 13.1428C8.89725 13.1428 9.73431 12.9252 10.5111 12.4899C11.2879 12.0547 11.9106 11.4553 12.3794 10.692C12.4531 10.5781 12.6305 10.1864 12.9118 9.51673C12.9653 9.36271 13.0658 9.28571 13.2131 9.28571H15.1417C15.2287 9.28571 15.3041 9.31751 15.3677 9.38113C15.4313 9.44475 15.4631 9.52008 15.4631 9.60713ZM15.7142 1.57142V6.07142C15.7142 6.24553 15.6506 6.3962 15.5234 6.52343C15.3961 6.65066 15.2455 6.71428 15.0714 6.71428H10.5714C10.3973 6.71428 10.2466 6.65066 10.1193 6.52343C9.99212 6.3962 9.9285 6.24553 9.9285 6.07142C9.9285 5.89731 9.99212 5.74664 10.1193 5.61941L11.5055 4.23325C10.5144 3.31584 9.34591 2.85713 7.99993 2.85713C7.10261 2.85713 6.26556 3.07477 5.48877 3.51004C4.71198 3.9453 4.08922 4.54463 3.62047 5.30803C3.54681 5.42187 3.36935 5.81361 3.0881 6.48325C3.03453 6.63727 2.93408 6.71428 2.78676 6.71428H0.787877C0.700823 6.71428 0.625488 6.68247 0.561872 6.61885C0.498256 6.55524 0.466448 6.4799 0.466448 6.39285V6.32254C0.901716 4.52789 1.80573 3.07309 3.1785 1.95814C4.55127 0.843183 6.15841 0.285706 7.99993 0.285706C8.97761 0.285706 9.9285 0.471531 10.8526 0.843183C11.7767 1.21484 12.597 1.73883 13.3135 2.41517L14.6193 1.11941C14.7466 0.992179 14.8973 0.928563 15.0714 0.928563C15.2455 0.928563 15.3961 0.992179 15.5234 1.11941C15.6506 1.24664 15.7142 1.39731 15.7142 1.57142Z" fill="#717171"></path>
                </svg></span>Refresh</button>
                </div>
                </div>
                  <div className="searchbaar_wrp">
                    <div className="searchbaar_inner_wrp">
                      <div className="left_section">
                        <div className="toggle-button-cover appraisal_individual_goals">
                          <div className="button-cover">
                            <div className="button b2 appraisal" id="button-10">
                              {/* <input type="checkbox" className="checkbox" /> */}
                              <input
                              type="checkbox"
                              className="checkbox"
                              id="topping"
                              name="topping"
                              value="Paneer"
                              Q={isChecked}
                              onChange={handleOnChecked}
                              />

                              <div className="knobs goal_report_view">
                                <span>Individual Goals</span>
                              </div>
                              <div className="layer" />  
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* enterPress={handleKeyPress} */}
                      <div className="right_section">
                        <div className="searchbaarinput">
                          <input type="text" name="searching" placeholder="Search" onChange={handleOnchange} onKeyUp={handleKeyPress}/>
                          <button onClick={handleSearchKey} type="button"><svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 17 17" fill="none">
                              <path d="M15.75 15.75L12.3855 12.3795M14.25 7.875C14.25 9.56576 13.5784 11.1873 12.3828 12.3828C11.1873 13.5784 9.56576 14.25 7.875 14.25C6.18424 14.25 4.56274 13.5784 3.36719 12.3828C2.17165 11.1873 1.5 9.56576 1.5 7.875C1.5 6.18424 2.17165 4.56274 3.36719 3.36719C4.56274 2.17165 6.18424 1.5 7.875 1.5C9.56576 1.5 11.1873 2.17165 12.3828 3.36719C13.5784 4.56274 14.25 6.18424 14.25 7.875V7.875Z" stroke="#717171" strokeWidth={2} strokeLinecap="round" />
                            </svg></button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="short_by_wrapper">
                    <div className="main_shortby_innerwrp">
                      <div className="seclecontrol">
                        <div className="short_label">
                          <label>Sort By</label>
                        </div>
                        <div className="select-option">
                        <select className="form-control selectbox" defaultValue={""} onChange={handleOnchange} name="sorting"> 
                        <option value="due">Due Date</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completion">Completed</option>
                        <option value="alpha">Alphabetical</option>
                        </select> 
                        </div>
                      </div>
                    </div>
                  </div>
                  
                {(!isChecked ? 
                <IndividualGoal methods={getRecordByPage} totalRecordsData={totalRecords} MyAppraisal={MyAppraisal} AppraisalDetails={MyAppraisalDetails} selectedGoal={selectedGoal} selectedTactic={selectedTactic}/> : 
                <DirectReport methods={getRecordByPage}  totalRecordsData={totalDirectRecords} MyDirectReport={MyDirectReport} AppraisalDetails={MyAppraisalDetails} selectedGoal={selectedGoal} selectedTactic={selectedTactic} selectedUser={selectedUser}/> 
                )} 

                  
                </div>
              </div>
              <div className="col-md-4">
               <Ritesidebar disa={btnDisable} values={state}  handleSubmit={handleSubmit} details={MyApprDetails} defChecked={checked} noteChange={handleOnchange}/>
              </div>
            </div>
          </div>
    </div>
    </div>
     
        
         
        
	)
}