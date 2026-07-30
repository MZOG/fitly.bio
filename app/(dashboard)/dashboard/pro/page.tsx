import { Check, X, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    name: "Publiczny profil",
    free: true,
    pro: true,
  },
  {
    name: "Formularz kontaktowy",
    free: true,
    pro: true,
  },
  {
    name: "Maksymalnie 3 usługi",
    free: true,
    pro: false,
  },
  {
    name: "Nieograniczona liczba usług",
    free: false,
    pro: true,
  },
  {
    name: "Usuwanie domyślnych usług",
    free: false,
    pro: true,
  },
  {
    name: "Własne pytania w formularzu",
    free: false,
    pro: true,
  },
  {
    name: "Priorytetowe wsparcie",
    free: false,
    pro: true,
  },
  {
    name: "Wszystkie przyszłe funkcje Pro",
    free: false,
    pro: true,
  },
];

export default function ProPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-3">
        <Badge variant="secondary" className="gap-1">
          <Sparkles className="size-3.5" />
          Fitly Pro
        </Badge>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Odblokuj pełnię możliwości
          </h1>

          <p className="mt-2 text-muted-foreground">
            Rozwijaj swój profil, dodawaj nieograniczoną liczbę usług i
            korzystaj ze wszystkich funkcji Fitly.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Porównanie planów</CardTitle>
          <CardDescription>
            Wszystko czego potrzebujesz, aby zdobywać więcej klientów.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="py-3 text-left font-medium">Funkcja</th>
                  <th className="w-28 py-3 text-center font-medium">Free</th>
                  <th className="w-28 py-3 text-center font-medium">
                    Fitly Pro
                  </th>
                </tr>
              </thead>

              <tbody>
                {features.map((feature) => (
                  <tr key={feature.name} className="border-b last:border-0">
                    <td className="py-4">{feature.name}</td>

                    <td className="text-center">
                      {feature.free ? (
                        <Check className="mx-auto size-5 text-green-600" />
                      ) : (
                        <X className="mx-auto size-5 text-muted-foreground" />
                      )}
                    </td>

                    <td className="text-center">
                      {feature.pro ? (
                        <Check className="mx-auto size-5 text-green-600" />
                      ) : (
                        <X className="mx-auto size-5 text-muted-foreground" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary">
        <CardHeader>
          <CardTitle>Fitly Pro</CardTitle>
          <CardDescription>
            Odblokuj wszystkie funkcje i rozwijaj swój biznes.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <div className="text-4xl font-bold">
              49 zł{" "}
              <span className="text-sm font-normal text-muted-foreground">
                / miesiąc
              </span>
            </div>
          </div>

          <Button size="lg">Przejdź na Fitly Pro</Button>

          <p className="text-sm text-muted-foreground">
            Anuluj w dowolnym momencie. Wszystkie przyszłe funkcje Pro w cenie.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
