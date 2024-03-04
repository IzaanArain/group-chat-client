import { configureStore,combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/slices/AuthSlice"
import persistConfig from "./index";
import { persistStore, persistReducer } from 'redux-persist';
import axios from "axios";
// import thunk from 'redux-thunk';

const persistedUser=persistReducer(persistConfig,userReducer);

const rootReducer=combineReducers({
  auth:persistedUser
});

const store=configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export default store;

persistor.subscribe(()=>{
  const persistedState = store.getState();
  const {user}=persistedState?.auth || {};
  // console.log("persistedState",user);
  axios.defaults.headers.common.Authorization=user?.token
})