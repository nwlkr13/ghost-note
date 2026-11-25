// Ghost Note — KitModal
// Kit detail panel. Phase 2 keeps this inline inside KitCard, in the same
// place the expand panel occupied in Phase 1, so the archive layout holds.

export default function KitModal({ kit, onClose }) {
  if (!kit) return null;

  return (
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
        onClick={e => {
          e.stopPropagation();
          onClose();
        }}
      >
        CLOSE
      </button>
    </div>
  );
}

const styles = {
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
};
