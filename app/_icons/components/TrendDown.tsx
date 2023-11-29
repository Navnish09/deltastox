import React, { SVGProps } from "react";

export const TrendDown = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        d="M18.5858 16H16C15.4477 16 15 16.4477 15 17C15 17.5523 15.4477 18 16 18H21C21.5523 18 22 17.5523 22 17V12C22 11.4477 21.5523 11 21 11C20.4477 11 20 11.4477 20 12V14.5858L14.4142 9C13.6332 8.21895 12.3668 8.21895 11.5858 9L9 11.5858L3.70711 6.29289C3.31658 5.90237 2.68342 5.90237 2.29289 6.29289C1.90237 6.68342 1.90237 7.31658 2.29289 7.70711L7.58579 13C8.36683 13.781 9.63316 13.7811 10.4142 13L13 10.4142L18.5858 16Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default TrendDown;
