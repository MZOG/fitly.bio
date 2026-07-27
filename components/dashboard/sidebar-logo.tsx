"use client";

import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

export function SidebarLogo() {
  const { profile } = useAuth();

  return (
    <div className="flex items-center justify-between">
      <p className="font-semibold">Fitly</p>

      <Badge variant={profile?.plan === "pro" ? "default" : "secondary"}>
        {profile?.plan === "pro" ? "PRO" : "FREE"}
      </Badge>
    </div>
  );
}
