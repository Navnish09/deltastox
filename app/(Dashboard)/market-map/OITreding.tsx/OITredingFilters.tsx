import { Dispatch, SetStateAction, useMemo } from "react";
import dayjs from "dayjs";

import { useAPI } from "@/app/_globals/hooks/useAPI";
import BadgeGroup from "@/components/ui/badge-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  symbolList,
  strikePriceList,
  expiryList,
} from "@/services/apiServices/oiAnalysis";

import { FilterParams } from "./OITrending";
import { DEFAULT_SYMBOL } from "./constants";
import { findNearestNumber } from "@/lib/utils/findNearestNumber";

type Symbol = {
  symbol_name: string;
  today_close: number;
  prev_close: number;
  max_pain: number;
  lot_size: number;
};

type StrikePrice = number;

type ExpiryDate = string;

export const OITrendingFilters = ({
  filters,
  setFilters,
}: {
  filters: FilterParams;
  setFilters: Dispatch<SetStateAction<FilterParams>>;
}) => {
  const params = useMemo(
    () => ({ symbol: filters.symbol || "" }),
    [filters.symbol]
  );

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

  // API for strike prices
  const { data: strikePrices, isLoading: isStrikePriceLoading } = useAPI<
    StrikePrice[],
    typeof strikePriceList
  >({
    requestHandler: strikePriceList,
    params: params,
    onResloved: (data) => {
      if (data.length && sybmols?.length) {
        // Get the last price of the symbol
        const symbolLastPrice = sybmols.find(
          (symbol) => symbol.symbol_name === filters.symbol
        )?.today_close;

        // Find the nearest strike price to the last price of the symbol
        if (symbolLastPrice) {
          const nearestStrikePrice = findNearestNumber(data, symbolLastPrice);

          setFilters((prev) => ({
            ...prev,
            strike_price:
              nearestStrikePrice || data[Math.trunc(data.length / 2)],
          }));
        }
      }
    },
    returnData: (res) => res.data.result,
    enable: !!sybmols?.length,
  });

  // API for expiry dates
  const { data: expiryDates, isLoading: isExpiryDatesLoading } = useAPI<
    ExpiryDate[],
    typeof expiryList
  >({
    requestHandler: expiryList,
    params: params,
    onResloved: (data) => {
      if (data.length) {
        setFilters((prev) => ({ ...prev, expiry_date: data[0] }));
      }
    },
    returnData: (res) => res.data.result,
    enable: !!sybmols?.length,
  });

  const onSymbolChange = (symbol: string) => {
    setFilters((prev) => ({
      ...prev,
      strike_price: 0,
      expiry_date: "",
      symbol,
    }));
  };

  return (
    <div className="flex justify-between items-center flex-wrap gap-3">
      <h4>{filters.symbol} Trending OI</h4>
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
            {...(filters?.strike_price
              ? {
                  value: filters.strike_price.toString(),
                }
              : {})}
            onValueChange={(value) => {
              setFilters((prev) => ({ ...prev, strike_price: +value }));
            }}
            disabled={!strikePrices?.length || isStrikePriceLoading}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Strike price" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {strikePrices?.map((strikePrice) => {
                  return (
                    <SelectItem value={strikePrice.toString()}>
                      {strikePrice}
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
            disabled={!expiryDates?.length || isExpiryDatesLoading}
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
        <BadgeGroup
          options={[
            { label: "1 min", value: 1 },
            { label: "3 min", value: 3 },
            { label: "5 min", value: 5 },
          ]}
          defaultValue={filters.interval}
          onChange={(interval) => {
            setFilters((prev) => ({ ...prev, interval: +interval }));
          }}
        />
      </div>
    </div>
  );
};
