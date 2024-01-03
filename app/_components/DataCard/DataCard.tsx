import React, { useMemo, useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  AccessorKeyColumnDef,
  CellContext,
  ColumnDefTemplate,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { Search } from "@/app/_icons";

type Props<TData, TValue> = {
  heading: string;
  columns: AccessorKeyColumnDef<TData, TValue>[];
  data: TData[];
  templates?: Record<string, ColumnDefTemplate<CellContext<TData, TValue>>>;
};

export const DataCard = <TData, TValue>({
  heading,
  columns,
  data,
  templates,
}: Props<TData, TValue>) => {
  const [searchValue, setSeachValue] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((item: any) =>
      item?.Symbol?.toLowerCase()?.includes?.(searchValue.toLowerCase())
    );
  }, [data, searchValue]);

  return (
    <div className="flex flex-col">
      <Card className="w-fit rounded-b-none relative top-3">
        <CardContent className="p-4 pb-6">
          <h6 className="text-primary">{heading}</h6>
        </CardContent>
      </Card>

      <Card className="relative z-10" gradient="primary">
        <CardHeader>
          <div className="w-4/12">
            <Input
              value={searchValue}
              onChange={(e) => setSeachValue(e.target.value)}
              startIcon={<Search height={18} width={18} />}
              placeholder="Search"
            />
          </div>
        </CardHeader>

        <CardContent>
          <DataTable
            templates={templates}
            columns={columns}
            data={filteredData}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DataCard;
