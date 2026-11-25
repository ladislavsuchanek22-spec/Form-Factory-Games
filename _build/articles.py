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
        draft=False,
        title="Jak se připravit na Form Factory Hybrid Games: 5 × 4 minuty",
        desc="Form Factory Hybrid Games 5. 12. 2026: jak se připravit na Hybrid Challenge. Pět stanovišť po 4 minutách, tempo, trénink na AMRAP, sled a shuttle runy a co v den závodu.",
        h1="Jak se připravit na Form Factory Hybrid Games",
        lead="Pět stanovišť, na každém čtyři minuty naplno. Hybrid Challenge netestuje jeden maximální výkon, ale jestli udržíš tempo i na pátém stanovišti. Tady je, jak se na to připravit za dva týdny, které zbývají.",
        body="""
<h2>Co tě čeká</h2>
<p>Jedeš stanoviště A až E. Na každém je AMRAP na 4:00: opakuješ dvojici cviků dokola, dokud nezazní signál. Pak máš 1:30 na zápis a přesun. Celý workout ti zabere 26 minut.</p>
<ul>
<li><strong>A:</strong> SkiErg (10/12 cal) a 15 wall balls (4/6 kg)</li>
<li><strong>B:</strong> Echo Bike (7/10 cal) a 15 střídavých DB snatchů (12,5/15 kg)</li>
<li><strong>C:</strong> sled push a sled pull po 12,5 m (150/200 kg včetně saní)</li>
<li><strong>D:</strong> RowErg (10/12 cal) a 15 burpees přes veslo</li>
<li><strong>E:</strong> 6 × 12,5 m shuttle run a 2 × 12,5 m walking lunges se sandbagem (10/20 kg)</li>
</ul>
<p>První číslo platí pro ženy, druhé pro muže. Na každém stanovišti se počítá jedno číslo a víc je líp. Celý rozpis, vlny a program dne najdeš na <a href="/">hlavní stránce závodu</a>.</p>
<h2>Tempo: na A nejeď naplno</h2>
<p>Dvacet minut práce v pěti blocích je dlouhá doba. Kdo přepálí první stanoviště, zaplatí to na sledu a na shuttle runech. Jeď prvních 30 vteřin každého bloku o kousek pomaleji, než máš chuť, a zrychluj ke konci. Poslední minuta na stanovišti E má být ta nejrychlejší, ne ta, kde stojíš.</p>
<h2>Jak trénovat za dva týdny</h2>
<p>Na velkou formu už není čas. Jde o to naučit se formát a nezničit se před závodem.</p>
<ol>
<li><strong>Jedna simulace:</strong> 5 × 4 min AMRAP s 1:30 pauzou, stejné dvojice cviků nebo co nejbližší náhrada. Zapiš si čísla z každého bloku. Na závodě budeš vědět, kde máš strop.</li>
<li><strong>Intervaly 4 min / 1:30:</strong> jednou týdně na ergech (SkiErg, veslo, bike), tempo, které udržíš celé čtyři minuty.</li>
<li><strong>Technika na slabá místa:</strong> střídání rukou u DB snatche, burpee přes veslo a obrátky na shuttle runech. To jsou místa, kde se ztrácí nejvíc času.</li>
<li><strong>Poslední týden:</strong> méně objemu, krátké svižné tréninky, víc spánku. Nic nového.</li>
</ol>
<h2>Na co se zaměřit na stanovištích</h2>
<ul>
<li><strong>Wall balls a burpees si rozděl předem.</strong> Naplánovaná pauza je vždycky kratší než vynucená.</li>
<li><strong>DB snatch:</strong> drž rytmus a činku odkládej co nejméně. Každé položení stojí čas.</li>
<li><strong>Sled:</strong> nízko, ruce natažené, krátké rychlé kroky. Když se zasekne, nestůj a hned ho znovu rozjeď. Pull jdi pozpátku celým tělem.</li>
<li><strong>Shuttle runy:</strong> obrátky jsou čas. U čáry jdi nízko a hned zpátky. Lunges kratším krokem a stálým tempem.</li>
<li><strong>Minuta a půl na přesun je i na dech.</strong> Napij se a dýchej, ať další blok nezačínáš v dluhu.</li>
</ul>
<h2>Den závodu</h2>
<ul>
<li><strong>Přijď v 9:00.</strong> Check-in, číslo, vlna a dráha. V 9:10 je briefing se standardy.</li>
<li><strong>Rozcvičíš se s trenérem.</strong> Vlny 1–5 v 9:15, vlny 6–10 v 9:45. Čas své vlny dostaneš e-mailem po uzavření registrace.</li>
<li><strong>Sbal se večer předem:</strong> boty na běh i na sled, pití, náhradní triko, ručník, magnézium na DB snatch a sled a oblečení na vánoční večírek.</li>
<li><strong>Vyhlášení je v 10:52</strong>, pak společně končíme rok na vánočním večírku.</li>
</ul>
<h2>Chceš se připravit s námi?</h2>
<p>Lekce <a href="https://hyroxtrainingclub.cz/praha/">HYROX Training Club</a> ve Form Factory jsou přesně ten typ tréninku: stanice, intervaly a práce pod únavou. Individuální přípravu nabízí <a href="https://www.ladislavsuchanek.cz/kontakt/">Ladislav Suchánek</a>.</p>
""",
        faq=[
            ("Kdy a kde jsou Form Factory Hybrid Games?", "V sobotu 5. 12. 2026 ve Form Factory Vinohradská 190, Praha 3. Sraz v 9:00, první vlna startuje v 9:30, vyhlášení je v 10:52."),
            ("Jaký workout je na Form Factory Hybrid Games?", "Jeden workout, Hybrid Challenge: pět stanovišť po 4 minutách AMRAP (SkiErg a wall balls, Echo Bike a DB snatch, sled push a pull, veslo a burpees, shuttle runy a lunges se sandbagem). Mezi stanovišti je 1:30 na přesun."),
            ("Jak se na Hybrid Challenge připravit za dva týdny?", "Udělej jednu simulaci 5 × 4 minuty, natrénuj techniku DB snatche, burpees přes veslo a obrátek na shuttle runech a poslední týden uber objem."),
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
<meta name="robots" content="noindex">
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
