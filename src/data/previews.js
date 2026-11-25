const modules = import.meta.glob("../assets/previews/*.png", {
  eager: true,
  import: "default",
});

export function previewSrc(id) {
  return modules[`../assets/previews/${id}.png`] || null;
}
