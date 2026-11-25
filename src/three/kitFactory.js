import * as THREE from "three";
import { headMaterial, hoopMaterial, metalMaterial, shellMaterial } from "./materials.js";

const Y = new THREE.Vector3(0, 1, 0);

function lathe(radius, points) {
  const pts = points.map(([x, y]) => new THREE.Vector2(radius + x, y));
  return new THREE.LatheGeometry(pts, 56);
}

function shellGeometry(radius, depth, edge) {
  const h = depth / 2;
  const lip = edge === "round" ? 0.22 : 0.05;
  return lathe(0, [
    [radius - 0.16, -h],
    [radius - lip, -h + 0.2],
    [radius, -h + 0.45],
    [radius, h - 0.45],
    [radius - lip, h - 0.2],
    [radius - 0.16, h],
  ]);
}

function hoopGeometry(radius, style) {
  const profiles = {
    triple: [
      [0.02, 0.2], [0.28, 0.2], [0.28, 0.1], [0.14, 0.1], [0.14, 0.02],
      [0.24, 0.02], [0.24, -0.08], [0.12, -0.08], [0.12, -0.16], [0.26, -0.16], [0.26, -0.22], [0.02, -0.22],
    ],
    flange: [
      [0.02, 0.14], [0.24, 0.14], [0.24, 0.04], [0.1, 0.04], [0.1, -0.04], [0.24, -0.04], [0.24, -0.14], [0.02, -0.14],
    ],
    extended: [
      [0.04, 0.16], [0.32, 0.16], [0.32, 0.06], [0.12, 0.06], [0.12, -0.06], [0.32, -0.06], [0.32, -0.16], [0.04, -0.16],
    ],
    diecast: [
      [0.04, 0.22], [0.34, 0.22], [0.34, -0.22], [0.04, -0.22],
    ],
    wood: [
      [0.02, 0.34], [0.42, 0.26], [0.42, -0.26], [0.02, -0.34],
    ],
  };
  return lathe(radius, profiles[style] || profiles.triple);
}

function lugGeometry(style, depth) {
  const h = Math.max(0.7, depth);
  if (style === "turret" || style === "mini") {
    return new THREE.BoxGeometry(0.42, 0.55, 0.36);
  }
  if (style === "bread-butter") {
    return new THREE.CapsuleGeometry(0.28, Math.max(0.4, h * 0.45), 4, 8);
  }
  if (style === "streamlined" || style === "streamline") {
    return new THREE.CapsuleGeometry(0.22, Math.max(0.5, h * 0.55), 4, 8);
  }
  if (style === "brady-tube" || style === "tube" || style === "diamond-tube") {
    return new THREE.BoxGeometry(style === "brady-tube" ? 0.55 : 0.42, h, 0.38);
  }
  if (style === "phonic" || style === "imperial" || style === "cast") {
    return new THREE.BoxGeometry(0.78, h, 0.55);
  }
  return new THREE.BoxGeometry(0.62, h, 0.46);
}

function badgeGeometry(kind) {
  if (kind === "round") return new THREE.CircleGeometry(0.72, 28);
  if (kind === "hex") return new THREE.CircleGeometry(0.62, 6);
  if (kind === "oval") {
    const g = new THREE.CircleGeometry(0.55, 24);
    g.scale(1.35, 0.8, 1);
    return g;
  }
  const shape = new THREE.Shape();
  if (kind === "keystone") {
    shape.moveTo(-0.55, 0.42);
    shape.lineTo(0.55, 0.42);
    shape.lineTo(0.36, -0.5);
    shape.lineTo(-0.36, -0.5);
  } else if (kind === "cloud") {
    shape.moveTo(-0.9, 0.05);
    shape.bezierCurveTo(-0.9, 0.55, -0.4, 0.6, -0.2, 0.15);
    shape.bezierCurveTo(-0.05, 0.7, 0.25, 0.7, 0.35, 0.12);
    shape.bezierCurveTo(0.7, 0.55, 0.95, 0.2, 0.85, -0.05);
    shape.bezierCurveTo(0.5, -0.35, -0.5, -0.35, -0.9, 0.05);
  } else {
    shape.moveTo(-0.78, -0.28);
    shape.lineTo(0.78, -0.28);
    shape.lineTo(0.78, 0.28);
    shape.lineTo(-0.78, 0.28);
  }
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

function addRing(group, radius, y, material, tube = 0.08) {
  const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 8, 40), material);
  mesh.rotation.x = Math.PI / 2;
  mesh.position.y = y;
  mesh.castShadow = true;
  group.add(mesh);
  return mesh;
}

