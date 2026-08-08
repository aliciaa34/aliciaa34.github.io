# aliciaa34.github.io

Personal academic site for Alicia Anderson — [aliciaa34.github.io](https://aliciaa34.github.io).

Built with [Jekyll](https://jekyllrb.com) on a fork of the
[Academic Pages](https://github.com/academicpages/academicpages.github.io) template
(itself a fork of [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/)).
GitHub Pages rebuilds and republishes the site automatically on every push to `master`.

## Where the content lives

| Page | Source |
|---|---|
| Home | `_pages/about.md` |
| Publications | `_publications/*.md` — one file per paper; the page itself is `_pages/publications.html` |
| CV | `_pages/cv.md` |
| Astrophotography | `_astro/*.md` — one file per photograph; see [ADDING-PHOTOS.md](ADDING-PHOTOS.md) |
| La Palma | `_lapalma/*.md` — daytime photographs, same format |
| Press | `_data/press.yml` — a plain list; the page is `_pages/press.md` |
| Navigation bar | `_data/navigation.yml` |
| Site-wide settings, sidebar links | `_config.yml` |

### Publications

Each file in `_publications/` carries its citation in the front matter:

```yaml
---
title: 'Paper title'
collection: publications
category: manuscripts     # manuscripts | conferences | theses
permalink: /publication/2024-01-17-some-slug
excerpt: 'One or two sentences shown in the list.'
date: 2024-01-17
venue: 'Review of Scientific Instruments, 95(1), 015116'
authors: '<b>Anderson, A. M.</b>, Naylor, D. A., ...'
paperurl: 'https://doi.org/10.1063/5.0177603'
citation: '...'
---
```

Use `<b>...</b>` around your own name in `authors` — that field is printed as raw HTML.
The section headings and their order come from `publication_category` in `_config.yml`.

## Theme

The site defaults to dark; visitors can switch with the sun/moon toggle in the navigation
bar and the choice is remembered. Change the default with `default_color_scheme` in
`_config.yml` (`dark` or `light`). Site-specific styling lives in
`_sass/layout/_custom.scss`.

## Running it locally

Requires Ruby 3+ (`brew install ruby`).

```bash
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>. The site rebuilds as you edit.
