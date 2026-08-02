import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type Props = {
  title: string;
  message: string;
  reply: string;
};

export default function FeedbackReplyEmail({ title, message, reply }: Props) {
  return (
    <Html>
      <Head />

      <Preview>Odpowiedź na Twoje zgłoszenie</Preview>

      <Body
        style={{
          background: "#f5f5f5",
          padding: "32px 0",
          fontFamily: "Inter, Arial",
        }}
      >
        <Container
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 32,
          }}
        >
          <Heading>Odpowiedź od Fitly 💚</Heading>

          <Text>Dziękujemy za przesłanie opinii.</Text>

          <Hr />

          <Section>
            <Text>
              <strong>Twoje zgłoszenie</strong>
            </Text>

            <Text>{title}</Text>

            <Text>{message}</Text>
          </Section>

          <Hr />

          <Section>
            <Text>
              <strong>Nasza odpowiedź</strong>
            </Text>

            <Text>{reply}</Text>
          </Section>

          <Hr />

          <Text
            style={{
              color: "#666",
              fontSize: 14,
            }}
          >
            Dziękujemy, że pomagasz rozwijać Fitly ❤️
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
