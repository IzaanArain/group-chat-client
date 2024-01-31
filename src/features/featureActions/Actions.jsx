import { postRequest } from "../services";

//post Request
export const signUpUser=postRequest("/user/signup","signup");
export const VerifyUser=postRequest("/user/otpVerify","VerifyAccount");
export const loginUser=postRequest("/user/signin","signin");
