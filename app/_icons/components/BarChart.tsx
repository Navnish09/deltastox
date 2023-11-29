import React, { SVGProps } from "react";

export const BarChart = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3 2.59326C3.55228 2.59326 4 3.04098 4 3.59326V19.5933C4 20.1455 4.44772 20.5933 5 20.5933H21C21.5523 20.5933 22 21.041 22 21.5933C22 22.1455 21.5523 22.5933 21 22.5933H5C3.34315 22.5933 2 21.2501 2 19.5933V3.59326C2 3.04098 2.44772 2.59326 3 2.59326Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7 8.59326C7.55228 8.59326 8 9.04098 8 9.59326V17.5933C8 18.1455 7.55228 18.5933 7 18.5933C6.44772 18.5933 6 18.1455 6 17.5933V9.59326C6 9.04098 6.44772 8.59326 7 8.59326Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11 14.5933C11.5523 14.5933 12 15.041 12 15.5933V17.5933C12 18.1455 11.5523 18.5933 11 18.5933C10.4477 18.5933 10 18.1455 10 17.5933V15.5933C10 15.041 10.4477 14.5933 11 14.5933Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15 4.59326C15.5523 4.59326 16 5.04098 16 5.59326V17.5933C16 18.1455 15.5523 18.5933 15 18.5933C14.4477 18.5933 14 18.1455 14 17.5933V5.59326C14 5.04098 14.4477 4.59326 15 4.59326Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19 10.5933C19.5523 10.5933 20 11.041 20 11.5933V17.5933C20 18.1455 19.5523 18.5933 19 18.5933C18.4477 18.5933 18 18.1455 18 17.5933V11.5933C18 11.041 18.4477 10.5933 19 10.5933Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default BarChart;
