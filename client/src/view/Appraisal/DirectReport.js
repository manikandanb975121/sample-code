import React from "react";  
import {useDispatch,useSelector} from "react-redux"; 
import Norecordsfound from '../common/Norecordsfound';
import Pagination from '../common/Pagination';
const moment = require('moment');

  
export default function IndividualGoal(props) {
	const auth = useSelector(state=>state.auth);
  const token = auth.token;   

	return ( 
    <div className="goals_report_view">
        <table id="example2222" className="tablegoal" data-ordering="false" style={{width: '100%'}}>
        <thead>
          <tr>
            <th />
            <th style={{textAlign:"left"}}>Goal Name </th>
            <th style={{textAlign:"left"}}>Assigned to</th> 
            <th style={{textAlign:"left"}}>Due Date 
            {/* <span>
                <img className="up_selected" src="img/select_options.svg" /></span> */}
              {/* <img className="down_selected" src="img/select_options.svg" /> */}
              </th>
            <th style={{textAlign:"left"}}>Tactics</th>
          </tr>
        </thead>
        <tbody>
         
        {props.MyDirectReport?.map((res, index)=>{  
              var clName = "";
              var checked = false;
              if(res.goalId == props.selectedGoal && res.userId == props.selectedUser){
                clName = "selected";
                checked = true;
              }

                let explodedName = res.name.split(" ");
                var lastItem = explodedName?.pop();
                var selectedName = explodedName[0]?.charAt(0) + lastItem[0]?.charAt(0);

                var btnClassName = "";
                var hoverTitle = "";
                if(res.status==="Due"){
                  btnClassName = "due_bt";
                  hoverTitle = "Due";
                } else if(res.status==="Completed"){
                  btnClassName = "completed_bt";
                  hoverTitle = "Completed";
                } else {
                  btnClassName = "ongoing_yellow";
                  hoverTitle = "In Progress";
                } 

              return (  
                <tr className={clName}>
                <td>
                  <div className="table_checked_box clearfix">
                    <label className="table_container_checked ">
                      <input checked={checked} type="radio" name="myappr" id="cna_sec_1" data-role="none" defaultvalue="{1}/" onChange={props.AppraisalDetails.bind(this,res)}/>
                      <span className="table_checkmark" /> 
                    </label>
                  </div>
                </td>
                <td style={{textAlign:"left"}}>{res.goalName}</td>
                <td style={{textAlign:"left"}}><span className="table_tactic_name first_bg">{selectedName}</span>{res.name}</td> 
                <td style={{textAlign:"left"}}>{moment(res.endDate).format('MM/DD/YYYY')}</td>
                <td style={{textAlign:"left"}} title={hoverTitle}><button type="button" className={btnClassName}>{res.completed}/{res.total}</button></td>
              </tr>
              )
          })}  
        </tbody>
      </table>

      <div className="pagination_wrp">
        {(props.MyDirectReport.length > 0 ?
        <div className="pagination_wrp"> 
        <Pagination itemsPerPage={5} items={props.MyDirectReport} totalRecord={props.totalRecordsData} method={props.methods}/>
        </div>:<Norecordsfound message="Sorry No Records Found.."/>)
        }  
        </div>        
      </div>
    )}