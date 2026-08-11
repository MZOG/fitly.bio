import Image from "next/image";

import { Profile } from "@/lib/types";

import {
  InstagramIcon,
  Facebook02Icon,
  TiktokIcon,
  GlobeIcon,
} from "@hugeicons/core-free-icons";
import MinimalAvatar from "./minimal-avatar";
import { Dumbbell, MapPin } from "lucide-react";

const socialIcons = {
  instagram: InstagramIcon,
  facebook: Facebook02Icon,
  tiktok: TiktokIcon,
  website: GlobeIcon,
} as const;

type Props = {
  profile: Profile;
};

export function Header({ profile }: Props) {
  return (
    <div className="font-soehne">
      {/* avatar + imię i nazwisko + miasto  */}
      <div className="flex items-center gap-5">
        <MinimalAvatar profile={profile} />

        <div>
          <h1 className="text-lg md:text-2xl">{profile.full_name}</h1>
          <div>
            {profile.city && (
              <p className="text-sm flex gap-1 items-center text-muted-foreground">
                <MapPin size={12} />
                {profile.city}
              </p>
            )}
          </div>
          <div>
            {profile.gyms.length > 0 &&
              profile.gyms.map((gym) => (
                <p
                  key={gym.name}
                  className="text-sm flex gap-1 items-center text-muted-foreground"
                >
                  <Dumbbell size={12} />
                  {gym.name}
                </p>
              ))}
          </div>
        </div>
      </div>

      {/* oceny? */}

      {/* services */}
    </div>
  );
}
