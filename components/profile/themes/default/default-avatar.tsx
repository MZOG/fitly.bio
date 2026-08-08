import { Profile } from "@/lib/types";
import Image from "next/image";

export default function DefaultAvatar({ profile }: { profile: Profile }) {
  return (
    <div className="relative">
      <div className="size-32 overflow-hidden rounded-full ring-3 ring-fitly/25 ring-offset-3 ring-offset-background sm:size-40">
        {profile.avatar_url && (
          <Image
            src={profile.avatar_url}
            alt={`Zdjęcie profilowe: ${profile.full_name || "Zdjęcie profilowe trenera"}`}
            className="size-full object-cover"
            width={256}
            height={256}
            priority
          />
        )}
      </div>
    </div>
  );
}
