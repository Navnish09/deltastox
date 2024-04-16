"use client";

import { DataTable } from "@/components/ui/data-table";
import { createColumns } from "@lib/utils";
import { PCRFilters, OIData } from "./PutCallRatio";

export const PutCallRatioTable = ({
  data,
  isDataLoading,
}: {
  data: OIData[];
  isDataLoading: boolean;
}) => {
  const columns = createColumns([
    ["time", "Time"],
    ["created_at", "Created At"],
    ["expiry_date", "Expiry Date"],
    ["pcr", "PCR"],
    ["index_close", "Index Close"],
  ] as const);

  // const templates = createTemplates(columns, {
  //   direction: (prop) => {
  //     return <NegPosTemplate value={+prop.row.original.change_in_direction} />;
  //   },
  //   change_in_direction: (prop) => {
  //     return (
  //       <NegativePositiveText value={+prop.row.original.change_in_direction} />
  //     );
  //   },
  //   diff_in_oi: (prop) => {
  //     return <NegativePositiveText value={+prop.row.original.diff_in_oi} />;
  //   },
  // });

  return <DataTable loading={isDataLoading} columns={columns} data={data} />;
};
