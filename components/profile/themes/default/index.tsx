import { Profile } from "@/lib/types";
import DefaultHeader from "./default-header";
import { DefaultServices } from "./default-services";
import { Footer } from "../shared/footer";
import JoinFitly from "../shared/cta";
import { DefaultSpecializations } from "./default-specializations";
import DefaultAvatar from "./default-avatar";
import DefaultInfo from "./default-info";

type Props = {
  profile: Profile;
};

export function DefaultProfile({ profile }: Props) {
  return (
    <section className="mx-auto flex min-h-dvh w-full max-w-xl flex-col gap-8 px-5 pb-5 pt-8">
      <DefaultHeader />

      <div
        className="flex flex-col items-center text-center"
        aria-labelledby="profile-name"
      >
        <DefaultAvatar profile={profile} />
        <DefaultInfo profile={profile} />
      </div>

      <DefaultSpecializations profile={profile} />
      <DefaultServices profile={profile} />
      {/* <JoinFitly profile={profile} /> */}
      <Footer />
    </section>
  );
}
