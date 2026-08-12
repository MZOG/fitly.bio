"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GalleryItem } from "@/lib/types";
import GalleryGrid from "./gallery-grid";
import GalleryEmpty from "./gallery-empty";
import AddGalleryDialog from "./add-gallery-dialog";

type Props = {
  gallery: GalleryItem[];
  plan: "free" | "pro";
};

export function GallerySection({ gallery, plan }: Props) {
  const [open, setOpen] = useState(false);
  const limitReached = plan === "free" && gallery.length >= 2;

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Galeria</h1>

          <p className="mt-1 text-muted-foreground">
            {plan === "free"
              ? `${gallery.length} / 2 zdjęcia`
              : `${gallery.length} zdjęć`}
          </p>
        </div>

        <Button disabled={limitReached} onClick={() => setOpen(true)}>
          Dodaj zdjęcie
        </Button>
      </div>

      <div className="mt-8">
        {gallery.length === 0 ? (
          <GalleryEmpty onAdd={() => setOpen(true)} />
        ) : (
          <GalleryGrid gallery={gallery} />
        )}
      </div>

      <AddGalleryDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
