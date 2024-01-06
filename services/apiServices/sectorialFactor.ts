import { apiService } from "../axiosIntance";

import apiUrls from "../../lib/data/apiUrls.json";

const { SectorialFlow } = apiUrls;

export const nifty50 = () => {
  return apiService.get(SectorialFlow.nifty50);
};

export const bankNifty = () => {
  return apiService.get(SectorialFlow.bankNifty);
};

export const niftyAuto = () => {
  return apiService.get(SectorialFlow.niftyAuto);
};

export const niftyFinServ = () => {
  return apiService.get(SectorialFlow.niftyFinServ);
};

export const niftyFMCG = () => {
  return apiService.get(SectorialFlow.niftyFMCG);
};

export const niftyIT = () => {
  return apiService.get(SectorialFlow.niftyIT);
};

export const niftyMedia = () => {
  return apiService.get(SectorialFlow.niftyMedia);
};

export const niftyMetal = () => {
  return apiService.get(SectorialFlow.niftyMetal);
};

export const niftyPharma = () => {
  return apiService.get(SectorialFlow.niftyPharma);
};

export const niftyPsuBanks = () => {
  return apiService.get(SectorialFlow.niftyPsuBanks);
};

export const niftyRealty = () => {
  return apiService.get(SectorialFlow.niftyRealty);
};

export const niftyPvtBank = () => {
  return apiService.get(SectorialFlow.niftyPvtBanks);
};

export const niftyEnergy = () => {
  return apiService.get(SectorialFlow.niftyEnergy);
};
