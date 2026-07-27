"use client";

import Link from "next/link";
import { Copy, ExternalLink } from "lucide-react";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { getProfileUrl } from "@/lib/profile-url";
import { toast } from "sonner";

export function ProfilePreviewLink() {
  const { profile } = useAuth();

  if (!profile?.slug) return null;

  const url = `https://fitly.bio/${profile.slug}`;

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Link skopiowany");
  };

  return (
    <div className="space-y-2">
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
      <div className="flex items-center gap-2 rounded-md bg-white border border-dashed px-3 py-2 text-xs">
        <span className="flex-1 truncate text-muted-foreground">{url}</span>

        <button type="button" onClick={copy} className="hover:text-foreground">
          <Copy className="size-4" />
        </button>
      </div>
      <p className="text-xs px-3 text-muted-foreground">
        Skopiuj i wklej do swojego Bio.
      </p>
    </div>
  );
}
