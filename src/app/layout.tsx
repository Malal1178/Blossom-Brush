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
};

export const viewport: Viewport = {
  themeColor: "#FDFBF7",
  colorScheme: "only light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} antialiased`}>
        <Providers>
          <Header />
          <CartSidebar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
