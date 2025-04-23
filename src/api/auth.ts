import { SigninDataType, LoginDataType } from '@schemas/auth';
import axios from './axios';

export const signinRequest = (data: SigninDataType) => axios.post('/signin', data);
export const loginRequest = (data: LoginDataType) => axios.post('/login', data);
export const validateSession = () => axios.get('/validate');
