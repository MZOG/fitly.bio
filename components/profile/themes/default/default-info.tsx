import { Profile } from "@/lib/types";
import { Dumbbell, MapPin } from "lucide-react";

export default function DefaultInfo({ profile }: { profile: Profile }) {
  return (
    <>
      <h1
        id="profile-name"
        className="mt-5 font-grotesk text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl"
      >
        {profile.full_name}
      </h1>

      <p className="mt-3 max-w-lg text-balance font-soehne leading-relaxed text-muted-foreground">
        {profile.bio}
      </p>

      <div className="mt-6 flex  items-center gap-3 sm:flex-row flex-wrap sm:justify-center">
        {profile.city && (
          <span className="font-soehne inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-sm font-medium text-foreground ring-1 ring-border">
            <MapPin className="size-4 text-fitly" aria-hidden="true" />
            {profile.city}
          </span>
        )}
        {profile.gyms.length > 0 &&
          profile.gyms?.map((gym) => (
            <span
              key={gym.name}
              className="font-soehne inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-sm font-medium text-foreground ring-1 ring-border"
            >
              <Dumbbell className="size-4 text-fitly" aria-hidden="true" />
              {gym.name}
            </span>
          ))}
      </div>
    </>
  );
}
