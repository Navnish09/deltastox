import { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { POLLING_INTERVAL } from "../constant";

export const useAPI = <
  dataT extends any = any,
  R extends (...args: any) => Promise<AxiosResponse<any, any>> = () => Promise<
    AxiosResponse<any, any>
  >
>({
  requestHandler,
  params,
  returnData,
  polling = false,
  onResloved,
  enable = true,
  interval = POLLING_INTERVAL,
}: {
  requestHandler: R;
  params?: Parameters<R>[number];
  returnData?: (res: AxiosResponse<any, any>) => any;
  polling?: boolean;
  onResloved?: (data: dataT) => void;
  enable?: boolean;
  interval?: number;
}) => {
  const [data, setData] = useState<dataT>([] as any[] | {} as any);
  const [error, setError] = useState<any>(null);
  const [isFetching, setFetching] = useState<boolean>(false);

  // This is for showing the loading state. This will be true only when the data is being refetched without polling
  const [isLoading, setLoading] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const clearPolling = () => {
    intervalRef.current && clearTimeout(intervalRef.current);
  };

  const startPolling = () => {
    clearPolling();

    intervalRef.current = setTimeout(fetchData, interval);
  };

  const fetchData = async (): Promise<dataT> => {
    // If the previous request is still in progress, then cancel it
    abortRef.current?.abort();

    // Creating a new abort controller
    abortRef.current = new AbortController();

    return new Promise((resolve, reject) => {
      setFetching(true);

      requestHandler({ ...params, signal: abortRef.current?.signal })
        .then((res) => {
          const newData: dataT = returnData ? returnData(res) : res.data.data;
          setData(newData);

          // If polling is enabled and the tab is visible, then start the interval again
          if (polling && document.visibilityState === "visible") {
            startPolling();
          }

          resolve(newData);
        })
        .catch((err) => {
          // Retry if the request throws an error
          if (polling && document.visibilityState === "visible") {
            startPolling();
          }

          setError(err);
          reject(err);
        })
        .finally(() => {
          setFetching(false);
        });
    });
  };

  useEffect(() => {
    if (!enable) {
      return;
    }

    // Setting the loading state to true before fetching the data
    setLoading(true);

    // Fetching data on mount and whenever the params change. This will also start the polling
    fetchData().then((data) => {
      onResloved?.(data);
      setLoading(false);
    });

    return () => {
      intervalRef.current && clearTimeout(intervalRef.current);
    };
  }, [params, enable, polling]);

  useEffect(() => {
    if (!enable) {
      return;
    }

    const visibilityChangeHandler = () => {
      // Clearing the interval if the tab is hidden
      if (document.visibilityState === "hidden") {
        intervalRef.current && clearTimeout(intervalRef.current);
        return;
      }

      if (polling) {
        startPolling();
      }
    };

    // Polling on visibility change
    document.addEventListener("visibilitychange", visibilityChangeHandler);

    return () => {
      document.removeEventListener("visibilitychange", visibilityChangeHandler);
    };
  }, [enable, polling]);

  return { data, error, isLoading, isFetching };
};
