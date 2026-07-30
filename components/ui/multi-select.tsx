"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type MultiSelectOption = {
  label: string;
  value: string;
};

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
  options: MultiSelectOption[];
  placeholder?: string;
  maxSelected?: number;
};

export function MultiSelect({
  value,
  onChange,
  options,
  placeholder = "Wybierz...",
  maxSelected,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const toggle = (selected: string) => {
    if (value.includes(selected)) {
      onChange(value.filter((v) => v !== selected));
      return;
    }

    if (maxSelected && value.length >= maxSelected) {
      return;
    }

    onChange([...value, selected]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            role="combobox"
            className="min-h-11 h-auto w-full justify-between hover:bg-white"
          >
            <div className="flex flex-wrap gap-1">
              {value.length === 0 && (
                <span className="text-muted-foreground">{placeholder}</span>
              )}

              {value.map((item) => (
                <Badge key={item} variant="outline" className="gap-1">
                  {item}

                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();

                      onChange(value.filter((v) => v !== item));
                    }}
                  />
                </Badge>
              ))}
            </div>

            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        }
      ></PopoverTrigger>

      <PopoverContent className="w-100 p-0">
        <Command>
          <CommandInput placeholder="Szukaj..." />

          <CommandList>
            <CommandEmpty>Brak wyników.</CommandEmpty>

            <CommandGroup>
              {options.map((option) => {
                const selected = value.includes(option.value);

                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => toggle(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected ? "opacity-100" : "opacity-0",
                      )}
                    />

                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
