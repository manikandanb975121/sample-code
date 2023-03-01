import {categoryStatus,cmsStatus} from '../action/Status';

const initialData = {
	cms:[],
	coupon:[]

};

export default (state=initialData,action)=>{ 
	 switch(action.type){
	 	case categoryStatus.CATEGORY_GET_REQUEST:
	 		state={
	 		    ...state
	 		}
	 	break; 
	 	case categoryStatus.CATEGORY_GET_SUCCESS:
	 	    state={
	 	    	...state,
	 	    	categories:action.payload.categories

	 	    }
	 	break;
	 	case cmsStatus.CMS_REQUEST:
	 	    state={
	 	    	...state
 			}
	 	break; 
	 	case cmsStatus.CMS_GET_REQUEST:
	 	    state={
	 	    	...state
 			}
	 	break;
	 	case cmsStatus.CMS_GET_SUCCESS:
	 	    state={
	 	    	...state,
	 	    	cms:action.payload.categories

	 	    }
	 	break;
	 	case cmsStatus.CMS_DELETE_REQUEST:
	 	    state={
	 	    	...state
 			}
	 	break;
	 	case cmsStatus.CMS_UPDATE_REQUEST:
	 	    state={
	 	    	...state
 			}
	 	break;
	 	case cmsStatus.COUPON_REQUEST:
	 	    state={
	 	    	...state
 			}
	 	break;
	 	case cmsStatus.COUPON_EXIST:
	 	    state={
	 	    	...state
 			}
	 	break;
	 	case cmsStatus.COUPON_SUCCESS:
	 	    state={
	 	    	...state
 			}
	 	break;
	 	case cmsStatus.COUPON_GET_REQUEST:
	 	    state={
	 	    	...state
 			}
	 	break;
	 	case cmsStatus.COUPON_GET_SUCCESS:
	 	    state={
	 	    	...state,
	 	    	coupon:action.payload.categories

	 	    }
	 	break;
	 	case cmsStatus.COUPON_UPDATE_REQUEST:
	 	    state={
	 	    	...state
 			}
	 	break;
	 	case cmsStatus.COUPON_UPDATE_SUCCESS:
	 	    state={
	 	    	...state,
	 	    	coupon:action.payload.categories

	 	    }
	 	break;
	 	case cmsStatus.COUPON_DELETE_REQUEST:
	 	    state={
	 	    	...state
 			}
	 	break;
	 	case cmsStatus.COUPON_DELETE_SUCCESS:
	 	    state={
	 	    	...state

	 	    }
	 	break;

	 		 	            
	 }

	 return state;
}