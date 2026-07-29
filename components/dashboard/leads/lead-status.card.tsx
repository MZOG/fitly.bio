import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadStatusSelect } from "./lead-status-select";
import { Lead } from "@/lib/types";

type Props = {
  lead: Lead;
};

export function LeadStatusCard({ lead }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status</CardTitle>
      </CardHeader>

      <CardContent>
        <LeadStatusSelect leadId={lead.id} status={lead.status} />
      </CardContent>
    </Card>
  );
}
