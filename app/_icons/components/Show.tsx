import React, { SVGProps } from "react";

export const Show = (props: SVGProps<SVGSVGElement>) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.1614 12.2106C15.1614 13.9566 13.7454 15.3716 11.9994 15.3716C10.2534 15.3716 8.83838 13.9566 8.83838 12.2106C8.83838 10.4636 10.2534 9.04858 11.9994 9.04858C13.7454 9.04858 15.1614 10.4636 15.1614 12.2106Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.998 19.5124C15.806 19.5124 19.289 16.7744 21.25 12.2104C19.289 7.64645 15.806 4.90845 11.998 4.90845H12.002C8.194 4.90845 4.711 7.64645 2.75 12.2104C4.711 16.7744 8.194 19.5124 12.002 19.5124H11.998Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Show;
