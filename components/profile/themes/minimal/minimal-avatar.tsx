"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Profile } from "@/lib/types";
import Image from "next/image";

export default function MinimalAvatar({ profile }: { profile: Profile }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <>
      {profile.avatar_url ? (
        <Image
          src={profile.avatar_url}
          alt={profile.full_name ?? ""}
          width={isDesktop ? 152 : 80}
          height={isDesktop ? 152 : 80}
          priority
          className="size-20 md:size-38 rounded-full object-cover ring-1 ring-gray-700 ring-offset-2"
        />
      ) : (
        <div className="flex size-28 items-center justify-center rounded-full bg-gray-100 text-4xl font-semibold text-gray-700">
          {profile.full_name?.charAt(0) ?? "?"}
        </div>
      )}
    </>
  );
}
