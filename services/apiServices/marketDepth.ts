import { apiService } from "../axiosIntance";

import apiUrls from "../../lib/data/apiUrls.json";

const { marketDepth } = apiUrls;

export const topGainer = () => {
  return apiService.get(marketDepth.topGainers);
};

export const topLoser = () => {
  return apiService.get(marketDepth.topLosers);
};
