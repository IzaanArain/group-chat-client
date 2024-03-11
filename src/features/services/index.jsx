import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL=import.meta.env.VITE_API_URL
import { toast } from 'react-toastify';


export const postRequest=(apiEndpoint,thunkName)=>{
    return createAsyncThunk(
        thunkName,
        async({body,params,isToast},{rejectWithValue})=>{
            try{
                const endpoint = params ? `${apiEndpoint}${params}` : apiEndpoint;
                const res = await axios.post(endpoint,body);
                if (isToast) {
                    toast.success(res?.data?.message);
                }
                return res
            } catch(error) {
                if(isToast){
                    console.log("post request",error?.response)
                    toast.error(error?.response?.data?.message,{
                        position: "top-left",
                    })
                }
                return rejectWithValue(error?.response);
            }
        }
    )
}

export const getRequest = (apiEndpoint,thunkName)=>{
    return createAsyncThunk(
        thunkName,
        async({params,query,isToast},{rejectWithValue})=>{
            try{
            const endpoint = params ? `${apiEndpoint}${params}` : apiEndpoint;
            const res = await axios.get(endpoint,{params:query});
            if (isToast) {
                toast.success(res?.data?.message);
            }
            return res
            }catch(error){
                if(isToast){
                    console.log("get request",error?.response)
                    toast.error(error?.response?.data?.message,{
                        position: "top-left",
                    })
                }
                return rejectWithValue(error?.response);
            }
        }
    )
}