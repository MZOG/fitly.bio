import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { SectionBadge } from "@/components/marketing/page-sections";
import {
  ArrowUpRight,
  Check,
  ClipboardList,
  Clock,
  Images,
  Inbox,
  LayoutDashboard,
  Lightbulb,
  Link2,
  Mail,
  MessageCircle,
  Share2,
  Sparkles,
  TrendingUp,
  UserRound,
} from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "Pomoc – jak korzystać z Fitly",
  description:
    "Przewodnik dla trenerów personalnych: dlaczego warto założyć profil w Fitly, jak go skonfigurować i jak zdobywać zgłoszenia od klientów.",
  path: "/pomoc",
});

const benefits = [
  {
    icon: Link2,
    title: "Jeden link zamiast pięciu",
    desc: "Oferta, cennik, zdjęcia, social media i formularz kontaktowy pod jednym adresem fitly.bio/twoja-nazwa. Klient nie musi Cię szukać.",
  },
  {
    icon: Inbox,
    title: "Konkretne zgłoszenia, nie „ile kosztuje?”",
    desc: "Klient wybiera usługę i od razu odpowiada na pytania o cel, doświadczenie i termin. Dostajesz gotowe informacje, zanim zaczniesz rozmowę.",
  },
  {
    icon: Clock,
    title: "Mniej czasu na wiadomości",
    desc: "Nie odpisujesz w kółko na te same pytania w DM-ach. Cennik i opis usług są na profilu, a zgłoszenia trafiają do jednej listy.",
  },
  {
    icon: TrendingUp,
    title: "Profesjonalny wizerunek",
    desc: "Przejrzysty profil z efektami pracy buduje zaufanie szybciej niż przewijanie Instagrama. Wyglądasz jak marka, a nie jak przypadkowe konto.",
  },
];

const panelSections = [
  {
    icon: LayoutDashboard,
    name: "Panel",
    desc: "Strona startowa: liczba nowych i wszystkich zgłoszeń, liczba usług, ostatnie zgłoszenia i podpowiedzi, czego jeszcze brakuje w profilu.",
  },
  {
    icon: UserRound,
    name: "Mój profil",
    desc: "Imię i nazwisko (z nich powstaje adres profilu), zdjęcie profilowe, bio (do 400 znaków), miasto, do 3 specjalizacji, siłownia i social media (Instagram, Facebook, TikTok, YouTube, X, strona www).",
  },
  {
    icon: ClipboardList,
    name: "Usługi",
    desc: "Twoja oferta i cennik. Do każdej usługi przypisany jest formularz z pytaniami, które klient wypełnia przy zgłoszeniu.",
  },
  {
    icon: Images,
    name: "Galeria",
    desc: "Zdjęcia z treningów i metamorfozy klientów. W planie darmowym możesz dodać 2 zdjęcia.",
  },
  {
    icon: Inbox,
    name: "Zgłoszenia",
    desc: "Lista osób, które wypełniły formularz: dane kontaktowe, wybrana usługa i odpowiedzi. Zmieniaj status na „Skontaktowano”, „Zakończony” lub „Anulowany”, żeby nic Ci nie umknęło. W planie darmowym widzisz 5 najnowszych zgłoszeń.",
  },
  {
    icon: MessageCircle,
    name: "Pomysły i opinie",
    desc: "Brakuje Ci czegoś albo coś nie działa? Napisz nam tutaj. Na podstawie tych wiadomości rozwijamy Fitly.",
  },
];

const tips = [
  "Wpisz pełne imię i nazwisko. Z nich powstaje Twój link, a klient łatwo Cię rozpozna.",
  "Dodaj wyraźne zdjęcie twarzy. Klienci chętniej piszą do osoby, którą widzą.",
  "W bio napisz, komu pomagasz i z jakim efektem, np. „Pomagam zapracowanym mamom wrócić do formy w 3 treningi tygodniowo”.",
  "Podawaj ceny. Przejrzysty cennik odsiewa przypadkowe zapytania i skraca rozmowy.",
  "Wstaw link do bio na Instagramie i TikToku oraz dodaj go w relacjach z naklejką „Link”.",
  "Odpowiadaj na zgłoszenia szybko. Pierwsze 24 godziny mają największe znaczenie.",
];

