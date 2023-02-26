import {authStatus} from '../action/Status';

const initialData = {
	token:null,
	user:[],
	authenticate:false,
	authenticating:false, 
	loading:false,
	error:null,
	message:""

};

export default (state=initialData,action)=>{ 

	 switch(action.type){
	 	case authStatus.LOGIN_REQUEST:
	 		state={
	 		    ...state,
	 		    authenticating:true
	 		}
	 	break; 
	 	case authStatus.LOGIN_SUCCESS:
	 	    state={
	 	    	...state,
	 	    	user:action.payload.user,
	 	    	token:action.payload.token,
	 	    	authenticate:true,
	 	        authenticating:false

	 	    }
	 	break;
	 	// case regStatus.REG_REQUEST:
	 	//     state={
	 	//     	...state,
	 	//     	authenticating:true,
	 	//     }
	 	// break;
	 	// case regStatus.REG_SUCCESS:
	 	//      state={
	 	//      	...state, 
	 	//      	authenticating:true,
	 	//      	authenticate:false,
	 	//      	token:action.payload.token,
	 	//      	user:action.payload.user

	 	//      }
	 	// break;

	 		 	            
	 }

	 return state;
}