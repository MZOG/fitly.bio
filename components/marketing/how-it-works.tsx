import Image from "next/image";

const steps = [
  {
    title: "Stwórz swój profil",
    desc: "Załóż konto, dodaj informacje o sobie, zdjęcie i linki do social mediów. Wybierz motyw dopasowany do Twojej marki.",
  },
  {
    title: "Dodaj ofertę i cennik",
    desc: "Opisz swoje usługi, ustal ceny i podłącz formularz zgłoszeniowy do każdej z nich. Wszystko przejrzyście dla klienta.",
  },
  {
    title: "Zdobywaj zgłoszenia",
    desc: "Udostępnij jeden link w bio, reklamach i rozmowach. Klienci wypełniają formularz, a Ty otrzymujesz gotowe zgłoszenia.",
  },
];

export function HowItWorks() {
  return (
    <section id="jak-to-dziala" className="bg-fitly/5 font-soehne">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        {/* Image */}
        <div className="relative order-last lg:order-first">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl">
            <Image
              src="/trainer-client.png"
              alt="Trener personalny prowadzący trening ze swoim podopiecznym"
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-6 rounded-xl bg-fitly px-5 py-4 text-primary-foreground shadow-xl">
            <p className="font-display text-2xl font-bold">5 min</p>
            <p className="text-xs text-primary-foreground/70">
              i profil jest gotowy
            </p>
          </div>
        </div>

        {/* Steps */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-fitly/20 bg-fitly/5 px-4 py-1.5 text-sm font-medium text-fitly">
            Jak to działa
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Od zera do gotowego profilu w trzech krokach
          </h2>

          <ol className="mt-10 space-y-8">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-fitly font-display text-lg font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
