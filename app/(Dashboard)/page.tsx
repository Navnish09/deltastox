"use client";

import { useState } from "react";

import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

import { Card, CardHeader } from "@/components/ui/card";
import { ThumbHeading } from "../_components/ThumbHeading";
import { TickerTape } from "../_components/TickerTape";
import MarketOverview from "../_components/MargetOverview/MarketOverview";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const NiftyCard = () => {
  const [niftyData, setNiftyData] = useState({
    price: 0,
    change: 0,
  });

  return (
    <div className="flex gap-3 items-center">
      <h5>NIFTY</h5>
      <h4 className="text-destructive">19322.55</h4>
      <Card className="w-fit rounded-md">
        <span className="text-destructive flex p-1 gap-1 items-center text-xs font-semibold">
          <ArrowDownIcon height={18} width={18} /> 7.82%
        </span>
      </Card>
    </div>
  );
};

const BankNiftyCard = () => {
  const [niftyData, setNiftyData] = useState({
    price: 0,
    change: 0,
  });

  return (
    // <Card>
    //   <CardHeader>
    <div className="flex gap-3 items-center">
      <h5>BANKNIFTY</h5>
      <h4 className="text-success">44,888.24</h4>
      <Card className="w-fit rounded-md">
        <span className="text-success flex p-1 gap-1 items-center text-xs font-semibold">
          <ArrowUpIcon height={18} width={18} /> 3.32%
        </span>
      </Card>
    </div>
    //   </CardHeader>
    // </Card>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col">
          <Card className="min-h-[45px]">
            <TickerTape />
          </Card>
        </div>
        <div className="flex item-center justify-between">
          <ThumbHeading heading="Market Info" />
          <div className="flex justify-center gap-4">
            <div className="flex gap-5">
              <NiftyCard />
              <BankNiftyCard />
            </div>
            <Separator orientation="vertical" />
            <Popover>
              <PopoverTrigger>
                <div className="p-2 hover:bg-secondary transition rounded-md">
                  <Globe />
                </div>
              </PopoverTrigger>
              <PopoverContent align="end" sideOffset={10}>
                <div className="h-[275px] w-[500px]">
                  <MarketOverview />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
