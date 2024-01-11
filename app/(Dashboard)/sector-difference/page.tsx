"use client";

import { useEffect, useState } from "react";
import { CellContext } from "@tanstack/react-table";

import { DataCard } from "@/app/_components/DataCard";
import {
  cn,
  createColumns,
  createNegPosDataset,
  framesInterval,
} from "@/lib/utils";
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
import { POLLING_INTERVAL } from "@/app/_globals/constant";

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
        {(prop.row.original.param_2).toFixed(2)}%
      </span>
    );
  },
};

const Nifty50 = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      nifty50().then((res) => {
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
      heading="NIFTY 50"
      data={tableData}
      loading={!tableData.length}
      columns={columns}
    />
  );
};

const BankNifty = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      bankNifty().then((res) => {
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
      heading="BANKNIFTY"
      data={tableData}
      loading={!tableData.length}
      columns={columns}
    />
  );
};

const NiftyAuto = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      niftyAuto().then((res) => {
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
      heading="NIFTYAUTO"
      data={tableData}
      loading={!tableData.length}
      columns={columns}
    />
  );
};

const NiftyFinServ = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      niftyFinServ().then((res) => {
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
      heading="NIFTY FIN-SERV"
      data={tableData}
      loading={!tableData.length}
      columns={columns}
    />
  );
};

const NiftyFMCG = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      niftyFMCG().then((res) => {
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
      heading="NIFTY FMCG"
      data={tableData}
      loading={!tableData.length}
      columns={columns}
    />
  );
};

const NiftyIT = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      niftyIT().then((res) => {
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
      heading="NIFTY IT"
      data={tableData}
      loading={!tableData.length}
      columns={columns}
    />
  );
};

const NiftyEnergy = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      niftyEnergy().then((res) => {
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
      heading="NIFTY ENERGY"
      data={tableData}
      loading={!tableData.length}
      columns={columns}
    />
  );
};

const NiftyMetal = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      niftyMetal().then((res) => {
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
      heading="NIFTY METAL"
      data={tableData}
      loading={!tableData.length}
      columns={columns}
    />
  );
};

const NiftyPharma = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      niftyPharma().then((res) => {
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
      heading="NIFTY PHARMA"
      data={tableData}
      loading={!tableData.length}
      columns={columns}
    />
  );
};

const NiftyMedia = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      niftyMedia().then((res) => {
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
      heading="NIFTY MEDIA"
      data={tableData}
      loading={!tableData.length}
      columns={columns}
    />
  );
};

const NiftyPSUBanks = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      niftyPsuBanks().then((res) => {
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
      heading="NIFTY PSU BANKS"
      data={tableData}
      loading={!tableData.length}
      columns={columns}
    />
  );
};

const NiftyPvtBanks = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      niftyPvtBank().then((res) => {
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
      heading="NIFTY PVT BANKS"
      data={tableData}
      loading={!tableData.length}
      columns={columns}
    />
  );
};

const NiftyReality = () => {
  const [tableData, setTableData] = useState([]);
  const columns = createColumns([
    ["Symbol", "Stock Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "% Change"],
    ["param_3", "Aplha V"],
  ]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      niftyRealty().then((res) => {
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
      heading="NIFTY REALITY"
      data={tableData}
      loading={!tableData.length}
      columns={columns}
    />
  );
};

const SectorialDifference = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const { stop } = framesInterval(() => {
      sectorialDifference().then((res) => {
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
      heading="Sectorial Difference"
      options={sectorDifferenceChartConfig}
      dataset={createNegPosDataset(chartData, "Symbol", "param_0", 2)}
    />
  );
};

export default function SectorDifference() {
  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-4">
        <ThumbHeading heading="Heading" />
        <div className="flex flex-wrap box-border">
          <div className="flex-grow">
            <SectorialDifference />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <ThumbHeading heading="Heading" />
        <div className="flex flex-wrap box-border gap-3">
          <div className="flex-grow basis-1/3">
            <Nifty50 />
          </div>
          <div className="flex-grow basis-1/3">
            <BankNifty />
          </div>
          <div className="flex-grow basis-1/3">
            <NiftyAuto />
          </div>
          <div className="flex-grow basis-1/3">
            <NiftyFinServ />
          </div>
          <div className="flex-grow basis-1/3">
            <NiftyFMCG />
          </div>
          <div className="flex-grow basis-1/3">
            <NiftyIT />
          </div>
          <div className="flex-grow basis-1/3">
            <NiftyEnergy />
          </div>
          <div className="flex-grow basis-1/3">
            <NiftyMetal />
          </div>
          <div className="flex-grow basis-1/3">
            <NiftyPharma />
          </div>
          <div className="flex-grow basis-1/3">
            <NiftyPSUBanks />
          </div>
          <div className="flex-grow basis-1/3">
            <NiftyPvtBanks />
          </div>
          <div className="flex-grow basis-1/3">
            <NiftyReality />
          </div>
          <div className="flex-grow basis-1/3">
            <NiftyMedia />
          </div>
        </div>
      </div>
    </div>
  );
}
