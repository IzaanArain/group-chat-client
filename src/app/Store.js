import { configureStore,combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/slices/AuthSlice"
import persistConfig from "../app/index";
import { persistStore, persistReducer } from 'redux-persist';
// import thunk from 'redux-thunk';

const persistedUser=persistReducer(persistConfig,userReducer);

const rootReducer=combineReducers({
  auth:persistedUser
})
const store=configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export default store;