import React, { SVGProps } from "react";

export const DownArrow = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg height="24" viewBox="0 0 26 16" fill="none" {...props}>
      <path
        d="M13 9L8 14L3 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 2L8 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DownArrow;
