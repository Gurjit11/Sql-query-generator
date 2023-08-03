import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SQL query generator",
  description: "Generate SQL queries using the Power of AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="w-screen overflow-x-clip">
      <head>
        <link rel="icon" href="/next.svg" />
      </head>
      <body className={inter.className + "overflow-hidden"}>{children}</body>
    </html>
  );
}
