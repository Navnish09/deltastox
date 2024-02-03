import { DatasetComponentOption } from "echarts/components";

// Following dataset approach from https://echarts.apache.org/handbook/en/concepts/dataset

// Function to create a basic dataset for the echarts chart
export const createBasicDataset = <Cdata extends Array<Record<string, any>>>(
  data: Cdata,
  xAxisKey: string,
  yAxisKey: string,
  seriesCount: number
): DatasetComponentOption[] => {
  return !!data?.length
    ? Array.from({ length: seriesCount }, (_, i) => {
        return {
          source: data.map((d) => [d[xAxisKey], d[yAxisKey]]),
        };
      })
    : [];
};

// Function to create a dataset for the echarts chart with negative and positive values
export const createNegPosDataset = <Cdata extends Array<Record<string, any>>>(
  data: Cdata,
  xAxisKey: string,
  yAxisKey: string,
  seriesCount: number
): DatasetComponentOption[] => {
  return !!data?.length
    ? Array.from({ length: seriesCount }, (_, i) => {
        return {
          source: data.map((d) => [
            d[xAxisKey],
            // Only allow positive values for the first series
            i === 0 ? Math.max(0, d[yAxisKey]) : Math.min(0, d[yAxisKey]),
          ]),
        };
      })
    : [];
};
