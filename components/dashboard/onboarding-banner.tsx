"use client";
import Link from "next/link";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { completeOnboarding } from "@/app/actions/complete-onboarding";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function OnboardingBanner() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent>
        <h2 className="text-2xl font-semibold">👋 Witaj w Fitly!</h2>

        <p className="mt-3 text-muted-foreground">
          Twój profil jest już prawie gotowy. Uzupełnij kilka informacji, aby
          zacząć przyjmować zgłoszenia od klientów.
        </p>

        <div className="mt-6 space-y-2 text-sm">
          <p>✅ Własny link do profilu</p>
          <p>✅ Prezentacja usług</p>
          <p>✅ Formularz zgłoszeniowy</p>
          <p>✅ Udostępnianie w social media</p>
        </div>

        <Button
          className="mt-8"
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              router.push("/dashboard/profile");
              router.refresh();
            })
          }
        >
          Rozpocznij konfigurację
        </Button>
      </CardContent>
    </Card>
  );
}
