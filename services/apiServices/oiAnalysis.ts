import { apiService } from "../axiosIntance";

import apiUrls from "../../lib/data/apiUrls.json";

const { oiAnalysis } = apiUrls;

export const symbolExpiryList = () => {
  return apiService.get(oiAnalysis.symbolExpiryList);
};

export const strikePriceList = (params: { symbol: string }) => {
  return apiService.get(oiAnalysis.strikePriceforSymbol, {
    params,
  });
};

export const expiryList = (params: { symbol: string }) => {
  return apiService.get(oiAnalysis.symbolExpiryList, {
    params,
  });
};

export const trendingOIData = ({
  signal,
  ...params
}: {
  symbol: string;
  expiry_date: string;
  strike_price: number;
  interval: number;
  signal?: AbortSignal;
}) => {
  return apiService.get(oiAnalysis.trendingOIData, {
    params,
    signal,
  });
};

export const symbolList = () => {
  return apiService.get(oiAnalysis.symbolList);
};

export const getPutCallRatio = ({
  signal,
  ...params
}: {
  type: string;
  expiry_date?: string;
  signal?: AbortSignal;
}) => {
  return apiService.get(oiAnalysis.putCallRatio, {
    params,
    signal,
  });
};

export const getOptionChain = ({
  signal,
  ...params
}: {
  symbol: string;
  expiry_date: string;
  signal?: AbortSignal;
}) => {
  return apiService.get(oiAnalysis.nseOptionChain, {
    params,
    signal,
  });
};
