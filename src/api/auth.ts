import { SigninDataType, SigninResponseType, LoginDataType, LoginResponseType, ValidateResponseType } from "@schemas/auth";
import Cookies from "js-cookie";
import axios from "./axios";

export const signinRequest = (data: SigninDataType) => axios.post<SigninResponseType>("/signin", data);
export const loginRequest = (data: LoginDataType) => axios.post<LoginResponseType>("/login", data);

export const validateSessionRequest = () => axios.get<ValidateResponseType>("/validate", {
    headers: {
        "Authorization": Cookies.get(import.meta.env.VITE_SESSION_COOKIE!)
    },
});
