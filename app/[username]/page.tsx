import { ServicesSection } from "@/components/dashboard/services-section";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRightIcon, Dumbbell, MapPin } from "lucide-react";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  // const { username } = await params;

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
            <h1 className="text-xl font-medium mb-3 md:mb-1">
              Marcin Zogrodnik
            </h1>
            <p className="text-gray-600 max-w-75 text-sm md:text-base text-center md:text-left">
              Hej, tutaj będzie moje bio, trzeba zrobić tak, żeby było max
              powiedzmy 300-400 znaków.
            </p>
          </div>

          <div className="size-30 bg-gray-100 rounded-full"></div>
        </div>

        <div className="mt-8 md:mt-10">
          <h2 className="text-xs uppercase tracking-wide font-medium">
            Social media
          </h2>

          <div className="flex flex-wrap gap-2 mt-3">
            <Badge
              variant="outline"
              render={
                <a href="#link">
                  Instagram <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              }
            />
            <Badge
              variant="outline"
              render={
                <a href="#link">
                  Facebook <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              }
            />
            <Badge
              variant="outline"
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
            <span>Warszawa</span>
          </p>
          <p className=" text-gray-600">
            <Dumbbell className="inline-block mr-1" size={15} />
            <span>Calypso Fitness, Fabryka Formy</span>
          </p>
        </div>

        {/* specjalizacje */}
        <div className="mt-8 md:mt-10">
          <h2 className="text-xs uppercase tracking-wide font-medium">
            Specjalizacje
          </h2>

          <div className="flex flex-wrap gap-1 mt-3">
            <Badge variant="outline">Dietetyka</Badge>
            <Badge variant="outline">Trening siłowy</Badge>
            <Badge variant="outline">Trening funkcjonalny</Badge>
          </div>
        </div>

        {/* usługi i cennik */}
        <ServicesSection />
      </div>
    </section>
  );
}
