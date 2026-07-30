import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { LatestLeads } from "@/components/dashboard/latest-leads";
import PanelTitle from "@/components/dashboard/panel-title";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ProfileCompletionBanner } from "@/components/dashboard/profile-completion-banner";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const [{ data: profile }, { data: leads }] = await Promise.all([
    supabase
      .from("profiles")
      .select(
        `
    avatar_url,
    bio,
    city,
    specializations,
    socials,
    services
  `,
      )
      .eq("id", user.id)
      .single(),

    supabase
      .from("leads")
      .select(
        `
        id,
        contact,
        service_name,
        created_at,
        is_read
      `,
      )
      .eq("trainer_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  const stats = {
    leads: leads?.length ?? 0,
    unreadLeads: leads?.filter((lead) => !lead.is_read).length ?? 0,
    services: profile?.services?.length ?? 0,
    latestLeads: leads?.slice(0, 5) ?? [],
  };

  return (
    <section className="max-w-3xl mx-auto space-y-8">
      <PanelTitle title="Panel" />

      {profile && <ProfileCompletionBanner profile={profile} />}

      <DashboardStats
        leads={stats.leads}
        unreadLeads={stats.unreadLeads}
        services={stats.services}
      />

      <LatestLeads leads={stats.latestLeads} />

      <QuickActions />
    </section>
  );
}
