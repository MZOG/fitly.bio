import { Profile } from "@/lib/types";
import { Badge } from "../ui/badge";

type Specializations = Pick<Profile, "specializations">;

export default function Specializations({ specializations }: Specializations) {
  return (
    <div className="mt-5">
      <h2 className="text-center text-lg font-grotesk font-black">
        Specjalizacje
      </h2>

      <div className="flex items-center justify-center flex-wrap gap-1 mt-3">
        {specializations.map((spec) => (
          <Badge variant="outline" key={spec} className="px-3 py-1 bg-white">
            {spec}
          </Badge>
        ))}
      </div>
    </div>
  );
}
