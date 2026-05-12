// Ghost Note — kit catalog
// Extracted from GhostNote.jsx in Phase 1 scaffold.
//
// Optional fields:
//   illustration  — URL/import of an isometric SVG (Phase 1 has Ludwig only)
//   soundProfile  — character bucket for Phase 2 sample mapping. Buckets are deliberately
//                   honest: they describe sonic *character*, not "this is the actual
//                   recording of this exact kit." Curated buckets so far:
//                     "vintage-maple-warm"   — fundamental, woody, calfskin era
//                     "vintage-jazz-bronze"  — open, sizzly, calfskin
//                     "vintage-brass-snare"  — bright crack, nickel-era snares
//                     "vintage-german-beech" — dense, controlled, studio-precision
//                     "vintage-japanese-rock"— focused birch attack, tight decay
//                     "modern-maple-pro"     — wide tuning range, controlled
//                     "modern-hybrid"        — maple/walnut blend, balanced
//                     "metal-shell-snare"    — steel/brass piccolo bite
//                     "exotic-hardwood"      — dense, percussive crack (jarrah etc.)
//                     "cymbals-bell-bronze"  — traditional Turkish/Zildjian alloy

import ludwigClassicMaple from "../assets/illustrations/ludwig-classic-maple.svg";

export const kits = [
  {
    id: 1,
    make: "Ludwig",
    model: "Classic Maple",
    year: 1965,
    builder: "Ludwig Drum Company",
    origin: "USA",
    era: "1960s",
    materials: ["Maple shells", "Chrome hardware", "Calfskin heads"],
    specs: { sizes: "14×22 BD, 8×12, 9×13, 16×16", finish: "Oyster Black Pearl", lugs: "Imperial" },
    funFact:
      "Ringo Starr played a Ludwig Super Classic on The Ed Sullivan Show in 1964, making this line the most iconic in rock history.",
    tags: ["vintage", "rock", "classic"],
    color: "#c0392b",
    illustration: ludwigClassicMaple,
    soundProfile: "vintage-maple-warm",
  },
  {
    id: 2,
    make: "Gretsch",
    model: "Round Badge",
    year: 1957,
    builder: "Gretsch Company",
    origin: "USA",
    era: "1950s",
    materials: ["Sycamore/Poplar shells", "Nickel hardware", "Calfskin heads"],
    specs: { sizes: "14×20 BD, 8×12, 14×14", finish: "Copper Mist", lugs: "Lightning" },
    funFact:
      "The 'Round Badge' era (1950s–60s) is considered Gretsch's golden age. Buddy Rich and Charlie Watts both played these sets.",
    tags: ["vintage", "jazz", "collector"],
    color: "#d4a017",
    soundProfile: "vintage-jazz-bronze",
  },
  {
    id: 3,
    make: "Pearl",
    model: "Free-Floating Piccolo",
    year: 1982,
    builder: "Pearl Musical Instrument Company",
    origin: "Japan",
    era: "1980s",
    materials: ["Steel shell", "Chrome hardware", "Coated heads"],
    specs: { sizes: "3×14 snare", finish: "Mirror Chrome", lugs: "Free-Floating" },
    funFact:
      "Pearl's Free-Floating system isolated the shell from the hardware, revolutionizing snare tuning and tone consistency.",
    tags: ["snare", "modern", "studio"],
    color: "#2980b9",
    soundProfile: "metal-shell-snare",
  },
  {
    id: 4,
    make: "DW",
    model: "Collector's Series Maple",
    year: 1991,
    builder: "Drum Workshop",
    origin: "USA",
    era: "1990s",
    materials: ["North American Maple", "Chrome/Black hardware", "Remo heads"],
    specs: { sizes: "18×22 BD, 10×12, 12×14, 16×16", finish: "Black Galaxy", lugs: "True Pitch" },
    funFact:
      "DW introduced True Pitch tension rods in the 90s — a half-turn of any rod changes pitch the same amount. Used by Neil Peart on his later tours.",
    tags: ["modern", "rock", "professional"],
    color: "#1a1a2e",
    soundProfile: "modern-maple-pro",
  },
  {
    id: 5,
    make: "Sonor",
    model: "Phonic",
    year: 1978,
    builder: "Sonor GmbH",
    origin: "Germany",
    era: "1970s",
    materials: ["Beech shells", "Chrome hardware", "Ambassador heads"],
    specs: { sizes: "14×22 BD, 8×12, 9×13, 14×14, 16×16", finish: "Red Satin", lugs: "Sonor Square" },
    funFact:
      "German engineering at its peak — the Phonic series featured precision-machined bearing edges and became a studio standard across Europe.",
    tags: ["vintage", "studio", "european"],
    color: "#8e1a1a",
    soundProfile: "vintage-german-beech",
  },
  {
    id: 6,
    make: "Tama",
    model: "Superstar",
    year: 1976,
    builder: "Hoshino Gakki / Tama",
    origin: "Japan",
    era: "1970s",
    materials: ["Fiberglass/Maple hybrid", "Chrome hardware", "Remo heads"],
    specs: { sizes: "14×22 BD, 10×13, 11×14, 16×16", finish: "Cherry Sunburst", lugs: "Star-Cast" },
    funFact:
      "Simon Phillips and Stewart Copeland both played Tama in the late 70s. The Superstar line put Japanese drums on the world stage.",
    tags: ["vintage", "rock", "japanese"],
    color: "#6c3483",
    soundProfile: "vintage-japanese-rock",
  },
  {
    id: 7,
    make: "Zildjian",
    model: "A Series Cymbal Set",
    year: 1623,
    builder: "Avedis Zildjian Company",
    origin: "Turkey / USA",
    era: "Pre-1900s",
    materials: ["Bell bronze (80% copper, 20% tin)", "Secret alloy"],
    specs: { sizes: '14" hi-hats, 17" crash, 20" ride', finish: "Traditional" },
    funFact:
      "Zildjian is the oldest instrument manufacturer in the world. The secret alloy formula has been passed down for 400 years — only the family knows it.",
    tags: ["cymbals", "historic", "legendary"],
    color: "#b7950b",
    soundProfile: "cymbals-bell-bronze",
  },
  {
    id: 8,
    make: "Yamaha",
    model: "Recording Custom",
    year: 1975,
    builder: "Yamaha Corporation",
    origin: "Japan",
    era: "1970s",
    materials: ["Birch shells", "Chrome hardware", "Remo heads"],
    specs: { sizes: "14×22 BD, 8×10, 9×12, 10×13, 14×14, 14×16", finish: "Natural Wood", lugs: "Mini-Timbale" },
    funFact:
      "Steve Gadd recorded 'Aja' by Steely Dan and '50 Ways to Leave Your Lover' on Yamaha Recording Customs. Arguably the most recorded kit in history.",
    tags: ["studio", "jazz", "legendary"],
    color: "#1e8449",
    soundProfile: "vintage-japanese-rock",
  },
  {
    id: 9,
    make: "Mapex",
    model: "Armory Series",
    year: 2014,
    builder: "Mapex Drums",
    origin: "Taiwan/USA",
    era: "2010s",
    materials: ["Maple/Walnut hybrid", "Chrome hardware", "Remo heads"],
    specs: { sizes: "18×22 BD, 10×10, 12×14, 14×16", finish: "Rainforest Burst", lugs: "SONIClear" },
    funFact:
      "Mapex pioneered the SONIClear bearing edge — a hybrid cut that blends attack and sustain, designed by acoustic engineers rather than craftsmen.",
    tags: ["modern", "hybrid", "value"],
    color: "#2e4057",
    soundProfile: "modern-hybrid",
  },
  {
    id: 10,
    make: "Noble & Cooley",
    model: "Horizon",
    year: 2003,
    builder: "Noble & Cooley Drum Co.",
    origin: "USA",
    era: "2000s",
    materials: ["Steam-bent solid maple", "Brass hardware", "Custom heads"],
    specs: { sizes: "16×22 BD, 7×10, 8×12, 14×14", finish: "Walnut Gloss", lugs: "N&C Custom" },
    funFact:
      "One of the oldest drum makers in America (est. 1854). Civil War toy drums evolved into the boutique kits used by Questlove and others.",
    tags: ["boutique", "american", "historic"],
    color: "#4a235a",
    soundProfile: "modern-maple-pro",
  },
  {
    id: 11,
    make: "Brady",
    model: "Jarrah Ply",
    year: 1989,
    builder: "Brady Drums",
    origin: "Australia",
    era: "1980s",
    materials: ["Western Australian Jarrah wood", "Brass hardware"],
    specs: { sizes: "6.5×14 snare", finish: "Natural Jarrah", lugs: "Brady Tube" },
    funFact:
      "Brady uses Jarrah — a dense, heavy Australian hardwood with a crack like a gunshot. No other manufacturer uses it at scale.",
    tags: ["boutique", "australian", "snare"],
    color: "#922b21",
    soundProfile: "exotic-hardwood",
  },
  {
    id: 12,
    make: "Craviotto",
    model: "Solid Maple",
    year: 1996,
    builder: "Johnny Craviotto",
    origin: "USA",
    era: "1990s",
    materials: ["Solid stave maple (not ply)", "Brass hardware", "Vintage heads"],
    specs: { sizes: "5.5×14, 6×14, 7×14 snares", finish: "Natural Satin" },
    funFact:
      "Johnny Craviotto builds drums from single-ply solid stave wood — no laminate. Each drum is essentially carved. Waiting list can exceed two years.",
    tags: ["boutique", "artisan", "collector"],
    color: "#1a5276",
    soundProfile: "vintage-maple-warm",
  },
  {
    id: 13,
    make: "Rogers",
    model: "Dynasonic",
    year: 1958,
    builder: "Rogers Drums",
    origin: "USA",
    era: "1950s",
    materials: ["Brass shell", "Chrome hardware", "Calfskin head"],
    specs: { sizes: "5×14 snare", finish: "Chrome over Brass", lugs: "Swivo-Matic" },
    funFact:
      "The Dynasonic's internal strainer mechanism is unlike anything else — it tensions from inside the shell, producing a snare response players still chase today.",
    tags: ["vintage", "snare", "collector"],
    color: "#797d7f",
    soundProfile: "vintage-brass-snare",
  },
  {
    id: 14,
    make: "Leedy",
    model: "Broadway",
    year: 1928,
    builder: "Leedy Manufacturing Company",
    origin: "USA",
    era: "Pre-1940s",
    materials: ["Brass/Steel", "Nickel hardware", "Calfskin heads"],
    specs: { sizes: "5×14 snare", finish: "Nickel-plate over Brass" },
    funFact:
      "Leedy was the dominant drum brand before Ludwig. Gene Krupa's early recordings featured Leedy kits. The company was eventually absorbed by Slingerland.",
    tags: ["antique", "historic", "jazz"],
    color: "#6e2f1a",
    soundProfile: "vintage-brass-snare",
  },
  {
    id: 15,
    make: "Slingerland",
    model: "Radio King",
    year: 1936,
    builder: "Slingerland Drum Co.",
    origin: "USA",
    era: "Pre-1940s",
    materials: ["Solid maple shell", "Nickel hardware", "Calfskin head"],
    specs: { sizes: "5×14 snare", finish: "Chrome over Brass" },
    funFact:
      "Gene Krupa helped design the Radio King snare. The solid maple shell (not ply) gives it a warmth still unmatched. One of the most copied snare drums ever made.",
    tags: ["antique", "jazz", "legendary"],
    color: "#1c2833",
    soundProfile: "vintage-maple-warm",
  },
];

export const eras = ["All", "Pre-1940s", "1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s"];
export const origins = ["All", "USA", "Japan", "Germany", "Australia", "Taiwan/USA", "Turkey / USA"];
