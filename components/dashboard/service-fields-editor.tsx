"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServiceField } from "@/lib/types";
import { Trash2 } from "lucide-react";

type Props = {
  fields: ServiceField[];
  onChange: (fields: ServiceField[]) => void;
};

export function ServiceFieldsEditor({ fields, onChange }: Props) {
  const addField = () => {
    onChange([
      ...fields,
      {
        id: crypto.randomUUID(),
        label: "",
        type: "textarea",
        description: "",
        required: false,
        options: [],
      },
    ]);
  };

  return (
    <>
      <h3 className="font-medium">Formularz zgłoszeniowy</h3>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4 rounded-lg border p-4">
            <Input
              placeholder="Treść pytania"
              value={field.label}
              onChange={(e) => {
                const next = [...fields];
                next[index] = {
                  ...next[index],
                  label: e.target.value,
                };

                onChange(next);
              }}
            />

            <select
              className="w-full rounded-md border px-3 py-2"
              value={field.type}
              onChange={(e) => {
                const next = [...fields];
                next[index] = {
                  ...next[index],
                  type: e.target.value as ServiceField["type"],
                };

                onChange(next);
              }}
            >
              <option value="textarea">Długi tekst</option>
              <option value="radio">Jednokrotny wybór</option>
              <option value="checkbox">Wielokrotny wybór</option>
            </select>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) => {
                  const next = [...fields];
                  next[index] = {
                    ...next[index],
                    required: e.target.checked,
                  };

                  onChange(next);
                }}
              />
              Pole wymagane
            </label>

            {(field.type === "radio" || field.type === "checkbox") && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Opcje</p>

                {field.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex gap-2">
                    <Input
                      value={option}
                      placeholder={`Opcja ${optionIndex + 1}`}
                      onChange={(e) => {
                        const next = [...fields];

                        next[index] = {
                          ...next[index],
                          options: next[index].options.map((item, i) =>
                            i === optionIndex ? e.target.value : item,
                          ),
                        };

                        onChange(next);
                      }}
                    />

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const next = [...fields];

                        next[index] = {
                          ...next[index],
                          options: next[index].options.filter(
                            (_, i) => i !== optionIndex,
                          ),
                        };

                        onChange(next);
                      }}
                    >
                      Usuń
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    const next = [...fields];

                    next[index] = {
                      ...next[index],
                      options: [...next[index].options, ""],
                    };

                    onChange(next);
                  }}
                >
                  Dodaj opcję
                </Button>
              </div>
            )}
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                onChange(fields.filter((_, i) => i !== index));
              }}
            >
              <Trash2 />
              Usuń pytanie
            </Button>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addField}>
          Dodaj pytanie
        </Button>
      </div>
    </>
  );
}
