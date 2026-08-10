import { Profile } from "@/lib/types";

import { Header } from "./header";
import { Bio } from "./bio";
import { Specializations } from "./specializations";
import { Footer } from "../shared/footer";
import { Services } from "./services";
import { Info } from "./info";
import { Separator } from "@/components/ui/separator";
import MinimalLogo from "./minimal-logo";

type Props = {
  profile: Profile;
};

export function MinimalProfile({ profile }: Props) {
  return (
    <section className="min-h-screen bg-white">
      <div className="mx-auto flex max-w-lg flex-col gap-7 md:gap-10 px-5 py-5">
        <MinimalLogo />
        <Header profile={profile} />
        {/* <Info profile={profile} /> */}
        {/* <Bio profile={profile} /> */}
        {/* <Specializations profile={profile} /> */}
        {/* <div>
          <Separator className="mb-5" />
          <Services profile={profile} />
        </div> */}
        <Footer />
      </div>
    </section>
  );
}
