import React from 'react'

import {useSelector,useDispatch} from "react-redux";

import "../App.css";

import Goalheader from "../component/goalssection/Goalheader";
import Goalleft from "../component/goalssection/Goalleft";
import Goalright from "../component/goalssection/Goalright";


export default function DashboardCard() {

  const auth = useSelector(state=>state.auth);
  const couponData = useSelector(state=>state?.category?.coupon)
  const dispatch = useDispatch();

	return (
		
    <div className='goals row'>
        <div className='col-sm-12 goalmain'>
            <Goalheader />
        </div>
        <div className='col-sm-12 goalbody'>
            <div className='col-sm-4 goalleft'>
                <Goalleft />
                
            </div>
            <div className='col-sm-8 dashboardright goalright'>
                <Goalright />
            </div>
        </div>
    </div>
				
		
	)
}