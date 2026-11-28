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

  async function load() {
    const r = await fetch('/api/results', { cache: 'no-store' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  }

  return { ST, esc, f1, score, rank, boards, load };
})();
