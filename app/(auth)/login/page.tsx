"use client";

import { useAuth } from "@/hooks/use-auth";

export default function LoginPage() {
  const { signInWithGoogle } = useAuth();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <button
        onClick={signInWithGoogle}
        className="rounded-lg bg-black px-6 py-3 text-white hover:bg-neutral-800"
      >
        Zaloguj przez Google
      </button>
    </main>
  );
}
