import { type ClassValue, clsx } from "clsx";
import { DatasetComponentOption } from "echarts/components";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createColumns = (entriesData: Array<Array<string>>) => {
  return entriesData.map((entry) => {
    return {
      accessorKey: entry[0],
      header: entry[1],
    };
  });
};

export const createBasicDataset = <Cdata extends Array<Record<string, any>>>(
  data: Cdata,
  xAxisKey: string,
  yAxisKey: string,
  seriesCount: number
): DatasetComponentOption[] => {
  return !!data.length
    ? Array.from({ length: seriesCount }, (_, i) => {
        return {
          source: data.map((d) => [d[xAxisKey], d[yAxisKey]]),
        };
      })
    : [];
};

export const createNegPosDataset = <Cdata extends Array<Record<string, any>>>(
  data: Cdata,
  xAxisKey: string,
  yAxisKey: string,
  seriesCount: number
): DatasetComponentOption[] => {
  return !!data.length
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

export const framesInterval = (callback: () => void, interval: number) => {
  let startTime: number;
  let isRunning = true;

  function animate(currentTime: number) {
    if (!startTime) {
      startTime = currentTime;
    }

    if (isRunning && currentTime - startTime >= interval) {
      callback();
      startTime = currentTime;
    }

    if (isRunning) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);

  // Function to stop the animation
  function stop() {
    isRunning = false;
  }

  return { stop };
};
