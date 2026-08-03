import { resend } from "@/lib/resend";
import { NewLeadEmail } from "@/app/emails/new-lead";
import { FreeLimitEmail } from "@/app/emails/free-limit";
import { LeadAnswer, LeadContact } from "@/lib/types";

type Props = {
  trainerEmail: string;
  trainerPlan: string;
  totalLeads: number;

  serviceName: string;

  contact: LeadContact;
  answers: LeadAnswer[];
};

export async function sendLeadEmail({
  trainerEmail,
  trainerPlan,
  totalLeads,
  serviceName,
  contact,
  answers,
}: Props) {
  const shouldSendLimitedEmail = trainerPlan === "free" && totalLeads > 5;

  const result = await resend.emails.send({
    from: "Fitly <hello@fitly.bio>",
    to: trainerEmail,
    replyTo: contact.email,
    subject: shouldSendLimitedEmail
      ? "Masz nowe zgłoszenie"
      : `Nowe zgłoszenie - ${serviceName}`,
    react: shouldSendLimitedEmail ? (
      <FreeLimitEmail />
    ) : (
      <NewLeadEmail
        serviceName={serviceName}
        contact={contact}
        answers={answers}
      />
    ),
  });

  console.log(result);
}
