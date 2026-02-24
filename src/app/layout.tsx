import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
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
  colorScheme: "only light",
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
    <html lang="en" className="light" style={{ colorScheme: 'only light' }}>
      <head>
        <meta name="color-scheme" content="only light" />
        <meta name="theme-color" content="#FDFBF7" />
      </head>
      <body className={`${quicksand.variable} antialiased min-h-screen bg-[#FDFBF7] text-[#5D4037]`}>
        <Providers>
          <Header />
          <CartSidebar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
