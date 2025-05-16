import { PostUserBody, PutUserBody, DeleteUserBody } from "@schemas/users";
import axios from "./axios";

export const createUserRequest = (data: PostUserBody) => axios.post<void>("user", data);
export const putUserRequest = (data: PutUserBody) => axios.put<void>("user", data);
export const deleteUserRequest = (data: DeleteUserBody) => axios.delete<void>(`user?corporate_id=${data.corporateId}`);
