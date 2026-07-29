"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Service } from "@/lib/types";
import { useForm } from "react-hook-form";
import { createLead } from "@/app/actions/create-lead";
import { Controller } from "react-hook-form";

type Props = {
  trainerId: string;
  services: Service[];
};

type FormValues = {
  answers: Record<string, string | string[]>;
  name: string;
  phone: string;
  email: string;
};

export function ServicesSection({ trainerId, services }: Props) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      answers: {},
      name: "",
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    if (selectedService && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedService]);

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
  };

  const cancelSelectedService = () => {
    setSelectedService(null);
  };

  const handleSubmit = form.handleSubmit(async (values) => {
    if (!selectedService) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createLead({
        trainerId,

        service: {
          id: selectedService.id,
          name: selectedService.name,
        },

        contact: {
          name: values.name,
          phone: values.phone,
          email: values.email,
        },

        answers: selectedService.fields.map((field) => ({
          fieldId: field.id,
          label: field.label,
          type: field.type,
          value: values.answers[field.id] ?? "",
        })),
      });

      toast.success("Zgłoszenie zostało wysłane", {
        description: "Trener skontaktuje się z Tobą wkrótce.",
      });

      form.reset();
      setSelectedService(null);
    } catch {
      toast.error("Nie udało się wysłać zgłoszenia");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <>
      {/* Usługi i cennik */}
      <div className="mt-12">
        <h2 className="text-center text-gray-600 font-montserrat font-black uppercase tracking-wide italic">
          Usługi i cennik
        </h2>

        <div className="mt-3 flex flex-col gap-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-gray-50 p-4 rounded-lg flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex justify-between items-center md:block">
                <p>{service.name}</p>
                <p className="text-gray-600 font-medium">{service.price}</p>
              </div>

              {service.description && (
                <p className="text-sm text-gray-600">{service.description}</p>
              )}

              <Button
                type="button"
                className="self-end md:self-auto"
                onClick={() => handleSelectService(service)}
              >
                Umów trening
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Formularz */}
      {selectedService && (
        <div ref={formRef} className="mt-10 scroll-mt-5">
          <h2 className="text-center text-gray-600 font-montserrat font-black uppercase tracking-wide italic">
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

          <form className="mt-5 flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* To przesyłasz do backendu */}
            <input type="hidden" name="serviceId" value={selectedService.id} />

            {selectedService.fields.map((field) => {
              switch (field.type) {
                case "textarea":
                  return (
                    <Field key={field.id} className="gap-2">
                      <FieldLabel>{field.label}</FieldLabel>

                      {field.description && (
                        <FieldDescription className="text-gray-600">
                          {field.description}
                        </FieldDescription>
                      )}

                      <Controller
                        name={`answers.${field.id}`}
                        control={form.control}
                        render={({ field: controllerField }) => (
                          <Textarea
                            {...controllerField}
                            value={(controllerField.value as string) ?? ""}
                            required={field.required}
                            className="bg-white border border-border rounded-lg"
                          />
                        )}
                      />
                    </Field>
                  );

                case "radio":
                  return (
                    <Field key={field.id} className="gap-2">
                      <FieldLabel>{field.label}</FieldLabel>

                      {field.description && (
                        <FieldDescription className="text-gray-600">
                          {field.description}
                        </FieldDescription>
                      )}

                      <Controller
                        name={`answers.${field.id}`}
                        control={form.control}
                        rules={{
                          required: field.required,
                        }}
                        render={({ field: controllerField }) => (
                          <div className="space-y-2">
                            {field.options.map((option) => (
                              <label
                                key={option}
                                className="flex items-center gap-2"
                              >
                                <input
                                  type="radio"
                                  checked={controllerField.value === option}
                                  onChange={() =>
                                    controllerField.onChange(option)
                                  }
                                />

                                {option}
                              </label>
                            ))}
                          </div>
                        )}
                      />
                    </Field>
                  );

                case "checkbox":
                  return (
                    <Field key={field.id} className="gap-2">
                      <FieldLabel>{field.label}</FieldLabel>

                      {field.description && (
                        <FieldDescription className="text-gray-600">
                          {field.description}
                        </FieldDescription>
                      )}

                      <Controller
                        name={`answers.${field.id}`}
                        control={form.control}
                        defaultValue={[]}
                        render={({ field: controllerField }) => (
                          <div className="space-y-2">
                            {field.options.map((option) => {
                              const values =
                                (controllerField.value as string[]) ?? [];

                              return (
                                <label
                                  key={option}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="checkbox"
                                    checked={values.includes(option)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        controllerField.onChange([
                                          ...values,
                                          option,
                                        ]);
                                      } else {
                                        controllerField.onChange(
                                          values.filter((v) => v !== option),
                                        );
                                      }
                                    }}
                                  />

                                  {option}
                                </label>
                              );
                            })}
                          </div>
                        )}
                      />
                    </Field>
                  );

                default:
                  return null;
              }
            })}

            <Separator />

            <Field className="gap-2">
              <FieldLabel htmlFor="name">Imię i nazwisko</FieldLabel>

              <Input
                id="name"
                placeholder="Wpisz swoje imię i nazwisko"
                className="placeholder:text-gray-600 bg-white border-border rounded-lg"
                {...form.register("name", {
                  required: "Imię i nazwisko jest wymagane",
                })}
              />
            </Field>

            <Field className="gap-2">
              <FieldLabel htmlFor="phone">Numer telefonu</FieldLabel>

              <Input
                id="phone"
                type="tel"
                placeholder="Wpisz swój numer telefonu"
                className="placeholder:text-gray-600 bg-white border-border rounded-lg"
                {...form.register("phone", {
                  required: "Numer telefonu jest wymagany",
                })}
              />
            </Field>

            <Field className="gap-2">
              <FieldLabel htmlFor="email">Adres e-mail</FieldLabel>

              <Input
                id="email"
                type="email"
                placeholder="Wpisz swój adres e-mail"
                className="placeholder:text-gray-600 bg-white border-border rounded-lg"
                {...form.register("email", {
                  required: "Adres e-mail jest wymagany",
                })}
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

              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Wysyłanie..." : "Wyślij zgłoszenie"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
