import React, { useState, useEffect } from "react"; 
import "../App.css"; 
import Header from './common/Header'; 
import Sidebar from './common/Sidebar';
import AvatarImage from '../component/avatar/Avatar';
import "react-datepicker/dist/react-datepicker.css"; 
import { useForm } from "react-hook-form";
import Tactic from './Tactic'; 
import Toast from './common/Toast';
import {toast } from 'react-toastify'; 
import Loader from './common/Loader';
import Goalview from './Goalsview/Goalview';
import Tacticview from './Goalsview/Tacticview';
import GoalSidebar from './Goalsview/GoalSidebar';
import {baseUrl} from '../config';  
import {GET, DELETE, POST, createGoal, deleteTacticData} from '../helper/service'; 
import {useDispatch,useSelector} from "react-redux"; 
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import DatePicker from "react-datepicker";
import $ from 'jquery';  
import { withStyles } from '@material-ui/core/styles';


const formFields = [{ 
  goal_name: "", 
  description: "", 
  assignee: "",
  startDate:"",
  endDate:"",
  frequency:"", 
  tactic:"",
  tacticDescription:"", 
  assigneeName:"",
  enableEnddate:true,
  goal_type:""
}]

const initialValues = { 
  goal_type:"Company",
  searching:""
}; 

 

const styles = theme => ( {
  trashIcon: {
    height: "33px",
    width: "39px",
    display: "flex",
  },
 } 
);

