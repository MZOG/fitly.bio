import { MapPin, Dumbbell } from "lucide-react";

import { Profile } from "@/lib/types";

type Props = {
  profile: Profile;
};

export function Info({ profile }: Props) {
  const hasCity = !!profile.city;
  const hasGym = profile.gyms.length > 0;

  if (!hasCity && !hasGym) {
    return null;
  }

  return (
    <section>
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
        {hasCity && (
          <div className="flex items-center gap-1.5">
            <MapPin className="size-4" />

            <span>{profile.city}</span>
          </div>
        )}

        {hasGym && (
          <div className="flex items-center gap-1.5">
            <Dumbbell className="size-4" />

            <span>{profile.gyms[0].name}</span>
          </div>
        )}
      </div>
    </section>
  );
}
