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
  - Click effect: when a visitor clicks a link or button, the header chameleon opens its mouth and its tongue flicks to the spot they clicked; the click goes through when the tongue lands (about 0.16 s). `components/ChameleonTongue.tsx` handles the clicks and `LogoEye.tsx` holds the jaw shape. Keyboard presses, Ctrl/Cmd-clicks, clicks inside dialogs and visitors who prefer reduced motion skip it. Add `data-no-tongue` to any element that should never wait.
  - Colors in `app/globals.css` match the pack: purple `#6A0DAD`, green `#24AE24`, gold `#DDAB36` (plus the full gold gradient).

## Void Runner leaderboard

`components/Leaderboard.tsx` shows the same boards as the in-game LEADERBOARDS screen: Endless Void, Data Mining, Story, Online Race, Pilot Rank and Records. Each board loads the first time it's shown, then stays.

- **Threat level:** Endless Void, Data Mining, Story and Records can be narrowed to Easy, Medium or Insane.
- **Records:** twelve single-stat boards (no-fire stretch, untouchable, top speed, accuracy, longest run and so on), picked from a list. Their names, units and descriptions live in `STATS` in `lib/voidRunnerLeaderboard.ts`; keep them in step with `Stats` in the game's `LeaderboardScreen.cs` if a record is added.
- **Data:** the game's Supabase project (pilot accounts), through the read-only function `public.voidrunner_board`, the same one the game uses. Each board shows its top 25. `lib/voidRunnerLeaderboard.ts` holds the project URL and publishable key; set `NEXT_PUBLIC_VOID_RUNNER_SUPABASE_URL` / `NEXT_PUBLIC_VOID_RUNNER_SUPABASE_KEY` to override them.
- Only signed-in pilots appear. Each pilot is listed once per board, with their best result. The server refuses offensive call signs, so names are shown as they come.
- **Ranking:** Endless Void and Data Mining by best score, Story by layers cleared and then score, Online Race by wins and then fastest finish, Pilot Rank by total XP, Records by the stat.
- The function is defined in the game repo, in `Vector Void/Supabase/void_runner_run_stats.sql`.

## Void Runner playtest

`/void-runner/playtest` is the page to send playtesters to. It walks them through installing TestFlight, accepting the invite and taking the survey. The Void Runner page links to it from the hero, the "Fly it on your iPhone" band and the links under the leaderboard.

- The links live in `lib/voidRunnerPlaytest.ts`. Paste the TestFlight public link into `TESTFLIGHT_URL` (App Store Connect > TestFlight > your external group > Public Link). While it is empty, the page says the invite is coming soon.
- `PLAYTEST_SURVEY_URL` is the responder link for the "Void Runner Playtest Questionnaire" Google Form. The survey that pops up when someone quits the browser build uses the same link.
- The form's questions and skip logic are built by an Apps Script attached to the form (in the form editor: More > Apps Script, then run `rebuildSurvey`). Edit the `SURVEY` list there and run it again to change the questions. Each game mode has a yes/no question that skips its section, and the controls questions match the input the tester used. Running it replaces every question, so do it between playtests.

## Adding or replacing screenshots

1. Drop the image into `public/images/games/<slug>/` (JPEG, around 1600px wide is plenty). Give it a new file name rather than overwriting an old one: resized images are cached for up to 4 hours, so a reused name can keep showing the old picture.
2. Add it to that game's `shots` array in `lib/games.ts` with its real width, height and a short description for `alt`. The first shot is the key image used in the showcase and at the top of the game page.

Geometry Defenders XR is still using a placeholder title card (`awaitingScreens: true`). Once you have headset captures, add them to its `shots` and remove `awaitingScreens`.

## Promoting an early project

Move its entry from `inDevelopment` to `featuredGames` in `lib/games.ts`, give it an accent colour and at least one screenshot.
