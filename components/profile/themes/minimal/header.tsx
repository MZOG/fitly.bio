import Image from "next/image";

import { Profile } from "@/lib/types";

import {
  InstagramIcon,
  Facebook02Icon,
  TiktokIcon,
  GlobeIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

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
    <header className="flex flex-col items-center">
      {profile.avatar_url ? (
        <Image
          src={profile.avatar_url}
          alt={profile.full_name ?? ""}
          width={112}
          height={112}
          priority
          className="size-32 rounded-full object-cover ring-2 ring-gray-100"
        />
      ) : (
        <div className="flex size-28 items-center justify-center rounded-full bg-gray-100 text-4xl font-semibold text-gray-700">
          {profile.full_name?.charAt(0) ?? "?"}
        </div>
      )}

      <h1 className="mt-6 text-center text-4xl font-bold tracking-tight text-gray-900">
        {profile.full_name}
      </h1>

      {profile.city && (
        <p className="mt-2 text-sm text-gray-500">📍 {profile.city}</p>
      )}

      <div className="flex items-center justify-center gap-3 mt-5">
        {profile.socials.map((social) => {
          const icon = socialIcons[social.platform as keyof typeof socialIcons];

          if (!icon) return null;

          return (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-50"
            >
              <HugeiconsIcon icon={icon} className="size-5" />
            </a>
          );
        })}
      </div>
    </header>
  );
}
