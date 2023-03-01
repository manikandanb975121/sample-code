import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";

const VendorRouter =({ children, redirectTo }) => { 
     const auth = useSelector(state=>state.auth); 
     const token = window.localStorage.getItem('token');
     return (auth?.user?.role==="Vendor") ? children : <Navigate to={redirectTo} /> ;
} 

export default VendorRouter;