import { apiService } from "./axiosIntance";
import { auth } from "../lib/data/apiUrls.json";

export const userToken = () => localStorage.getItem("token");

export const login = (data: { email: string; password: string }) =>
  apiService.post(auth.login, data);
