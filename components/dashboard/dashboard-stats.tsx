import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  leads: number;
  unreadLeads: number;
  services: number;
};

export function DashboardStats({ leads, unreadLeads, services }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Leady</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-3xl font-bold">{leads}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nowe</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-3xl font-bold">{unreadLeads}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usługi</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-3xl font-bold">{services}</p>
        </CardContent>
      </Card>
    </div>
  );
}
