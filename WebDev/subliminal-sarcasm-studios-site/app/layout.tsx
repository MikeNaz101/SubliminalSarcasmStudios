import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const display = Bricolage_Grotesque({
    subsets: ['latin'],
    variable: '--font-display',
    display: 'swap',
});

const body = Instrument_Sans({
    subsets: ['latin'],
    variable: '--font-body',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://subliminalsarcasmstudios.com'),
    title: {
        default: 'Subliminal Sarcasm Studios',
        template: '%s | Subliminal Sarcasm Studios',
    },
    description:
        'Independent game studio behind Void Runner, Syn City, The Donner Party... Game? and Geometry Defenders XR.',
    openGraph: {
        type: 'website',
        siteName: 'Subliminal Sarcasm Studios',
        images: [{ url: '/images/games/void-runner/01.jpg', width: 1280, height: 720, alt: 'Void Runner gameplay' }],
    },
};

export const viewport: Viewport = {
    themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${display.variable} ${body.variable}`}>
                <a href="#main" className="skip-link">Skip to content</a>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Navbar />
                    <div id="main" style={{ flexGrow: 1 }}>
                        {children}
                    </div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
