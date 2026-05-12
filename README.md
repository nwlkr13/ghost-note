# Ghost Note

> The Drum Kit Archive — a global catalog of legendary drum kits.

## Phase 1

A vinyl-aesthetic gallery of 15 historically significant drum kits and snares, from the Leedy Broadway (1928) to the Mapex Armory (2014).

- Dark monochrome palette (`#0a0a0a` background, `#c0392b` blood-red accent)
- Monospace typography
- Vinyl record card visual; first kit (Ludwig Classic Maple, 1965) carries an isometric SVG illustration

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
├── src/
│   ├── main.jsx                        # React mount
│   ├── GhostNote.jsx                   # Main archive view
│   ├── components/
│   │   ├── KitCard.jsx                 # Phase 2 stub
│   │   ├── FilterBar.jsx               # Phase 2 stub
│   │   └── KitModal.jsx                # Phase 2 stub
│   ├── data/
│   │   └── kits.js                     # Kit catalog (extracted from monolith)
│   └── assets/
│       └── illustrations/
│           └── ludwig-classic-maple.svg
```

## Roadmap

- **Phase 2** — Lift the inline KitCard / FilterBar / KitModal markup into the component stubs. Add SVG illustrations for the remaining 14 kits.
- **Phase 3** — Audio samples per kit. Provenance history. User submissions.

## Design rules

- No generic AI design patterns
- No emoji
- No rounded everything
- Geometric, restrained, deliberate
