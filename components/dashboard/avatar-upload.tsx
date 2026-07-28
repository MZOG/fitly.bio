"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

type Props = {
  userId: string;
  avatarUrl: string | null;
};

export function AvatarUpload({ userId, avatarUrl }: Props) {
  const supabase = createClient();

  const [image, setImage] = useState(avatarUrl);
  const [isUploading, setIsUploading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => inputRef.current?.click();

  const upload = async (file: File) => {
    setIsUploading(true);

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(`${userId}/avatar`, file, {
        upsert: true,
      });

    if (uploadError) {
      toast.error(uploadError.message);
      setIsUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(`${userId}/avatar`);

    await supabase
      .from("profiles")
      .update({
        avatar_url: `${data.publicUrl}?t=${Date.now()}`,
      })
      .eq("id", userId);

    setImage(`${data.publicUrl}?t=${Date.now()}`);

    toast.success("Zdjęcie zapisane");
    setIsUploading(false);
  };

  const remove = async () => {
    await supabase.storage.from("avatars").remove([`${userId}/avatar`]);

    await supabase
      .from("profiles")
      .update({
        avatar_url: null,
      })
      .eq("id", userId);

    setImage(null);

    toast.success("Zdjęcie usunięte");
  };

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) upload(file);
        }}
      />

      <div className="flex items-center gap-5">
        <div className="relative h-28 w-28 overflow-hidden rounded-full border bg-muted">
          {image ? (
            <Image fill src={image} alt="Avatar" className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Camera className="size-8 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Button type="button" disabled={isUploading} onClick={openPicker}>
            {image ? "Zastąp zdjęcie" : "Wybierz zdjęcie"}
          </Button>

          {image && (
            <Button type="button" variant="outline" onClick={remove}>
              <Trash2 className="text-red-500" />
              Usuń zdjęcie
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
