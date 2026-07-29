import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PanelTitle from "@/components/dashboard/panel-title";
import { cookies } from "next/headers";
import { LeadContactCard } from "@/components/dashboard/leads/lead-contact-card";
import { LeadServiceCard } from "@/components/dashboard/leads/lead-service-card";
import { LeadStatusCard } from "@/components/dashboard/leads/lead-status.card";
import { LeadAnswersCard } from "@/components/dashboard/leads/lead-answers-card";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LeadPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const { data: lead, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .eq("trainer_id", user.id)
    .single();

  if (error || !lead) {
    notFound();
  }

  if (!lead.is_read) {
    await supabase
      .from("leads")
      .update({
        is_read: true,
      })
      .eq("id", lead.id)
      .eq("trainer_id", user.id);
  }

  return (
    <section className="container">
      <PanelTitle title={lead.contact.name} />

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6">
          <LeadContactCard contact={lead.contact} />
          <LeadServiceCard service={lead.service_name} />
          <LeadStatusCard lead={lead} />
        </div>

        <div className="lg:col-span-2">
          <LeadAnswersCard answers={lead.answers} />
        </div>
      </div>
    </section>
  );
}
