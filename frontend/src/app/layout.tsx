import type { Metadata } from "next";
import { Josefin_Sans, Nunito } from "next/font/google";
import "./globals.css";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-handlee",
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Andiambalama MV",
  description: "Official website of WP/NG/ Andiambalama Maha Vidyalaya",
  icons: {
    icon: "/img/favicon.png",
    shortcut: "/img/favicon.png",
    apple: "/img/favicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${josefin.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-nunito">{children}</body>
    </html>
  );
}
