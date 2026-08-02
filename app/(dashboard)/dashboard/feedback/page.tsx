import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import PanelTitle from "@/components/dashboard/panel-title";
import { FeedbackForm } from "@/components/dashboard/feedback/feedback-form";
import { CommunityFeedbackList } from "@/components/dashboard/feedback/user-feedback-list";

export default async function FeedbackPage() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const { data: communityFeedback } = await supabase
    .from("feedback")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  return (
    <section className="mx-auto max-w-3xl space-y-10">
      <div>
        <PanelTitle title="Pomysły i opinie" />

        <p className="mt-2 text-muted-foreground">
          Masz pomysł na nową funkcję, znalazłeś błąd lub czegoś Ci brakuje?
          Napisz do mnie. Każda wiadomość trafia bezpośrednio do twórcy Fitly.
        </p>
      </div>

      <FeedbackForm />

      <CommunityFeedbackList feedback={communityFeedback ?? []} />
    </section>
  );
}
