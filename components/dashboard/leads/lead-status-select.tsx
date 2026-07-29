"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateLeadStatus } from "@/app/actions/update-lead-status";
import { useRouter } from "next/navigation";

type Props = {
  leadId: string;
  status: string;
};

export function LeadStatusSelect({ leadId, status }: Props) {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const leadStatuses = {
    new: "Nowy",
    contacted: "Skontaktowano",
    completed: "Zakończony",
    cancelled: "Anulowany",
  } as const;

  return (
    <Select
      defaultValue={status}
      disabled={pending}
      onValueChange={(value) => {
        startTransition(async () => {
          try {
            await updateLeadStatus(leadId, value as any);

            toast.success("Status został zmieniony");

            router.refresh();
          } catch {
            toast.error("Nie udało się zmienić statusu");
          }
        });
      }}
    >
      <SelectTrigger>
        <SelectValue>
          {(value) =>
            value
              ? leadStatuses[value as keyof typeof leadStatuses]
              : "Wybierz status"
          }
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {Object.entries(leadStatuses).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
