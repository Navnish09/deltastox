"use client";

import { CellContext } from "@tanstack/react-table";
import { DataCard } from "@/app/_components/DataCard";
import {
  cn,
  createColumns,
  createNegPosDataset,
  framesInterval,
} from "@/lib/utils";
import { ThumbHeading } from "@/app/_components/ThumbHeading";
import { useEffect, useState } from "react";
import {
  heavyWeightIndex,
  longTermSwingBuy,
  longTermSwingSell,
  shortTermSwingBuy,
  shortTermSwingSell,
} from "@/services/apiServices";
import { BasicChartCard } from "@/app/_components/BasicChartCard";
import { sectorDifferenceChartConfig } from "@/lib/data/chartConfigs";
import { heavyWeightIndexChartConfig } from "@/lib/data/chartConfigs/heavyWeightIndex";
import { POLLING_INTERVAL } from "@/app/_globals/constant";

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
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Sector"],
    ["param_4", "Date & Time"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      shortTermSwingBuy().then((res) => {
        setTableData(res.data.data);
      });
    }, POLLING_INTERVAL);

    return () => {
      stop();
    };
  }, []);

  return (
    <DataCard
      templates={templates}
      heading="SHORT TERM SWING (BUY)"
      data={tableData}
      loading={!tableData.length}
      columns={columns}
    />
  );
};

const ShortTermSwingSell = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Sector"],
    ["param_4", "Date & Time"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      shortTermSwingSell().then((res) => {
        setTableData(res.data.data);
      });
    }, POLLING_INTERVAL);

    return () => {
      stop();
    };
  }, []);

  return (
    <DataCard
      templates={templates}
      heading="SHORT TERM SWING (SELL)"
      data={tableData}
      loading={!tableData.length}
      columns={columns}
    />
  );
};

const LongTermSwingBuy = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Sector"],
    ["param_4", "Date & Time"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      longTermSwingBuy().then((res) => {
        setTableData(res.data.data);
      });
    }, POLLING_INTERVAL);

    return () => {
      stop();
    };
  }, []);

  return (
    <DataCard
      templates={templates}
      heading="LONG TERM SWING (BUY)"
      data={tableData}
      loading={!tableData.length}
      columns={columns}
    />
  );
};

const LongTermSwingSell = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Sector"],
    ["param_4", "Date & Time"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      longTermSwingSell().then((res) => {
        setTableData(res.data.data);
      });
    }, POLLING_INTERVAL);

    return () => {
      stop();
    };
  }, []);

  return (
    <DataCard
      templates={templates}
      heading="LONG TERM SWING (SELL)"
      data={tableData}
      loading={!tableData.length}
      columns={columns}
    />
  );
};

const HeavyWeightIndex = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      heavyWeightIndex().then((res) => {
        setChartData(res.data.data);
      });
    }, POLLING_INTERVAL);

    return () => {
      stop();
    };
  }, []);

  return (
    <BasicChartCard
      loading={!chartData.length}
      heading="Heavy Weight Index (Swing)"
      options={heavyWeightIndexChartConfig}
      dataset={createNegPosDataset(chartData, "Symbol", "param_0", 2)}
    />
  );
};

export default function SwingSection() {
  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-4">
        <ThumbHeading heading="Heading" />
        <div className="flex flex-wrap box-border">
          <div className="flex-grow">
            <HeavyWeightIndex />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <ThumbHeading heading="Heading" />
        <div className="flex flex-wrap box-border gap-3">
          <div className="flex-grow basis-1/3">
            <ShortTermSwingBuy />
          </div>
          <div className="flex-grow basis-1/3">
            <ShortTermSwingSell />
          </div>
          <div className="flex-grow basis-1/3">
            <LongTermSwingBuy />
          </div>
          <div className="flex-grow basis-1/3">
            <LongTermSwingSell />
          </div>
        </div>
      </div>
    </div>
  );
}
