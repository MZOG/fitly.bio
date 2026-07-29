import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { ServicesSection } from "@/components/dashboard/services-section";

import { Profile } from "@/lib/types";
import ProfileCTA from "@/components/profile/cta";
import ProfileHeader from "@/components/profile/profile-header";
import Specializations from "@/components/profile/specializations";
import Localization from "@/components/profile/localization";
import MainInfo from "@/components/profile/main-info";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, bio, avatar_url")
    .eq("slug", username)
    .single();

  if (!profile) {
    return {
      title: "Profil nie istnieje",
    };
  }

  return {
    title: `${profile.full_name} | Trener personalny`,
    description:
      profile.bio ?? `Umów trening personalny z ${profile.full_name}.`,
  };
}

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params;
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("slug", username)
    .single<Profile>();

  if (!profile) {
    notFound();
  }

  return (
    <section className="p-5 mx-auto max-w-2xl">
      <ProfileHeader />

      <div className="md:border mt-5 md:p-7 rounded-2xl">
        <MainInfo
          full_name={profile.full_name}
          bio={profile.bio}
          avatar_url={profile.avatar_url}
          socials={profile.socials}
        />

        {/* specjalizacje */}
        {profile.specializations.length > 0 && (
          <Specializations specializations={profile.specializations} />
        )}

        {/* lokalizacja */}
        {profile.city && (
          <Localization city={profile.city} gyms={profile.gyms} />
        )}

        {/* usługi i cennik */}
        <ServicesSection
          trainerId={profile.id}
          services={profile.services ?? []}
        />

        {/* CTA */}
        {profile.plan === "free" && <ProfileCTA />}

        <div className="mt-8 md:mt-10 flex justify-center">
          <p className="text-sm text-gray-600">&copy; 2026 Fitly.</p>
        </div>
      </div>
    </section>
  );
}
