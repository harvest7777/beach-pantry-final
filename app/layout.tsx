import type { Metadata } from "next";
import Navbar from "./_components/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beach Pantry Stock",
  description: "Check the stock of the beach pantry in real time!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-muted pb-5`}
      >
        <Navbar />
        <div className="px-5">{children}</div>
      </body>
    </html>
  );
}
