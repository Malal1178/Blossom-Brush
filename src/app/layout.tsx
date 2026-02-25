import type { Metadata, Viewport } from "next";
import { Quicksand, Fredoka } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Blossom & Brush",
  description: "Your Garden of Art",
  other: {
    "darkreader-lock": "true",
    "darkreader": "nope",
  },
};

export const viewport: Viewport = {
  themeColor: "#FDFBF7",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="Supported-Color-Schemes" content="light" />
        <meta name="theme-color" content="#FDFBF7" />
      </head>
      <body className={`${quicksand.variable} ${fredoka.variable} antialiased min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50 paw-pattern relative text-pink-800 font-sans`}>
        <Providers>
          <Header />
          <CartSidebar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
