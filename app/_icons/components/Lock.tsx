import React, { SVGProps } from "react";

export const Lock = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg height="24" viewBox="0 0 17 20" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5 6V5C3.5 2.23858 5.73858 0 8.5 0C11.2614 0 13.5 2.23858 13.5 5V6C15.1569 6 16.5 7.34315 16.5 9V17C16.5 18.6569 15.1569 20 13.5 20H3.5C1.84315 20 0.5 18.6569 0.5 17V9C0.5 7.34315 1.84315 6 3.5 6ZM5.5 5C5.5 3.34315 6.84315 2 8.5 2C10.1569 2 11.5 3.34315 11.5 5V6H5.5V5ZM2.5 9C2.5 8.44772 2.94772 8 3.5 8H13.5C14.0523 8 14.5 8.44772 14.5 9V17C14.5 17.5523 14.0523 18 13.5 18H3.5C2.94772 18 2.5 17.5523 2.5 17V9Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Lock;
