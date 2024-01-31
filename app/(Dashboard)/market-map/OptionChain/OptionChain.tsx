"use client";

import { useState } from "react";

import { Divider } from "@/app/_components/Divider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loader";

import { OITrendingFilters } from "./OptionChainFilters";
import { OptionChainTable } from "./OptionChainTable";
import { useAPI } from "@/app/_globals/hooks/useAPI";
import { getOptionChain } from "@/services/apiServices/oiAnalysis";

export type OptionChainData = {
  // calls_oi: number;
  // calls_change_oi: number;
  // calls_volume: number;
  calls_iv: number;
  calls_ltp: number;
  // calls_net_change: number;
  // calls_bid_price: number;
  // calls_ask_price: number;
  strike_price: number;
  // puts_oi: number;
  // puts_change_oi: number;
  // puts_volume: number;
  puts_iv: number;
  puts_ltp: number;
  // puts_net_change: number;
  // puts_ask_price: number;
  // puts_bid_price: number;
  // expiry_date: string;
  // time: string;
  // index_close: number;
  // created_at: string;
  // call_high: number;
  // call_low: number;
  // call_open: number;
  // put_high: number;
  // put_low: number;
  // put_open: number;
  // call_delta: number;
  // call_gamma: number;
  // call_vega: number;
  // call_theta: number;
  // call_rho: number;
  // put_delta: number;
  // put_gamma: number;
  // put_vega: number;
  // put_theta: number;
  // put_rho: number;
  // calls_oi_value: number;
  // puts_oi_value: number;
  // calls_change_oi_value: number;
  // puts_change_oi_value: number;
  // calls_offer_price: number;
  // puts_offer_price: number;
  // calls_average_price: number;
  // puts_average_price: number;
  // previous_eod_calls_oi: number;
  // previous_eod_puts_oi: number;
  // calls_builtup: string;
  // puts_builtup: string;
};

type OptionChainResponse = {
  opExpiryDates: string[];
  opDatas: OptionChainData[];
  ddldata: {
    oi: number[];
    volumn: number[];
    proximity: number[];
  };
};

export type OptionChainFilters = {
  symbol: string;
  expiry_date: string;
};

export const OptionChain = () => {
  const [filters, setFilters] = useState<OptionChainFilters>({
    symbol: "",
    expiry_date: "",
  });

  const { data, isLoading } = useAPI<
    OptionChainResponse,
    typeof getOptionChain
  >({
    requestHandler: getOptionChain,
    params: filters,
    returnData: (res) => res.data.resultData,
    polling: true,
    enable: !!filters.symbol,
  });

  const areFiltersReady = filters?.symbol;

  const expiryDates = data?.opExpiryDates || [];
  const optionChainData = data?.opDatas || [];

  return (
    <Card gradient="primary">
      <CardHeader>
        <OITrendingFilters
          expiryDates={expiryDates}
          isDataLoading={isLoading}
          filters={filters}
          setFilters={setFilters}
        />
      </CardHeader>
      <Divider direction="horizontal" size="small" variant="dark" />

      <CardContent className="pt-5">
        <div className="flex gap-2 items-center justify-between mb-3">
          <Card className="basis-1/3 text-right py-2 px-3 ">
            <span className="text-destructive font-bold">CALLS</span>
          </Card>
          <Card className="basis-1/3 py-2 px-3">
            <span className="text-success font-bold">PUTS</span>
          </Card>
        </div>

        {!areFiltersReady ? (
          <div className="flex justify-center items-center h-full w-full  min-h-[500px]">
            <LoadingSpinner />
          </div>
        ) : (
          <OptionChainTable
            filters={filters}
            isDataLoading={isLoading}
            data={optionChainData}
          />
        )}
      </CardContent>
    </Card>
  );
};
