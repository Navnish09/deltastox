import { Dispatch, SetStateAction, useMemo, useState } from "react";
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
import { findNearestNumber } from "@lib/utils/findNearestNumber";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CheckIcon, ChevronDown } from "lucide-react";
import { cn } from "@lib/utils";

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
  const [open, setOpen] = useState(false);

  const params = useMemo(
    () => ({ symbol: filters.symbol || "" }),
    [filters.symbol]
  );

  // API for symbols
  const { data: symbols } = useAPI<Symbol[], typeof symbolList>({
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
      if (data.length && symbols?.length) {
        // Get the last price of the symbol
        const symbolLastPrice = symbols.find(
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
    enable: !!symbols?.length,
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
    enable: !!symbols?.length,
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
      <div className="flex md:gap-5 gap-3 justify-end flex-wrap">
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                disabled={!symbols?.length}
                variant="ghost"
                role="combobox"
                aria-expanded={open}
                className="w-max justify-between"
              >
                {filters.symbol
                  ? symbols.find(
                      (symbol) => symbol.symbol_name === filters.symbol
                    )?.symbol_name
                  : "Select Symbol"}
                <CaretSortIcon className="ml-2 h-5 w-5 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] h-[400px] p-0">
              <Command value={filters.symbol}>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {symbols.map((symbol) => (
                    <CommandItem
                      key={symbol.symbol_name}
                      value={symbol.symbol_name}
                      onSelect={(currentValue) => {
                        if (currentValue.toUpperCase() === filters.symbol)
                          return;
                        onSymbolChange(currentValue.toUpperCase());
                        setOpen(false);
                      }}
                    >
                      {symbol.symbol_name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          filters?.symbol === symbol.symbol_name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {/* <Select
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
          </Select> */}
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
                    <SelectItem
                      key={strikePrice}
                      value={strikePrice.toString()}
                    >
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
