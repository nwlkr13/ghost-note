import { Component, useLayoutEffect, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { createKitObject } from "../three/kitFactory.js";

class ViewerError extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

function Studio() {
  const { scene, gl } = useThree();
  useLayoutEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = pmrem.fromScene(room, 0.04);
    scene.environment = target.texture;
    return () => {
      target.dispose();
      pmrem.dispose();
      room.clear();
    };
  }, [gl, scene]);
  return (
    <>
      <ambientLight intensity={0.22} />
      <hemisphereLight args={["#d7dbe2", "#1a1a1a", 0.45]} />
      <directionalLight
        position={[12, 22, 14]}
        intensity={1.7}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0004}
        shadow-camera-near={1}
        shadow-camera-far={90}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
      />
      <directionalLight position={[-10, 8, -6]} intensity={0.6} color="#d6e2ff" />
    </>
  );
}

function Fit({ object }) {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls);
  const size = useThree((s) => s.size);
  useLayoutEffect(() => {
    if (!object) return;
    const box = new THREE.Box3().setFromObject(object);
    if (box.isEmpty()) return;
    const center = box.getCenter(new THREE.Vector3());
    const dims = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(dims.x, dims.y, dims.z, 6);
    const fov = (camera.fov * Math.PI) / 180;
    const dist = ((maxDim / 2) / Math.tan(fov / 2)) * 1.12;
    camera.position.set(center.x + dist * 0.78, center.y + dist * 0.36, center.z + dist * 0.82);
    camera.near = Math.max(0.05, dist / 80);
    camera.far = dist * 12;
    camera.updateProjectionMatrix();
    camera.lookAt(center);
    if (controls) {
      controls.target.copy(center);
      controls.minDistance = maxDim * 0.45;
      controls.maxDistance = maxDim * 3.2;
      controls.update();
    }
  }, [object, camera, controls, size.width, size.height]);
  return null;
}

function Stage({ kit, spin }) {
  const object = useMemo(() => createKitObject(kit), [kit]);
  return (
    <>
      <Studio />
      <primitive object={object} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[160, 160]} />
        <meshStandardMaterial color="#101010" roughness={0.92} metalness={0.02} />
      </mesh>
      <OrbitControls
        makeDefault
        enablePan={false}
        autoRotate={spin}
        autoRotateSpeed={spin ? 10 : 1.1}
        enableDamping
      />
      <Fit object={object} />
    </>
  );
}

export default function KitViewer({ kit, fill = false, spin = false }) {
  const fallback = kit.illustration ? (
    <img
      src={kit.illustration}
      alt={`${kit.make} ${kit.model} illustration`}
      style={{ width: "100%", height: fill ? "100%" : 300, objectFit: "contain" }}
    />
  ) : null;

  return (
    <ViewerError fallback={fallback}>
      <div style={{ ...styles.frame, height: fill ? "100%" : 320 }}>
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ fov: 32, position: [40, 22, 46] }}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.02,
          }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
        >
          <color attach="background" args={["#0a0a0a"]} />
          <Stage kit={kit} spin={spin} />
        </Canvas>
        <div style={styles.hint}>
          DRAG TO ROTATE
          {kit.build && kit.build.representative ? "  ·  REPRESENTATIVE SIZES" : ""}
        </div>
      </div>
    </ViewerError>
  );
}

const styles = {
  frame: {
    position: "relative",
    width: "100%",
    background: "#0a0a0a",
    border: "1px solid #1f1f1f",
    overflow: "hidden",
  },
  hint: {
    position: "absolute",
    left: 12,
    bottom: 10,
    fontFamily: "'Courier New', monospace",
    fontSize: 10,
    letterSpacing: "0.18em",
    color: "#555",
    pointerEvents: "none",
  },
};
