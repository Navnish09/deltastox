import React, { SVGProps } from "react";

export const Mail = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg height="24" viewBox="0 0 21 16" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5 2H17.5C17.8862 2 18.2213 2.21897 18.3879 2.53954L11.0547 7.42834C10.7188 7.65227 10.2812 7.65227 9.94531 7.42834L2.61209 2.53953C2.77868 2.21896 3.11377 2 3.5 2ZM2.5 4.8685V13C2.5 13.5523 2.94772 14 3.5 14H17.5C18.0523 14 18.5 13.5523 18.5 13V4.86852L12.1641 9.09244C11.1564 9.76424 9.84361 9.76424 8.83591 9.09244L2.5 4.8685ZM0.5 3C0.5 1.34315 1.84315 0 3.5 0H17.5C19.1569 0 20.5 1.34315 20.5 3V13C20.5 14.6569 19.1569 16 17.5 16H3.5C1.84315 16 0.5 14.6569 0.5 13V3Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Mail;
