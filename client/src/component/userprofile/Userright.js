import React from 'react'

import {useSelector,useDispatch} from "react-redux";


export default function DashboardCard() {

  const auth = useSelector(state=>state.auth);
  const couponData = useSelector(state=>state?.category?.coupon)
  const dispatch = useDispatch();

	return (

        <div className="PagePanel Reminders accent-color">
        <h2 className="PagePanel-heading">Current Responsibilities</h2>
        <div id="ember67" className="liquid-container ember-view">
            <div id="ember149" className="liquid-child ember-view">
            <h3 className="PagePanel-subheading">No responsibilities yet</h3>
            
            
            </div>
        </div>
        
        </div>

		
	)
}











