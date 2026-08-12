import {
  UserRound,
  ClipboardList,
  Share2,
  Palette,
  Images,
  Link2,
} from "lucide-react";

const features = [
  {
    icon: UserRound,
    title: "Publiczny profil trenera",
    desc: "Profesjonalna wizytówka online z informacjami o Tobie, Twoim doświadczeniu i specjalizacji.",
  },
  {
    icon: ClipboardList,
    title: "Oferta i cennik usług",
    desc: "Przejrzyście zaprezentuj wszystkie swoje usługi wraz z cenami — bez nieporozumień.",
  },
  {
    icon: Link2,
    title: "Formularz zgłoszeniowy",
    desc: "Do każdej usługi dodaj dedykowany formularz i przyjmuj konkretne zgłoszenia od klientów.",
  },
  {
    icon: Share2,
    title: "Linki do social mediów",
    desc: "Połącz swój profil z Instagramem, Facebookiem i innymi kanałami w jednym miejscu.",
  },
  {
    icon: Palette,
    title: "Motywy profilu",
    desc: "Wybierz motyw dopasowany do swojej marki i wyróżnij się na tle innych trenerów.",
  },
  {
    icon: Images,
    title: "Galeria zdjęć",
    desc: "Pokaż efekty pracy z klientami i zdjęcia z treningów, które budują zaufanie.",
  },
];

export default function Features() {
  return (
    <section id="funkcje" className="bg-background font-soehne">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-fitly/20 bg-fitly/5 px-4 py-1.5 text-sm font-medium text-fitly">
            Funkcje
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Wszystko, czego potrzebujesz, by budować swoją markę
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
            Fitly łączy w sobie wszystkie narzędzia, które pomagają trenerom
            prezentować się profesjonalnie i zdobywać nowych klientów.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-border bg-card p-7 transition-colors hover:border-fitly/30"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-fitly/7 text-fitly transition-colors group-hover:text-white group-hover:bg-fitly group-hover:text-fitly-foreground">
                <feature.icon className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
