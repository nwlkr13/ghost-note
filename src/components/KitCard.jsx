// Ghost Note — KitCard
// Phase 1 stub. Currently rendered inline inside GhostNote.jsx.
// Phase 2 will lift this into its own component with the signature below.
//
// Expected props:
//   kit          — kit object from src/data/kits.js
//   selected     — boolean, true when this card is expanded
//   onSelect     — () => void, fires when card is clicked to reveal
//   onClose      — () => void, fires when CLOSE button is clicked
//   index        — number, used for staggered fade-in animation delay
//
// The card displays either an illustration (when kit.illustration is set)
// or the default vinyl-record visual.

export default function KitCard({ kit, selected, onSelect, onClose, index }) {
  return null; // implemented inline in GhostNote.jsx for Phase 1
}
