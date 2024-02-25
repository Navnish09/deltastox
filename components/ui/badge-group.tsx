import React from "react";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

export const BadgeGroup = <V extends string | number>({
  options,
  onChange,
  defaultValue,
  className,
  orientation = "horizontal",
}: {
  options: {
    label: string;
    value: V;
  }[];
  onChange?: (value: V) => void;
  defaultValue?: V;
  className?: string;
  orientation?: "horizontal" | "vertical";
}) => {
  const [selected, setSelected] = React.useState(defaultValue || "");

  const handleClick = (option: V) => {
    setSelected(option);
    onChange?.(option);
  };

  return (
    <div
      className={cn(
        "flex gap-2 items-center",
        className,
        {
          vertical: "flex-col",
          horizontal: "flex-row",
        }[orientation]
      )}
    >
      {options.map((option) => (
        <Badge
          variant={option.value === selected ? "default" : "secondary"}
          key={option.value}
          className="py-2 cursor-pointer"
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </Badge>
      ))}
    </div>
  );
};

export default BadgeGroup;
