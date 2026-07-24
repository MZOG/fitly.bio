"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type Service = {
  id: string;
  name: string;
  price: string;
};

const services: Service[] = [
  {
    id: "personal-training",
    name: "Trening personalny",
    price: "150 zł/h",
  },
  {
    id: "online-training",
    name: "Prowadzenie online",
    price: "299 zł/mies.",
  },
];

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSelectService = (service: Service) => {
    setSelectedService(service);

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const cancelSelectedService = () => {
    setSelectedService(null);
  };

  return (
    <>
      {/* Usługi i cennik */}
      <div className="mt-10">
        <h2 className="text-xs uppercase tracking-wide font-medium">
          Usługi i cennik
        </h2>

        <div className="mt-3 flex flex-col gap-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-gray-50 p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <p>{service.name}</p>
                <p className="text-gray-600 font-medium">{service.price}</p>
              </div>

              <Button onClick={() => handleSelectService(service)}>
                Umów trening
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Formularz */}
      {selectedService && (
        <div ref={formRef} className="mt-10 scroll-mt-5">
          <h2 className="text-xs uppercase tracking-wide font-medium">
            Formularz kontaktowy
          </h2>

          {/* Wybrana usługa */}
          <div className="mt-3 rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-600">Wybrana usługa</p>

            <div className="mt-1 flex items-center justify-between">
              <p className="font-medium">{selectedService.name}</p>
              <p className="font-medium">{selectedService.price}</p>
            </div>
          </div>

          <form className="mt-5 flex flex-col gap-5">
            {/* To przesyłasz do backendu */}
            <input type="hidden" name="serviceId" value={selectedService.id} />

            <Field className="gap-2">
              <FieldLabel htmlFor="goal">Jaki jest Twój główny cel?</FieldLabel>

              <FieldDescription className="text-gray-600">
                np. redukcja, budowa masy, poprawa kondycji, inne.
              </FieldDescription>

              <Textarea
                id="goal"
                name="goal"
                className="bg-white border border-border rounded-lg"
              />
            </Field>

            <Field className="gap-2">
              <FieldLabel htmlFor="experience">
                Jakie masz doświadczenie treningowe?
              </FieldLabel>

              <FieldDescription className="text-gray-600">
                początkujący, średniozaawansowany, zaawansowany.
              </FieldDescription>

              <Textarea
                id="experience"
                name="experience"
                className="bg-white border border-border rounded-lg"
              />
            </Field>

            <Field className="gap-2">
              <FieldLabel htmlFor="expectations">
                Opowiedz krótko o sobie i swoich oczekiwaniach.
              </FieldLabel>

              <FieldDescription className="text-gray-600">
                Podziel się swoimi celami i oczekiwaniami.
              </FieldDescription>

              <Textarea
                id="expectations"
                name="expectations"
                className="bg-white border border-border rounded-lg"
              />
            </Field>

            <Separator />

            <Field className="gap-2">
              <FieldLabel htmlFor="name">Imię i nazwisko</FieldLabel>

              <Input
                id="name"
                name="name"
                placeholder="Wpisz swoje imię i nazwisko"
                className="placeholder:text-gray-600 bg-white border-border rounded-lg"
              />
            </Field>

            <Field className="gap-2">
              <FieldLabel htmlFor="phone">Numer telefonu</FieldLabel>

              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Wpisz swój numer telefonu"
                className="placeholder:text-gray-600 bg-white border-border rounded-lg"
              />
            </Field>

            <Field className="gap-2">
              <FieldLabel htmlFor="email">Adres e-mail</FieldLabel>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Wpisz swój adres e-mail"
                className="placeholder:text-gray-600 bg-white border-border rounded-lg"
              />
            </Field>

            <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
              Po wysłaniu zgłoszenia trener skontaktuje się z Tobą, aby wspólnie
              ustalić dogodny termin treningu.
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={cancelSelectedService}
              >
                Anuluj
              </Button>

              <Button type="submit" size="lg">
                Wyślij zgłoszenie
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
