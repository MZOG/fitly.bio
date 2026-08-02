"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { resend } from "@/lib/resend";
import FeedbackEmail from "../emails/feedback-email";

export async function sendFeedback(type: string, message: string) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const { error } = await supabase.from("feedback").insert({
    user_id: user.id,
    type,
    message,
  });

  if (error) {
    throw error;
  }

  const { data, error: errorek } = await resend.emails.send({
    from: "Fitly <onboarding@resend.dev>",
    to: ["fitlybio@gmail.com"],
    subject: "💡 Nowy feedback",
    react: FeedbackEmail({
      name: profile?.full_name ?? "Nieznany użytkownik",
      email: user.email ?? "",
      type,
      message,
    }),
  });

  console.log(data);
  console.error(errorek);
}
