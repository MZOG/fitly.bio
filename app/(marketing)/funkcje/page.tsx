import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import {
  BarChart3,
  Check,
  ClipboardList,
  Images,
  Inbox,
  Link2,
  Palette,
  Share2,
  Smartphone,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";
import CallToAction from "@/components/marketing/cta";
import { PageHero, SectionBadge } from "@/components/marketing/page-sections";

export const metadata: Metadata = pageMetadata({
  title: "Funkcje – Fitly",
  description:
    "Profil trenera w jednym linku, oferta z cennikiem, formularze zgłoszeniowe, panel zgłoszeń, galeria i social media. Zobacz, co oferuje Fitly.",
  path: "/funkcje",
});

type Plan = "free" | "pro" | "soon";

const planLabel: Record<Plan, string> = {
  free: "W planie darmowym",
  pro: "Fitly PRO",
  soon: "Planowane",
};

const planClass: Record<Plan, string> = {
  free: "bg-green-300/25 text-foreground",
  pro: "bg-fitly text-primary-foreground",
  soon: "bg-secondary text-muted-foreground",
};

const features: {
  icon: typeof Link2;
  title: string;
  desc: string;
  points: { text: string; plan: Plan }[];
}[] = [
  {
    icon: Link2,
    title: "Profil trenera w jednym linku",
    desc: "Twoja wizytówka online pod adresem fitly.bio/twoja-nazwa. Wklejasz go w bio i nie musisz już nic tłumaczyć w wiadomościach.",
    points: [
      { text: "Adres profilu z imienia i nazwiska", plan: "free" },
      { text: "Zdjęcie profilowe i bio do 400 znaków", plan: "free" },
      { text: "Miasto, siłownia i do 3 specjalizacji", plan: "free" },
      { text: "Własna nazwa użytkownika w adresie profilu", plan: "pro" },
      { text: "Więcej siłowni, specjalizacji i dłuższe bio", plan: "pro" },
    ],
  },
  {
    icon: ClipboardList,
    title: "Oferta i cennik",
    desc: "Pokaż, co oferujesz i ile to kosztuje. Klient od razu wie, czego się spodziewać, a Ty nie wysyłasz cennika każdej osobie z osobna.",
    points: [
      {
        text: "3 gotowe usługi: trening personalny, prowadzenie online, plan treningowy",
        plan: "free",
      },
      { text: "Własne ceny dla każdej usługi", plan: "free" },
      { text: "Nielimitowane usługi z własnymi nazwami i opisami", plan: "pro" },
    ],
  },
  {
    icon: UserRound,
    title: "Formularz zgłoszeniowy do każdej usługi",
    desc: "Klient wybiera usługę i od razu odpowiada na pytania o cel, doświadczenie i dostępność. Pierwszą rozmowę zaczynasz z konkretną wiedzą.",
    points: [
      { text: "Gotowe pytania dopasowane do każdej usługi", plan: "free" },
      { text: "Dane kontaktowe klienta w jednym miejscu", plan: "free" },
      {
        text: "Własne pytania: tekstowe, jednokrotnego i wielokrotnego wyboru",
        plan: "pro",
      },
    ],
  },
  {
    icon: Inbox,
    title: "Panel zgłoszeń",
    desc: "Wszystkie zapytania od klientów w jednej liście zamiast w pięciu aplikacjach. Wiesz, z kim już rozmawiałeś i na jakim etapie jest współpraca.",
    points: [
      { text: "Powiadomienie e-mail o każdym nowym zgłoszeniu", plan: "free" },
      { text: "Lista zgłoszeń z usługą, datą i telefonem", plan: "free" },
      {
        text: "Statusy: Nowy, Skontaktowano, Zakończony, Anulowany",
        plan: "free",
      },
      { text: "Dostęp do 5 najnowszych zgłoszeń", plan: "free" },
      { text: "Dostęp do wszystkich zgłoszeń", plan: "pro" },
    ],
  },
  {
    icon: Images,
    title: "Galeria i metamorfozy",
    desc: "Zdjęcia z treningów i efekty klientów budują zaufanie szybciej niż jakikolwiek opis.",
    points: [
      { text: "Galeria do 2 zdjęć z podpisami", plan: "free" },
      { text: "Nielimitowana galeria zdjęć", plan: "pro" },
      { text: "Metamorfozy „przed / po” z suwakiem porównania", plan: "pro" },
    ],
  },
  {
    icon: Share2,
    title: "Social media",
    desc: "Połącz wszystkie swoje kanały w jednym miejscu, żeby klient mógł zobaczyć więcej Twojej pracy.",
    points: [
      {
        text: "Instagram, Facebook, TikTok, YouTube, X i strona www",
        plan: "free",
      },
    ],
  },
];

const extras = [
  {
    icon: Smartphone,
    title: "Działa na telefonie",
    desc: "Profil i panel są dopasowane do smartfonów, bo stamtąd przychodzi większość klientów.",
    plan: "free" as Plan,
  },
  {
    icon: Palette,
    title: "Motywy profilu",
    desc: "Klasyczny, Minimal i Ciemny, żeby profil pasował do Twojej marki.",
    plan: "soon" as Plan,
  },
  {
    icon: BarChart3,
    title: "Statystyki",
    desc: "Liczba odwiedzin profilu i kliknięć w usługi.",
    plan: "soon" as Plan,
  },
  {
    icon: Star,
    title: "Opinie klientów",
    desc: "Rekomendacje podopiecznych widoczne na Twoim profilu.",
    plan: "soon" as Plan,
  },
];

function PlanTag({ plan }: { plan: Plan }) {
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${planClass[plan]}`}
    >
      {planLabel[plan]}
    </span>
  );
}

export default function FeaturesPage() {
  return (
    <main className="font-soehne">
      <PageHero
        badge={
          <>
            <Sparkles className="size-4" />
            <span className="leading-0">Funkcje</span>
          </>
        }
        title={
          <>
            Wszystko, czego trener potrzebuje,{" "}
            <span className="text-fitly">w jednym miejscu</span>
          </>
        }
        description="Profil, oferta, formularze i zgłoszenia. Fitly zastępuje rozsyłanie cennika w wiadomościach, formularze Google i ręczne notowanie zapytań."
      />

      <section className="bg-fitly/5">
        <div className="mx-auto max-w-6xl space-y-5 px-5 py-20 lg:px-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="grid gap-6 rounded-3xl border border-border bg-card p-7 sm:p-9 lg:grid-cols-[1fr_1.1fr] lg:gap-12"
            >
              <div>
                <span className="flex size-12 items-center justify-center rounded-full bg-fitly/10 text-fitly">
                  <f.icon className="size-6" />
                </span>
                <h2 className="mt-5 text-xl font-bold sm:text-2xl">
                  {f.title}
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </div>
              <ul className="space-y-3 self-center">
                {f.points.map((p) => (
                  <li
                    key={p.text}
                    className="flex flex-wrap items-start gap-x-3 gap-y-1"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-fitly/10 text-fitly">
                      <Check className="size-3" />
                    </span>
                    <span className="flex-1 text-[15px]">{p.text}</span>
                    <PlanTag plan={p.plan} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
          <div className="max-w-2xl">
            <SectionBadge>Co jeszcze</SectionBadge>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
              Rozwijamy Fitly razem z trenerami
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
              Kolejne funkcje powstają na podstawie Waszych opinii. Masz pomysł?
              Napisz do nas z zakładki „Pomysły i opinie” w panelu.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {extras.map((e) => (
              <div
                key={e.title}
                className="rounded-3xl border border-border bg-card p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-12 items-center justify-center rounded-full bg-fitly/10 text-fitly">
                    <e.icon className="size-6" />
                  </span>
                  <PlanTag plan={e.plan} />
                </div>
                <h3 className="mt-5 text-lg font-bold">{e.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {e.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </main>
  );
}
