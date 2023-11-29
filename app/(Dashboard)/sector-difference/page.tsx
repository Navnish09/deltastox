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
    name: "RELIANCE",
    change: "20",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 2,
    name: "RELIANCE",
    change: "30",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 3,
    name: "RELIANCE",
    change: "15",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 4,
    name: "RELIANCE",
    change: "22",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 5,
    name: "RELIANCE",
    change: "10",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 6,
    name: "RELIANCE",
    change: "5",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 7,
    name: "RELIANCE",
    change: "21",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 8,
    name: "RELIANCE",
    change: "18",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 4,
    name: "RELIANCE",
    change: "-20",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 5,
    name: "RELIANCE",
    change: "-12",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 6,
    name: "RELIANCE",
    change: "-15",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 7,
    name: "RELIANCE",
    change: "-22",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 8,
    name: "RELIANCE",
    change: "-18",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 4,
    name: "RELIANCE",
    change: "20",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 5,
    name: "RELIANCE",
    change: "30",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 6,
    name: "RELIANCE",
    change: "12",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 7,
    name: "RELIANCE",
    change: "-22",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
  {
    slNo: 8,
    name: "RELIANCE",
    change: "19",
    price: "$148.56",
    volume: "1,000,000",
    date: "22/09/2021",
  },
];

const templates = {
  change: (prop: CellContext<(typeof data)[0], typeof reactTableColumns>) => {
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

export default function SectoDifference() {
  return (
    <div className="flex flex-col gap-4">
      <ThumbHeading heading="Heading" />
      <div className="flex flex-wrap box-border gap-2">
        <div className="flex-grow">
          <DataCard
            templates={templates}
            heading="NIFTY 50"
            data={data}
            columns={reactTableColumns}
          />
        </div>
        <div className="flex-grow">
          <DataCard
            templates={templates}
            heading="BANKNIFTY"
            data={data}
            columns={reactTableColumns}
          />
        </div>
        <div className="flex-grow">
          <DataCard
            templates={templates}
            heading="NIFTYAUTO"
            data={data}
            columns={reactTableColumns}
          />
        </div>
        <div className="flex-grow">
          <DataCard
            templates={templates}
            heading="NIFTY FIN-SERV"
            data={data}
            columns={reactTableColumns}
          />
        </div>
        <div className="NIFTY FMCG">
          <DataCard
            templates={templates}
            heading="DOWNSIDE INTRADAY"
            data={data}
            columns={reactTableColumns}
          />
        </div>
        <div className="flex-grow">
          <DataCard
            templates={templates}
            heading="NIFTY IT"
            data={data}
            columns={reactTableColumns}
          />
        </div>
        <div className="flex-grow">
          <DataCard
            templates={templates}
            heading="NIFTY ENERGY"
            data={data}
            columns={reactTableColumns}
          />
        </div>
        <div className="flex-grow">
          <DataCard
            templates={templates}
            heading="NIFTY METALS"
            data={data}
            columns={reactTableColumns}
          />
        </div>
        <div className="flex-grow">
          <DataCard
            templates={templates}
            heading="NIFTY PHARMA"
            data={data}
            columns={reactTableColumns}
          />
        </div>
        <div className="flex-grow">
          <DataCard
            templates={templates}
            heading="NIFTY PSU BANKS"
            data={data}
            columns={reactTableColumns}
          />
        </div>
        <div className="flex-grow">
          <DataCard
            templates={templates}
            heading="NIFTY PVT BANKS"
            data={data}
            columns={reactTableColumns}
          />
        </div>
        <div className="flex-grow">
          <DataCard
            templates={templates}
            heading="NIFTY REALITY "
            data={data}
            columns={reactTableColumns}
          />
        </div>
        <div className="flex-grow">
          <DataCard
            templates={templates}
            heading="NIFTY MEDIA"
            data={data}
            columns={reactTableColumns}
          />
        </div>
      </div>
    </div>
  );
}
