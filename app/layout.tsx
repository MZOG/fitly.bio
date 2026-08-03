import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers/auth-provider";

import { Toaster } from "@/components/ui/sonner";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${spaceGrotesk.variable} ${geist.className} antialiased`}
    >
      <body>
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
