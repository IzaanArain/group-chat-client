import { postRequest,getRequest } from "../services";

//post Request
export const signUpUser = postRequest("/user/signup", "signup");
export const verifyUser = postRequest("/user/otpVerify", "verifyAccount");
export const completeUserProfile = postRequest("/user/completeProfile", "completeProfile");
export const loginUser = postRequest("/user/signin", "signin");
export const logoutUser = postRequest("/user/signout","signout");
// post chat
export const initiateChat = postRequest("/user/initiateChat","initiateChat")
//get Request
export const getAllUsers = getRequest("/user/allUsers","getAllUsers");
// get chat
export const getAllChats = getRequest("/user/fetchChat","getAllChats");

