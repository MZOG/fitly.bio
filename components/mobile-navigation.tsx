"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const data = [
  {
    title: "Panel",
    url: "/dashboard",
  },
  {
    title: "Mój profil",
    url: "/dashboard/profile",
  },
  {
    title: "Usługi",
    url: "/dashboard/services",
  },
  {
    title: "Galeria",
    url: "/dashboard/gallery",
  },
  {
    title: "Zgłoszenia",
    url: "/dashboard/leads",
  },
  {
    title: "Pomysły i opinie",
    url: "/dashboard/feedback",
  },
  {
    title: "Fitly PRO",
    url: "/dashboard/pro",
  },
];

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden">
      <div className="scroll-fade-x no-scrollbar overflow-x-auto">
        <div className="flex w-max gap-2 px-5 py-3">
          {data.map((item) => {
            const isActive =
              item.url === "/dashboard"
                ? pathname === item.url
                : pathname.startsWith(item.url);

            return (
              <Link
                key={item.url}
                href={item.url}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
