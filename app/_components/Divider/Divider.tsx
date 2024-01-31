import React from "react";

import classes from "./Divider.module.scss";

export const Divider = ({
  size = "small",
  direction = "horizontal",
  variant = "dark",
}: {
  size?: "small" | "medium" | "large";
  direction?: "horizontal" | "vertical";
  variant?: "light" | "dark";
}) => {
  return (
    <div
      className={`${classes["divider"]} ${classes[size] || ""} ${
        classes[direction] || ""
      } ${classes[variant] || ""}`}
    />
  );
};