function placeAround(mesh, count, radius, y, tilt = 0) {
  const dummy = new THREE.Object3D();
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    dummy.position.set(Math.cos(a) * radius, y, Math.sin(a) * radius);
    dummy.rotation.set(0, -a + Math.PI / 2, tilt);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
}

function addLugs(group, piece, build, radius, depth) {
  const style = build.lug;
  if (style === "chassis") return;
  const metal = metalMaterial(build.hardware || "chrome", style === "brady-tube" ? 0.3 : 0.2);
  const bodyH = style === "turret" || style === "mini" ? 0.55 : Math.max(0.9, depth * (style === "streamlined" ? 0.42 : 0.62));
  const geo = lugGeometry(style, bodyH);
  const pairs = style === "turret" || style === "mini";
  const count = piece.lugs * (pairs ? 2 : 1);
  const mesh = new THREE.InstancedMesh(geo, metal, count);
  mesh.castShadow = true;
  const dummy = new THREE.Object3D();
  const r = radius + 0.22;
  for (let i = 0; i < piece.lugs; i++) {
    const a = (i / piece.lugs) * Math.PI * 2 + 0.2;
    const ys = pairs ? [depth * 0.32, -depth * 0.32] : [0];
    ys.forEach((y, k) => {
      dummy.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
      dummy.rotation.set(0, -a, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i * ys.length + k, dummy.matrix);
    });
  }
  mesh.instanceMatrix.needsUpdate = true;
  group.add(mesh);
  if (style === "imperial" || style === "cast" || style === "diamond-tube") {
    const boss = new THREE.InstancedMesh(new THREE.BoxGeometry(0.7, 0.38, 0.28), metalMaterial(build.hardware, 0.18), piece.lugs);
    placeAround(boss, piece.lugs, r + 0.08, style === "diamond-tube" ? 0 : depth * 0.02);
    group.add(boss);
  }
}

function addBadge(group, build, radius, depth) {
  if (!build.badge || build.badge === "none") return;
  const geo = badgeGeometry(build.badge);
  const mat = metalMaterial(build.hardware === "brass" ? "brass" : "nickel", 0.38);
  const mesh = new THREE.Mesh(geo, mat);
  const a = Math.PI * 0.15;
  mesh.position.set(Math.sin(a) * (radius + 0.08), depth * 0.05, Math.cos(a) * (radius + 0.08));
  mesh.lookAt(0, mesh.position.y, 0);
  group.add(mesh);
}

function addHoop(group, radius, y, style, build) {
  const mesh = new THREE.Mesh(hoopGeometry(radius, style), hoopMaterial(build, style));
  mesh.position.y = y;
  mesh.castShadow = true;
  group.add(mesh);
  if (style === "wood") {
    const claws = new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.18, 0.55, 0.18),
      metalMaterial(build.hardware || "chrome", 0.2),
      8,
    );
    placeAround(claws, 8, radius + 0.36, y);
    group.add(claws);
  }
}

