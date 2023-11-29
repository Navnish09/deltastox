import React, { SVGProps } from "react";

export const Home = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 22C3.34315 22 2 20.6569 2 19V11.3361C2 10.4857 2.36096 9.67518 2.99311 9.10625L9.9931 2.80625C11.134 1.77943 12.866 1.77943 14.0069 2.80625L21.0069 9.10625C21.639 9.67518 22 10.4857 22 11.3361V19C22 20.6569 20.6569 22 19 22H5ZM20 11.3361V19C20 19.5523 19.5523 20 19 20H16V15C16 13.3432 14.6569 12 13 12H11C9.34315 12 8 13.3432 8 15V20H5C4.44772 20 4 19.5523 4 19V11.3361C4 11.0526 4.12032 10.7825 4.33104 10.5928L11.331 4.29284C11.7113 3.95056 12.2887 3.95056 12.669 4.29284L19.669 10.5928C19.8797 10.7825 20 11.0526 20 11.3361ZM10 20V15C10 14.4478 10.4477 14 11 14H13C13.5523 14 14 14.4478 14 15V20H10Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Home;
