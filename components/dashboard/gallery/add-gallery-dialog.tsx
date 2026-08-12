"use client";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { createGalleryItem } from "@/app/actions/gallery/create-gallery-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddGalleryDialog({ open, onOpenChange }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;

    setIsSubmitting(true);

    let filePath: string | null = null;

    try {
      const supabase = createClient();

      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Unauthorized");
      }

      filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(filePath, file);

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("gallery").getPublicUrl(filePath);

      await createGalleryItem({
        imageUrl: publicUrl,
        caption,
      });

      setFile(null);
      setCaption("");
      onOpenChange(false);
    } catch (error) {
      if (filePath) {
        const supabase = createClient();

        await supabase.storage.from("gallery").remove([filePath]);
      }

      if (error instanceof Error && error.message === "FREE_LIMIT_REACHED") {
        toast.error("Osiągnąłeś limit 2 zdjęć", {
          description: "Przejdź na plan Pro, aby dodać więcej zdjęć.",
        });
      } else {
        toast.error("Nie udało się dodać zdjęcia");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Dodaj zdjęcie</DialogTitle>

          <DialogDescription>
            Dodaj zdjęcie, które będzie widoczne na Twoim profilu.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />

          <Input
            placeholder="Podpis (opcjonalnie)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <Button
            type="submit"
            disabled={!file || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Dodawanie..." : "Dodaj zdjęcie"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
