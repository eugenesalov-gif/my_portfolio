import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yauheni Salau — Senior Product Designer",
  description: "Senior Product Designer with 5+ years of experience building B2B, SaaS solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
