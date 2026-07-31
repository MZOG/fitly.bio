import Link from "next/link";
import { Button } from "../ui/button";

export default function ProfileCTA() {
  return (
    <div className="mt-12 bg-green-100 font-grotesk border border-green-600/30 rounded-lg p-5 flex flex-col items-center">
      <h3 className="font-montserrat font-black text-2xl italic uppercase text-green-700">
        Jesteś trenerem?
      </h3>
      <h4 className="font-montserrat font-black text-xl italic uppercase text-green-700">
        Dołącz do fitly.
      </h4>

      <p className=" mt-5 text-green-700">Załóż darmowe konto.</p>

      <Button
        className="mt-5 italic uppercase text-lg font-black font-grotesk h-auto py-4 px-10 rounded-xl"
        size="lg"
        render={<Link href="/login">Załóż konto</Link>}
      ></Button>
    </div>
  );
}
