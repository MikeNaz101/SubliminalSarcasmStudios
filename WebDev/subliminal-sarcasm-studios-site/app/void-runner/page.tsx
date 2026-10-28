import type { Metadata } from 'next';
import VoidRunnerClient from './VoidRunnerClient';

export const metadata: Metadata = {
    title: 'Void Runner',
    description: 'A high-speed 3D arcade flight shooter you can play in your browser.',
    openGraph: { images: ['/images/games/void-runner/wave-1.jpg'] },
};

export default function VoidRunnerPage() {
    return <VoidRunnerClient />;
}
