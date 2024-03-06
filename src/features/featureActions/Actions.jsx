import { postRequest } from "../services";

//post Request
export const signUpUser = postRequest("/user/signup", "signup");
export const verifyUser = postRequest("/user/otpVerify", "verifyAccount");
export const completeUserProfile = postRequest("/user/completeProfile", "completeProfile");
export const loginUser = postRequest("/user/signin", "signin");
export const logoutUser = postRequest("/user/signout","signout");

