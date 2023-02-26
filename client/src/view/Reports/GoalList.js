import React, { useEffect, useState } from 'react'
import axiosIntance from 'src/helper/axios';
import { environment } from 'src/configs/environment';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import "../../App.css";

const GoalList = () => {

    const [goalList, setGoalList] = useState([]);

    useEffect(() => {
        getGoalList();
    }, []);

    const getGoalList = async () => {
        const response = await axiosIntance.get(environment.baseAPIUrl + environment.endpoints.reports.goalList);
        setGoalList(response.data.result);
    } 
  return (

    // <div style={{ height: '40%'}} className="goalsmain_inner_section predicton_right_section">
    //     <div className="goalsreminders_haeder">
    //       <h4>Goal List</h4>
    //     </div>      
    <>
    {goalList.length > 0 && goalList.map((e, index)=>{
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
    </>        
        
    // </div>

    // <div className="goalsmain_inner_section predicton_right_section">
    //           <div className="goalsreminders_haeder">
    //             <h4>Goal List</h4>
    //           </div>
    //           {
    //             goalList.map((goal) => (
    //               <div className="reports_predictiongoal_rating">
    //                 <div className="row">
    //                   <div className="col-md-6 col-sm-6 col-xs-12">
    //                     <div className="predicton_report">
    //                       <div className="predicton_name">{ goal.goalName }</div>
    //                       <div className="predicton_rating"><span>{goal.combineRating}/{goal.speed}</span></div>
    //                     </div>
    //                   </div>
    //                   <div className="col-md-6 col-sm-6 col-xs-12">
    //                     <div className="predicton_report">
    //                       <div className="predicton_name"><svg xmlns="http://www.w3.org/2000/svg" width={19} height={19} viewBox="0 0 19 19" fill="none">
    //                           <path d="M18.875 7.15625H11.6973L9.5 0.125L7.30273 7.15625H0.125L5.94043 11.5166L3.64062 18.875L9.5 14.1875L15.3594 18.875L13.0596 11.5166L18.875 7.15625Z" fill="#FAB732" />
    //                         </svg><span className="star_rating_prediction">{goal.combineRating}</span></div>
    //                       <div className="predicton_last_rating">{goal.completionPercent}%</div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             ))
    //           }
    //         </div>
  )
}

export default GoalList