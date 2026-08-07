import { Profile } from "@/lib/types";
import ProfileHeader from "../../profile-header";
import MainInfo from "../../main-info";
import { Services } from "./services";
import { Footer } from "../shared/footer";
import JoinFitly from "../shared/cta";
import { Specializations } from "./specializations";

type Props = {
  profile: Profile;
};

export function DefaultProfile({ profile }: Props) {
  return (
    <section className="min-h-screen bg-[linear-gradient(180deg,#FAFCF8,#F3F6EF_40%)]">
      <div className="md:mx-auto max-w-2xl flexflex-col gap-10 px-6 py-10">
        <ProfileHeader />

        <MainInfo
          full_name={profile.full_name}
          bio={profile.bio}
          avatar_url={profile.avatar_url}
          socials={profile.socials}
          city={profile.city}
          gyms={profile.gyms}
        />
        <Specializations profile={profile} />
        <Services profile={profile} />
        <JoinFitly profile={profile} />
        <Footer />
      </div>
    </section>
  );
}
