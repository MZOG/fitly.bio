"use client";

import { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { toast } from "sonner";
import { ProFeature } from "./pro-feature";
import { createSlug } from "@/lib/slug";

type Gym = {
  name: string;
};

type Profile = {
  id: string;
  full_name: string | null;
  slug: string | null;
  username: string | null;
  bio: string | null;
  city: string | null;
  gyms: Gym[];
  specializations: string[];
  socials: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
    linkedin?: string;
    website?: string;
  };
  plan: string | null;
};

type Props = {
  user: {
    id: string;
  };
  profile: Profile | null;
};

type ProfileFormValues = {
  full_name: string;
  username: string;
  bio: string;
  city: string;

  gyms: Gym[];
  specializations: string[];

  socials: {
    instagram: string;
    facebook: string;
    tiktok: string;
    youtube: string;
    linkedin: string;
    website: string;
  };
};

export function ProfileForm({ user, profile }: Props) {
  const [isPending, startTransition] = useTransition();
  const isPro = profile?.plan === "pro";

  const form = useForm<ProfileFormValues>({
    defaultValues: {
      full_name: profile?.full_name ?? "",
      username: profile?.username ?? "",
      bio: profile?.bio ?? "",
      city: profile?.city ?? "",
      gyms: profile?.gyms ?? [{ name: "" }],
      specializations: profile?.specializations ?? [],

      socials: {
        instagram: profile?.socials?.instagram ?? "",
        facebook: profile?.socials?.facebook ?? "",
        tiktok: profile?.socials?.tiktok ?? "",
        youtube: profile?.socials?.youtube ?? "",
        linkedin: profile?.socials?.linkedin ?? "",
        website: profile?.socials?.website ?? "",
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "gyms",
  });

  const bio = form.watch("bio");

  const onSubmit = (values: ProfileFormValues) => {
    startTransition(async () => {
      const supabase = createClient();

      const slug = createSlug(values.username || values.full_name);

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        ...values,
        slug,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Profil zapisany");
    });
  };

  const fullName = form.watch("full_name");
  const username = form.watch("username");

  const changePlan = async (plan: "free" | "pro") => {
    const supabase = createClient();

    const slug =
      plan === "pro"
        ? createSlug(profile?.username ?? "")
        : createSlug(profile?.full_name ?? "");

    const { error } = await supabase
      .from("profiles")
      .update({
        plan,
        slug,
      })
      .eq("id", user.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    window.location.reload();
  };

  const profilePreviewSlug = createSlug(
    isPro ? username || fullName : fullName,
  );

  const usernamePreviewSlug = createSlug(username || fullName);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-lg">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel>Imię i nazwisko</FieldLabel>
            <Input {...form.register("full_name")} />
            <FieldDescription>
              fitly.bio/
              {profilePreviewSlug}
            </FieldDescription>
            {isPro && (
              <FieldDescription>
                W planie <strong>Pro</strong> adres profilu jest tworzony z pola
                <strong> Nazwa użytkownika</strong>.
              </FieldDescription>
            )}
          </Field>

          <ProFeature>
            <Field>
              <FieldLabel>Nazwa użytkownika</FieldLabel>
              <Input
                {...form.register("username", {
                  setValueAs: (value: string) => createSlug(value),
                })}
              />
              <FieldDescription>
                fitly.bio/
                {usernamePreviewSlug}
              </FieldDescription>
            </Field>
          </ProFeature>

          <Field>
            <FieldLabel>Bio</FieldLabel>

            <Textarea
              rows={5}
              maxLength={isPro ? undefined : 400}
              {...form.register("bio", {
                maxLength: isPro
                  ? undefined
                  : {
                      value: 400,
                      message: "Bio może mieć maksymalnie 400 znaków.",
                    },
              })}
            />

            <FieldDescription>
              {bio.length}
              {!isPro && "/400"} znaków
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Miasto</FieldLabel>
            <Input {...form.register("city")} />
          </Field>

          <Field>
            <FieldLabel>Siłownie</FieldLabel>

            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    {...form.register(`gyms.${index}.name`)}
                    placeholder="Nazwa siłowni"
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => remove(index)}
                  >
                    Usuń
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                disabled={!isPro && fields.length >= 1}
                onClick={() => append({ name: "" })}
              >
                Dodaj siłownię
              </Button>
              <FieldDescription>
                {isPro
                  ? "Możesz dodać dowolną liczbę siłowni."
                  : "Plan Free pozwala dodać tylko jedną siłownię."}
              </FieldDescription>
            </div>
          </Field>
        </FieldGroup>
      </FieldSet>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Zapisywanie..." : "Zapisz"}
      </Button>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => changePlan("free")}
        >
          Zmień na Free
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => changePlan("pro")}
        >
          Zmień na Pro
        </Button>
      </div>
    </form>
  );
}
