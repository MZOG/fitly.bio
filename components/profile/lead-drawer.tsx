"use client";

import { Drawer, DrawerContent, DrawerFooter } from "@/components/ui/drawer";

import { Service } from "@/lib/types";
import LeadForm from "./lead-form";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

type Props = {
  trainerId: string;
  open: boolean;
  service: Service | null;
  onOpenChange: (open: boolean) => void;
};

export function LeadDrawer({ trainerId, open, service, onOpenChange }: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      swipeDirection={isDesktop ? "right" : "down"}
      showSwipeHandle={!isDesktop}
    >
      <DrawerContent
        className={cn(
          isDesktop && "[--drawer-content-width:560px] rounded-xl ",
        )}
      >
        <div className="flex-1 overflow-y-auto px-4 scrollbar">
          {service && (
            <LeadForm
              service={service}
              trainerId={trainerId}
              onCancel={() => onOpenChange(false)}
              onSuccess={() => onOpenChange(false)}
            />
          )}
        </div>

        <DrawerFooter>{/* przyciski */}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
