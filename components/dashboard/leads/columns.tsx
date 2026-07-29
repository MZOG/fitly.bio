"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Lead } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function getStatusVariant(status: Lead["status"]) {
  switch (status) {
    case "new":
      return "default";

    case "contacted":
      return "secondary";

    case "completed":
      return "outline";

    case "cancelled":
      return "destructive";

    default:
      return "secondary";
  }
}

function getStatusLabel(status: Lead["status"]) {
  switch (status) {
    case "new":
      return "Nowy";

    case "contacted":
      return "Skontaktowano";

    case "completed":
      return "Zakończony";

    case "cancelled":
      return "Anulowany";

    default:
      return status;
  }
}

export const columns: ColumnDef<Lead>[] = [
  {
    id: "status",
    header: () => <div className="hidden lg:block">Status</div>,
    cell: ({ row }) => (
      <div className="hidden lg:block">
        <Badge variant={getStatusVariant(row.original.status)}>
          {getStatusLabel(row.original.status)}
        </Badge>
      </div>
    ),
  },

  {
    id: "contact.name",
    header: "Klient",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {!row.original.is_read && (
          <span className="size-2 rounded-full bg-blue-500" />
        )}

        <span className={cn(!row.original.is_read && "font-semibold")}>
          {row.original.contact.name}
        </span>
      </div>
    ),
  },

  {
    id: "contact.phone",
    header: () => <div className="hidden md:block">Telefon</div>,
    cell: ({ row }) => (
      <div className="hidden md:block">{row.original.contact.phone}</div>
    ),
  },

  {
    id: "service_name",
    header: () => <div>Usługa</div>,
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.service_name}</p>

        <p className="text-sm text-muted-foreground lg:hidden">
          {row.original.service_name}
        </p>
      </div>
    ),
  },

  {
    id: "created_at",
    header: () => <div className="hidden lg:block">Data</div>,
    cell: ({ row }) => (
      <div className="hidden lg:block">
        {new Intl.DateTimeFormat("pl-PL", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(new Date(row.original.created_at))}
      </div>
    ),
  },
];
