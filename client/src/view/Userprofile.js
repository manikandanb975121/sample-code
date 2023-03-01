import React from 'react'
import {useDispatch,useSelector} from "react-redux";
import Userprofilecomponent from '../component/Userprofilecomponent';

import "../App.css";
import Layout from "../layout";

export default function Userprofile() {
	const auth = useSelector(state=>state.auth);
	return (
		// <div className='App'>
			<Layout>
				<Userprofilecomponent />
			</Layout>
		// </div>
	)
}