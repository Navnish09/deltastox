import { Dispatch, SetStateAction, useMemo } from "react";
import dayjs from "dayjs";

import { useAPI } from "@/app/_globals/hooks/useAPI";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { symbolList, expiryList } from "@/services/apiServices/oiAnalysis";

import { OptionChainFilters } from "./OptionChain";
import { DEFAULT_SYMBOL } from "./constants";

type Symbol = {
  symbol_name: string;
  today_close: number;
  prev_close: number;
  max_pain: number;
  lot_size: number;
};

type ExpiryDate = string;

export const OITrendingFilters = ({
  filters,
  setFilters,
  expiryDates,
  isDataLoading,
}: {
  filters: OptionChainFilters;
  setFilters: Dispatch<SetStateAction<OptionChainFilters>>;
  expiryDates: ExpiryDate[];
  isDataLoading: boolean;
}) => {

  // API for symbols
  const { data: sybmols } = useAPI<Symbol[], typeof symbolList>({
    requestHandler: symbolList,
    returnData: (res) => res.data.resultData,
    onResloved: (data) => {
      if (data.length) {
        setFilters((prev) => ({
          ...prev,
          symbol: DEFAULT_SYMBOL,
        }));
      }
    },
  });

  const onSymbolChange = (symbol: string) => {
    setFilters((prev) => ({
      ...prev,
      symbol,
      expiry_date: "",
    }));
  };

  return (
    <div className="flex justify-between items-center flex-wrap gap-3">
      <h4>{filters.symbol} Option Chain</h4>
      <div className="flex gap-5">
        <div>
          <Select
            autoComplete="on"
            {...(filters?.symbol && {
              value: filters.symbol,
            })}
            onValueChange={onSymbolChange}
            disabled={!sybmols?.length}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={filters?.symbol ? "Select Symbol" : "Loading..."}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sybmols?.map((symbol) => {
                  return (
                    <SelectItem value={symbol.symbol_name}>
                      {symbol.symbol_name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select
            value={filters?.expiry_date}
            onValueChange={(value) => {
              setFilters((prev) => ({ ...prev, expiry_date: value }));
            }}
            disabled={!expiryDates?.length || isDataLoading}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Expiry Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {expiryDates?.map((expiryDate) => {
                  return (
                    <SelectItem value={expiryDate}>
                      {dayjs(expiryDate).format("DD MMM YYYY")}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
