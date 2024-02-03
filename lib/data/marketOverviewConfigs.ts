export const marketOverviewConfigs = {
  colorTheme: "dark",
  dateRange: "1M",
  showChart: false,
  locale: "en",
  width: "100%",
  height: "100%",
  largeChartUrl: "",
  isTransparent: true,
  showSymbolLogo: true,
  showFloatingTooltip: true,
  plotLineColorGrowing: "rgba(41, 98, 255, 1)",
  plotLineColorFalling: "rgba(41, 98, 255, 1)",
  gridLineColor: "rgba(42, 46, 57, 0)",
  scaleFontColor: "rgba(134, 137, 147, 1)",
  belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
  belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
  belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
  belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
  symbolActiveColor: "rgba(41, 98, 255, 0.12)",
  tabs: [
    {
      title: "US Indices",
      symbols: [
        {
          s: "FOREXCOM:SPXUSD",
          d: "S&P 500",
        },
        {
          s: "NASDAQ:IXIC",
          d: "NASDAQ Composite",
        },
        {
          s: "BLACKBULL:US30",
          d: "DOW JONES",
        },
      ],
      originalTitle: "Indices",
    },
    {
      title: "Asian Indices",
      symbols: [
        {
          s: "HSI:HSI",
          d: "HANG SENG",
        },
        {
          s: "SSE:000001",
          d: "SHANGHAI",
        },
        {
          s: "SPREADEX:NIKKEI",
          d: "NIKKEI 225",
        },
      ],
      originalTitle: "Futures",
    },
    {
      title: "European Indices",
      symbols: [
        {
          s: "SPREADEX:CAC",
          d: "CAC 40",
        },
        {
          s: "SPREADEX:FTSE",
          d: "FTSE 100",
        },
        {
          s: "XETR:DAX",
          d: "DAX",
        },
      ],
      originalTitle: "Bonds",
    },
  ],
};
