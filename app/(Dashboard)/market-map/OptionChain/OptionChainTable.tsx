"use client";

import { TrendingDown, TrendingUp } from "lucide-react";

import { DataTable } from "@/components/ui/data-table";
import { NegativePositiveText } from "@/lib/templates";
import { cn, createColumns } from "@lib/utils";
import { OptionChainData, OptionChainFilters } from "./OptionChain";
import { createTemplates } from "@lib/utils/createTemplates";
import { Badge } from "@/components/ui/badge";
import { TableHeightWrapper } from "@/components/ui/table";

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

export const OptionChainTable = ({
  filters,
  data,
  isDataLoading,
}: {
  filters: OptionChainFilters;
  data: OptionChainData[];
  isDataLoading?: boolean;
}) => {
  // const queryParams = useMemo(() => {
  //   return {
  //     symbol: filters.symbol,
  //     expiry_date: filters.expiry_date,
  //   };
  // }, [filters.symbol, filters.expiry_date]);

  // const { data: tableData, isLoading } = useAPI({
  //   requestHandler: getOptionChain,
  //   params: queryParams,
  //   returnData: (res) => res.data.resultData,
  //   polling: true,
  // });

  const columns = createColumns([
    ["calls_iv", "IV"],
    ["calls_ltp", "LTP"],
    ["strike_price", "Strike"],
    ["puts_ltp", "LTP"],
    ["puts_iv", "IV"],
    // ["direction", "Dir. of Change"],
    // ["change_in_direction", "Change in Dir."],
    // ["pcr", "PCR"],
    // ["change_in_oi_pcr", "COI PCR"],
    // ["volume_pcr", "Vol. PCR"],
  ] as const);

  const templates = createTemplates(columns, {
    strike_price: (prop) => {
      return (
        <Badge variant={"secondary"}>{prop.row.original.strike_price}</Badge>
      );
    },
    // change_in_direction: (prop) => {
    //   return (
    //     <NegativePositiveText value={+prop.row.original.change_in_direction} />
    //   );
    // },
    // diff_in_oi: (prop) => {
    //   return <NegativePositiveText value={+prop.row.original.diff_in_oi} />;
    // },
  });

  return (
    <TableHeightWrapper height={600}>
      {(heightRef) => (
        <DataTable
          pagination={false}
          loading={isDataLoading}
          heightRef={heightRef}
          columns={columns}
          data={data || []}
          templates={templates}
          align="center"
        />
      )}
    </TableHeightWrapper>
  );
};
