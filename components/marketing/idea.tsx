import {
  AtSign,
  MessageCircle,
  ClipboardList,
  ArrowRight,
  Link2,
} from "lucide-react";

const scattered = [
  { icon: AtSign, label: "Instagram DM" },
  { icon: MessageCircle, label: "Messenger" },
  { icon: ClipboardList, label: "Formularz Google" },
];

export default function Idea() {
  return (
    <section className="bg-fitly text-primary-foreground font-soehne">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium">
            Główna idea
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Koniec z chaosem rozproszonych wiadomości
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-primary-foreground/70 text-pretty">
            Twoi klienci nie muszą już szukać Cię w pięciu miejscach. Wszystko,
            czego potrzebują, znajdą pod jednym adresem.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          {/* Before */}
          <div className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/60">
              Wcześniej
            </p>
            <div className="mt-4 space-y-3">
              {scattered.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3"
                >
                  <item.icon className="size-5 text-primary-foreground/70" />
                  <span className="text-sm font-medium text-primary-foreground/80">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <ArrowRight className="size-6" />
            </span>
          </div>

          {/* After */}
          <div className="rounded-3xl border border-accent/40 bg-primary-foreground p-6 text-foreground shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Z Fitly
            </p>
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-secondary px-4 py-4">
              <span className="flex size-10 items-center justify-center rounded-full bg-fitly text-primary-foreground">
                <Link2 className="size-5" />
              </span>
              <div>
                <p className="text-sm">fitly.pl/twoja-nazwa</p>
                <p className="text-xs text-muted-foreground">
                  Profil · Oferta · Zgłoszenia · Galeria
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Jeden link, który udostępniasz wszędzie — w bio, w reklamie i w
              rozmowie z klientem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
