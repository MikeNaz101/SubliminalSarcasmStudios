// Private preview of Pin Ballin. The page lives at /preview/<key> and is deliberately hidden:
// no nav or footer link, not in the sitemap, and served with noindex (see next.config.ts).
//
// This repo is public, so neither the secret part of the link nor the build's location is written
// here. Both come from environment variables set on the host (not committed):
//
//   PIN_BALLIN_PREVIEW_KEY  the secret last part of the link, e.g. pin-ballin-x7k2m9qa4z
//                           -> https://subliminalsarcasmstudios.com/preview/pin-ballin-x7k2m9qa4z
//   PIN_BALLIN_BUILD_URL    the index.html of the WebGL build on S3 (or CloudFront)
//
// Without PIN_BALLIN_PREVIEW_KEY every /preview/... address is a plain 404.
// To change who can get in, change the key and redeploy: the old link stops working.

export function previewKey(): string | undefined {
    const key = process.env.PIN_BALLIN_PREVIEW_KEY?.trim();
    return key ? key : undefined;
}

export function buildUrl(): string | undefined {
    const url = process.env.PIN_BALLIN_BUILD_URL?.trim();
    return url ? url : undefined;
}
