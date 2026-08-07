import { Profile } from "@/lib/types";

type Props = {
  profile: Profile;
};

export function DarkProfile({ profile }: Props) {
  return (
    <div className="container mx-auto max-w-3xl py-16">
      <h1 className="text-4xl font-bold">{profile.full_name}</h1>

      <p className="mt-2 text-muted-foreground">Wersja Dark</p>
    </div>
  );
}
