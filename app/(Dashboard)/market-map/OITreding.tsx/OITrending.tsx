"use client";

import { useState } from "react";

import { Divider } from "@/app/_components/Divider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loader";

import { OITrendingFilters } from "./OITredingFilters";
import { OITrendingTable } from "./OITrendingTable";

export type FilterParams = {
  symbol: string;
  expiry_date: string;
  strike_price: number;
  interval: number;
};

export const OITrending = () => {
  const [filters, setFilters] = useState<FilterParams>({
    symbol : "",
    expiry_date: "",
    strike_price: 0,
    interval: 5,
  });

  const areFiltersReady =
    filters?.symbol &&
    filters?.interval &&
    filters?.expiry_date &&
    filters?.strike_price;

  return (
    <Card gradient="primary">
      <CardHeader>
        <OITrendingFilters filters={filters} setFilters={setFilters} />
      </CardHeader>
      <Divider direction="horizontal" size="small" variant="dark" />

      <CardContent className="pt-5">
        {!areFiltersReady ? (
          <div className="flex justify-center items-center h-full w-full  min-h-[500px]">
            <LoadingSpinner />
          </div>
        ) : (
          <OITrendingTable filters={filters} />
        )}
      </CardContent>
    </Card>
  );
};
