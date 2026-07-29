"use server";

import { sendLeadEmail } from "@/lib/send-lead-email";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { CreateLeadInput } from "@/lib/types";

export async function createLead(input: CreateLeadInput) {
  // 1. Zapisz lead
  const { error: insertError } = await supabaseAdmin.from("leads").insert({
    trainer_id: input.trainerId,

    service_id: input.service.id,
    service_name: input.service.name,

    contact: input.contact,

    answers: input.answers,
  });

  if (insertError) {
    throw new Error(insertError.message);
  }

  // 2. Policz wszystkie leady trenera
  const { count, error: countError } = await supabaseAdmin
    .from("leads")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("trainer_id", input.trainerId);

  if (countError) {
    throw new Error(countError.message);
  }

  // 3. Pobierz plan trenera
  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("plan, full_name")
    .eq("id", input.trainerId)
    .single();

  if (profileError || !profile) {
    throw new Error("Trainer profile not found.");
  }

  // 4. Pobierz email z auth.users
  const {
    data: { user },
    error: userError,
  } = await supabaseAdmin.auth.admin.getUserById(input.trainerId);

  if (userError || !user?.email) {
    throw new Error("Trainer email not found.");
  }

  // 5. Wyślij email (nie blokujemy zgłoszenia jeśli Resend padnie)
  try {
    await sendLeadEmail({
      trainerEmail: user.email,
      trainerPlan: profile.plan,
      totalLeads: count ?? 0,
      serviceName: input.service.name,
      contact: input.contact,
      answers: input.answers,
    });
  } catch (error) {
    console.error("Failed to send lead email:", error);
  }

  return {
    success: true,
  };
}
