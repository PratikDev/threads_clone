import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import LeftPanel from "@/components/shared/LeftPanel";
import RightPanel from "@/components/shared/RightPanel";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads Clone",
  description: "Threads Clone built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <NextTopLoader showSpinner={false} color="#877eff" />

          <Header />

          <main className="flex flex-row">
            <LeftPanel />

            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>

            <RightPanel />
          </main>

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
