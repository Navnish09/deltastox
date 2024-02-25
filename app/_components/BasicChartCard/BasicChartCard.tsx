import React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DatasetComponentOption } from "echarts/components";
import type { EChartsOption } from "echarts/types/dist/shared";
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
  const parentRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col flex-grow w-full max-w-full overflow-hidden">
      <Card className="relative z-10" gradient="primary">
        <CardHeader>
          <h5 className="w-4/12 whitespace-nowrap">{heading}</h5>
        </CardHeader>

        <CardContent ref={parentRef}>
          <div style={{ height }}>
            {loading ? (
              <div className="flex justify-center items-center h-full w-full">
                <LoadingSpinner />
              </div>
            ) : (
              <EChart
                option={options}
                dataset={dataset}
                parentRef={parentRef.current || window}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicChartCard;
