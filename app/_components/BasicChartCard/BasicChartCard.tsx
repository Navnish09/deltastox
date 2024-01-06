import React, { useMemo, useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DatasetComponentOption } from "echarts/components";
import type { EChartsOption } from "echarts/types/dist/shared";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { Search } from "@/app/_icons";
import EChart from "@/components/ui/chart";
import { LoadingSpinner } from "@/components/ui/loader";

type Props<TData, TValue> = {
  heading: string;
  loading?: boolean;
  dataset: DatasetComponentOption[];
  options: EChartsOption;
  height?: number;
};

export const BasicChartCard = <TData, TValue>({
  heading,
  options,
  dataset,
  height = 500,
  loading,
}: Props<TData, TValue>) => {
  return (
    <div className="flex flex-col w-full">
      <Card className="relative z-10" gradient="primary">
        <CardHeader>
          <h5 className="w-4/12">{heading}</h5>
        </CardHeader>

        <CardContent>
          <div style={{ height }}>
            {loading ? (
              <div className="flex justify-center items-center h-full w-full">
                <LoadingSpinner />
              </div>
            ) : (
              <EChart option={options} dataset={dataset} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicChartCard;
