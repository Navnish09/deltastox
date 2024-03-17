import { apiService } from "../axiosIntance";

import apiUrls from "../../lib/data/apiUrls.json";

const { admin } = apiUrls;

export const postMessage = (message: string) => {
  return apiService.post(admin.postMessage, undefined, {
    params: {
      message,
    },
  });
};

export const getNotifications = () => {
  return apiService.get(admin.getNotification);
};
