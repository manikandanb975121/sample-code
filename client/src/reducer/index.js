import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer'; 
import VendorReducer from './VendorReducer'; 
import CategoryReducer from './CategoryReducer'; 

const rootReducer=combineReducers({
      auth:AuthReducer,
      vendor:VendorReducer,
      category:CategoryReducer
});

export default rootReducer;
