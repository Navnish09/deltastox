import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export  const createColumns = (entriesData: Array<Array<string>>) => {
  return entriesData.map((entry) => {
    return {
      accessorKey: entry[0],
      header: entry[1],
    };
  });
};