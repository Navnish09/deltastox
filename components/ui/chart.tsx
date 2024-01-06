import React, { memo, useEffect, useRef } from "react";
import {
  DatasetComponentOption,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  MarkAreaComponent,
  LegendComponent,
} from "echarts/components";
import { SVGRenderer } from "echarts/renderers";
import * as echarts from "echarts/core";
import type { EChartsOption } from "echarts/types/dist/shared";
import { LineChart, BarChart, PieChart } from "echarts/charts";
import customTheme from "@/lib/data/EchartTheme.json";

export interface ChartProps {
  option: EChartsOption;
  dataset?: DatasetComponentOption[];
  settings?: echarts.SetOptionOpts;
  theme?: "light" | "dark" | "customTheme";
  loading?: boolean;
  onLoad?: (chart: echarts.EChartsType) => void;
  events?: {
    [key: string]: (params: any) => boolean | void;
  };
  resizeChart?: boolean;
}
export const EChart = memo(
  ({
    option,
    dataset,
    settings,
    theme = "customTheme",
    onLoad,
    events,
    resizeChart = false,
  }: ChartProps) => {
    const chartRef = useRef<HTMLDivElement>(null);

    //initialize chart
    useEffect(() => {
      let chart: echarts.ECharts | undefined;

      if (chartRef.current) {
        echarts.use([
          SVGRenderer,
          LineChart,
          BarChart,
          PieChart,
          TitleComponent,
          TooltipComponent,
          GridComponent,
          DatasetComponent,
          TransformComponent,
          MarkAreaComponent,
          LegendComponent,
        ]);

        echarts.registerTheme("customTheme", customTheme.theme);
        chart = echarts.init(chartRef.current, theme, { renderer: "svg" });
      }

      const resizeChart = () => chart?.resize();
      window.addEventListener("resize", resizeChart);

      return () => {
        chart?.dispose();
        window.removeEventListener("resize", resizeChart);
      };
    }, [theme]);

    useEffect(() => {
      // Using getInstanceByDom to repaint the container with new option on a re-render
      const chart = echarts.getInstanceByDom(
        chartRef.current as HTMLDivElement
      );

      // Append dataset if is passed seperately
      if (dataset) {
        option.dataset = dataset;
      }

      // Set Echart options and settings
      chart?.setOption(option, {
        ...settings,
        // Not merge is to always creating new components of the chart on rerenders to use the updated options
        // For reference:- https://echarts.apache.org/en/api.html#echartsInstance.setOption
        notMerge: true,
      });

      // Attach events to the chart instance
      if (events && Object.keys(events).length) {
        Object.keys(events).map((eventName) => {
          chart?.on(eventName, events[eventName]);
        });
      }

      // Not using rendered event for these callbacks because it render on every minor chart actions
      if (chart) {
        // resizeChart is added for situations when we want Legend with chart at the Card Level and the Chart overflows from the card
        resizeChart && dispatchEvent(new Event("resize"));
        onLoad?.(chart);
      }
    }, [option, settings, theme, dataset, events]);

    return (
      <div ref={chartRef} id="echart_container" className="h-full w-full"></div>
    );
  }
);

export default EChart;
