import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";

export function FreeLimitEmail() {
  return (
    <Html>
      <Head />

      <Preview>Masz nowe zgłoszenie</Preview>

      <Body>
        <Container>
          <Heading>Masz nowe zgłoszenie 🎉</Heading>

          <Text>Otrzymałeś nowe zgłoszenie od potencjalnego klienta.</Text>

          <Text>
            W darmowym planie możesz wyświetlić tylko pierwsze 5 zgłoszeń.
          </Text>

          <Text>Przejdź na plan Pro, aby odblokować wszystkie zgłoszenia.</Text>
        </Container>
      </Body>
    </Html>
  );
}
