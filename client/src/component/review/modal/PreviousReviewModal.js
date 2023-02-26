import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@mui/material/IconButton';
import ReviewBox from "../components/ReviewBox";


export default function PreviousReviewModal({coreCompetencyReview,technicalCompetencyReview,show,createReview,onCloseSummaryModal}){

 return <>
 <Modal size="lg" show={show} >
      <Modal.Header>
        <Modal.Title>Previous Review</Modal.Title>
        <IconButton onClick={onCloseSummaryModal} color="primary"  component="label">
              <CloseIcon />
            </IconButton>
      </Modal.Header>

      <Modal.Body>
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h6 style={{ letterSpacing: '3px', paddingTop: '10px'}}>CORE COMPETENCY</h6>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                { coreCompetencyReview.length ===0 
                  ? <li class="list-group-item" >No Competency Form Is Available For This Template</li> 
                  : 
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '10px'}}>
                      {
                        coreCompetencyReview.map((data, index) => (
                          <ReviewBox title={data?.coreCompetency?.name} index={index} rating={data.rate} value={data?.description} compitancyId={data.core_competency_id}/>
                        ))
                      }
                    </div> 
                  </div>
                }
              </div>
            </AccordionDetails>
          </Accordion>


          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <h6 style={{ letterSpacing: '3px', paddingTop: '10px'}}>TECHNICAL COMPETENCY</h6>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                  { coreCompetencyReview.length ===0 
                    ? <li class="list-group-item" >No Technical Form Is Available For This Template</li> 
                    : 
                    <div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '10px'}}>
                        {
                          technicalCompetencyReview.map((data, index) => (
                            <ReviewBox title={data?.technicalCompetency?.name} index={index} rating={data?.rate} value={data?.description} compitancyId={data?.core_competency_id}/>
                          ))
                        }
                      </div> 
                    </div>
                  }
                </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </Modal.Body>
 </Modal>
  
  
 
 </>

  // return <><div>
  //   <Modal show={show} >
  //     <Modal.Header>
  //       <Modal.Title>Previous Review</Modal.Title>
  //       <button type="button" onClick={onCloseSummaryModal}><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
  //     </Modal.Header>
    
  //     <Modal.Body>
  //       <ul class="review_wrapper">  
  //         <li style={{textAlign:"left", fontSize:"15px"}}>
  //           <h4>Core Competency</h4>
  //           { coreCompetencyReview.length ===0
  //             ? <li class="list-group-item" >No Competency Form Is Available For This Template</li>
  //             : <>
  //                 <div className="modal-body add_goalsbody">
  //                 <p className="text_heading">For John Smith</p>
  //                 {coreCompetencyReview.map((data, index) => {
  //                   const details={
  //                     speed:data.rate
  //                   }
  //                   var names = 'ratingCoreCompetency'+index;
  //                   var ele1 = Math.random();
  //                   var ele2 = Math.random();
  //                   var ele3 = Math.random();
  //                   var ele4 = Math.random();
  //                   var ele5 = Math.random();

                    

  //                   return( 
  //                     <div className="row form-group">
  //                       <div className="rating_label_wrp">
  //                         <label>{data.name}</label>
  //                         <div className="row_rating_wrp">

  //                         <div id="full-stars-example-two">
  //                               <div className="rating-group speed_rating"> 
                                
  //                               <input disabled defaultChecked className="rating__input rating__input--none" name={names} id="rating3-none"  checked={(details.quality==0  ? true : false)} type="radio" />
  //                               <label aria-label="1 star" className="rating__label" htmlFor={ele1}>
  //                               <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                                
  //                               <input className="rating__input" name={names} id={ele1}  checked={(parseInt(data.rate)==1 ? true : false)} type="radio"   />
  //                               <label aria-label="2 stars" className="rating__label" htmlFor={ele2}>
  //                               <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                                
  //                               <input className="rating__input" name={names} id={ele2}  checked={(parseInt(data.rate)==2 ? true : false)} type="radio" 
  //                               />
  //                               <label aria-label="3 stars" className="rating__label" htmlFor={ele3}>
  //                               <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                        
  //                               <input className="rating__input" name={names} id={ele3}  checked={(parseInt(data.rate)==3 ? true : false)} type="radio" 
  //                               />
  //                               <label aria-label="4 stars" className="rating__label" htmlFor={ele4}>
  //                               <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                            
  //                               <input className="rating__input" name={names} id={ele4}  checked={(parseInt(data.rate)==4 ? true : false)} type="radio" 
  //                               />
  //                               <label aria-label="5 stars" className="rating__label" htmlFor={ele5}>
  //                               <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                            
  //                               <input className="rating__input" name={names} id={ele5}  checked={(parseInt(data.rate)==5 ? true : false)} type="radio"  
  //                             />
  //                             </div>
  //                       </div> 
  //                           <div id="full-stars-example-two"> 
  //                           </div>
  //                         </div>
  //                       </div>
  //                       <textarea
  //                       id="text"
  //                       name="text"
  //                       className="form-control"
  //                       value={data.description}     
  //                     />
  //                     </div>  
  //                   )})
  //                 }
  //                 </div>
  //               </>
  //           }
  //         </li>
        
  //         <li style={{textAlign:"left", fontSize:"15px"}}> 
  //           <h4>Technical Competency</h4>
  //           { technicalCompetencyReview.length === 0 
  //             ? <li class="list-group-item" >No Competency Form Is Available For This Template</li> 
  //             : <>
  //                 <div className="modal-body add_goalsbody">
  //                 <p className="text_heading">For John Smith</p>

  //                 {technicalCompetencyReview.map((data,index) => {

  //                 const details={
  //                   speed:data.rate
  //                 }
  //                 var names = 'ratingTechnicalCompetency'+index;
  //                 var ele1 = Math.random();
  //                 var ele2 = Math.random();
  //                 var ele3 = Math.random();
  //                 var ele4 = Math.random();
  //                 var ele5 = Math.random();



  //                 return( 
  //                   <div className="row form-group">
  //                     <div className="rating_label_wrp">
  //                       <label>{data.name}</label>
  //                       <div className="row_rating_wrp">

  //                       <div id="full-stars-example-two">
  //                             <div className="rating-group speed_rating"> 
                            
                              
  //                             <input disabled defaultChecked className="rating__input rating__input--none" name={names} id="rating3-none"  checked={(details.quality==0  ? true : false)} type="radio" />
  //                             <label aria-label="1 star" className="rating__label" htmlFor={ele1}>
  //                             <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                            
  //                             <input className="rating__input" name={names} id={ele1}  checked={(parseInt(data.rate)==1 ? true : false)} type="radio"   />
  //                             <label aria-label="2 stars" className="rating__label" htmlFor={ele2}>
  //                             <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                            
  //                             <input className="rating__input" name={names} id={ele2}  checked={(parseInt(data.rate)==2 ? true : false)} type="radio" 
  //                             />
  //                             <label aria-label="3 stars" className="rating__label" htmlFor={ele3}>
  //                             <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                            
  //                             <input className="rating__input" name={names} id={ele3}  checked={(parseInt(data.rate)==3 ? true : false)} type="radio" 
  //                             />
  //                             <label aria-label="4 stars" className="rating__label" htmlFor={ele4}>
  //                             <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                            
  //                             <input className="rating__input" name={names} id={ele4}  checked={(parseInt(data.rate)==4 ? true : false)} type="radio" 
  //                             />
  //                             <label aria-label="5 stars" className="rating__label" htmlFor={ele5}>
  //                             <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                            
  //                             <input className="rating__input" name={names} id={ele5}  checked={(parseInt(data.rate)==5 ? true : false)} type="radio"  
  //                           />
  //                           </div>
  //                         </div> 
  //                         <div id="full-stars-example-two"> 
  //                         </div>
  //                       </div>
  //                     </div> 
  //                       <textarea
  //                         id="text"
  //                         name="text"
  //                         className="form-control"
  //                         value={data.description}
                        
  //                       />
  //                     </div>
  //                   ) 
  //                   })
  //                   }
  //                 </div>
  //               </>
  //           }
  //         </li>
  //       </ul>
  //   </Modal.Body>
  // </Modal>
  // </div></>
}

