# Adding a photograph to the astrophotography page

Each photograph is one Markdown file in `_astro/` plus one image file in `images/astro/`.
There is no database and nothing to rebuild by hand — pushing to `master` republishes the
site.

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

Copy one of the `EXAMPLE —` files in `_astro/` and edit it. The filename should start with
the date, e.g. `_astro/2025-07-12-milky-way-dome.md`.

```markdown
---
title: "Milky Way over the dome"
date: 2025-07-12
target: "Milky Way core"
location: "Isaac Newton Telescope, La Palma"
image: /images/astro/milky-way-dome.jpg
thumb: /images/astro/milky-way-dome-thumb.jpg
alt: "The Milky Way arching over a telescope dome at night"
camera: "Canon EOS 6D"
lens: "Samyang 14 mm f/2.8"
focal_length: "14 mm"
aperture: "f/2.8"
iso: "3200"
exposure: "20 × 25 s"
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
| `date` | yes | `YYYY-MM-DD`. Controls the ordering — newest first |
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

## Housekeeping

Delete the three `_astro/*EXAMPLE*.md` files once you have real entries — they render as
empty grey frames because they have no `image` set.
