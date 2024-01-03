"use client";

import { AccessorKeyColumnDef, CellContext } from "@tanstack/react-table";
import { DataCard } from "@/app/_components/DataCard";
import { cn, createColumns } from "@/lib/utils";
import { ThumbHeading } from "@/app/_components/ThumbHeading";
import { useEffect, useState } from "react";
import { downsideIntradayData } from "@/lib/data/downsideIntraday";
import { upsideIntradayData } from "@/lib/data/upsideIntraday";
import { upsideSwingData } from "@/lib/data/upsideSwing";
import { downsideSwingData } from "@/lib/data/downsideSwing";
import { volumeContractionData } from "@/lib/data/volumeContraction";
import { downsideIntraday } from "@/services/apiServices/proSetup";

const templates = {
  param_0: (prop: CellContext<(typeof downsideIntradayData)[0], any>) => {
    return (
      <span
        className={cn("text-sm font-semibold", {
          ["text-success"]: +prop.row.original.param_0 > 0,
          ["text-destructive"]: +prop.row.original.param_0 < 0,
        })}
      >
        {(prop.row.original.param_0 * 100).toFixed(1)}%
      </span>
    );
  },
};

const DownsideIntraday = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Name"],
    ["param_0", "Change"],
    ["param_1", "Price"],
    ["param_2", "Volume"],
    ["param_3", "Date"],
  ]);

  useEffect(() => {
    downsideIntraday().then((res) => {
      setTableData(res.data.data);
    });
  }, []);

  return (
    <DataCard
      templates={templates}
      heading="DOWNSIDE INTRADAY"
      data={tableData}
      columns={columns}
    />
  );
};

const UpsideIntraday = () => {
  const [tableData, setTableData] = useState<any>(upsideIntradayData);
  const columns = createColumns([
    ["Symbol", "Name"],
    ["param_0", "Change"],
    ["param_1", "Price"],
    ["param_2", "Volume"],
    ["param_3", "Date"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="DOWNSIDE INTRADAY"
      data={tableData}
      columns={columns}
    />
  );
};

const UpdiseSwing = () => {
  const [tableData, setTableData] = useState(upsideSwingData);
  const columns = createColumns([
    ["Symbol", "Name"],
    ["param_0", "Change"],
    ["param_1", "Price"],
    ["param_2", "Volume"],
    ["param_3", "Date"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="UPSIDE SWING"
      data={tableData}
      columns={columns}
    />
  );
};

const DownsideSwing = () => {
  const [tableData, setTableData] = useState(downsideSwingData);
  const columns = createColumns([
    ["Symbol", "Name"],
    ["param_0", "Change"],
    ["param_1", "Price"],
    ["param_2", "Volume"],
    ["param_3", "Date"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="DOWNSIDE SWING"
      data={tableData}
      columns={columns}
    />
  );
};

const VolumeContraction = () => {
  const [tableData, setTableData] = useState(volumeContractionData);
  const columns = createColumns([
    ["Symbol", "Name"],
    ["param_0", "Change"],
    ["param_1", "Price"],
    ["param_2", "Volume"],
    ["param_3", "Date"],
  ]);

  return (
    <DataCard
      templates={templates}
      heading="VOLUME CONTRACTION"
      data={tableData}
      columns={columns}
    />
  );
};

export default function DeltaXSetup() {
  return (
    <div className="flex flex-col gap-4">
      <ThumbHeading heading="Heading" />
      <div className="flex flex-wrap box-border gap-3">
        <div className="flex-grow">
          <DownsideIntraday />
        </div>
        <div className="flex-grow">
          <UpsideIntraday />
        </div>
        <div className="flex-grow">
          <UpdiseSwing />
        </div>
        <div className="flex-grow">
          <DownsideSwing />
        </div>
        <div className="flex-grow">
          <VolumeContraction />
        </div>
      </div>
    </div>
  );
}
