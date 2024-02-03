"use client";

import { useEffect, useState } from "react";

import { CellContext } from "@tanstack/react-table";

import { DataCard } from "@/app/_components/DataCard";
import {
  cn,
  createBasicDataset,
  createColumns,
  createNegPosDataset,
  framesInterval,
} from "@/lib/utils";
import { ThumbHeading } from "@/app/_components/ThumbHeading";
import {
  fiveMinMomemtum,
  downsideIntraday,
  downsideSwing,
  preMarketData,
  upsideIntraday,
  upsideSwing,
  volumeContraction,
} from "@/services/apiServices";
import { BasicChartCard } from "@/app/_components/BasicChartCard";
import { preMarketDataChartConfig } from "@/lib/data/chartConfigs/preMarketData";
import { fiveMinuteMomentumChartConfig } from "@/lib/data/chartConfigs";
import { useAPI } from "@/app/_globals/hooks/useAPI";

type dataType = {
  Symbol: string;
  param_0: number;
  param_1: number;
  param_2: number;
  param_3: number;
};

const templates = {
  param_0: (prop: CellContext<dataType, any>) => {
    return (
      <span
        className={cn("text-sm font-semibold", {
          ["text-success"]: +prop.row.original.param_0 > 0,
          ["text-destructive"]: +prop.row.original.param_0 < 0,
        })}
      >
        {prop.row.original.param_0.toFixed(2)}%
      </span>
    );
  },
};

const DownsideIntraday = () => {
  const { data: tableData } = useAPI({
    requestHandler: downsideIntraday,
    polling: true,
  });
  const columns = createColumns([
    ["Symbol", "Name"],
    ["param_0", "Change"],
    ["param_1", "Price"],
    ["param_2", "Volume"],
    ["param_3", "Date"],
  ]);

  return (
    <DataCard
      loading={!tableData?.length}
      templates={templates}
      heading="DOWNSIDE INTRADAY"
      data={tableData}
      columns={columns}
    />
  );
};

const UpsideIntraday = () => {
  const { data: tableData } = useAPI({
    requestHandler: upsideIntraday,
    polling: true,
  });
  const columns = createColumns([
    ["Symbol", "Name"],
    ["param_0", "Change"],
    ["param_1", "Price"],
    ["param_2", "Volume"],
    ["param_3", "Date"],
  ]);

  return (
    <DataCard
      loading={!tableData?.length}
      templates={templates}
      heading="UPSIDE INTRADAY"
      data={tableData}
      columns={columns}
    />
  );
};

const UpdiseSwing = () => {
  const { data: tableData } = useAPI({
    requestHandler: upsideSwing,
    polling: true,
  });
  const columns = createColumns([
    ["Symbol", "Name"],
    ["param_0", "Change"],
    ["param_1", "Price"],
    ["param_2", "Volume"],
    ["param_3", "Date"],
  ]);

  return (
    <DataCard
      loading={!tableData?.length}
      templates={templates}
      heading="UPSIDE SWING"
      data={tableData}
      columns={columns}
    />
  );
};

const DownsideSwing = () => {
  const { data: tableData } = useAPI({
    requestHandler: downsideSwing,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Name"],
    ["param_0", "Change"],
    ["param_1", "Price"],
    ["param_2", "Volume"],
    ["param_3", "Date"],
  ]);

  return (
    <DataCard
      loading={!tableData?.length}
      templates={templates}
      heading="DOWNSIDE SWING"
      data={tableData}
      columns={columns}
    />
  );
};

const VolumeContraction = () => {
  const { data: tableData } = useAPI({
    requestHandler: volumeContraction,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Name"],
    ["param_0", "Change"],
    ["param_1", "Price"],
    ["param_2", "Volume"],
    ["param_3", "Date"],
  ]);

  return (
    <DataCard
      loading={!tableData?.length}
      templates={templates}
      heading="VOLUME CONTRACTION"
      data={tableData}
      columns={columns}
    />
  );
};

const SectorialDifference = () => {
  const { data: chartData } = useAPI({
    requestHandler: preMarketData,
    polling: true,
  });

  return (
    <BasicChartCard
      loading={!chartData?.length}
      heading="Pre Market Data"
      options={preMarketDataChartConfig}
      dataset={createNegPosDataset(chartData, "Symbol", "param_0", 2)}
    />
  );
};

const FiveMinuteMomemtum = () => {
  const { data: chartData } = useAPI({
    requestHandler: fiveMinMomemtum,
    polling: true,
  });

  return (
    <BasicChartCard
      loading={!chartData?.length}
      heading="5-Min Momentum"
      options={fiveMinuteMomentumChartConfig}
      dataset={createBasicDataset(chartData, "Symbol", "param_0", 1)}
    />
  );
};

export default function DeltaXSetup() {
  return (
    <div className="flex flex-col gap-20 py-5">
      <div className="flex flex-col gap-4">
        <ThumbHeading heading="Heading" />
        <div className="flex flex-wrap box-border gap-3">
          <div className="flex-grow basis-1/3">
            <SectorialDifference />
          </div>
          <div className="flex-grow basis-1/3">
            <FiveMinuteMomemtum />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <ThumbHeading heading="Heading" />
        <div className="flex flex-wrap box-border gap-3">
          <div className="flex-grow basis-1/3">
            <DownsideIntraday />
          </div>
          <div className="flex-grow basis-1/3">
            <UpsideIntraday />
          </div>
          <div className="flex-grow basis-1/3">
            <UpdiseSwing />
          </div>
          <div className="flex-grow basis-1/3">
            <DownsideSwing />
          </div>
          <div className="flex-grow basis-1/3">
            <VolumeContraction />
          </div>
        </div>
      </div>
    </div>
  );
}
