import { apiService } from "../axiosIntance";

import { proData } from "../../lib/data/apiUrls.json";

export const downsideIntraday = () => {
  return apiService.get(proData.downsideIntraday);
};

export const upsideIntraday = () => {
  return apiService.get(proData.upsideIntraday);
};

export const downsideSwing = () => {
  return apiService.get(proData.downsideSwing);
};

export const upsideSwing = () => {
  return apiService.get(proData.upsideSwing);
};

export const volumeContraction = () => {
  return apiService.get(proData.valumeContraction);
};
