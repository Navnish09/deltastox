import { format } from "date-fns";

export const DateTemplate = ({
  date,
  dateFormat = "PPP",
}: {
  date: string;
  dateFormat?: string;
}) => {
  if (!date) return null;

  return <>{format(new Date(date), dateFormat)}</>;
};
