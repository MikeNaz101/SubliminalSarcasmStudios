import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UnitGrid from "@/components/UnitGrid";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans scroll-smooth">
            <Navbar />
            <Hero />
            <UnitGrid />
        </div>
    );
}