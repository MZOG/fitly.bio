import { Feedback } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Props = {
  feedback: Feedback[];
};

const statusLabels = {
  new: "Rozważamy",
  planned: "Zaplanowane",
  replied: "W realizacji",
  closed: "Gotowe",
} as const;

const statusVariants = {
  new: "secondary",
  planned: "outline",
  replied: "default",
  closed: "default",
} as const;

const typeLabels = {
  idea: "Pomysł",
  bug: "Problem",
  question: "Pytanie",
  other: "Inne",
} as const;

export function CommunityFeedbackList({ feedback }: Props) {
  if (feedback.length === 0) {
    return null;
  }

  return (
    <div className="mt-14">
      <div className="mb-8">
        <h2 className="text-lg font-medium">Społeczność</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Zobacz, nad czym aktualnie pracujemy i jakie pomysły zgłaszają inni
          użytkownicy.
        </p>
      </div>

      <div className="rounded-xl border bg-background">
        {feedback.map((item, index) => (
          <div key={item.id}>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{typeLabels[item.type]}</Badge>

                  <Badge variant={statusVariants[item.status]}>
                    {statusLabels[item.status]}
                  </Badge>
                </div>

                <span className="text-xs text-muted-foreground">
                  {new Intl.DateTimeFormat("pl-PL", {
                    dateStyle: "medium",
                  }).format(new Date(item.created_at))}
                </span>
              </div>

              <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>

              <p className="mt-1 whitespace-pre-wrap leading-7 text-muted-foreground">
                {item.message}
              </p>

              {item.admin_reply && (
                <div className="mt-2 rounded-lg bg-muted/30 border border-dashed p-3">
                  <p className="mb-2 font-medium text-sm">Odpowiedź Fitly</p>

                  <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                    {item.admin_reply}
                  </p>
                </div>
              )}
            </div>

            {index !== feedback.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  );
}
