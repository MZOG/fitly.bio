"use client";

import { useRef } from "react";
import { Bold } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { BioText } from "@/lib/bio";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  maxLength?: number;
};

export function BioEditor({ value, onChange, onBlur, name, maxLength }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const toggleBold = () => {
    const el = ref.current;
    if (!el) return;

    const { selectionStart: start, selectionEnd: end } = el;
    const selected = value.slice(start, end);
    const before = value.slice(0, start);
    const after = value.slice(end);

    let next: string;
    let selStart: number;
    let selEnd: number;

    if (before.endsWith("**") && after.startsWith("**")) {
      // Already bold: remove the markers around the selection.
      next = before.slice(0, -2) + selected + after.slice(2);
      selStart = start - 2;
      selEnd = end - 2;
    } else {
      const inner = selected || "pogrubiony tekst";
      next = `${before}**${inner}**${after}`;
      selStart = start + 2;
      selEnd = selStart + inner.length;
    }

    if (maxLength !== undefined && next.length > maxLength) return;

    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(selStart, selEnd);
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={toggleBold}
          title="Pogrubienie (Ctrl/⌘ + B)"
          aria-label="Pogrubienie"
          className="inline-flex size-8 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-secondary"
        >
          <Bold className="size-4" />
        </button>
        <span className="ml-2 text-xs text-muted-foreground">
          Zaznacz tekst i kliknij B. Enter tworzy nową linię.
        </span>
      </div>

      <Textarea
        ref={ref}
        name={name}
        rows={5}
        value={value}
        maxLength={maxLength}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
            e.preventDefault();
            toggleBold();
          }
        }}
      />

      {value.trim() && (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-3 py-3">
          <p className="mb-1 text-xs font-medium text-muted-foreground">
            Podgląd na profilu
          </p>
          <BioText
            text={value}
            className="text-sm leading-relaxed text-muted-foreground"
          />
        </div>
      )}
    </div>
  );
}
