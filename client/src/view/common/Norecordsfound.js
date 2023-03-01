import React from 'react'   

export default function Norecordsfound(props) { 
	return ( 
         <center><p className='norecordsfound' style={{marginTop:"17px"}}>{props.message}</p></center>
	)
}