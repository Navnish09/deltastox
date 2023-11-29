import React from "react";

import classes from "./Card.module.scss";

type Props = {
  text: string;
  themeColor: string;
};

export const CardTitle = ({ text, themeColor }: Props) => {
  return (
    <div className={classes["card_title_container"]}>
      <span style={{ background: themeColor }} className={classes["title_badge"]}></span>
      <h5>{text}</h5>
    </div>
  );
};

export default CardTitle;
