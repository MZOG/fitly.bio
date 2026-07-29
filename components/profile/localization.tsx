import { Dumbbell, MapPin } from "lucide-react";
import { Profile } from "@/lib/types";

type LocalizationProps = Pick<Profile, "city" | "gyms">;

export default function Localization({ city, gyms }: LocalizationProps) {
  return (
    <div className="mt-12">
      <h2 className="text-center text-gray-600 font-montserrat font-black uppercase tracking-wide italic">
        Lokalizacja i siłownie
      </h2>
      <div className="grid grid-cols-5 mt-3">
        <p className="text-gray-600 col-span-2 flex items-center self-start">
          <MapPin className="inline-block mr-1" size={15} />
          <span>{city}</span>
        </p>

        <div className="flex flex-col self-start col-span-3">
          {gyms.map((gym) => (
            <p className=" text-gray-600 text-sm" key={gym.name}>
              <Dumbbell className="inline-block mr-1" size={15} />
              <span key={gym.name}>{gym.name}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
