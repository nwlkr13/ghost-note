// Ghost Note — kit catalog
// Extracted from GhostNote.jsx in Phase 1 scaffold.
//
// Optional fields:
//   illustration  — import of an isometric SVG in src/assets/illustrations/.
//                   Every kit in this catalog has one. The card shows a rendered
//                   still of the 3D model when one exists, and this SVG when WebGL
//                   is unavailable or the still is missing. Vinyl is the last resort.
//                   Badge shapes only: no logos or lettering.
//                   Sources: docs/illustration-references.md
//   build         — parametric 3D spec from src/data/builds.js. The generator in
//                   src/three/kitFactory.js reads piece count, diameters, depths,
//                   shell, finish, lugs, hoops, and hardware from this object.
//   references    — short note plus the sources section for that drawing.
//   soundProfile  — character bucket for sample mapping (see the sound roadmap).
//                   Buckets are deliberately honest: they describe sonic *character*,
//                   not "this is the actual recording of this exact kit." Curated buckets so far:
//                     "vintage-maple-warm"   — fundamental, woody, calfskin era
//                     "vintage-jazz-bronze"  — open, sizzly, calfskin
//                     "vintage-brass-snare"  — bright crack, nickel-era snares
//                     "vintage-german-beech" — dense, controlled, studio-precision
//                     "vintage-japanese-rock"— focused birch attack, tight decay
//                     "modern-maple-pro"     — wide tuning range, controlled
//                     "modern-hybrid"        — mixed-species modern shells
//                     "metal-shell-snare"    — steel/brass piccolo bite
//                     "exotic-hardwood"      — dense, percussive crack (jarrah etc.)
//                     "cymbals-bell-bronze"  — traditional Turkish/Zildjian alloy

import ludwigClassicMaple from "../assets/illustrations/ludwig-classic-maple.svg";
import gretschRoundBadge from "../assets/illustrations/gretsch-round-badge.svg";
import pearlFreeFloatingPiccolo from "../assets/illustrations/pearl-free-floating-piccolo.svg";
import dwCollectorsMaple from "../assets/illustrations/dw-collectors-maple.svg";
import sonorPhonic from "../assets/illustrations/sonor-phonic.svg";
import tamaSuperstar from "../assets/illustrations/tama-superstar.svg";
import zildjianASeries from "../assets/illustrations/zildjian-a-series.svg";
import yamahaRecordingCustom from "../assets/illustrations/yamaha-recording-custom.svg";
import mapexArmory from "../assets/illustrations/mapex-armory.svg";
import nobleCooleyHorizon from "../assets/illustrations/noble-cooley-horizon.svg";
import bradyJarrahPly from "../assets/illustrations/brady-jarrah-ply.svg";
import craviottoSolidMaple from "../assets/illustrations/craviotto-solid-maple.svg";
import rogersDynasonic from "../assets/illustrations/rogers-dynasonic.svg";
import leedyBroadway from "../assets/illustrations/leedy-broadway.svg";
import slingerlandRadioKing from "../assets/illustrations/slingerland-radio-king.svg";
import { builds } from "./builds.js";

