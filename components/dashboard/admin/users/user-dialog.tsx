"use client";

import { AdminUser } from "@/lib/types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserForm } from "./user-form";

type Props = {
  user: AdminUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function UserDialog({ user, open, onOpenChange }: Props) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{user.full_name}</DialogTitle>
        </DialogHeader>

        <UserForm user={user} />
      </DialogContent>
    </Dialog>
  );
}
