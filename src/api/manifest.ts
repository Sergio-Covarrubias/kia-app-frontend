import { GetManifestResponse, PostManifestBody } from "@schemas/manifest";
import axios from "./axios";

export const getManifestRequest = () => axios.get<GetManifestResponse>("/manifest");
export const postManifestRequest = (data: PostManifestBody) => axios.post("/manifest", data, { responseType: "blob" });
