"use client";

import { useState } from "react";

import { Divider } from "@/app/_components/Divider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { PutCallRatioFilters } from "./PutCallRatioFilter";
import { PutCallRatioTable } from "./PutCallRatioTable";
import { DEFAULT_PCR_TYPE, PCR_TYPES } from "./constants";
import { useAPI } from "@/app/_globals/hooks/useAPI";
import { getPutCallRatio } from "@/services/apiServices/oiAnalysis";

export type OIData = {
  time: string;
  created_at: string;
  expiry_date: string;
  pcr: number;
  index_close: number;
};

type PCRData = {
  oiExpiryDates: string[];
  oiDatas: OIData[];
};

export type PCRFilters = {
  type: (typeof PCR_TYPES)[keyof typeof PCR_TYPES];
  expiry_date?: string;
};

export const PutCallRatio = () => {
  const [filters, setFilters] = useState<PCRFilters>({
    type: DEFAULT_PCR_TYPE,
    expiry_date: "",
  });

  const { data, isLoading } = useAPI<PCRData, typeof getPutCallRatio>({
    requestHandler: getPutCallRatio,
    params: filters,
    returnData: (res) => res.data.result,
    polling: true,
  });

  const expiryDates = data?.oiExpiryDates || [];
  const pcrData = data?.oiDatas || [];

  return (
    <Card gradient="primary">
      <CardHeader>
        <PutCallRatioFilters
          isDataLoading={isLoading}
          filters={filters}
          setFilters={setFilters}
          expiryDates={expiryDates}
        />
      </CardHeader>
      <Divider direction="horizontal" size="small" variant="dark" />

      <CardContent className="pt-5">
        <PutCallRatioTable isDataLoading={isLoading} data={pcrData} />
      </CardContent>
    </Card>
  );
};