const faq = [
  {
    q: "Czy Fitly jest darmowe?",
    a: "Tak. Plan darmowy jest bezpłatny na zawsze i zawiera profil z własnym linkiem, ofertę z cenami, formularze zgłoszeniowe, powiadomienia e-mail, social media i galerię do 2 zdjęć. Plan PRO z dodatkowymi funkcjami pojawi się wkrótce.",
  },
  {
    q: "Czy muszę umieć projektować strony albo programować?",
    a: "Nie. Wypełniasz proste pola w panelu, a Fitly samo układa profil. Większość trenerów kończy konfigurację w około 5 minut.",
  },
  {
    q: "Jak klient się ze mną kontaktuje?",
    a: "Na Twoim profilu klient wybiera usługę i wypełnia krótki formularz z danymi kontaktowymi i odpowiedziami na pytania. Zgłoszenie od razu pojawia się w zakładce „Zgłoszenia” w Twoim panelu, a Ty dostajesz powiadomienie e-mail.",
  },
  {
    q: "Jaki będzie adres mojego profilu?",
    a: "W planie darmowym adres tworzony jest z imienia i nazwiska, np. fitly.bio/anna-kowalska. W planie PRO ustawisz własną nazwę użytkownika. Pamiętaj, że po zmianie imienia lub nazwy zmieni się też link, więc zaktualizuj go wszędzie, gdzie go udostępniłeś.",
  },
  {
    q: "Czy mogę dodawać własne usługi i pytania w formularzu?",
    a: "W planie darmowym masz 3 gotowe usługi z gotowymi formularzami, które możesz usunąć. Własne usługi, opisy i pytania (tekstowe, jednokrotnego i wielokrotnego wyboru) będą dostępne w planie PRO.",
  },
  {
    q: "Czym różni się plan PRO?",
    a: "PRO da Ci własną nazwę w adresie profilu, dostęp do wszystkich zgłoszeń, nielimitowaną galerię, zdjęcia „przed / po” z suwakiem, więcej siłowni i specjalizacji, nielimitowane usługi z własnymi formularzami, a docelowo także statystyki odwiedzin, opinie klientów i dodatkowe motywy.",
  },
  {
    q: "Gdzie najlepiej udostępniać swój link?",
    a: "W bio na Instagramie i TikToku, w opisie na Facebooku, w reklamach, na wizytówce lub ulotce w siłowni oraz jako odpowiedź na wiadomość „ile kosztuje trening?”.",
  },
];