function addStrainer(group, build, radius, depth) {
  const metal = metalMaterial(build.hardware || "chrome", 0.22);
  if (build.strainer === "floating") {
    const frame = new THREE.Group();
    const bar = (w, y, z) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.12, 0.12), metal);
      m.position.set(0, y, z);
      frame.add(m);
    };
    bar(radius * 1.3, -depth / 2 - 0.45, 0);
    bar(radius * 1.3, -depth / 2 - 0.85, 0);
    const side = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 0.12), metal);
    side.position.set(radius * 0.65, -depth / 2 - 0.65, 0);
    frame.add(side);
    const lever = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.1, 0.12), metal);
    lever.position.set(radius * 0.95, -depth / 2 - 0.35, 0);
    lever.rotation.z = -0.5;
    frame.add(lever);
    group.add(frame);
    return;
  }
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.35, 0.28), metal);
  box.position.set(radius + 0.2, -depth * 0.15, 0);
  group.add(box);
  const lever = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.08, 0.1), metal);
  lever.position.set(radius + 0.7, -depth * 0.05, 0);
  lever.rotation.z = 0.4;
  group.add(lever);
  if (build.strainer === "three-point") {
    const tri = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.5, 3), metal);
    tri.rotation.z = Math.PI / 2;
    tri.position.set(radius + 0.15, -depth * 0.28, 0);
    group.add(tri);
  }
}

function makeDrum(piece, build) {
  const local = {
    ...build,
    shell: piece.shell || build.shell,
    finish: piece.finish || build.finish,
    strainer: piece.strainer || build.strainer,
  };
  const radius = piece.diameter / 2;
  const depth = piece.depth;
  const group = new THREE.Group();
  group.name = piece.role;

  if (local.lug === "chassis") {
    const shell = new THREE.Mesh(shellGeometry(radius * 0.9, depth * 0.72, "sharp"), shellMaterial(local, piece));
    shell.castShadow = true;
    group.add(shell);
    addHoop(group, radius, depth * 0.55, "diecast", local);
    const chassis = new THREE.Mesh(
      new THREE.CylinderGeometry(radius + 0.15, radius + 0.2, 0.7, 48),
      metalMaterial("chrome", 0.18),
    );
    chassis.position.y = -depth * 0.42;
    chassis.castShadow = true;
    group.add(chassis);
    const posts = new THREE.InstancedMesh(new THREE.BoxGeometry(0.18, depth * 0.95, 0.18), metalMaterial("chrome", 0.16), piece.lugs);
    placeAround(posts, piece.lugs, radius + 0.05, 0.05);
    group.add(posts);
    const head = new THREE.Mesh(new THREE.CircleGeometry(radius * 0.92, 40), headMaterial(local.head));
    head.rotation.x = -Math.PI / 2;
    head.position.y = depth * 0.55 + 0.02;
    group.add(head);
    addStrainer(group, local, radius, depth);
    return group;
  }

  const shell = new THREE.Mesh(shellGeometry(radius, depth, build.edge || "sharp"), shellMaterial(local, piece));
  shell.castShadow = true;
  shell.receiveShadow = true;
  group.add(shell);
  if (build.rings) {
    addRing(group, radius + 0.02, depth * 0.38, metalMaterial(local.hardware, 0.45), 0.06);
    addRing(group, radius + 0.02, -depth * 0.38, metalMaterial(local.hardware, 0.45), 0.06);
  }
  if (build.bead) {
    addRing(group, radius + 0.04, 0, metalMaterial("nickel", 0.28), 0.07);
  }
  if (build.lines) {
    for (let i = 1; i <= build.lines; i++) {
      const y = -depth / 2 + (depth * i) / (build.lines + 1);
      addRing(group, radius + 0.015, y, metalMaterial("brass", 0.4), 0.025);
    }
  }
  addHoop(group, radius, depth / 2, piece.hoop, local);
  addHoop(group, radius, -depth / 2, piece.hoop === "wood" ? "triple" : piece.hoop, local);
  const head = new THREE.Mesh(new THREE.CircleGeometry(radius * 0.96, 48), headMaterial(local.head));
  head.rotation.x = -Math.PI / 2;
  head.position.y = depth / 2 + 0.04;
  group.add(head);
  addLugs(group, piece, local, radius, depth);
  const rods = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.055, 0.055, depth + 0.2, 6),
    metalMaterial(local.hardware || "chrome", 0.16),
    piece.lugs,
  );
  placeAround(rods, piece.lugs, radius + 0.16, 0);
  rods.castShadow = true;
  group.add(rods);
  addBadge(group, local, radius, depth);
  if (piece.role === "snare") addStrainer(group, local, radius, depth);
  return group;
}

