"use client";

import { AccessorKeyColumnDef, CellContext } from "@tanstack/react-table";

import { DataCard } from "@/app/_components/DataCard";
import { cn, createColumns } from "@/lib/utils";
import { ThumbHeading } from "@/app/_components/ThumbHeading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Divider } from "@/app/_components/Divider";
import {
  intradayStocks,
  superStocks,
  topGainer,
  topLoser,
} from "@/services/apiServices";
import { useAPI } from "@/app/_globals/hooks/useAPI";

const oldtemplates = {
  change: (prop: CellContext<any, any>) => {
    return (
      <span
        className={cn("text-sm font-semibold", {
          ["text-success"]: +prop.row.original.change > 0,
          ["text-destructive"]: +prop.row.original.change < 0,
        })}
      >
        {prop.row.original.change}%
      </span>
    );
  },
};

const newtemplates = {
  param_2: (prop: CellContext<any, any>) => {
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

const smallChartColumns: AccessorKeyColumnDef<{
  ticker: number;
  near: string;
  change: string;
  future: string;
  oiChange: string;
}>[] = [
  {
    header: "Ticker",
    accessorKey: "ticker",
  },
  {
    header: "Near",
    accessorKey: "near",
  },
  {
    header: "% Change",
    accessorKey: "change",
  },
  {
    header: "Future",
    accessorKey: "future",
  },
  {
    header: "OI Change",
    accessorKey: "oiChange",
  },
];

// Dummy data with unique values
const data2 = [
  {
    ticker: "ONGC",
    near: "20",
    change: "2.32",
    future: "1,000,000",
    oiChange: "22/09/2021",
  },
  {
    ticker: "ONGC",
    near: "30",
    change: "2.32",
    future: "1,000,000",
    oiChange: "22/09/2021",
  },
  {
    ticker: "ONGC",
    near: "15",
    change: "2.32",
    future: "1,000,000",
    oiChange: "22/09/2021",
  },
  {
    ticker: "ONGC",
    near: "22",
    change: "2.32",
    future: "1,000,000",
    oiChange: "22/09/2021",
  },
];

const TopGainers = () => {
  const { data: tableData } = useAPI({
    requestHandler: topGainer,
    polling: true,
  });

  const columns = createColumns([
    ["Symbol", "Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "Change (%)"],
    ["param_3", "Alpha V"],
  ]);

  return (
    <DataCard
      loading={!tableData?.length}
      templates={newtemplates}
      heading="TOP GAINERS"
      data={tableData}
      columns={columns}
    />
  );
};

const TopLosers = () => {
  const { data: tableData } = useAPI({
    requestHandler: topLoser,
    polling: true,
  });
  const columns = createColumns([
    ["Symbol", "Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "Change (%)"],
    ["param_3", "Alpha V"],
  ]);

  return (
    <DataCard
      loading={!tableData?.length}
      templates={newtemplates}
      heading="TOP LOSERS"
      data={tableData}
      columns={columns}
    />
  );
};

const SuperStocks = () => {
  const { data: tableData } = useAPI({
    requestHandler: superStocks,
    polling: true,
  });
  const columns = createColumns([
    ["Symbol", "Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "Change (%)"],
    ["param_3", "Alpha V"],
  ]);

  return (
    <DataCard
      loading={!tableData?.length}
      templates={newtemplates}
      heading="SUPER STOCKS"
      data={tableData}
      columns={columns}
    />
  );
};

const IntradayStocks = () => {
  const { data: tableData } = useAPI({
    requestHandler: intradayStocks,
    polling: true,
  });
  const columns = createColumns([
    ["Symbol", "Name"],
    ["param_0", "LTP"],
    ["param_1", "Prev-C"],
    ["param_2", "Change (%)"],
    ["param_3", "Alpha V"],
  ]);

  return (
    <DataCard
      loading={!tableData?.length}
      templates={newtemplates}
      heading="INTRADAY STOCKS"
      data={tableData}
      columns={columns}
    />
  );
};

export default function PowerHouse() {
  return (
    <div className="flex flex-col gap-14 py-5">
      {/* <div className="flex flex-col gap-4">
        <ThumbHeading heading="Heading" />
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h4>Futures buildup</h4>
              <Select value="nifty50">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="nifty50">Nifty50</SelectItem>
                    <SelectItem value="nifty100">Nifty100</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <Divider direction="horizontal" size="small" variant="dark" />

          <CardContent>
            <div className="flex flex-wrap box-border gap-4">
              <div className="flex-grow">
                <DataCard
                  templates={oldtemplates}
                  heading="Long Build Up"
                  data={data2}
                  columns={smallChartColumns}
                />
              </div>
              <div className="flex-grow">
                <DataCard
                  templates={oldtemplates}
                  heading="Short Build Up"
                  data={data2}
                  columns={smallChartColumns}
                />
              </div>
              <div className="flex-grow">
                <DataCard
                  templates={oldtemplates}
                  heading="Profit Booking"
                  data={data2}
                  columns={smallChartColumns}
                />
              </div>
              <div className="flex-grow">
                <DataCard
                  templates={oldtemplates}
                  heading="Short Covering"
                  data={data2}
                  columns={smallChartColumns}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}
      <div className="flex flex-col gap-4">
        <ThumbHeading heading="Heading" />
        <div className="flex flex-wrap box-border gap-3">
          <div className="flex-grow md:basis-1/3 basis-full max-w-full">
            <SuperStocks />
          </div>
          <div className="flex-grow md:basis-1/3 basis-full max-w-full">
            <IntradayStocks />
          </div>
          <div className="flex-grow md:basis-1/3 basis-full max-w-full">
            <TopGainers />
          </div>
          <div className="flex-grow md:basis-1/3 basis-full max-w-full">
            <TopLosers />
          </div>
        </div>
      </div>
    </div>
  );
}
