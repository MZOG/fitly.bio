import { Profile } from "@/lib/types";
import {
  InstagramIcon,
  Facebook02Icon,
  TiktokIcon,
  GlobeIcon,
  YoutubeIcon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const socialIcons = {
  instagram: InstagramIcon,
  facebook: Facebook02Icon,
  tiktok: TiktokIcon,
  website: GlobeIcon,
  youtube: YoutubeIcon,
  x: NewTwitterIcon,
} as const;

export default function MinimalSocials({ profile }: { profile: Profile }) {
  if (profile.socials.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-xs mb-2 uppercase tracking-widest font-medium text-muted-foreground">
        Media społecznościowe
      </h2>
      <div className="flex flex-wrap gap-3">
        {profile.socials.map((social) => {
          const icon = socialIcons[social.platform as keyof typeof socialIcons];
          if (!icon) return null;

          return (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              {/* {social.platform} */}
              <HugeiconsIcon icon={icon} size={20} />
            </a>
          );
        })}
      </div>
    </section>
  );
}
