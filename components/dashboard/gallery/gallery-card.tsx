"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { deleteGalleryItem } from "@/app/actions/gallery/delete-gallery-item";
import { Button } from "@/components/ui/button";
import { GalleryItem } from "@/lib/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type Props = {
  item: GalleryItem;
};

export default function GalleryCard({ item }: Props) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteGalleryItem(item.id);
      setDeleteOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      {item.image_url && (
        <Image
          src={item.image_url}
          alt={item.caption ?? "Zdjęcie w galerii"}
          width={item.width ?? 1200}
          height={item.height ?? 1200}
          className="h-auto w-full"
        />
      )}

      <div className="flex items-center justify-between gap-3 p-4">
        {item.caption ? (
          <p className="text-sm text-muted-foreground">{item.caption}</p>
        ) : (
          <span />
        )}

        <Dialog>
          <DialogTrigger
            render={<Button type="button" variant="ghost" size="icon" />}
          >
            <Trash2 className="size-4" />
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Usunąć zdjęcie?</DialogTitle>

              <DialogDescription>
                Zdjęcie zostanie trwale usunięte z Twojej galerii. Tej operacji
                nie można cofnąć.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeleteOpen(false)}
                disabled={isDeleting}
              >
                Anuluj
              </Button>

              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Usuwanie..." : "Usuń zdjęcie"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
