// Void Runner's leaderboards, read from the game's Supabase project (the same one the game's pilot accounts use).
// The publishable key only lets the page call public.voidrunner_leaderboard, which returns call signs and results.

const SUPABASE_URL = process.env.NEXT_PUBLIC_VOID_RUNNER_SUPABASE_URL ?? 'https://bmxsyigdhiiwsifpnvpg.supabase.co';
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_VOID_RUNNER_SUPABASE_KEY ?? 'sb_publishable_y9bh8xDkJvNXLNK8I2ukpg_g390z1HH';

export type BoardMode = 'endless' | 'data_mining' | 'story' | 'race';

// A pilot's best run (Endless Void, Streaming Data Mining, Story Mode).
export interface RunRow {
    rank: number;
    pilot: string;
    score: number;
    distance: number | null;
    waves: number | null;
    rings: number | null;       // Data Mining only
    grade: string | null;
    difficulty: number | null;  // 0 Easy, 1 Medium, 2 Insane
    layers: number | null;      // Story Mode only: layers cleared, 0-5
    at: string;
}

// A pilot's online race record.
export interface RaceRow {
    rank: number;
    pilot: string;
    wins: number;
    losses: number;
    ties: number;
    races: number;
    best_ms: number | null;     // fastest finish on the current course length
}

export type Board =
    | { mode: 'endless' | 'data_mining' | 'story'; rows: RunRow[] }
    | { mode: 'race'; rows: RaceRow[]; course_length: number | null };

export async function fetchBoard(mode: BoardMode, limit = 25, signal?: AbortSignal): Promise<Board> {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/voidrunner_leaderboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: PUBLISHABLE_KEY },
        body: JSON.stringify({ p_mode: mode, p_limit: limit }),
        signal,
    });
    if (!response.ok) throw new Error(`Leaderboard request failed (${response.status})`);
    const board = (await response.json()) as Board;
    if (!board || !Array.isArray(board.rows)) throw new Error('Unexpected leaderboard response');
    return board;
}

export const STORY_LAYERS = ['The Sanctum', 'The Archive', 'The Tribunal', 'The Fracture', 'The Core'];

const THREAT_LEVELS = ['Easy', 'Medium', 'Insane'];

export function threatLevel(difficulty: number | null): string | null {
    return difficulty === null || difficulty === undefined ? null : THREAT_LEVELS[difficulty] ?? null;
}

export function formatNumber(n: number | null | undefined): string {
    return typeof n === 'number' && Number.isFinite(n) ? Math.round(n).toLocaleString('en-US') : '0';
}

// 1:01.23, like the race HUD.
export function formatRaceTime(ms: number | null | undefined): string {
    if (typeof ms !== 'number' || !Number.isFinite(ms) || ms <= 0) return '--:--.--';
    const hundredths = Math.floor(ms / 10);
    const minutes = Math.floor(hundredths / 6000);
    const seconds = Math.floor(hundredths / 100) % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}.${String(hundredths % 100).padStart(2, '0')}`;
}
