import {authStatus} from "./Status";

export const  LoginPage=(userLogin)=>{ 
	 
	return async (dispatch)=>{
		const token = userLogin.token; 
		const user  = userLogin.result; 

		dispatch({
			type:"LOGIN_SUCCESS",
			payload:{
				token,user
			}
		})
		 
	}
}
