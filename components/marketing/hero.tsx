import Image from "next/image";
import { Sparkles, ArrowUpRight, Check } from "lucide-react";
import { ProfilePreview } from "./profile-preview";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Diagonal accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 hidden h-130 w-130 rotate-12 rounded-[4rem] bg-fitly/5 lg:block"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        {/* Left */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-fitly/20 bg-fitly/5 px-4 py-1.5 text-sm font-medium text-fitly">
            <Sparkles className="size-4" />
            <span className="leading-0"> Dla trenerów personalnych</span>
          </span>

          <h1 className="mt-6 font-soehne text-4xl font-bold leading-[1.05] tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
            Twój profesjonalny profil trenera w{" "}
            <span className="text-fitly">jednym linku</span>.
          </h1>

          <p className="mt-6 max-w-md text-lg font-soehne text-muted-foreground">
            Zamiast wysyłać klientów na Instagram, Messenger czy formularze
            Google - udostępnij jeden link. Pokaż ofertę, zaprezentuj efekty i
            zdobywaj nowe zgłoszenia w jednym miejscu.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-fitly hover:bg-fitly/90 px-5 py-2.5 text-base font-medium text-primary-foreground"
            >
              Stwórz profil za darmo
              <ArrowUpRight className="size-5 transition-transform" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-base text-muted-foreground transition-colors hover:bg-secondary"
            >
              Zobacz przykładowy profil
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {["Darmowy plan na start", "Bez kodowania", "Gotowy w 5 minut"].map(
              (item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  <span className="flex size-5 items-center justify-center rounded-full bg-green-300/25 text-accent-foreground">
                    <Check className="size-3" />
                  </span>
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Right */}
        <div className="relative">
          <div className="relative mx-auto aspect-4/5 w-full max-w-md overflow-hidden rounded-[2.5rem] bg-secondary">
            <Image
              src="/hero-trainer.png"
              alt="Trenerka personalna prezentująca swój profil na platformie Fitly"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover"
            />
          </div>
          {/* Floating profile card */}
          <div className="absolute bottom-12 -left-4 hidden sm:block lg:-left-16">
            <ProfilePreview />
          </div>
        </div>
      </div>
    </section>
  );
}
