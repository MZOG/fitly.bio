import { AtSign, Star, Link2, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function ProfilePreview() {
  return (
    <div className="w-full max-w-75 rounded-3xl border border-border bg-card p-5">
      {/* Browser bar */}
      <div className="mb-4 flex items-center gap-2 rounded-full bg-secondary px-3 py-2">
        <Link2 className="size-3.5 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">
          fitly.pl/anna-kowalska
        </span>
      </div>

      {/* Profile header */}
      <div className="flex items-center gap-3">
        <Image
          src="/preview-avatar.png"
          alt="Anna Kowalska"
          width={48}
          height={48}
          className="size-12 rounded-full"
        />
        <div>
          <p className="font-display text-sm font-bold text-foreground">
            Anna Kowalska
          </p>
          <p className="text-xs text-muted-foreground">
            {/* Trener personalny · Warszawa */}
            Warszawa
          </p>
        </div>
      </div>

      {/* <div className="mt-3 flex items-center gap-1 text-xs font-medium text-foreground">
        <Star className="size-3.5 fill-fitly text-fitly" />
        <span>4,9</span>
        <span className="text-muted-foreground">· 128 podopiecznych</span>
      </div> */}

      {/* Offer cards */}
      <div className="mt-4 space-y-2">
        {[
          { name: "Trening personalny", price: "120 zł / h" },
          { name: "Plan treningowy", price: "250 zł" },
          { name: "Konsultacja online", price: "80 zł" },
        ].map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-7 justify-between rounded-xl border border-border bg-background px-3 py-2.5"
          >
            <span className="text-xs font-medium text-foreground">
              {item.name}
            </span>
            <span className="text-xs font-semibold text-fitly">
              {item.price}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full bg-primary py-2.5 text-xs font-semibold text-primary-foreground">
        Wyślij zgłoszenie
        <ArrowUpRight className="size-3.5" />
      </button>

      {/* <div className="mt-3 flex items-center justify-center gap-3 text-muted-foreground">
        <AtSign className="size-4" />
        <span className="text-[11px]">@anna.trening</span>
      </div> */}
    </div>
  );
}
