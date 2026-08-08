import Link from "next/link";

export default function ProfileHeader() {
  return (
    <header className="flex justify-center">
      <Link
        href="/"
        className="text-center text-2xl px-5 font-grotesk font-extrabold text-fitly"
      >
        Fitly.
      </Link>
    </header>
  );
}
