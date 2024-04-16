"use client";

import React, { useEffect, useRef } from "react";

import { marketOverviewConfigs } from "@lib/data/marketOverviewConfigs";

type Props = {};

export const MarketOverview = ({}: Props) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify(marketOverviewConfigs);

    if (!container.current.hasChildNodes()) {
      container.current?.appendChild(script);
    }
  }, []);

  return <div className="tradingview-widget-container" ref={container}></div>;
};

export default MarketOverview;
