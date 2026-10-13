// Single source of truth for every game the site lists.
// Featured games get the hero, the showcase rows and a full page.
// Everything in `inDevelopment` only appears in the quiet section at the bottom of the home page.

export type Shot = {
    src: string;
    alt: string;
    width: number;
    height: number;
};

export type FeaturedGame = {
    slug: string;
    title: string;
    href: string;
    tagline: string;
    summary: string;
    genre: string;
    platform: string;
    status: string;
    /** Per-game accent. The site shifts to it when the game is selected, like a chameleon. */
    accent: string;
    /** Text colour that reads on top of `accent`. */
    onAccent: string;
    play?: { label: string; href: string; external?: boolean };
    shots: Shot[];
    /** True while a game has no real captures yet; the card art is a placeholder title card. */
    awaitingScreens?: boolean;
};

export type DevGame = {
    title: string;
    summary: string;
    stage: string;
    href?: string;
};

export const featuredGames: FeaturedGame[] = [
    {
        slug: 'void-runner',
        title: 'Void Runner',
        href: '/void-runner',
        tagline: 'An endless flight through a hostile network.',
        summary:
            'A high-speed 3D arcade shooter. Blast through data-cube walls, thread neon firewalls and survive an AI that studies how you fly and adapts to beat you.',
        genre: 'Arcade flight shooter',
        platform: 'Browser (PC)',
        status: 'Playable demo',
        accent: '#FF8C1A',
        onAccent: '#1A0A00',
        play: { label: 'Play in browser', href: '/void-runner#play' },
        shots: [
            { src: '/images/games/void-runner/01.jpg', alt: 'Ship flying into a burst of orange data cubes between magenta firewall beams', width: 1280, height: 720 },
            { src: '/images/games/void-runner/02.jpg', alt: 'Ship approaching crossed magenta laser beams in a dark tunnel', width: 1280, height: 720 },
            { src: '/images/games/void-runner/03.jpg', alt: 'Ship firing through a grid of firewall beams and floating cubes', width: 1280, height: 720 },
            { src: '/images/games/void-runner/04.jpg', alt: 'An enemy drone exploding in front of the ship', width: 1280, height: 720 },
        ],
    },
    {
        slug: 'syn-city',
        title: 'Syn City',
        href: '/syn-city',
        tagline: 'Fix the code, save the city.',
        summary:
            'A first-person puzzler where the city runs on broken C#. Hunt down syntax errors and flipped booleans with your debugger and rewrite the scripts that hold reality together.',
        genre: 'Educational puzzler',
        platform: 'Browser (PC)',
        status: 'Early access',
        accent: '#FF2D6F',
        onAccent: '#1A0009',
        play: { label: 'Play in browser', href: '/syn-city#play' },
        shots: [
            { src: '/images/games/syn-city/01.jpg', alt: 'First-person view holding the debugger tool, with a debugging task listing a syntax error and a boolean flip', width: 1280, height: 720 },
            { src: '/images/games/syn-city/02.jpg', alt: 'Syn City title screen', width: 1280, height: 720 },
            { src: '/images/games/syn-city/03.jpg', alt: 'A corridor with a floating MonoBehaviour code token to repair', width: 1280, height: 720 },
        ],
    },
    {
        slug: 'donner-party',
        title: 'The Donner Party... Game?',
        href: '/donner-party',
        tagline: 'Survival. Betrayal. The trail, reimagined.',
        summary:
            'A party game for the whole room. The host screen tracks the caravan west while everyone votes, trades and rations from their phone. Hunger, thirst and sanity do the rest.',
        genre: 'Multiplayer survival',
        platform: 'Web and mobile browser',
        status: 'Alpha',
        accent: '#EBD7B0',
        onAccent: '#2B1A0F',
        play: { label: 'Start a journey', href: 'https://play.subliminalsarcasmstudios.com', external: true },
        shots: [
            { src: '/images/games/donner-party/01.jpg', alt: 'Host screen: pixel-art map of the trail, caravan status report and a player voting on how to escape raiders', width: 1920, height: 957 },
            { src: '/images/games/donner-party/02.jpg', alt: 'Phone controller showing the item trade screen and the outcome of a failed fire trap', width: 900, height: 1326 },
        ],
    },
    {
        slug: 'geometry-defenders',
        title: 'Geometry Defenders XR',
        href: '/geometry-defenders',
        tagline: 'Tower defense, inside your headset.',
        summary:
            'An immersive tower defense game designed from the ground up for modern VR and XR headsets.',
        genre: 'VR tower defense',
        platform: 'VR and XR headsets',
        status: 'Alpha',
        accent: '#2FE6F0',
        onAccent: '#001A1C',
        awaitingScreens: true,
        shots: [
            { src: '/images/games/geometry-defenders/key-art.svg', alt: 'Geometry Defenders XR title card', width: 1600, height: 900 },
        ],
    },
];

export const inDevelopment: DevGame[] = [
    {
        title: 'Project Aegis',
        summary: 'FPS meets tower defense. Build towers anywhere, shoot the swarm and keep the core alive.',
        stage: 'Web alpha',
        href: '/fptd-bugs',
    },
    {
        title: 'Dimensional Stealth',
        summary: 'First-person stealth where you shift between a hunting ground and a nightmare reflection of it.',
        stage: 'Prototype',
        href: '/dimensional-stealth',
    },
    {
        title: 'Ishana: The Godling',
        summary: 'A young god whose powers grow with their following, in a world that remembers how you used them.',
        stage: 'Concept',
    },
];

export function getFeaturedGame(slug: string): FeaturedGame {
    const game = featuredGames.find((g) => g.slug === slug);
    if (!game) throw new Error(`Unknown game: ${slug}`);
    return game;
}
