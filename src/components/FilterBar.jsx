// Ghost Note — FilterBar
// Era, origin, and search. Markup lifted from GhostNote.jsx in Phase 2.

export default function FilterBar({ filter, onFilterChange, eras, origins }) {
  return (
    <div style={styles.filterBar}>
      <input
        style={styles.search}
        placeholder="Search makes, models, builders..."
        value={filter.search}
        onChange={e => onFilterChange({ search: e.target.value })}
      />
      <div style={styles.filterGroup}>
        <span style={styles.filterLabel}>ERA</span>
        {eras.map(e => (
          <button
            key={e}
            style={{ ...styles.filterBtn, ...(filter.era === e ? styles.filterBtnActive : {}) }}
            onClick={() => onFilterChange({ era: e })}
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
            onClick={() => onFilterChange({ origin: o })}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
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
};
