"use client";

import { useState } from "react";

import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

import { Card, CardHeader } from "@/components/ui/card";
import { ThumbHeading } from "../_components/ThumbHeading";
import { TickerTape } from "../_components/TickerTape";

const NiftyCard = () => {
  const [niftyData, setNiftyData] = useState({
    price: 0,
    change: 0,
  });

  return (
    <Card
      style={{
        background:
          "linear-gradient(-20deg, #151515 -8.88%, #09090A 48.04%, #151515 101.51%)",
      }}
    >
      <CardHeader>
        <div className="flex flex-col gap-3 items-center py-2 px-12">
          <h5>NIFTY</h5>
          <h2 className="text-destructive">19322.55</h2>
          <Card className="w-fit rounded-md">
            <span className="text-destructive flex p-1 gap-1 items-center text-xs font-semibold">
              <ArrowDownIcon height={18} width={18} /> 7.82%
            </span>
          </Card>
        </div>
      </CardHeader>
    </Card>
  );
};

const BankNiftyCard = () => {
  const [niftyData, setNiftyData] = useState({
    price: 0,
    change: 0,
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 items-center py-2 px-12">
          <h5>BANKNIFTY</h5>
          <h2 className="text-success">44,888.24</h2>
          <Card className="w-fit rounded-md">
            <span className="text-success flex p-1 gap-1 items-center text-xs font-semibold">
              <ArrowUpIcon height={18} width={18} /> 3.32%
            </span>
          </Card>
        </div>
      </CardHeader>
    </Card>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-10">
        <ThumbHeading heading="Market Info" />
        <div className="flex flex-col gap-10">
          {/* <Card> */}
          <TickerTape />
          {/* </Card> */}
          <div className="flex justify-center gap-10">
            <NiftyCard />
            <BankNiftyCard />
          </div>
        </div>
      </div>
    </div>
  );
}
