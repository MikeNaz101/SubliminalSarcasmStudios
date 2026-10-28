# Subliminal Sarcasm Studios website

The studio site, built with Next.js (App Router).

```bash
npm install
npm run dev   # http://localhost:3005
npm run build
```

## Where things live

- `lib/games.ts` is the list of every game on the site. Featured games get the home page showcase, a row in "Our games" and their own page. Everything in `inDevelopment` only shows up in the collapsed "In lower stages of development" section at the bottom of the home page.
- `public/images/games/<slug>/` holds the screenshots. Void Runner's are 1920×1080 captures from the current build (October 2026); Syn City's were captured from its live WebGL build; Donner Party's come from the original repo images.
- `components/` has the shared pieces: the nav and footer, the showcase, the game page hero, the screenshot gallery and the logo with the eye that follows the cursor.
- Brand assets come from the October 2026 logo pack:
  - `app/favicon.ico` (16/32/48), `app/icon.png` (32×32) and `app/apple-icon.png` (180×180). Next.js adds the `<link>` tags for these automatically.
  - `public/images/brand/`: the stacked logo with the studio name, on a transparent background for the header (`logo-header.png`) and on black for the studio band, About page and footer (`logo-stacked.png`); the master `sss-icon.svg`; and the eye cut-outs used by `components/LogoEye.tsx`. If the logo art changes, re-measure the eye position in `LogoEye.tsx`.
  - The header shows the logo large at the top of the page and shrinks it once you scroll. Sizes live at the top of `components/Navbar.css`.
  - Colors in `app/globals.css` match the pack: purple `#6A0DAD`, green `#24AE24`, gold `#DDAB36` (plus the full gold gradient).

## Void Runner leaderboard

`components/Leaderboard.tsx` shows one tab per play mode: Endless Void, Data Mining, Story and Online Race. Each tab loads the first time it's opened.

- The data comes from the game's Supabase project (pilot accounts), through the read-only function `public.voidrunner_leaderboard`. `lib/voidRunnerLeaderboard.ts` holds the project URL and publishable key; set `NEXT_PUBLIC_VOID_RUNNER_SUPABASE_URL` / `NEXT_PUBLIC_VOID_RUNNER_SUPABASE_KEY` to override them.
- Only signed-in pilots appear. Each pilot is listed once per board, with their best result.
- Ranking: Endless Void and Data Mining by best score, Story by layers cleared and then score, Online Race by wins and then fastest finish.
- The function is defined in the game repo, `Vector Void/Supabase/void_runner_leaderboards.sql`.

## Adding or replacing screenshots

1. Drop the image into `public/images/games/<slug>/` (JPEG, around 1600px wide is plenty).
2. Add it to that game's `shots` array in `lib/games.ts` with its real width, height and a short description for `alt`. The first shot is the key image used in the showcase and at the top of the game page.

Geometry Defenders XR is still using a placeholder title card (`awaitingScreens: true`). Once you have headset captures, add them to its `shots` and remove `awaitingScreens`.

## Promoting an early project

Move its entry from `inDevelopment` to `featuredGames` in `lib/games.ts`, give it an accent colour and at least one screenshot.
