export function truncate(text = "", n = 160) {
  const s = text.replace(/\s+/g, " ").trim();
  if (s.length <= n) return s;
  const cut = s.slice(0, n);
  return cut.slice(0, cut.lastIndexOf(" ")).concat("…");
}
