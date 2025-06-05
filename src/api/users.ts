import { GetUsersResponse, GetUserResponse, PostUserBody, PatchUserBody, PatchUserPasswordBody } from "@schemas/users";
import axios from "./axios";

export const postUserRequest = (data: PostUserBody) => axios.post<void>("/users", data);
export const patchUserRequest = (userId: number, data: PatchUserBody) => axios.patch<void>(`users/${userId}`, data);
export const patchUserPasswordRequest = (userId: number, data: PatchUserPasswordBody) => axios.patch<void>(`/users/password/${userId}`, data);
export const deleteUserRequest = (userId: number) => axios.delete<void>(`/users/${userId}`);
export const getUsersRequest = (query: string, page: number, limit: number) => axios.get<GetUsersResponse>(`/users?query=${query}&page=${page}&limit=${limit}`);
export const getUserRequest = (userId: number) => axios.get<GetUserResponse>(`/users/${userId}`);
