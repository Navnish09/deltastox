"use client";

import { Divider } from "@/app/_components/Divider";
import { TVHeatMap } from "@/app/_components/TVHeatMap";
import { ThumbHeading } from "@/app/_components/ThumbHeading";
import { Card, CardHeader } from "@/components/ui/card";
import { OITrending } from "./OITreding.tsx/OITrending";
import { PutCallRatio } from "./PutCallRatio/PutCallRatio";
import { OptionChain } from "./OptionChain/OptionChain";

const StockHeatMap = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h4>Stock Heat-Map</h4>
        </div>
      </CardHeader>
      <Divider direction="horizontal" size="small" variant="dark" />

      <div className="box-border h-[600px]">
        <TVHeatMap />
      </div>
    </Card>
  );
};

export default function SwingSection() {
  return (
    <div className="flex flex-col gap-10">
      <ThumbHeading heading="Market Info" />
      <div className="flex flex-col gap-10">
        <OITrending />
        <StockHeatMap />
        <PutCallRatio />
        <OptionChain />
      </div>
    </div>
  );
}
