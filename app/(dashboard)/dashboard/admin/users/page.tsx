import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { ADMIN_EMAIL } from "@/lib/constants";

import PanelTitle from "@/components/dashboard/panel-title";
import { UsersTable } from "@/components/dashboard/admin/users/users-table";

import { AdminUser } from "@/lib/types";

export default async function AdminUsersPage() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    notFound();
  }

  const { data: users, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<AdminUser[]>();

  if (error) {
    throw new Error(error.message);
  }

  return (
    <section className="container space-y-6">
      <PanelTitle title="Użytkownicy" />

      <UsersTable users={users ?? []} />
    </section>
  );
}
