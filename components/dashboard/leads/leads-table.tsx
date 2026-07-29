"use client";

import { Lead } from "@/lib/types";
import { DataTable } from "./data-table";
import { columns } from "./columns";

type Props = {
  leads: Lead[];
  trainerPlan: string;
  hiddenLeads: number;
};

export function LeadsTable({ leads, trainerPlan, hiddenLeads }: Props) {
  return (
    <>
      {trainerPlan === "free" && hiddenLeads > 0 && (
        <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="font-medium">Masz {hiddenLeads} ukrytych zgłoszeń.</p>

          <p className="text-sm text-muted-foreground">
            Przejdź na plan Pro, aby zobaczyć wszystkie leady.
          </p>
        </div>
      )}

      <DataTable columns={columns} data={leads} />
    </>
  );
}
