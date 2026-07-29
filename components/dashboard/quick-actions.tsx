import Link from "next/link";

import { ArrowRight, Plus, User, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  {
    title: "Dodaj usługę",
    description: "Utwórz nową usługę dla klientów.",
    href: "/dashboard/services",
    icon: Plus,
  },
  {
    title: "Edytuj profil",
    description: "Zmień opis, social media i dane.",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Wszystkie leady",
    description: "Przejrzyj otrzymane zgłoszenia.",
    href: "/dashboard/leads",
    icon: Users,
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Szybkie akcje</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className="group rounded-lg border p-4 transition hover:bg-muted/50"
            >
              <div className="mb-4 flex items-center justify-between">
                <Icon className="size-5 text-muted-foreground" />

                <ArrowRight className="size-4 text-muted-foreground transition group-hover:translate-x-1" />
              </div>

              <h3 className="font-medium">{action.title}</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {action.description}
              </p>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
