import { useState, useEffect, useRef } from "react";
import { kits, eras, origins } from "./data/kits.js";

export default function GhostNote() {
  const [filter, setFilter] = useState({ era: "All", origin: "All", search: "" });
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState({});
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

      {/* Header */}
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

      {/* Filters */}
      <div style={styles.filterBar}>
        <input
          style={styles.search}
          placeholder="Search makes, models, builders..."
          value={filter.search}
          onChange={e => setFilter(f => ({ ...f, search: e.target.value }))}
        />
        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>ERA</span>
          {eras.map(e => (
            <button
              key={e}
              style={{ ...styles.filterBtn, ...(filter.era === e ? styles.filterBtnActive : {}) }}
              onClick={() => setFilter(f => ({ ...f, era: e }))}
            >
              {e}
            </button>
          ))}
        </div>
        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>ORIGIN</span>
          {origins.map(o => (
            <button
              key={o}
              style={{ ...styles.filterBtn, ...(filter.origin === o ? styles.filterBtnActive : {}) }}
              onClick={() => setFilter(f => ({ ...f, origin: o }))}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <main style={styles.grid}>
        {filtered.map((kit, i) => (
          <div
            key={kit.id}
            className="kit-card"
            style={{
              ...styles.card,
              animationDelay: `${i * 60}ms`,
              borderColor: selected === kit.id ? kit.color : "transparent"
            }}
            onClick={() => handleReveal(kit.id)}
          >
            {/* Visual: illustration if present, else vinyl record */}
            {kit.illustration ? (
              <div style={styles.illustrationWrap}>
                <img
                  src={kit.illustration}
                  alt={`${kit.make} ${kit.model} illustration`}
                  className="kit-illustration"
                  style={styles.illustration}
                />
                <div style={styles.illustrationGlow} />
              </div>
            ) : (
              <div style={styles.recordWrap}>
                <div className="record" style={styles.record}>
                  <div style={{ ...styles.recordLabel, background: kit.color }}>
                    <div style={styles.recordMake}>{kit.make}</div>
                    <div style={styles.recordModel}>{kit.model}</div>
                    <div style={styles.recordYear}>{kit.year}</div>
                  </div>
                  <div style={styles.recordHole} />
                </div>
                <div className="record-shadow" style={styles.recordShadow} />
              </div>
            )}

            {/* Info */}
            <div style={styles.cardBody}>
              <div style={styles.cardMake}>{kit.make}</div>
              <div style={styles.cardModel}>{kit.model}</div>
              <div style={styles.cardMeta}>
                <span style={{ color: kit.color }}>{kit.year}</span>
                <span style={styles.dot}>·</span>
                <span>{kit.origin}</span>
              </div>
              <div style={styles.tags}>
                {kit.tags.map(t => (
                  <span key={t} style={{ ...styles.tag, borderColor: kit.color + "55", color: kit.color }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Expanded */}
            {selected === kit.id && (
              <div className="expand-panel" style={styles.expandPanel}>
                <div style={styles.expandSection}>
                  <div style={styles.expandLabel}>BUILDER</div>
                  <div style={styles.expandValue}>{kit.builder}</div>
                </div>
                <div style={styles.expandSection}>
                  <div style={styles.expandLabel}>MATERIALS</div>
                  <div style={styles.expandValue}>{kit.materials.join(", ")}</div>
                </div>
                <div style={styles.expandSection}>
                  <div style={styles.expandLabel}>SPECS</div>
                  {Object.entries(kit.specs).map(([k, v]) => (
                    <div key={k} style={styles.specRow}>
                      <span style={styles.specKey}>{k.toUpperCase()}</span>
                      <span style={styles.specVal}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={styles.expandSection}>
                  <div style={styles.expandLabel}>FUN FACT</div>
                  <div style={{ ...styles.expandValue, ...styles.funFact }}>{kit.funFact}</div>
                </div>
                <button
                  style={styles.closeBtn}
                  onClick={e => { e.stopPropagation(); setSelected(null); }}
                >
                  CLOSE
                </button>
              </div>
            )}
          </div>
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
  filterBar: {
    padding: "20px 40px",
    borderBottom: "1px solid #111",
    maxWidth: 1400,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  search: {
    background: "#111",
    border: "1px solid #222",
    color: "#e8e0d0",
    padding: "10px 16px",
    fontSize: 12,
    letterSpacing: "0.05em",
    fontFamily: "'Courier New', monospace",
    outline: "none",
    width: "100%",
    maxWidth: 400,
    boxSizing: "border-box",
  },
  filterGroup: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  filterLabel: {
    fontSize: 9,
    letterSpacing: "0.3em",
    color: "#444",
    marginRight: 4,
  },
  filterBtn: {
    background: "transparent",
    border: "1px solid #1f1f1f",
    color: "#555",
    padding: "4px 10px",
    fontSize: 10,
    letterSpacing: "0.1em",
    cursor: "pointer",
    fontFamily: "'Courier New', monospace",
    transition: "all 0.2s",
  },
  filterBtnActive: {
    background: "#c0392b",
    border: "1px solid #c0392b",
    color: "#fff",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 1,
    padding: "1px",
    maxWidth: 1400,
    margin: "0 auto",
  },
  card: {
    background: "#0d0d0d",
    border: "1px solid transparent",
    cursor: "pointer",
    padding: "32px 24px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    transition: "all 0.3s ease",
    animation: "fadeSlideUp 0.5s ease both",
    position: "relative",
    overflow: "hidden",
  },
  recordWrap: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    height: 160,
  },
  record: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    background: "#111",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    boxShadow: "0 0 0 1px #222, 0 0 0 8px #111, 0 0 0 9px #1a1a1a, 0 0 0 20px #111, 0 0 0 21px #1a1a1a",
    flexShrink: 0,
    transition: "transform 0.4s ease",
    backgroundImage: `repeating-radial-gradient(circle at center, transparent 0px, transparent 4px, rgba(255,255,255,0.015) 4px, rgba(255,255,255,0.015) 5px)`,
  },
  recordLabel: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    textAlign: "center",
  },
  recordMake: { fontSize: 7, fontWeight: "bold", letterSpacing: "0.1em", color: "rgba(255,255,255,0.9)", lineHeight: 1 },
  recordModel: { fontSize: 6, color: "rgba(255,255,255,0.7)", lineHeight: 1.2, marginTop: 2 },
  recordYear: { fontSize: 8, color: "rgba(255,255,255,0.9)", marginTop: 3, fontWeight: "bold" },
  recordHole: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#0a0a0a",
    border: "1px solid #333",
  },
  recordShadow: {
    position: "absolute",
    bottom: -8,
    width: 130,
    height: 20,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.6)",
    filter: "blur(10px)",
  },
  illustrationWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: 160,
    overflow: "hidden",
  },
  illustration: {
    width: "100%",
    maxWidth: 280,
    height: 160,
    objectFit: "contain",
    transition: "transform 0.4s ease",
    filter: "drop-shadow(0 8px 20px rgba(192,57,43,0.15))",
  },
  illustrationGlow: {
    position: "absolute",
    bottom: -10,
    left: "50%",
    transform: "translateX(-50%)",
    width: 200,
    height: 24,
    borderRadius: "50%",
    background: "radial-gradient(ellipse, rgba(192,57,43,0.25) 0%, transparent 70%)",
    filter: "blur(8px)",
    pointerEvents: "none",
  },
  cardBody: { display: "flex", flexDirection: "column", gap: 6 },
  cardMake: { fontSize: 10, letterSpacing: "0.3em", color: "#555", textTransform: "uppercase" },
  cardModel: { fontSize: 18, fontWeight: "bold", letterSpacing: "0.05em", color: "#e8e0d0", lineHeight: 1.2 },
  cardMeta: { fontSize: 11, color: "#555", letterSpacing: "0.1em", display: "flex", gap: 8, alignItems: "center" },
  dot: { color: "#333" },
  tags: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 },
  tag: {
    fontSize: 9,
    letterSpacing: "0.2em",
    border: "1px solid",
    padding: "2px 8px",
    textTransform: "uppercase",
  },
  expandPanel: {
    borderTop: "1px solid #1a1a1a",
    paddingTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    animation: "expandIn 0.3s ease",
  },
  expandSection: { display: "flex", flexDirection: "column", gap: 6 },
  expandLabel: { fontSize: 9, letterSpacing: "0.3em", color: "#444" },
  expandValue: { fontSize: 12, color: "#aaa", lineHeight: 1.6 },
  specRow: { display: "flex", gap: 12, alignItems: "baseline" },
  specKey: { fontSize: 9, letterSpacing: "0.2em", color: "#444", minWidth: 60 },
  specVal: { fontSize: 11, color: "#888" },
  funFact: {
    borderLeft: "2px solid #c0392b",
    paddingLeft: 12,
    fontStyle: "italic",
    color: "#888",
  },
  closeBtn: {
    alignSelf: "flex-start",
    background: "transparent",
    border: "1px solid #222",
    color: "#444",
    padding: "6px 16px",
    fontSize: 9,
    letterSpacing: "0.3em",
    cursor: "pointer",
    fontFamily: "'Courier New', monospace",
    marginTop: 4,
    transition: "all 0.2s",
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
