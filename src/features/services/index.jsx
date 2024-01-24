import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL=import.meta.env.VITE_API_URL
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const postRequest=(apiEndpoint,thunkName)=>{
    return createAsyncThunk(
        thunkName,
        async({body,params,isToast},{rejectWithValue})=>{
            try{
                const endpoint = params ? `${apiEndpoint}${params}` : apiEndpoint;
                const res=await axios.post(endpoint,body);
                if (isToast) {
                    toast.success(response?.data?.message);
                }
                return res
            } catch(error) {
                if(isToast){
                    console.log("post request",error?.response?.data?.message)
                    toast.error(error?.response?.data?.message,{
                        // position: toast.POSITION.TOP_RIGHT,
                    })
                }
                return rejectWithValue(error?.response);
            }
        }
    )
}