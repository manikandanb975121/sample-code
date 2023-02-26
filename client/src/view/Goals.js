import React from 'react'
import {useDispatch,useSelector} from "react-redux";
import Goals from '../component/Goalscomponent';

import "../App.css";
import Layout from "../layout";

export default function DashboardPage() {
	const auth = useSelector(state=>state.auth);
	return (
		// <div className='App'>
			<Layout>
				<Goals />
			</Layout>
		// </div>
	)
}