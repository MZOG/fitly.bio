import { ServicesSection } from "@/components/dashboard/services-section";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Dumbbell, MapPin } from "lucide-react";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return (
    <section className="p-5 mt-5 mx-auto max-w-2xl">
      <header>
        <p className="text-lg font-medium px-5">marcin.revs</p>
      </header>

      <div className="border mt-5 p-7 rounded-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-medium mb-3">Marcin Zogrodnik</h1>
            <p className="text-gray-600 max-w-75">
              Hej, tutaj będzie moje bio, trzeba zrobić tak, żeby było max
              powiedzmy 300-400 znaków.
            </p>
          </div>

          <div className="size-30 bg-gray-100 rounded-full"></div>
        </div>

        {/* lokalizacja */}
        <div className="mt-10">
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
        <div className="mt-10">
          <h2 className="text-xs uppercase tracking-wide font-medium">
            Specjalizacje
          </h2>

          <div className="flex gap-3 mt-3">
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              Dietetyka
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              Trening siłowy
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              Trening funkcjonalny
            </div>
          </div>
        </div>

        {/* usługi i cennik */}
        <ServicesSection />
      </div>
    </section>
  );
}
