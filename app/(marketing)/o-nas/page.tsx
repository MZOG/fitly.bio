import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  HeartHandshake,
  Mail,
  MessageCircle,
  Rocket,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import CallToAction from "@/components/marketing/cta";
import { PageHero, SectionBadge } from "@/components/marketing/page-sections";

export const metadata: Metadata = {
  title: "O nas – Fitly",
  description:
    "Fitly to narzędzie stworzone dla trenerów personalnych. Poznaj naszą misję i dowiedz się, dlaczego budujemy prosty profil trenera w jednym linku.",
};

const values = [
  {
    icon: Zap,
    title: "Prostota",
    desc: "Trener ma trenować, a nie budować strony internetowe. Profil w Fitly uzupełnisz w kilka minut, bez kodowania i bez znajomości narzędzi do projektowania.",
  },
  {
    icon: Target,
    title: "Konkret",
    desc: "Każda funkcja ma jeden cel: pomóc Ci zdobyć klienta. Przejrzysta oferta, jasne ceny i formularz, który od razu zbiera najważniejsze informacje.",
  },
  {
    icon: HeartHandshake,
    title: "Uczciwość",
    desc: "Darmowy plan jest naprawdę darmowy i nie wygasa. Nie ukrywamy ograniczeń i jasno mówimy, co jest dostępne teraz, a co dopiero planujemy.",
  },
  {
    icon: MessageCircle,
    title: "Słuchamy trenerów",
    desc: "Fitly rozwijamy razem z użytkownikami. Pomysły i opinie z panelu trafiają bezpośrednio do nas i realnie wpływają na kolejne funkcje.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="font-soehne">
      <PageHero
        badge={
          <>
            <Sparkles className="size-4" />
            <span className="leading-0">O nas</span>
          </>
        }
        title={
          <>
            Pomagamy trenerom <span className="text-fitly">zdobywać klientów</span>
          </>
        }
        description="Fitly to profil trenera personalnego w jednym linku. Budujemy go po to, żeby każdy trener, niezależnie od liczby obserwujących, mógł prezentować się profesjonalnie i łatwo przyjmować zgłoszenia."
      />

      {/* Story */}
      <section className="bg-fitly/5">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionBadge>Skąd pomysł</SectionBadge>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
              Klienci gubili się w wiadomościach
            </h2>
          </div>
          <div className="space-y-5 text-[17px] leading-relaxed text-muted-foreground">
            <p>
              Większość trenerów personalnych zdobywa klientów przez Instagram,
              Facebooka i polecenia. Problem w tym, że oferta jest rozrzucona
              po postach, cennik wysyła się ręcznie w wiadomościach, a
              zapytania przychodzą z kilku różnych miejsc naraz.
            </p>
            <p>
              Własna strona internetowa to zwykle koszt, czas i kolejne
              narzędzie do ogarnięcia. Dlatego stworzyliśmy Fitly: jeden
              link, pod którym klient znajdzie wszystko, czego potrzebuje, a
              trener dostaje gotowe zgłoszenia w jednym panelu.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section>
        <div className="mx-auto max-w-4xl px-5 py-20 text-center lg:px-8">
          <SectionBadge>Nasza misja</SectionBadge>
          <p className="mt-8 text-2xl font-bold leading-snug tracking-tight text-balance sm:text-3xl">
            „Chcemy, żeby każdy trener personalny mógł w 5 minut stworzyć
            profesjonalną wizytówkę i skupić się na tym, co robi najlepiej:
            na pracy z ludźmi.”
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-fitly/5">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
          <div className="max-w-2xl">
            <SectionBadge>W co wierzymy</SectionBadge>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
              Zasady, którymi kierujemy się, budując Fitly
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-3xl border border-border bg-card p-7"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-fitly/10 text-fitly">
                  <v.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where we are */}
      <section>
        <div className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
            <span className="flex size-12 items-center justify-center rounded-full bg-fitly/10 text-fitly">
              <Rocket className="size-6" />
            </span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
              Dopiero się rozkręcamy
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Fitly to młody projekt, który stale rozwijamy. Już teraz możesz
              za darmo stworzyć profil, dodać ofertę i przyjmować zgłoszenia.
              Pracujemy nad planem PRO, w którym pojawią się m.in. własne
              usługi i formularze, metamorfozy „przed / po”, statystyki
              odwiedzin i opinie klientów. Jeśli masz pomysł, czego jeszcze
              brakuje, chętnie go poznamy.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:hello@fitly.bio"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 font-medium transition-colors hover:bg-secondary"
              >
                <Mail className="size-4" />
                hello@fitly.bio
              </a>
              <Link
                href="/funkcje"
                className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium hover:text-fitly"
              >
                Zobacz wszystkie funkcje
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </main>
  );
}
