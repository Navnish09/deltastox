"use client";

import React, { useEffect } from "react";
import { tickertapeConfig } from "@/lib/data/TickertapeConfigs";

type Props = {};

export const TickerTape = ({}: Props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify(tickertapeConfig);
    
    if (!containerRef.current.hasChildNodes()) {
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container" ref={containerRef}></div>
  );
};

export default TickerTape;
