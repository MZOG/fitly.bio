import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import { ServicesForm } from "@/components/dashboard/services-form";
import PanelTitle from "@/components/dashboard/panel-title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <div className="max-w-3xl mx-auto">
      <PanelTitle title="Oferta i cennik" />

      <Accordion defaultValue={["free"]} className="mb-5">
        <AccordionItem value="free">
          <AccordionTrigger>🟢 Plan Free</AccordionTrigger>

          <AccordionContent className="space-y-4 ">
            <p className="text-sm ">
              W planie Free otrzymujesz <strong>3 gotowe usługi</strong>, które
              możesz wyświetlić na swoim profilu.
            </p>

            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium">💪 Trening personalny</p>
                <p className="text-xs text-muted-foreground">
                  Pytania w formularzu:
                </p>
                <ul className="mt-1 list-disc pl-5 text-muted-foreground">
                  <li>Jaki jest Twój główny cel?</li>
                  <li>Czy masz doświadczenie z treningiem?</li>
                  <li>Kiedy chcesz rozpocząć współpracę?</li>
                </ul>
              </div>

              <div>
                <p className="font-medium">🌐 Prowadzenie online</p>
                <p className="text-xs text-muted-foreground">
                  Pytania w formularzu:
                </p>
                <ul className="mt-1 list-disc pl-5 text-muted-foreground">
                  <li>Jaki jest Twój cel?</li>
                  <li>Ile razy w tygodniu możesz trenować?</li>
                  <li>Czy stosujesz specjalną dietę?</li>
                </ul>
              </div>

              <div>
                <p className="font-medium">📋 Plan treningowy</p>
                <p className="text-xs text-muted-foreground">
                  Pytania w formularzu:
                </p>
                <ul className="mt-1 list-disc pl-5 text-muted-foreground">
                  <li>Jaki jest Twój cel?</li>
                  <li>Gdzie najczęściej trenujesz?</li>
                  <li>Jakim sprzętem dysponujesz?</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border bg-muted/40 p-4">
              <p className="font-medium">Ograniczenia</p>

              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Maksymalnie 3 gotowe usługi.</li>
                <li>Możesz usunąć usługę, ale nie dodasz nowej.</li>
                <li>Brak możliwości dodania opisu usługi.</li>
                <li>Brak możliwości edycji pytań formularza.</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pro">
          <AccordionTrigger>⭐ Fitly PRO</AccordionTrigger>

          <AccordionContent>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
              <li>Nieograniczona liczba usług.</li>
              <li>Własne nazwy i opisy usług.</li>
              <li>Dowolna liczba formularzy.</li>
              <li>Tworzenie własnych pytań.</li>
              <li>Pytania tekstowe, jednokrotnego i wielokrotnego wyboru.</li>
              <li>Pełna personalizacja formularzy dla każdej usługi.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <ServicesForm
        services={profile?.services ?? []}
        plan={profile?.plan ?? null}
      />
    </div>
  );
}
