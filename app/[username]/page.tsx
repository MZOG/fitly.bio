import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { ServicesSection } from "@/components/dashboard/services-section";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRightIcon, Dumbbell, MapPin } from "lucide-react";
import Image from "next/image";

import { Profile } from "@/lib/types";
import { Button } from "@/components/ui/button";

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
      <header>
        <p className="text-center md:text-left text-2xl px-5 font-montserrat italic font-extrabold uppercase">
          Fitly.
        </p>
      </header>

      <div className="md:border mt-5 md:p-7 rounded-2xl">
        <div className="flex flex-col-reverse md:flex-row gap-2 md:gap-3 md:justify-between items-center">
          <div className="flex flex-col items-center md:items-start">
            {profile.full_name && (
              <h1 className="text-xl font-black italic uppercase mb-3 md:mb-1">
                {profile.full_name}
              </h1>
            )}
            {profile.bio && (
              <p className="font-montserrat text-center md:text-left">
                {profile.bio}
              </p>
            )}
          </div>

          <div className="relative size-50 overflow-hidden rounded-2xl bg-gray-100 md:size-30 md:shrink-0 md:rounded-full">
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.full_name || "Fitly - Wizytówka trenera"}
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

        {profile.socials.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {profile?.socials.map((social) => (
              <Badge
                key={social.platform}
                variant="outline"
                className="px-3 py-1"
                render={
                  <a href={social.url}>
                    {social.platform}{" "}
                    <ArrowUpRightIcon data-icon="inline-end" />
                  </a>
                }
              />
            ))}
          </div>
        )}

        {/* specjalizacje */}
        {profile.specializations.length > 0 && (
          <div className="mt-12">
            <h2 className="text-center text-gray-600 font-montserrat font-black uppercase tracking-wide italic">
              Specjalizacje
            </h2>

            <div className="flex items-center justify-center flex-wrap gap-1 mt-3">
              {profile.specializations.map((spec) => (
                <Badge variant="outline" key={spec} className="px-3 py-1">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* lokalizacja */}
        {profile.city && (
          <div className="mt-12">
            <h2 className="text-center text-gray-600 font-montserrat font-black uppercase tracking-wide italic">
              Lokalizacja i siłownie
            </h2>
            <div className="grid grid-cols-2 justify-between mt-3">
              <p className="text-gray-600 flex items-center">
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
          </div>
        )}

        {/* usługi i cennik */}
        <ServicesSection />

        {/* CTA */}
        {profile.plan === "free" && (
          <div className="mt-12 bg-blue-600 rounded-lg p-5 flex flex-col items-center">
            <h3 className="font-montserrat font-black text-2xl italic uppercase text-white">
              Jesteś trenerem?
            </h3>
            <h4 className="font-montserrat font-black text-xl italic uppercase text-white">
              Dołącz do fitly.
            </h4>

            <p className="text-white mt-5">Załóż darmowe konto.</p>

            <Button
              className="mt-5 italic uppercase text-lg font-black tracking-wide h-auto py-4 px-10 rounded-xl"
              size="lg"
            >
              Załóż konto
            </Button>
          </div>
        )}

        <div className="mt-8 md:mt-10 flex justify-center">
          <p className="text-sm text-gray-600">&copy; 2026 Fitly.</p>
        </div>
      </div>
    </section>
  );
}
