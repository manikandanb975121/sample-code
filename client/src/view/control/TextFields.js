import React from 'react' 
import { useForm } from "react-hook-form";

export default function TextFields(props) {  
	const { register, handleSubmit, formState: { errors } } = useForm();

	return (
		<> 
		<input type={props.type} className={props.class} name={props.name} placeholder={props.placeholder} onChange={props.onchange}/>
		</>
	)
} 