export const kits = [
  {
    id: 1,
    make: "Ludwig",
    model: "Super Classic",
    year: 1965,
    builder: "Ludwig Drum Company",
    origin: "USA",
    era: "1960s",
    materials: ["3-ply mahogany/poplar/mahogany shells", "Chrome hardware", "Coated heads"],
    specs: { sizes: "14×22 BD, 9×13, 16×16", finish: "Oyster Black Pearl", lugs: "Imperial", hoops: "Triple-flange toms; wood bass hoops with claws" },
    funFact:
      "The Super Classic outfit is a 22, a 13, and a 16. Ringo Starr's February 1964 Ed Sullivan kit was the smaller Oyster Black Pearl Downbeat (20, 12, and 14). He took a Super Classic at the end of May 1964.",
    tags: ["vintage", "rock", "classic"],
    color: "#c0392b",
    illustration: ludwigClassicMaple,
    references: [
      "Identity corrected from Classic Maple. Shells are mahogany/poplar, not maple. The 12-inch tom was not part of the outfit.",
      "docs/illustration-references.md#ludwig-super-classic-1965",
    ],
    soundProfile: "vintage-maple-warm",
  },
  {
    id: 2,
    make: "Gretsch",
    model: "Progressive Jazz",
    year: 1957,
    builder: "Fred Gretsch Manufacturing Co.",
    origin: "USA",
    era: "1950s",
    materials: ["3-ply maple/poplar shells", "Nickel hardware", "Calfskin heads"],
    specs: { sizes: "14×20 BD, 8×12, 14×14", finish: "Copper Mist", lugs: "Separate-tension streamlined", hoops: "Flanged metal", strainer: "Micro-Sensitive" },
    funFact:
      "Round badge marks the era, not the model. This small jazz set is the Progressive Jazz outfit from the mid-1950s catalog. Copper Mist was a short-run nitron. A 1957 shell can be 3-ply or an early 6-ply; the 1961 catalog is when Gretsch called the shells 6-ply. The Lightning throw-off is a 1970s part.",
    tags: ["vintage", "jazz", "collector"],
    color: "#d4a017",
    illustration: gretschRoundBadge,
    references: [
      "Uncertain: whether this exact 1957 drum is 3-ply or early 6-ply. Hoops on 1950s sets were mostly flanged metal; die-cast hoops are the 1960s norm.",
      "docs/illustration-references.md#gretsch-progressive-jazz-1957",
    ],
    soundProfile: "vintage-jazz-bronze",
  },
  {
    id: 3,
    make: "Pearl",
    model: "Free-Floating Piccolo",
    year: 1983,
    builder: "Pearl Musical Instrument Co.",
    origin: "Japan",
    era: "1980s",
    materials: ["Chrome-plated steel shell", "Die-cast chassis", "Coated head"],
    specs: { sizes: "3.5×14 snare", finish: "Chrome-plated steel", lugs: "On the chassis, not the shell" },
    funFact:
      "Pearl's own timeline dates the Free-Floating snare to 1983. The shell has no lug holes. The documented piccolo is 3.5 inches deep, not 3. Some accounts put the first shipments in 1984.",
    tags: ["snare", "modern", "studio"],
    color: "#2980b9",
    illustration: pearlFreeFloatingPiccolo,
    references: [
      "Uncertain: 1983 is Pearl's published launch; a Japanese account says about 1984. Mirror versus brushed chrome on the first steel piccolo was not pinned.",
      "docs/illustration-references.md#pearl-free-floating-piccolo-1983",
    ],
    soundProfile: "metal-shell-snare",
  },
  {
    id: 4,
    make: "DW",
    model: "Collector's Series Maple",
    year: 1990,
    builder: "Drum Workshop",
    origin: "USA",
    era: "1990s",
    materials: ["North American maple shells", "Chrome or black hardware", "Coated heads"],
    specs: { sizes: "Custom. One deep layout is 18×22 BD, 10×12, 12×14, 16×16", finish: "FinishPly. Black Galaxy is not confirmed for the 1990 catalog", lugs: "Turret" },
    funFact:
      "DW's first drum catalog was 1990. True-Pitch rods, finer threads rather than a claim that a half-turn equals one musical step, were patented in 1995, so they are not part of this entry. Neil Peart played DW Collectors on later tours.",
    tags: ["modern", "rock", "professional"],
    color: "#1a1a2e",
    illustration: dwCollectorsMaple,
    references: [
      "Uncertain: Black Galaxy on a 1990 kit was not confirmed. The deep sizes are one custom layout, not a standard 1990 pack.",
      "docs/illustration-references.md#dw-collectors-series-1990",
    ],
    soundProfile: "modern-maple-pro",
  },
  {
    id: 5,
    make: "Sonor",
    model: "Phonic",
    year: 1978,
    builder: "Sonor (Johs. Link)",
    origin: "Germany",
    era: "1970s",
    materials: ["9-ply beech shells", "Ferro-manganese hoops", "Coated heads"],
    specs: { sizes: "14×22 BD, 8×12, 9×13, 14×14, 16×16", finish: "Red Mahogany", lugs: "Long Phonic lugs", edge: "45 degree, from 1975" },
    funFact:
      "The Phonic launched with Sonor's 1975 centenary: 9-ply beech and the 45-degree bearing edge. Red Mahogany is the stained finish. There is no lug named Sonor Square. This five-piece is a large outfit made from catalog sizes, not the only Phonic setup.",
    tags: ["vintage", "studio", "european"],
    color: "#8e1a1a",
    illustration: sonorPhonic,
    references: [
      "West Germany. 'Red Satin' was not a catalog finish name found for the Phonic.",
      "docs/illustration-references.md#sonor-phonic-1978",
    ],
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
    materials: ["Japanese birch shells", "Chrome hardware", "Coated heads"],
    specs: { sizes: "14×22 bass, mounted toms, and a floor tom. A 1976 price list was not found", finish: "Lacquer. Cherry sunburst is not confirmed for 1976", lugs: "Superstar cast" },
    funFact:
      "Superstar entered the 1976 catalog on birch shells. Fiberglass was the separate Fibrestar line in 1977. The Star-Cast mount is later. Billy Cobham was an early endorser. Stewart Copeland was playing Tama by the end of the 1970s.",
    tags: ["vintage", "rock", "japanese"],
    color: "#6c3483",
    illustration: tamaSuperstar,
    references: [
      "Uncertain: the old 10×13 and 11×14 sizes, and cherry sunburst in 1976, were not found in a catalog.",
      "docs/illustration-references.md#tama-superstar-1976",
    ],
    soundProfile: "vintage-japanese-rock",
  },
  {
    id: 7,
    make: "Zildjian",
    model: "A Zildjian",
    year: 1929,
    builder: "Avedis Zildjian Company",
    origin: "USA",
    era: "Pre-1940s",
    materials: ["Bell bronze, copper and tin. The exact mix is unpublished"],
    specs: { sizes: 'Representative set: 14" hats, 17" crash, 20" ride. Not a 1929 invoice', finish: "Traditional, lathed" },
    funFact:
      "Zildjian dates its Constantinople foundry to 1623. That is not this cymbal. The A line is the American cymbal, from the company incorporated in Quincy in 1929. Crash, ride, and hi-hat were names worked out with jazz drummers. This trio is a representative traditional set.",
    tags: ["cymbals", "historic", "legendary"],
    color: "#b7950b",
    illustration: zildjianASeries,
    references: [
      "Uncertain: this exact 14/17/20 combination is representative, not a documented 1929 set. The 80/20 ratio is the usual bell-bronze description, not Zildjian's published formula.",
      "docs/illustration-references.md#zildjian-a-zildjian-1929",
    ],
    soundProfile: "cymbals-bell-bronze",
  },
  {
    id: 8,
    make: "Yamaha",
    model: "9000",
    year: 1976,
    builder: "Yamaha Corporation",
    origin: "Japan",
    era: "1970s",
    materials: ["Birch shells", "Chrome hardware", "Coated heads"],
    specs: { sizes: "14×20 BD, 8×12, 9×13, 16×16", finish: "Real Wood", lugs: "Individual mini lugs" },
    funFact:
      "These are the YD-9000 drums, on the market in 1976, with separate mini lugs and a real-wood birch finish. The Recording Custom name and the long lug come with the 1982 split into 9000GA and 9000RA. Gadd's '50 Ways' (1975) and 'Aja' (1977) are not documented as this kit.",
    tags: ["studio", "jazz", "legendary"],
    color: "#1e8449",
    illustration: yamahaRecordingCustom,
    references: [
      "Uncertain: a 16×16 floor is a common size and was not in the early tom list consulted (12×8, 13×9, 14×10, 15×12; bass drums of 18 and 20). The old six-piece 22-inch layout is not the 1976 record.",
      "docs/illustration-references.md#yamaha-9000-1976",
    ],
    soundProfile: "vintage-japanese-rock",
  },
  {
    id: 9,
    make: "Mapex",
    model: "Armory Series",
    year: 2014,
    builder: "Mapex",
    origin: "Taiwan",
    era: "2010s",
    materials: ["6-ply birch/maple/birch shells", "Chrome hardware", "Coated heads"],
    specs: { sizes: "Studioease short: 18×22 BD, 7×10, 8×12, 12×14, 14×16, 5.5×14 steel snare", finish: "Rainforest Burst", lugs: "Armory tube", edge: "SONIClear, rounded over the outer ply" },
    funFact:
      "Armory is a 2014 series. SONIClear is the bearing edge and the tom mount, not the lug. The edge is a 45-degree cut that rounds over toward the outside so the head sits flatter. The shell is birch/maple/birch, not maple/walnut.",
    tags: ["modern", "hybrid", "value"],
    color: "#2e4057",
    illustration: mapexArmory,
    references: [
      "The drawing still shows the old four-piece. The data is the 2014 Studioease short pack. A fifth drum was not forced into the old layout.",
      "docs/illustration-references.md#mapex-armory-2014",
    ],
    soundProfile: "modern-hybrid",
  },
  {
    id: 10,
    make: "Noble & Cooley",
    model: "Horizon",
    year: "1980s",
    builder: "Noble & Cooley Drum Co.",
    origin: "USA",
    era: "1980s",
    materials: ["Horizontal-ply maple and mahogany", "Chrome cast lugs; brass tubes are an option"],
    specs: { sizes: "1980s sizes were not found. A current example is 16×22 BD, 9×12, 16×16", finish: "Oil, matte, or gloss over the ply", lugs: "Cast" },
    funFact:
      "Noble & Cooley dates to 1854 in Granville, Massachusetts. The Horizon is the horizontal-ply maple and mahogany shell the company says it introduced in the 1980s, so the shell would move more like a steam-bent one. It is not a steam-bent walnut drum, and 2003 is not a documented introduction year.",
    tags: ["boutique", "american", "historic"],
    color: "#4a235a",
    illustration: nobleCooleyHorizon,
    references: [
      "Uncertain: the factory says the 1980s and does not give a year. 1980s sizes were not found. Questlove's use of the brand was not tied to this spec.",
      "docs/illustration-references.md#noble--cooley-horizon-1980s",
    ],
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
    materials: ["Jarrah ply, plies running one direction", "Ten brass tube lugs", "Chrome hoops"],
    specs: { sizes: "6.5×14 snare", finish: "Natural jarrah", lugs: "Brady tube" },
    funFact:
      "Chris Brady's first drum, in 1980 in Roleystone, Western Australia, was a solid jarrah snare hollowed from a log. Jarrah ply snares and kits began in 1989. Other Australian makers also use indigenous hardwoods.",
    tags: ["boutique", "australian", "snare"],
    color: "#922b21",
    illustration: bradyJarrahPly,
    references: [
      "1989 is the Jedistar date for the start of jarrah ply, sourced to an archived Brady timeline.",
      "docs/illustration-references.md#brady-jarrah-ply-1989",
    ],
    soundProfile: "exotic-hardwood",
  },
  {
    id: 12,
    make: "Craviotto",
    model: "Solid Maple",
    year: "1990s",
    builder: "Johnny Craviotto",
    origin: "USA",
    era: "1990s",
    materials: ["Steam-bent solid maple, one plank, with maple rings", "Chrome-plated brass tube lugs"],
    specs: { sizes: "Many depths, including 5.5×14, 6.5×14, and 7×14", finish: "Natural satin oil" },
    funFact:
      "Each shell is one maple board, steamed and bent, then fitted with solid maple rings. It is not a stave shell and it is not carved. A specific 1996 catalog date and a two-year waiting list were not verified.",
    tags: ["boutique", "artisan", "collector"],
    color: "#1a5276",
    illustration: craviottoSolidMaple,
    references: [
      "Uncertain: the first year he sold snares under his own name. 6×14 specifically was not confirmed; 6.5×14 was.",
      "docs/illustration-references.md#craviotto-solid-maple-1990s",
    ],
    soundProfile: "vintage-maple-warm",
  },
  {
    id: 13,
    make: "Rogers",
    model: "Dynasonic",
    year: 1961,
    builder: "Rogers Drums",
    origin: "USA",
    era: "1960s",
    materials: ["Chrome-over-brass shell", "Chrome hardware"],
    specs: { sizes: "5×14 snare", finish: "Chrome over Brass", lugs: "Bread and Butter in 1961; beavertail by the mid-1960s", strainer: "Floating snare frame" },
    funFact:
      "Introduced in 1961. The wires sit on a frame, so their lengthwise tension is separate from how hard they press the bottom head. They are not tensioned from inside the shell. A November 1961 Down Beat ad already calls the drum new.",
    tags: ["vintage", "snare", "collector"],
    color: "#797d7f",
    illustration: rogersDynasonic,
    references: [
      "One modern Rogers page says 1962. The 1961 ad is the earlier public date used here. The drawing shows the later beavertail lug.",
      "docs/illustration-references.md#rogers-dyna-sonic-1961",
    ],
    soundProfile: "vintage-brass-snare",
  },
  {
    id: 14,
    make: "Leedy",
    model: "Broadway Standard",
    year: 1930,
    builder: "Leedy Manufacturing Company",
    origin: "USA",
    era: "Pre-1940s",
    materials: ["Nickel-plated brass shell", "Nickel hardware", "Calfskin head"],
    specs: { sizes: "5×14 (other depths were catalogued)", finish: "Nickel plate over brass", lugs: "Separate-tension tube lugs", hoops: "Extended flange" },
    funFact:
      "The Broadway Standard, Parallel, and Dual are in the 1930 catalog, so the name is kept and the year moves from 1928 to 1930. A 1928 professional Leedy snare is the earlier Multi-Model, with the same tube lugs and nickel-brass shell. Claw hooks are not this drum.",
    tags: ["antique", "historic", "jazz"],
    color: "#6e2f1a",
    illustration: leedyBroadway,
    references: [
      "Choice: keep Broadway, move the year to 1930. The year the Leedy name passed to Slingerland was not pinned.",
      "docs/illustration-references.md#leedy-broadway-standard-1930",
    ],
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
    materials: ["One-piece steam-bent maple with maple reinforcing rings", "Nickel hardware", "Calfskin head"],
    specs: { sizes: "5.5×14 (6.5×14 and 7×14 were also made)", finish: "Natural maple", lugs: "Eight streamline lugs", strainer: "Three-point" },
    funFact:
      "The snare arrived in 1936–37 as one piece of maple with reinforcing rings, when most snares were mahogany ply. It was sold as the Gene Krupa model. That he helped design it is the company's story and was not independently documented here.",
    tags: ["antique", "jazz", "legendary"],
    color: "#1c2833",
    illustration: slingerlandRadioKing,
    references: [
      "Uncertain: a 5-inch depth for 1936. 5.5, 6.5, and 7 are the depths the sources list.",
      "docs/illustration-references.md#slingerland-radio-king-1936",
    ],
    soundProfile: "vintage-maple-warm",
  },
];

kits.forEach((kit) => {
  kit.build = builds[kit.id];
});

export const eras = ["All", "Pre-1940s", "1950s", "1960s", "1970s", "1980s", "1990s", "2010s"];
export const origins = ["All", "USA", "Japan", "Germany", "Australia", "Taiwan"];
