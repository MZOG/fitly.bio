import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import PanelTitle from "@/components/dashboard/panel-title";
import { FeedbackReplyForm } from "@/components/admin/feedback/feedback-reply-form";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FeedbackDetailsPage({ params }: Props) {
  const { id } = await params;

  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: feedback } = await supabase
    .from("feedback")
    .select("*")
    .eq("id", id)
    .single();

  if (!feedback) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-4xl space-y-8">
      <PanelTitle title="Feedback" />

      <div className="rounded-xl border p-6 space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">Autor</p>
          <p className="font-medium">
            {feedback.full_name ?? "Nieznany użytkownik"}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{feedback.email ?? "-"}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Typ</p>
          <p className="font-medium">{feedback.type}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <p className="font-medium">{feedback.status}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Tytuł</p>
          <p className="font-medium">{feedback.title}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Treść</p>

          <div className="mt-2 rounded-lg bg-muted p-4 whitespace-pre-wrap">
            {feedback.message}
          </div>
        </div>
      </div>

      <FeedbackReplyForm feedback={feedback} />
    </section>
  );
}
