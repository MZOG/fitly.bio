import Link from "next/link";

export default function ProfileCTA() {
  return (
    <div className="mt-12 bg-green-100/40 font-grotesk border border-green-600/20 rounded-lg px-5 py-10 flex flex-col items-center">
      <h3 className="font-montserrat font-black text-2xl italic uppercase text-green-700">
        Jesteś trenerem?
      </h3>
      <h4 className="font-montserrat font-black text-xl italic uppercase text-green-700">
        Dołącz do fitly.
      </h4>

      <p className=" mt-5 text-green-700">Załóż darmowe konto.</p>

      <Link
        href="/login"
        className="mt-5 italic bg-black hover:bg-black/80 text-white uppercase text-lg font-black font-grotesk h-auto py-4 px-10 rounded-xl"
      >
        Załóż konto
      </Link>
    </div>
  );
}
