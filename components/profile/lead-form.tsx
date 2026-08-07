import { createLead } from "@/app/actions/create-lead";
import { Service } from "@/lib/types";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DrawerDescription, DrawerHeader, DrawerTitle } from "../ui/drawer";

type Props = {
  service: Service;
  trainerId: string;
  onCancel: () => void;
  onSuccess?: () => void;
};

type FormValues = {
  answers: Record<string, string | string[]>;
  name: string;
  phone: string;
  email: string;
};

export default function LeadForm({
  service,
  trainerId,
  onCancel,
  onSuccess,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      answers: {},
      name: "",
      phone: "",
      email: "",
    },
  });

  const handleCancel = () => {
    form.reset();
    onCancel();
  };

  const handleSubmit = form.handleSubmit(async (values) => {
    if (!service) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createLead({
        trainerId,
        service: {
          id: service.id,
          name: service.name,
        },
        contact: {
          name: values.name,
          phone: values.phone,
          email: values.email,
        },
        answers: service.fields.map((field) => ({
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
      onSuccess?.();
    } catch {
      toast.error("Nie udało się wysłać zgłoszenia");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <>
      <DrawerHeader className="mt-5">
        <DrawerTitle>{service.name}</DrawerTitle>

        <DrawerDescription>
          Wypełnij formularz, a trener skontaktuje się z Tobą.
        </DrawerDescription>
      </DrawerHeader>
      <div className="mt-10 scroll-mt-5">
        <h2 className="text-center text-lg font-grotesk font-black">Ankieta</h2>
        {/* Wybrana usługa */}
        <div className="mt-3 rounded-lg bg-white border p-4">
          <p className="text-sm text-gray-600">Wybrana usługa</p>

          <div className="mt-1 flex items-center justify-between">
            <p className="font-grotesk font-medium">{service.name}</p>
          </div>
        </div>

        <form className="mt-5 flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* To przesyłasz do backendu */}
          <input type="hidden" name="serviceId" value={service.id} />

          {service.fields.map((field) => {
            switch (field.type) {
              case "textarea":
                return (
                  <Field key={field.id} className="gap-2">
                    <FieldLabel className="text-base">
                      {field.label}
                      {field.required && (
                        <span className="text-red-600">*</span>
                      )}
                    </FieldLabel>

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
                    <FieldLabel className="text-base">{field.label}</FieldLabel>

                    {field.description && (
                      <FieldDescription className="text-gray-600">
                        {field.description}
                        {field.required && (
                          <span className="text-red-600">*</span>
                        )}
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
                    <FieldLabel className="text-base">
                      {field.label}
                      {field.required && (
                        <span className="text-red-600">*</span>
                      )}
                    </FieldLabel>

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
            <FieldLabel htmlFor="name">
              Imię i nazwisko
              <span className="text-red-600">*</span>
            </FieldLabel>

            <Input
              id="name"
              placeholder="Wpisz swoje imię i nazwisko"
              className="placeholder:text-gray-600 placeholder:text-[13px] bg-white border-border rounded-lg"
              {...form.register("name", {
                required: "Imię i nazwisko jest wymagane",
              })}
            />
          </Field>

          <Field className="gap-2">
            <FieldLabel htmlFor="phone">
              Numer telefonu <span className="text-red-600">*</span>
            </FieldLabel>

            <Input
              id="phone"
              type="tel"
              placeholder="Wpisz swój numer telefonu"
              className="placeholder:text-gray-600 placeholder:text-[13px] bg-white border-border rounded-lg"
              {...form.register("phone", {
                required: "Numer telefonu jest wymagany",
              })}
            />
          </Field>

          <Field className="gap-2">
            <FieldLabel htmlFor="email">
              Adres e-mail <span className="text-red-600">*</span>
            </FieldLabel>

            <Input
              id="email"
              type="email"
              placeholder="Wpisz swój adres e-mail"
              className="placeholder:text-gray-600 placeholder:text-[13px] bg-white border-border rounded-lg"
              {...form.register("email", {
                required: "Adres e-mail jest wymagany",
              })}
            />
          </Field>

          <div className="rounded-lg bg-white border p-4 text-sm ">
            Po wysłaniu zgłoszenia trener skontaktuje się z Tobą, aby wspólnie
            ustalić dogodny termin treningu.
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={handleCancel}
            >
              Anuluj
            </Button>

            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Wysyłanie..." : "Wyślij zgłoszenie"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
