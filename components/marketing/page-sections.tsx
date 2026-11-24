import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SectionBadge({
  children,
  inverted = false,
}: {
  children: React.ReactNode;
  inverted?: boolean;
}) {
  return (
    <span
      className={
        inverted
          ? "inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium"
          : "inline-flex items-center gap-2 rounded-full border border-fitly/20 bg-fitly/5 px-4 py-1.5 text-sm font-medium text-fitly"
      }
    >
      {children}
    </span>
  );
}

export function PageHero({
  badge,
  title,
  description,
  children,
}: {
  badge: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-20 pb-16 text-center lg:px-8">
      <SectionBadge>{badge}</SectionBadge>
      <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
        {title}
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
        {description}
      </p>
      {children}
    </section>
  );
}

export function PrimaryButtons() {
  return (
    <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
      <Link
        href="/login"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-fitly px-5 py-2.5 font-medium text-primary-foreground hover:bg-fitly/90"
      >
        Stwórz profil za darmo
        <ArrowUpRight className="size-5" />
      </Link>
      <Link
        href="/demo"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-muted-foreground transition-colors hover:bg-secondary"
      >
        Zobacz przykładowy profil
      </Link>
    </div>
  );
}

export const gettingStartedSteps = [
  {
    title: "Załóż konto",
    desc: "Kliknij „Stwórz profil za darmo” i zaloguj się kontem Google. Nie potrzebujesz karty płatniczej, a plan darmowy nie wygasa.",
  },
  {
    title: "Uzupełnij swój profil",
    desc: "W zakładce „Mój profil” wpisz imię i nazwisko (z nich powstanie Twój link, np. fitly.bio/anna-kowalska), dodaj zdjęcie, bio, miasto, specjalizacje, siłownię i linki do social mediów.",
  },
  {
    title: "Dodaj usługi",
    desc: "W zakładce „Usługi” wybierz, co oferujesz, np. trening personalny, prowadzenie online lub plan treningowy, i ustaw ceny.",
  },
  {
    title: "Pokaż efekty w galerii",
    desc: "Dodaj zdjęcia z treningów, a w planie PRO także metamorfozy „przed / po” z suwakiem porównania.",
  },
  {
    title: "Udostępnij link",
    desc: "Wklej swój adres fitly.bio do bio na Instagramie i TikToku, do reklam, na wizytówkę i w odpowiedziach na wiadomości.",
  },
  {
    title: "Odbieraj zgłoszenia",
    desc: "O każdym zgłoszeniu dostaniesz e-mail, a samo zgłoszenie pojawi się w zakładce „Zgłoszenia”. Skontaktuj się z klientem i oznacz status współpracy.",
  },
];

export function GettingStarted({ id = "start" }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
        <SectionBadge>Pierwsze kroki</SectionBadge>
        <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
          Od założenia konta do pierwszego zgłoszenia
        </h2>
        <ol className="mt-10 space-y-8">
          {gettingStartedSteps.map((step, i) => (
            <li key={step.title} className="flex gap-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-fitly text-lg font-bold text-primary-foreground">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
