"use client";

import {
  AccessorKeyColumnDef,
  CellContext,
  ColumnDef,
  ColumnDefTemplate,
} from "@tanstack/react-table";
import { DataCard } from "@/app/_components/DataCard";
import { cn } from "@/lib/utils";
import { ThumbHeading } from "@/app/_components/ThumbHeading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Divider } from "@/app/_components/Divider";

const reactTableColumns: AccessorKeyColumnDef<{
  slNo: number;
  name: string;
  change: string;
  price: string;
  volume: string;
  date: string;
}>[] = [
  {
    header: "SL.No",
    accessorKey: "slNo",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "% Change",
    accessorKey: "change",
  },
  {
    header: "Price",
    accessorKey: "price",
  },
  {
    header: "Volume",
    accessorKey: "volume",
  },
  {
    header: "Date",
    accessorKey: "date",
  },
];

// Dummy data with unique values
const data = [
  {
    slNo: 1,
    name: "Apple",
    change: "20",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 2,
    name: "Apple",
    change: "30",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 3,
    name: "Apple",
    change: "15",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 4,
    name: "Apple",
    change: "22",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 5,
    name: "Apple",
    change: "10",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 6,
    name: "Apple",
    change: "5",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 7,
    name: "Apple",
    change: "21",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 8,
    name: "Apple",
    change: "18",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 4,
    name: "Apple",
    change: "-20",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 5,
    name: "Apple",
    change: "-12",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 6,
    name: "Apple",
    change: "-15",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 7,
    name: "Apple",
    change: "-22",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 8,
    name: "Apple",
    change: "-18",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 4,
    name: "Apple",
    change: "20",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 5,
    name: "Apple",
    change: "30",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 6,
    name: "Apple",
    change: "12",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 7,
    name: "Apple",
    change: "-22",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 8,
    name: "Apple",
    change: "19",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
];

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

const templates = {
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

export default function PowerHouse() {
  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-4">
        <ThumbHeading heading="Heading" />
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3>Futures buildup</h3>
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
                  templates={templates}
                  heading="Long Build Up"
                  data={data2}
                  columns={smallChartColumns}
                />
              </div>
              <div className="flex-grow">
                <DataCard
                  templates={templates}
                  heading="Short Build Up"
                  data={data2}
                  columns={smallChartColumns}
                />
              </div>
              <div className="flex-grow">
                <DataCard
                  templates={templates}
                  heading="Profit Booking"
                  data={data2}
                  columns={smallChartColumns}
                />
              </div>
              <div className="flex-grow">
                <DataCard
                  templates={templates}
                  heading="Short Covering"
                  data={data2}
                  columns={smallChartColumns}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-4">
        <ThumbHeading heading="Heading" />
        <div className="flex flex-wrap box-border gap-3">
          <div className="flex-grow">
            <DataCard
              templates={templates}
              heading="SUPER STOCKS"
              data={data}
              columns={reactTableColumns}
            />
          </div>
          <div className="flex-grow">
            <DataCard
              templates={templates}
              heading="INTRADAY STOCKS"
              data={data}
              columns={reactTableColumns}
            />
          </div>
          <div className="flex-grow">
            <DataCard
              templates={templates}
              heading="TOP GAINERS"
              data={data}
              columns={reactTableColumns}
            />
          </div>
          <div className="flex-grow">
            <DataCard
              templates={templates}
              heading="TOP LOSERS"
              data={data}
              columns={reactTableColumns}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
