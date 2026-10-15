#!/usr/bin/env python3
"""Vygeneruje web Form Factory Games ve čtyřech jazycích.

Použití (z kořene repozitáře):  python3 _build/build.py

- Texty:      _build/tr.py      (T['cz'], T['en'], T['pl'], T['de'])
- Šablona:    _build/template.html
- Styly:      _build/style.css
- Odkazy na ostatní weby STR2G: _build/net.py
Výstup: index.html (čeština), en/index.html, pl/index.html, de/index.html, sitemap.xml
"""
import json
import re
import sys
from pathlib import Path
from string import Template

B = Path(__file__).resolve().parent
ROOT = B.parent
sys.path.insert(0, str(B))
from tr import T  # noqa: E402
import net  # noqa: E402

SITE = "https://formfactorygames.cz"
# kód ve slovníku T -> (hreflang, cesta, og:locale, popisek v přepínači)
LANGS = {
    "cz": ("cs", "/", "cs_CZ", "CZ"),
    "en": ("en", "/en/", "en_US", "EN"),
    "pl": ("pl", "/pl/", "pl_PL", "PL"),
    "de": ("de", "/de/", "de_DE", "DE"),
}
VERIFY = "abf25QrYbQI8uNUvQ5bWpJksa7UN_hBxoRfm9DcwIHs"
LASTMOD = "2026-10-15"

STYLE = (B / "style.css").read_text(encoding="utf-8")
TPL = Template((B / "template.html").read_text(encoding="utf-8"))
FINDER = (B / "finder.js").read_text(encoding="utf-8")


def jsonld(L, t):
    hl, path, _, _ = LANGS[L]
    data = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SportsEvent",
                "@id": SITE + "/#event",
                "name": "Form Factory Games 2026",
                "description": t["meta"],
                "url": SITE + path,
                "inLanguage": hl,
                "image": [SITE + "/img/hero.jpg"],
                "startDate": "2026-12-05T10:00:00+01:00",
                "endDate": "2026-12-05T17:40:00+01:00",
                "doorTime": "2026-12-05T09:30:00+01:00",
                "eventStatus": "https://schema.org/EventScheduled",
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "maximumAttendeeCapacity": 100,
                "location": {
                    "@type": "SportsActivityLocation",
                    "name": "Form Factory Vinohradská",
                    "url": "https://hyroxtrainingclub.cz/",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Vinohradská 190",
                        "postalCode": "130 00",
                        "addressLocality": "Praha 3",
                        "addressCountry": "CZ",
                    },
                },
                "organizer": [
                    {"@type": "Organization", "@id": "https://str2g.com/#org", "name": "STR2G HYROX",
                     "url": "https://str2g.com/"},
                    {"@type": "Organization", "name": "Form Factory", "url": "https://www.formfactory.cz/"},
                ],
            },
            {
                "@type": "Person",
                "@id": "https://hyrox-prague.eu/#lada",
                "name": "Ladislav Suchánek",
                "url": "https://hyrox-prague.eu/",
                "sameAs": ["https://www.ladislavsuchanek.cz/", "https://www.instagram.com/22segge_coach/"],
            },
        ],
    }
    return '<script type="application/ld+json">' + json.dumps(data, ensure_ascii=False) + "</script>"


def head(L, t):
    hl, path, locale, _ = LANGS[L]
    alts = "\n".join(f'<link rel="alternate" hreflang="{v[0]}" href="{SITE}{v[1]}">' for v in LANGS.values())
    alts += f'\n<link rel="alternate" hreflang="x-default" href="{SITE}/">'
    legacy = ""
    if L == "cz":  # staré odkazy formfactorygames.cz/#en apod.
        legacy = "<script>(function(){var m=location.hash.match(/^#(en|pl|de)$/i);if(m)location.replace('/'+m[1].toLowerCase()+'/');})();</script>\n"
    return f'''<!doctype html>
<html lang="{hl}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{t["title"]}</title>
<meta name="description" content="{t["meta"]}">
<meta name="google-site-verification" content="{VERIFY}" />
<link rel="canonical" href="{SITE}{path}">
{alts}
<meta property="og:type" content="website">
<meta property="og:title" content="{t["title"]}">
<meta property="og:description" content="{t["meta"]}">
<meta property="og:url" content="{SITE}{path}">
<meta property="og:image" content="{SITE}/img/hero.jpg">
<meta property="og:locale" content="{locale}">
<link rel="icon" href="/img/ff-logo.jpg">
{legacy}<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;1,800&family=Barlow:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap">
<style>
html,body{{margin:0}}:root{{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}}[hidden]{{display:none!important}}
{STYLE}</style>
{jsonld(L, t)}
</head>
<body>
'''


def page(L):
    t = dict(T[L])
    hl, path, _, _ = LANGS[L]
    t["L"] = L
    t["HOME"] = path
    t["LANGLINKS"] = "".join(
        f'<a href="{v[1]}" hreflang="{v[0]}" lang="{v[0]}"' + (' aria-current="page"' if k == L else "") + f">{v[3]}</a>"
        for k, v in LANGS.items())
    t["U_HP"] = net.url("hp", hl)
    t["U_HTC"] = net.url("htc", hl)
    t["NET"] = net.block("ffg", hl)
    body = TPL.substitute(t)
    left = re.findall(r"\$\{\w+\}", body)
    assert not left, left
    return head(L, t) + body + FINDER + "\n</body>\n</html>\n"


def sitemap():
    rows = []
    for v in LANGS.values():
        alts = "".join(f'\n    <xhtml:link rel="alternate" hreflang="{w[0]}" href="{SITE}{w[1]}"/>' for w in LANGS.values())
        alts += f'\n    <xhtml:link rel="alternate" hreflang="x-default" href="{SITE}/"/>'
        rows.append(f"  <url>\n    <loc>{SITE}{v[1]}</loc>\n    <lastmod>{LASTMOD}</lastmod>{alts}\n  </url>")
    return ('<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
            + "\n".join(rows) + "\n</urlset>\n")


def main():
    for L, v in LANGS.items():
        out = ROOT / v[1].strip("/") / "index.html"
        out.parent.mkdir(exist_ok=True)
        out.write_text(page(L), encoding="utf-8")
        print("zapsáno", out.relative_to(ROOT))
    (ROOT / "sitemap.xml").write_text(sitemap(), encoding="utf-8")
    print("zapsáno sitemap.xml")


if __name__ == "__main__":
    main()
