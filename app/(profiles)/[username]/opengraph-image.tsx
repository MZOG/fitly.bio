export const runtime = "nodejs";
import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/lib/types";
import { cookies } from "next/headers";
import { ImageResponse } from "next/og";

export const alt = "Fitly";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function Image({ params }: Props) {
  const { username } = await params;

  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("slug", username)
    .single<Profile>();

  if (!profile) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 48,
        }}
      >
        Profil nie istnieje
      </div>,
      size,
    );
  }

  const regular = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/fonts/SpaceGrotesk-Regular.ttf`,
  ).then((res) => res.arrayBuffer());

  const medium = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/fonts/SpaceGrotesk-Medium.ttf`,
  ).then((res) => res.arrayBuffer());

  const semibold = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/fonts/SpaceGrotesk-SemiBold.ttf`,
  ).then((res) => res.arrayBuffer());

  const bold = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/fonts/SpaceGrotesk-Bold.ttf`,
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 40,
        alignItems: "center",
        padding: "30px 50px",
        background: `
  radial-gradient(circle at 12% 18%, rgba(92, 184, 92, 0.10) 0%, transparent 28%),
  radial-gradient(circle at 88% 82%, rgba(92, 184, 92, 0.08) 0%, transparent 30%),
  linear-gradient(180deg,#FAFCF8,#F3F6EF 40%)
`,
        fontFamily: "sans-serif",
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontSize: 34,
          fontWeight: 500,
          letterSpacing: -1,
          color: "#111",
          fontFamily: "Space Grotesk",
        }}
      >
        Fitly.
      </div>

      {/* Środek */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {profile.avatar_url ? (
          <img
            src={profile.avatar_url}
            width={150}
            height={150}
            style={{
              borderRadius: 999,
              objectFit: "cover",
              border: "4px solid white",
              boxShadow: "0 10px 40px rgba(0,0,0,.12)",
            }}
          />
        ) : (
          <div
            style={{
              width: 130,
              height: 130,
              borderRadius: 999,
              background: "#d9d9d9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: 700,
              color: "#444",
              border: "4px solid white",
              boxShadow: "0 10px 40px rgba(0,0,0,.12)",
            }}
          >
            {(profile.full_name ?? "T")[0].toUpperCase()}
          </div>
        )}

        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: -1,
            color: "#111",
            fontFamily: "Space Grotesk",
          }}
        >
          {profile.full_name}
        </div>

        <div
          style={{
            marginTop: 10,
            fontSize: 24,
            color: "#666",
          }}
        >
          {`Trener personalny • ${profile.city ?? ""}`}
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 10,
          }}
        >
          {profile.specializations.slice(0, 3).map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 16px",
                borderRadius: 999,
                background: "#fff",
                border: "1px solid #E5E7EB",
                fontSize: 16,
                color: "#222",
                marginTop: 10,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Dół */}
      <div
        style={{
          width: "100%",
          borderTop: "1px solid #E5E7EB",
          paddingTop: 26,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
              fontSize: 26,
              fontWeight: 400,
              letterSpacing: -0.5,
              color: "#111",
              fontFamily: "Space Grotesk",
            }}
          >
            {profile.services?.[0]?.name ?? "Trening personalny"}
          </div>

          <div
            style={{
              marginTop: 6,
              fontSize: 36,
              fontWeight: 700,
              color: "#111",
            }}
          >
            {profile.services?.[0]?.price
              ? `od ${profile.services[0].price}`
              : ""}
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
              fontSize: 30,
              fontWeight: 500,
              letterSpacing: -0.5,
              color: "#2F6F3E",
              fontFamily: "Space Grotesk",
            }}
          >
            {`fitly.bio/${profile.slug}`}
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
      ...size,
      fonts: [
        {
          name: "Space Grotesk",
          data: regular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Space Grotesk",
          data: medium,
          weight: 500,
          style: "normal",
        },
        {
          name: "Space Grotesk",
          data: bold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
