"""Články na formfactorygames.cz (jen čeština). Volá je _build/build.py.

Článek s draft=True se negeneruje ani nepřidá do sitemap.
Zveřejnění: nastav draft=False a spusť python3 _build/build.py.
Styly, hlavička a patička se berou z vygenerované české homepage (index.html).
"""
import json
import re
from html import escape

SITE = "https://formfactorygames.cz"

ARTICLES = {
    "jak-se-pripravit": dict(
        draft=True,
        title="Jak se připravit na Form Factory Games: trénink na 3 workouty",
        desc="Form Factory Games 5. 12. 2026: jak se připravit na Power Grid, The Engine a Final Grind. Trénink, tempo, výběr kategorie Open nebo Pro a co v den závodu.",
        h1="Jak se připravit na Form Factory Games",
        lead="Tři workouty za jeden den, mezi nimi pauzy na reset. Form Factory Games nejsou o jednom maximálním výkonu, ale o tom, jak dobře zvládneš opakovaně jet naplno. Tady je, jak se na to připravit.",
        body="""
<h2>Co tě čeká</h2>
<ul>
<li><strong>W1 Power Grid (10:00):</strong> 4 stanoviště po 3 minutách naplno: SkiErg, sled push, veslo, KB deadlifty. Mezi nimi minuta na zápis a přesun.</li>
<li><strong>W2 The Engine (12:30):</strong> 6 minut AMRAP: 20 wall balls, 10 burpees, 20 KB swingů a znovu.</li>
<li><strong>W3 Final Grind (14:50):</strong> 4 × 3 minuty: Echo Bike, DB thrusters, walking lunges se zátěží, shuttle runy.</li>
</ul>
<p>Každý workout váží stejně a hodnotí se pořadí uvnitř tvé kategorie. Celá pravidla, zátěže a bodování jsou na <a href="/">hlavní stránce závodu</a>.</p>
<h2>Open, nebo Pro?</h2>
<p>Podívej se na zátěže a buď k sobě upřímný. Pro je pro lidi, kteří zvládnou sled push 150/200 kg, thrustery 2 × 15/2 × 20 kg a wall ball 6/9 kg opakovaně a pod únavou. Pokud si nejsi jistý, jdi Open. Hodnotí se jen v rámci kategorie, takže v Open budeš bojovat s lidmi na stejné úrovni.</p>
<h2>Jak trénovat na 3minutové intervaly</h2>
<p>Tři minuty jsou zrádná délka. Moc dlouhé na sprint, moc krátké na šetření. Trénuj přesně tenhle formát:</p>
<ol>
<li><strong>4 × 3 min / 1 min:</strong> dvakrát týdně, střídej stroje (SkiErg, veslo, bike) a silové cviky (deadlift, thrustery).</li>
<li><strong>Rovnoměrné tempo:</strong> první minutu nejeď naplno. Kdo přepálí start, ve třetí minutě ztratí víc, než získal.</li>
<li><strong>Zapisuj výsledky:</strong> metry, kalorie, opakování. Na závodě budeš vědět, jaké číslo je tvoje.</li>
</ol>
<h2>Jak trénovat The Engine</h2>
<p>6minutový AMRAP s wall balls, burpees a swingy je o rytmu. Vyzkoušej si ho celý aspoň dvakrát před závodem a měj plán: kolik wall balls dáš bez pauzy a kde se nadechneš. Počítá se každé platné opakování, takže krátké pauzy jsou lepší než no-repy.</p>
<h2>Den se třemi starty</h2>
<ul>
<li><strong>Jez mezi workouty.</strong> Máš na to přes půl hodiny. Něco malého a vyzkoušeného: banán, rýžový chlebíček, iontový nápoj.</li>
<li><strong>Zůstaň v teple.</strong> Mikina na pauzy, krátká rozcvička před každým blokem.</li>
<li><strong>Hlava.</strong> Špatný první workout nic neznamená. Každý workout se boduje zvlášť, takže máš vždycky šanci to dohnat.</li>
<li><strong>Přijď včas.</strong> Sraz je v 9:30, briefing v 9:45. Čas a dráhu své vlny dostaneš e-mailem.</li>
</ul>
<h2>Chceš se připravit s námi?</h2>
<p>Lekce <a href="https://hyroxtrainingclub.cz/praha/">HYROX Training Club</a> ve Form Factory jsou přesně ten typ tréninku: stanice, intervaly a práce pod únavou. Individuální přípravu nabízí <a href="https://www.ladislavsuchanek.cz/kontakt/">Ladislav Suchánek</a>.</p>
""",
        faq=[
            ("Kdy a kde jsou Form Factory Games?", "V sobotu 5. 12. 2026 ve Form Factory Vinohradská 190, Praha 3. Sraz v 9:30, první start v 10:00."),
            ("Jaké workouty jsou na Form Factory Games?", "Tři: Power Grid (SkiErg, sled push, veslo, KB deadlift), The Engine (6min AMRAP s wall balls, burpees a KB swingy) a Final Grind (Echo Bike, DB thrusters, walking lunges, shuttle runy)."),
            ("Mám jít Open, nebo Pro?", "Pokud nezvládáš zátěže Pro kategorie opakovaně a pod únavou, jdi Open. Hodnotí se jen v rámci tvé kategorie."),
        ],
    ),
}


