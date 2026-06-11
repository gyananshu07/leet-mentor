import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LeetMentor AI",
  description: "Master LeetCode with AI Guidance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-50 text-foreground">
        <Header />
        <Sidebar />
        <div className="lg:pl-54 min-h-screen">
          <main className="overflow-y-auto p-3 md:p-4 lg:p-5">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
