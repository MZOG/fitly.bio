import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-fitly">Kontakt</p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Masz pytanie?
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Masz pytanie dotyczące Fitly, potrzebujesz pomocy albo chcesz się
          czymś podzielić? Napisz do nas.
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

        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-2 text-sm font-medium hover:text-fitly"
        >
          Wróć na stronę główną
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </main>
  );
}
