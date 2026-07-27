import PanelTitle from "@/components/dashboard/panel-title";
import { ProFeature } from "@/components/dashboard/pro-feature";
import { ProfileForm } from "@/components/dashboard/profile-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null; // albo redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .maybeSingle();

  return <ProfileForm user={user} profile={profile} />;
}
