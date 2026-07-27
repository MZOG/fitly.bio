"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { getProfileUrl } from "@/lib/profile-url";

export function ProfilePreviewLink() {
  const { profile } = useAuth();

  if (!profile) return null;

  return (
    <SidebarMenuButton
      render={
        <Link
          href={getProfileUrl(profile)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Podgląd profilu</span>

          <ExternalLink className="ml-auto size-4" />
        </Link>
      }
    />
  );
}
