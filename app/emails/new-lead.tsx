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

          <Section
            style={{
              marginTop: "32px",
              padding: "16px 20px",
              backgroundColor: "#F5F7F5",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
            }}
          >
            <Text style={{ margin: 0, fontSize: "14px", color: "#4B5563" }}>
              💬 <strong>Wskazówka:</strong> Aby odpowiedzieć tej osobie,
              kliknij <strong>„Odpowiedz”</strong> w swoim programie pocztowym.
              Odpowiedź zostanie automatycznie wysłana na adres{" "}
              <strong>{contact.email}</strong>.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
