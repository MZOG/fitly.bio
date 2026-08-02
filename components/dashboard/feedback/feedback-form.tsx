"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { sendFeedback } from "@/app/actions/send-feedback";
import { Input } from "@/components/ui/input";

const feedbackLabels = {
  idea: "💡 Pomysł",
  bug: "🐛 Problem",
  question: "❓ Pytanie",
  other: "📝 Inne",
} as const;

const feedbackTypes = [
  { value: "idea", label: "💡 Pomysł" },
  { value: "bug", label: "🐛 Problem" },
  { value: "question", label: "❓ Pytanie" },
  { value: "other", label: "📝 Inne" },
];

export function FeedbackForm() {
  const [type, setType] = useState("idea");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    if (!message.trim()) {
      toast.error("Napisz wiadomość.");
      return;
    }

    if (!title.trim()) {
      toast.error("Podaj krótki tytuł.");
      return;
    }

    setLoading(true);

    try {
      await sendFeedback(type, message, title);

      setMessage("");
      setType("idea");
      router.refresh();

      toast.success("Dziękujemy za opinię ❤️");
    } catch {
      toast.error("Nie udało się wysłać wiadomości.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 rounded-xl border p-6">
      <div>
        <label className="mb-2 block text-sm font-medium">Krótki tytuł</label>

        <Input
          placeholder="Np. Własna domena"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium">Typ zgłoszenia</label>

        <Select
          value={type}
          onValueChange={(value) => setType(value ?? "idea")}
        >
          <SelectTrigger className="w-full">
            <SelectValue>
              {feedbackLabels[type as keyof typeof feedbackLabels]}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {feedbackTypes.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Wiadomość</label>

        <Textarea
          rows={8}
          placeholder="Opisz swój pomysł lub problem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <Button disabled={loading} onClick={onSubmit}>
        {loading ? "Wysyłanie..." : "Wyślij"}
      </Button>
    </div>
  );
}
