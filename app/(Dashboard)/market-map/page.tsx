"use client";

import { Divider } from "@/app/_components/Divider";
import { TVHeatMap } from "@/app/_components/TVHeatMap";
import { ThumbHeading } from "@/app/_components/ThumbHeading";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function SwingSection() {
  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-4">
        <ThumbHeading heading="Market Info" />
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h4>Stock Heat-Map</h4>
            </div>
          </CardHeader>
          <Divider direction="horizontal" size="small" variant="dark" />

          {/* <CardContent> */}
          <div className="box-border h-[600px]">
            <TVHeatMap />
          </div>
          {/* </CardContent> */}
        </Card>
      </div>
    </div>
  );
}
