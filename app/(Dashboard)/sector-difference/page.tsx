"use client";

import { CellContext } from "@tanstack/react-table";

import { DataCard } from "@/app/_components/DataCard";
import { cn, createColumns, createNegPosDataset } from "@/lib/utils";
import { ThumbHeading } from "@/app/_components/ThumbHeading";
import {
  bankNifty,
  nifty50,
  niftyAuto,
  niftyEnergy,
  niftyFMCG,
  niftyFinServ,
  niftyIT,
  niftyMedia,
  niftyMetal,
  niftyPharma,
  niftyPsuBanks,
  niftyPvtBank,
  niftyRealty,
  sectorialDifference,
} from "@/services/apiServices";
import { BasicChartCard } from "@/app/_components/BasicChartCard";
import { sectorDifferenceChartConfig } from "@/lib/data/chartConfigs";
import { useAPI } from "@/app/_globals/hooks/useAPI";

type dataType = {
  Symbol: string;
  param_0: number;
  param_1: number;
  param_2: number;
  param_3: number;
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

const Nifty50 = () => {
  const { data: tableData } = useAPI({
    requestHandler: nifty50,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="NIFTY 50"
      data={tableData}
      loading={!tableData?.length}
      columns={columns}
    />
  );
};

const BankNifty = () => {
  const { data: tableData } = useAPI({
    requestHandler: bankNifty,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="BANKNIFTY"
      data={tableData}
      loading={!tableData?.length}
      columns={columns}
    />
  );
};

const NiftyAuto = () => {
  const { data: tableData } = useAPI({
    requestHandler: niftyAuto,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="NIFTYAUTO"
      data={tableData}
      loading={!tableData?.length}
      columns={columns}
    />
  );
};

const NiftyFinServ = () => {
  const { data: tableData } = useAPI({
    requestHandler: niftyFinServ,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="NIFTY FIN-SERV"
      data={tableData}
      loading={!tableData?.length}
      columns={columns}
    />
  );
};

const NiftyFMCG = () => {
  const { data: tableData } = useAPI({
    requestHandler: niftyFMCG,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="NIFTY FMCG"
      data={tableData}
      loading={!tableData?.length}
      columns={columns}
    />
  );
};

const NiftyIT = () => {
  const { data: tableData } = useAPI({
    requestHandler: niftyIT,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="NIFTY IT"
      data={tableData}
      loading={!tableData?.length}
      columns={columns}
    />
  );
};

const NiftyEnergy = () => {
  const { data: tableData } = useAPI({
    requestHandler: niftyEnergy,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="NIFTY ENERGY"
      data={tableData}
      loading={!tableData?.length}
      columns={columns}
    />
  );
};

const NiftyMetal = () => {
  const { data: tableData } = useAPI({
    requestHandler: niftyMetal,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="NIFTY METAL"
      data={tableData}
      loading={!tableData?.length}
      columns={columns}
    />
  );
};

const NiftyPharma = () => {
  const { data: tableData } = useAPI({
    requestHandler: niftyPharma,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="NIFTY PHARMA"
      data={tableData}
      loading={!tableData?.length}
      columns={columns}
    />
  );
};

const NiftyMedia = () => {
  const { data: tableData } = useAPI({
    requestHandler: niftyMedia,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="NIFTY MEDIA"
      data={tableData}
      loading={!tableData?.length}
      columns={columns}
    />
  );
};

const NiftyPSUBanks = () => {
  const { data: tableData } = useAPI({
    requestHandler: niftyPsuBanks,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="NIFTY PSU BANKS"
      data={tableData}
      loading={!tableData?.length}
      columns={columns}
    />
  );
};

const NiftyPvtBanks = () => {
  const { data: tableData } = useAPI({
    requestHandler: niftyPvtBank,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="NIFTY PVT BANKS"
      data={tableData}
      loading={!tableData?.length}
      columns={columns}
    />
  );
};

const NiftyReality = () => {
  const { data: tableData } = useAPI({
    requestHandler: niftyRealty,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="NIFTY REALITY"
      data={tableData}
      loading={!tableData?.length}
      columns={columns}
    />
  );
};

const SectorialDifference = () => {
  const { data: chartData } = useAPI({
    requestHandler: sectorialDifference,
    polling: true,
  });

  return (
    <BasicChartCard
      loading={!chartData?.length}
      heading="Sectorial Difference"
      options={sectorDifferenceChartConfig}
      dataset={createNegPosDataset(chartData, "Symbol", "param_0", 2)}
    />
  );
};

export default function SectorDifference() {
  return (
    <div className="flex flex-col gap-20 py-5">
      <div className="flex flex-col gap-4">
        <ThumbHeading heading="Heading" />
        <div className="flex flex-wrap box-border">
          <SectorialDifference />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <ThumbHeading heading="Heading" />
        <div className="flex flex-wrap box-border gap-3">
          <div className="flex-grow md:basis-1/3 max-w-full">
            <Nifty50 />
          </div>
          <div className="flex-grow md:basis-1/3 max-w-full">
            <BankNifty />
          </div>
          <div className="flex-grow md:basis-1/3 max-w-full">
            <NiftyAuto />
          </div>
          <div className="flex-grow md:basis-1/3 max-w-full">
            <NiftyFinServ />
          </div>
          <div className="flex-grow md:basis-1/3 max-w-full">
            <NiftyFMCG />
          </div>
          <div className="flex-grow md:basis-1/3 max-w-full">
            <NiftyIT />
          </div>
          <div className="flex-grow md:basis-1/3 max-w-full">
            <NiftyEnergy />
          </div>
          <div className="flex-grow md:basis-1/3 max-w-full">
            <NiftyMetal />
          </div>
          <div className="flex-grow md:basis-1/3 max-w-full">
            <NiftyPharma />
          </div>
          <div className="flex-grow md:basis-1/3 max-w-full">
            <NiftyPSUBanks />
          </div>
          <div className="flex-grow md:basis-1/3 max-w-full">
            <NiftyPvtBanks />
          </div>
          <div className="flex-grow md:basis-1/3 max-w-full">
            <NiftyReality />
          </div>
          <div className="flex-grow md:basis-1/3 max-w-full">
            <NiftyMedia />
          </div>
        </div>
      </div>
    </div>
  );
}
