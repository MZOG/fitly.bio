"use client";

import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const navLinks = [
  { label: "Jak to działa", href: "#jak-to-dziala" },
  { label: "Funkcje", href: "#funkcje" },
  { label: "Cennik", href: "#cennik" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="mx-auto  grid grid-cols-2 md:grid-cols-3 h-18 max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
        <Link
          href="/"
          className="font-grotesk font-semibold text-xl md:text-2xl"
          aria-label="Fitly - strona główna"
        >
          Fit<span className="text-fitly">ly</span>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Główna nawigacja"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] transition-colors hover:text-fitly"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* dekstop view */}
        <div className="hidden items-center gap-5 md:flex md:justify-end">
          <Link
            href="/login"
            className="text-sm hover:text-fitly text-[15px] text-foreground transition-colors"
          >
            Zaloguj się
          </Link>
          <Link
            href="/login"
            className="group text-[15px] inline-flex items-center gap-2 rounded-full bg-fitly px-5 py-2.5 text-sm font-semibold text-primary-foreground "
          >
            Załóż profil
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {/* mobile view */}
        <div className="flex items-center gap-2 justify-end md:hidden">
          <Link
            href="/login"
            className="text-[15px] inline-flex items-center gap-2 rounded-full bg-fitly px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Załóż profil
            <ArrowUpRight className="size-4" />
          </Link>

          <Button
            onClick={() => setOpen((v) => !v)}
            variant="outline"
            className="size-10 bg-white!"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="bg-background md:hidden absolute border-b w-full">
          <nav
            className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4"
            aria-label="Nawigacja mobilna"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="md:px-2 py-3 text-foreground hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
