import axios from "axios";
import { getToken, logout, removeToken } from "./authServices";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

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
      const message =
        response?.data?.message ||
        response?.data ||
        "Session expired, Please login again";

      toast({
        title: message,
        variant: "destructive",
      });

      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(response);
  }
);

export const apiService = instance;
