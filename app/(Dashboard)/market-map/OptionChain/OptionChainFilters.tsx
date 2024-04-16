import { Dispatch, SetStateAction, useMemo, useState } from "react";
import dayjs from "dayjs";
import { CheckIcon, ChevronDown } from "lucide-react";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@lib/utils";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Command,
} from "@/components/ui/command";
import { CaretSortIcon } from "@radix-ui/react-icons";

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
  const [open, setOpen] = useState(false);

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
      <div className="flex md:gap-5 gap-3 justify-between flex-wrap flex-grow">
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
              <Command value={filters?.symbol}>
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
                    <SelectItem key={expiryDate} value={expiryDate}>
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
