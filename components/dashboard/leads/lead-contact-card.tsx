import { LeadContact } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, User } from "lucide-react";

type Props = {
  contact: LeadContact;
};

export function LeadContactCard({ contact }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dane kontaktowe</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex items-center gap-3">
          <User className="size-4 text-muted-foreground" />
          <span>{contact.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="size-4 text-muted-foreground" />
          <a href={`tel:${contact.phone}`}>{contact.phone}</a>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="size-4 text-muted-foreground" />
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      </CardContent>
    </Card>
  );
}
