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
import { ImagePlus } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddGalleryDialog({ open, onOpenChange }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getImageDimensions = (file: File) => {
    return new Promise<{ width: number; height: number }>((resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        resolve({
          width: image.naturalWidth,
          height: image.naturalHeight,
        });

        URL.revokeObjectURL(image.src);
      };

      image.onerror = () => {
        URL.revokeObjectURL(image.src);
        reject(new Error("Nie udało się odczytać wymiarów zdjęcia"));
      };

      image.src = URL.createObjectURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;

    setIsSubmitting(true);

    let filePath: string | null = null;

    try {
      const { width, height } = await getImageDimensions(file);
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
        width,
        height,
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
          {/* <Input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          /> */}

          <div>
            <label
              htmlFor="gallery-image"
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 px-6 py-10 text-center transition-colors hover:border-fitly/50 hover:bg-muted/50"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-background shadow-sm">
                <ImagePlus className="size-6 text-muted-foreground" />
              </div>

              {file ? (
                <>
                  <p className="font-medium">{file.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Kliknij, aby wybrać inne zdjęcie
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium">Wybierz zdjęcie</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    JPG, PNG lub WebP
                  </p>
                </>
              )}
            </label>

            <input
              id="gallery-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>

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
