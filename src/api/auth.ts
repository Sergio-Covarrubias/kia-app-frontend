import { LoginBody, LoginResponse, ValidateResponse } from "@schemas/auth";
import axios from "./axios";

export const loginRequest = (data: LoginBody) => axios.post<LoginResponse>("/login", data);
export const validateSessionRequest = () => axios.get<ValidateResponse>("/validate");
