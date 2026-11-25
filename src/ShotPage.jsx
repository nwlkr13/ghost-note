import { Suspense, lazy } from "react";
import { kits } from "./data/kits.js";

const KitViewer = lazy(() => import("./components/KitViewer.jsx"));

export default function ShotPage({ id }) {
  const params = new URLSearchParams(window.location.search);
  const kit = kits.find((entry) => String(entry.id) === String(id));
  if (!kit) return null;
  return (
    <div style={{ background: "#0a0a0a", height: "100vh", width: "100vw" }}>
      <Suspense fallback={null}>
        <KitViewer kit={kit} fill spin={params.get("spin") === "1"} />
      </Suspense>
    </div>
  );
}
