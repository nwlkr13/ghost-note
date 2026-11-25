# 3D models

The gallery card shows a still from `src/assets/previews/`. Those PNGs are renders of this same generator. Opening a card mounts one WebGL canvas (`src/components/KitViewer.jsx`), loaded with a dynamic import so the gallery does not pull three.js until then. Fifteen canvases are never mounted together. If WebGL is missing, or the viewer throws, the card keeps the isometric SVG. If that SVG is missing, the vinyl record is the last fallback.

`?shot=<id>` renders that kit full-frame for stills. `&spin=1` turns the orbit control.

## What drives the mesh

`src/data/builds.js` is attached to each catalog entry as `kit.build`. `src/three/kitFactory.js` builds the scene from that object: one shell, hoop, lug, head, and badge routine, configured per piece. It is not a set of one-off meshes.

Units are inches. A 14×22 bass is 14 inches deep and 22 inches in diameter, matching the catalog.

| Id | What the model uses |
| --- | --- |
| 1 Ludwig Super Classic | 14×22 bass, 9×13 rack, 16×16 floor. No snare and no 12-inch tom. Imperial lugs (10 / 6 / 8). Triple-flange toms, wood bass hoops with claws. Oyster black pearl. Coated heads. Keystone badge, blank. Post mount. |
| 2 Gretsch Progressive Jazz | 14×20, 8×12, 14×14. Separate-tension streamlined lugs. Flanged metal hoops, not die-cast. Nickel. Copper Mist. Calfskin. Round badge, blank, on the shell. Rail mount. |
| 3 Pearl Free-Floating Piccolo | 3.5×14. Steel shell with no lugs through it. Die-cast chassis, posts, and die-cast hoops. Coated head. No badge. |
| 4 DW Collector's Series | One deep layout: 18×22, 10×12, 12×14, 16×16. Turret lugs. Triple-flange. Dark FinishPly. The model does not claim Black Galaxy. Oval badge, blank. |
| 5 Sonor Phonic | 14×22, 8×12, 9×13, 14×14, 16×16. Long Phonic lugs. Red mahogany. Oblong badge, blank. |
| 6 Tama Superstar | Representative sizes, because a 1976 price list was not found: 14×22, 8×12, 9×13, 16×16. Clear birch lacquer, not a claimed cherry sunburst. Cast lugs. The viewer labels these sizes representative. |
| 7 A Zildjian | Cymbals only. Representative set from the catalog: 14-inch hats, 17-inch crash, 20-inch ride. No letter, stamp, or "A". |
| 8 Yamaha 9000 | 14×20, 8×12, 9×13, 16×16. Individual mini lugs. Wood bass hoops. Real-wood birch. Not a Recording Custom and not the long lug. |
| 9 Mapex Armory | Studioease short pack: 18×22, 7×10, 8×12, 12×14, 14×16, and a 5.5×14 steel snare. Tube lugs. Rounded outer edge. Rainforest burst. The SVG still shows the older four-piece drawing. The 3D model follows this pack. |
| 10 Noble & Cooley Horizon | A current documented example, not a recovered 1980s invoice: 16×22, 9×12, 16×16. Chrome cast lugs. Maple and mahogany gloss. Hex badge, blank. The viewer labels the sizes representative. |
| 11 Brady Jarrah Ply | 6.5×14. Ten brass tube lugs. Chrome triple-flange hoops. Natural jarrah. Oblong badge, blank. |
| 12 Craviotto | One 6.5×14 solid-maple snare, not three drums. Chrome-plated brass tube lugs drawn as chrome hardware. Satin maple. Reinforcing rings. No badge. |
| 13 Rogers Dyna-Sonic | 5×14 chrome-over-brass. Bread-and-butter lugs for the 1961 entry, not the later beavertail. Ten lugs. Floating snare frame under the drum. Oval badge, blank. |
| 14 Leedy Broadway Standard | 5×14 nickel-over-brass. Eight separate-tension tube lugs. Extended-flange hoops. Center bead. Calfskin. Oval badge, blank. |
| 15 Slingerland Radio King | 5.5×14 one-piece maple with reinforcing rings. Eight streamline lugs. Nickel double-flange hoops. Calfskin. Three-point strainer. Cloud badge, blank. |

Cymbals on a drum kit (14-inch hats, 18-inch crash, 20-inch ride, or hats and a ride on the jazz kits) are era hardware so the kit reads as a kit. They are not a claimed cymbal invoice. The Zildjian entry is the exception: those three diameters are the catalog's representative set.

Badges are blank metal shapes. There is no logo, wordmark, script, or badge artwork.

## Materials and light

Finishes are procedural canvas textures: oyster swirls, copper sparkle, wood grain, rainforest burst, dark speckle, jarrah, maple, birch. Chrome, nickel, and brass are `MeshPhysicalMaterial` metals. Coated and calfskin heads are separate maps. Shells that are lacquered get a clearcoat.

The viewer uses ACES filmic tone mapping, a soft shadow map, and an environment map from three.js `RoomEnvironment` (PMREM). No photo HDR is vendored.

## Licenses

- Shells, lugs, hoops, hardware, and the canvas textures in this repository are original procedural geometry and original pixel work, written for Ghost Note.
- `three` (MIT), `@react-three/fiber` (MIT), and `@react-three/drei` (MIT). `RoomEnvironment` ships in `three/examples/jsm/environments/RoomEnvironment.js` under the three.js MIT license. https://github.com/mrdoob/three.js/blob/master/LICENSE
- No Poly Haven file is vendored. The environment is the three.js room preset, which is MIT, not a photographed HDRI. A CC0 Poly Haven HDRI would be a direct upgrade. Poly Haven's license, if one is added later: https://polyhaven.com/license
- No commercial 3D model is included or traced.

## Where the realism falls short

- Lug, hoop, and strainer silhouettes are geometric stand-ins (boxes, capsules, lathe profiles), not scanned parts. A bread-and-butter lug reads as a rounded bar. A Phonic lug reads as a long block. Claws are small boxes, not hooks.
- Procedural wraps do not match a photographed oyster or Copper Mist. The grain is a few bezier strokes.
- `RoomEnvironment` is a synthetic studio, so chrome does not reflect a real room.
- Cymbal lathing and hammering are a smooth lathe. There is no bell lathe pattern and no hammer dents.
- Tension rods are shared cylinders. They do not pass through modeled lug holes, and the claw hooks do not grab a real rod.
- Bass drums lie on the correct axis, but spurs, pedal, and tom mounts are simple primitives. The pedal is a plate and a beater.
- Floor-tom legs splay with one rotation. They do not use a memory lock or a bracket.
- Some counts are the usual number when the year-specific count was not pinned: ten lugs on the 1961 Dyna-Sonic, eight posts on the Free-Floating chassis.
- Tama diameters, the Horizon diameters, and the kit cymbals are representative, as the catalog already says.
- The Dyna-Sonic wires are a frame under the drum, not twenty individual strands.
- One canvas, a 1024 shadow map, and a device-pixel cap of 1.5 keep the open card light. That also caps how sharp the chrome can look.
