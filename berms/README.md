# BERMS Field Tour PWA

This folder is a complete offline-capable Progressive Web App made from the 18-page phone PDF.

## What it does
- Portrait, full-screen slide viewer
- Tap left/right or swipe to change page
- Pinch to zoom, drag to pan, double-tap to zoom/reset
- Installs to the phone home screen where supported
- Caches all 18 slides for offline use after the first successful load

## Important: how to test it
A PWA service worker will not work if you simply double-click `index.html` as a `file://` URL.
It must be served over `https://` (normal hosting) or `http://localhost` (local testing).

### Local test on a computer
From this folder:

    python3 -m http.server 8000

Then open:

    http://localhost:8000

### Publish with GitHub Pages
1. Create a new GitHub repository, e.g. `st-denis-tour-2026`.
2. Put the contents of this folder in the repository root and push.
3. In GitHub: Settings -> Pages.
4. Under "Build and deployment", choose "Deploy from a branch".
5. Select the `main` branch and `/ (root)`, then Save.
6. GitHub will give you an HTTPS URL. Open that URL on the phone once while online.
7. Android/Chrome: use "Install app" or "Add to Home screen". iPhone/Safari: Share -> Add to Home Screen.
8. After the first complete load, test in airplane mode.

## Updating the tour
Replace the files in `slides/` with new PNGs using the same names (`page-01.png`, etc.).
If the slide count changes, update `slideCount` in `app.js` and the asset list in `service-worker.js`.
Also change the cache name (for example `st-denis-tour-v2`) so existing phones fetch the new version.
