import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  service: string;
};

export function LeadServiceCard({ service }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usługa</CardTitle>
      </CardHeader>

      <CardContent>{service}</CardContent>
    </Card>
  );
}
