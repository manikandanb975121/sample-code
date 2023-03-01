import React from "react";  
import {useDispatch,useSelector} from "react-redux"; 
import GoalList from "src/view/Reports/GoalList";

export default function Rightsidebar({onClickCoreCompetencyReviewButton,onClickTechnincalCompetencyReviewButton,isCoreCompetencyReveiwSubmited, isTechnicalCompetencyReviewSubmited,onClickReviewButton,onClickPreviousReviewModule}) {

	const auth = useSelector(state=>state.auth);
  const token = auth.token;   


	return ( 
            <div className="goalsmain_inner_section">

            <div className="pertion_table rating_quality_wrp"> 
            <h3>Goal List</h3>
            </div>
            <GoalList />
            


            <div className="pertion_table rating_quality_wrp"> 


            <h3>Previous Review</h3>


            <button type="button" className="submit_request" onClick={onClickPreviousReviewModule} >Click to see previous review</button>
            


            </div>


            <div className="pertion_table rating_quality_wrp">

            <h3>Previous / Average Rating</h3>

           

            </div>


            <div className="pertion_table rating_quality_wrp note_request_meeting">
            <h3>Quaterly Goal Completion Rate</h3>
            
            <button type="button" className="submit_request" onClick={onClickCoreCompetencyReviewButton} >Submit Core Competency Review</button>
            <button type="button" className="submit_request" onClick={onClickTechnincalCompetencyReviewButton}>Submit Technical Competency Review</button>
            {(isCoreCompetencyReveiwSubmited&& isTechnicalCompetencyReviewSubmited)?<button type="button" className="submit_request" onClick={onClickReviewButton} >Submit Review</button> :<></>}
            </div>    

            </div>
	)


}







