import PanelTitle from "@/components/dashboard/panel-title";
import { FeedbackForm } from "@/components/dashboard/feedback/feedback-form";

export default function FeedbackPage() {
  return (
    <section className="max-w-3xl mx-auto">
      <PanelTitle title="Pomysły i opinie" />

      <p className="mt-2 text-muted-foreground">
        Masz pomysł na nową funkcję, znalazłeś błąd lub czegoś Ci brakuje?
        Napisz do mnie. Każda wiadomość trafia bezpośrednio do twórcy Fitly.
      </p>

      <div className="mt-8">
        <FeedbackForm />
      </div>
    </section>
  );
}
