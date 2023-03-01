import React, { useState, useEffect } from "react"; 
import {useDispatch,useSelector} from "react-redux";
import PredictionmatrixGraph from "./PredictionmatrixGraph"; 
import _ from 'lodash'; 
import "../../App.css";
// import {baseUrl} from '../../config'; 
import OrgChart from "../../orgTree";
import Layout from "../../layout";
import Header from '../common/Header';
import Footer from '../common/Footer';
import Sidebar from '../common/Sidebar';
import GoalList from './GoalList';
import {baseUrl} from '../../config';  
import {GET} from '../../helper/service';   
import Loader from '../common/Loader';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

 

 
export default function Predictionmatrix() {
	const auth = useSelector(state=>state.auth); 
  const [topList, settopList] = useState([]);
  const [loader,setLoader]=useState(false); 
  const [graphData, setGraphData] = useState([])
  const token = auth.token; 
 
  

  useEffect(() => {  
    topGoalList();   
    getPredectionList();
  }, []); 


  const topGoalList = (e) => {
    setLoader(true); 
    const url = baseUrl + '/appraisal/detail/list';
    GET(url,token).then(data => {    
      settopList(data.result); 
      setLoader(false); 
    })    
  }


   



  const getPredectionList = (e) => {
    setLoader(true); 
    const url = baseUrl + '/appraisal/prediction/list';
    GET(url,token).then(data => {  
      var obj = [];
      data.result.forEach(e => {
          var r = function () { return Math.floor(Math.random()*256) };
          var colors =  "rgb(" + r() + "," + r() + "," + r() + ")"; 
          obj.push({x:e.speed,y:e.quality,z:150,color:colors,percentage:e.goalName})
      });
      setGraphData(obj); 
    })    
  }




	return (
		<div className='wrapper'> 
    <Loader loading={loader}/>
   
    <div id="content">
		<div className="dashboard_main">
        <div className="row">
          <div className="col-md-8 pd_right_0">
            <div className="mygoals_inner_section ">
              <div className="reports_prediction_matrix">
                <div className="reports_prediction_img">  
                <PredictionmatrixGraph data={graphData}/> 
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
          <div className="goalsmain_inner_section predicton_right_section">
              <div className="goalsreminders_haeder">
                <h4>Goal List</h4>
              </div>
            <GoalList />

            </div>
            {/* <GoalList /> */}
            {/* <div className="goalsmain_inner_section predicton_right_section">
              <div className="goalsreminders_haeder">
                <h4>Goal List</h4>
              </div>

 
              
              {topList.length > 0 && topList.map((e, index)=>{
                return (
                    <div className="reports_predictiongoal_rating">
                    <div className="row">
                      <div className="col-md-5 col-sm-5 col-xs-12">
                        <div className="predicton_report">
                          <div className="predicton_name">{e.goalName}</div>
                          <div className="predicton_rating"><span>{e.completed}/{e.total}</span></div>
                        </div>
                      </div>


                      <div className="col-md-5 col-sm-5 col-xs-12">
                        <div className="predicton_report">
                          <div className="predicton_name"> 
                          <Stack spacing={1}> 
                          <Rating name="half-rating-read" defaultValue={e.combineRating} precision={0.1} />
                          </Stack>
                            </div> 
                        </div>
                      </div>
                      <div className="col-md-2 col-sm-2 col-xs-12">
                        <div className="predicton_report"> 
                          <div className="predicton_last_rating">{e.completionPercent}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })} 
            </div> */}
          </div>
        </div>
      </div>
		</div>
 </div>
	)
}