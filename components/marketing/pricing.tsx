import { Check, Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const freeFeatures = [
  "Publiczny profil trenera",
  "Informacje o trenerze",
  "Oferta i cennik usług",
  "Formularz zgłoszeniowy do każdej usługi",
  "Linki do social mediów",
  "Podstawowy motyw profilu",
  "Galeria (maks. 2 zdjęcia)",
];

const proFeatures = [
  { label: "Nielimitowana galeria zdjęć", soon: false },
  { label: "Dodatkowe motywy profilu", soon: false },
  { label: "Personalizacja wyglądu", soon: false },
  { label: "Statystyki odwiedzin i kliknięć", soon: true },
  { label: "Opinie klientów", soon: true },
  { label: "Zdjęcia „Przed / Po” z suwakiem", soon: true },
];

export function Pricing() {
  return (
    <section id="cennik" className="font-soehne">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-fitly/20 bg-fitly/5 px-4 py-1.5 text-sm font-medium text-fitly">
            Cennik
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Zacznij za darmo, rozwijaj się z Fitly PRO
          </h2>
          <p className="mt-5 text-lg  leading-relaxed text-muted-foreground text-balance">
            Wybierz plan dopasowany do etapu, na którym jesteś. Bez zobowiązań -
            zaczynasz kiedy chcesz.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 lg:grid-cols-2">
          {/* FREE */}
          <div className="flex flex-col rounded-3xl border border-border bg-card p-8">
            <p className="text-lg font-bold text-foreground">FREE</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Wszystko, by ruszyć z profesjonalnym profilem.
            </p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-foreground">0 zł</span>
              <span className="text-sm text-muted-foreground">/ na zawsze</span>
            </div>
            <Link
              href="/login"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-foreground transition-colors hover:bg-secondary"
            >
              Załóż darmowy profil
            </Link>
            <ul className="mt-8 space-y-3">
              {freeFeatures.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-foreground"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <Check className="size-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* PRO */}
          <div className="relative text-white flex flex-col rounded-3xl border-2 border-fitly bg-fitly p-8 shadow-2xl shadow-primary/20">
            <span className="absolute -top-3 right-8 inline-flex items-center gap-1.5 rounded-full bg-white border border-fitly px-3 py-1 text-xs font-medium text-fitly">
              <Sparkles className="size-3" />
              Najpopularniejszy
            </span>
            <p className="text-lg font-bold">PRO</p>
            <p className="mt-1 text-sm text-primary-foreground/70">
              Wszystko z FREE oraz narzędzia do rozwoju marki.
            </p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold">Wkrótce</span>
            </div>
            <Link
              href="/login"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-fitly "
            >
              Dołącz do listy oczekujących
              <ArrowUpRight className="size-4 transition-transform" />
            </Link>
            <ul className="mt-8 space-y-3">
              {proFeatures.map((item) => (
                <li key={item.label} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Check className="size-3" />
                  </span>
                  <span className="text-primary-foreground/90">
                    {item.label}
                    {item.soon && (
                      <span className="ml-2 rounded-full bg-primary-foreground/15 px-2 py-0.5 text-[11px] font-medium text-primary-foreground/80">
                        planowane
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
