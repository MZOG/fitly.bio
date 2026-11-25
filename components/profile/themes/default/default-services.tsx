"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Profile, Service } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LeadDrawer } from "../../lead-drawer";
import { ArrowRight } from "lucide-react";

type Props = {
  profile: Profile;
};

export function DefaultServices({ profile }: Props) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  console.log(selectedService);
  const handleSelectService = (service: Service) => {
    setSelectedService(service);
  };

  return (
    <>
      <section aria-labelledby="services-title">
        <h2
          id="services-title"
          className="mb-3 text-sm font-grotesk font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Usługi
        </h2>
        <ul className="flex flex-col gap-4">
          {profile.services.map((service) => (
            <li
              key={service.name}
              className="rounded-2xl bg-card p-5 ring-1 ring-border transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  {service.is_package && (
                    <span className="mb-1.5 inline-flex rounded-full bg-fitly/10 px-2.5 py-0.5 font-soehne text-xs font-medium text-fitly">
                      Pakiet
                    </span>
                  )}
                  <h3 className="font-grotesk text-lg font-semibold text-foreground text-balance">
                    {service.name}
                  </h3>
                </div>
                <div className="shrink-0 text-right">
                  <span className="font-grotesk text-xl font-bold text-foreground">
                    {service.price}
                  </span>
                  {service.is_package && service.price_per_session ? (
                    <span className="block text-sm font-medium text-foreground font-soehne">
                      {service.price_per_session} / trening
                    </span>
                  ) : null}
                  {service.unit ? (
                    <span className="block text-xs text-muted-foreground font-soehne">
                      {service.unit}
                    </span>
                  ) : null}
                </div>
              </div>

              <p className="mt-2 font-soehne text-pretty text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <Button
                size="lg"
                className="mt-4 w-full md:w-auto bg-fitly hover:bg-fitly/80 font-soehne"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectService(service);
                }}
              >
                {service.button_text || "Wyślij zgłoszenie"}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <LeadDrawer
        open={!!selectedService}
        service={selectedService}
        trainerId={profile.id}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedService(null);
          }
        }}
      />
    </>
  );
}
