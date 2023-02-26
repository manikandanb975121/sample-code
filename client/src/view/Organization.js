import React from 'react'
import {useDispatch,useSelector} from "react-redux";

import "../App.css";
import OrgChart from "../orgTree";
import Layout from "../layout";

export default function OrganizationChart() {
	const auth = useSelector(state=>state.auth);
	return (
		<div className='dashboard'>
			<Layout>
				<OrgChart />
			</Layout>
		</div>
	)
}