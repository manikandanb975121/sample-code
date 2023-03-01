import {vendorStatus,syncStatus} from '../action/Status';

const initialData = {
	token:null,
	vendor:[],
	vendorStatus:[],
	deleteStatus:[],
	editStatus:[],
	vendorUpdate:[],
	authenticate:false,
	authenticating:false, 
	loading:false,
	error:null,
	message:"",
	vendorData:[],
	syncDescription:null,
	syncStock:null,
 
};

export default (state=initialData,action)=>{ 
	 switch(action.type){
	 	case vendorStatus.vendor_REQUEST:
	 		state={
	 		    ...state,
	 		    authenticating:true
	 		}
	 	break; 
	 	case vendorStatus.vendor_SUCCESS:
	 	    state={
	 	    	...state,
	 	    	vendor:action.payload.dt, 
	 	    	authenticate:true,
	 	        authenticating:false

	 	    }
	 	break; 

	 	case vendorStatus.vendor_STATUS_REQUEST:
	 	    state={
	 	    	...state,  
	 	    	authenticate:true,
	 	        authenticating:false

	 	    }
	 	break; 
	 	case vendorStatus.vendor_STATUS_SUCCESS:
	 	    state={
	 	    	...state,
	 	    	vendorStatus:action.payload.statusData, 
	 	    	authenticate:true,
	 	        authenticating:false

	 	    }
	 	break;

	 	case vendorStatus.vendor_DELETE_REQUEST:
	 	    state={
	 	    	...state,  
	 	    	authenticate:true,
	 	        authenticating:false

	 	    }
	 	break; 
	 	case vendorStatus.vendor_DELETE_SUCCESS:
	 	    state={
	 	    	...state,
	 	    	deleteStatus:action.payload.deleteStatus, 
	 	    	authenticate:true,
	 	        authenticating:false

	 	    }
	 	break; 

	 	case vendorStatus.vendor_EDIT_REQUEST:
	 	    state={
	 	    	...state,  
	 	    	authenticate:true,
	 	        authenticating:false

	 	    }
	 	break; 
	 	case vendorStatus.vendor_EDIT_SUCCESS:
	 	    state={
	 	    	...state,
	 	    	editStatus:action.payload.editStatus, 
	 	    	authenticate:true,
	 	        authenticating:false

	 	    }
	 	break; 


	 	case vendorStatus.vendor_UPDATE_REQUEST:
	 	    state={
	 	    	...state,  
	 	    	authenticate:true,
	 	        authenticating:false

	 	    }
	 	break; 
	 	case vendorStatus.vendor_UPDATE_SUCCESS:
	 	    state={
	 	    	...state,
	 	    	vendorUpdate:action.payload.vendorUpdate, 
	 	    	authenticate:true,
	 	        authenticating:false

	 	    }
	 	break; 
		
		 case vendorStatus.vendor_ADD_SUCCESS:
			state={
				...state,
				vendorUpdate:action.payload.vendorUpdate, 
				authenticate:true,
				authenticating:false

			}
		break;  

	 	case vendorStatus.vendor_BULK_REQUEST:
	 	    state={
	 	    	...state,  
	 	    	authenticate:true,
	 	        authenticating:false

	 	    }
	 	break; 
	 	case vendorStatus.vendor_BULK_SUCCESS:
	 	    state={
	 	    	...state,
	 	    	// vendorUpdate:action.payload.vendorUpdate, 
	 	    	authenticate:true,
	 	        authenticating:false

	 	    }
	 	break;
	 	case syncStatus.SYNC_DESCRIPTION_FAILED:
	 	    state={
	 	    	...state,
	 	    	// vendorUpdate:action.payload.vendorUpdate, 
	 	    	syncDescription:null

	 	    }
	 	break;
	 	case syncStatus.SYNC_DESCRIPTION_REQUEST:
	 	    state={
	 	    	...state,
	 	    	// vendorUpdate:action.payload.vendorUpdate, 
	 	    	syncDescription:true

	 	    }
	 	break; 
	 	case syncStatus.SYNC_DESCRIPTION_SUCCESS:
	 	    state={
	 	    	...state,
	 	    	// vendorUpdate:action.payload.vendorUpdate, 
	 	    	syncDescription:false

	 	    }
	 	break; 
	 	case syncStatus.SYNC_STOCK_FAILED:
	 	    state={
	 	    	...state,
	 	    	// vendorUpdate:action.payload.vendorUpdate, 
	 	    	syncStock:null

	 	    }
	 	break;
	 	case syncStatus.SYNC_STOCK_REQUEST:
	 	    state={
	 	    	...state,
	 	    	// vendorUpdate:action.payload.vendorUpdate, 
	 	    	syncStock:true

	 	    }
	 	break; 
	 	case syncStatus.SYNC_STOCK_SUCCESS:
	 	    state={
	 	    	...state,
	 	    	// vendorUpdate:action.payload.vendorUpdate, 
	 	    	syncStock:false

	 	    }
	 	break; 

	 		 	            
	 }

	 return state;
}