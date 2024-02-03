import { apiService } from "./axiosIntance";
import { auth } from "../lib/data/apiUrls.json";
import cookie from "@boiseitguru/cookie-cutter";

export const getToken = () => cookie.get("token");

export const setToken = (token: string) => {
  cookie.set("token", token);
};

export const removeToken = () => {
  cookie.set("token", "", { expires: new Date(0) });
};

export const login = (data: { email: string; password: string }) =>
  apiService.post(auth.login, data);

export const signUp = (data: {
  name: string;
  email: string;
  password: string;
}) => apiService.post(auth.createUser, data);

export const getUserDetails = () => apiService.post(auth.getUserDetails);

export const updateMobileAndPassword = (data: {
  mobile?: string;
  password?: string;
}) =>
  apiService.post(auth.updatePasswordAndMobile, undefined, {
    params: data,
  });

export const uploadLogo = (data: FormData) => {
  return apiService.post(auth.uploadLogo, data);
};
