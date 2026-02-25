import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Load our fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
    title: "Triple S Web Services | High-Performance Architecture",
    description: "Custom web applications, AWS cloud hosting, and full-stack architecture.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
        <body className={`${inter.variable} ${jetbrainsMono.variable} bg-slate-950 text-slate-50 antialiased`}>
        <Navbar />
        {/* Added padding top so the fixed navbar doesn't cover your hero section */}
        <div className="pt-20">
            {children}
        </div>
        <Footer />
        </body>
        </html>
    );
}