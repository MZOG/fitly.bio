import { Check, Play, X } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <section>
      <header className="sticky top-0 z-50 bg-[#FAFAF8]/70 backdrop-blur-md">
        <div className="mx-auto container flex justify-between items-center px-8 py-5">
          <div className="col-start-2 font-grotesk text-[19px] font-bold tracking-[0.02em]">
            FITLY
          </div>
          <div className="col-start-3 flex items-center justify-end gap-5.5">
            <a
              href="#"
              className="text-[14.5px] font-medium text-[#1B1D17]/75 transition hover:text-[#1B1D17]"
            >
              Zaloguj się
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#12140F] px-5 py-2.75 text-[14.5px] font-semibold text-[#FAFAF8] shadow-[0_10px_24px_-10px_rgba(18,20,15,0.45)] transition hover:-translate-y-px hover:shadow-[0_14px_28px_-10px_rgba(18,20,15,0.5)]"
            >
              Załóż darmowe konto
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden pt-24 pb-15">
          <div className="mx-auto grid container grid-cols-1 items-center gap-12 px-8 md:grid-cols-[1fr_0.95fr]">
            {/* LEWA KOLUMNA */}
            <div>
              <span className="mb-6.5 inline-flex items-center gap-2 rounded-full border border-[#C7F0DA] bg-[#E9FBF2] px-3.5 py-1.75font-['IBM_Plex_Mono'] text-xs font-medium text-[#0E7A4E]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#17B975] shadow-[0_0_0_3px_rgba(23,185,117,0.18)]" />
                Darmowa strona dla trenerów personalnych
              </span>

              <h1 className="mb-6 max-w-160 font-['Space_Grotesk'] text-[clamp(36px,4.4vw,54px)] font-bold leading-[1.08]">
                Zamień swój profil na Instagramie w stronę, która{" "}
                <span className="bg-[linear-gradient(100deg,#0E7A4E,#17B975_60%,#CFFF5C)] bg-clip-text text-transparent">
                  zdobywa klientów.
                </span>
              </h1>

              <p className="mb-9 max-w-120 text-[17.5px] leading-[1.6] text-[#6B6F63]">
                Zamiast prosić ludzi o wiadomość prywatną, daj im jedną prostą
                stronę z Twoimi usługami, cennikiem i formularzem kontaktowym.
                Jeden link. Więcej klientów.
              </p>

              <div className="mb-7.5 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#12140F] px-6.5 py-3.5 text-[15.5px] font-semibold text-[#FAFAF8] shadow-[0_10px_24px_-10px_rgba(18,20,15,0.45)] transition hover:-translate-y-px hover:shadow-[0_14px_28px_-10px_rgba(18,20,15,0.5)]"
                >
                  Załóż darmowe konto
                </Link>
                <Link
                  target="_blank"
                  href="/marcin-zogrodnik"
                  className="group inline-flex items-center gap-2.5 px-2 py-3.5 text-[15px] font-semibold text-[#1B1D17]"
                >
                  {/* <span className="flex h-8.5 w-8.5 items-center justify-center rounded-full border border-[#E4E6DE] bg-white shadow-[0_12px_30px_-14px_rgba(18,20,15,0.14)] transition-transform group-hover:scale-[1.07]">
                    ▶
                  </span> */}
                  <Play />
                  Zobacz demo
                </Link>
              </div>

              <ul className="flex flex-col gap-2.25">
                {[
                  "Darmowy plan na zawsze",
                  "Zajmuje mniej niż 2 minuty",
                  "Bez kodowania",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.25 text-sm font-medium text-[#6B6F63]"
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#E9FBF2] text-[10px] text-[#0E7A4E]">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* PRAWA KOLUMNA — MOCKUP TELEFONU */}
            <div className="relative flex min-h-130 items-center justify-center md:min-h-160">
              <div className="absolute -right-15 -top-10 z-0 h-120 w-120 rounded-full bg-[radial-gradient(circle_at_30%_30%,#B9F5CE,#EAF9E4_60%,transparent_75%)] opacity-90 blur-[70px]" />
              <div className="absolute -bottom-7.5 -left-7.5 z-0 h-90 w-90 rounded-full bg-[radial-gradient(circle_at_60%_40%,#DFF6C8,transparent_70%)] opacity-80 blur-[70px]" />

              {/* dymek: nowy lead */}
              <div className="absolute left-0 top-14.5 z-4 flex items-center gap-2.5 rounded-xl border border-[#E4E6DE] bg-white px-4 py-3 shadow-[0_20px_60px_-24px_rgba(18,20,15,0.18)] sm:-left-11.5">
                <span className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-[#E9FBF2] text-sm">
                  💬
                </span>
                <div>
                  <div className="text-[12.5px] font-bold">
                    Nowe zgłoszenie: Kasia
                  </div>
                  <div className="text-[10.5px] text-[#8B8F81]">
                    Trening Personalny
                  </div>
                </div>
              </div>

              {/* telefon */}
              <div className="relative z-2 h-135 w-65 rounded-[46px] bg-[#12140F] p-3 shadow-[0_20px_60px_-24px_rgba(18,20,15,0.18),0_2px_0_rgba(255,255,255,0.04)_inset] sm:h-155.5 sm:w-75">
                <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,#FAFCF8,#F3F6EF_40%)]">
                  <div className="absolute left-1/2 top-2.5 z-5 h-5.5 w-22.5 -translate-x-1/2 rounded-full bg-[#12140F]" />

                  <div className="flex flex-1 flex-col items-center gap-2.5 overflow-hidden px-4 pb-4 pt-11">
                    <div className="mt-0.5 h-16 w-16 rounded-full border-[3px] border-white bg-[linear-gradient(140deg,#2B2D25,#14150F)] shadow-[0_12px_30px_-14px_rgba(18,20,15,0.14)]" />
                    <div className="mt-0.5 font-['Space_Grotesk'] text-[15.5px] font-bold">
                      Alex Rivera
                    </div>
                    <span className="rounded-full bg-[#E9FBF2] px-2.5 py-0.75 text-[11px] font-semibold text-[#0E7A4E]">
                      Trener personalny
                    </span>
                    <div className="flex items-center gap-1 text-[11.5px] text-[#8B8F81]">
                      📍 Warszawa
                    </div>

                    <div className="mt-0.5 flex gap-2">
                      {["IG", "TT", "✉"].map((label) => (
                        <span
                          key={label}
                          className="flex h-6.5 w-6.5 items-center justify-center rounded-full border border-[#E4E6DE] bg-white text-[11px] shadow-[0_4px_10px_-6px_rgba(0,0,0,0.2)]"
                        >
                          {label}
                        </span>
                      ))}
                    </div>

                    <div className="mt-1.5 flex w-full flex-col gap-1.75">
                      {[
                        {
                          nazwa: "Trening 1:1",
                          opis: "Sesja stacjonarna",
                          cena: "120 zł",
                        },
                        {
                          nazwa: "Program online",
                          opis: "Plan miesięczny",
                          cena: "89 zł/mies.",
                        },
                        {
                          nazwa: "Plan żywieniowy",
                          opis: "Plan indywidualny",
                          cena: "60 zł",
                        },
                      ].map((s) => (
                        <div
                          key={s.nazwa}
                          className="flex w-full items-center justify-between rounded-[14px] border border-[#E4E6DE] bg-white px-3 py-2.25 shadow-[0_8px_18px_-12px_rgba(18,20,15,0.15)]"
                        >
                          <div>
                            <div className="text-[11.5px] font-bold">
                              {s.nazwa}
                            </div>
                            <div className="mt-px text-[9.5px] text-[#8B8F81]">
                              {s.opis}
                            </div>
                          </div>
                          <div className="font-['IBM_Plex_Mono'] text-[12px] font-bold text-[#0E7A4E]">
                            {s.cena}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-1.5 w-full rounded-[13px] bg-[#12140F] py-2.75 text-center text-[12.5px] font-bold text-white">
                      Umów darmową rozmowę
                    </div>

                    <div className="mt-2 flex w-full flex-col gap-1.5 rounded-[14px] border border-[#E4E6DE] bg-white p-2.5 shadow-[0_8px_18px_-12px_rgba(18,20,15,0.15)]">
                      <div>
                        <div className="text-[9px] font-semibold uppercase tracking-[0.04em] text-[#8B8F81]">
                          Imię
                        </div>
                        <div className="h-5 rounded-[7px] bg-[#F2F4EF]" />
                      </div>
                      <div>
                        <div className="text-[9px] font-semibold uppercase tracking-[0.04em] text-[#8B8F81]">
                          Email
                        </div>
                        <div className="h-5 rounded-[7px] bg-[#F2F4EF]" />
                      </div>
                      <div className="mt-1 rounded-[10px] bg-[#17B975] py-2 text-center text-[11px] font-bold text-white">
                        Wyślij wiadomość
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* dymek: statystyka */}
              <div className="absolute -right-1.5 bottom-16 z-4 flex flex-col items-start gap-0.5 rounded-xl border border-[#E4E6DE] bg-white px-4 py-3 shadow-[0_20px_60px_-24px_rgba(18,20,15,0.18)] sm:-right-8.5">
                <span className="font-['Space_Grotesk'] text-[20px] font-bold text-[#0E7A4E]">
                  +24
                </span>
                <span className="text-[10.5px] font-medium text-[#8B8F81]">
                  klientów w tym miesiącu
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM / PORÓWNANIE */}
        <section className="border-y border-[#E4E6DE] bg-[#F2F4EF] py-30">
          <div className="mx-auto max-w-295 px-8">
            <div className="mx-auto mb-16 max-w-170 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E4E6DE] bg-white px-3.5 py-1.75 font-['IBM_Plex_Mono'] text-xs font-medium text-[#6B6F63] shadow-[0_12px_30px_-14px_rgba(18,20,15,0.14)]">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF9C8C]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FFD37A]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#17B975]" />
                </span>
                fitly.bio/marcin-zogrodnik
              </span>

              <h2 className="mb-4.5 mt-5.5 font-['Space_Grotesk'] text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.15]">
                Większość trenerów personalnych codziennie traci potencjalnych
                klientów.
              </h2>
              <p className="text-[16.5px] leading-[1.65] text-[#6B6F63]">
                Ludzie są zainteresowani po obejrzeniu Twojego Instagrama czy
                TikToka, ale wielu z nich nigdy nie zostaje klientem, bo nie ma
                prostego sposobu, by się z Tobą skontaktować albo zrozumieć
                Twoją ofertę.
              </p>
            </div>

            <div className="mx-auto grid max-w-245 grid-cols-1 gap-7 md:grid-cols-2">
              {/* KARTA: PROBLEM */}
              <div className="relative overflow-hidden rounded-[24px] bg-[#12140F] px-9 py-10 shadow-[0_20px_60px_-24px_rgba(18,20,15,0.18)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_220px_at_85%_-10%,rgba(255,92,82,0.22),transparent_70%)]" />
                <h3 className="relative mb-6.5 flex items-center gap-2.5 text-[19px] font-bold text-white">
                  Typowy profil na Instagramie
                </h3>
                <ul className="relative flex flex-col gap-4">
                  {[
                    "Klient musi napisać wiadomość prywatną",
                    "Oferta ginie w Relacjach i postach",
                    "Cennik wysyłasz każdemu osobno",
                    "Codziennie odpowiadasz na te same pytania",
                    "Nie wiesz, kto był zainteresowany",
                    "Tracisz osoby, które nie zrobiły pierwszego kroku",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-[15px] font-medium leading-normal text-[#C8C9C0]"
                    >
                      <X className="text-red-600" size={15} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* KARTA: FITLY */}
              <div className="relative overflow-hidden rounded-[24px] border border-[#E4E6DE] bg-white px-9 py-10 shadow-[0_20px_60px_-24px_rgba(18,20,15,0.18)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_220px_at_85%_-10%,rgba(23,185,117,0.14),transparent_70%)]" />
                <h3 className="relative mb-6.5 flex items-center gap-2.5 text-[19px] font-bold">
                  FITLY.
                </h3>
                <ul className="relative flex flex-col gap-4">
                  {[
                    "Jeden link z całą Twoją ofertą",
                    "Profesjonalna strona dostępna 24/7",
                    "Przejrzyste usługi z własnym formularzem",
                    "Klient zgłasza się bez pisania na DM",
                    "Wszystkie zgłoszenia w jednym panelu",
                    "Więcej zapytań i profesjonalny wizerunek",
                  ].map((item) => (
                    <li
                      key={item}
                      className={`flex items-center gap-3 text-[15px] leading-normal `}
                    >
                      <Check size={15} className="text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* STOPKA */}
      <footer className="px-8 pb-12 pt-16 text-center">
        <div className="font-grotesk uppercase italic text-[16px] font-extrabold">
          FITLY.
        </div>
        <p className="mt-2.5 text-[13px] text-[#8B8F81]">
          Jeden link. Więcej klientów. © 2026 Fitly.
        </p>
      </footer>
    </section>
  );
}
