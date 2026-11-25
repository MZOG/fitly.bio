import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeDollarSign,
  Camera,
  Lightbulb,
  Mail,
  Megaphone,
  NotebookPen,
  Sparkles,
  Users,
} from "lucide-react";
import CallToAction from "@/components/marketing/cta";
import { PageHero, SectionBadge } from "@/components/marketing/page-sections";

export const metadata: Metadata = pageMetadata({
  title: "Blog – Fitly",
  description:
    "Blog Fitly dla trenerów personalnych: marketing w social mediach, pozyskiwanie klientów, ustalanie cen i budowanie marki osobistej.",
  path: "/blog",
});

const topics = [
  {
    icon: Megaphone,
    title: "Marketing w social mediach",
    desc: "Jak prowadzić Instagram i TikToka, żeby obserwujący zamieniali się w klientów, a nie tylko w polubienia.",
  },
  {
    icon: Users,
    title: "Pozyskiwanie klientów",
    desc: "Skąd brać pierwszych podopiecznych, jak prosić o polecenia i jak odpowiadać na zapytania, żeby kończyły się współpracą.",
  },
  {
    icon: BadgeDollarSign,
    title: "Ceny i oferta",
    desc: "Ile brać za trening, jak układać pakiety i kiedy podnieść stawki bez utraty klientów.",
  },
  {
    icon: Camera,
    title: "Marka osobista",
    desc: "Zdjęcia, bio i metamorfozy, które budują zaufanie. Jak wyróżnić się na tle innych trenerów w Twoim mieście.",
  },
  {
    icon: NotebookPen,
    title: "Praca z podopiecznymi",
    desc: "Pierwsza konsultacja, prowadzenie online i utrzymanie motywacji klientów na dłużej.",
  },
  {
    icon: Lightbulb,
    title: "Nowości w Fitly",
    desc: "Nowe funkcje, porady, jak wycisnąć więcej z profilu, i plany rozwoju aplikacji.",
  },
];

export default function BlogPage() {
  return (
    <main className="font-soehne">
      <PageHero
        badge={
          <>
            <Sparkles className="size-4" />
            <span className="leading-0">Blog</span>
          </>
        }
        title={
          <>
            Wiedza, która pomaga trenerom{" "}
            <span className="text-fitly">rozwijać biznes</span>
          </>
        }
        description="Praktyczne porady o marketingu, pozyskiwaniu klientów i budowaniu marki osobistej. Bez lania wody, konkretnie dla trenerów personalnych."
      />

      {/* Empty state */}
      <section className="mx-auto max-w-4xl px-5 pb-20 lg:px-8">
        <div className="rounded-3xl border border-dashed border-fitly/30 bg-fitly/5 p-8 text-center sm:p-12">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-fitly/10 text-fitly">
            <NotebookPen className="size-6" />
          </span>
          <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
            Pierwsze artykuły już wkrótce
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            Właśnie przygotowujemy pierwsze wpisy. Zanim się pojawią, zajrzyj
            do przewodnika po Fitly albo napisz nam, o czym chcesz przeczytać.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/pomoc"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-fitly px-5 py-2.5 font-medium text-primary-foreground hover:bg-fitly/90"
            >
              Przewodnik po Fitly
              <ArrowUpRight className="size-5" />
            </Link>
            <a
              href="mailto:hello@fitly.bio?subject=Pomys%C5%82%20na%20artyku%C5%82"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-muted-foreground transition-colors hover:bg-secondary"
            >
              <Mail className="size-4" />
              Zaproponuj temat
            </a>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="bg-fitly/5">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
          <div className="max-w-2xl">
            <SectionBadge>O czym będziemy pisać</SectionBadge>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
              Tematy, które pomogą Ci zdobywać klientów
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((t) => (
              <div
                key={t.title}
                className="rounded-3xl border border-border bg-card p-7"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-fitly/10 text-fitly">
                  <t.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{t.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {t.desc}
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
