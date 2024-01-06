import { apiService } from "../axiosIntance";

import apiUrls from "../../lib/data/apiUrls.json";

const { swingCenter } = apiUrls;

export const shortTermSwingBuy = () => {
  return apiService.get(swingCenter.shortTermSwingBuy);
};

export const shortTermSwingSell = () => {
  return apiService.get(swingCenter.shortTermSwingSell);
};

export const longTermSwingBuy = () => {
  return apiService.get(swingCenter.longTermSwingBuy);
};

export const longTermSwingSell = () => {
  return apiService.get(swingCenter.longTermSwingSell);
};

export const heavyWeightIndex = () => {
  return apiService.get(swingCenter.heavyWeightIndex);
};

export const sectorialDifference = () => {
  return apiService.get(swingCenter.sectorialDifference);
};
