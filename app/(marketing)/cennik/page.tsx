import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Check, Minus } from "lucide-react";
import Pricing from "@/components/marketing/pricing";
import CallToAction from "@/components/marketing/cta";
import { SectionBadge } from "@/components/marketing/page-sections";

export const metadata: Metadata = pageMetadata({
  title: "Cennik – Fitly",
  description:
    "Zacznij za darmo, bez karty płatniczej. Porównaj plan darmowy i Fitly PRO i wybierz plan dopasowany do Twojego etapu.",
  path: "/cennik",
});

type Cell = boolean | string;

const rows: { label: string; free: Cell; pro: Cell; soon?: boolean }[] = [
  { label: "Profil trenera pod linkiem fitly.bio", free: true, pro: true },
  { label: "Adres profilu", free: "Z imienia i nazwiska", pro: "Własna nazwa" },
  { label: "Zdjęcie, miasto i social media", free: true, pro: true },
  { label: "Bio", free: "Do 400 znaków", pro: "Bez limitu" },
  { label: "Specjalizacje", free: "Do 3", pro: "Bez limitu" },
  { label: "Siłownie", free: "1", pro: "Więcej" },
  { label: "Usługi z cenami", free: "3 gotowe", pro: "Bez limitu" },
  { label: "Własne nazwy i opisy usług", free: false, pro: true },
  { label: "Formularz zgłoszeniowy do każdej usługi", free: true, pro: true },
  { label: "Własne pytania w formularzach", free: false, pro: true },
  { label: "Powiadomienia e-mail o zgłoszeniach", free: true, pro: true },
  { label: "Panel zgłoszeń ze statusami", free: true, pro: true },
  { label: "Dostęp do zgłoszeń", free: "5 ostatnich", pro: "Wszystkie" },
  { label: "Galeria zdjęć", free: "Do 2 zdjęć", pro: "Bez limitu" },
  { label: "Metamorfozy „przed / po” z suwakiem", free: false, pro: true },
  { label: "Dodatkowe motywy profilu", free: false, pro: true, soon: true },
  { label: "Statystyki odwiedzin i kliknięć", free: false, pro: true, soon: true },
  { label: "Opinie klientów", free: false, pro: true, soon: true },
  { label: "Priorytetowe wsparcie", free: false, pro: true },
];

const faq = [
  {
    q: "Czy plan darmowy ma limit czasowy?",
    a: "Nie. Plan darmowy jest bezpłatny na zawsze. Nie podajesz karty płatniczej przy rejestracji.",
  },
  {
    q: "Kiedy pojawi się Fitly PRO i ile będzie kosztować?",
    a: "Plan PRO jest w przygotowaniu. Cenę ogłosimy przed startem. Jeśli założysz konto już teraz, dowiesz się o tym jako pierwszy.",
  },
  {
    q: "Czy w planie darmowym jest limit zgłoszeń?",
    a: "Klienci mogą wysyłać Ci zgłoszenia bez ograniczeń. W planie darmowym w panelu widzisz 5 najnowszych zgłoszeń, a pełne szczegóły w powiadomieniach e-mail dostajesz dla pierwszych 5. Plan PRO odblokowuje dostęp do wszystkich zgłoszeń.",
  },
  {
    q: "Jaki będzie adres mojego profilu?",
    a: "W planie darmowym adres tworzony jest z Twojego imienia i nazwiska, np. fitly.bio/anna-kowalska. W planie PRO możesz ustawić własną nazwę użytkownika.",
  },
];

function CellValue({ value }: { value: Cell }) {
  if (value === true)
    return <Check className="mx-auto size-4 text-fitly" aria-label="Tak" />;
  if (value === false)
    return (
      <Minus
        className="mx-auto size-4 text-muted-foreground/50"
        aria-label="Nie"
      />
    );
  return <span className="text-sm font-medium">{value}</span>;
}

export default function PricingPage() {
  return (
    <main className="font-soehne">
      <Pricing asPage />

      {/* Comparison */}
      <section className="bg-fitly/5">
        <div className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
          <div className="text-center">
            <SectionBadge>Porównanie</SectionBadge>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
              Co dostajesz w każdym planie
            </h2>
          </div>
          <div className="mt-10 overflow-x-auto rounded-3xl border border-border bg-card">
            <table className="w-full min-w-[520px] text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-4 text-sm font-medium text-muted-foreground">
                    Funkcja
                  </th>
                  <th className="w-32 px-5 py-4 text-center text-sm font-bold">
                    Za darmo
                  </th>
                  <th className="w-32 px-5 py-4 text-center text-sm font-bold text-fitly">
                    PRO
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.label}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-5 py-3.5 text-[15px]">
                      {r.label}
                      {r.soon && (
                        <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                          planowane
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <CellValue value={r.free} />
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <CellValue value={r.pro} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
          <div className="text-center">
            <SectionBadge>FAQ</SectionBadge>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
              Pytania o cennik
            </h2>
          </div>
          <div className="mt-10 space-y-3">
            {faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-border bg-card px-6 py-4 open:border-fitly/30"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="text-xl leading-none text-fitly transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </main>
  );
}
