import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/utilities.css";
import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import { getSiteConfig } from "@/lib/site";

const siteConfig = getSiteConfig();

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.hero.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavigationBar
          links={siteConfig.navigation}
          siteName={siteConfig.name}
        />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
