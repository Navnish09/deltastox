"use client";

import { useState } from "react";

import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import parse from "html-react-parser";

import { Card } from "@/components/ui/card";
import { ThumbHeading } from "../_components/ThumbHeading";
import { TickerTape } from "../_components/TickerTape";
import MarketOverview from "../_components/MargetOverview/MarketOverview";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getNotifications } from "@/services/apiServices";
import { useAPI } from "../_globals/hooks/useAPI";
import { Skeleton } from "@/components/ui/skeleton";

type Message = {
  notificationId: number;
  message: string;
  notificationDate: string;
  status: string;
};

const NiftyCard = () => {
  const [niftyData, setNiftyData] = useState({
    price: 0,
    change: 0,
  });

  return (
    <div className="flex gap-3 items-center">
      <h5 className="text-xs md:text-base">NIFTY</h5>
      <h4 className="text-destructive text-sm md:text-lg">19322.55</h4>
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
      <h5 className="text-xs md:text-base">BANKNIFTY</h5>
      <h4 className="text-success text-sm md:text-lg">44,888.24</h4>
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

const Messages = () => {
  const { data: messages, isLoading } = useAPI<
    Message[],
    typeof getNotifications
  >({
    requestHandler: getNotifications,
    returnData: (res) => res.data,
    polling: true,
    interval: 5000,
  });

  const groupedMessages = messages.reduce((acc, message) => {
    const date = new Date(message.notificationDate).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {} as Record<string, Message[]>);

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="flex flex-col gap-4">
          {Object.entries(groupedMessages).map(([date, messages]) => (
            <div key={date} className="flex flex-col gap-2 relative">
              <div className="flex justify-between items-center sticky top-0 bg-background">
                <p className="text-secondary-foreground/50">Admin</p>
                <h4 className="text-xs text-primary">{date}</h4>
              </div>
              <Separator />
              <div className="flex flex-col gap-5">
                {messages.map((message) => (
                  <div
                    key={message.notificationId}
                    className="p-4 bg-secondary border-l-4 border-primary overflow-auto"
                  >
                    <div>
                      <div className="text-sm">{parse(message.message)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col md:gap-8 gap-6 relative h-full">
      <div className="flex flex-col md:gap-8 gap-6 sticky top-0">
        <div className="flex flex-col">
          <Card className="min-h-[45px]">
            <TickerTape />
          </Card>
        </div>
        <div className="flex item-center justify-between flex-wrap gap-2">
          <ThumbHeading heading="Announcement Section" color="primary" />
          <div className="flex justify-center gap-4">
            <div className="flex md:gap-5 flex-wrap">
              <NiftyCard />
              <BankNiftyCard />
            </div>
            <Separator orientation="vertical" />
            <Popover>
              <PopoverTrigger>
                <div className="p-2 hover:bg-secondary transition rounded-md">
                  <Globe height={22} width={22} />
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

      <div className="md:px-10 pb-3 flex-grow h-full overflow-auto tables-with-border">
        <Messages />
      </div>
    </div>
  );
}
