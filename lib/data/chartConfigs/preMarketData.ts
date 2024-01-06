import { EChartsOption } from "echarts/types/dist/shared";

export const preMarketDataChartConfig: EChartsOption = {
  grid: {
    show: false,
    left: 90,
    top: 0,
    right: 0,
    bottom: 20,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "line",
    },
  },
  xAxis: {
    type: "value",
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: "category",
    
    axisLabel: {
      interval: 1,
      fontSize: 10,
    },
    axisLine: {
      show: true,
    },
  },
  series: [
    {
      name: "Gain",
      type: "bar",
      barWidth: 5,
      roundCap: true,
      itemStyle: {
        // borderRadius: [5, 5, 0, 0],
      },
      stack: "Gain",
      color: "#22c55e",
      datasetIndex: 0,
    },
    {
      type: "bar",
      roundCap: true,
      name: "Lose",
      barWidth: 40,
      itemStyle: {
        // borderRadius: [0, 0, 5, 5],
      },
      color: "#e70404",
      stack: "Gain",
      datasetIndex: 1,
    },
  ],
};
