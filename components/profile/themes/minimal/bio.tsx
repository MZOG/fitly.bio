import { Profile } from "@/lib/types";

type Props = {
  profile: Profile;
};

export function Bio({ profile }: Props) {
  if (!profile.bio) {
    return null;
  }

  return (
    <section className="mx-auto max-w-sm">
      <p className="text-center text-base leading-7 text-gray-600">
        {profile.bio}
      </p>
    </section>
  );
}
