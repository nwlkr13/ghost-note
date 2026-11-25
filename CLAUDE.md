# Ghost Note — Project Memory

This file is read by future Claude sessions working on this project.
Owner: Neo (nwlkr13@gmail.com).

## Backup locations

When committing meaningful changes, mirror to all three:

1. **Local primary** — `C:\Users\nwlkr\Documents\Ghost Note\` (this folder)
2. **Google Drive** — folder name "Ghost Note" (Drive ID: `1Jm9awo-DnNRGBqPJWydHP5xXLkA_cUON`)
3. **GitHub** — repo `nwlkr13/ghost-note` (public; created Phase 1)

Push order: local → git commit → git push origin main → upload changed files to Drive folder.

## Phase status

### Phase 2 — components and illustrations

In place. The archive still renders the same 15 kits.

- `KitCard`, `FilterBar`, and `KitModal` are implemented in `src/components/`. `GhostNote.jsx` composes the card and the filter bar. The detail panel still opens inside the card, as it did in Phase 1.
- Each kit has an isometric SVG in `src/assets/illustrations/`, referenced by `illustration` in `src/data/kits.js`. The vinyl record remains the fallback when `illustration` is absent.
- Sample files are not part of this phase.

### Phase 1 (May 2026)

Scaffold complete. The visual archive rendered 15 kits with a vinyl-record card and one illustration (the Ludwig kit, then mislabeled Classic Maple). Component files existed as stubs; the markup lived in `GhostNote.jsx`. The catalog names and specs are corrected in `src/data/kits.js`, with sources in `docs/illustration-references.md`.

## Roadmap

- **Phase 3** — Playable kits. Drum-pad UI per card, Web Audio API or Tone.js, sample sets mapped from the character buckets in the sound roadmap below. Plus a play-along mode: the user loads a local audio file (MP3, WAV, and the like) and plays the kit over it. The file stays on the device and is never uploaded.
- **Phase 4** — Achievements and gamification (kits played, eras unlocked, streaks, play-along challenges). Stored in the browser with `localStorage`. No accounts. No tracking.
- **Later / exploratory** — A streaming-service partnership (Spotify or similar). Spotify's developer terms currently prohibit mixing or syncing Spotify audio with other audio, and the Web Playback SDK requires Premium. This is a business-development goal once the app has traction, not something to build against now.

## Sound roadmap (decided in Phase 1 planning, not yet built)

- **Scope:** Playable kit per card. Click a card → drum-pad UI triggers each piece.
- **Fidelity claim:** Curated character buckets, labeled honestly. NOT "this is the actual recording of this exact kit."
- **Sourcing:** Whatever offers best results — CC/public domain (Salamander Drumkit, Freesound), free commercial (MT Power Drum Kit Free, Steven Slate Free), original recordings if access allows.
- **Data:** `kits.js` carries a `soundProfile` string per kit referencing one of ~10 character buckets. Phase 2 maps each bucket to a sample set in `/src/assets/samples/<bucket-name>/`.
- **Tech:** Web Audio API directly, or Tone.js for triggering + envelope shaping. Avoid heavy frameworks.

Bucket list (currently in kits.js header):
`vintage-maple-warm`, `vintage-jazz-bronze`, `vintage-brass-snare`, `vintage-german-beech`, `vintage-japanese-rock`, `modern-maple-pro`, `modern-hybrid`, `metal-shell-snare`, `exotic-hardwood`, `cymbals-bell-bronze`.

The bucket list, fidelity claim, and sourcing notes above are unchanged. Wiring those buckets to sample files is Phase 3, together with the drum-pad and play-along work.

## Illustration rules

Drawings aim at the likeness of the historical instrument named in `kits.js`: piece count, sizes, lug shape and count, hoop type, badge shape and where it sits, strainer, finish, and the mounts of that model and era. Sources and the places the catalog and the factory record disagree are in `docs/illustration-references.md`.

Do not reproduce brand logos, wordmarks, script names, or badge text or artwork. Badge outlines and shapes only, with no lettering and no logo graphics. Do not trace or copy photographs. Draw original vectors informed by those sources. Generic hardware shapes, finishes, and sizes are fine.

## Design rules (enforced)

- Background `#0a0a0a`, accent `#c0392b` (blood red)
- `'Courier New', monospace`
- Vinyl-record card aesthetic
- Geometric, restrained, deliberate — explicitly avoid generic AI design tropes (no rounded-everything, no emoji, no glassmorphism for its own sake)

## Anti-patterns to keep out

- Don't introduce Tailwind unless requested.
- Don't switch component style from inline `style={}` objects without discussion (current project uses inline + a single `<style>` block for keyframes/hover).
- Don't add tracking, analytics, or telemetry.
- Don't claim sample-to-kit fidelity beyond "in the ballpark."
