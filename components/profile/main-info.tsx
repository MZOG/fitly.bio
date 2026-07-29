import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRightIcon } from "lucide-react";
import { Profile } from "@/lib/types";

type MainInfoProps = Pick<
  Profile,
  "full_name" | "bio" | "avatar_url" | "socials"
>;

export const SOCIAL_LABELS = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  x: "X",
  threads: "Threads",
  snapchat: "Snapchat",
} as const;

export default function MainInfo({
  full_name,
  bio,
  socials,
  avatar_url,
}: MainInfoProps) {
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-2 md:gap-3 md:justify-between items-center">
        <div className="flex flex-col items-center md:items-start">
          {full_name && (
            <h1 className="text-xl font-black italic uppercase mb-3 md:mb-1 flex items-center gap-2">
              {full_name}
            </h1>
          )}
          {bio && (
            <p className="font-montserrat text-center md:text-left">{bio}</p>
          )}
        </div>

        <div className="relative size-50 overflow-hidden rounded-2xl bg-gray-100 md:size-30 md:shrink-0 md:rounded-full">
          {avatar_url ? (
            <Image
              src={avatar_url}
              alt={full_name || "Fitly - Wizytówka trenera"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 120px"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
              {full_name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {socials.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {socials.map((social) => (
            <Badge
              key={social.platform}
              variant="outline"
              className="px-3 py-1"
              render={
                <a href={social.url}>
                  {SOCIAL_LABELS[social.platform as keyof typeof SOCIAL_LABELS]}{" "}
                  <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              }
            />
          ))}
        </div>
      )}
    </>
  );
}
