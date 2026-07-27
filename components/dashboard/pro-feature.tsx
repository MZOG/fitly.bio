"use client";

import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Crown, Lock } from "lucide-react";

interface ProFeatureProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function ProFeature({
  children,
  title = "Funkcja Pro",
  description = "Ta funkcja jest dostępna tylko dla użytkowników Pro.",
}: ProFeatureProps) {
  return (
    <div className="relative">
      <div className="pointer-events-none opacity-50 select-none">
        {children}
      </div>

      <div className="absolute inset-0 flex items-center justify-center rounded-xl ">
        <Dialog>
          <DialogTrigger
            render={
              <Button size="lg">
                <Lock className="mr-2 size-4" />
                Tylko w PRO
              </Button>
            }
          />

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Odblokuj PRO</DialogTitle>
              <DialogDescription className="text-gray-600">
                Zyskaj dostęp do wszystkich funkcji Fitly.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              {[
                "Własny adres profilu",
                "Nielimitowana oferta i cennik",
                "Zaawansowany formularz",
                "Własne linki",
                "Powiadomienia SMS i e-mail",
                "Brak brandingu",
                "Personalizacja wyglądu",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check className="size-4 text-green-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <DialogFooter>
              <Button className="">Przejdź na PRO</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
