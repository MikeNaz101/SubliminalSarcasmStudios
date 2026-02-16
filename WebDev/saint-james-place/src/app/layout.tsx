import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";
import PwaRegistrar from "@/components/PwaRegistrar";

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
    manifest: "/manifest.json", // <--- 2. Link the manifest
    icons: {
        icon: "/images/icon-192.png", // Change from saintjamesIcon.png
        apple: "/images/icon-512.png", // Change from saintjamesIcon.png
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "SJP Maint",
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
                <PwaRegistrar /> {/* <--- 3. Drop the registrar right here at the top of body */}
                    <Providers>
                        {children}
                    </Providers>
                <Footer />
            </body>
        </html>
    );
}