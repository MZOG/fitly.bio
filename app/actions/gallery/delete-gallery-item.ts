"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function deleteGalleryItem(id: string) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data: item, error: fetchError } = await supabase
    .from("gallery")
    .select("image_url")
    .eq("id", id)
    .eq("profile_id", user.id)
    .single();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  if (item.image_url) {
    const url = new URL(item.image_url);
    const path = url.pathname.split("/storage/v1/object/public/gallery/")[1];

    if (path) {
      const { error: storageError } = await supabase.storage
        .from("gallery")
        .remove([path]);

      if (storageError) {
        throw new Error(storageError.message);
      }
    }
  }

  const { error } = await supabase
    .from("gallery")
    .delete()
    .eq("id", id)
    .eq("profile_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/gallery");
}
