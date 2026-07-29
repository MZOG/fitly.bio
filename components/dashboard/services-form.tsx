"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";

import { Service } from "@/lib/types";
import { ServiceFieldsEditor } from "./service-fields-editor";

type Props = {
  services: Service[];
  plan: string | null;
};

type FormValues = {
  services: Service[];
};

const DEFAULT_SERVICES: Service[] = [
  {
    id: "personal-training",
    name: "Trening personalny",
    price: "",
    description: "",
    fields: [
      {
        id: "goal",
        label: "Jaki jest Twój główny cel?",
        description:
          "Np. redukcja, budowa masy mięśniowej lub poprawa kondycji.",
        type: "textarea",
        required: true,
        options: [],
      },
      {
        id: "experience",
        label: "Jakie masz doświadczenie treningowe?",
        description: "Opisz, jak długo trenujesz i na jakim jesteś poziomie.",
        type: "textarea",
        required: true,
        options: [],
      },
      {
        id: "expectations",
        label: "Opowiedz krótko o sobie i swoich oczekiwaniach.",
        description:
          "Im więcej informacji podasz, tym łatwiej będzie przygotować plan.",
        type: "textarea",
        required: true,
        options: [],
      },
    ],
  },
  {
    id: "online-training",
    name: "Prowadzenie online",
    price: "",
    description: "",
    fields: [
      {
        id: "goal",
        label: "Jaki jest Twój główny cel?",
        description:
          "Np. redukcja, budowa masy mięśniowej lub poprawa kondycji.",
        type: "textarea",
        required: true,
        options: [],
      },
      {
        id: "experience",
        label: "Jakie masz doświadczenie treningowe?",
        description: "Opisz, jak długo trenujesz i na jakim jesteś poziomie.",
        type: "textarea",
        required: true,
        options: [],
      },
      {
        id: "equipment",
        label: "Jakim sprzętem dysponujesz?",
        description: "Np. siłownia, hantle, gumy, atlas, trening w domu.",
        type: "textarea",
        required: true,
        options: [],
      },
    ],
  },
  {
    id: "diet-plan",
    name: "Plan dietetyczny",
    price: "",
    description: "",
    fields: [
      {
        id: "goal",
        label: "Jaki jest Twój cel żywieniowy?",
        description:
          "Np. redukcja tkanki tłuszczowej, masa lub utrzymanie wagi.",
        type: "textarea",
        required: true,
        options: [],
      },
      {
        id: "allergies",
        label: "Czy masz alergie lub produkty, których nie jesz?",
        description: "Wymień wszystkie ważne informacje dotyczące diety.",
        type: "textarea",
        required: true,
        options: [],
      },
      {
        id: "meals",
        label: "Ile posiłków dziennie jesteś w stanie jeść?",
        description: "",
        type: "textarea",
        required: true,
        options: [],
      },
    ],
  },
];

export function ServicesForm({ services, plan }: Props) {
  const [isPending, startTransition] = useTransition();
  const isPro = plan === "pro";

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const supabase = createClient();

      for (const service of values.services) {
        for (const field of service.fields ?? []) {
          if (!field.label.trim()) {
            toast.error("Każde pytanie musi mieć treść.");
            return;
          }

          if (
            (field.type === "radio" || field.type === "checkbox") &&
            field.options.filter((o) => o.trim()).length < 2
          ) {
            toast.error(`"${field.label}" musi mieć przynajmniej 2 opcje.`);
            return;
          }
        }
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          services: values.services,
        })
        .eq("id", (await supabase.auth.getUser()).data.user?.id);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Usługi zostały zapisane.");
    });
  };

  const normalizedServices = (
    services.length ? services : DEFAULT_SERVICES
  ).map((service) => ({
    ...service,
    fields: service.fields ?? [],
  }));

  const form = useForm<FormValues>({
    defaultValues: {
      services: normalizedServices,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "services",
  });

  const supabase = createClient();

  useEffect(() => {
    if (services.length > 0) {
      return;
    }

    const initializeServices = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      await supabase
        .from("profiles")
        .update({
          services: DEFAULT_SERVICES,
        })
        .eq("id", user.id);
    };

    initializeServices();
  }, [services.length, supabase]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-xl border p-5 space-y-4">
            <div>
              <label className="text-sm font-medium">Nazwa usługi</label>

              <input
                className="mt-1 w-full rounded-md border px-3 py-2"
                readOnly={!isPro && index < 3}
                {...form.register(`services.${index}.name`)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Cena</label>

              <input
                className="mt-1 w-full rounded-md border px-3 py-2"
                placeholder="150 zł"
                {...form.register(`services.${index}.price`)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Opis</label>

              <textarea
                rows={3}
                className="mt-1 w-full rounded-md border px-3 py-2"
                readOnly={!isPro && index < 3}
                {...form.register(`services.${index}.description`)}
              />

              {!isPro && (
                <p className="text-sm text-muted-foreground">
                  Opis usługi jest dostępny w planie Pro.
                </p>
              )}

              <div className="space-y-2 mt-5">
                <h3 className="font-medium">Formularz zgłoszeniowy</h3>

                {!isPro ? (
                  <div className="rounded-lg border border-dashed p-4">
                    <p className="text-sm text-muted-foreground">
                      W planie Pro możesz tworzyć własne pytania formularza,
                      oznaczać je jako wymagane oraz dodawać odpowiedzi
                      jednokrotnego i wielokrotnego wyboru.
                    </p>
                  </div>
                ) : (
                  <ServiceFieldsEditor
                    fields={form.watch(`services.${index}.fields`) ?? []}
                    onChange={(fields) =>
                      form.setValue(`services.${index}.fields`, fields)
                    }
                  />
                )}
              </div>
            </div>

            {isPro && index >= 3 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => remove(index)}
              >
                Usuń usługę
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5 items-start">
        {isPro && (
          <Button
            type="button"
            onClick={() =>
              append({
                id: crypto.randomUUID(),
                name: "",
                price: "",
                description: "",
                fields: [],
              })
            }
          >
            Dodaj usługę
          </Button>
        )}

        <Button type="submit" disabled={isPending}>
          {isPending ? "Zapisywanie..." : "Zapisz"}
        </Button>
      </div>
    </form>
  );
}
