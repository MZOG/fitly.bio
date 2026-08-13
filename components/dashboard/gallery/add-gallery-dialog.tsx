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
  plan: "free" | "pro";
};

export default function AddGalleryDialog({ open, onOpenChange, plan }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [type, setType] = useState<"image" | "before_after">("image");
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);

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
    const supabase = createClient();

    if (type === "image" && !file) return;
    if (type === "before_after" && (!beforeFile || !afterFile)) return;

    setIsSubmitting(true);

    const uploadedPaths: string[] = [];
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Unauthorized");
      }

      // Zwykłe zdjęcie
      if (type === "image" && file) {
        const { width, height } = await getImageDimensions(file);

        const fileExt = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(uploadError.message);
        }

        uploadedPaths.push(filePath);

        const {
          data: { publicUrl },
        } = supabase.storage.from("gallery").getPublicUrl(filePath);

        await createGalleryItem({
          type: "image",
          imageUrl: publicUrl,
          caption,
          width,
          height,
        });
      }

      // Before / After
      if (type === "before_after" && beforeFile && afterFile) {
        const beforeDimensions = await getImageDimensions(beforeFile);
        const afterDimensions = await getImageDimensions(afterFile);

        const beforeExt = beforeFile.name.split(".").pop();
        const afterExt = afterFile.name.split(".").pop();

        const beforePath = `${user.id}/${crypto.randomUUID()}.${beforeExt}`;
        const afterPath = `${user.id}/${crypto.randomUUID()}.${afterExt}`;

        const { error: beforeError } = await supabase.storage
          .from("gallery")
          .upload(beforePath, beforeFile);

        if (beforeError) {
          throw new Error(beforeError.message);
        }

        uploadedPaths.push(beforePath);

        const { error: afterError } = await supabase.storage
          .from("gallery")
          .upload(afterPath, afterFile);

        if (afterError) {
          throw new Error(afterError.message);
        }

        uploadedPaths.push(afterPath);

        const {
          data: { publicUrl: beforeUrl },
        } = supabase.storage.from("gallery").getPublicUrl(beforePath);

        const {
          data: { publicUrl: afterUrl },
        } = supabase.storage.from("gallery").getPublicUrl(afterPath);

        await createGalleryItem({
          type: "before_after",
          beforeUrl,
          afterUrl,
          beforeWidth: beforeDimensions.width,
          beforeHeight: beforeDimensions.height,
          afterWidth: afterDimensions.width,
          afterHeight: afterDimensions.height,
          caption,
        });
      }

      setFile(null);
      setBeforeFile(null);
      setAfterFile(null);
      setCaption("");
      setType("image");

      onOpenChange(false);
    } catch (error) {
      if (uploadedPaths.length > 0) {
        await supabase.storage.from("gallery").remove(uploadedPaths);
      }

      if (error instanceof Error && error.message === "FREE_LIMIT_REACHED") {
        toast.error("Osiągnąłeś limit 2 zdjęć", {
          description: "Przejdź na plan Pro, aby dodać więcej zdjęć.",
        });
      } else {
        toast.error("Nie udało się dodać do galerii");
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

        {plan === "pro" ? (
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-muted p-1">
            <button
              type="button"
              onClick={() => setType("image")}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                type === "image"
                  ? "bg-background shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              Zdjęcie
            </button>

            <button
              type="button"
              onClick={() => setType("before_after")}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                type === "before_after"
                  ? "bg-background shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              Przed / Po
            </button>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-5">
          {type === "image" && (
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
          )}

          {type === "before_after" && (
            <div className="grid grid-cols-2 gap-3">
              <label
                htmlFor="gallery-before"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 px-4 py-8 text-center transition-colors hover:border-fitly/50 hover:bg-muted/50"
              >
                <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-background shadow-sm">
                  <ImagePlus className="size-5 text-muted-foreground" />
                </div>

                {beforeFile ? (
                  <p className="max-w-full truncate text-sm font-medium">
                    {beforeFile.name}
                  </p>
                ) : (
                  <p className="text-sm font-medium">Zdjęcie przed</p>
                )}

                <p className="mt-1 text-xs text-muted-foreground">
                  Wybierz zdjęcie
                </p>
              </label>

              <input
                id="gallery-before"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(e) => setBeforeFile(e.target.files?.[0] ?? null)}
              />

              <label
                htmlFor="gallery-after"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 px-4 py-8 text-center transition-colors hover:border-fitly/50 hover:bg-muted/50"
              >
                <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-background shadow-sm">
                  <ImagePlus className="size-5 text-muted-foreground" />
                </div>

                {afterFile ? (
                  <p className="max-w-full truncate text-sm font-medium">
                    {afterFile.name}
                  </p>
                ) : (
                  <p className="text-sm font-medium">Zdjęcie po</p>
                )}

                <p className="mt-1 text-xs text-muted-foreground">
                  Wybierz zdjęcie
                </p>
              </label>

              <input
                id="gallery-after"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(e) => setAfterFile(e.target.files?.[0] ?? null)}
              />
            </div>
          )}

          <Input
            placeholder="Podpis (opcjonalnie)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <Button
            type="submit"
            disabled={
              isSubmitting ||
              (type === "image" && !file) ||
              (type === "before_after" && (!beforeFile || !afterFile))
            }
            className="w-full"
          >
            {isSubmitting
              ? "Dodawanie..."
              : type === "before_after"
                ? "Dodaj przed / po"
                : "Dodaj zdjęcie"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
