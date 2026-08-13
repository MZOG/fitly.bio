"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GoogleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function LoginView() {
  const { signInWithGoogle } = useAuth();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-background via-background to-muted/30 px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <h1 className="text-3xl font-grotesk font-black tracking-tight">
          Fit<span className="text-fitly">ly</span>
        </h1>

        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Wystarczy zalogować się przez Google.
          <br />
          Jeśli nie masz jeszcze konta, utworzymy je automatycznie.
        </p>

        <Button
          onClick={signInWithGoogle}
          className="mt-10 flex h-12 items-center justify-center rounded-full bg-black px-6 text-white transition hover:bg-neutral-800"
        >
          <HugeiconsIcon icon={GoogleIcon} />
          Kontynuuj z Google
        </Button>

        <p className="mt-4 text-sm text-muted-foreground">
          Bez hasła • Konto tworzone automatycznie
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex h-9 items-center justify-center gap-2 rounded-full border px-4 text-sm font-medium transition hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
          Wróć na stronę główną
        </Link>
      </div>
    </main>
  );
}
