import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { ServicesSection } from "@/components/dashboard/services-section";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRightIcon, Dumbbell, MapPin } from "lucide-react";
import Image from "next/image";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("slug", username)
    .single();

  if (!profile) {
    notFound();
  }

  console.log(profile);

  return (
    <section className="p-5 mx-auto max-w-2xl">
      <header className="hidden md:block">
        <p className="text-center md:text-left text-lg font-medium px-5">
          Fitly
        </p>
      </header>

      <div className="md:border mt-5 md:p-7 rounded-2xl">
        <div className="flex flex-col-reverse md:flex-row gap-2 md:gap-3 md:justify-between items-center">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-xl font-medium mb-3 md:mb-1 shimmer shimmer-color-blue-500/60">
              {profile.full_name}
            </h1>
            <p className="text-gray-600 max-w-75 text-sm md:text-base text-center md:text-left">
              {profile.bio}
            </p>
          </div>

          {/* <div className="w-full h-50 bg-gray-100 rounded-2xl md:size-30 md:rounded-full md:shrink-0"></div> */}
          <div className="relative h-50 w-full overflow-hidden rounded-2xl bg-gray-100 md:size-30 md:shrink-0 md:rounded-full">
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.full_name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 120px"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                {profile.full_name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 md:mt-10">
          <h2 className="text-xs uppercase tracking-wide font-medium">
            Social media
          </h2>

          <div className="flex flex-wrap gap-2 mt-3">
            <Badge
              variant="outline"
              className="px-3 py-1"
              render={
                <a href="#link">
                  Instagram <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              }
            />
            <Badge
              variant="outline"
              className="px-3 py-1"
              render={
                <a href="#link">
                  Facebook <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              }
            />
            <Badge
              variant="outline"
              className="px-3 py-1"
              render={
                <a href="#link">
                  TikTok <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              }
            />
          </div>
        </div>

        {/* lokalizacja */}
        <div className="mt-8 md:mt-10">
          <h2 className="text-xs uppercase tracking-wide font-medium">
            Lokalizacja i siłownie
          </h2>
          <p className="mt-3 text-gray-600 flex items-center">
            <MapPin className="inline-block mr-1" size={15} />
            <span>{profile.city}</span>
          </p>
          <p className=" text-gray-600">
            <Dumbbell className="inline-block mr-1" size={15} />
            {profile.gyms.map((gym) => (
              <span key={gym.name}>{gym.name}</span>
            ))}
          </p>
        </div>

        {/* specjalizacje */}
        <div className="mt-8 md:mt-10">
          <h2 className="text-xs uppercase tracking-wide font-medium">
            Specjalizacje
          </h2>

          <div className="flex flex-wrap gap-1 mt-3">
            {profile.specializations.map((spec) => (
              <Badge variant="outline" key={spec}>
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        {/* usługi i cennik */}
        <ServicesSection />

        {/* specjalizacje */}
        <div className="mt-8 md:mt-10 flex justify-center">
          <p className="text-sm text-gray-600">&copy; 2026 Fitly.</p>
        </div>
      </div>
    </section>
  );
}

// export default async function UserProfilePage({
//   params,
// }: {
//   params: Promise<{ username: string }>;
// }) {
//   // const { username } = await params;

// }
