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
import { Plus, Save, Trash2 } from "lucide-react";
import { AvatarUpload } from "./avatar-upload";
import { MultiSelect } from "../ui/multi-select";
import { SPECIALIZATIONS } from "@/lib/specializations";

type Gym = {
  name: string;
};

type Profile = {
  id: string;
  full_name: string | null;
  slug: string | null;
  username: string | null;
  avatar_url: string | null;
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
  const specializationOptions = SPECIALIZATIONS.map((item) => ({
    label: item,
    value: item,
  }));

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

  // useEffect(() => {
  //   if (!profile) return;

  //   form.reset({
  //     full_name: profile.full_name ?? "",
  //     username: profile.username ?? "",
  //     bio: profile.bio ?? "",
  //     city: profile.city ?? "",
  //     gyms: profile.gyms?.length ? profile.gyms : [{ name: "" }],
  //     specializations: profile.specializations ?? [],
  //     socials: {
  //       instagram: profile.socials?.instagram ?? "",
  //       facebook: profile.socials?.facebook ?? "",
  //       tiktok: profile.socials?.tiktok ?? "",
  //       youtube: profile.socials?.youtube ?? "",
  //       linkedin: profile.socials?.linkedin ?? "",
  //       website: profile.socials?.website ?? "",
  //     },
  //   });
  // }, [profile, form]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-lg">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel>Zdjęcie profilowe</FieldLabel>

            <AvatarUpload
              userId={user.id}
              avatarUrl={profile?.avatar_url ?? null}
            />

            <FieldDescription>
              JPG, PNG lub WEBP. Zdjęcie będzie widoczne na Twoim profilu.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel>Imię i nazwisko</FieldLabel>
            <Input {...form.register("full_name")} />
            <FieldDescription className="text-xs">
              fitly.bio/
              {profilePreviewSlug}
            </FieldDescription>
            {isPro && (
              <FieldDescription>
                W planie <span className="font-semibold">pro</span> adres
                profilu jest tworzony z pola
                <span className="underline underline-offset-2">
                  {" "}
                  Nazwa użytkownika
                </span>
                .
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
              <FieldDescription className="text-xs">
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
            <FieldLabel>Specjalizacje</FieldLabel>

            <MultiSelect
              value={form.watch("specializations")}
              options={specializationOptions}
              maxSelected={isPro ? undefined : 3}
              placeholder="Wybierz specjalizacje"
              onChange={(value) => {
                form.setValue("specializations", value);
              }}
            />

            <FieldDescription>
              {isPro
                ? `${form.watch("specializations").length} wybranych`
                : `${form.watch("specializations").length}/3 wybrane`}
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
                    readOnly={!isPro && index > 0}
                    className={
                      !isPro && index > 0 ? "opacity-50 cursor-not-allowed" : ""
                    }
                    {...form.register(`gyms.${index}.name`)}
                    placeholder="Nazwa siłowni"
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="text-red-600" />
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
                <Plus />
                Dodaj siłownię
              </Button>
              {!isPro && fields.length > 1 && (
                <FieldDescription>
                  Przejdź na <span className="font-semibold">pro</span>, aby
                  edytować dodatkowe siłownie. Możesz je jednak usunąć.
                </FieldDescription>
              )}
            </div>
          </Field>
        </FieldGroup>
      </FieldSet>

      <Button type="submit" disabled={isPending}>
        <Save />
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
