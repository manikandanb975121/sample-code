import React, {useState} from "react";

export default function UserTable({ userData ,selectedRow,setSelectedRow}) {

  // const [selectedRow, setSelectedRow] = useState({id:0,name:"",team:""});
  return <>
    <div className="goals_report_view">
      <table id="example2222" className="tablegoal" data-ordering="false" style={{ width: '100%' }}>

        <thead>
          <tr>
            <th />

            <th>Name</th>
            <th>Department <span><img className="up_selected" src="img/select_options.svg" /></span>
              <img className="down_selected" src="img/select_options.svg" /></th>

          </tr>
        </thead>

        <tbody> 

          {userData.map((data) => <tr className={(selectedRow.id === data.id ? 'selected' : '')}>

            <td>

              <div className="table_checked_box clearfix">
                <label className="table_container_checked ">


                  {/* <input type="checkbox" name="item[]" id="cna_sec_1" data-role="none" defaultvalue="{1}/" /> */}
                  <input
                    id="cna_sec_1"
                    type="radio"
                    name="row-select"
                    value={data.id}
                    checked={selectedRow.id === data.id}
                    onChange={()=>{console.log("selected user = ",data)
                    setSelectedRow(data)
                  }}
                  />

                  <span className="table_checkmark" />
                </label>
              </div>

            </td>

            <td>{data.name}</td>
            <td>Marketing</td>

          </tr>)}


        </tbody>
      </table>
    </div>
  </>
}