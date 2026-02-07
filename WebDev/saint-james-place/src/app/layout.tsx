import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

// Load the fonts
const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: '--font-serif', // We will reference this variable in Tailwind
    display: 'swap',
});

const lato = Lato({
    weight: ['400', '700'],
    subsets: ["latin"],
    variable: '--font-sans',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Saint James Place | Luxury Townhomes",
    description: "Experience elevated living in Queensbury, NY.",
    icons: {
        //icon: "/favicon.ico", // This points to your file in the public folder
        icon: "images/saintjamesIcon.png"
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
        <body className="font-sans antialiased bg-slate-500 text-slate-900">
        {children}
        <Footer />
        </body>
        </html>
    );
}