# Ghost Note — Project Memory

This file is read by future Claude sessions working on this project.
Owner: Neo (nwlkr13@gmail.com).

## Backup locations

When committing meaningful changes, mirror to all three:

1. **Local primary** — `C:\Users\nwlkr\Documents\Ghost Note\` (this folder)
2. **Google Drive** — folder name "Ghost Note" (Drive ID: `1Jm9awo-DnNRGBqPJWydHP5xXLkA_cUON`)
3. **GitHub** — repo `nwlkr13/ghost-note` (public; created Phase 1)

Push order: local → git commit → git push origin main → upload changed files to Drive folder.

## Phase 1 status (May 2026)

Scaffold complete. The visual archive renders 15 kits with:
- Vinyl record card visual (default)
- Isometric SVG illustration override (currently only Ludwig Classic Maple, kit #1)

Component stubs exist for `KitCard`, `FilterBar`, `KitModal` — markup still inlined in `GhostNote.jsx`. Phase 2 will lift them out.

## Sound roadmap (decided in Phase 1 planning, not yet built)

- **Scope:** Playable kit per card. Click a card → drum-pad UI triggers each piece.
- **Fidelity claim:** Curated character buckets, labeled honestly. NOT "this is the actual recording of this exact kit."
- **Sourcing:** Whatever offers best results — CC/public domain (Salamander Drumkit, Freesound), free commercial (MT Power Drum Kit Free, Steven Slate Free), original recordings if access allows.
- **Data:** `kits.js` carries a `soundProfile` string per kit referencing one of ~10 character buckets. Phase 2 maps each bucket to a sample set in `/src/assets/samples/<bucket-name>/`.
- **Tech:** Web Audio API directly, or Tone.js for triggering + envelope shaping. Avoid heavy frameworks.

Bucket list (currently in kits.js header):
`vintage-maple-warm`, `vintage-jazz-bronze`, `vintage-brass-snare`, `vintage-german-beech`, `vintage-japanese-rock`, `modern-maple-pro`, `modern-hybrid`, `metal-shell-snare`, `exotic-hardwood`, `cymbals-bell-bronze`.

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
