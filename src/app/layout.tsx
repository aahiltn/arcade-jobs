import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MouseMoveEffect from "@/components/mouse-move-effect";

import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arcade Jobs",
  description: "Gamify your job search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <Head>
          {" "}
          <link rel="icon" href="assets/arcade_icon.svg" />
        </Head>
        <body
          className={`${inter.className} bg-background text-foreground antialiased`}
        >
          <MouseMoveEffect />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
