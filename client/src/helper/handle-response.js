import {LOGOUT} from './service'; 
export function handleResponse(response) { 
    if(response.status == 200 || response.status == 201){ 
    return response.data;
    } else {
    if (response.status == 401) {
        LOGOUT();
    } else if (response.status == 403) {
        window.location = '/access-denied';
    } else {
        //LOGOUT();
    }
   }


  
  }