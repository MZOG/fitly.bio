"use client";
import { cn } from "@/lib/utils";
import { ProfileTheme } from "@/lib/types";

type Props = {
  value: ProfileTheme;
  onChange: (theme: ProfileTheme) => void;
};

const THEMES: {
  value: ProfileTheme;
  title: string;
  description: string;
}[] = [
  {
    value: "default",
    title: "Klasyczny",
    description: "Obecny wygląd profilu",
  },
  {
    value: "minimal",
    title: "Minimal",
    description: "Prosty i nowoczesny",
  },
  {
    value: "dark",
    title: "Ciemny",
    description: "Ciemny motyw",
  },
];

export function ThemeSelector({ value, onChange }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {THEMES.map((theme) => (
        <button
          key={theme.value}
          type="button"
          onClick={() => onChange(theme.value)}
          className={cn(
            "rounded-xl border p-4 transition hover:border-primary",
            value === theme.value && "border-primary ring-2 ring-primary/20",
          )}
        >
          <div
            className={cn(
              "mb-4 overflow-hidden rounded-lg border transition",
              theme.value === "dark"
                ? "border-zinc-800 bg-zinc-950"
                : "border-border bg-background",
            )}
          >
            {theme.value === "default" && (
              <div className="flex h-40 flex-col">
                <div className="flex flex-col items-center border-b px-4 py-4">
                  <div className="mb-2 h-10 w-10 rounded-full bg-muted" />

                  <div className="h-2 w-20 rounded bg-foreground/80" />

                  <div className="mt-2 h-2 w-14 rounded bg-muted-foreground/50" />
                </div>

                <div className="flex flex-1 flex-col gap-2 p-3">
                  <div className="h-8 rounded-lg bg-primary/10" />

                  <div className="h-6 rounded bg-muted" />

                  <div className="h-6 rounded bg-muted" />
                </div>
              </div>
            )}

            {theme.value === "minimal" && (
              <div className="flex h-40 flex-col items-center justify-center gap-3 bg-background">
                <div className="h-12 w-12 rounded-full bg-muted" />

                <div className="h-2 w-24 rounded bg-foreground/80" />

                <div className="h-2 w-16 rounded bg-muted-foreground/40" />

                <div className="mt-2 h-7 w-28 rounded-full bg-primary/10" />
              </div>
            )}

            {theme.value === "dark" && (
              <div className="flex h-40 flex-col bg-zinc-950 p-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-zinc-700" />

                  <div className="space-y-2">
                    <div className="h-2 w-20 rounded bg-zinc-200" />

                    <div className="h-2 w-12 rounded bg-zinc-500" />
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <div className="h-7 rounded-lg bg-green-500/20" />

                  <div className="h-5 rounded bg-zinc-800" />

                  <div className="h-5 rounded bg-zinc-800" />
                </div>
              </div>
            )}
          </div>

          <h3 className="font-medium">{theme.title}</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {theme.description}
          </p>
        </button>
      ))}
    </div>
  );
}
