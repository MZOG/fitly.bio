import Link from "next/link";

export default function MinimalLogo() {
  return (
    <Link href="/" className="text-xl font-grotesk font-semibold">
      Fit<span className="text-fitly">ly</span>
    </Link>
  );
}
