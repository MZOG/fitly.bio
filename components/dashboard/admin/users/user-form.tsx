"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { AdminUser } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { updateUser } from "./actions";
import { ExternalLink } from "lucide-react";

type Props = {
  user: AdminUser;
};

type FormValues = {
  full_name: string;
  city: string;
  bio: string;
  slug: string;
  plan: "free" | "pro";
  is_public: boolean;
  onboarding_completed: boolean;
};

export function UserForm({ user }: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    defaultValues: {
      full_name: user.full_name ?? "",
      city: user.city ?? "",
      bio: user.bio ?? "",
      slug: user.slug ?? "",
      plan: user.plan ?? "free",
      is_public: user.is_public ?? true,
      onboarding_completed: user.onboarding_completed ?? false,
    },
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        await updateUser({
          id: user.id,
          ...values,
        });

        toast.success("Użytkownik zapisany");
      } catch (error) {
        toast.error("Nie udało się zapisać zmian.");
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="text-sm font-medium">Imię i nazwisko</label>

        <Input {...form.register("full_name")} />
      </div>

      <div>
        <label className="text-sm font-medium">Miasto</label>

        <Input {...form.register("city")} />
      </div>

      <div>
        <label className="text-sm font-medium">Slug</label>

        <Input {...form.register("slug")} />

        <a
          className="flex items-center text-xs gap-2 mt-2"
          target="_blank"
          href={`${process.env.NEXT_PUBLIC_APP_URL}/${form.getValues("slug")}`}
        >
          zobacz profil
          <ExternalLink size={15} />
        </a>
      </div>

      <div>
        <label className="text-sm font-medium">Bio</label>

        <Textarea rows={5} {...form.register("bio")} />
      </div>

      <div>
        <label className="text-sm font-medium">Plan</label>

        <Select
          value={form.watch("plan")}
          onValueChange={(value) =>
            form.setValue("plan", value as "free" | "pro")
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="free">FREE</SelectItem>

            <SelectItem value="pro">PRO</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          checked={form.watch("is_public")}
          onCheckedChange={(checked) => form.setValue("is_public", !!checked)}
        />

        <span>Profil publiczny</span>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          checked={form.watch("onboarding_completed")}
          onCheckedChange={(checked) =>
            form.setValue("onboarding_completed", !!checked)
          }
        />

        <span>Onboarding ukończony</span>
      </div>

      <Button type="submit" disabled={isPending}>
        Zapisz
      </Button>
    </form>
  );
}
