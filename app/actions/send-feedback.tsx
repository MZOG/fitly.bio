"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { resend } from "@/lib/resend";
import FeedbackEmail from "../emails/feedback-email";

export async function sendFeedback(
  type: string,
  message: string,
  title: string,
) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const feedbackTypeLabels = {
    idea: "💡 Pomysł",
    bug: "🐛 Problem",
    question: "❓ Pytanie",
    other: "📝 Inne",
  } as const;

  const feedbackType =
    feedbackTypeLabels[type as keyof typeof feedbackTypeLabels] ?? type;

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
    full_name: profile?.full_name,
    email: user.email,
    type,
    title,
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
      type: feedbackType,
      title,
      message,
    }),
  });

  console.log(data);
  console.error(errorek);
}
