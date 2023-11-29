import React, { SVGProps } from "react";

export const TrendUp = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 6C15.4477 6 15 6.44772 15 7C15 7.55228 15.4477 8 16 8H18.5858L13 13.5858L10.4142 11C9.63316 10.2189 8.36683 10.219 7.58579 11L2.29289 16.2929C1.90237 16.6834 1.90237 17.3166 2.29289 17.7071C2.68342 18.0976 3.31658 18.0976 3.70711 17.7071L9 12.4142L11.5858 15C12.3668 15.781 13.6332 15.781 14.4142 15L20 9.41421V12C20 12.5523 20.4477 13 21 13C21.5523 13 22 12.5523 22 12V7C22 6.44772 21.5523 6 21 6H16Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default TrendUp;