def page(slug, a, cs_html):
    css = re.search(r"<style>(.*?)</style>", cs_html, re.S).group(1)
    head_links = "\n".join(re.findall(r'<link rel="(?:icon|apple-touch-icon|preconnect|stylesheet)"[^>]*>', cs_html))
    tracking = "\n".join(re.findall(r'<script src="/js/[^"]+"[^>]*></script>', cs_html))
    header = re.search(r'<header class="nav">.*?</header>', cs_html, re.S).group(0)
    header = re.sub(r'href="#', 'href="/#', header)
    header = re.sub(r'<nav class="lsw".*?</nav>', '', header, flags=re.S)
    footer = re.search(r"<footer>.*?</footer>", cs_html, re.S).group(0)
    url = f"{SITE}/{slug}/"
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Form Factory Games", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": a["h1"], "item": url}]},
        {"@type": "Article", "headline": a["h1"], "description": a["desc"], "inLanguage": "cs", "mainEntityOfPage": url,
         "author": {"@type": "Person", "name": "Ladislav Suchánek"}, "image": SITE + "/img/hero.jpg"},
        {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": t}} for q, t in a["faq"]]},
    ]}
    faq = "".join(f"<details><summary>{escape(q)}</summary><p>{escape(t)}</p></details>" for q, t in a["faq"])
    extra = """
.art{max-width:780px;margin:0 auto;padding:140px 20px 60px}
.art h1{font-size:clamp(40px,6vw,76px);line-height:1;margin:0 0 18px}
.art h2{margin:44px 0 14px;font-size:clamp(28px,4vw,42px)}
.art p,.art li{font-size:18px;line-height:1.6}
.art a:not(.btn){text-decoration:underline}
.art details{border-top:1px solid rgba(127,127,127,.3);padding:14px 0}
.art summary{cursor:pointer;font-weight:700}
"""
    return f'''<!doctype html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{escape(a["title"])}</title>
<meta name="description" content="{escape(a["desc"])}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="article">
<meta property="og:title" content="{escape(a["title"])}">
<meta property="og:description" content="{escape(a["desc"])}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE}/img/hero.jpg">
<meta property="og:locale" content="cs_CZ">
<meta name="twitter:card" content="summary_large_image">
<meta name="robots" content="index,follow,max-image-preview:large">
{tracking}
{head_links}
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
<style>{css}{extra}</style>
</head>
<body>
{header}
<main id="top"><article class="art">
<h1>{escape(a["h1"])}</h1>
<p class="lead">{escape(a["lead"])}</p>
{a["body"]}
<h2>Časté otázky</h2>
{faq}
<p style="margin-top:32px"><a class="btn btn-red" href="/#registrace">Registrace na závod</a></p>
</article></main>
{footer}
</body>
</html>
'''


def build(root, include_drafts=False):
    cs_html = (root / "index.html").read_text(encoding="utf-8")
    urls, out = [], {}
    for slug, a in ARTICLES.items():
        if a.get("draft") and not include_drafts:
            continue
        html = page(slug, a, cs_html)
        out[slug] = html
        if not a.get("draft"):
            p = root / slug / "index.html"
            p.parent.mkdir(exist_ok=True)
            p.write_text(html, encoding="utf-8")
            urls.append(f"{SITE}/{slug}/")
    return urls if not include_drafts else out
