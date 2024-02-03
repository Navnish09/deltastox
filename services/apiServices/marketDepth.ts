import { apiService } from "../axiosIntance";

import apiUrls from "../../lib/data/apiUrls.json";

const { marketDepth } = apiUrls;

export const topGainer = () => {
  return apiService.get(marketDepth.topGainers);
};

export const topLoser = () => {
  return apiService.get(marketDepth.topLosers);
};

export const superStocks = () => {
  return apiService.get(marketDepth.superStocks);
}

export const intradayStocks = () => {
  return apiService.get(marketDepth.intradayStocks);
}