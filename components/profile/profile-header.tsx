import Link from "next/link";

export default function ProfileHeader() {
  return (
    <header className="py-5 md:pt-7 md:pb-12 flex justify-center">
      <Link
        href="/"
        className="text-center text-2xl px-5 font-grotesk font-extrabold"
      >
        Fitly.
      </Link>
    </header>
  );
}
