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

export default function DefaultSocials({
  socials,
}: {
  socials: { platform: string; url: string }[];
}) {
  if (socials.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-5">
      {socials.map((social) => {
        const icon = socialIcons[social.platform as keyof typeof socialIcons];

        if (!icon) return null;

        return (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <HugeiconsIcon icon={icon} size={20} className="text-fitly" />
          </a>
        );
      })}
    </div>
  );
}
