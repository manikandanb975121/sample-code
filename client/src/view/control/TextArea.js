import React from 'react' 

export default function TextArea(props) { 
	return (
        <textarea className={props.class} name={props.name} placeholder={props.placeholder} onChange={props.onchange} defaultValue={""} />
	)
}