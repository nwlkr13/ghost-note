import { useState, useRef } from "react";
import { kits, eras, origins } from "./data/kits.js";
import FilterBar from "./components/FilterBar.jsx";
import KitCard from "./components/KitCard.jsx";

export default function GhostNote() {
  const [filter, setFilter] = useState({ era: "All", origin: "All", search: "" });
  const [selected, setSelected] = useState(null);
  const [, setRevealed] = useState({});
  const headerRef = useRef(null);

  const filtered = kits.filter(k => {
    const eraMatch = filter.era === "All" || k.era === filter.era;
    const originMatch = filter.origin === "All" || k.origin === filter.origin;
    const searchMatch =
      filter.search === "" ||
      k.make.toLowerCase().includes(filter.search.toLowerCase()) ||
      k.model.toLowerCase().includes(filter.search.toLowerCase()) ||
      k.builder.toLowerCase().includes(filter.search.toLowerCase()) ||
      k.tags.some(t => t.toLowerCase().includes(filter.search.toLowerCase()));
    return eraMatch && originMatch && searchMatch;
  });

  const handleReveal = (id) => {
    setRevealed(r => ({ ...r, [id]: true }));
    setTimeout(() => setSelected(id), 50);
  };

  return (
    <div style={styles.root}>
      <style>{css}</style>

      <header style={styles.header} ref={headerRef}>
        <div style={styles.headerInner}>
          <div style={styles.logoWrap}>
            <div style={styles.logoIcon}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="#c0392b" strokeWidth="1.5" />
                <circle cx="16" cy="16" r="8" stroke="#c0392b" strokeWidth="1" opacity="0.5" />
                <circle cx="16" cy="16" r="3" fill="#c0392b" />
                <line x1="16" y1="2" x2="16" y2="6" stroke="#c0392b" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <div style={styles.logoText}>GHOST NOTE</div>
              <div style={styles.logoSub}>THE DRUM KIT ARCHIVE</div>
            </div>
          </div>
          <div style={styles.kitCount}>{filtered.length} KITS</div>
        </div>
      </header>

      <FilterBar
        filter={filter}
        eras={eras}
        origins={origins}
        onFilterChange={partial => setFilter(f => ({ ...f, ...partial }))}
      />

      <main style={styles.grid}>
        {filtered.map((kit, i) => (
          <KitCard
            key={kit.id}
            kit={kit}
            index={i}
            selected={selected === kit.id}
            onSelect={() => handleReveal(kit.id)}
            onClose={() => setSelected(null)}
          />
        ))}
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <span>GHOST NOTE © 2026</span>
          <span style={styles.footerSep}>—</span>
          <span>THE DRUM KIT ARCHIVE</span>
          <span style={styles.footerSep}>—</span>
          <span style={{ color: "#c0392b" }}>PHASE I</span>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#e8e0d0",
    fontFamily: "'Courier New', monospace",
    backgroundImage: `
      radial-gradient(ellipse at 20% 50%, rgba(192,57,43,0.04) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 20%, rgba(180,140,80,0.03) 0%, transparent 50%),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")
    `,
  },
  header: {
    borderBottom: "1px solid #1f1f1f",
    padding: "24px 40px",
    position: "sticky",
    top: 0,
    background: "rgba(10,10,10,0.95)",
    backdropFilter: "blur(10px)",
    zIndex: 100,
  },
  headerInner: {
    maxWidth: 1400,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoWrap: { display: "flex", alignItems: "center", gap: 16 },
  logoIcon: { display: "flex" },
  logoText: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: "0.3em",
    color: "#e8e0d0",
    lineHeight: 1,
  },
  logoSub: {
    fontSize: 9,
    letterSpacing: "0.4em",
    color: "#555",
    marginTop: 4,
  },
  kitCount: {
    fontSize: 10,
    letterSpacing: "0.3em",
    color: "#444",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 1,
    padding: "1px",
    maxWidth: 1400,
    margin: "0 auto",
  },
  footer: {
    borderTop: "1px solid #111",
    padding: "24px 40px",
    marginTop: 40,
  },
  footerInner: {
    maxWidth: 1400,
    margin: "0 auto",
    display: "flex",
    gap: 16,
    fontSize: 9,
    letterSpacing: "0.3em",
    color: "#333",
    alignItems: "center",
  },
  footerSep: { color: "#1f1f1f" },
};

const css = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes expandIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .kit-card:hover {
    background: #101010 !important;
  }
  .kit-card:hover .record {
    transform: rotate(15deg) !important;
  }
  .kit-card:hover .kit-illustration {
    transform: scale(1.04) translateY(-2px) !important;
  }
  .filter-btn:hover {
    border-color: #333 !important;
    color: #888 !important;
  }
  * { box-sizing: border-box; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0a0a0a; }
  ::-webkit-scrollbar-thumb { background: #1f1f1f; }
`;
