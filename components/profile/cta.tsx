import { Button } from "../ui/button";

export default function ProfileCTA() {
  return (
    <div className="mt-12 bg-blue-600 rounded-lg p-5 flex flex-col items-center">
      <h3 className="font-montserrat font-black text-2xl italic uppercase text-white">
        Jesteś trenerem?
      </h3>
      <h4 className="font-montserrat font-black text-xl italic uppercase text-white">
        Dołącz do fitly.
      </h4>

      <p className="text-white mt-5">Załóż darmowe konto.</p>

      <Button
        className="mt-5 italic uppercase text-lg font-black tracking-wide h-auto py-4 px-10 rounded-xl"
        size="lg"
      >
        Załóż konto
      </Button>
    </div>
  );
}
