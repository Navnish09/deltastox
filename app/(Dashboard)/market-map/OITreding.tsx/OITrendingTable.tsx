"use client";

import { useMemo } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { DataTable } from "@/components/ui/data-table";
import { NegativePositiveText } from "@/lib/templates";
import { cn } from "@/lib/utils";
import { FilterParams } from "./OITrending";
import { createTemplates } from "@/lib/utils/createTemplates";
import { useAPI } from "@/app/_globals/hooks/useAPI";
import { trendingOIData } from "@/services/apiServices/oiAnalysis";
import { TableHeightWrapper } from "@/components/ui/table";
import { trendingOIColumns } from "@/lib/data/columns";

const NegPosTemplate = ({ value }: { value: number }) => {
  const isNegative = value < 0;
  return (
    <div className="flex px-6">
      <span
        className={cn("rounded-sm p-1.5", {
          ["bg-success"]: !isNegative,
          ["bg-destructive"]: isNegative,
        })}
      >
        {isNegative ? (
          <TrendingDown height={18} width={18} />
        ) : (
          <TrendingUp height={18} width={18} />
        )}
      </span>
    </div>
  );
};

export const OITrendingTable = ({ filters }: { filters: FilterParams }) => {
  const queryParams = useMemo(() => {
    return {
      symbol: filters.symbol,
      expiry_date: filters.expiry_date,
      strike_price: filters.strike_price,
      interval: filters.interval,
    };
  }, [
    filters.symbol,
    filters.expiry_date,
    filters.strike_price,
    filters.interval,
  ]);

  const { data: tableData, isLoading } = useAPI({
    requestHandler: trendingOIData,
    params: queryParams,
    returnData: (res) => res.data.resultData,
    polling: true,
  });

  const templates = createTemplates(trendingOIColumns, {
    direction: (prop) => {
      return <NegPosTemplate value={+prop.row.original.change_in_direction} />;
    },
    change_in_direction: (prop) => {
      return (
        <NegativePositiveText value={+prop.row.original.change_in_direction} />
      );
    },
    diff_in_oi: (prop) => {
      return <NegativePositiveText value={+prop.row.original.diff_in_oi} />;
    },
  });

  return (
    <TableHeightWrapper height={600}>
      {(heightRef) => (
        <DataTable
          pagination={false}
          loading={isLoading}
          columns={trendingOIColumns}
          heightRef={heightRef}
          data={tableData || []}
          templates={templates}
        />
      )}
    </TableHeightWrapper>
  );
};
