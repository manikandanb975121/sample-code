import React, { useState, useEffect } from "react";  
import ReactPaginate from 'react-paginate';
import Norecordsfound from '../common/Norecordsfound';
import Pagination from '../common/Pagination';

const moment = require('moment');


// function PaginatedItems({ itemsPerPage, items, totalRecord, method}) { 
//   const [itemOffset, setItemOffset] = useState(0); 
//   const endOffset = itemOffset + itemsPerPage; 
//   const pageCount = Math.ceil(totalRecord / itemsPerPage); 
//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % totalRecord; 
//     setItemOffset(newOffset);
//     method(event.selected); 
//   }; 
//   return (
//     <> 
//       <ReactPaginate
//         nextLabel=">>"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={3}
//         marginPagesDisplayed={2}
//         pageCount={pageCount}
//         previousLabel="<<"
//         pageClassName="page-item"
//         pageLinkClassName="page-link"
//         previousClassName="page-item"
//         previousLinkClassName="page-link"
//         nextClassName="page-item"
//         nextLinkClassName="page-link"
//         breakLabel="..."
//         breakClassName="page-item"
//         breakLinkClassName="page-link"
//         containerClassName="pagination mygoalspages"
//         activeClassName="active"
//         renderOnZeroPageCount={null}
//       />
//     </>
//   );
// }




export default function Tacticview(props) { 
	return (   
          <div> 
                    <div className="goals_report_view"> 
                    <table id="example2222" className="tablegoal" data-ordering="false" style={{width: '100%'}}>
                      <thead>
                        <tr>
                        <th />
                        <th>Tactics</th>
                        <th>Goal Name</th> 
                        <th>Assigned to</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>

                  {(props.mytactic.length > 0 ? <>
                    {props.mytactic.map((e, index)=>{ 
                  
                  if(e.status==="Ongoing"){
                      var className = "ongoing_yellow";
                    }
                    if(e.status==="Due" || e.status==="Overdue" || e.status==="Rejected"){
                      var className = "due_bt";
                    }
                    if(e.status==="Completed"){
                      var className = "completed_bt";
                    }
                    if(e.status==="Created"){ 
                      var className = "created_bt";
                    }

                    
                    const matched = props.tacticIdSelected.find(element => element == e.id);

                    return (  
                      <tr key={index} className={(matched > 0 ? 'selected' : '')}> 
                          <td>
                            <div className="table_checked_box clearfix">
                              <label className="table_container_checked ">
                                <input type="checkbox" name={"name_"+e.id} onChange={props.selectTacticSelected.bind(this,e.id)} id="cna_sec_1" data-role="none" defaultvalue="{1}/" />
                                <span className="table_checkmark" /> 
                              </label>
                            </div>
                          </td>
                          <td>{e.name}</td>
                          <td>{e.goalName}</td>
                          <td>{e.userName}</td> 
                          <td>{moment(e.endDate).format('MM/DD/YYYY')}</td>
                          <td><button type="button" className={className}>{e.status}</button></td>
                        </tr> 
                      )
                      })}  
                  </> : '')}

                  


                      </tbody>
                    </table>
                  </div>



    {(props.mytactic.length > 0 ?
      <div className="pagination_wrp">
       {/* <PaginatedItems itemsPerPage={1} items={props.mytactic} totalRecord={props.totalTactic} method={props.fetchTactic}/>  */}
       <Pagination itemsPerPage={5} items={props.mytactic} totalRecord={props.totalTactic} method={props.fetchTactic}/>
    </div>:<Norecordsfound message="Sorry No Records Found.."/>)} 
  </div> 
	)
}