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

export const updateSubscription = (params: {
  endDate: string;
  email: string;
}) => {
  return apiService.post(admin.updateSubscription, undefined, {
    params,
  });
};

export const updateUserStatus = (params: { email: string; status: string }) => {
  return apiService.post(admin.updateStatus, undefined, {
    params,
  });
};

export const mapUserToAdmin = (params: { email: string }) => {
  return apiService.post(admin.mapToAdmin, undefined, {
    params,
  });
};
