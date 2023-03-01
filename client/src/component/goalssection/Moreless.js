import React from 'react'

import {useSelector,useDispatch} from "react-redux";


export default function DashboardCard() {

  const auth = useSelector(state=>state.auth);
  const couponData = useSelector(state=>state?.category?.coupon)
  const dispatch = useDispatch();

	return (

        <div className="Goals-filter-and-list-container ">
            
        </div>
		
	)
}