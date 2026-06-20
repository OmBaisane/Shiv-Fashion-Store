import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shiv Fashion | Premium Men's Wear",
  description:
    "Premium men's fashion store in Surat. Stylish, affordable and high-quality clothing with local delivery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
