import { EChartsOption } from "echarts/types/dist/shared";

export const fiveMinuteMomentumChartConfig: EChartsOption = {
  grid: {
    show: false,
    left: 30,
    top: 10,
    right: 10,
    bottom: 65,
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
      interval: 1,
      fontSize: 10,
      rotate:-40
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
      type: "bar",
      barWidth: 8,
      roundCap: true,
      itemStyle: {
        borderRadius: [5, 5, 0, 0],
      },
    },
  ],
};
