import React from 'react'    
import {NavLink,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux"; 
import { useLocation } from 'react-router-dom';

export default function Header() { 
  const auth = useSelector(state=>state.auth); 
  const dispatch = useDispatch();   
  
  console.log("auth ===== ", auth);
  
  let userdata = auth.user; 
  const navigate = useNavigate();
  if(auth.token === null){
    navigate('/');  
  }
  const location = useLocation(); 
  const path = location.pathname.split('/');
  const paths = path[1]; 
  const path2 = path[2];

  var pageName = "";
  if(paths=="my-goal"){ pageName = "My Goals"; }
  if(paths=="dashboard"){ pageName = "Dashboard"; }
  if(paths=="appraisal"){ pageName = "Appraisal"; }
  if(paths=="org-chart"){ pageName = "Org Chart"; }
  if(paths=="report"){ pageName = "Report"; }
  if(paths=="strategy"){ pageName = "Strategy"; }
  if(paths=="profile"){ pageName = "Profile"; }
  if(paths=="performance-report"){ pageName = "Performance Report"; }
  if(paths=="my-goal-edit"){ pageName = "Update Goal"; }
  if(paths=="review"){ pageName = "Review"; }

  if(paths=="report" && path2=="customisable-reports"){
    pageName = "Reports > Customisable Reports";
  }
  if(paths=="report" && path2=="analytics"){
    pageName = "Reports > Analytics";
  }
  
	return (
		<nav className="navbar dashboardheader navbar-expand-lg navbar-light">
        <div className="container-fluid pd_0">
          <button type="button" id="sidebarCollapse">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
              <rect x={3} y={3} width={9} height={4} fill="#5A5A5A" />
              <rect x={3} y={10} width={18} height={4} fill="#5A5A5A" />
              <rect x={12} y={17} width={9} height={4} fill="#5A5A5A" />
            </svg>
          </button>
          <h5 className="dashboardhead">{pageName}</h5>
          <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fas fa-align-justify" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link usersetting" href="#"><svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26" fill="none">
                    <path d="M21.7516 6.45937L22.9438 5.26719L20.7344 3.05625L19.5422 4.24844C18.1109 3.17812 16.4141 2.45156 14.5625 2.1875V0.5H11.4375V2.1875C9.58594 2.45313 7.88906 3.17813 6.45937 4.25L5.26562 3.05625L3.05625 5.26562L4.24844 6.45781C3.17812 7.88906 2.45156 9.58594 2.1875 11.4375H0.5V14.5625H2.1875C2.45313 16.4141 3.17813 18.1109 4.25 19.5406L3.05625 20.7344L5.26562 22.9438L6.45781 21.7516C7.8875 22.8219 9.58594 23.5484 11.4359 23.8141V25.5H14.5609V23.8125C16.4125 23.5469 18.1094 22.8219 19.5391 21.75L20.7313 22.9422L22.9406 20.7328L21.7484 19.5406C22.8188 18.1109 23.5453 16.4125 23.8109 14.5625H25.5V11.4375H23.8125C23.5484 9.58594 22.8219 7.88906 21.7516 6.45937ZM13 17.6875C10.4109 17.6875 8.3125 15.5891 8.3125 13C8.3125 10.4109 10.4109 8.3125 13 8.3125C15.5891 8.3125 17.6875 10.4109 17.6875 13C17.6875 15.5891 15.5891 17.6875 13 17.6875Z" fill="#5A5A5A" />
                  </svg></a>
              </li>
              <li className="nav-item"> 
                <NavLink to="/profile" className="nav-link userprofile">
                  <span className="userprofilepic"><img src="/img/userprofile.png" /></span>{userdata?.name} 
                  </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
	)
}