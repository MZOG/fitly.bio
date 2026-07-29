import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type LatestLead = {
  id: string;
  contact: {
    name: string;
  };
  service_name: string;
  created_at: string;
  is_read: boolean;
};

type Props = {
  leads: LatestLead[];
};

export function LatestLeads({ leads }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ostatnie zgłoszenia</CardTitle>
      </CardHeader>

      <CardContent>
        {leads.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nie masz jeszcze żadnych zgłoszeń.
          </p>
        ) : (
          <div className="space-y-3">
            {leads.map((lead) => (
              <Link
                key={lead.id}
                href={`/dashboard/leads/${lead.id}`}
                className="flex items-center justify-between py-4 bg-blue-50 hover:bg-muted/50  rounded-md px-2 -mx-2"
              >
                <div>
                  <p className="font-medium">{lead.contact.name}</p>

                  <p className="text-sm text-muted-foreground">
                    {lead.service_name}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground">
                  {new Intl.DateTimeFormat("pl-PL", {
                    dateStyle: "short",
                  }).format(new Date(lead.created_at))}
                </p>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
