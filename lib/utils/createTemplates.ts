import { CellContext } from "@tanstack/react-table";

type TemplateFunction<T> = (
  prop: CellContext<T, React.ReactNode>
) => React.ReactNode;

export function createTemplates<
  T extends {
    accessorKey: string;
    header: string;
  },
  U extends {
    [key in T["accessorKey"]]?: TemplateFunction<{
      [key in T["accessorKey"]]: any;
    }>;
  }
>(columns: Readonly<T[]>, templateFunctions: U) {
  return templateFunctions;
}
