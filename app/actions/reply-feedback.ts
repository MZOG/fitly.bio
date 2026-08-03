"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { resend } from "@/lib/resend";
import { createClient } from "@/lib/supabase/server";

import FeedbackReplyEmail from "../emails/feedback-reply-email";

export async function replyFeedback(
  feedbackId: string,
  adminReply: string,
  status: string,
) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  console.log("replyFeedback", {
    feedbackId,
    adminReply,
    status,
  });

  const { data: feedback, error } = await supabase
    .from("feedback")
    .select("*")
    .eq("id", feedbackId)
    .single();

  if (error || !feedback) {
    throw new Error("Nie znaleziono zgłoszenia.");
  }

  const { error: updateError } = await supabase
    .from("feedback")
    .update({
      admin_reply: adminReply,
      status,
      replied_at: new Date().toISOString(),
    })
    .eq("id", feedbackId);

  console.log("UPDATE ERROR", updateError);

  const { data: updated } = await supabase
    .from("feedback")
    .select("admin_reply, status")
    .eq("id", feedbackId)
    .single();

  console.log("UPDATED", updated);

  if (updateError) {
    throw updateError;
  }

  if (feedback.email) {
    const { error: emailError } = await resend.emails.send({
      from: "Fitly <hello@fitly.bio>",
      to: [feedback.email],
      subject: "Odpowiedź na Twoje zgłoszenie",
      react: FeedbackReplyEmail({
        title: feedback.title,
        message: feedback.message,
        reply: adminReply,
      }),
    });

    if (emailError) {
      throw emailError;
    }
  }

  revalidatePath("/dashboard/feedback");
  revalidatePath("/dashboard/admin/feedback");
  revalidatePath(`/dashboard/admin/feedback/${feedbackId}`);
}
