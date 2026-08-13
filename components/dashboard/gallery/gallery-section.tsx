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

function pluralizePhotos(count: number) {
  if (count === 1) return "1 zdjęcie";

  if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 10 || count % 100 >= 20)
  ) {
    return `${count} zdjęcia`;
  }

  return `${count} zdjęć`;
}

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
              : pluralizePhotos(gallery.length)}
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
