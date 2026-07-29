import { LeadAnswer } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  answers: LeadAnswer[];
};

export function LeadAnswersCard({ answers }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Odpowiedzi</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {answers.map((answer) => (
          <div key={answer.fieldId}>
            <p className="font-medium">{answer.label}</p>

            {Array.isArray(answer.value) ? (
              <ul className="mt-2 list-disc pl-5 text-muted-foreground">
                {answer.value.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 whitespace-pre-wrap text-muted-foreground">
                {answer.value || "-"}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
