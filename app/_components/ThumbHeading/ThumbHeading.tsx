import { cn } from "@/lib/utils";
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
        <span
          className={cn("w-4 h-8 rounded-sm", colorClass)}
        ></span>
        <h4>{heading}</h4>
      </div>
    </>
  );
};

export default ThumbHeading;