// export default function Mygoal() {
  const Mygoal = ( props ) => {
  const auth = useSelector(state=>state.auth);  
  const { register, handleSubmit, formState: { errors } } = useForm();   
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(initialValues);  
  const notify = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const [loader,setLoader]=useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [myGoalList, setMyGoalList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [tacticList, setTacticList] = useState([]);
  const [totalTactic, setTotalTactic] = useState(0);
  const [tacticId, setTacticId] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState();
  const [inputList, setInputList] = useState(formFields);  
  const [savedUserList, setSavedUserList] = useState([]); 
  const [goalDetails, setGoalDetails] = useState({}); 
  const [sortingBy, setSortingBy] = useState(''); 
  const [searchBy, setsearchBy] = useState(''); 
  const { classes } = props; 

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

 

  const token  = auth.token;
  const userId = auth.user.id; 
  let per_page = 5;
  let page = 0;


  useEffect(() => {   
    refreshScreen();
  }, []);


  const refreshScreen = () => {
      fetchGoal();
      fetchUserTactic(page,per_page);   
  };

  
  useEffect(() => {   
    fetchGoal();   
  }, [sortingBy]);

  
  
  
  const getGoalById = (goalId) => {
    setLoader(true);
    const url = baseUrl + '/goals-tactics/get/'+goalId;
    console.log("Goal Id ====== ", goalId)
    GET(url, token).then(data => {   
       setGoalDetails(data.result);
       setLoader(false);
    }).catch(err=>{
      setGoalDetails({});
    }) 

  } 

  const fetchUsers = (e) => { 
    let key="";
    //const url = baseUrl + '/users/search?search_name='+key;
    const url = baseUrl + '/org_employee_relations/employee_under_supervisor/search?searchParameter='+key+'&limit=10000&page=1';
    
    GET(url,token).then(response => {  

      console.log("response ===== ", response)

      let newArray = [];
      response.data.map((user) => {
        var nm = user.name.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
        return newArray.push({"label":nm,"id":user.id});
      });
      setUserList(newArray);
      setSavedUserList(newArray);
    }) 
  }

  const fetchGoal = (e) => {
    var queryString = "";
    queryString = "?search="+values.searching+"&sortBy="+sortingBy;
    const url = baseUrl + '/goals/user'+queryString;

    GET(url,token).then(data => {    
      if(data.result.length > 0){
        setSelectedGoal(data.result[0]['id']);  
        getGoalById(data.result[0]['id']);  
        setMyGoalList(data.result); 
      } else {
        setSelectedGoal();   
        setMyGoalList([]); 
        getGoalById();
      }
    })  
  }

  const fetchUserTactic = (page,per_page) => {
    setLoader(true); 
    const url = baseUrl + '/tactics/user/'+userId+'?skip='+page*per_page+'&take='+per_page;
    GET(url,token).then(data => { 
      setTacticList(data.result);
      setTotalTactic(data.totalCount);
      setLoader(false); 
    })  
  }

  const fetchTactic = (num) => {
    fetchUserTactic(num,per_page); 
  }

  const searchUsers = (key, index) => { 
    const url = baseUrl + '/users/search?search_name='+key;
    GET(url,token).then(response => { 
      let newArray = [];
      response.map((user) => {
        return newArray.push({"label":user.name,"id":user.id});
      });
      setUserList(newArray);
      setLoader(false);
    }) 
    
  }

  const handleChange = (e) => { 
    const { name, value } = e.target; 
    setValues({...values,[name]: value,});
  };

  const ondateChange = (value,name,index) => {  
      const list = [...inputList];
      list[index][name] = value;
      list[index]['enableEnddate'] = false;
      setInputList(list); 
  };

  const AssigneeChange = (value, index) => {  
    let explodedName = value?.label.split(" "); 
    var lastItem = explodedName?.pop();  
     const list = [...inputList];
     list[index]['assignee'] = value?.id;
     list[index]['assigneeName'] = explodedName[0]?.charAt(0)+lastItem[0]?.charAt(0);
     setInputList(list); 
     setUserList(savedUserList);
  };
 
  const onSubmit = () => {  
 
    var isEmpty = false; 
    inputList.forEach(ele => {
            if(!values.goal_name || ele.assignee == "" || ele.tactic == ""){
              isEmpty = true; 
        }
    });

    if(isEmpty){
      notifyError("Please fill all the required fields");
      return false;
    }

 

    setLoader(true); 
    createGoal(JSON.stringify(inputList), values, token).then(data => {  
        fetchGoal();
        fetchUserTactic(page,per_page);
        setLoader(false);
        setInputList(formFields);
        notify('Goal addedd successfully.'); 
          $(document).ready(function(){  
            window.$('#exampleModalCenter').modal('hide');
            values.goal_name ="";
            values.goal_type ="";
            values.description =""; 
            inputList[0].tactic = "";
            inputList[0].tacticDescription = "";
            inputList[0].startDate = "";
            inputList[0].endDate = "";
            inputList[0].assignee = ""; 
          });
    })
  }



  const deleteItem = () => { 
    if(isChecked===false){
      setLoader(true); 
      const url = baseUrl + '/goals/'+selectedGoal;
         DELETE(url, token).then(data => {  
          setLoader(false); 
          fetchGoal();
          fetchUserTactic(page,per_page);
          notify('Goal deleted successfully.'); 
          $(document).ready(function(){   
            window.$('#confirmDelete').modal('hide')
          });
      })  
    } else {
      if(tacticId.length > 0){
        setLoader(true); 
        const data = {
          "ids":tacticId
        } 
        const url = baseUrl + '/tactics/delete';
        POST(url, data, token).then(data => {  
        setLoader(false); 
        fetchUserTactic(page,per_page);
          notify('Tactic deleted successfully.'); 
          $(document).ready(function(){   
            window.$('#confirmDelete').modal('hide')
          });
      }) 
      }
    }
  }
   
 
  const selectTactic = (id) => { 
    if(tacticId.includes(id)===false){
      setTacticId(oldArray => [...oldArray, id]);
    } else {
      var index = tacticId.indexOf(id);
      if (index > -1) {  
        tacticId.splice(index, 1);
      }  
      setTacticId(tacticId);
    }
    
  }; 

  const deleteGoal = (id) => {  
    setSelectedGoal(id);   
    getGoalById(id);
  }; 

 
  const handleInputChange = (e, index) => {
   const { name, value } = e.target;
   const list = [...inputList];
   list[index][name] = value;
   setInputList(list);
   };
 
   const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
   };
 
   const handleAddClick = () => {
    let key ="";
    searchUsers(key);
       setInputList([...inputList, {  
        goal_name:"", 
        description:"", 
        assignee:"",
        startDate:"",
        endDate:"",
        frequency:"", 
        tactic:"",
        tacticDescription:"" 
      }]);
   };


   const ManualSearch = (e) => { 
      const { name, value } = e.target; 
        // if(value.length >= 3){ 
          setTimeout(function(){
            searchUsers(value);
          },1000); 
        // }
    };

   
    const deleteSelectedUser = (index) => {   
        const list = [...inputList];
        list[index]['assignee'] = "";
        list[index]['assigneeName'] = "";
        setInputList(list); 
    };
 
    const addGoal = () => {  
      fetchUsers(); 
      $(document).ready(function(){   
        window.$('#exampleModalCenter').modal('show')
      });
    };

    const soryBy = (e) => {   
     setSortingBy(e.target.value); 
    };
    
 
    const handleKeyPress = (e) => {   
      if (e.key === 'Enter') {   
            fetchGoal();
        }  else {
          if(values.searching==""){
            fetchGoal();
          }
      }
    }

      const handleSearchIcon = (e) => { 
           fetchGoal();
      }
   

	return ( 
		<div className='wrapper'> 
        <div id="content">
        <div className="dashboard_main">
        <div className="row">
        {/* <AvatarImage name={'Deepak'} profileImage={''} /> */}
        <Loader loading={loader}/>
        <Toast/> 

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
                  <div className="left_section"><button type="button" onClick={addGoal}><span className="add_goals"><svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 13 13" fill="none">
                          <path d="M13 7.72353H7.85098V13H5.14902V7.72353H0V5.27647H5.14902V0H7.85098V5.27647H13V7.72353Z" fill="white" />
                        </svg></span>Add Goal</button></div>
                  <div className="right_section">
                    <div className="searchbaarinput">
                      {/* <input type="text" name placeholder="Search" />  */}
                      <input type="text" name="searching" placeholder="Search" onChange={handleChange} onKeyUp={handleKeyPress}/>

                      <button onClick={handleSearchIcon} type="button"><svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 17 17" fill="none">
                          <path d="M15.75 15.75L12.3855 12.3795M14.25 7.875C14.25 9.56576 13.5784 11.1873 12.3828 12.3828C11.1873 13.5784 9.56576 14.25 7.875 14.25C6.18424 14.25 4.56274 13.5784 3.36719 12.3828C2.17165 11.1873 1.5 9.56576 1.5 7.875C1.5 6.18424 2.17165 4.56274 3.36719 3.36719C4.56274 2.17165 6.18424 1.5 7.875 1.5C9.56576 1.5 11.1873 2.17165 12.3828 3.36719C13.5784 4.56274 14.25 6.18424 14.25 7.875V7.875Z" stroke="#717171" strokeWidth={2} strokeLinecap="round" />
                        </svg></button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content add_goals_contents">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">Add Goal</h5>
                    </div>
                    <div className="modal-body add_goalsbody">

                    <div className="row form-group">
                        <label>Goal Name <span className="required-mark">*</span></label>    
                        <input 
                        type="text" 
                        className="form-control"
                        value={values.goal_name}
                        name="goal_name" 
                        placeholder="Goal Name" 
                        onChange={handleChange}
                        />    
                        <span className="error-msg">{error.goal_name}</span>
                      </div>

 

                    <div className="row form-group">
                        <label>Type <span className="required-mark">*</span></label>    
                       <select className="form-control" defaultValue="Company" name="goal_type" onChange={handleChange} > 
                       <option value="Company">Company</option>
                       <option value="Personal">Personal</option>
                       </select> 
                        <span className="error-msg">{error.goal_name}</span>
                      </div>


                      <div className="row form-group">
                        <label>Goal Description </label>  

                        <textarea 
                        class="form-control" 
                        name="description" 
                        value={values.description}
                        placeholder="Description" 
                        onChange={handleChange} 
                        defaultValue={""} 
                        />
                        <span className="error-msg">{error.description}</span>
                      </div>


                  {inputList.map((x, i) => { 
                    let clname = classes.trashIcon+' btn btn-danger btn-sm';
                    var endDateStatus = true;
                    if(inputList[i]['enableEnddate']===false){
                      var endDateStatus = false;
                    }

                    return (
                      <>  
                      <div className="row form-group">
                        <label>Tactic {i+1} <span className="required-mark">*</span></label> 
                        <label className="ml-2">{inputList.length !== 1 && 
                        <button className={clname} onClick={() => handleRemoveClick(i)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21" fill="none">
                        <path d="M15.7759 7.56049H5.73406C5.29746 7.56049 4.93362 7.92432 5.00639 8.36092L6.17066 17.8934C6.24343 18.6211 6.89833 19.1304 7.626 19.1304H13.8112C14.5389 19.1304 15.1938 18.6211 15.2665 17.8934L16.4308 8.36092C16.5036 7.92432 16.2125 7.56049 15.7759 7.56049Z" fill="white" />
                        <path d="M16.5761 3.19448H12.9377C12.9377 2.39404 12.2828 1.73914 11.4824 1.73914H10.0271C9.22662 1.73914 8.57171 2.39404 8.57171 3.19448H4.93337C4.13293 3.19448 3.47803 3.84938 3.47803 4.64981V5.37748C3.47803 5.81409 3.7691 6.10515 4.2057 6.10515H17.3038C17.7404 6.10515 18.0314 5.81409 18.0314 5.37748V4.64981C18.0314 3.84938 17.3765 3.19448 16.5761 3.19448Z" fill="white" />
                        </svg>
                        </button>
                        }</label>
                        <input 
                        type="text" 
                        className="form-control"
                        value={values.tactic}
                        name="tactic" 
                        placeholder="Tactic" 
                        onChange={e => handleInputChange(e, i)}
                        /> 
                      </div>

                      <div className="row form-group">
                        <label>Description </label> 
                        <input 
                        type="text" 
                        className="form-control"
                        value={values.tactic}
                        name="tacticDescription" 
                        placeholder="Description" 
                        onChange={e => handleInputChange(e, i)}
                        /> 
                      </div>


                      <div className="row form-group">
                      <div className="row">
                      <div className="col-md-4"> 
                      <DatePicker 
                      className="startDates"
                      placeholderText="Start Date"  
                      name="startDate" 
                      onChange={(date) => ondateChange(date,'startDate', i)}
                      minTime={new Date()}
                      maxTime={new Date()}
                      minDate={new Date()}
                      dateFormat="d-MM-yyyy"  
                      selected={inputList[i]['startDate']}
                      /> 
                      </div>

                      <div className="col-md-4"> 
                      <DatePicker 
                      className="startDates"
                      placeholderText="End Date"  
                      onChange={(date) => ondateChange(date,'endDate', i)}
                      minTime={new Date()}
                      maxTime={new Date()}
                      dateFormat="d-MM-yyyy"  
                      selected={inputList[i]['endDate']}
                      disabled={endDateStatus}
                      minDate={inputList[i]['startDate']}
                      />
                      </div> 
                      <div className="col-md-4"> 
                      <div class="repeats_addgolas_wrp">
                      <select defaultValue={'default'} 
                      class="form-control repeats_addgolas_control" 
                       name="frequency"  
                      onChange={e => handleInputChange(e, i)}>
                      <option value="default">Repeats</option>
                      <option value="monthly">Monthly</option>
                      <option value="weekly">Weekly</option>
                      <option value="daily">Daily</option>
                      </select> 
                      </div>
                      </div>  
                      </div> 
                      </div> 


                      <div className="row form-group labelname">
                      <label>Assign to <span className="required-mark">*</span></label>
                      </div>
                      <div className="row form-group multiselect">  
                      <Autocomplete
                      disablePortal 
                      id="combo-box-demo"
                      fullWidth
                      freeSolo 
                      sx={{
                        width: "100%",
                        ".MuiOutlinedInput-root": {
                          "&:hover": { 
                            borderColor: "red",
                            borderWidth: 10
                          }
                        }
                      }}
                      onChange={(event, newValue) => { 
                         AssigneeChange(newValue, i); 
                      }} 
                      onInputChange={(event, newInputValue) => {  
                          //searchUsers(newInputValue,i);
                      }} 
                      options={userList} 
                      renderInput={(params) => <TextField {...params} placeholder="Assign to" className="form-control dropdowns" name="searchEle" onChange={ManualSearch}/>}
                      /> 
                      </div>  
                    

                    {(inputList[i].assignee > 0  ? 
                    <div className="row form-group">
                    <div className="user_goals_name">
                      <ul className="clearfix">
                        <li><button type="button" className="user_goals_name_bt">{inputList[i].assigneeName}
                            <span onClick={deleteSelectedUser.bind(this,i)} className="crossgoals_bt"><svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26" fill="none">
                                <g filter="url(#filter0_d_132_797)">
                                  <circle cx={13} cy={12} r={8} fill="white" />
                                </g>
                                <path d="M15.9801 15.9438L13.3457 13.3094L10.6742 15.9809L9.62297 14.9296L12.2944 12.2581L9.67244 9.63616L10.6248 8.68383L13.2468 11.3058L15.9306 8.62199L16.9819 9.67326L14.298 12.3571L16.9324 14.9914L15.9801 15.9438Z" fill="#9D9D9D" />
                                <defs>
                                  <filter id="filter0_d_132_797" x={0} y={0} width={26} height={26} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy={1} />
                                    <feGaussianBlur stdDeviation="2.5" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_132_797" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_132_797" result="shape" />
                                  </filter>
                                </defs>
                              </svg>
                              </span>
                          </button>
                          </li> 
                      </ul>
                    </div>
                  </div>
                    : '')} 
                      <div className="row form-group">  
                        {inputList.length - 1 === i && <button type="button" className="add_tactic_bt" onClick={handleAddClick}>+ Add Tactic</button>}
                      </div>   
                    </>
                    );
                    })}  
                      <div className="row form-group">
                        <button type="button" className="add_goals_bt" onClick={handleSubmit(onSubmit)}>ADD GOAL</button>
                      </div> 
                    </div> 
                  </div>
                </div>
              </div>

 


           

          <div className="modal fade" id="confirmDelete" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog delete_popup_wrp modal-dialog-centered" role="document">
              <div className="modal-content">
                <div classname="modal-body">
                  <div className="delete-popup">
                    <div className="all_delete_layer">
                      <div className="form-group layer_delete">Are you sure you want delete it?</div>
                    </div>
                    <div className="modal-footer create_custom_footer">
                      <button type="button" className="create_button cancel_bt_coutom" data-dismiss="modal">No</button>
                      <button type="button" className="create_button" onClick={deleteItem}>Yes</button> 
                    </div>
                  </div>
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
                      <select className="form-control selectbox" defaultValue="" onChange={soryBy} name="sorting">
                        <option value="">Select</option>
                        <option value="due">Due Date</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completion">Completed</option>
                        <option value="alpha">Alphabetical</option>
                      </select>
                    </div>
                  </div>
                  <div className="toggle-button-cover">
                    <div className="button-cover">
                      <div className="button b2 mygoal" id="button-10">
                        {/* <input type="checkbox" className="checkbox" /> */}
                        <input
                        type="checkbox"
                        className="checkbox"
                        id="topping"
                        name="topping"
                        value="Paneer"
                        Q={isChecked}
                        onChange={handleOnChange}
                        />
                        <div className="knobs">
                          <span>Goals View</span>
                        </div>
                        <div className="layer"/>
                      </div>
                    </div>
                  </div>
                  {(myGoalList.length > 0 ? <button type="button" className="deleterow" data-toggle="modal" data-target="#confirmDelete">
                    <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21" fill="none">
                      <path d="M15.7759 7.56049H5.73406C5.29746 7.56049 4.93362 7.92432 5.00639 8.36092L6.17066 17.8934C6.24343 18.6211 6.89833 19.1304 7.626 19.1304H13.8112C14.5389 19.1304 15.1938 18.6211 15.2665 17.8934L16.4308 8.36092C16.5036 7.92432 16.2125 7.56049 15.7759 7.56049Z" fill="white" />
                      <path d="M16.5761 3.19448H12.9377C12.9377 2.39404 12.2828 1.73914 11.4824 1.73914H10.0271C9.22662 1.73914 8.57171 2.39404 8.57171 3.19448H4.93337C4.13293 3.19448 3.47803 3.84938 3.47803 4.64981V5.37748C3.47803 5.81409 3.7691 6.10515 4.2057 6.10515H17.3038C17.7404 6.10515 18.0314 5.81409 18.0314 5.37748V4.64981C18.0314 3.84938 17.3765 3.19448 16.5761 3.19448Z" fill="white" />
                    </svg>
                    </button> : '')}
                  

                    </div>
              </div> 
            {(isChecked ? <Tacticview mytactic={tacticList} totalTactic={totalTactic} fetchTactic={fetchTactic} selectTacticSelected={selectTactic} tacticIdSelected={tacticId}/> : 
            <Goalview mygoal={myGoalList} deleteGoal={deleteGoal} selectedGoalId={selectedGoal}/> 
            )} 
            </div>
          </div>
          <GoalSidebar goalDetailsdata={goalDetails}/>    
        </div>
      </div>
		</div> 
    </div>
	)
}
export default withStyles( styles )( Mygoal );