import PanelTitle from "@/components/dashboard/panel-title";
import { ProFeature } from "@/components/dashboard/pro-feature";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  return (
    <section className="container max-w-md">
      <PanelTitle title="Mój profil" />

      <div className="mt-5 space-y-5">
        <p>@zdjęcie profilowe</p>

        <FieldSet>
          <FieldDescription className="uppercase tracking-wide text-xs text-gray-600">
            Informacje podstawowe
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Imię i nazwisko</FieldLabel>
              <Input
                id="name"
                autoComplete="off"
                className="bg-white border-border"
              />
            </Field>
            <ProFeature>
              <Field>
                <FieldLabel htmlFor="url">Nazwa użytkownika</FieldLabel>
                <Input
                  id="url"
                  autoComplete="off"
                  className="bg-white border-border"
                />
                <FieldDescription>
                  Nazwa użytkownika w adresie URL Twojego profilu. Możesz użyć
                  liter, cyfr i myślników.
                </FieldDescription>
              </Field>
            </ProFeature>

            <Field>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Textarea
                id="bio"
                autoComplete="off"
                className="bg-white border-border"
              />
              <FieldDescription>
                Nazwa użytkownika w adresie URL Twojego profilu. Możesz użyć
                liter, cyfr i myślników.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>

      <div className="mt-10 space-y-5">
        <p className="uppercase tracking-wide text-xs text-gray-600">
          Lokalizacja i siłownie
        </p>

        <p>miasto</p>
        <p>siłownie</p>
      </div>

      <div className="mt-10 space-y-5">
        <p className="uppercase tracking-wide text-xs text-gray-600">
          Specjalizacje
        </p>

        <p>specjalizacje max 3 dla free</p>
      </div>

      <div className="mt-10 space-y-5">
        <p className="uppercase tracking-wide text-xs text-gray-600">
          Social media
        </p>

        <p>instagram</p>
        <p>facebook</p>
        <p>tiktok</p>
        <p>youtube</p>
        <p>linkedin</p>
        <p>strona internetowa</p>
      </div>
    </section>
  );
}
