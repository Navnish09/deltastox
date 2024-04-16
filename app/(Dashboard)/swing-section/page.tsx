"use client";

import { CellContext } from "@tanstack/react-table";
import { DataCard } from "@/app/_components/DataCard";
import { cn, createColumns, createNegPosDataset } from "@lib/utils";
import { ThumbHeading } from "@/app/_components/ThumbHeading";
import {
  heavyWeightIndex,
  longTermSwingBuy,
  longTermSwingSell,
  shortTermSwingBuy,
  shortTermSwingSell,
} from "@/services/apiServices";
import { BasicChartCard } from "@/app/_components/BasicChartCard";
import { heavyWeightIndexChartConfig } from "@lib/data/chartConfigs/heavyWeightIndex";
import { useAPI } from "@/app/_globals/hooks/useAPI";

type dataType = {
  Symbol: string;
  param_0: number;
  param_1: number;
  param_2: number;
  param_3: string;
  param_4: string;
};

const templates = {
  param_2: (prop: CellContext<dataType, any>) => {
    return (
      <span
        className={cn("text-sm font-semibold", {
          ["text-success"]: +prop.row.original.param_2 > 0,
          ["text-destructive"]: +prop.row.original.param_2 < 0,
        })}
      >
        {prop.row.original.param_2.toFixed(2)}%
      </span>
    );
  },
};

const ShortTermSwingBuy = () => {
  const { data: tableData } = useAPI({
    requestHandler: shortTermSwingBuy,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Sector"],
    ["param_4", "Date & Time"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="SHORT TERM SWING (BUY)"
      data={tableData}
      loading={!tableData?.length}
      columns={columns}
    />
  );
};

const ShortTermSwingSell = () => {
  const { data: tableData } = useAPI({
    requestHandler: shortTermSwingSell,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Sector"],
    ["param_4", "Date & Time"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="SHORT TERM SWING (SELL)"
      data={tableData}
      loading={!tableData?.length}
      columns={columns}
    />
  );
};

const LongTermSwingBuy = () => {
  const { data: tableData } = useAPI({
    requestHandler: longTermSwingBuy,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Sector"],
    ["param_4", "Date & Time"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="LONG TERM SWING (BUY)"
      data={tableData}
      loading={!tableData?.length}
      columns={columns}
    />
  );
};

const LongTermSwingSell = () => {
  const { data: tableData } = useAPI({
    requestHandler: longTermSwingSell,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Sector"],
    ["param_4", "Date & Time"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="LONG TERM SWING (SELL)"
      data={tableData}
      loading={!tableData?.length}
      columns={columns}
    />
  );
};

const HeavyWeightIndex = () => {
  const { data: chartData } = useAPI({
    requestHandler: heavyWeightIndex,
    polling: true,
  });

  return (
    <BasicChartCard
      loading={!chartData?.length}
      heading="Heavy Weight Index (Swing)"
      options={heavyWeightIndexChartConfig}
      dataset={createNegPosDataset(chartData, "Symbol", "param_0", 2)}
    />
  );
};

export default function SwingSection() {
  return (
    <div className="flex flex-col gap-20 py-5">
      <div className="flex flex-col gap-4">
        <ThumbHeading heading="Heading" />
        <div className="flex flex-wrap box-border">
          <HeavyWeightIndex />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <ThumbHeading heading="Heading" />
        <div className="flex flex-wrap box-border gap-3">
          <div className="flex-grow md:basis-1/3 basis-full max-w-full">
            <ShortTermSwingBuy />
          </div>
          <div className="flex-grow md:basis-1/3 basis-full max-w-full">
            <ShortTermSwingSell />
          </div>
          <div className="flex-grow md:basis-1/3 basis-full max-w-full">
            <LongTermSwingBuy />
          </div>
          <div className="flex-grow md:basis-1/3 basis-full max-w-full">
            <LongTermSwingSell />
          </div>
        </div>
      </div>
    </div>
  );
}
