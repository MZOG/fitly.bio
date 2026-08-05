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
    .select("full_name, bio, avatar_url, slug")
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
    openGraph: {
      title: `${profile.full_name} | Trener personalny`,
      description:
        profile.bio ?? `Umów trening personalny z ${profile.full_name}.`,
      url: `https://fitly.bio/${profile.slug}`,
      siteName: "Fitly",
      images: [
        {
          url: `https://fitly.bio/${profile.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: profile.full_name ?? "Profil trenera",
        },
      ],
      locale: "pl_PL",
      type: "profile",
    },

    twitter: {
      card: "summary_large_image",
      title: `${profile.full_name} | Trener personalny`,
      description:
        profile.bio ?? `Umów trening personalny z ${profile.full_name}.`,
      images: [`https://fitly.bio/${profile.slug}/opengraph-image`],
    },
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
    <section className="min-h-screen bg-[linear-gradient(180deg,#FAFCF8,#F3F6EF_40%)]">
      <div className="md:mx-auto max-w-2xl">
        <ProfileHeader />

        <div className="px-5">
          <MainInfo
            full_name={profile.full_name}
            bio={profile.bio}
            avatar_url={profile.avatar_url}
            socials={profile.socials}
            city={profile.city}
            gyms={profile.gyms}
          />

          {/* specjalizacje */}
          {profile.specializations.length > 0 && (
            <Specializations specializations={profile.specializations} />
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
      </div>
    </section>
  );
}
