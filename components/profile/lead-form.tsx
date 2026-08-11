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
      <DrawerHeader className="mt-5 p-0 font-soehne">
        <DrawerTitle className="text-fitly">{service.name}</DrawerTitle>

        <DrawerDescription>
          Wypełnij formularz, a trener skontaktuje się z Tobą.
        </DrawerDescription>
      </DrawerHeader>
      <div className="mt-5 scroll-mt-5">
        <h2 className="text-center md:text-left text-lg font-medium font-soehne">
          Ankieta
        </h2>

        <form className="mt-5 flex flex-col gap-5" onSubmit={handleSubmit}>
          <input type="hidden" name="serviceId" value={service.id} />

          {service.fields.map((field) => {
            switch (field.type) {
              case "textarea":
                return (
                  <Field key={field.id} className="gap-2">
                    <FieldLabel className="text-base font-soehne">
                      {field.label}
                      {field.required && (
                        <span className="text-red-600">*</span>
                      )}
                    </FieldLabel>

                    {field.description && (
                      <FieldDescription className="text-gray-600 font-soehne">
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
                          className="bg-white border border-border rounded-lg font-soehne"
                        />
                      )}
                    />
                  </Field>
                );

              case "radio":
                return (
                  <Field key={field.id} className="gap-2">
                    <FieldLabel className="text-base font-soehne">
                      {field.label}
                    </FieldLabel>

                    {field.description && (
                      <FieldDescription className="text-gray-600 font-soehne">
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
                              className="flex items-center gap-2 font-soehne"
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
                    <FieldLabel className="text-base font-soehne">
                      {field.label}
                      {field.required && (
                        <span className="text-red-600">*</span>
                      )}
                    </FieldLabel>

                    {field.description && (
                      <FieldDescription className="text-gray-600 font-soehne">
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
                                className="flex items-center gap-2 font-soehne"
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
            <FieldLabel htmlFor="name" className="text-base font-soehne">
              Imię i nazwisko
              <span className="text-red-600 font-soehne">*</span>
            </FieldLabel>

            <Input
              id="name"
              placeholder="Wpisz swoje imię i nazwisko"
              className="placeholder:text-gray-600 placeholder:text-[13px] bg-white border-border rounded-lg placeholder:text-soehne"
              {...form.register("name", {
                required: "Imię i nazwisko jest wymagane",
              })}
            />
          </Field>

          <Field className="gap-2">
            <FieldLabel htmlFor="phone" className="text-base font-soehne">
              Numer telefonu <span className="text-red-600 font-soehne">*</span>
            </FieldLabel>

            <Input
              id="phone"
              type="tel"
              placeholder="Wpisz swój numer telefonu"
              className="placeholder:text-gray-600 placeholder:text-[13px] bg-white border-border rounded-lg placeholder:text-soehne"
              {...form.register("phone", {
                required: "Numer telefonu jest wymagany",
              })}
            />
          </Field>

          <Field className="gap-2">
            <FieldLabel htmlFor="email" className="text-base font-soehne">
              Adres e-mail <span className="text-red-600 font-soehne">*</span>
            </FieldLabel>

            <Input
              id="email"
              type="email"
              placeholder="Wpisz swój adres e-mail"
              className="placeholder:text-gray-600 placeholder:text-[13px] bg-white border-border rounded-lg placeholder:text-soehne"
              {...form.register("email", {
                required: "Adres e-mail jest wymagany",
              })}
            />
          </Field>

          <div className="flex justify-between">
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={handleCancel}
              className="font-soehne"
            >
              Anuluj
            </Button>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="font-soehne"
            >
              {isSubmitting ? "Wysyłanie..." : "Wyślij zgłoszenie"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
