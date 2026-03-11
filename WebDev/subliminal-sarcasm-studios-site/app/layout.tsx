import { Montserrat, Cinzel } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // <--- 1. Import the Footer

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-montserrat' });
const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-cinzel' });

export const metadata = {
    title: 'Subliminal Sarcasm Studios',
    description: 'Developing the Unseen.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`${montserrat.className} ${cinzel.variable}`}>
        {/* We wrap everything in a flex column so the footer is always pushed to the bottom */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />

            {/* The main page content loads here */}
            <div style={{ flexGrow: 1 }}>
                {children}
            </div>

            <Footer /> {/* <--- 2. Drop the Footer here */}
        </div>
        </body>
        </html>
    );
}