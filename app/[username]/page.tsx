import { DefaultProfile } from "@/components/profile/themes/default";
import { MinimalProfile } from "@/components/profile/themes/minimal";
import { DarkProfile } from "@/components/profile/themes/dark";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Profile } from "@/lib/types";
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
    .select("full_name, bio, avatar_url, slug, city")
    .eq("slug", username)
    .single();

  if (!profile) {
    return {
      title: "Profil nie istnieje",
    };
  }

  return {
    title: `${profile.full_name} - Trener personalny ${profile.city ? `${profile.city}` : ""}`,
    description:
      profile.bio ?? `Umów trening personalny z ${profile.full_name}.`,
    openGraph: {
      title: `${profile.full_name} - Trener personalny ${profile.city ? `${profile.city}` : ""}`,
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
      title: `${profile.full_name} - Trener personalny ${profile.city ? `${profile.city}` : ""}`,
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

  const { data: gallery, error: galleryError } = await supabase
    .from("gallery")
    .select("*")
    .eq("profile_id", profile.id)
    .order("created_at", { ascending: false });

  const profileWithGallery = {
    ...profile,
    gallery: gallery ?? [],
  };

  switch (profile.theme) {
    case "minimal":
      return <MinimalProfile profile={profile} />;

    case "dark":
      return <DarkProfile profile={profile} />;

    default:
      return <DefaultProfile profile={profileWithGallery} />;
  }
}
