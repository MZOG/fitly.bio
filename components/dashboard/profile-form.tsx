"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";

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

import slugify from "slugify";

type Profile = {
  id: string;
  full_name: string | null;
  slug: string | null;
  username: string | null;
  bio: string | null;
  city: string | null;
  gyms: string[];
  specializations: string[];
  socials: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
    linkedin?: string;
    website?: string;
  };
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

  gyms: string[];
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

  const form = useForm<ProfileFormValues>({
    defaultValues: {
      full_name: profile?.full_name ?? "",
      username: profile?.username ?? "",
      bio: profile?.bio ?? "",
      city: profile?.city ?? "",

      gyms: profile?.gyms ?? [],
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

  const onSubmit = (values: ProfileFormValues) => {
    startTransition(async () => {
      const supabase = createClient();

      const slug = slugify(values.username || values.full_name, {
        lower: true,
        strict: true,
        trim: true,
        locale: "pl",
      });

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

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel>Imię i nazwisko</FieldLabel>
            <Input {...form.register("full_name")} />
            <FieldDescription>
              fitly.bio/
              {slugify(username || fullName, {
                lower: true,
                strict: true,
                trim: true,
                locale: "pl",
              })}
            </FieldDescription>
          </Field>

          <ProFeature>
            <Field>
              <FieldLabel>Nazwa użytkownika</FieldLabel>
              <Input
                {...form.register("username", {
                  setValueAs: (value: string) => slugify(value),
                })}
              />
              <FieldDescription>fitly.bio/twoja-nazwa</FieldDescription>
            </Field>
          </ProFeature>

          <Field>
            <FieldLabel>Bio</FieldLabel>
            <Textarea rows={5} {...form.register("bio")} />
          </Field>

          <Field>
            <FieldLabel>Miasto</FieldLabel>
            <Input {...form.register("city")} />
          </Field>
        </FieldGroup>
      </FieldSet>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Zapisywanie..." : "Zapisz"}
      </Button>
    </form>
  );
}
