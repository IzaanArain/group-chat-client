import CompleteProfile from "../../components/Auth/CompleteProfile";
import { postRequest } from "../services";

//post Request
export const signUpUser = postRequest("/user/signup", "signup");
export const verifyUser = postRequest("/user/otpVerify", "VerifyAccount");
export const completeUserProfile = postRequest("/user/completeProfile", "CompleteProfile");
export const loginUser = postRequest("/user/signin", "signin");
