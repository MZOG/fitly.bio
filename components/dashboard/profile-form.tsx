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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Gym, Social, Profile, ProfileTheme } from "@/lib/types";
import { useRouter } from "next/navigation";

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

  socials: Social[];
  theme: ProfileTheme;
};

export const SOCIAL_PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "facebook", label: "Facebook" },
  { value: "x", label: "X" },
  { value: "website", label: "Strona internetowa" },
] as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];

export function ProfileForm({ user, profile }: Props) {
  const [isPending, startTransition] = useTransition();

  const isPro = profile?.plan === "pro";

  const specializationOptions = SPECIALIZATIONS.map((item) => ({
    label: item,
    value: item,
  }));

  const router = useRouter();

  const form = useForm<ProfileFormValues>({
    defaultValues: {
      full_name: profile?.full_name ?? "",
      username: profile?.username ?? "",
      bio: profile?.bio ?? "",
      city: profile?.city ?? "",
      gyms: profile?.gyms ?? [{ name: "" }],
      specializations: profile?.specializations ?? [],
      socials: profile?.socials ?? [],
      theme: profile?.theme ?? "default",
    },
  });

  const {
    fields: gymFields,
    append: appendGym,
    remove: removeGym,
  } = useFieldArray({
    control: form.control,
    name: "gyms",
  });

  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control: form.control,
    name: "socials",
  });

  const bio = form.watch("bio");

  const onSubmit = (values: ProfileFormValues) => {
    startTransition(async () => {
      const supabase = createClient();

      const username =
        values.username.trim() === "" ? null : createSlug(values.username);

      const slug = createSlug(username ?? values.full_name);

      const hasInvalidSocial = values.socials.some(
        (social) => social.url.trim() !== "" && social.platform.trim() === "",
      );

      if (hasInvalidSocial) {
        toast.error("Wybierz platformę dla każdego dodanego linku.");
        return;
      }

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        ...values,
        username,
        slug,
        onboarding_completed: true,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Profil zapisany");

      router.push("/dashboard");
      router.refresh();
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
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto max-w-4xl space-y-8"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Mój profil</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Zarządzaj informacjami, które widzą osoby odwiedzające Twój profil.
          </p>
        </div>

        <Button type="submit" disabled={isPending}>
          <Save />
          {isPending ? "Zapisywanie..." : "Zapisz zmiany"}
        </Button>
      </div>

      {/* Informacje podstawowe */}
      <div className="rounded-2xl border bg-background p-6">
        <div className="mb-6">
          <h2 className="font-semibold">Informacje podstawowe</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Zdjęcie profilowe, nazwa i krótki opis.
          </p>
        </div>

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
                  profilu jest tworzony z pola{" "}
                  <span className="underline underline-offset-2">
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
          </FieldGroup>
        </FieldSet>
      </div>

      {/* Specjalizacja i lokalizacja */}
      <div className="rounded-2xl border bg-background p-6">
        <div className="mb-6">
          <h2 className="font-semibold">Specjalizacja i lokalizacja</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Powiedz klientom, w czym się specjalizujesz i gdzie pracujesz.
          </p>
        </div>

        <FieldSet>
          <FieldGroup>
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
                {gymFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      readOnly={!isPro && index > 0}
                      className={
                        !isPro && index > 0
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }
                      {...form.register(`gyms.${index}.name`)}
                      placeholder="Nazwa siłowni"
                    />

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeGym(index)}
                    >
                      <Trash2 className="text-red-600" />
                      Usuń
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  disabled={!isPro && gymFields.length >= 1}
                  onClick={() => appendGym({ name: "" })}
                >
                  <Plus />
                  Dodaj siłownię
                </Button>

                {!isPro && gymFields.length > 1 && (
                  <FieldDescription>
                    Przejdź na <span className="font-semibold">pro</span>, aby
                    edytować dodatkowe siłownie. Możesz je jednak usunąć.
                  </FieldDescription>
                )}
              </div>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>

      {/* Social media */}
      <div className="rounded-2xl border bg-background p-6">
        <div className="mb-6">
          <h2 className="font-semibold">Social media</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Dodaj swoje profile społecznościowe, aby klienci mogli Cię łatwo
            znaleźć.
          </p>
        </div>

        <FieldSet>
          <FieldGroup>
            <Field>
              <div className="space-y-3">
                {socialFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 gap-3 sm:grid-cols-[180px_1fr_auto]"
                  >
                    <Select
                      value={form.watch(`socials.${index}.platform`) ?? ""}
                      onValueChange={(value) => {
                        if (value === null) return;

                        form.setValue(`socials.${index}.platform`, value);
                      }}
                    >
                      <SelectTrigger className="rounded-lg border-border bg-white">
                        <SelectValue placeholder="Platforma" />
                      </SelectTrigger>

                      <SelectContent className="rounded-lg">
                        {SOCIAL_PLATFORMS.map((platform) => (
                          <SelectItem
                            key={platform.value}
                            value={platform.value}
                          >
                            {platform.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Input
                      placeholder="https://..."
                      {...form.register(`socials.${index}.url`)}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSocial(index)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendSocial({
                      platform: "",
                      url: "",
                    })
                  }
                >
                  <Plus />
                  Dodaj social
                </Button>
              </div>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    </form>
  );
}
