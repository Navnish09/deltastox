import { USER_STATUS } from "@/app/_globals/constant";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const StatusTemplate = ({
  status,
  onClick,
}: {
  status: `${USER_STATUS}`;
  onClick?: () => void;
}) => {
  status = status ?? USER_STATUS.N;

  const statusMap = {
    [USER_STATUS.Y]: "Active",
    [USER_STATUS.N]: "Inactive",
  };

  return (
    <Button onClick={onClick} variant={"ghost"}>
      <span
        className={cn("text-sm font-semibold flex ", {
          ["text-success"]: status === USER_STATUS.Y,
          ["text-destructive"]: status === USER_STATUS.N,
        })}
      >
        {statusMap[status]}
      </span>
    </Button>
  );
};
