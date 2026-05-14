import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import NeuralNetwork from "@/components/three/NeuralNetwork";
import QueryProvider from "@/components/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeuroVerse AI | Enterprise Orchestration",
  description: "Advanced AI operating system for enterprise orchestration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#020617] text-white selection:bg-sky-500/30`}>
        <div className="scanline" />
        <div className="noise-overlay" />
        <QueryProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Navbar />
              <main className="flex-1 overflow-y-auto neural-grid relative">
                <NeuralNetwork />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617] pointer-events-none" />
                <div className="relative z-10 p-8">
                  {children}
                </div>
              </main>
            </div>
            {/* Right Analytics Panel Placeholder */}
            <aside className="hidden xl:block w-80 bg-[#0b0f1a]/50 border-l border-white/10 p-6">
              <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-6">Real-time Telemetry</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 animate-pulse">
                    <div className="w-20 h-2 bg-white/10 rounded mb-2" />
                    <div className="w-full h-8 bg-white/5 rounded" />
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
