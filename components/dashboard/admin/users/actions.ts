"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { ADMIN_EMAIL } from "@/lib/constants";

type UpdateUserInput = {
  id: string;
  full_name: string;
  city: string;
  bio: string;
  slug: string;
  plan: "free" | "pro";
  is_public: boolean;
  onboarding_completed: boolean;
};

export async function updateUser(values: UpdateUserInput) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: values.full_name,
      city: values.city,
      bio: values.bio,
      slug: values.slug,
      plan: values.plan,
      is_public: values.is_public,
      onboarding_completed: values.onboarding_completed,
    })
    .eq("id", values.id);

  if (error) {
    throw error;
  }

  revalidatePath("/dashboard/admin/users");
}
