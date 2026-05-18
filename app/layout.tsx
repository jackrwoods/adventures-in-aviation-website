import type { Metadata } from "next";
import "@fontsource/b612/400.css";
import "@fontsource/b612/700.css";
import "@fontsource/b612-mono/400.css";
import "@fontsource/andika/400.css";
import "@fontsource/andika/700.css";
import "./globals.css";
import { UIStateProvider } from "@/lib/ui-state";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Adventures in Aviation",
  description:
    "A flight plan for aviation's talent crisis. Cinematic educational aviation content for students aged 10-18.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <UIStateProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Navigation />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </UIStateProvider>
      </body>
    </html>
  );
}
