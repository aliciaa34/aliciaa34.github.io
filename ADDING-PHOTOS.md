# Adding a photograph

There are two photograph galleries, and they work identically:

| Page | Entries live in | Images live in |
|---|---|---|
| [Astrophotography](https://aliciaa34.github.io/astrophotography/) — night sky | `_astro/` | `images/astro/` |
| [La Palma](https://aliciaa34.github.io/la-palma/) — daytime and dusk | `_lapalma/` | `images/lapalma/` |

Each photograph is one Markdown file plus one image file. There is no database and nothing
to rebuild by hand — pushing to `master` republishes the site. Everything below says
`astro`; swap in `lapalma` for the other gallery.

## 1. Export the image

GitHub Pages cannot display raw `.CR2` files, and large images make the page slow. Export
a JPEG and keep it under roughly 2 MB:

- **Long edge:** 2000–2500 px is plenty for a web page.
- **Format:** JPEG, quality 80–85.
- **Colour space:** sRGB (not Adobe RGB — browsers will render it dull otherwise).

Save it into `images/astro/` with a lower-case, hyphenated name, e.g.
`images/astro/milky-way-dome.jpg`.

If you have ImageMagick installed (`brew install imagemagick`), this resizes and strips
camera metadata in one go:

```bash
magick input.jpg -resize 2400x2400\> -strip -quality 82 images/astro/milky-way-dome.jpg
```

### Optional: a smaller thumbnail

The gallery grid loads the full image unless you give it a `thumb`. For a faster page,
also export a small version:

```bash
magick images/astro/milky-way-dome.jpg -resize 800x800\> -quality 80 images/astro/milky-way-dome-thumb.jpg
```

## 2. Create the entry

Copy any existing file in `_astro/` and edit it. Name it after the photograph, e.g.
`_astro/milky-way-dome.md` — the filename becomes the page URL.

```markdown
---
title: "Milky Way over the dome"
order: 305
taken: 2026-02-11
target: "Milky Way core"
location: "Roque de los Muchachos Observatory, La Palma"
image: /images/astro/milky-way-dome.jpg
thumb: /images/astro/milky-way-dome-thumb.jpg
alt: "The Milky Way arching over a telescope dome at night"
camera: "Canon EOS 6D"
lens: "Sigma 24mm f/1.4 DG HSM Art"
focal_length: "24 mm"
aperture: "f/1.4"
iso: "3200"
exposure: "15 s"
mount: "Static tripod"
processing: "Stacked in Sequator, finished in Photoshop"
---

Whatever you want to say about the photograph goes here. Plain paragraphs, **bold**,
*italics* and [links](https://example.com) all work.
```

### Fields

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Shown in the gallery and as the page heading |
| `order` | yes | A number. The gallery runs highest first, so give a new photo a number above every existing one. Nothing is displayed — it only sets the order |
| `taken` | no | `YYYY-MM-DD`. Shown under the title and in the gallery. **Leave it out if you are not sure** — no date is better than a wrong one |
| `image` | yes | Path from the site root, starting with `/images/astro/` |
| `thumb` | no | Falls back to `image` if omitted |
| `alt` | no | Description for screen readers; falls back to `title` |
| `target` | no | e.g. `M31`, `Milky Way core` |
| `location` | no | Where it was taken |
| `caption` | no | Short line printed directly under the photograph |
| `telescope`, `camera`, `lens`, `focal_length`, `aperture`, `iso`, `mount`, `exposure`, `filters`, `processing` | no | Any you fill in appear in the "Capture details" table; the table is hidden entirely if you fill in none |

## 3. Publish

```bash
git add images/astro _astro && git commit -m "Add Milky Way photograph" && git push
```

GitHub rebuilds the site within a minute or two.

## About the existing entries

- **Astrophotography** — 29 photographs from `Pictures/astrophotography/favs`.
- **La Palma** — 20 photographs selected from `Pictures/la palma/sunsets` (74) and
  `Pictures/la palma/site pics` (4).

The titles and the descriptions under them were written from the images themselves as a
starting point — **please rewrite them in your own words**, they are placeholders.

**Nothing is named.** Descriptions say "one of the domes" and "a Cherenkov telescope"
because the individual instruments were not identified with any confidence — the daytime
shot shows CTA markings, so at least some of them are LST-1 rather than MAGIC, and the two
are hard to tell apart at night. You will know which is which; please put the real names in.

Dates and camera settings are only filled in where the file still had its EXIF data. The
`*_edit.jpg` exports had their metadata stripped by whatever processed them, so most of the
astrophotography entries have neither. Nothing was guessed — an entry with no `taken` field
simply shows no date. If you re-export from the raws with metadata preserved, the capture
details can be filled in automatically.

The volcano, plants, waterfall and Playa de Nogales folders were left out, as were any
pictures with other people in them.
