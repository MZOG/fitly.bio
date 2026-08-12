"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { deleteGalleryItem } from "@/app/actions/gallery/delete-gallery-item";
import { Button } from "@/components/ui/button";
import { GalleryItem } from "@/lib/types";

type Props = {
  item: GalleryItem;
};

export default function GalleryCard({ item }: Props) {
  const handleDelete = async () => {
    if (!confirm("Czy na pewno chcesz usunąć to zdjęcie?")) {
      return;
    }

    await deleteGalleryItem(item.id);
  };

  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <div className="relative aspect-square">
        {item.image_url && (
          <Image
            src={item.image_url}
            alt={item.caption ?? "Zdjęcie w galerii"}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="flex items-center justify-between gap-3 p-4">
        {item.caption ? (
          <p className="text-sm text-muted-foreground">{item.caption}</p>
        ) : (
          <span />
        )}

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleDelete}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}
