import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "sonner";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zipo - Tienda Infantil",
  description: "Tienda online de productos infantiles con los mejores precios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {children}
          <WhatsAppButton />
          <Toaster 
            position="bottom-right"
            expand={false}
            richColors
            closeButton
          />
        </CartProvider>
      </body>
    </html>
  );
}