function tripod(height, reach, material) {
  const g = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, height, 8), material);
  pole.position.y = height / 2;
  pole.castShadow = true;
  g.add(pole);
  const len = Math.hypot(reach, height * 0.42);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, len, 6), material);
    const dir = new THREE.Vector3(Math.cos(a) * reach, -height * 0.42, Math.sin(a) * reach).normalize();
    leg.quaternion.setFromUnitVectors(Y, dir);
    leg.position.set(Math.cos(a) * reach * 0.45, height * 0.22, Math.sin(a) * reach * 0.45);
    leg.castShadow = true;
    g.add(leg);
  }
  return g;
}

function cymbalMesh(diameter) {
  const radius = diameter / 2;
  const bell = Math.max(0.7, radius * 0.16);
  const pts = [
    new THREE.Vector2(radius, 0.04),
    new THREE.Vector2(radius * 0.98, 0.09),
    new THREE.Vector2(radius * 0.5, 0.14),
    new THREE.Vector2(bell, 0.22),
    new THREE.Vector2(bell * 0.45, 0.34),
    new THREE.Vector2(0.05, 0.26),
  ];
  const geo = new THREE.LatheGeometry(pts, 64);
  const mat = new THREE.MeshPhysicalMaterial({
    color: "#c4a15a",
    metalness: 0.92,
    roughness: 0.34,
    clearcoat: 0.2,
    envMapIntensity: 1.1,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  return mesh;
}

function placeCymbals(group, spec, hardware, spread = 16) {
  if (!spec) return;
  const metal = metalMaterial(hardware, 0.2);
  const stands = [];
  if (spec.hat) {
    stands.push({ x: -spread, z: spread * 0.55, sizes: [spec.hat, spec.hat], gap: 1.5, h: 20 });
  }
  if (spec.crash) stands.push({ x: -spread * 1.05, z: spread * 0.12, sizes: [spec.crash], h: 27, tilt: 0.7 });
  if (spec.ride) stands.push({ x: spread, z: -spread * 0.35, sizes: [spec.ride], h: 24, tilt: 0.08 });
  stands.forEach((s) => {
    const stand = tripod(s.h, 7, metal);
    stand.position.set(s.x, 0, s.z);
    s.sizes.forEach((size, i) => {
      const c = cymbalMesh(size);
      c.position.y = s.h - i * (s.gap || 0);
      c.rotation.x = -(s.tilt || 0);
      stand.add(c);
    });
    group.add(stand);
  });
}

function placeDrum(group, drum, x, y, z) {
  drum.position.set(x, y + drum.userData.depth / 2, z);
  group.add(drum);
}

export function createKitObject(kit) {
  const build = kit.build;
  if (!build) {
    const empty = new THREE.Group();
    return empty;
  }
  const root = new THREE.Group();
  root.name = `${kit.make} ${kit.model}`;
  const metal = metalMaterial(build.hardware || "chrome", 0.2);

  if (build.kind === "cymbals") {
    placeCymbals(root, build.cymbals, build.hardware || "nickel");
    return root;
  }

  if (build.kind === "snare") {
    const piece = build.pieces[0];
    const drum = makeDrum(piece, build);
    drum.userData.depth = piece.depth;
    const standMetal = metalMaterial(build.hoopMetal || build.hardware || "chrome", 0.2);
    const stand = tripod(15, 8, standMetal);
    root.add(stand);
    const basket = new THREE.Mesh(new THREE.TorusGeometry(piece.diameter / 2 + 0.4, 0.08, 6, 24), standMetal);
    basket.rotation.x = Math.PI / 2;
    basket.position.y = 15;
    root.add(basket);
    drum.position.y = 15 + piece.depth / 2;
    root.add(drum);
    return root;
  }

  const bass = build.pieces.find((p) => p.role === "bass");
  const racks = build.pieces.filter((p) => p.role === "rack");
  const floors = build.pieces.filter((p) => p.role === "floor");
  const snare = build.pieces.find((p) => p.role === "snare");

  const bassRadius = bass.diameter / 2;
  if (bass) {
    const drum = makeDrum(bass, build);
    drum.userData.depth = bass.depth;
    drum.rotation.x = Math.PI / 2;
    drum.position.set(0, bassRadius + 0.5, 0);
    root.add(drum);
    const front = bass.depth / 2 + 1.6;
    const pedal = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.16, 1.2), metal);
    pedal.position.set(1.2, 0.16, front);
    pedal.castShadow = true;
    root.add(pedal);
    const beater = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, bassRadius * 0.7, 6), metal);
    beater.position.set(0, bassRadius * 0.55, bass.depth / 2 + 0.15);
    root.add(beater);
    [-1, 1].forEach((side) => {
      const spur = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 5, 6), metal);
      spur.position.set(side * bassRadius * 0.72, 2.2, -bass.depth * 0.2);
      spur.rotation.z = side * 0.55;
      spur.rotation.x = 0.35;
      root.add(spur);
    });
  }

  const tomBase = bassRadius * 2 + 0.8;
  racks.forEach((piece, i) => {
    const drum = makeDrum(piece, build);
    drum.userData.depth = piece.depth;
    const spread = racks.length === 1 ? -bass.diameter * 0.08 : (i === 0 ? -1 : 1) * bass.diameter * 0.2;
    placeDrum(root, drum, spread, tomBase, -1.2);
    const mountY = tomBase + piece.depth * 0.35;
    if (build.mount === "rail" && i === 0) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(bass.diameter * 0.72, 0.18, 0.18), metal);
      rail.position.set(0, tomBase - 0.2, 0.2);
      root.add(rail);
    } else if (build.mount === "post") {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, piece.depth + 1.5, 8), metal);
      post.position.set(spread * 0.35, mountY, 0.4);
      root.add(post);
    } else if (build.mount === "arm") {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 7, 6), metal);
      arm.position.set(spread * 0.45, mountY, 0);
      arm.rotation.z = spread > 0 ? -0.55 : 0.55;
      root.add(arm);
    }
  });

  floors.forEach((piece, i) => {
    const drum = makeDrum(piece, build);
    drum.userData.depth = piece.depth;
    const side = floors.length === 1 || i === floors.length - 1 ? 1 : -1;
    const x = side * (bassRadius + piece.diameter / 2 + 2);
    const z = 1.5;
    const bottom = 1.2;
    placeDrum(root, drum, x, bottom, z);
    const shellR = piece.diameter / 2;
    for (let n = 0; n < 3; n++) {
      const a = (n / 3) * Math.PI * 2 + 0.4;
      const top = new THREE.Vector3(
        x + Math.cos(a) * (shellR + 0.35),
        bottom + piece.depth * 0.82,
        z + Math.sin(a) * (shellR + 0.35),
      );
      const foot = new THREE.Vector3(
        x + Math.cos(a) * (shellR + 3.4),
        0.1,
        z + Math.sin(a) * (shellR + 3.4),
      );
      const dir = foot.clone().sub(top);
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, dir.length(), 6), metal);
      leg.quaternion.setFromUnitVectors(Y, dir.clone().normalize());
      leg.position.copy(top).add(dir.multiplyScalar(0.5));
      leg.castShadow = true;
      root.add(leg);
    }
  });

  if (snare) {
    const drum = makeDrum(snare, build);
    drum.userData.depth = snare.depth;
    const sx = -(bassRadius + 2);
    const sz = bassRadius + 8;
    const stand = tripod(14, 7, metal);
    stand.position.set(sx, 0, sz);
    root.add(stand);
    const basket = new THREE.Mesh(new THREE.TorusGeometry(snare.diameter / 2 + 0.35, 0.07, 6, 20), metal);
    basket.rotation.x = Math.PI / 2;
    basket.position.set(sx, 14, sz);
    root.add(basket);
    drum.position.set(sx, 14 + snare.depth / 2, sz);
    root.add(drum);
  }

  placeCymbals(root, build.cymbals, build.hardware, bassRadius + 7);
  return root;
}
