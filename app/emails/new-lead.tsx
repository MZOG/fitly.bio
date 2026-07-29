import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import { LeadAnswer, LeadContact } from "@/lib/types";

type Props = {
  serviceName: string;
  contact: LeadContact;
  answers: LeadAnswer[];
};

export function NewLeadEmail({ serviceName, contact, answers }: Props) {
  return (
    <Html>
      <Head />

      <Preview>Nowe zgłoszenie z Fitly</Preview>

      <Body>
        <Container>
          <Heading>Nowe zgłoszenie</Heading>

          <Text>
            <strong>Usługa:</strong> {serviceName}
          </Text>

          <Section>
            <Heading as="h3">Kontakt</Heading>

            <Text>Imię: {contact.name}</Text>

            <Text>Telefon: {contact.phone}</Text>

            <Text>Email: {contact.email}</Text>
          </Section>

          <Section>
            <Heading as="h3">Odpowiedzi</Heading>

            {answers.map((answer) => (
              <Section key={answer.fieldId}>
                <Text>
                  <strong>{answer.label}</strong>
                </Text>

                <Text>
                  {Array.isArray(answer.value)
                    ? answer.value.join(", ")
                    : answer.value}
                </Text>
              </Section>
            ))}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
