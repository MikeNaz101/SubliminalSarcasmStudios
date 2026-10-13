# Subliminal Sarcasm Studios website

The studio site, built with Next.js (App Router).

```bash
npm install
npm run dev   # http://localhost:3005
npm run build
```

## Where things live

- `lib/games.ts` is the list of every game on the site. Featured games get the home page showcase, a row in "Our games" and their own page. Everything in `inDevelopment` only shows up in the collapsed "In lower stages of development" section at the bottom of the home page.
- `public/images/games/<slug>/` holds the screenshots. Void Runner and Syn City frames were captured from the live WebGL builds; Donner Party's come from the original repo images.
- `components/` has the shared pieces: the nav and footer, the showcase, the game page hero, the screenshot gallery and the logo with the eye that follows the cursor.

## Adding or replacing screenshots

1. Drop the image into `public/images/games/<slug>/` (JPEG, around 1600px wide is plenty).
2. Add it to that game's `shots` array in `lib/games.ts` with its real width, height and a short description for `alt`. The first shot is the key image used in the showcase and at the top of the game page.

Geometry Defenders XR is still using a placeholder title card (`awaitingScreens: true`). Once you have headset captures, add them to its `shots` and remove `awaitingScreens`.

## Promoting an early project

Move its entry from `inDevelopment` to `featuredGames` in `lib/games.ts`, give it an accent colour and at least one screenshot.
