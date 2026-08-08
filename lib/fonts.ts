import localFont from "next/font/local";

export const soehne = localFont({
  src: [
    {
      path: "../assets/fonts/soehne/soehne-web-buch.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/soehne/soehne-web-dreiviertelfett.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-soehne",
  display: "swap",
});
