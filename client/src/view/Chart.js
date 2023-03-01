import React from 'react'
import {useDispatch,useSelector} from "react-redux";
import Dashboard from '../component/DashboardCard';

import "../App.css";
import OrgChart from "../orgTree";
import Layout from "../layout";
import Header from './common/Header';
import Footer from './common/Footer';
import Sidebar from './common/Sidebar';
import OrgChart1 from '../component/orgChart/index';

export default function Chart() {
	const auth = useSelector(state=>state.auth);
	return (
		<div className='wrapper'> 
        <div id="content">
         <OrgChart1/>
		</div>
        </div>
	)
}