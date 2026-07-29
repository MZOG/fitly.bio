import Link from "next/link";

import { CircleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProfileCompletion } from "@/lib/profile-completion";

type Props = {
  profile: {
    avatar_url: string | null;
    bio: string | null;
    city: string | null;
    specializations: string[] | null;
    socials: unknown[] | null;
    services: unknown[] | null;
  };
};

export function ProfileCompletionBanner({ profile }: Props) {
  const completion = getProfileCompletion(profile);

  if (completion.percent === 100) {
    return null;
  }

  const items = [
    completion.missing.avatar ? "Dodaj zdjęcie profilowe" : null,
    completion.missing.bio ? "Uzupełnij bio" : null,
    completion.missing.city ? "Dodaj miasto" : null,
    completion.missing.specializations ? "Dodaj specjalizacje" : null,
    completion.missing.services ? "Dodaj usługi" : null,
    completion.missing.socials ? "Dodaj social media" : null,
  ].filter((item): item is string => item !== null);

  return (
    <Card className="border-yellow-300 bg-yellow-50">
      <CardContent className="flex items-start justify-between gap-8 p-6">
        <div className="flex gap-4">
          <CircleAlert className="mt-1 size-5 text-yellow-600" />

          <div>
            <h3 className="font-semibold">
              Profil ukończony w {completion.percent}%
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Uzupełnij brakujące informacje, aby zwiększyć zaufanie klientów.
            </p>

            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <Button
          render={<Link href="/dashboard/profile">Uzupełnij profil</Link>}
        ></Button>
      </CardContent>
    </Card>
  );
}
