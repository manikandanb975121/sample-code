import "./App.css";

import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./view/Dashboard";
import Login from "./view/Login";
import Organization from "./view/Organization";
import Goals from "./view/Goals";
import Userprofile from "./view/Userprofile";
import Strategy from "./view/Strategy";
import Forgotpassword from "./view/Forgotpassword";
import Mygoal from "./view/Mygoal";
import Appraisal from "./view/Appraisal";
import OrgChart from "@balkangraph/orgchart.js";
import Chart from "./view/Chart";
// import Chart from "./orgTree"
import Reports from "./view/Reports/Predictionmatrix";
import Profile from "./view/Profile/Profile";
import ResetPassword from "./view/resetpassword";
import Goaledit from "./view/Goalsview/Goaledit";
import PerformanceReport from "./view/PerformanceReport/index";
import ReviewPage from "./view/review";
import Admin from "./view/Admin";
import Sidebar from "./view/common/Sidebar";
import Header from "./view/common/Header";
import AdminOrganization from "./view/AdminOrganization";
import AdminDepartments from "./view/AdminDepartments";
import CustomisableReports from "./view/Reports/CustomisableReports";
import Analytics from "./view/Reports/Analytics";
import { AdminStrategy } from "./view/AdminStrategy";
import AdminReview from "./view/AdminReview";

export default function App() {
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const location = useLocation();
    const [isHideBar, setisHideBar] = useState(false);
    const [hide, setHide] = useState(false);
    useEffect(() => {
      if (auth?.user?.role === 'org') {
        setHide(true);
      }
      if(auth.token === null){ 
        if(location.pathname!='/reset-password'){
        navigate("/");
        }
      }
    }, [auth]) 
    
  return (
    <div className='App'> 
      <div className="wrapper">
        { auth.token !== null && location.pathname !== '/' && <Sidebar /> }
          <div id="content">
           { auth.token !== null && location.pathname !== '/' && <Header />} 
            <Routes>
              <Route path="/" element={<Login/>}/> 
              {/* <Route path="/reg" element={<Reg/>}/> */}
              {/* <Route path="/dashboard" element={<AdminRouter redirectTo="/"><Dashboard/></AdminRouter>}/>
              <Route path="/organization" element={<AdminRouter redirectTo="/"><Organization/></AdminRouter>}/> */}  
              <Route path="/organization" element={<Organization/>}/>
              <Route path="/goals" element={<Goals/>}/>
              <Route path="/userprofile" element={<Userprofile/>}/> 
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/admin/users" element={<Admin/>}/>
              {/* {!hide && <Route path="/admin/organizations" element={<AdminOrganization/>}/>} */}
              <Route path="/admin/organizations" element={<AdminOrganization/>} />
              <Route path="/admin/departments" element={<AdminDepartments/>}/>
              <Route path="/admin/strategy" element={<AdminStrategy/>}/>
              <Route path="/admin/review" element={<AdminReview />}/>
              <Route path="/forgot-password" element={<Forgotpassword/>}/>
              <Route path="/my-goal" element={<Mygoal/>}/>
              <Route path="/appraisal" element={<Appraisal/>}/>
              <Route path="/org-chart" element={<Chart/>}/>
              <Route path="/report/prediction-matrix" element={<Reports/>}/>
              <Route path="/strategy" element={<Strategy/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/reset-password" element={<ResetPassword/>}/>
              <Route path="/my-goal-edit/:id" element={<Goaledit/>}/>
              <Route path="/performance-report/:id" element={<PerformanceReport/>}/>
              <Route path="review" element={<ReviewPage/>}/>
              <Route path="/report/analytics" element={<Analytics />}/>
              <Route path="/report/customisable-reports" element={<CustomisableReports />} />
            </Routes>
          </div>
      </div>
    </div>
  )
}
