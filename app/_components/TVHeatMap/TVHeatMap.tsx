"use client";

import React, { useEffect, useRef } from "react";

import { heatmapConfig } from "@lib/data/HeatmapConfigs";

type Props = {};

export const TVHeatMap = ({}: Props) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!container.current) return;
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify(heatmapConfig);

    if(!container.current.hasChildNodes()) {
      container.current?.appendChild(script);
    }
  }, []);

  return <div className="tradingview-widget-container" ref={container}></div>;
};

export default TVHeatMap;
