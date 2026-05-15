import type { Metadata } from "next";

/*
 *  ___           ___                       ___           ___           ___           ___
 * /\  \         /\__\          ___        /\__\         /\  \         /\  \         /\__\
 * /::\  \       /::|  |        /\  \      /::|  |       /::\  \       /::\  \       /:/  /
 * /:/\:\  \     /:|:|  |        \:\  \    /:|:|  |      /:/\:\  \     /:/\ \  \     /:/__/
 * /::\~\:\  \   /:/|:|  |__      /::\__\  /:/|:|__|__   /::\~\:\  \   _\:\~\ \  \   /::\  \ ___
 * /:/\:\ \:\__\ /:/ |:| /\__\  __/:/\/__/ /:/ |::::\__\ /:/\:\ \:\__\ /\ \:\ \ \__\ /:/\:\  /\__\
 * \/__\:\/:/  / \/__|:|/:/  / /\/:/  /    \/__/~~/:/  / \:\~\:\ \/__/ \:\ \:\ \/__/ \/__\:\/:/  /
 *      \::/  /      |:/:/  /  \::/__/           /:/  /   \:\ \:\__\    \:\ \:\__\        \::/  /
 *      /:/  /       |::/  /    \:\__\          /:/  /     \:\ \/__/     \:\/:/  /        /:/  /
 *     /:/  /        /:/  /      \/__/         /:/  /       \:\__\        \::/  /        /:/  /
 *     \/__/         \/__/                     \/__/         \/__/         \/__/         \/__/
 */
import "@/styles/globals.css";
import "@/styles/utilities.css";
import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import { getSiteConfig } from "@/lib/site";

const siteConfig = getSiteConfig();

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.hero.tagline,
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var stored = localStorage.getItem('theme');
                if (stored === 'dark' || stored === 'light') {
                  document.documentElement.setAttribute('data-theme', stored);
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
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