/**
 Existing Code


  return <><div>
    <Modal show={show} >
      <Modal.Header>
        <Modal.Title>Previous Review</Modal.Title>
        <button type="button" onClick={onCloseSummaryModal}><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
      </Modal.Header>
    
      <Modal.Body>
        <ul class="review_wrapper">  
          <li style={{textAlign:"left", fontSize:"15px"}}>
            <h4>Core Competency</h4>
            { coreCompetencyReview.length ===0
              ? <li class="list-group-item" >No Competency Form Is Available For This Template</li>
              : <>
                  <div className="modal-body add_goalsbody">
                  <p className="text_heading">For John Smith</p>
                  {coreCompetencyReview.map((data, index) => {
                    const details={
                      speed:data.rate
                    }
                    var names = 'ratingCoreCompetency'+index;
                    var ele1 = Math.random();
                    var ele2 = Math.random();
                    var ele3 = Math.random();
                    var ele4 = Math.random();
                    var ele5 = Math.random();

                    

                    return( 
                      <div className="row form-group">
                        <div className="rating_label_wrp">
                          <label>{data.name}</label>
                          <div className="row_rating_wrp">

                          <div id="full-stars-example-two">
                                <div className="rating-group speed_rating"> 
                                
                                <input disabled defaultChecked className="rating__input rating__input--none" name={names} id="rating3-none"  checked={(details.quality==0  ? true : false)} type="radio" />
                                <label aria-label="1 star" className="rating__label" htmlFor={ele1}>
                                <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                                
                                <input className="rating__input" name={names} id={ele1}  checked={(parseInt(data.rate)==1 ? true : false)} type="radio"   />
                                <label aria-label="2 stars" className="rating__label" htmlFor={ele2}>
                                <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                                
                                <input className="rating__input" name={names} id={ele2}  checked={(parseInt(data.rate)==2 ? true : false)} type="radio" 
                                />
                                <label aria-label="3 stars" className="rating__label" htmlFor={ele3}>
                                <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                        
                                <input className="rating__input" name={names} id={ele3}  checked={(parseInt(data.rate)==3 ? true : false)} type="radio" 
                                />
                                <label aria-label="4 stars" className="rating__label" htmlFor={ele4}>
                                <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                            
                                <input className="rating__input" name={names} id={ele4}  checked={(parseInt(data.rate)==4 ? true : false)} type="radio" 
                                />
                                <label aria-label="5 stars" className="rating__label" htmlFor={ele5}>
                                <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                            
                                <input className="rating__input" name={names} id={ele5}  checked={(parseInt(data.rate)==5 ? true : false)} type="radio"  
                              />
                              </div>
                        </div> 
                            <div id="full-stars-example-two"> 
                            </div>
                          </div>
                        </div>
                        <textarea
                        id="text"
                        name="text"
                        className="form-control"
                        value={data.description}     
                      />
                      </div>  
                    )})
                  }
                  </div>
                </>
            }
          </li>
        
          <li style={{textAlign:"left", fontSize:"15px"}}> 
            <h4>Technical Competency</h4>
            { technicalCompetencyReview.length === 0 
              ? <li class="list-group-item" >No Competency Form Is Available For This Template</li> 
              : <>
                  <div className="modal-body add_goalsbody">
                  <p className="text_heading">For John Smith</p>

                  {technicalCompetencyReview.map((data,index) => {

                  const details={
                    speed:data.rate
                  }
                  var names = 'ratingTechnicalCompetency'+index;
                  var ele1 = Math.random();
                  var ele2 = Math.random();
                  var ele3 = Math.random();
                  var ele4 = Math.random();
                  var ele5 = Math.random();



                  return( 
                    <div className="row form-group">
                      <div className="rating_label_wrp">
                        <label>{data.name}</label>
                        <div className="row_rating_wrp">

                        <div id="full-stars-example-two">
                              <div className="rating-group speed_rating"> 
                            
                              
                              <input disabled defaultChecked className="rating__input rating__input--none" name={names} id="rating3-none"  checked={(details.quality==0  ? true : false)} type="radio" />
                              <label aria-label="1 star" className="rating__label" htmlFor={ele1}>
                              <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                            
                              <input className="rating__input" name={names} id={ele1}  checked={(parseInt(data.rate)==1 ? true : false)} type="radio"   />
                              <label aria-label="2 stars" className="rating__label" htmlFor={ele2}>
                              <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                            
                              <input className="rating__input" name={names} id={ele2}  checked={(parseInt(data.rate)==2 ? true : false)} type="radio" 
                              />
                              <label aria-label="3 stars" className="rating__label" htmlFor={ele3}>
                              <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                            
                              <input className="rating__input" name={names} id={ele3}  checked={(parseInt(data.rate)==3 ? true : false)} type="radio" 
                              />
                              <label aria-label="4 stars" className="rating__label" htmlFor={ele4}>
                              <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                            
                              <input className="rating__input" name={names} id={ele4}  checked={(parseInt(data.rate)==4 ? true : false)} type="radio" 
                              />
                              <label aria-label="5 stars" className="rating__label" htmlFor={ele5}>
                              <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                            
                              <input className="rating__input" name={names} id={ele5}  checked={(parseInt(data.rate)==5 ? true : false)} type="radio"  
                            />
                            </div>
                          </div> 
                          <div id="full-stars-example-two"> 
                          </div>
                        </div>
                      </div> 
                        <textarea
                          id="text"
                          name="text"
                          className="form-control"
                          value={data.description}
                        
                        />
                      </div>
                    ) 
                    })
                    }
                  </div>
                </>
            }
          </li>
        </ul>
    </Modal.Body>
  </Modal>
  </div></>


 */