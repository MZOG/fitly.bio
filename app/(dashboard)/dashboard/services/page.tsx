import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import { ServicesForm } from "@/components/dashboard/services-form";

export default async function ServicesPage() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("services, plan")
    .eq("id", user.id)
    .single();

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold">Usługi i cennik</h1>

      <ServicesForm
        services={profile?.services ?? []}
        plan={profile?.plan ?? null}
      />
    </div>
  );
}
