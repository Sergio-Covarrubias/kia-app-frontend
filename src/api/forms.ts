import { LoadFormValuesResponse, UploadFormBody } from "@schemas/forms";
import axios from "./axios";

export const loadFormValuesRequest = () => axios.get<LoadFormValuesResponse>("/form");
export const uploadFormRequest = (data: UploadFormBody) => axios.post("/form", data);
