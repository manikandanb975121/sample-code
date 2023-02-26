import {categoryStatus,cmsStatus} from "./Status";
import axios from "../helper/axios";
console.log(axios)

export const  GetCategoryAction=(userLogin)=>{
	 
	return async (dispatch)=>{
		dispatch({type:categoryStatus.CATEGORY_GET_REQUEST});
		const res = await axios.get(`/getcategory/`);
		if(res.status===200){    
			const categories= res.data
			dispatch({
				type:categoryStatus.CATEGORY_GET_SUCCESS,
				payload:{
					categories
				}
			})

		}else{
		if(res.status===201){
			console.log(res.data);
		}
	    }
	}
}

export const  AddCategorAction=(data)=>{
	 
	return async (dispatch)=>{
		dispatch({type:categoryStatus.CATEGORY_ADD_REQUEST});
		const res = await axios.post(`/addcategory/`,data);
		if(res.status===200){    
			const categories= res.data
			dispatch({
				type:categoryStatus.CATEGORY_ADD_SUCCESS,
				payload:{
					categories
				}
			})

		}else{
		if(res.status===201){
			console.log(res.data);
		}
	    }
	}
}

export const DeleteCategoryAction=(data)=>{
	return async (dispatch)=>{
		dispatch({type:categoryStatus.CATEGORY_DELETE_REQUEST});
		const res = await axios.post(`/deletecategory/`,data);
		if(res.status===200){    
			const categories= res.data
			dispatch({
				type:categoryStatus.CATEGORY_DELETE_SUCCESS,
				payload:{
					categories
				}
			})

		}else{
		if(res.status===201){
			console.log(res.data);
		}
	    }
	}
}


export const AddCouponAction=(data)=>{
	console.log(data)
	return async (dispatch)=>{
		dispatch({type:cmsStatus.COUPON_REQUEST});
		const res = await axios.post(`/addcoupon/`,data);
		console.log(res.data)
		if(res.status===200){    
			const categories= res.data
			dispatch({
				type:cmsStatus.COUPON_SUCCESS,
				payload:{
					categories
				}
			})
			alert("Patent Added")

		}else{
		dispatch({type:cmsStatus.COUPON_EXIST});
		alert("Patent email Already Exists")
	    }
	}
}

export const AddVitalAction=(data)=>{
	console.log(data)
	return async (dispatch)=>{
		dispatch({type:cmsStatus.COUPON_REQUEST});
		const res = await axios.post(`/addvital/`,data);
		console.log(res.data)
		if(res.status===200){    
			const categories= res.data
			dispatch({
				type:cmsStatus.COUPON_SUCCESS,
				payload:{
					categories
				}
			})
			alert("Vital Added")

		}else{
		dispatch({type:cmsStatus.COUPON_EXIST});
		alert("Patent temprature Already Exists")
	    }
	}
}



export const GetCouponAction=()=>{
	
	return async (dispatch)=>{
		dispatch({type:cmsStatus.COUPON_GET_REQUEST});
		const res = await axios.post(`/getcoupon/`);
		console.log(res.data)
		if(res.status===200){    
			const categories= res.data
			dispatch({
				type:cmsStatus.COUPON_GET_SUCCESS,
				payload:{
					categories
				}
			})

		}else{
		if(res.status===201){
			console.log(res.data);
		}
	    }
	}
}

export const GetVitalAction=()=>{
	
	return async (dispatch)=>{
		dispatch({type:cmsStatus.COUPON_GET_REQUEST});
		const res = await axios.post(`/getvital/`);
		console.log(res.data)
		if(res.status===200){    
			const categories= res.data
			dispatch({
				type:cmsStatus.COUPON_GET_SUCCESS,
				payload:{
					categories
				}
			})

		}else{
		if(res.status===201){
			console.log(res.data);
		}
	    }
	}
}

export const DeleteCouponAction=(data)=>{
	
	return async (dispatch)=>{
		dispatch({type:cmsStatus.COUPON_DELETE_REQUEST});
		const res = await axios.post(`/deletecoupon/`,data);
		console.log(res.data)
		if(res.status===200){    
			const categories= res.data
			dispatch({
				type:cmsStatus.COUPON_DELETE_SUCCESS,
				payload:{
					categories
				}
			})

		}else{
		if(res.status===201){
			console.log(res.data);
		}
	    }
	}
}


export const EditCouponAction=(data)=>{
	console.log(data)
	return async (dispatch)=>{
		dispatch({type:cmsStatus.COUPON_UPDATE_REQUEST});
		const res = await axios.post(`/editcoupon/`,data);
		console.log(res.data)
		if(res.status===200){    
			const categories= res.data
			dispatch({
				type:cmsStatus.COUPON_UPDATE_SUCCESS,
				payload:{
					categories
				}
			})
			

		}else{
		if(res.status===201){
			console.log(res.data);
		}
	    }
	}
}
