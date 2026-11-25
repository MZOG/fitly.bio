import { Profile } from "@/lib/types";
import { BioText } from "@/lib/bio";

type Props = {
  profile: Profile;
};

export function Bio({ profile }: Props) {
  if (!profile.bio) {
    return null;
  }

  return (
    <section className="mx-auto max-w-sm">
      <BioText
        text={profile.bio}
        className="text-center text-base leading-7 text-gray-600"
      />
    </section>
  );
}