export default function HelpPage() {
  return (
    <main className="font-soehne">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-5 pt-20 pb-16 text-center lg:px-8">
        <SectionBadge>
          <Sparkles className="size-4" />
          <span className="leading-0">Pomoc i przewodnik</span>
        </SectionBadge>
        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
          Jak korzystać z <span className="text-fitly">Fitly</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
          Wszystko, co musisz wiedzieć, żeby w kilka minut stworzyć profil
          trenera, udostępnić jeden link i zacząć zbierać zgłoszenia od nowych
          klientów.
        </p>
        <nav
          aria-label="Spis treści"
          className="mt-8 flex flex-wrap justify-center gap-2 text-sm"
        >
          {[
            ["#dlaczego", "Dlaczego Fitly"],
            ["#start", "Pierwsze kroki"],
            ["#panel", "Panel trenera"],
            ["#porady", "Porady"],
            ["#faq", "Pytania"],
            ["#kontakt", "Kontakt"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-full border border-border bg-background px-4 py-2 text-muted-foreground transition-colors hover:border-fitly/30 hover:text-fitly"
            >
              {label}
            </a>
          ))}
        </nav>
      </section>

      {/* Why */}
      <section id="dlaczego" className="scroll-mt-20 bg-fitly/5">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
          <div className="max-w-2xl">
            <SectionBadge>Dlaczego warto</SectionBadge>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
              Po co trenerowi personalnemu profil w Fitly?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
              Klienci szukają trenera w internecie, ale informacje o Tobie są
              rozrzucone po Instagramie, Messengerze i formularzach. Fitly
              zbiera je w jednym miejscu i zamienia odwiedziny w zgłoszenia.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-3xl border border-border bg-card p-7"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-fitly/10 text-fitly">
                  <b.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{b.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting started pointer */}
      <section id="start" className="scroll-mt-20">
        <div className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
          <div className="flex flex-col items-start gap-6 rounded-3xl border border-fitly/20 bg-fitly/5 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <SectionBadge>Pierwsze kroki</SectionBadge>
              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                Zaczynasz? Zobacz, jak to działa
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                Sześć kroków od założenia konta do pierwszego zgłoszenia od
                klienta.
              </p>
            </div>
            <Link
              href="/jak-to-dziala"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-fitly px-5 py-2.5 font-medium text-primary-foreground hover:bg-fitly/90"
            >
              Jak to działa
              <ArrowUpRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard guide */}
      <section id="panel" className="scroll-mt-20 bg-fitly/5">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
          <div className="max-w-2xl">
            <SectionBadge>Panel trenera</SectionBadge>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
              Co znajdziesz w panelu
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
              Po zalogowaniu masz w menu kilka zakładek. Oto do czego służy
              każda z nich.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {panelSections.map((s) => (
              <div
                key={s.name}
                className="rounded-3xl border border-border bg-card p-7"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-fitly/10 text-fitly">
                  <s.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{s.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section id="porady" className="scroll-mt-20">
        <div className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
          <SectionBadge>
            <Lightbulb className="size-4" />
            <span className="leading-0">Porady</span>
          </SectionBadge>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
            Jak zdobyć więcej zgłoszeń
          </h2>
          <ul className="mt-10 space-y-4">
            {tips.map((tip) => (
              <li key={tip} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-fitly/10 text-fitly">
                  <Check className="size-3.5" />
                </span>
                <span className="text-[15px] leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-start gap-4 rounded-3xl border border-fitly/20 bg-fitly/5 p-6">
            <Share2 className="mt-0.5 size-5 shrink-0 text-fitly" />
            <p className="text-[15px] leading-relaxed">
              <strong>Gotowa odpowiedź na DM:</strong>{" "}
              <span className="text-muted-foreground">
                „Cześć! Wszystkie moje usługi i ceny znajdziesz tutaj:
                fitly.bio/twoja-nazwa. Wybierz, co Cię interesuje, i wypełnij
                krótki formularz, a odezwę się do Ciebie.”
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 bg-fitly/5">
        <div className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
          <div className="text-center">
            <SectionBadge>FAQ</SectionBadge>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
              Najczęstsze pytania
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

      {/* Contact */}
      <section id="kontakt" className="scroll-mt-20">
        <div className="mx-auto max-w-2xl px-5 py-20 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Nie znalazłeś odpowiedzi?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Masz pytanie, potrzebujesz pomocy albo chcesz się czymś podzielić?
            Napisz do nas.
          </p>
          <div className="mt-10 rounded-3xl border bg-muted/30 p-8 sm:p-10">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-fitly/10">
              <Mail className="size-6 text-fitly" />
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Napisz do nas na adres
            </p>
            <a
              href="mailto:hello@fitly.bio"
              className="mt-1 inline-block text-xl font-semibold transition-colors hover:text-fitly"
            >
              hello@fitly.bio
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              Postaramy się odpowiedzieć tak szybko, jak to możliwe.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
