import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Authorization": Cookies.get(import.meta.env.VITE_SESSION_COOKIE!)
  },
});

export default instance;
