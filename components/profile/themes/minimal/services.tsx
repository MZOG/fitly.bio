"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Profile, Service } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LeadDrawer } from "../../lead-drawer";

type Props = {
  profile: Profile;
};

export function Services({ profile }: Props) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
  };

  return (
    <>
      <div>
        <h2 className="text-2xl mb-5 font-semibold tracking-tight text-center">
          Oferta
        </h2>
        <div className="mt-3 flex flex-col gap-3">
          {profile.services.map((service) => (
            <div
              key={service.id}
              className="rounded-3xl border border-gray-20 bg-white p-6 transition hover:border-gray-300
"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <p className="font-grotesk font-medium">{service.name}</p>

                  {service.description && (
                    <p className="mt-1 max-w-120 text-sm text-gray-600">
                      {service.description}
                    </p>
                  )}
                </div>

                {/* Mobile */}
                <div className="flex items-center justify-between md:hidden">
                  <p className={cn("font-grotesk text-lg font-medium")}>
                    {service.price}
                  </p>
                </div>

                <Button
                  type="button"
                  className={cn("md:hidden w-full h-12 text-base font-medium")}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectService(service);
                  }}
                >
                  {service.button_text || "Wyślij zgłoszenie"}
                </Button>

                {/* Desktop */}
                <div className="hidden items-center justify-between md:flex">
                  <p className="font-grotesk text-lg font-medium">
                    {service.price}
                  </p>

                  <Button
                    type="button"
                    className="h-10 text-base"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectService(service);
                    }}
                  >
                    Umów trening
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
