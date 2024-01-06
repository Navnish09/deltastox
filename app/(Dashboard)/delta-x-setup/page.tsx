"use client";

import { AccessorKeyColumnDef, CellContext } from "@tanstack/react-table";
import { DataCard } from "@/app/_components/DataCard";
import {
  cn,
  createBasicDataset,
  createColumns,
  createNegPosDataset,
  framesInterval,
} from "@/lib/utils";
import { ThumbHeading } from "@/app/_components/ThumbHeading";
import { useEffect, useState } from "react";
import { downsideIntradayData } from "@/lib/data/downsideIntraday";
import {
  FiveMinMomemtum,
  downsideIntraday,
  downsideSwing,
  preMarketData,
  upsideIntraday,
  upsideSwing,
  volumeContraction,
} from "@/services/apiServices";
import { POLLING_INTERVAL } from "@/app/_globals/constant";
import { BasicChartCard } from "@/app/_components/BasicChartCard";
import { preMarketDataChartConfig } from "@/lib/data/chartConfigs/preMarketData";
import { fiveMinuteMomentumChartConfig } from "@/lib/data/chartConfigs";

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
    const { stop } = framesInterval(() => {
      downsideIntraday().then((res) => {
        setTableData(res.data.data);
      });
    }, POLLING_INTERVAL);

    return () => {
      stop();
    };
  }, []);

  return (
    <DataCard
      loading={!tableData.length}
      templates={templates}
      heading="DOWNSIDE INTRADAY"
      data={tableData}
      columns={columns}
    />
  );
};

const UpsideIntraday = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Name"],
    ["param_0", "Change"],
    ["param_1", "Price"],
    ["param_2", "Volume"],
    ["param_3", "Date"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      upsideIntraday().then((res) => {
        setTableData(res.data.data);
      });
    }, POLLING_INTERVAL);

    return () => {
      stop();
    };
  }, []);

  return (
    <DataCard
      loading={!tableData.length}
      templates={templates}
      heading="UPSIDE INTRADAY"
      data={tableData}
      columns={columns}
    />
  );
};

const UpdiseSwing = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Name"],
    ["param_0", "Change"],
    ["param_1", "Price"],
    ["param_2", "Volume"],
    ["param_3", "Date"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      upsideSwing().then((res) => {
        setTableData(res.data.data);
      });
    }, POLLING_INTERVAL);

    return () => {
      stop();
    };
  }, []);

  return (
    <DataCard
      loading={!tableData.length}
      templates={templates}
      heading="UPSIDE SWING"
      data={tableData}
      columns={columns}
    />
  );
};

const DownsideSwing = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Name"],
    ["param_0", "Change"],
    ["param_1", "Price"],
    ["param_2", "Volume"],
    ["param_3", "Date"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      downsideSwing().then((res) => {
        setTableData(res.data.data);
      });
    }, POLLING_INTERVAL);

    return () => {
      stop();
    };
  }, []);

  return (
    <DataCard
      loading={!tableData.length}
      templates={templates}
      heading="DOWNSIDE SWING"
      data={tableData}
      columns={columns}
    />
  );
};

const VolumeContraction = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Name"],
    ["param_0", "Change"],
    ["param_1", "Price"],
    ["param_2", "Volume"],
    ["param_3", "Date"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      volumeContraction().then((res) => {
        setTableData(res.data.data);
      });
    }, POLLING_INTERVAL);

    return () => {
      stop();
    };
  }, []);

  return (
    <DataCard
      loading={!tableData.length}
      templates={templates}
      heading="VOLUME CONTRACTION"
      data={tableData}
      columns={columns}
    />
  );
};

const SectorialDifference = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      preMarketData().then((res) => {
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
      heading="Pre Market Data"
      options={preMarketDataChartConfig}
      dataset={createNegPosDataset(chartData, "Symbol", "param_0", 2)}
    />
  );
};


const FiveMinuteMomemtum = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      FiveMinMomemtum().then((res) => {
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
      heading="5-Min Momentum"
      options={fiveMinuteMomentumChartConfig}
      dataset={createBasicDataset(chartData, "Symbol", "param_0", 1)}
    />
  );
};

export default function DeltaXSetup() {
  return (
    <div className="flex flex-col gap-20">
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
