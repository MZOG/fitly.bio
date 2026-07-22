import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";

export default async function TrainerPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const social = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/johndoe",
      icon: FaInstagram,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/johndoe",
      icon: FaFacebook,
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@johndoe",
      icon: FaTiktok,
    },
  ];

  const MOCK_SERVICES = [
    {
      id: "trening-1on1",
      title: "Trening Personalny 1:1",
      price: 150,
      currency: "PLN",
      period: "/ trening",
      icon: "🏋️‍♂️",
      features: [
        "Opieka i korekta techniki na żywo",
        "Trening w prywatnym studiu w Warszawie",
        "Dostęp do aplikacji z planem treningowym",
      ],
      ctaText: "Zapisz się na trening",
    },
    {
      id: "prowadzenie-online",
      title: "Prowadzenie Online Full-Pack",
      price: 299,
      currency: "PLN",
      period: "/ miesiąc",
      badge: "BESTSELLER",
      icon: "🚀",
      features: [
        "Indywidualny plan treningowy i żywieniowy",
        "Cotygodniowy raport i korekta założeń",
        "Stały kontakt na WhatsApp (odpowiedź do 2h)",
      ],
      ctaText: "Wybieram ten pakiet",
    },
    {
      id: "plan-dietetyczny",
      title: "Plan Dietetyczny + Suplementacja",
      price: 199,
      currency: "PLN",
      period: "jednorazowo",
      icon: "🥗",
      features: [
        "Jadłospis dopasowany do Twoich preferencji i kaloryczności",
        "Lista zakupów na każdy tydzień",
        "Książka z prostymi przepisami (PDF)",
      ],
      ctaText: "Zamów jadłospis",
    },
    {
      id: "konsultacja",
      title: "Konsultacja Online (Jednorazowa)",
      price: 99,
      currency: "PLN",
      period: "/ 45 min",
      icon: "💻",
      features: [
        "Analiza Twojej dotychczasowej diety i treningu",
        "Wskazanie błędów i plan działania",
        "Odpowiedzi na wszystkie Twoje pytania",
      ],
      ctaText: "Umów konsultację",
    },
  ];

  return (
    <section className="container px-5 py-10 mx-auto">
      <header className="flex flex-col items-center justify-center gap-3 border-b pb-5">
        {/* avatar */}
        <div className="size-40 bg-gray-100 rounded-full"></div>

        {/* full name */}
        <h1 className="text-2xl font-medium">John Doe</h1>

        {/* description */}
        <p className="text-center text-gray-600">
          John Doe is a professional trainer with over 10 years of experience in
          the field.
        </p>
        <div className="flex gap-2">
          {social.map((item) => (
            <Button
              key={item.name}
              size="lg"
              variant="outline"
              render={
                <Link href={item.url} target="_blank" rel="noopener noreferrer">
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              }
            ></Button>
          ))}
        </div>
      </header>

      <div className="mt-5">
        <h2 className="text-center text-lg font-semibold">Usługi i cennik</h2>

        <div className="mt-5">
          {MOCK_SERVICES.map((service) => (
            <div key={service.id} className="border p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="text-gray-600">
                {service.price} {service.currency} {service.period}
              </p>
              <ul className="list-disc list-inside mt-2 hidden">
                {service.features.map((feature, index) => (
                  <li className="text-sm" key={index}>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-4"
                size="lg"
                render={<button>{service.ctaText}</button>}
              ></Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
