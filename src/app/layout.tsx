import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shiv Fashion | Premium Men's Wear",
  description:
    "Premium men's fashion store in Surat. Stylish shirts, t-shirts, jeans and modern outfits at affordable prices.",

  icons: {
    icon: "/favicon.svg",
  },

  openGraph: {
    title: "Shiv Fashion",
    description: "Premium men's fashion store in Surat.",
    images: ["/banner.png"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
