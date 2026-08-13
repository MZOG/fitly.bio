"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type CreateGalleryItemInput = {
  imageUrl: string;
  caption?: string;
  width: number;
  height: number;
};

export async function createGalleryItem({
  imageUrl,
  caption,
  width,
  height,
}: CreateGalleryItemInput) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  const { count, error: countError } = await supabase
    .from("gallery")
    .select("*", { count: "exact", head: true })
    .eq("profile_id", user.id);

  if (countError) {
    throw new Error(countError.message);
  }

  if (profile.plan === "free" && (count ?? 0) >= 2) {
    throw new Error("FREE_LIMIT_REACHED");
  }

  const { error } = await supabase.from("gallery").insert({
    profile_id: user.id,
    type: "image",
    image_url: imageUrl,
    caption: caption || null,
    width,
    height,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/gallery");
}
