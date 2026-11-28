// Výsledky Form Factory Hybrid Games: soupiska + skóre z karet vln.
// GET  /api/results  -> veřejný stav (soupiska, zapsaná kola/navíc)
// POST /api/results  -> zápis, chráněný PINem (env RESULTS_PIN), hlavička x-pin
import { getStore } from "@netlify/blobs";

const KEY = "state";
const empty = () => ({ athletes: [], scores: {}, lastWave: null, updated: null });
const json = (o, status = 200) =>
  new Response(JSON.stringify(o), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const int = (v, min, max) => Number.isInteger(v) && v >= min && v <= max;

export default async (req) => {
  const store = getStore({ name: "hybrid-games", consistency: "strong" });
  const load = async () => (await store.get(KEY, { type: "json" })) || empty();

  if (req.method === "GET") return json(await load());
  if (req.method !== "POST") return json({ error: "Metoda není povolená." }, 405);

  const pin = (globalThis.Netlify?.env?.get("RESULTS_PIN")) || process.env.RESULTS_PIN;
  if (!pin || req.headers.get("x-pin") !== pin) return json({ error: "Špatný PIN." }, 401);

  let body;
  try { body = await req.json(); } catch { return json({ error: "Neplatná data." }, 400); }
  const s = await load();

  if (body.action === "check") return json({ ok: true });

  if (body.action === "roster") {
    const list = Array.isArray(body.athletes) ? body.athletes : null;
    if (!list || list.length > 200) return json({ error: "Soupiska chybí nebo je moc dlouhá." }, 400);
    const seen = new Set();
    for (const a of list) {
      if (!int(a.no, 1, 9999) || typeof a.name !== "string" || !a.name.trim() || !["W", "M"].includes(a.cat) || !int(a.wave, 1, 99) || !int(a.lane, 1, 8))
        return json({ error: `Chybný řádek soupisky: ${JSON.stringify(a)}` }, 400);
      if (seen.has(a.no)) return json({ error: `Startovní číslo ${a.no} je v soupisce dvakrát.` }, 400);
      seen.add(a.no);
    }
    s.athletes = list.map((a) => ({ no: a.no, name: a.name.trim().slice(0, 60), cat: a.cat, wave: a.wave, lane: a.lane }));
    for (const no of Object.keys(s.scores)) if (!seen.has(+no)) delete s.scores[no];
  } else if (body.action === "wave") {
    const e = body.entries;
    if (!e || typeof e !== "object") return json({ error: "Chybí výsledky vlny." }, 400);
    for (const [no, r] of Object.entries(e)) {
      if (!s.athletes.some((a) => a.no === +no)) return json({ error: `Atlet ${no} není v soupisce.` }, 400);
      if (r === null) { delete s.scores[no]; continue; }
      if (!Array.isArray(r) || r.length !== 5 || !r.every((x) => x && int(x.k, 0, 200) && int(x.x, 0, 200)))
        return json({ error: `Chybné skóre u atleta ${no}.` }, 400);
      s.scores[no] = r.map((x) => ({ k: x.k, x: x.x }));
    }
    s.lastWave = int(body.wave, 1, 99) ? body.wave : s.lastWave;
  } else if (body.action === "reset") {
    s.scores = {}; s.lastWave = null;
  } else {
    return json({ error: "Neznámá akce." }, 400);
  }

  s.updated = new Date().toISOString();
  await store.setJSON(KEY, s);
  return json(s);
};

export const config = { path: "/api/results" };
