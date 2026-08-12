import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-fitly/5 font-soehne">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-fitly px-8 py-14 text-primary-foreground lg:px-16 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-72 rotate-12 rounded-[3rem] bg-primary-foreground/5"
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
                Stwórz profesjonalny profil trenera już dziś
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-primary-foreground/70 text-pretty">
                Pokaż swoją ofertę, zaprezentuj efekty klientów i zdobywaj nowe
                zgłoszenia — wszystko w jednym miejscu.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-accent-foreground"
                >
                  Zacznij za darmo
                  <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="#jak-to-dziala"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-white hover:text-fitly"
                >
                  Zobacz jak to działa
                </Link>
              </div>
            </div>
            <div className="relative hidden aspect-square overflow-hidden rounded-[2rem] lg:block">
              <Image
                src="/gallery-1.png"
                alt="Osoba trenująca z kettlebell w nowoczesnej siłowni"
                fill
                sizes="360px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
