import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import "../App.css";
import PredictionmatrixGraph from "./Reports/PredictionmatrixGraph"; 
import Norecordsfound from './common/Norecordsfound';
import CircularProgress from './common/CircularProgress';
import { GET, PATCH } from '../helper/service';
import Loader from './common/Loader';
import Progressbar from './common/Progressbar';
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate'; 
import { environment } from "../configs/environment";
const moment = require('moment');



function PaginatedItems({ itemsPerPage, totalRecord, method }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(totalRecord / itemsPerPage);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % totalRecord;
        setItemOffset(newOffset);
        method(event.selected + 1);
    };
    

 
    return (
        <>
            <ReactPaginate
                nextLabel=">>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="<<"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination mygoalspages"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </>
    );
}




export default function Dashboard() {
    const auth = useSelector(state => state.auth);
    const token = auth.token;
    const [dashboardData, setDashboardData] = useState([]);
    const [ReportData, setReportData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [toalUsers, setToalUsers] = useState(0);
    const [graphData, setGraphData] = useState([])

    const per_page = 4;

    useEffect(() => {
        fetchDashboardGoal();
        fetchDirectReport(page, per_page, searchText);
        getPredectionList();
    }, []);

    useEffect(() => {
        if (searchText === "") {
            fetchDirectReport(page, per_page, searchText);
        }
    }, [searchText]);


    const fetchDashboardGoal = (e) => {
        setLoader(true);
        const url = environment.baseAPIUrl + '/goals-tactics/dashboard';
        GET(url, token).then(response => {
            setDashboardData(response.result);
            setLoader(false);
        })
    }

    const fetchDirectReport = (page, per_page, searchText) => {
        setLoader(true);
        const url = environment.baseAPIUrl + "/org_employee_relations/employee_under_supervisor/search?searchParameter=" + searchText + "&limit=" + per_page + "&page=" + page;
        GET(url, token).then(response => {
            setToalUsers(response.count);
            setReportData(response.data);
            setLoader(false);
        })
    }

    
    const changeStatusDummy = () => {}

    const changeStatus = (id, status, progress) => {
        setLoader(true);
        const data = {
            "status": 1,
            "progress": status === "Completed" ? 0 : 100,
        }
        const url = environment.baseAPIUrl + '/tactics/status/update/' + id;
        PATCH(url, data, token).then(response => {
            fetchDashboardGoal();
            setLoader(false);
        })
    }


    const paginationMethod = (selectedPage) => {
        setPage(selectedPage);
        fetchDirectReport(selectedPage, per_page, searchText);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetchDirectReport(1, per_page, searchText);
        }
    }
    const handleSearchKey = (event) => { 
            fetchDirectReport(1, per_page, searchText); 
    }

    const getPredectionList = (e) => {
        setLoader(true); 
        const url = environment.baseAPIUrl + '/appraisal/prediction/list';
        GET(url,token).then(data => {  
          var obj = [];
          data.result.forEach(e => {
              var r = function () { return Math.floor(Math.random()*256) };
              var colors =  "rgb(" + r() + "," + r() + "," + r() + ")"; 
              obj.push({x:e.speed,y:e.quality,z:150,color:colors,percentage:e.goalName})
          });
          setGraphData(obj); 
        })    
      }
 



    return (
        <div className='wrapper'>
            <div id="content">
                <Loader loading={loader} />
                <div className="dashboard_main">
                    <div className="row">
                        <div className="col-md-8 pd_right_0">
                            <div className="main_inner_section">
                                <div className="reminders_haeder">
                                    <h4>Reminders</h4>
                                    <p>Check your daily tasks and schedules</p>
                                    <button onClick={fetchDashboardGoal} type="button" className="refreshbt"> <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                        <path d="M15.4631 9.60713C15.4631 9.64062 15.4598 9.66405 15.4531 9.67745C15.0245 11.4721 14.1272 12.9269 12.7611 14.0418C11.395 15.1568 9.79457 15.7143 7.95975 15.7143C6.98207 15.7143 6.0362 15.5301 5.12214 15.1618C4.20808 14.7935 3.39279 14.2678 2.67627 13.5848L1.38051 14.8806C1.25328 15.0078 1.10261 15.0714 0.928502 15.0714C0.754395 15.0714 0.603725 15.0078 0.476493 14.8806C0.349261 14.7533 0.285645 14.6027 0.285645 14.4286V9.92856C0.285645 9.75446 0.349261 9.60379 0.476493 9.47655C0.603725 9.34932 0.754395 9.28571 0.928502 9.28571H5.4285C5.60261 9.28571 5.75328 9.34932 5.88051 9.47655C6.00774 9.60379 6.07136 9.75446 6.07136 9.92856C6.07136 10.1027 6.00774 10.2533 5.88051 10.3806L4.50439 11.7567C4.97984 12.1987 5.5189 12.5402 6.12158 12.7812C6.72426 13.0223 7.35038 13.1428 7.99993 13.1428C8.89725 13.1428 9.73431 12.9252 10.5111 12.4899C11.2879 12.0547 11.9106 11.4553 12.3794 10.692C12.4531 10.5781 12.6305 10.1864 12.9118 9.51673C12.9653 9.36271 13.0658 9.28571 13.2131 9.28571H15.1417C15.2287 9.28571 15.3041 9.31751 15.3677 9.38113C15.4313 9.44475 15.4631 9.52008 15.4631 9.60713ZM15.7142 1.57142V6.07142C15.7142 6.24553 15.6506 6.3962 15.5234 6.52343C15.3961 6.65066 15.2455 6.71428 15.0714 6.71428H10.5714C10.3973 6.71428 10.2466 6.65066 10.1193 6.52343C9.99212 6.3962 9.9285 6.24553 9.9285 6.07142C9.9285 5.89731 9.99212 5.74664 10.1193 5.61941L11.5055 4.23325C10.5144 3.31584 9.34591 2.85713 7.99993 2.85713C7.10261 2.85713 6.26556 3.07477 5.48877 3.51004C4.71198 3.9453 4.08922 4.54463 3.62047 5.30803C3.54681 5.42187 3.36935 5.81361 3.0881 6.48325C3.03453 6.63727 2.93408 6.71428 2.78676 6.71428H0.787877C0.700823 6.71428 0.625488 6.68247 0.561872 6.61885C0.498256 6.55524 0.466448 6.4799 0.466448 6.39285V6.32254C0.901716 4.52789 1.80573 3.07309 3.1785 1.95814C4.55127 0.843183 6.15841 0.285706 7.99993 0.285706C8.97761 0.285706 9.9285 0.471531 10.8526 0.843183C11.7767 1.21484 12.597 1.73883 13.3135 2.41517L14.6193 1.11941C14.7466 0.992179 14.8973 0.928563 15.0714 0.928563C15.2455 0.928563 15.3961 0.992179 15.5234 1.11941C15.6506 1.24664 15.7142 1.39731 15.7142 1.57142Z" fill="#717171" />
                                    </svg>
                                    </span>Refresh</button>
                                </div>
                                <div className="reminder_section">
                                    {(dashboardData?.reminders?.length > 0 ? <>
                                        {dashboardData?.reminders.map((res, index) => {
                                            var stts = "";
                                            if (res.status === "Completed") {
                                                stts = "checked";
                                            }
                                            let editPath = "/my-goal-edit/" + res.goalId;
                                            return (
                                                <>
                                                {(res.type=="tactic" ? <>
                                                <label className="containerremindercheck">
                                                    <input type="checkbox" defaultChecked={stts} />   
                                                    <span className="checkmark">  
                                                       <Link to={editPath}>
                                                        <span className="editTactic"><i className="fa fa-edit"></i></span>
                                                        </Link>  

                                                        <div className="reminder_box" onClick={changeStatus.bind(this, res.id, res.status, res.progress)}>

                                                            <div className="date_reminder">
                                                                <div className="left_section">
                                                                    <h5>Start Date<span> {moment(res.startDate).format('DD MMM YYYY')}</span></h5>
                                                                </div>
                                                                <div className="right_section">
                                                                    <h5>End Date<span> {moment(res.endDate).format('DD MMM YYYY')}</span></h5>
                                                                </div>
                                                            </div>
                                                            <div className="reminder_content">
                                                                <h2>{res.name}</h2>
                                                                <p>{res.description}</p>
                                                            </div>
                                                        </div>
                                                    </span>
                                                </label>
                                                </> : <>
                                                <div className="containerreminderwithoutcheck"> 
                                                    <Link to="/appraisal"> 
                                                    <div className="reminder_box1" style={{height:"180px"}}>
                                                    <div className="date_reminder">
                                                    <div className="left_section">
                                                    <h5>Start Date<span> {moment(res.startDate).format('DD MMM YYYY')}</span></h5>
                                                    </div>
                                                    <div className="right_section">
                                                    <h5>End Date<span> {moment(res.endDate).format('DD MMM YYYY')}</span></h5>
                                                    </div>
                                                    </div>
                                                    <div className="reminder_content">
                                                    <h2>{res.name}</h2>
                                                    <p>{res.description}</p>
                                                    </div> 
                                                    </div>
                                                    </Link>
                                                </div>
                                                </>)} 
                                            </>
                                            )
                                        }
                                        )}
                                    </> : '')}
                                </div>
                                {(dashboardData?.reminders?.length > 0 ? '' : <Norecordsfound message="No Reminders..." />)}
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="main_inner_section height_prediction">
                                        <div className="reminders_haeder">
                                            <h4>Prediction Matrix</h4>
                                            <div className="prediction_matrix">
                                                {/* <img src="img/prediction_img.png" /> */}
                                                {/* <HighchartsReact containerProps={{ style: { height: "50%" } }} highcharts={Highcharts} options={getOptions('bubble')} />  */}
                                                <PredictionmatrixGraph data={graphData}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="main_inner_section height_analytics">
                                        <div className="reminders_haeder">
                                            <h4>Analytics</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="main_inner_section">
                                <div className="reminders_haeder">
                                    <h4>My Goals</h4>
                                </div> 
                                <Progressbar color="#52C249" title="Company Goals" completedGoal={(dashboardData?.completedCompanyGoal ? dashboardData?.completedCompanyGoal : 0)} totalGoal={(dashboardData?.totalCompanyGoal ? dashboardData?.totalCompanyGoal : 0)} value={(dashboardData?.companyGoalsPercent ? dashboardData?.companyGoalsPercent : 0)} />
                                <Progressbar color="#52C249" title="Team Goals" completedGoal={(dashboardData?.completedGoalTeam ? dashboardData?.completedGoalTeam : 0)} totalGoal={(dashboardData?.totalGoalTeam ? dashboardData?.totalGoalTeam : 0)} value={(dashboardData?.teamGoalsPercent ? dashboardData?.teamGoalsPercent : 0)} />
                                <Progressbar color="#52C249" title="Individual Goals" completedGoal={(dashboardData?.completedGoalIndividual ? dashboardData?.completedGoalIndividual : 0)} totalGoal={(dashboardData?.totalGoalIndividual ? dashboardData?.totalGoalIndividual : 0)} value={(dashboardData?.todayGoalsPercent ? dashboardData?.todayGoalsPercent : 0)} />
                                <Progressbar color="#52C249" title="Personal Goals" completedGoal={(dashboardData?.completedGoalPersonal ? dashboardData?.completedGoalPersonal : 0)} totalGoal={(dashboardData?.totalGoalPersonal ? dashboardData?.totalGoalPersonal : 0)} value={(dashboardData?.personalGoalsPercent ? dashboardData?.personalGoalsPercent : 0)} />
                            </div>
                            <div className="direct_reports__section">
                                <div className="reminders_haeder direct_reports__head">
                                    <h4>Direct Reports</h4>
                                </div>
                                <div className="direct_reports">
                                    <div className="direct_reports_search">
                                        <div className="searchbaar_wrp">
                                            <div className="searchbaar_inner_wrp">
                                                <div className="right_section">
                                                    <div className="searchbaarinput">
                                                        <input type="text" name="searchkey" placeholder="Search" onChange={(e) => { setSearchText(e.target.value) }} onKeyPress={handleKeyPress} />
                                                        <button onClick={handleSearchKey} type="button"><svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 17 17" fill="none">
                                                            <path d="M15.75 15.75L12.3855 12.3795M14.25 7.875C14.25 9.56576 13.5784 11.1873 12.3828 12.3828C11.1873 13.5784 9.56576 14.25 7.875 14.25C6.18424 14.25 4.56274 13.5784 3.36719 12.3828C2.17165 11.1873 1.5 9.56576 1.5 7.875C1.5 6.18424 2.17165 4.56274 3.36719 3.36719C4.56274 2.17165 6.18424 1.5 7.875 1.5C9.56576 1.5 11.1873 2.17165 12.3828 3.36719C13.5784 4.56274 14.25 6.18424 14.25 7.875V7.875Z" stroke="#717171" strokeWidth={2} strokeLinecap="round" />
                                                        </svg></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 

                                    {ReportData?.map((res, index) => {  
                                        return (
                                            <div className="direct_reports_wrp">
                                                <div className="direct_reports_left">
                                                    <div className="reports_asign">
                                                        <img
                                                            src={res.profileImage ?? "img/report_direct.png"}
                                                            onError="this.src='img/report_direct.png';"
                                                        />
                                                    </div>
                                                    <span>{res.name}</span>
                                                </div>
                                                <div className="direct_reports_right">
                                                    <div className="reports_goals">
                                                        <div className="set-size charts-container">

                                                        <CircularProgress 
                                                        width="40" 
                                                        percentage={res.progress} 
                                                        pathColor="#52C249" 
                                                        textColor='#000' 
                                                        trailColor='#fde9c1' 
                                                        backgroundColor='#3e98c7'
                                                        />  
                                                        
                                                        </div>
                                                        <Link to={"/performance-report/" + res.id}>
                                                            <div className="reports_downloads">
                                                                <button><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                    <path d="M11 15H13V9H16L12 4L8 9H11V15Z" fill="#009FDF" />
                                                                    <path d="M20 18H4V11H2V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V11H20V18Z" fill="#009FDF" />
                                                                </svg></button>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    } 
                                    {(ReportData?.length > 0 ?
                                        <div className="pagination_wrp">
                                            <PaginatedItems itemsPerPage={4} totalRecord={toalUsers} method={paginationMethod} />
                                        </div> : <Norecordsfound message="Sorry No Records Found.." />)}  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}