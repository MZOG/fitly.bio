import Link from "next/link";

const columns = [
  {
    title: "Produkt",
    links: [
      {
        name: "Funkcje",
        href: "#funkcje",
      },
      {
        name: "Cennik",
        href: "#cennik",
      },
      {
        name: "Jak to działa",
        href: "#jak-to-działa",
      },
    ],
  },
  {
    title: "Dla trenerów",
    links: [
      {
        name: "Załóż profil",
        href: "/login",
      },
      {
        name: "Przykładowy profil",
        href: "/demo",
      },
      // {
      //   name: "Fitly PRO",
      //   href: "#fitly-pro",
      // },
      {
        name: "Pomoc",
        href: "/help",
      },
    ],
  },
  {
    title: "Firma",
    links: [
      // {
      //   name: "O nas",
      //   href: "#o-nas",
      // },
      {
        name: "Kontakt",
        href: "/page/kontakt",
      },
      // {
      //   name: "Blog",
      //   href: "#blog",
      // },
      // {
      //   name: "Kariera",
      //   href: "#kariera",
      // }
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background font-soehne">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_2fr]">
          <div>
            <p className="text-2xl font-bold font-grotesk">
              Fit<span className="text-fitly">ly</span>
            </p>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
              Platforma, która pomaga trenerom personalnym budować profesjonalną
              markę online i zdobywać nowych klientów.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-sm text-foreground">{col.title}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fitly. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-6">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Regulamin
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Polityka prywatności
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
