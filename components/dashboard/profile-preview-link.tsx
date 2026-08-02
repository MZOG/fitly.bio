"use client";

import Link from "next/link";
import { Copy, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export function ProfilePreviewLink() {
  const { profile } = useAuth();

  if (!profile?.slug) return null;

  const url = `https://fitly.bio/${profile.slug}`;

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Link do profilu został skopiowany");
  };

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Twój profil</p>

          <p className="text-sm text-muted-foreground">
            Udostępnij ten link w bio na Instagramie lub TikToku.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={copy}>
          <Copy className="size-4" />
          Kopiuj
        </Button>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3">
        <span className="truncate text-sm font-medium">{url}</span>

        <Link
          href={url}
          target="_blank"
          className="text-muted-foreground transition hover:text-foreground"
        >
          <ExternalLink className="size-4" />
        </Link>
      </div>
    </div>
  );
}
