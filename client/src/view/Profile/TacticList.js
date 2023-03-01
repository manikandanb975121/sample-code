import React, { useState, useEffect } from "react"; 
import {useDispatch,useSelector} from "react-redux";    

  
export default function TacticList(props) {
	const auth = useSelector(state=>state.auth);
    const token = auth.token;   
	return (  
        <div className="tactic_wrp_new_wrapper">
        <ul className="clearfix"> 
            {props.tacticList?.map((e, index)=>{   
                var checked = false;
                if(e.status=="Completed"){
                  checked = true;
                }
              return(
                    <li>
                        {/* <div className="terms_condition_wrap">
                            <div className="checked_box clearfix">
                            <label className="container_checked">
                                <input checked={false} type="checkbox" name="precautions[]" id="precautions_5" defaultValue={1} data-role="none" />
                                <span className="checkmark"><span className="check_tactics_status">{e.name} </span></span> </label>
                            </div>
                        </div> */}
                        <div className="tactic_wrp_new" key={Math.random()}> 
                        <div className="form-group">
                        <input type="checkbox" id="html1" checked={checked}/>
                        <label htmlFor="html1">{e.name} </label>
                        </div>
                        </div> 
                        </li>
              )  
            })} 
        </ul>
        </div>
	)
}