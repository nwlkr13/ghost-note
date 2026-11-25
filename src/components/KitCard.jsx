// Ghost Note — KitCard
// Vinyl record, or the kit illustration when one is set. Detail opens inline.

import KitModal from "./KitModal.jsx";

export default function KitCard({ kit, selected, onSelect, onClose, index }) {
  return (
    <div
      className="kit-card"
      style={{
        ...styles.card,
        animationDelay: `${index * 60}ms`,
        borderColor: selected ? kit.color : "transparent",
      }}
      onClick={onSelect}
    >
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

      {selected && <KitModal kit={kit} onClose={onClose} />}
    </div>
  );
}

const styles = {
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
};
