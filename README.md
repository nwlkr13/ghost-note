# Ghost Note

> The Drum Kit Archive — a global catalog of legendary drum kits.

## Status

Phase 2. Fifteen kits, from the Leedy Broadway Standard (1930) to the Mapex Armory (2014). Each card shows a still of a parametric 3D model. Opening a kit mounts one orbit viewer. The isometric SVG remains when WebGL is unavailable. Filters and the inline detail panel behave as they did in Phase 1.

- Dark monochrome palette (`#0a0a0a` background, `#c0392b` blood-red accent)
- Monospace typography (`Courier New`)
- Vinyl record card as the fallback visual; every current kit overrides it with an isometric SVG

Phase 1 (May 2026) was the scaffold: the gallery, the kit catalog, and one illustration (the Ludwig kit). Card, filter, and detail markup lived inline in `GhostNote.jsx`.

## Stack

- React 18
- Vite

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Project structure

```
ghost-note/
├── index.html                          # Vite entry
├── App.jsx                             # Root component
├── package.json
├── vite.config.js
├── docs/
│   ├── illustration-references.md      # Sources for each kit drawing
│   └── 3d-models.md                    # How the 3D kits are built, and their licenses
├── src/
│   ├── main.jsx                        # React mount
│   ├── GhostNote.jsx                   # Archive view: header, grid, footer
│   ├── ShotPage.jsx                    # Full-frame viewer for stills (?shot=)
│   ├── components/
│   │   ├── KitCard.jsx                 # Card visual and meta
│   │   ├── KitViewer.jsx               # One orbit viewer, lazy-loaded
│   │   ├── FilterBar.jsx               # Era, origin, and search
│   │   └── KitModal.jsx                # Inline kit detail panel
│   ├── data/
│   │   ├── kits.js                     # Kit catalog
│   │   ├── builds.js                   # Piece sizes and hardware for the 3D generator
│   │   └── previews.js                 # Still images for the gallery cards
│   ├── three/
│   │   ├── kitFactory.js               # Parametric shells, lugs, hoops, hardware
│   │   ├── materials.js                # Procedural PBR finishes
│   │   └── webgl.js                    # WebGL availability check
│   └── assets/
│       └── illustrations/              # One isometric SVG per kit
│           ├── ludwig-classic-maple.svg
│           ├── gretsch-round-badge.svg
│           ├── pearl-free-floating-piccolo.svg
│           ├── dw-collectors-maple.svg
│           ├── sonor-phonic.svg
│           ├── tama-superstar.svg
│           ├── zildjian-a-series.svg
│           ├── yamaha-recording-custom.svg
│           ├── mapex-armory.svg
│           ├── noble-cooley-horizon.svg
│           ├── brady-jarrah-ply.svg
│           ├── craviotto-solid-maple.svg
│           ├── rogers-dynasonic.svg
│           ├── leedy-broadway.svg
│           └── slingerland-radio-king.svg
```

## Roadmap

- **Phase 2** — Done. Lift KitCard, FilterBar, and KitModal out of `GhostNote.jsx`. Isometric SVG illustrations for all 15 kits, kept as the WebGL fallback. Opening a kit shows a rotatable three.js model driven by `src/data/builds.js`.
- **Phase 3** — Playable kits. A drum-pad UI on each card, triggered with the Web Audio API or Tone.js. Sample sets come from the character buckets in the sound roadmap. Plus a play-along mode: the user loads a local audio file (MP3, WAV, and the like) and plays the kit over it. The file stays on the device and is never uploaded.
- **Phase 4** — Achievements and gamification: kits played, eras unlocked, streaks, play-along challenges. Stored in the browser with `localStorage`. No accounts. No tracking.
- **Later / exploratory** — A streaming-service partnership (Spotify or similar). Spotify's developer terms currently prohibit mixing or syncing Spotify audio with other audio, and the Web Playback SDK requires Premium. This is a business-development goal once the app has traction, not something to build against now.

## Design rules

- No generic AI design patterns
- No emoji
- No rounded everything
- Geometric, restrained, deliberate
