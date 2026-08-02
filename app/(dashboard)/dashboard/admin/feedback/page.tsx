import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

import PanelTitle from "@/components/dashboard/panel-title";
import { Feedback } from "@/lib/types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

const statusLabels = {
  new: "Nowe",
  planned: "Zaplanowane",
  replied: "W realizacji",
  closed: "Gotowe",
} as const;

const typeLabels = {
  idea: "💡 Pomysł",
  bug: "🐛 Problem",
  question: "❓ Pytanie",
  other: "📝 Inne",
} as const;

export default async function AdminFeedbackPage() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: feedback, error } = await supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Feedback[]>();

  return (
    <section className="container space-y-6">
      <PanelTitle title="Feedback" />

      <div className="overflow-hidden rounded-xl border bg-background">
        {feedback?.map((item) => (
          <Link
            key={item.id}
            href={`/dashboard/admin/feedback/${item.id}`}
            className="flex items-center justify-between border-b p-5 transition hover:bg-muted/50 last:border-b-0"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{typeLabels[item.type]}</Badge>

                <Badge>{statusLabels[item.status]}</Badge>
              </div>

              <h3 className="font-semibold">{item.title}</h3>

              <p className="text-sm text-muted-foreground">
                {item.full_name ?? "Nieznany użytkownik"}
              </p>
            </div>

            <ChevronRight className="size-5 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </section>
  );
}
