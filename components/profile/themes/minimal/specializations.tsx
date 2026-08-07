import { Badge } from "@/components/ui/badge";
import { Profile } from "@/lib/types";

type Props = {
  profile: Profile;
};

export function Specializations({ profile }: Props) {
  if (profile.specializations.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex flex-wrap justify-center gap-2">
        {profile.specializations.map((item) => (
          <Badge
            key={item}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700"
          >
            {item}
          </Badge>
        ))}
      </div>
    </section>
  );
}
