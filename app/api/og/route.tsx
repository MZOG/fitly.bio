import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export async function GET() {
  const regular = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/fonts/SpaceGrotesk-Regular.ttf`,
  ).then((res) => res.arrayBuffer());

  const medium = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/fonts/SpaceGrotesk-Medium.ttf`,
  ).then((res) => res.arrayBuffer());

  const bold = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/fonts/SpaceGrotesk-Bold.ttf`,
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "30px 50px 50px 50px",
        background: `
            radial-gradient(circle at 12% 18%, rgba(92,184,92,.10) 0%, transparent 28%),
            radial-gradient(circle at 88% 82%, rgba(92,184,92,.08) 0%, transparent 30%),
            linear-gradient(180deg,#FAFCF8,#F3F6EF 40%)
          `,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          fontFamily: "Space Grotesk",
          fontWeight: 500,
          fontSize: 36,
          color: "#111",
        }}
      >
        Fitly.
      </div>

      {/* Hero */}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Left */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Space Grotesk",
              fontWeight: 700,
              fontSize: 64,
              lineHeight: 1.05,
              color: "#111",
            }}
          >
            <span>Twój profil</span>
            <span>trenera</span>
            <span>w 2 minuty.</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 28,
              fontSize: 28,
              color: "#666",
            }}
          >
            <span>Zbieraj zgłoszenia.</span>
            <span>Buduj markę.</span>
            <span>Pozyskuj klientów.</span>
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 34,
            }}
          >
            {["Własny link", "Leady", "Formularze"].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: 999,
                  background: "#fff",
                  border: "1px solid #E5E7EB",
                  fontSize: 18,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Podgląd aplikacji */}
        <img
          src={`${process.env.NEXT_PUBLIC_APP_URL}/mockup.png`}
          width={360}
          height={500}
          style={{
            objectFit: "contain",
          }}
        />
      </div>

      {/* Footer */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #E5E7EB",
          paddingTop: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Space Grotesk",
              fontSize: 26,
              fontWeight: 500,
            }}
          >
            Profesjonalny profil trenera
          </div>

          <div
            style={{
              marginTop: 8,
              fontSize: 20,
              color: "#666",
            }}
          >
            Gotowy w mniej niż 2 minuty.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Space Grotesk",
              fontSize: 30,
              fontWeight: 500,
              color: "#2F6F3E",
            }}
          >
            fitly.bio
          </div>

          <div
            style={{
              marginTop: 6,
              fontSize: 17,
              color: "#888",
            }}
          >
            Umów trening online na Fitly
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Space Grotesk",
          data: regular,
          weight: 400,
        },
        {
          name: "Space Grotesk",
          data: medium,
          weight: 500,
        },
        {
          name: "Space Grotesk",
          data: bold,
          weight: 700,
        },
      ],
    },
  );
}
