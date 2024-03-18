import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import tajaricon from "@/app/tajar_icon.ico"
import Providers from "@/components/providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tajar",
  description: "Developed by Ahmed Baloch",
  // icons: tajaricon,
  //   openGraph: {
  //     images: [
  //       {
  //         url: '/tajar_icon.ico',
  //         width: 1200,
  //         height: 630,
  //       },
  //     ],
  // }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <main className="relative flex flex-col min-h-screen">
          <Providers>
          <Navbar />
          <div className="flex-grow flex-1">{children}</div>
          </Providers>
        </main>

        <Toaster position="top-center" richColors  />
      </body>
    </html>
  );
}
