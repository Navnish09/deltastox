import PropTypes from "prop-types";

import React from "react";

import classes from "./Divider.module.scss";

export const Divider = ({ size = "small", direction, variant }: any) => {
  return (
    <div
      className={`${classes["divider"]} ${classes[size] || ""} ${
        classes[direction] || ""
      } ${classes[variant] || ""}`}
    />
  );
};
