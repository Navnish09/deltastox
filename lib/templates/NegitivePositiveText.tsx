import { cn } from "../utils";

export const NegativePositiveText = ({
  value,
  renderValue,
}: {
  value: number;
  renderValue?: (value: number) => React.ReactNode;
}) => {
  const isNegative = value < 0;

  return (
    <span
      className={cn("text-sm font-semibold", {
        ["text-success"]: !isNegative,
        ["text-destructive"]: isNegative,
      })}
    >
      {renderValue ? renderValue(value) : value}
    </span>
  );
};
