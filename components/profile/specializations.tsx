import { Profile } from "@/lib/types";
import { Badge } from "../ui/badge";

type Specializations = Pick<Profile, "specializations">;

export default function Specializations({ specializations }: Specializations) {
  return (
    <div className="mt-12">
      <h2 className="text-center text-gray-600 font-montserrat font-black uppercase tracking-wide italic">
        Specjalizacje
      </h2>

      <div className="flex items-center justify-center flex-wrap gap-1 mt-3">
        {specializations.map((spec) => (
          <Badge variant="outline" key={spec} className="px-3 py-1">
            {spec}
          </Badge>
        ))}
      </div>
    </div>
  );
}
