import React, { SVGProps } from "react";

export const Name = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 9C13.933 9 15.5 7.433 15.5 5.5C15.5 3.567 13.933 2 12 2C10.067 2 8.5 3.567 8.5 5.5C8.5 7.433 10.067 9 12 9Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 20.5C2 16.0815 6.0295 12.5 11 12.5M15.5 21L20.5 16L18.5 14L13.5 19V21H15.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Name;
