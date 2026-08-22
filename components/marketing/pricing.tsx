import { Check, Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const freeFeatures = [
  "Własny profil trenera pod jednym linkiem",
  "Nazwa użytkownika i własny adres profilu",
  "Opis trenera i informacje o Tobie",
  "Specjalizacje i obszary, w których pomagasz",
  "Oferta usług wraz z cenami",
  "Formularz zgłoszeniowy do każdej usługi",
  "Linki do social mediów",
  "Galeria zdjęć - do 2 zdjęć",
  "Profesjonalny wygląd profilu",
];

const proFeatures = [
  { label: "Wszystko z planu FREE", soon: false },
  { label: "Nielimitowana galeria zdjęć", soon: false },
  { label: "Zdjęcia „Przed / Po” z suwakiem", soon: false },

  { label: "Możliwość dodania większej liczby siłowni", soon: false },
  { label: "Pełna personalizacja wyglądu profilu", soon: true },

  { label: "Dodatkowe motywy profilu", soon: true },
  { label: "Statystyki odwiedzin i kliknięć", soon: true },
  { label: "Opinie klientów", soon: true },
];

export default function Pricing() {
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
            <p className="text-2xl font-bold font-grotesk">Za darmo</p>
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
          <div className=" text-white flex flex-col rounded-3xl border-2 border-fitly bg-fitly p-8 shadow-2xl shadow-primary/20">
            <p className="text-2xl font-bold font-grotesk">PRO</p>
            <p className="mt-1 text-sm text-primary-foreground/70">
              Wszystko z FREE oraz narzędzia do rozwoju marki.
            </p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold">Wkrótce</span>
            </div>
            <Link
              href="/login"
              className="mt-6 inline-flex font-medium items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-fitly "
            >
              Dołącz do Fitly
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
