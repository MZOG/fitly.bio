import { cookies } from "next/headers";
import PanelTitle from "@/components/dashboard/panel-title";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LeadsTable } from "@/components/dashboard/leads/leads-table";

export default async function LeadsPage() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .eq("trainer_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const visibleLeads = profile.plan === "free" ? leads.slice(0, 5) : leads;

  const hiddenLeads =
    profile.plan === "free" ? Math.max(leads.length - 5, 0) : 0;

  return (
    <section className="max-w-3xl mx-auto">
      <PanelTitle title="Leady" />

      <LeadsTable
        leads={visibleLeads}
        hiddenLeads={hiddenLeads}
        trainerPlan={profile.plan}
      />
    </section>
  );
}
