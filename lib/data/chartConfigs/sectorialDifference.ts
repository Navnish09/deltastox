import { EChartsOption } from "echarts/types/dist/shared";

export const sectorDifferenceChartConfig: EChartsOption = {
  grid: {
    show: false,
    left: 30,
    top: 10,
    right: 0,
    bottom: 30,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "line",
    },
  },
  xAxis: {
    type: "category",
    axisLabel: {
      interval: 0,
      rotate: 25,
      align: "center",
      fontSize: 11,
      fontWeight: "normal",
    },
  },
  yAxis: {
    type: "value",
    splitLine: {
      show: false,
    },
    axisLine: {
      show: true,
    },
  },
  series: [
    {
      name: "Gain",
      type: "bar",
      barWidth: 30,
      itemStyle: {
        borderRadius: [5, 5, 0, 0],
      },
      stack: "Gain",
      color: "#22c55e",
      datasetIndex: 0,
    },
    {
      type: "bar",
      name: "Lose",
      itemStyle: {
        borderRadius: [0, 0, 5, 5],
      },
      barWidth: 40,
      color: "#e70404",
      stack: "Gain",
      datasetIndex: 1,
    },
  ],
};
