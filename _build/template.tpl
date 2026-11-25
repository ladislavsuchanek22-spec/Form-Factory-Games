<header class="nav">
  <div class="wrap">
    <a class="brand" href="${HOME}">
      <span class="brand-mark"><img src="/img/ff-logo.jpg" alt="Form Factory" width="40" height="40"></span>
      <span class="brand-t"><b>Form Factory</b><i>Hybrid Games</i></span>
    </a>
    <ul>
      <li><a href="#workouty">${nav_wo}</a></li>
      <li><a href="#zateze">${nav_wt}</a></li>
      <li><a href="#vlny">${nav_wv}</a></li>
      <li><a href="#program">${nav_pg}</a></li>
      <li><a href="#priprava">${prep_eb}</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
    <div class="nav-r">
      <nav class="lsw" aria-label="${lang_aria}">${LANGLINKS}</nav>
      <a class="btn btn-ghost" href="#registrace">${nav_reg} ›</a>
    </div>
  </div>
</header>

<main id="top">
  <section class="hero">
    <div class="hero-img"><img src="/img/hero.webp" alt="${hero_alt}"></div>
    <div class="wrap hero-grid">
      <div class="hero-main">
      <p class="when"><b>Form Factory Vinohradská</b> <span>·</span> <b>${when_date}</b> <span>·</span> <span>${when_time}</span></p>
      <h1><span class="h1-s">Form Factory Hybrid</span><span class="h1-l">Games</span></h1>
      <p class="lead">${hero_lead}</p>
      <div class="hero-cta">
        <a class="btn btn-red" href="#registrace">${hero_cta1}</a>
        <a class="btn btn-ghost" href="#workouty">${hero_cta2} ›</a>
      </div>
      <div class="cdown" data-t="2026-12-05T09:00:00+01:00" hidden>
        <span class="lbl">${cd_h}</span>
        <div class="cd-u"><b data-u="d">00</b><small>${cd_d}</small></div>
        <div class="cd-u"><b data-u="h">00</b><small>${cd_hh}</small></div>
        <div class="cd-u"><b data-u="m">00</b><small>${cd_m}</small></div>
        <div class="cd-u"><b data-u="s">00</b><small>${cd_s}</small></div>
      </div>
      </div>
      <p class="hero-side"><b>Form Factory Hybrid Games</b><span>Vinohradská</span><span>${when_date}</span><span>40 × Hybrid Challenge</span></p>
    </div>
  </section>

  <div class="stats">
    <div class="wrap">
      <div class="stat"><strong>40</strong><span>${st1}</span></div>
      <div class="stat"><strong>5</strong><span>${st2}</span></div>
      <div class="stat"><strong>4:00</strong><span>${st3}</span></div>
      <div class="stat"><strong>2 h</strong><span>${st4}</span></div>
    </div>
  </div>

  <section class="concept">
    <div class="wrap">
      <div class="concept-text">
        <p class="eyebrow">${ab_eb}</p>
        <h2>${ab_h}</h2>
        <p>${ab_p1}</p>
        <p>${ab_p2}</p>
        <div class="cats">
          <div><span>${cat_w}</span><b>Women</b></div>
          <div><span>${cat_m}</span><b>Men</b></div>
        </div>
      </div>
      <figure>
        <img loading="lazy" decoding="async" src="/img/stations.webp" alt="${fig_alt}">
        <figcaption>${figcap}</figcaption>
      </figure>
    </div>
  </section>

  <section class="alt" id="workouty">
    <div class="wrap">
      <div class="sec-head">
        <p class="eyebrow">${nav_wo}</p>
        <h2>Hybrid<br>Challenge</h2>
        <p class="lead">${wo_lead}</p>
      </div>
      <div class="catpick">
        <span class="lbl" id="cp-l">${cp_lbl}</span>
        <div class="cp" role="group" aria-labelledby="cp-l">
          <button type="button" data-cat="0" aria-pressed="false">Women</button>
          <button type="button" data-cat="1" aria-pressed="false">Men</button>
        </div>
        <small>${cp_hint}</small>
      </div>
      <div class="wods">
        <article class="wod wod-hl">
          <figure class="wod-img"><img loading="lazy" decoding="async" src="/img/w2-wallball.webp" alt="Hybrid Challenge · RowErg" width="667" height="1000"></figure>
          <div class="wod-id">
            <span class="k">Hybrid Challenge · start 9:30</span>
            <h3>5 × 4:00</h3>
            <div class="fmt"><span>${f_work}</span><span>${f_move}</span><span>${f_four}</span></div>
            <p class="t">${wod_t}</p>
          </div>
          <div class="stations st5">
            <div class="st"><span class="l">A</span><b>SkiErg / Wall balls</b><ul><li><i class="wn" data-w="10|12">10/12</i>cal SkiErg</li><li><i>15</i>Wall balls</li></ul><em class="wt" data-w="Wall ball 4 kg|Wall ball 6 kg"></em><span class="sc">${sc_cr}</span></div>
            <div class="st"><span class="l">B</span><b>Echo Bike / DB Snatch</b><ul><li><i class="wn" data-w="7|10">7/10</i>cal Echo Bike</li><li><i>15</i>Alt. DB snatch</li></ul><em class="wt" data-w="DB 12,5 kg|DB 15 kg"></em><span class="sc">${sc_cr}</span></div>
            <div class="st"><span class="l">C</span><b>Sled</b><ul><li><i>12,5 m</i>Sled push</li><li><i>12,5 m</i>Sled pull</li></ul><em class="wt" data-w="150 kg|200 kg"></em><span class="sc">${sc_len}</span></div>
            <div class="st"><span class="l">D</span><b>RowErg / Burpees</b><ul><li><i class="wn" data-w="10|12">10/12</i>cal RowErg</li><li><i>15</i>Burpees over rower</li></ul><span class="sc">${sc_cr}</span></div>
            <div class="st"><span class="l">E</span><b>Shuttle / Lunges</b><ul><li><i>6 ×</i>12,5 m shuttle run</li><li><i>2 ×</i>12,5 m sandbag walking lunges</li></ul><em class="wt" data-w="Sandbag 10 kg|Sandbag 20 kg"></em><span class="sc">${sc_len8}</span></div>
          </div>
          <details class="tips"><summary>${tip_h}</summary><div class="tips-in"><ul><li>${t1}</li><li>${t2}</li><li>${t3}</li><li>${t4}</li><li>${t5}</li><li>${t6}</li></ul></div></details>
        </article>
      </div>
    </div>
  </section>

  <section id="zateze">
    <div class="wrap">
      <div class="sec-head">
        <p class="eyebrow">${nav_wt}</p>
        <h2>${wt_h}</h2>
        <p class="lead">${wt_lead}</p>
      </div>
      <div class="tbl-wrap">
        <table>
          <thead>
            <tr><th>${th_ex}</th><th class="cat">Women</th><th class="cat">Men</th></tr>
          </thead>
          <tbody>
            <tr><td>SkiErg</td><td>10 cal</td><td>12 cal</td></tr>
            <tr><td>Wall Balls</td><td>15 × 4 kg</td><td>15 × 6 kg</td></tr>
            <tr><td>Echo Bike</td><td>7 cal</td><td>10 cal</td></tr>
            <tr><td>Alt. DB Snatch</td><td>15 × 12,5 kg</td><td>15 × 15 kg</td></tr>
            <tr><td>Sled Push</td><td>150 kg</td><td>200 kg</td></tr>
            <tr><td>Sled Pull</td><td>150 kg</td><td>200 kg</td></tr>
            <tr><td>RowErg</td><td>10 cal</td><td>12 cal</td></tr>
            <tr><td>Sandbag Walking Lunges</td><td>10 kg</td><td>20 kg</td></tr>
          </tbody>
        </table>
      </div>
      <p class="note">${wt_note}</p>
    </div>
  </section>

  <section class="alt" id="vlny">
    <div class="wrap">
      <div class="wave-head">
        <div class="sec-head" style="margin:0">
          <p class="eyebrow">${wv_eb}</p>
          <h2>${wv_h}</h2>
        </div>
        <p class="lead">${wv_lead}</p>
      </div>
      <div class="rot-wrap">
        <div class="rot rot5">
          <div class="h">${rot_min}</div><div class="h l">A</div><div class="h l">B</div><div class="h l">C</div><div class="h l">D</div><div class="h l">E</div>
          <div>0:00–4:00</div><div class="w1">${wave} 1</div><div></div><div></div><div></div><div></div>
          <div>5:30–9:30</div><div class="wx">${wave} 2</div><div class="w1">${wave} 1</div><div></div><div></div><div></div>
          <div>11:00–15:00</div><div class="wx">${wave} 3</div><div class="wx">${wave} 2</div><div class="w1">${wave} 1</div><div></div><div></div>
          <div>16:30–20:30</div><div class="wx">${wave} 4</div><div class="wx">${wave} 3</div><div class="wx">${wave} 2</div><div class="w1">${wave} 1</div><div></div>
          <div class="last">22:00–26:00</div><div class="wx last">${wave} 5</div><div class="wx last">${wave} 4</div><div class="wx last">${wave} 3</div><div class="wx last">${wave} 2</div><div class="w1 last">${wave} 1</div>
        </div>
      </div>
      <p class="note">${wv_note}</p>

      <div class="cd-row">
        <div class="cd"><span class="t">−6 min</span><b>Call-up</b><p>${cd1}</p></div>
        <div class="cd"><span class="t">${cd2t}</span><b>${cd2h}</b><p>${cd2}</p></div>
        <div class="cd"><span class="t">${cd3t}</span><b>${cd3h}</b><p>${cd3}</p></div>
        <div class="cd"><span class="t">+1:30</span><b>${cd4h}</b><p>${cd4}</p></div>
      </div>

      <div class="finder" data-wave-word="${wave}">
        <div class="finder-in">
          <h3>${fd_h}</h3>
          <div class="fld">
            <label for="wave">${fd_wave}</label>
            <div class="ctl">
              <button type="button" class="wm" aria-label="−1">−</button>
              <input id="wave" class="wi" type="number" min="1" max="10" value="1" inputmode="numeric">
              <button type="button" class="wp" aria-label="+1">+</button>
            </div>
          </div>
          <div class="fld">
            <span class="lbl" id="lane-l">${fd_lane}</span>
            <div class="seg" role="group" aria-labelledby="lane-l">
              <button type="button" data-lane="1" aria-pressed="true">1</button>
              <button type="button" data-lane="2" aria-pressed="false">2</button>
              <button type="button" data-lane="3" aria-pressed="false">3</button>
              <button type="button" data-lane="4" aria-pressed="false">4</button>
            </div>
          </div>
          <small>${fd_small}</small>
          <button type="button" class="btn btn-ghost ics" data-sraz="${ics_sraz}" data-lane-word="${lane_w}" data-addr="Form Factory Vinohradská, ${addr}">${ics_btn}</button>
          <small>${ics_small}</small>
        </div>
        <div class="finder-out" aria-live="polite">
          <div class="fo fo-h"><span class="w"><em data-o="wv" style="font-style:normal">${wave} 1</em><small data-o="wn">${lane_w} 1</small></span><div><span>Call-up</span><strong data-o="c">9:24</strong></div><div><span>${fd_fin}</span><strong data-o="f">9:56</strong></div></div>
          <div class="fo"><span class="w">A<small>SkiErg / Wall balls</small></span><div><span>Start</span><strong data-o="s0" class="hi">9:30</strong></div><div><span>Stop</span><strong data-o="e0">9:34</strong></div></div>
          <div class="fo"><span class="w">B<small>Echo Bike / Snatch</small></span><div><span>Start</span><strong data-o="s1" class="hi">9:35:30</strong></div><div><span>Stop</span><strong data-o="e1">9:39:30</strong></div></div>
          <div class="fo"><span class="w">C<small>Sled</small></span><div><span>Start</span><strong data-o="s2" class="hi">9:41</strong></div><div><span>Stop</span><strong data-o="e2">9:45</strong></div></div>
          <div class="fo"><span class="w">D<small>RowErg / Burpees</small></span><div><span>Start</span><strong data-o="s3" class="hi">9:46:30</strong></div><div><span>Stop</span><strong data-o="e3">9:50:30</strong></div></div>
          <div class="fo"><span class="w">E<small>Shuttle / Lunges</small></span><div><span>Start</span><strong data-o="s4" class="hi">9:52</strong></div><div><span>Stop</span><strong data-o="e4">9:56</strong></div></div>
        </div>
      </div>
    </div>
  </section>

  <section class="day" id="program">
    <div class="wrap">
      <div class="day-img"><img loading="lazy" decoding="async" src="/img/ria-mic.webp" alt="${day_alt}"></div>
      <div>
        <div class="sec-head">
          <p class="eyebrow">${pg_eb}</p>
          <h2>${pg_h}</h2>
        </div>
        <ul class="sched">
          <li><span class="t">09:00</span><div><b>${s1h}</b><p>${s1}</p></div></li>
          <li><span class="t">09:10</span><div><b>Briefing</b><p>${s2}</p></div></li>
          <li><span class="t">09:15–09:30</span><div><b>${s3h}</b><p>${s3}</p></div></li>
          <li class="key"><span class="t">09:30–10:45</span><div><b>Hybrid Challenge</b><p>${s4}</p></div></li>
          <li><span class="t">09:45–09:55</span><div><b>${s5h}</b><p>${s5}</p></div></li>
          <li><span class="t">10:46–10:52</span><div><b>${s6h}</b><p>${s6}</p></div></li>
          <li class="key"><span class="t">10:52–11:00</span><div><b>${s7h}</b><p>${s7}</p></div></li>
        </ul>
        <div class="xmas"><b>${xm_h}</b><p>${xm_p} <span class="ph">${xm_ph}</span></p></div>
        <p class="note">${pg_note}</p>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="sec-head">
        <p class="eyebrow">${rl_eb}</p>
        <h2>${rl_h}</h2>
      </div>
      <div class="std">
        <div><b>${r1h}</b><p>${r1}</p></div>
        <div><b>${r2h}</b><p>${r2}</p></div>
        <div><b>Scorecard</b><p>${r3}</p></div>
      </div>
      <p class="note">${rl_note}</p>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <div class="sec-head">
        <p class="eyebrow">${tm_eb}</p>
        <h2>${tm_h}</h2>
        <p class="lead">${tm_lead}</p>
      </div>
      <div class="crew">
        <article><span class="role">Big Eye</span><h3>Ladislav Suchánek</h3><p>${c1}</p><a class="team-link vh" href="${U_HP}" target="_blank" rel="noopener" tabindex="-1">${c1_link}</a></article>
        <article><span class="role">Speaker</span><h3>Ria Suchánek Hrušovská</h3><p>${c2}</p><a class="team-link" href="https://www.instagram.com/riahrusovskaofficial/" target="_blank" rel="noopener">@riahrusovskaofficial</a></article>
        <article><span class="role">Head Judge</span><h3>Michal Holotík</h3><p>${c3}</p></article>
      </div>
      <p class="note">${tm_more} <a href="${U_HTC}" target="_blank" rel="noopener">${tm_more_link}</a></p>
      <div class="crew-band">
        <a class="btn btn-white crew-link" href="${U_CREW}">${link_main}</a>
      </div>
    </div>
  </section>

  <section class="prep" id="priprava">
    <div class="wrap">
      <div class="sec-head">
        <p class="eyebrow">${prep_eb}</p>
        <h2>${prep_h}</h2>
        <p class="lead">${prep_lead}</p>
      </div>
      <div class="prep-g">
        <div class="ck" data-of="${ck_of}">
          <div class="ck-top"><div class="ck-bar"><i></i></div><span class="ck-n">0 / 8 ${ck_of}</span><button type="button" class="ck-reset">${ck_reset}</button></div>
          <ul><li><label><input type="checkbox" data-k="1"><span>${ck1}</span></label></li><li><label><input type="checkbox" data-k="2"><span>${ck2}</span></label></li><li><label><input type="checkbox" data-k="3"><span>${ck3}</span></label></li><li><label><input type="checkbox" data-k="4"><span>${ck4}</span></label></li><li><label><input type="checkbox" data-k="5"><span>${ck5}</span></label></li><li><label><input type="checkbox" data-k="6"><span>${ck6}</span></label></li><li><label><input type="checkbox" data-k="7"><span>${ck7}</span></label></li><li><label><input type="checkbox" data-k="8"><span>${ck8}</span></label></li></ul>
          <p class="ck-done" hidden>${ck_done}</p>
        </div>
        <div class="venue">
          <span class="lbl">${ven_h}</span>
          <p class="ev-a">Form Factory Hybrid Games</p>
          <p class="ev-b">5. 12. 2026</p>
          <p class="ev-c">Vinohradská</p>
          <p class="ev-d">${addr}</p>
          <a class="btn btn-ghost" href="https://www.google.com/maps/search/?api=1&amp;query=Form+Factory+Vinohradsk%C3%A1+190+Praha" target="_blank" rel="noopener">${ven_map} ›</a>
          <span class="lbl">${ven_day}</span>
          <dl>
            <dt>09:00</dt><dd>${ven_r1}</dd>
            <dt>09:30</dt><dd>${ven_r2}</dd>
            <dt>10:52</dt><dd>${ven_r3}</dd>
            <dt>11:00</dt><dd>${ven_r4}</dd>
          </dl>
        </div>
      </div>
    </div>
  </section>

  <section class="alt" id="faq">
    <div class="wrap">
      <div class="sec-head">
        <p class="eyebrow">${fq_eb}</p>
        <h2>${fq_h}</h2>
      </div>
      <div class="faq-list">
        <details open><summary>${q1}</summary><p>${a1}</p></details>
        <details><summary>${q2}</summary><p>${a2}</p></details>
        <details><summary>${q3}</summary><p>${a3}</p></details>
        <details><summary>${q4}</summary><p>${a4}</p></details>
        <details><summary>${q5}</summary><p>${a5}</p></details>
        <details><summary>${q6}</summary><p>${a6}</p></details>
      </div>
    </div>
  </section>

  <section class="cta" id="registrace">
    <div class="wrap">
      <p class="eyebrow">${nav_reg}</p>
      <h2>${cta_h}</h2>
      <p class="lead">${cta_lead}</p>
      <div class="cta-row">
        <a class="btn btn-red" href="#registrace">${cta_btn} <span class="ph">${ph_link}</span></a>
        <span class="mail">${q_lbl} <b>info@hyrox-czech.cz</b> · <b>+420 722 077 070</b></span>
      </div>
    </div>
  </section>
</main>

<footer>
  <div class="wrap">
    ${NET}
    <span>Form Factory Hybrid Games · Form Factory × STR2G · ${addr}</span>
    <span><a href="https://www.formfactory.cz/hyrox/" target="_blank" rel="noopener">formfactory.cz/hyrox</a> · <a href="https://www.instagram.com/hyroxprague/" target="_blank" rel="noopener">@hyroxprague</a> · <a href="#" onclick="window.cookieSettings&&cookieSettings();return false">Cookies</a></span>
  </div>
</footer>
