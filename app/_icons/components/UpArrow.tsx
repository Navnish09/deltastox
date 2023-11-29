import React, { SVGProps } from "react";

export const UpArrow = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg height="24" viewBox="0 0 26 16" fill="none" {...props}>
      <path
        d="M3 7L8 2L13 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14V2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default UpArrow;
