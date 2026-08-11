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
      <h2 className="text-xs mb-2 uppercase tracking-widest font-medium text-muted-foreground">
        Specializacje
      </h2>
      <div className="flex flex-wrap  gap-2">
        {profile.specializations.map((item) => (
          <Badge
            key={item}
            className="rounded-full border border-gray-200 bg-white font-medium text-gray-700"
          >
            {item}
          </Badge>
        ))}
      </div>
    </section>
  );
}
