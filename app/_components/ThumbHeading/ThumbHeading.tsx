import { cn } from "@lib/utils";
import React from "react";

type Props = {
  heading: string;
  color?: string;
};

export const ThumbHeading = ({ heading, color, ...props }: Props) => {
  const colorClass = color ? `bg-${color}` : "bg-success";

  return (
    <>
      <div className="flex gap-3 items-center">
        <span className={cn("w-3 h-8 rounded-sm", colorClass)}></span>
        <h3>{heading}</h3>
      </div>
    </>
  );
};

export default ThumbHeading;
