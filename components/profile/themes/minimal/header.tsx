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

      <div className="flex flex-col gap-2 mt-5">
        {[
          {
            name: "Trening personalny",
            price: "150 zł/h",
          },
          {
            name: "Plan treningowy",
            price: "250 zł",
          },
          {
            name: "Konsultacja online",
            price: "80 zł",
          },
        ].map((service, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-2 border py-2 px-3 md:py-4 md:px-5 rounded-full text-sm"
          >
            <p>{service.name}</p>
            <p className="text-fitly">{service.price}</p>
          </div>
        ))}
      </div>
    </div>
    // <header className="flex flex-col items-center">
    //   {profile.avatar_url ? (
    //     <Image
    //       src={profile.avatar_url}
    //       alt={profile.full_name ?? ""}
    //       width={112}
    //       height={112}
    //       priority
    //       className="size-32 rounded-full object-cover ring-2 ring-gray-100"
    //     />
    //   ) : (
    //     <div className="flex size-28 items-center justify-center rounded-full bg-gray-100 text-4xl font-semibold text-gray-700">
    //       {profile.full_name?.charAt(0) ?? "?"}
    //     </div>
    //   )}

    //   <h1 className="mt-6 text-center text-4xl font-bold tracking-tight text-gray-900">
    //     {profile.full_name}
    //   </h1>

    //   {profile.city && (
    //     <p className="mt-2 text-sm text-gray-500">📍 {profile.city}</p>
    //   )}

    //   <div className="flex items-center justify-center gap-3 mt-5">
    //     {profile.socials.map((social) => {
    //       const icon = socialIcons[social.platform as keyof typeof socialIcons];

    //       if (!icon) return null;

    //       return (
    //         <a
    //           key={social.platform}
    //           href={social.url}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="flex size-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-50"
    //         >
    //           <HugeiconsIcon icon={icon} className="size-5" />
    //         </a>
    //       );
    //     })}
    //   </div>
    // </header>
  );
}
