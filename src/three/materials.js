import * as THREE from "three";

const cache = new Map();

function canvasTexture(draw, repeat = [1, 1]) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  draw(canvas.getContext("2d"), canvas);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat[0], repeat[1]);
  tex.anisotropy = 4;
  return tex;
}

function grain(ctx, base, line, count = 36) {
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = line;
  for (let i = 0; i < count; i++) {
    const x = (i / count) * 512;
    ctx.globalAlpha = 0.22 + (i % 3) * 0.1;
    ctx.lineWidth = i % 4 === 0 ? 2.1 : 0.8;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.bezierCurveTo(x + 10, 150, x - 8, 320, x + 4, 512);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function finishTexture(finish) {
  if (cache.has(finish)) return cache.get(finish);
  let tex = null;
  if (finish === "oyster-black-pearl") {
    tex = canvasTexture((ctx) => {
      ctx.fillStyle = "#161616";
      ctx.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 42; i++) {
        ctx.strokeStyle = `rgba(230,230,230,${0.28 + (i % 4) * 0.1})`;
        ctx.lineWidth = i % 5 === 0 ? 2.2 : 0.8;
        ctx.beginPath();
        const y = (i * 37) % 512;
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(90, y - 40, 220, y + 50, 340, y - 10);
        ctx.bezierCurveTo(420, y - 40, 470, y + 20, 512, y + 8);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      for (let i = 0; i < 80; i++) {
        ctx.beginPath();
        ctx.arc((i * 53) % 512, (i * 97) % 512, i % 4 === 0 ? 1.4 : 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }, [2, 1]);
  } else if (finish === "copper-mist") {
    tex = canvasTexture((ctx) => {
      const g = ctx.createLinearGradient(0, 0, 0, 512);
      g.addColorStop(0, "#e2b07a");
      g.addColorStop(0.5, "#a86438");
      g.addColorStop(1, "#5a3018");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 512, 512);
      ctx.fillStyle = "rgba(255,236,210,0.75)";
      for (let i = 0; i < 140; i++) {
        ctx.beginPath();
        ctx.arc((i * 41) % 512, (i * 73) % 512, i % 5 === 0 ? 1.6 : 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
    }, [2, 1]);
  } else if (finish === "finishply-dark") {
    tex = canvasTexture((ctx) => {
      ctx.fillStyle = "#12121a";
      ctx.fillRect(0, 0, 512, 512);
      ctx.fillStyle = "rgba(230,230,255,0.85)";
      for (let i = 0; i < 160; i++) {
        ctx.beginPath();
        ctx.arc((i * 47) % 512, (i * 89) % 512, i % 6 === 0 ? 1.5 : 0.55, 0, Math.PI * 2);
        ctx.fill();
      }
    }, [2, 1]);
  } else if (finish === "red-mahogany") {
    tex = canvasTexture((ctx) => grain(ctx, "#6a221c", "rgba(30,6,6,0.9)", 36), [2, 1]);
  } else if (finish === "clear-lacquer" || finish === "real-wood") {
    tex = canvasTexture((ctx) => grain(ctx, finish === "real-wood" ? "#e4c79a" : "#d7b48a", "rgba(90,58,28,0.85)", 34), [2, 1]);
  } else if (finish === "rainforest") {
    tex = canvasTexture((ctx) => {
      const g = ctx.createRadialGradient(256, 256, 20, 256, 256, 280);
      g.addColorStop(0, "#c6e6c4");
      g.addColorStop(0.45, "#2f6a48");
      g.addColorStop(1, "#0c1612");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 512, 512);
      grain(ctx, "rgba(0,0,0,0)", "rgba(8,20,12,0.45)", 22);
    }, [1, 1]);
  } else if (finish === "ply-gloss") {
    tex = canvasTexture((ctx) => grain(ctx, "#6a4030", "rgba(20,8,6,0.8)", 30), [2, 1]);
  } else if (finish === "natural-jarrah") {
    tex = canvasTexture((ctx) => grain(ctx, "#7a2c22", "rgba(28,6,4,0.9)", 32), [2, 1]);
  } else if (finish === "natural-satin" || finish === "natural-maple") {
    tex = canvasTexture((ctx) => grain(ctx, finish === "natural-satin" ? "#efd7b4" : "#e2b56a", "rgba(110,72,36,0.75)", 30), [2, 1]);
  }
  cache.set(finish, tex);
  return tex;
}

const metalColors = {
  chrome: "#d5d8dc",
  nickel: "#c8c2b4",
  brass: "#c6a15e",
};

export function metalMaterial(kind = "chrome", roughness = 0.16) {
  const key = `metal:${kind}:${roughness}`;
  if (cache.has(key)) return cache.get(key);
  const mat = new THREE.MeshPhysicalMaterial({
    color: metalColors[kind] || metalColors.chrome,
    metalness: 1,
    roughness,
    clearcoat: kind === "chrome" ? 0.35 : 0.1,
    envMapIntensity: 1.15,
  });
  cache.set(key, mat);
  return mat;
}

export function shellMaterial(build, piece) {
  const finish = piece.finish || build.finish;
  const shell = piece.shell || build.shell;
  const key = `shell:${shell}:${finish}`;
  if (cache.has(key)) return cache.get(key);
  if (finish === "chrome" || finish === "chrome-over-brass" || shell === "steel") {
    const mat = metalMaterial("chrome", finish === "chrome-over-brass" ? 0.2 : 0.12);
    cache.set(key, mat);
    return mat;
  }
  if (shell === "brass" && finish !== "nickel-brass") {
    const mat = metalMaterial("brass", 0.28);
    cache.set(key, mat);
    return mat;
  }
  if (finish === "nickel-brass") {
    const mat = metalMaterial("nickel", 0.32);
    cache.set(key, mat);
    return mat;
  }
  const map = finishTexture(finish);
  const lacquer = finish === "ply-gloss" || finish === "clear-lacquer" || finish === "rainforest" || finish === "copper-mist" || finish === "oyster-black-pearl" || finish === "red-mahogany";
  const mat = new THREE.MeshPhysicalMaterial({
    map: map || null,
    color: map ? "#ffffff" : "#c4a574",
    roughness: finish === "natural-satin" ? 0.62 : lacquer ? 0.28 : 0.45,
    metalness: finish === "copper-mist" ? 0.35 : finish === "oyster-black-pearl" ? 0.18 : 0.02,
    clearcoat: lacquer ? 0.72 : 0.08,
    clearcoatRoughness: 0.18,
    envMapIntensity: 0.85,
  });
  cache.set(key, mat);
  return mat;
}

export function headMaterial(kind) {
  const key = `head:${kind}`;
  if (cache.has(key)) return cache.get(key);
  const map = canvasTexture((ctx) => {
    ctx.fillStyle = kind === "calfskin" ? "#e7d3a4" : "#ece7dc";
    ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = kind === "calfskin" ? "rgba(120,90,50,0.35)" : "rgba(80,70,60,0.2)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      ctx.ellipse(256, 256, 40 + i * 12, 40 + i * 12, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  });
  const mat = new THREE.MeshPhysicalMaterial({
    map,
    roughness: kind === "calfskin" ? 0.72 : 0.55,
    metalness: 0,
    clearcoat: kind === "coated" ? 0.15 : 0,
    envMapIntensity: 0.35,
  });
  cache.set(key, mat);
  return mat;
}

export function hoopMaterial(build, hoop) {
  if (hoop === "wood") {
    const key = "hoop-wood";
    if (cache.has(key)) return cache.get(key);
    const map = finishTexture(build.finish === "real-wood" ? "real-wood" : "natural-maple");
    const mat = new THREE.MeshPhysicalMaterial({
      map,
      roughness: 0.48,
      metalness: 0.02,
      clearcoat: 0.25,
    });
    cache.set(key, mat);
    return mat;
  }
  const metal = build.hoopMetal || build.hardware || "chrome";
  return metalMaterial(metal, hoop === "diecast" ? 0.2 : 0.14);
}
