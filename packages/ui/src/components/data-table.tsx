import * as React from "react";
import type { LucideIcon } from "lucide-react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./table";
import { EmptyState } from "./empty-state";
import { cn } from "../lib/utils";

interface DataTableColumn<T> {
  id: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowKey: (row: T) => string;
  emptyIcon?: LucideIcon;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
  footer?: React.ReactNode;
}

function DataTable<T>({
  columns,
  data,
  getRowKey,
  emptyIcon,
  emptyTitle = "No data",
  emptyDescription = "No records found.",
  className,
  footer,
}: DataTableProps<T>) {
  if (data.length === 0 && emptyIcon) {
    return (
      <div className={cn("rounded-xl border bg-white shadow-sm", className)}>
        <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} />
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-xl border bg-white shadow-sm", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            {columns.map((col) => (
              <TableHead
                key={col.id}
                className={cn(
                  "text-[12px] font-semibold uppercase tracking-wider text-muted-foreground",
                  col.className
                )}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={getRowKey(row)}>
              {columns.map((col) => (
                <TableCell key={col.id} className={col.className}>
                  {col.cell(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {footer && (
        <div className="flex items-center justify-between border-t px-4 py-3">{footer}</div>
      )}
    </div>
  );
}

export { DataTable };
export type { DataTableColumn, DataTableProps };
