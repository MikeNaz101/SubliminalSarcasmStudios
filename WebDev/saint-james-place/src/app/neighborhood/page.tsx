import Navbar from '@/components/Navbar';
import Landmarks from '@/components/Landmarks';

export default function NeighborhoodPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <div className="bg-slate-900 h-20"><Navbar /></div>
            <div className="container mx-auto px-6 py-20">
                <header className="text-center mb-20">
                    <h1 className="text-5xl font-serif font-bold text-slate-900 mb-4 italic">The Neighborhood</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto font-medium">
                        Perfectly situated in Queensbury, NY. Discover the local conveniences and legendary Adirondack attractions just minutes from Saint James Place.
                    </p>
                </header>
                <Landmarks />
            </div>
        </main>
    );
}