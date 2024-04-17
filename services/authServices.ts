import cookie from "@boiseitguru/cookie-cutter";

import { apiService } from "./axiosIntance";
import { auth, home } from "../lib/data/apiUrls.json";

export const getToken = () => cookie.get("token");

export const setToken = (token: string) => {
  cookie.set("token", token);
};

export const removeToken = () => {
  cookie.set("token", "", { expires: new Date(0) });
};

export const login = (data: { email: string; password: string }) =>
  apiService.post(auth.login, data);

export const logout = () => {
  return apiService.post(auth.logout);
};

export const signUp = (data: {
  name: string;
  email: string;
  password: string;
}) => apiService.post(auth.createUser, data);

export const forgotPassword = (params: { email: string }) =>
  apiService.post(auth.forgotPassword, undefined, {
    params,
  });

export const getUserDetails = () => apiService.get(auth.getUserDetails);

export const getUsers = () => apiService.get(home.getUsers);

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
