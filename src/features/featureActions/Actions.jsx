import { postRequest } from "../services";

//post Request
export const signUpUser=postRequest("/user/signup","signup");