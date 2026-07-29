"use client";
import { useRouter } from "next/navigation";

import { VisibilityState } from "@tanstack/react-table";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useEffect, useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: Props<TData, TValue>) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  useEffect(() => {
    if (isDesktop) {
      setColumnVisibility({
        status: true,
        phone: true,
        service_name: true,
        created_at: true,
      });
    } else {
      setColumnVisibility({
        status: false,
        phone: false,
        service_name: true,
        created_at: false,
      });
    }
  }, [isDesktop]);

  const table = useReactTable({
    data,
    columns,

    state: {
      columnVisibility,
    },

    onColumnVisibilityChange: setColumnVisibility,

    getCoreRowModel: getCoreRowModel(),
  });
  const router = useRouter();

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer hover:bg-muted/40"
                onClick={() => {
                  const lead = row.original as { id: string };

                  router.push(`/dashboard/leads/${lead.id}`);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center h-32">
                Brak zgłoszeń.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
