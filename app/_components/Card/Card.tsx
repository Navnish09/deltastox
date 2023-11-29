import React, { PropsWithChildren } from "react";

import classes from "./Card.module.scss";

export const Card = ({
  children,
  shadow = false,
  width,
}: PropsWithChildren<{ shadow?: boolean; width?: number | string }>) => {
  return (
    <div
      className={`${classes["card_container"]} ${
        shadow ? classes["shadow"] : ""
      }`}
      style={{ width }}
    >
      {children}
    </div>
  );
};

export default Card;
