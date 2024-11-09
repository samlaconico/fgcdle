import type { Metadata } from "next";
import "./globals.css";
import { Figtree } from "next/font/google";

const figtree = Figtree({
  weight: "400",
  subsets: ["latin"],
  variable: "--figtree",
});

export const metadata: Metadata = {
  title: "FGCdle",
  description: "Fighting Game Dle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} container m-auto bg-neutral-800 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
