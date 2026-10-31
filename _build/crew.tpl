<header class="nav">
  <div class="wrap">
    <a class="brand" href="${HOME}">
      <span class="brand-mark"><img src="/img/ff-logo.jpg" alt="Form Factory" width="40" height="40"></span>
      <span class="brand-t"><b>Form Factory</b><i>Games · Crew</i></span>
    </a>
    <ul>
      <li><a href="${HOME}">${nav_back}</a></li>
      <li><a href="#role">${nav_roles}</a></li>
      <li><a href="#den">${nav_day}</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
    <div class="nav-r">
      <nav class="lsw" aria-label="${lang_aria}">${LANGLINKS}</nav>
      <a class="btn btn-ghost" href="#prihlaska">${nav_form} ›</a>
    </div>
  </div>
</header>

<main id="top">
  <section class="hero crew-hero">
    <div class="hero-img"><img src="/img/sled.webp" alt=""></div>
    <div class="wrap">
      <p class="when"><b>${hero_eb}</b></p>
      <h1><span class="h1-s">Judges &amp;</span><span class="h1-l">Crew</span></h1>
      <p class="lead">${hero_lead}</p>
      <div class="hero-cta">
        <a class="btn btn-red" href="#prihlaska">${hero_cta1}</a>
        <a class="btn btn-ghost" href="#role">${hero_cta2}</a>
      </div>
    </div>
  </section>

  <div class="stats">
    <div class="wrap">
      <div class="stat"><strong>12</strong><span>${st1}</span></div>
      <div class="stat"><strong>20</strong><span>${st2}</span></div>
      <div class="stat"><strong>100</strong><span>${st3}</span></div>
      <div class="stat"><strong>3</strong><span>${st4}</span></div>
    </div>
  </div>

  <section id="role">
    <div class="wrap">
      <div class="sec-head">
        <p class="eyebrow">${ro_eb}</p>
        <h2>${ro_h}</h2>
        <p class="lead">${ro_lead}</p>
      </div>
      <div class="roles">
        <article class="role-card">
          <span class="tag">${j_tag}</span>
          <h3>Judge</h3>
          <p class="claim">${j_claim}</p>
          <ul><li>${j_l1}</li><li>${j_l2}</li><li>${j_l3}</li></ul>
          <p class="who">${j_who}</p>
        </article>
        <article class="role-card">
          <span class="tag">${c_tag}</span>
          <h3>Crew</h3>
          <p class="claim">${c_claim}</p>
          <ul><li>${c_l1}</li><li>${c_l2}</li><li>${c_l3}</li><li>${c_l4}</li></ul>
          <p class="who">${c_who}</p>
        </article>
      </div>
      <p class="eyebrow leads-eb">${lead_eb}</p>
      <div class="crew">
        <article><span class="role">${hj_role}</span><h3>Michal Holotík</h3><p>${hj_txt}</p></article>
        <article><span class="role">Big Eye</span><h3>Ladislav Suchánek</h3><p>${be_txt}</p></article>
        <article><span class="role">Speaker</span><h3>Ria Suchánek Hrušovská</h3><p>${sp_txt}</p></article>
      </div>
    </div>
  </section>

  <section class="alt" id="den">
    <div class="wrap day-grid">
      <div>
        <div class="sec-head">
          <p class="eyebrow">${dy_eb}</p>
          <h2>${dy_h}</h2>
        </div>
        <ul class="sched">
          <li><span class="t">08:30</span><div><b>${d1h}</b><p>${d1}</p></div></li>
          <li><span class="t">09:15</span><div><b>${d2h}</b><p>${d2}</p></div></li>
          <li class="key"><span class="t">10:00–11:52</span><div><b>${d3h}</b><p>${d3}</p></div></li>
          <li class="key"><span class="t">12:30–14:12</span><div><b>${d4h}</b><p>${d4}</p></div></li>
          <li class="key"><span class="t">14:50–16:42</span><div><b>${d5h}</b><p>${d5}</p></div></li>
          <li><span class="t">17:20–17:40</span><div><b>${d6h}</b><p>${d6}</p></div></li>
          <li><span class="t">17:40–18:05</span><div><b>${d7h}</b><p>${d7}</p></div></li>
        </ul>
        <p class="note">${dy_note}</p>
      </div>
      <div class="prep">
        <div class="sec-head">
          <p class="eyebrow">${pr_eb}</p>
          <h2>${pr_h}</h2>
        </div>
        <div class="std std-col">
          <div><b>${pr1h}</b><p>${pr1}</p></div>
          <div><b>${pr2h}</b><p>${pr2}</p></div>
          <div><b>${pr3h}</b><p>${pr3}</p></div>
        </div>
      </div>
    </div>
  </section>

  <section id="prihlaska">
    <div class="wrap form-wrap">
      <div class="sec-head">
        <p class="eyebrow">${fm_eb}</p>
        <h2>${fm_h}</h2>
        <p class="lead">${fm_lead}</p>
      </div>
      <form class="crew-form" name="crew" method="POST" data-netlify="true" netlify-honeypot="bot-field" novalidate
            data-preview="${f_preview}" data-err="${f_err}">
        <input type="hidden" name="form-name" value="crew">
        <input type="hidden" name="jazyk" value="${HL}">
        <p class="hp" aria-hidden="true"><label>Nevyplňuj <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>

        <fieldset class="fs">
          <legend>${f_role} <i>*</i></legend>
          <div class="choice">
            <label class="opt"><input type="radio" name="role" value="judge" required><span>${f_role_j}</span></label>
            <label class="opt"><input type="radio" name="role" value="crew"><span>${f_role_c}</span></label>
            <label class="opt"><input type="radio" name="role" value="kdekoliv"><span>${f_role_any}</span></label>
          </div>
        </fieldset>

        <div class="grid2">
          <div class="fld"><label for="f-name">${f_name} <i>*</i></label><input id="f-name" name="jmeno" autocomplete="name" required></div>
          <div class="fld"><label for="f-email">${f_email} <i>*</i></label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
          <div class="fld"><label for="f-phone">${f_phone} <i>*</i></label><input id="f-phone" name="telefon" type="tel" autocomplete="tel" required></div>
          <div class="fld"><label for="f-ig">${f_ig}</label><input id="f-ig" name="instagram" placeholder="@"></div>
        </div>

        <fieldset class="fs">
          <legend>${f_area}</legend>
          <p class="hint">${f_area_hint}</p>
          <div class="choice">
            <label class="opt"><input type="checkbox" name="oblast" value="check-in"><span>${a1}</span></label>
            <label class="opt"><input type="checkbox" name="oblast" value="call-up"><span>${a2}</span></label>
            <label class="opt"><input type="checkbox" name="oblast" value="reset"><span>${a3}</span></label>
            <label class="opt"><input type="checkbox" name="oblast" value="stavba"><span>${a4}</span></label>
            <label class="opt"><input type="checkbox" name="oblast" value="foto-video"><span>${a5}</span></label>
            <label class="opt"><input type="checkbox" name="oblast" value="zdravotnik"><span>${a6}</span></label>
          </div>
        </fieldset>

        <div class="grid2">
          <div class="fld"><label for="f-exp">${f_exp} <i>*</i></label>
            <select id="f-exp" name="zkusenost" required>
              <option value="" selected disabled>–</option>
              <option value="zadna">${e0}</option>
              <option value="trenuje">${e1}</option>
              <option value="judge-na-zavodech">${e2}</option>
              <option value="judge-kurz">${e3}</option>
            </select>
          </div>
          <div class="fld"><label for="f-size">${f_size}</label>
            <select id="f-size" name="tricko">
              <option value="" selected>–</option><option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option>
            </select>
            <span class="hint">${f_size_hint}</span>
          </div>
        </div>

        <fieldset class="fs">
          <legend>${f_time} <i>*</i></legend>
          <div class="choice">
            <label class="opt"><input type="radio" name="cas" value="cely-den" required><span>${t1}</span></label>
            <label class="opt"><input type="radio" name="cas" value="cast-dne"><span>${t2}</span></label>
          </div>
        </fieldset>

        <fieldset class="fs">
          <legend>${f_lang}</legend>
          <div class="choice">
            <label class="opt"><input type="checkbox" name="jazyky" value="cs"><span>Čeština</span></label>
            <label class="opt"><input type="checkbox" name="jazyky" value="en"><span>English</span></label>
            <label class="opt"><input type="checkbox" name="jazyky" value="pl"><span>Polski</span></label>
            <label class="opt"><input type="checkbox" name="jazyky" value="de"><span>Deutsch</span></label>
          </div>
        </fieldset>

        <div class="fld"><label for="f-note">${f_note}</label><textarea id="f-note" name="poznamka" rows="4" placeholder="${f_note_ph}"></textarea></div>

        <fieldset class="fs checks">
          <legend>${f_cons}</legend>
          <label class="chk"><input type="checkbox" name="vek-18" value="ano" required><span>${f_adult} <i>*</i></span></label>
          <label class="chk"><input type="checkbox" name="souhlas-gdpr" value="ano" required><span>${f_gdpr} <a href="https://www.ladislavsuchanek.cz/pravidla-ochrany-soukromi/" target="_blank" rel="noopener">${f_gdpr_link}</a>. <i>*</i></span></label>
          <label class="chk"><input type="checkbox" name="souhlas-foto-video" value="ano"><span>${f_photo} <em>(${f_opt})</em></span></label>
          <label class="chk"><input type="checkbox" name="souhlas-novinky" value="ano"><span>${f_news} <em>(${f_opt})</em></span></label>
        </fieldset>

        <div class="send">
          <button class="btn btn-red" type="submit">${f_send}</button>
          <span class="req"><i>*</i> ${f_req}</span>
        </div>
        <p class="f-msg" role="alert" hidden></p>
      </form>
      <div class="f-done" tabindex="-1" hidden>
        <h3>${f_ok_h}</h3>
        <p>${f_ok}</p>
        <p class="f-prev" hidden></p>
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
        <details open><summary>${q1}</summary><p>${a_q1}</p></details>
        <details><summary>${q2}</summary><p>${a_q2}</p></details>
        <details><summary>${q3}</summary><p>${a_q3}</p></details>
        <details><summary>${q4}</summary><p>${a_q4}</p></details>
      </div>
    </div>
  </section>
</main>

<footer>
  <div class="wrap">
    ${NET}
    <span>Form Factory Games · Form Factory × STR2G · ${addr}</span>
    <span><a href="https://www.formfactory.cz/hyrox/" target="_blank" rel="noopener">formfactory.cz/hyrox</a> · <a href="https://www.instagram.com/hyroxprague/" target="_blank" rel="noopener">@hyroxprague</a></span>
  </div>
</footer>
