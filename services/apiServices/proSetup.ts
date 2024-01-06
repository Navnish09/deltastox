import { apiService } from "../axiosIntance";

import apiUrls from "../../lib/data/apiUrls.json";

const { proData } = apiUrls;

export const preMarketData = () => {
  return apiService.get(proData.preMarketData);
};

export const FiveMinMomemtum = () => {
  return apiService.get(proData["5MinMomentum"]);
};

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
