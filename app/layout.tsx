import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { soehne } from "@/lib/fonts";

import Script from "next/script";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fitly - Darmowa strona dla trenerów personalnych",
  description:
    "Stwórz profesjonalną stronę dla trenera personalnego w kilka minut. Dodaj usługi, formularz kontaktowy i udostępnij jeden link w bio na Instagramie lub TikToku.",
  metadataBase: new URL("https://fitly.bio"),
  keywords: [
    "strona dla trenera personalnego",
    "strona internetowa dla trenera",
    "link w bio",
    "wizytówka dla trenera",
    "landing page dla trenera",
    "profil trenera",
    "trener personalny",
    "fitly",
  ],
  openGraph: {
    title: "Fitly",
    description: "Stwórz profesjonalny profil trenera personalnego.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: "Fitly",
      },
    ],
    siteName: "Fitly",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/api/og`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${spaceGrotesk.variable} ${geist.className} ${soehne.variable} antialiased`}
    >
      <body>
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
        <Toaster position="bottom-center" richColors />

        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
