import React from 'react'  
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function Loader(props) { 
	return ( 
        <Backdrop
        sx={{ color: '#fff',blur:"5px", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.loading} 
        invisible={false}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
	)
}