/* Form Factory Hybrid Games · výpočet bodů a vykreslení výsledků (sdílí /result/ i /result/zapis/) */
window.HG = (function () {
  const ST = [
    { k: 'A', n: 'SkiErg / Wall balls', v: { W: 25, M: 27 } },
    { k: 'B', n: 'Echo Bike / Snatch', v: { W: 22, M: 25 } },
    { k: 'C', n: 'Sled push / pull', v: { W: 2, M: 2 } },
    { k: 'D', n: 'RowErg / Burpees', v: { W: 25, M: 27 } },
    { k: 'E', n: 'Shuttle / Lunges', v: { W: 8, M: 8 } }
  ];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const f1 = (n) => (Math.round(n * 10) / 10).toLocaleString('cs-CZ', { maximumFractionDigits: 1 });
  const score = (a, r, i) => r[i].k * ST[i].v[a.cat] + r[i].x;

  /* body za stanoviště = 100 × (N − pořadí) / (N − 1); shoda = průměrné pořadí; při shodě celku rozhoduje E, pak C */
  function rank(state, cat) {
    const L = state.athletes.filter((a) => a.cat === cat);
    const done = L.filter((a) => state.scores[a.no]);
    const N = done.length;
    const pts = new Map(done.map((a) => [a.no, [0, 0, 0, 0, 0]]));
    const sc = (a, i) => score(a, state.scores[a.no], i);
    ST.forEach((s, i) => {
      const arr = done.map((a) => ({ a, v: sc(a, i) })).sort((p, q) => q.v - p.v);
      let j = 0;
      while (j < arr.length) {
        let k = j;
        while (k + 1 < arr.length && arr[k + 1].v === arr[j].v) k++;
        const r = (j + k + 2) / 2;
        for (let m = j; m <= k; m++) pts.get(arr[m].a.no)[i] = N > 1 ? (100 * (N - r)) / (N - 1) : 100;
        j = k + 1;
      }
    });
    const rows = done
      .map((a) => ({ a, p: pts.get(a.no), t: pts.get(a.no).reduce((x, y) => x + y, 0) }))
      .sort((p, q) => q.t - p.t || sc(q.a, 4) - sc(p.a, 4) || sc(q.a, 2) - sc(p.a, 2) || p.a.no - q.a.no);
    let pos = 0;
    rows.forEach((r, i) => {
      const prev = rows[i - 1];
      if (!prev || prev.t !== r.t || sc(prev.a, 4) !== sc(r.a, 4) || sc(prev.a, 2) !== sc(r.a, 2)) pos = i + 1;
      r.pos = pos;
    });
    const wait = L.filter((a) => !state.scores[a.no]).sort((p, q) => p.wave - q.wave || p.lane - q.lane);
    return { rows, wait, N, total: L.length };
  }

  function boards(state, el, freshWave) {
    el.innerHTML = '';
    [['W', 'Ženy'], ['M', 'Muži']].forEach(([cat, lbl]) => {
      const { rows, wait, N, total } = rank(state, cat);
      if (!total) return;
      let h = '<div class="board"><div class="bh"><b>' + lbl + '</b><span>' + N + ' / ' + total + ' zapsáno</span></div><table class="lb"><thead><tr><th>#</th><th class="n">Atlet</th><th>Body</th></tr></thead><tbody>';
      rows.forEach((r) => {
        const cls = (r.pos <= 3 ? 'top ' : '') + (freshWave && r.a.wave === freshWave ? 'new' : '');
        h += '<tr class="' + cls + '"><td class="pos">' + r.pos + '</td><td class="n"><small>' + r.a.no + '</small>' + esc(r.a.name) + '</td><td class="tot">' + f1(r.t) + '</td></tr>';
      });
      wait.forEach((a) => {
        h += '<tr class="wait"><td class="pos">–</td><td class="n"><small>' + a.no + '</small>' + esc(a.name) + '</td><td class="tot">vlna ' + a.wave + '</td></tr>';
      });
      el.insertAdjacentHTML('beforeend', h + '</tbody></table></div>');
    });
  }

  /* rozdíl hodin TV a serveru, aby všechny obrazovky ukazovaly stejný čas */
  let skew = 0;
  async function load() {
    const t1 = Date.now();
    const r = await fetch('/api/results', { cache: 'no-store' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const j = await r.json();
    if (j.now) skew = j.now - (t1 + Date.now()) / 2;
    return j;
  }
  const now = () => Date.now() + skew;

  /* časomíra: vlny po 5:30, na stanovišti 4:00 práce + 1:30 přesun, 5 stanovišť A–E */
  const GAP = 330, WORK = 240;
  function race(state, t) {
    const waves = Math.max(10, ...state.athletes.map((a) => a.wave));
    const t0 = state.timer && state.timer.t0;
    const e = (t - t0) / 1000;
    const startOf = (w) => t0 + (w - 1) * GAP * 1000;
    if (e < 0) return { phase: 'pre', left: -e, n: -1, waves, prep: 1, prepIn: -e, startOf, st: [null, null, null, null, null] };
    const n = Math.floor(e / GAP), inB = e - n * GAP;
    if (n >= waves + 4) return { phase: 'done', left: 0, n, waves, prep: null, startOf, st: [null, null, null, null, null] };
    const st = [0, 1, 2, 3, 4].map((s) => { const w = n - s + 1; return w >= 1 && w <= waves ? w : null; });
    const work = inB < WORK;
    const prep = n + 2 <= waves ? n + 2 : null;
    return { phase: work ? 'work' : 'move', left: work ? WORK - inB : GAP - inB, frac: work ? inB / WORK : (inB - WORK) / (GAP - WORK), n, waves, st, prep, prepIn: prep ? (startOf(prep) - t) / 1000 : 0, startOf };
  }
  const mmss = (s) => { s = Math.max(0, Math.ceil(s)); const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60; return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(x).padStart(2, '0'); };
  const hhmm = (ms) => { const d = new Date(ms); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') + (d.getSeconds() ? ':' + String(d.getSeconds()).padStart(2, '0') : ''); };

  return { ST, esc, f1, score, rank, boards, load, now, race, mmss, hhmm, GAP, WORK };
})();
