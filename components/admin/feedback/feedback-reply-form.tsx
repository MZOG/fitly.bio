"use client";

import { useState } from "react";
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

import { replyFeedback } from "@/app/actions/reply-feedback";

type Props = {
  feedback: {
    id: string;
    admin_reply: string | null;
    status: string;
  };
};

const statuses = [
  {
    value: "new",
    label: "👀 Rozważamy",
  },
  {
    value: "planned",
    label: "📌 Zaplanowane",
  },
  {
    value: "replied",
    label: "🚧 W realizacji",
  },
  {
    value: "closed",
    label: "✅ Gotowe",
  },
];

export function FeedbackReplyForm({ feedback }: Props) {
  const [reply, setReply] = useState(feedback.admin_reply ?? "");
  const [status, setStatus] = useState(feedback.status);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      await replyFeedback(feedback.id, reply, status);

      toast.success("Odpowiedź została zapisana.");
    } catch {
      toast.error("Nie udało się zapisać odpowiedzi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 rounded-xl border p-6">
      <div>
        <label className="mb-2 block text-sm font-medium">Status</label>

        <Select
          value={status}
          onValueChange={(value) => setStatus(value ?? "new")}
        >
          <SelectTrigger>
            <SelectValue>
              {statuses.find((item) => item.value === status)?.label}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {statuses.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Odpowiedź</label>

        <Textarea
          rows={8}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Napisz odpowiedź..."
        />
      </div>

      <Button onClick={onSubmit} disabled={loading}>
        {loading ? "Zapisywanie..." : "Zapisz i wyślij e-mail"}
      </Button>
    </div>
  );
}
