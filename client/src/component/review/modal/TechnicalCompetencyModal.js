import React, { useEffect } from "react";
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StarRating from "../StarRating";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@mui/material/IconButton';
import ReviewBox from "../components/ReviewBox";
import Button from '@mui/material/Button';


export default function TechnicalCompetencyModal({ show, onClose, onSubmit, handleChangeRateInTechnicalCompetency, handleChangeDescriptionInTechnicalComeptency, technicalCompetencyReview,setIsTechnicalCompetencyReviewSubmited }) {

  return <>
  <div>
    {
      show && <Modal size="lg" show={show} >
      <Modal.Header>
        <Modal.Title>
          <div style={{ display: "flex", justifyContent: 'space-between'}}>
            <div>
              <h6 style={{ letterSpacing: '3px', paddingTop: '10px'}}>Core Competency Form - For <b>JOHN SMITH</b></h6>
            </div>
          </div>
        </Modal.Title>
        <IconButton onClick={onClose} color="primary"  component="label">
          <CloseIcon />
        </IconButton>
      </Modal.Header>
      <Modal.Body>
      <div>
        { technicalCompetencyReview.length ===0 
          ? <li class="list-group-item" >No Competency Form Is Available For This Template</li> 
          : 
          <div>
            <div style={{ display: 'flex', justifyContent: 'end', paddingRight: '10px'}}>
              <Button 
                onClick={()=>{
                setIsTechnicalCompetencyReviewSubmited(true);
                onSubmit()}} 
                variant="outlined"
              >Save Changes</Button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '10px'}}>
              {
                technicalCompetencyReview.map((data, index) => (
                  <ReviewBox title={data.name} index={index} rating={data.rate} compitancyId={data.core_competency_id} onChange={handleChangeDescriptionInTechnicalComeptency} rateChangeHandler={handleChangeRateInTechnicalCompetency}/>
                ))
              }
            </div> 
          </div>
        }
        </div>
      </Modal.Body>
    </Modal>
    }
  </div>
</>
}


/**
 Existing Code
 return <>
<div>
    <Modal show={show} >
      <Modal.Header>
        <Modal.Title>Core Competency Form</Modal.Title>
        <button type="button" onClick={onClose}><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
      </Modal.Header>
      <Modal.Body>
        {technicalCompetencyReview.length === 0 ? <li class="list-group-item" >No Competency Form Is Available For This Template</li> : <>
          <div className="modal-body add_goalsbody">
            <p className="text_heading">For John Smith</p>
            {
              technicalCompetencyReview.map((data,index) => {
                const details={
                  speed:data.rate
                }
                var names = 'rating'+index;
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
                          
                            
                            <label aria-label="1 star" className="rating__label" htmlFor={ele1}>
                            <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                            <input className="rating__input" name={names} id={ele1}  checked={(data.rate==1 ? true : false)} type="radio"   onChange={handleChangeRateInTechnicalCompetency.bind(this,data.technical_competency_id, 1)} />
                            <label aria-label="2 stars" className="rating__label" htmlFor={ele2}>
                            <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                            <input className="rating__input" name={names} id={ele2}  checked={(data.rate==2 ? true : false)} type="radio" onChange={handleChangeRateInTechnicalCompetency.bind(this,data.technical_competency_id, 2)}
                            />
                            <label aria-label="3 stars" className="rating__label" htmlFor={ele3}>
                            <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                            <input className="rating__input" name={names} id={ele3}  checked={(data.rate==3 ? true : false)} type="radio" onChange={handleChangeRateInTechnicalCompetency.bind(this,data.technical_competency_id, 3)}
                            />
                            <label aria-label="4 stars" className="rating__label" htmlFor={ele4}>
                            <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                            <input className="rating__input" name={names} id={ele4}  checked={(data.rate==4 ? true : false)} type="radio" onChange={handleChangeRateInTechnicalCompetency.bind(this,data.technical_competency_id, 4)}
                            />
                            <label aria-label="5 stars" className="rating__label" htmlFor={ele5}>
                            <svg className="svg-inline--fa fa-star fa-w-18 rating__icon rating__icon--star" aria-hidden="true" data-prefix="fa" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg></label>
                            <input className="rating__input" name={names} id={ele5}  checked={(data.rate==5 ? true : false)} type="radio"  onChange={handleChangeRateInTechnicalCompetency.bind(this,data.technical_competency_id, 5)}
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
                                    onChange={(event) => { handleChangeDescriptionInTechnicalComeptency(data.technical_competency_id, event.target.value) }}
                                  />
                                </div>
                )
              })
            }

            <div class="row form-group">
              <button type="button" class="add_goals_bt core_review" onClick={() => {
                setIsTechnicalCompetencyReviewSubmited(true);
                onSubmit()
              }}>Save Changes</button>
            </div>
          </div>
        </>
        }
      </Modal.Body>
    </Modal>
  </div>
</>
  
 */