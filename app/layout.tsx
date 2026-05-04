import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://eugenesalov.com"),
  title: "Yauheni Salau — Senior Product Designer",
  description:
    "Senior Product Designer with 5+ years of experience building B2B, SaaS solutions across analytics platforms, automation platforms and AI-powered features.",
  openGraph: {
    title: "Yauheni Salau — Senior Product Designer",
    description:
      "Senior Product Designer with 5+ years of experience building B2B, SaaS solutions across analytics platforms, automation platforms and AI-powered features.",
    url: "https://eugenesalov.com",
    siteName: "Yauheni Salau Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yauheni Salau — Senior Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yauheni Salau — Senior Product Designer",
    description:
      "Senior Product Designer with 5+ years of experience building B2B, SaaS solutions across analytics platforms, automation platforms and AI-powered features.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.png",
  },
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
        <Script id="hotjar-tracking" strategy="afterInteractive">
          {`(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:6519150,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
      </body>
    </html>
  );
}
