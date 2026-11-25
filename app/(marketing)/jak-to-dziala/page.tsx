import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import {
  ClipboardCheck,
  Eye,
  Inbox,
  Link2,
  MailCheck,
  MousePointerClick,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import Idea from "@/components/marketing/idea";
import CallToAction from "@/components/marketing/cta";
import {
  GettingStarted,
  PageHero,
  PrimaryButtons,
  SectionBadge,
} from "@/components/marketing/page-sections";

export const metadata: Metadata = pageMetadata({
  title: "Jak to działa – Fitly",
  description:
    "Załóż konto, uzupełnij profil, dodaj usługi i udostępnij jeden link. Zobacz krok po kroku, jak Fitly pomaga trenerom personalnym zdobywać zgłoszenia.",
  path: "/jak-to-dziala",
});

const clientJourney = [
  {
    icon: MousePointerClick,
    title: "Klient klika Twój link",
    desc: "Z bio na Instagramie, reklamy, relacji albo wiadomości, którą mu wysłałeś.",
  },
  {
    icon: Eye,
    title: "Poznaje Ciebie i ofertę",
    desc: "Widzi Twoje zdjęcie, opis, specjalizacje, siłownię, galerię i usługi z cenami.",
  },
  {
    icon: ClipboardCheck,
    title: "Wybiera usługę i wypełnia formularz",
    desc: "Podaje dane kontaktowe i odpowiada na kilka pytań, np. o cel, doświadczenie i termin startu.",
  },
];

const trainerSide = [
  {
    icon: MailCheck,
    title: "Dostajesz e-mail",
    desc: "Powiadomienie o nowym zgłoszeniu trafia na Twoją skrzynkę. Możesz odpisać klientowi bezpośrednio z poczty.",
  },
  {
    icon: Inbox,
    title: "Zgłoszenie jest w panelu",
    desc: "W zakładce „Zgłoszenia” widzisz dane kontaktowe, wybraną usługę i wszystkie odpowiedzi klienta.",
  },
  {
    icon: PhoneCall,
    title: "Kontaktujesz się i oznaczasz status",
    desc: "Dzwonisz albo piszesz, a potem ustawiasz status: Skontaktowano, Zakończony lub Anulowany.",
  },
];

function JourneyColumn({
  badge,
  title,
  items,
}: {
  badge: string;
  title: string;
  items: typeof clientJourney;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-7 sm:p-9">
      <SectionBadge>{badge}</SectionBadge>
      <h3 className="mt-5 text-xl font-bold sm:text-2xl">{title}</h3>
      <ol className="mt-8 space-y-6">
        {items.map((item) => (
          <li key={item.title} className="flex gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-fitly/10 text-fitly">
              <item.icon className="size-5" />
            </span>
            <div>
              <p className="font-bold">{item.title}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <main className="font-soehne">
      <PageHero
        badge={
          <>
            <Sparkles className="size-4" />
            <span className="leading-0">Jak to działa</span>
          </>
        }
        title={
          <>
            Jeden link, który <span className="text-fitly">zbiera klientów</span>
          </>
        }
        description="Tworzysz profil raz, udostępniasz link wszędzie, a zgłoszenia od klientów spływają do jednego panelu. Bez strony internetowej, bez kodowania, bez chaosu w wiadomościach."
      >
        <PrimaryButtons />
      </PageHero>

      <div className="bg-fitly/5">
        <GettingStarted />
      </div>

      {/* Flow */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <SectionBadge>
              <Link2 className="size-4" />
              <span className="leading-0">Po udostępnieniu linku</span>
            </SectionBadge>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
              Co dzieje się, gdy klient wejdzie na Twój profil
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <JourneyColumn
              badge="Klient"
              title="Od kliknięcia do zgłoszenia"
              items={clientJourney}
            />
            <JourneyColumn
              badge="Ty"
              title="Od zgłoszenia do współpracy"
              items={trainerSide}
            />
          </div>
        </div>
      </section>

      <Idea />

      <CallToAction />
    </main>
  );
}
