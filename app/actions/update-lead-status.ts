"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

type LeadStatus = "new" | "contacted" | "completed" | "cancelled";

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("leads")
    .update({
      status,
    })
    .eq("id", leadId)
    .eq("trainer_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  return {
    success: true,
  };
}
