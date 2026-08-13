import {
  AtSign,
  Building2,
  Camera,
  Dumbbell,
  FileText,
  FormInput,
  Headphones,
  Images,
  ListChecks,
  MapPin,
  MessageCircle,
  Share2,
  Sparkles,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const features = [
  {
    name: "Publiczny profil",
    description:
      "Profesjonalny profil, który możesz udostępnić swoim klientom.",
    icon: UserRound,
    plan: "free",
  },
  {
    name: "Formularz kontaktowy",
    description:
      "Pozwól potencjalnym klientom skontaktować się bezpośrednio z Tobą.",
    icon: MessageCircle,
    plan: "free",
  },
  {
    name: "Specjalizacje",
    description:
      "Pokaż klientom, w jakich obszarach treningu się specjalizujesz.",
    icon: Dumbbell,
    plan: "free",
  },
  {
    name: "Lokalizacja i siłownia",
    description:
      "Pokaż, gdzie prowadzisz treningi i z jakimi siłowniami współpracujesz.",
    icon: MapPin,
    plan: "free",
  },
  {
    name: "Social media",
    description:
      "Dodaj swoje profile na Instagramie, TikToku i innych platformach.",
    icon: Share2,
    plan: "free",
  },
  {
    name: "Galeria zdjęć",
    description: "Prezentuj swoje zdjęcia i efekty swojej pracy.",
    icon: Images,
    plan: "free",
  },
  {
    name: "Do 3 usług",
    description: "Dodaj swoje najważniejsze usługi i przedstaw swoją ofertę.",
    icon: ListChecks,
    plan: "free",
  },
  {
    name: "Leady",
    description:
      "Otrzymuj wiadomości od osób zainteresowanych Twoimi usługami.",
    icon: Users,
    plan: "free",
  },
  {
    name: "Dłuższe bio",
    description:
      "Opowiedz więcej o sobie, swoim doświadczeniu i podejściu do treningu.",
    icon: FileText,
    plan: "pro",
  },
  {
    name: "Nazwa użytkownika",
    description: "Ustaw własną nazwę użytkownika i adres swojego profilu.",
    icon: AtSign,
    plan: "pro",
  },
  {
    name: "Więcej siłowni",
    description: "Dodaj wiele miejsc, w których prowadzisz treningi.",
    icon: Building2,
    plan: "pro",
  },
  {
    name: "Więcej specjalizacji",
    description: "Dodaj wiele specjalizacji",
    icon: Dumbbell,
    plan: "pro",
  },
  {
    name: "Nieograniczone usługi",
    description: "Dodawaj dowolną liczbę usług bez limitu.",
    icon: Dumbbell,
    plan: "pro",
  },
  {
    name: "Usuwanie domyślnych usług",
    description: "Pełna kontrola nad tym, jakie usługi pokazujesz na profilu.",
    icon: Trash2,
    plan: "pro",
  },
  {
    name: "Własne pytania w formularzu",
    description: "Dostosuj formularz kontaktowy do swoich potrzeb.",
    icon: FormInput,
    plan: "pro",
  },
  {
    name: "Większa galeria zdjęć",
    description: "Dodawaj więcej zdjęć i jeszcze lepiej prezentuj swoją pracę.",
    icon: Images,
    plan: "pro",
  },
  {
    name: "Metamorfozy przed / po",
    description: "Pokaż efekty swojej pracy za pomocą zdjęć przed i po.",
    icon: Camera,
    plan: "pro",
  },
  {
    name: "Priorytetowe wsparcie",
    description: "Otrzymuj szybszą pomoc, gdy jej potrzebujesz.",
    icon: Headphones,
    plan: "pro",
  },
  {
    name: "Wszystkie przyszłe funkcje Pro",
    description: "Każda nowa funkcja Pro będzie dostępna w Twoim planie.",
    icon: Sparkles,
    plan: "pro",
  },
];

export default function ProPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      {/* Header */}
      <div className="max-w-2xl">
        <Badge variant="secondary" className="mb-4 gap-1">
          <Sparkles className="size-3.5" />
          Fitly Pro
        </Badge>

        <h1 className="text-3xl font-bold tracking-tight">
          Rozwiń swój profil
        </h1>

        <p className="mt-2 text-muted-foreground">
          Odblokuj dodatkowe funkcje Fitly i zaprezentuj się jeszcze lepiej
          swoim klientom.
        </p>
      </div>

      {/* Features */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          const isPro = feature.plan === "pro";

          return (
            <div
              key={feature.name}
              className={`group rounded-2xl border p-5 ${
                isPro
                  ? "border-foreground bg-foreground text-background"
                  : "bg-background"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`flex size-10 items-center justify-center rounded-xl ${
                    isPro ? "bg-background/10" : "bg-muted"
                  }`}
                >
                  <Icon className="size-5" />
                </div>

                <Badge
                  variant={isPro ? "secondary" : "outline"}
                  className="text-[11px] uppercase font-semibold tracking-wide"
                >
                  {isPro ? "Pro" : "Free"}
                </Badge>
              </div>

              <div className="mt-5">
                <h3 className="font-semibold">{feature.name}</h3>

                <p
                  className={`mt-1.5 text-sm leading-relaxed ${
                    isPro ? "text-background/70" : "text-muted-foreground"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="overflow-hidden rounded-3xl border bg-muted/30 p-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="size-5" />

              <h2 className="text-xl font-semibold">Przejdź na Fitly Pro</h2>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              Wszystkie funkcje Pro w jednym planie.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div className="text-right">
              <div className="text-2xl font-bold">
                49 zł
                <span className="ml-1 text-sm font-normal text-muted-foreground">
                  / miesiąc
                </span>
              </div>
            </div>

            <Button size="lg">Odblokuj Pro</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
