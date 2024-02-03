import axios from "axios";
import { getToken, removeToken } from "./authServices";
import { Router } from "next/router";
// import { redirect } from "next/navigation";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (successRes) => successRes,
  ({ response }) => {
    if (response?.status === 401) {
      removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(response);
  }
);

export const apiService = instance;
