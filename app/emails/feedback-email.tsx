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
  name: string;
  email: string;
  type: string;
  title: string;
  message: string;
};

export default function FeedbackEmail({
  name,
  email,
  type,
  message,
  title,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>Nowy feedback w Fitly</Preview>

      <Body
        style={{
          backgroundColor: "#f6f6f6",
          fontFamily: "Inter, Arial, sans-serif",
          padding: "32px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "32px",
          }}
        >
          <Heading
            style={{
              marginTop: 0,
              marginBottom: "24px",
            }}
          >
            💡 Nowy feedback
          </Heading>

          <Section>
            <Text>
              <strong>Tytuł:</strong> {title}
            </Text>

            <Text>
              <strong>Użytkownik:</strong> {name}
            </Text>

            <Text>
              <strong>Email:</strong> {email}
            </Text>

            <Text>
              <strong>Typ:</strong> {type}
            </Text>
          </Section>

          <Hr />

          <Text
            style={{
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            Wiadomość
          </Text>

          <Text
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.6,
            }}
          >
            {message}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
