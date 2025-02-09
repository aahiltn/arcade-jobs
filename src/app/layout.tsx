import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MouseMoveEffect from "@/components/mouse-move-effect";

import { ClerkProvider } from "@clerk/nextjs";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const inter = Inter({ subsets: ["latin"] });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "ArcadeJobs",
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
