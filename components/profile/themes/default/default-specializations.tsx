import { Badge } from "@/components/ui/badge";
import { Profile } from "@/lib/types";

type Props = {
  profile: Profile;
};

export function DefaultSpecializations({ profile }: Props) {
  if (profile.specializations.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="specializations-title">
      <h2
        id="specializations-title"
        className="mb-3 text-sm font-grotesk font-semibold uppercase tracking-wider text-muted-foreground"
      >
        Specjalizacje
      </h2>
      <div className="flex flex-wrap gap-2">
        {profile.specializations.map((item) => (
          <span
            key={item}
            className="font-soehne text-fitly inline-flex bg-fitly/2 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs md:text-sm font-medium ring-1 ring-fitly/30"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
