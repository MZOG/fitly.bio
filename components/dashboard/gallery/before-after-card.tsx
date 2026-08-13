"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useState } from "react";

import { deleteGalleryItem } from "@/app/actions/gallery/delete-gallery-item";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GalleryItem } from "@/lib/types";

type Props = {
  item: GalleryItem;
};

export default function BeforeAfterCard({ item }: Props) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!item.before_url || !item.after_url) {
    return null;
  }

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
      <div className="grid grid-cols-2">
        <div className="relative">
          <Image
            src={item.before_url}
            alt="Przed"
            width={item.before_width ?? 1200}
            height={item.before_height ?? 1200}
            className="h-auto w-full"
          />

          <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
            Przed
          </span>
        </div>

        <div className="relative">
          <Image
            src={item.after_url}
            alt="Po"
            width={item.after_width ?? 1200}
            height={item.after_height ?? 1200}
            className="h-auto w-full"
          />

          <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
            Po
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 p-4">
        {item.caption ? (
          <p className="text-sm text-muted-foreground">{item.caption}</p>
        ) : (
          <span />
        )}

        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogTrigger
            render={<Button type="button" variant="ghost" size="icon" />}
          >
            <Trash2 className="size-4" />
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Usunąć metamorfozę?</DialogTitle>

              <DialogDescription>
                Oba zdjęcia zostaną trwale usunięte z galerii. Tej operacji nie
                można cofnąć.
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
                {isDeleting ? "Usuwanie..." : "Usuń metamorfozę"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
