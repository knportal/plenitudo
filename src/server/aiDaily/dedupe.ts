export function normalizeTitle(t: string) {
  return t
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function trigrams(s: string) {
  const n = normalizeTitle(s);
  const set = new Set<string>();
  for (let i = 0; i < n.length - 2; i++) set.add(n.slice(i, i + 3));
  return set;
}
export function trigramSim(a: string, b: string) {
  const A = trigrams(a),
    B = trigrams(b);
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  return inter / (A.size + B.size - inter || 1);
}
// Cluster by similarity ≥ 0.35
export function clusterByTitle<T extends { title: string }>(items: T[], threshold = 0.35): T[][] {
  const clusters: T[][] = [];
  for (const it of items) {
    let placed = false;
    for (const c of clusters) {
      if (trigramSim(c[0].title, it.title) >= threshold) {
        c.push(it);
        placed = true;
        break;
      }
    }
    if (!placed) clusters.push([it]);
  }
  return clusters;
}
