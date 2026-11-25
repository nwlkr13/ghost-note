import GhostNote from "./src/GhostNote.jsx";
import ShotPage from "./src/ShotPage.jsx";

export default function App() {
  const shot = new URLSearchParams(window.location.search).get("shot");
  if (shot) return <ShotPage id={shot} />;
  return <GhostNote />;
}
