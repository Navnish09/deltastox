import React, { SVGProps } from "react";

export const Info = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg height="24" viewBox="0 0 21 16" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6668 8.00016C14.6668 11.6821 11.6821 14.6668 8.00016 14.6668C4.31826 14.6668 1.3335 11.6821 1.3335 8.00016C1.3335 4.31826 4.31826 1.3335 8.00016 1.3335C11.6821 1.3335 14.6668 4.31826 14.6668 8.00016ZM8.00016 7.3335C8.36835 7.3335 8.66683 7.63197 8.66683 8.00016V11.3341C8.66683 11.7023 8.36835 12.0008 8.00016 12.0008C7.63197 12.0008 7.3335 11.7023 7.3335 11.3341V8.00016C7.3335 7.63197 7.63197 7.3335 8.00016 7.3335ZM8.00016 6.00016C8.36835 6.00016 8.66683 5.70169 8.66683 5.3335C8.66683 4.96531 8.36835 4.66683 8.00016 4.66683C7.63197 4.66683 7.3335 4.96531 7.3335 5.3335C7.3335 5.70169 7.63197 6.00016 8.00016 6.00016Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Info;
