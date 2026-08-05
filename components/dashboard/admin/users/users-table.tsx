"use client";

import { useState } from "react";

import { ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { AdminUser } from "@/lib/types";

import { UserDialog } from "./user-dialog";

type Props = {
  users: AdminUser[];
};

export function UsersTable({ users }: Props) {
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  return (
    <>
      <div className="overflow-hidden rounded-xl border bg-background max-w-3xl mx-auto">
        {users.map((user) => (
          <button
            key={user.id}
            type="button"
            onClick={() => setSelectedUser(user)}
            className="flex w-full items-center justify-between border-b p-5 text-left transition hover:bg-muted/50 last:border-b-0"
          >
            <div className="space-y-2">
              <h3 className="font-semibold">{user.full_name}</h3>

              <Badge variant={user.plan === "pro" ? "default" : "secondary"}>
                {user.plan?.toUpperCase() ?? "FREE"}
              </Badge>
            </div>

            <ChevronRight className="size-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      <UserDialog
        user={selectedUser}
        open={!!selectedUser}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedUser(null);
          }
        }}
      />
    </>
  );
}
