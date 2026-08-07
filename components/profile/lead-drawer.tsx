"use client";

import { Drawer, DrawerContent, DrawerFooter } from "@/components/ui/drawer";

import { Service } from "@/lib/types";
import LeadForm from "./lead-form";

type Props = {
  trainerId: string;
  open: boolean;
  service: Service | null;
  onOpenChange: (open: boolean) => void;
};

export function LeadDrawer({ trainerId, open, service, onOpenChange }: Props) {
  if (!service) {
    return null;
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} showSwipeHandle>
      <DrawerContent>
        <div className="flex-1 overflow-y-auto px-4">
          <LeadForm
            service={service}
            trainerId={trainerId}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => onOpenChange(false)}
          />
        </div>

        <DrawerFooter>{/* przyciski */}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
