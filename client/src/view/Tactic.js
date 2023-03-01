import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import TextFields from "./control/TextFields";
import TextArea from "./control/TextArea";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

 
export default function Tactic(props) {  
  let tacticName = "tactic_"+props.index;
  let descriptionName = "description_"+props.index;
  let frequency = "frequency_"+props.index;
  let startDate = "startDate_"+props.index;
  let endDate = "endDate_"+props.index; 
  let assignee = "assignee_"+props.index; 


	return (
		<div className="tactic-section"> 
                      <div className="row form-group">
                        <label>Tactic {props.index}</label> 
                        <TextFields type="text" class="form-control" name={tacticName} placeholder="Add Tactic" onchange={props.onchange}/>
                      </div>

                      <div className="row form-group">
                        <label>Description</label> 
                        <TextFields type="text" class="form-control" name={descriptionName} placeholder="Add Description" onchange={props.onchange}/>
                      </div>

                      <div className="row form-group">
                      <div className="row">
                      <div className="col-md-4"> 
                      <DatePicker 
                      className="startDates"
                      placeholderText="Start Date"  
                      onChange={(date) => props.onchangedate(date, startDate)}
                      minTime={new Date()}
                      maxTime={new Date()}
                      minDate={new Date()}
                      dateFormat="d-MM-yyyy" 
                      selected={props.startDate}
                      /> 
                      </div>

                      <div className="col-md-4"> 
                      <DatePicker 
                      className="startDates"
                      placeholderText="Start Date"  
                      onChange={(date) => props.onchangeenddate(date, endDate)}
                      minTime={new Date()}
                      maxTime={new Date()}
                      minDate={new Date()}
                      dateFormat="d-MM-yyyy" 
                      selected={props.endDate}
                      />
                      </div> 
                      <div className="col-md-4"> 
                      <div class="repeats_addgolas_wrp">
                      <select class="form-control repeats_addgolas_control" name={frequency}  onChange={props.onchange}>
                      <option selected value="">Repeats</option>
                      <option value="monthly">Monthly</option>
                      <option value="weekly">Weekly</option>
                      <option value="daily">Daily</option>
                      </select> 
                      </div>
                      </div> 
                      </div> 
                      </div> 


                      <div className="row form-group labelname">
                      <label>Assign to</label>
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
                        props.AssigneeChange(assignee,newValue);
                      }} 
                      onInputChange={(event, newInputValue) => { 
                         props.searchUsers(newInputValue);
                      }} 

                      options={props.userList} 
                      renderInput={(params) => <TextField {...params} className="form-control dropdowns" />}
                      /> 
                      </div>

                    
		    </div>
	)
}