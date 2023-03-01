import {baseUrl} from './../config';
import axios from 'axios'; 


const token = window.localStorage.getItem('token');



const axiosInstance = axios.create({
    baseURL: `${baseUrl}`,
    headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }
});



axiosInstance.interceptors.response.use((res) => {
    return res;
}, (error) => { 
    if(error.response.status==401){
        
        localStorage.clear();
        window.location.href = "/";
    }
  
    return Promise.reject(error);
})

export default axiosInstance;