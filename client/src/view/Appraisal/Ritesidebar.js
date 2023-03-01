import React from "react";  
import {useDispatch,useSelector} from "react-redux"; 
import CircularProgress from '../common/CircularProgress';

export default function Ritesidebar(props) {
	const auth = useSelector(state=>state.auth);
    const token = auth.token; 
    const details = props.details;  

  
    
    var percentage = parseInt(details.completionPercent);

    if(!percentage){
        percentage = 0;
    }

    var clName = "submit_request";
    var disa = false;
    if(!details.isDisabled || props.disa){
        disa = true;
        clName = "submit_request disabled";
    }


    console.log("details ==== ", details)

	return ( 
            <div className="goalsmain_inner_section">
            <div className="goalsreminders_haeder">
            <h4>{details.goalName}</h4>
            <p className="goals_text_individual">{details.description}</p>
            </div>
            <div className="goalscompetativegol">
            <div className="set-size directmygoals charts-container"> 

             <CircularProgress 
                  width="75" 
                  percentage={percentage} 
                  pathColor="#52C249" 
                  textColor='#000' 
                  trailColor='#fde9c1' 
                  backgroundColor='#3e98c7'
                />
            </div>

             

            <div className="company_goals_values">
                <h3>Team Goals
                <div className="select-option team_goals_view">
                    <select className="form-control selectbox">
                    <option value={1} selected>Please Select</option> 
                    {details.tactics?.map((e, index)=>{ 
                        var checked = false;
                        if(e.status=="Completed"){
                        checked = true;
                        }
                        return ( 
                            <option value={e.id}>{e.name}</option> 
                        )
                    })} 
                 </select>
                </div>
                </h3>
            </div>
            </div>
            <div className="pertion_table rating_quality_wrp"> 
            <h3>Speed</h3>
            <div className="row_rating_wrp">
                <div id="full-stars-example-two">
                <div className="rating-group speed_rating">
                <input disabled defaultChecked className="rating__input rating__input--none" name="rating4" id="rating3-none" defaultValue={0} checked={(details.quality==null  ? true : false)} type="radio" />
                <label aria-label="1 star" className="rating__label" htmlFor="rating4-6">
                <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg>{/* <i class="rating__icon rating__icon--star fa fa-star"></i> */}</label>
                <input className="rating__input" name="rating4" id="rating4-6" defaultValue={1} checked={(details.speed==1 ? true : false)} type="radio"  onChange={props.noteChange}  />
                <label aria-label="2 stars" className="rating__label" htmlFor="rating4-7">
                <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg>{/* <i class="rating__icon rating__icon--star fa fa-star"></i> */}</label>
                <input className="rating__input" name="rating4" id="rating4-7" defaultValue={2} checked={(details.speed==2 ? true : false)} type="radio" onChange={props.noteChange}/>
                <label aria-label="3 stars" className="rating__label" htmlFor="rating4-8">
                <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg>{/* <i class="rating__icon rating__icon--star fa fa-star"></i> */}</label>
                <input className="rating__input" name="rating4" id="rating4-8" defaultValue={3} checked={(details.speed==3 ? true : false)} type="radio" onChange={props.noteChange}/>
                <label aria-label="4 stars" className="rating__label" htmlFor="rating4-9">
                <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg>{/* <i class="rating__icon rating__icon--star fa fa-star"></i> */}</label>
                <input className="rating__input" name="rating4" id="rating4-9" defaultValue={4} checked={(details.speed==4 ? true : false)} type="radio" onChange={props.noteChange}/>
                <label aria-label="5 stars" className="rating__label" htmlFor="rating4-10">
                <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg>{/* <i class="rating__icon rating__icon--star fa fa-star"></i> */}</label>
                <input className="rating__input" name="rating4" id="rating4-10" defaultValue={5} checked={(details.speed==5 ? true : false)} type="radio"  onChange={props.noteChange}/>
                </div>
                </div>
            </div>
            </div>
            <div className="pertion_table rating_quality_wrp">
            <h3>Quality </h3>
            <div className="row_rating_wrp">
                <div id="full-stars-example-two">
                <div className="rating-group speed_rating">
                    <input disabled defaultChecked className="rating__input rating__input--none" name="rating5" id="rating3-two" defaultValue={0} checked={(details.quality==null  ? true : false)} type="radio" />
                    <label aria-label="1 star" className="rating__label" htmlFor="rating1-6">
                    <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg>{/* <i class="rating__icon rating__icon--star fa fa-star"></i> */}</label>
                    <input className="rating__input" name="rating5" id="rating1-6" defaultValue={1} checked={(details.quality==1  ? true : false)} type="radio" onChange={props.noteChange}/>
                    <label aria-label="2 stars" className="rating__label" htmlFor="rating1-7">
                    <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg>{/* <i class="rating__icon rating__icon--star fa fa-star"></i> */}</label>
                    <input className="rating__input" name="rating5" id="rating1-7" defaultValue={2} checked={(details.quality==2 ? true : false)} type="radio" onChange={props.noteChange}/>
                    <label aria-label="3 stars" className="rating__label" htmlFor="rating1-8">
                    <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg>{/* <i class="rating__icon rating__icon--star fa fa-star"></i> */}</label>
                    <input className="rating__input" name="rating5" id="rating1-8" defaultValue={3} checked={(details.quality==3 ? true : false)} type="radio" onChange={props.noteChange}/>
                    <label aria-label="4 stars" className="rating__label" htmlFor="rating1-9">
                    <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg>{/* <i class="rating__icon rating__icon--star fa fa-star"></i> */}</label>
                    <input className="rating__input" name="rating5" id="rating1-9" defaultValue={4} checked={(details.quality==4 ? true : false)} type="radio" onChange={props.noteChange}/>
                    <label aria-label="5 stars" className="rating__label" htmlFor="rating1-10">
                    <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg>{/* <i class="rating__icon rating__icon--star fa fa-star"></i> */}</label>
                    <input className="rating__input" name="rating5" id="rating1-10" defaultValue={5} checked={(details.quality==5 ? true : false)}  type="radio" onChange={props.noteChange}/>
                </div>
                </div>
            </div>
            </div>
            <div className="pertion_table rating_quality_wrp note_request_meeting">
            <h3>Note</h3>
            <textarea className="text_rating_area" defaultValue={""} name="notes" value={(details.notes ? details.notes : '')} onChange={props.noteChange}/>
            <div className="tactic_wrp_new rating_request"> 
                <div className="form-group">
                <input type="checkbox" id="html1" name="meetRequest" value={1} checked={(details.requestMeeting ? true : '')} onChange={props.noteChange}/>
                <label htmlFor="html1">Request Meeting </label>
                </div>
            </div>
            <button disabled={disa} type="button" className={clName} onClick={props.handleSubmit}>SUBMIT</button>
            </div>    
            </div>
	)
}







