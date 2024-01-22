import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/slices/AuthSlice"
const store=configureStore({
    reducer:{
        auth:userReducer
    }
});

export default store;