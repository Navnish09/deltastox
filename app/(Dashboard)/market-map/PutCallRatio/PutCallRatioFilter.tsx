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

import { PCRFilters } from "./PutCallRatio";
import { PCR_TYPES, PCR_TYPE_LABELS } from "./constants";

export const PutCallRatioFilters = ({
  filters,
  expiryDates,
  setFilters,
  isDataLoading,
}: {
  filters: PCRFilters;
  expiryDates: string[];
  isDataLoading: boolean;
  setFilters: Dispatch<SetStateAction<PCRFilters>>;
}) => {
  return (
    <div className="flex justify-between items-center flex-wrap gap-3">
      <h4>{PCR_TYPE_LABELS[filters.type]} Put Call Ratio</h4>
      <div className="flex gap-5 justify-end flex-wrap">
        {/* <div>
          <Select
            value={filters?.type}
            onValueChange={(value) => {
              setFilters((prev) => ({
                ...prev,
                type: value as keyof typeof PCR_TYPE_LABELS,
              }));
            }}
            disabled={!expiryDates.length}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Symbol" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.keys(PCR_TYPE_LABELS).map((type) => (
                  <SelectItem value={type}>
                    {PCR_TYPE_LABELS[type as keyof typeof PCR_TYPE_LABELS]}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div> */}
        <div>
          <Select
            value={filters?.expiry_date}
            onValueChange={(value) => {
              setFilters((prev) => ({ ...prev, expiry_date: value }));
            }}
            disabled={!expiryDates.length || isDataLoading}
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
        <BadgeGroup
          options={[
            {
              label: PCR_TYPE_LABELS[PCR_TYPES.niftypcr],
              value: PCR_TYPES.niftypcr,
            },
            {
              label: PCR_TYPE_LABELS[PCR_TYPES.bankniftypcr],
              value: PCR_TYPES.bankniftypcr,
            },
            {
              label: PCR_TYPE_LABELS[PCR_TYPES.finniftypcr],
              value: PCR_TYPES.finniftypcr,
            },
          ]}
          defaultValue={filters.type}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, type: value }));
          }}
        />
      </div>
    </div>
  );
};
