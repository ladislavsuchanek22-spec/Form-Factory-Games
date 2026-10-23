# Form Factory Games

Web závodu Form Factory Games, 5. 12. 2026, Form Factory Vinohradská (Form Factory × STR2G).
Statický web na Netlify, každý push do `main` se nasadí na https://formfactorygames.cz.

## Jazyky (CZ / EN / PL / DE)

Stránky se generují, needituj `index.html`, `en/`, `pl/`, `de/` ručně.

1. Texty uprav v `_build/tr.py` (všechny čtyři jazyky), strukturu v `_build/template.tpl`, styly v `_build/style.css`.
2. Spusť z kořene repozitáře: `python3 _build/build.py`
3. Commitni všechno.

Blok „Weby STR2G“ v patičce je v `_build/net.py`. Stejný seznam je i na hyrox-prague.eu, str2g.com a hyroxtrainingclub.cz.
