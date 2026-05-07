# CLAUDE.md — 1000 Duas for Arafah

> Project specification for an AI coding assistant (Claude Code) to build a modern, professional GitHub Pages site that beautifully presents the 1000 Duas for Arafah for the Day of Arafah.

---

## 1. Project Overview

**Name:** 1000 Duas for Arafah
**Type:** Static site (GitHub Pages, no backend)
**Purpose:** A serene, spiritually-respectful, modern web app that allows visitors to read, browse, search, and reflect on 1000 supplications curated for the Day of Arafah and beyond.
**Tone:** Calm, reverent, minimal, and modern. Think _Apple Books meets Linear meets a quiet masjid at Fajr_. Not flashy. Not gamified. Dignified.

**Live deploy target:** `https://<username>.github.io/duas-arafah/`

---

## 2. Core Principles

1. **Reverence first.** This is sacred content. No emojis as decoration, no playful microcopy, no engagement-bait patterns (streaks, gamification, popups).
2. **Readability above all.** Generous whitespace, large body type, comfortable line-height, restrained color.
3. **Performance.** Single-page app, but no heavy framework required. Vanilla JS + modern CSS is preferred. Total page weight under 200 KB gzipped.
4. **Accessibility.** WCAG 2.1 AA. Full keyboard navigation, semantic HTML, proper ARIA, prefers-reduced-motion respected, color contrast verified in both themes.
5. **Offline capable.** Once loaded, the site should work offline (service worker + cached JSON).
6. **No tracking.** No analytics, no third-party fonts loading from CDNs that log IPs (self-host fonts), no cookies.

---

## 3. Content Structure

The source content is `1000 Duas for Arafah` — 1000 numbered supplications grouped into thematic sections. Each dua has:

- `id` — integer 1 through 1000
- `text` — the dua itself (English)
- `section` — the thematic section it belongs to
- `sectionRange` — e.g. `[1, 50]`

### Sections (as derived from the source)

| #   | Section                                                 | Range    |
| --- | ------------------------------------------------------- | -------- |
| 1   | Imaan & Worship                                         | 1–50     |
| 2   | Forgiveness & Mercy                                     | 51–100   |
| 3   | Health & Strength                                       | 101–150  |
| 4   | Wealth & Rizq                                           | 151–200  |
| 5   | Family & Children                                       | 201–250  |
| 6   | Marriage & Relationships                                | 251–275  |
| 7   | Work, Career & Success                                  | 276–300  |
| 8   | Akhirah, Death & Hereafter                              | 301–350  |
| 9   | Protection from Evil, Evil Eye, and Black Magic         | 351–400  |
| 10  | Emotional Well-being & Inner Peace                      | 401–450  |
| 11  | Knowledge, Hifdh & Islamic Scholarship                  | 451–500  |
| 12  | Righteousness, Piety, and Steadfastness                 | 501–550  |
| 13  | Acceptance of Hajj & Umrah, and Spiritual Upliftment    | 551–600  |
| 14  | For Parents and Family Ties                             | 601–610  |
| 15  | Protection from Grave and Day of Judgment               | 611–620  |
| 16  | Jannah and the Hereafter                                | 621–630  |
| 17  | Miscellaneous                                           | 631–640  |
| 18  | Protection from Evil Eye, Magic, and Harm               | 641–650  |
| 19  | Steadfastness and Strength in Imaan                     | 651–660  |
| 20  | Connection with Qur'an and Seeking Knowledge            | 661–670  |
| 21  | Becoming a Scholar and Spreader of Islam                | 671–680  |
| 22  | Righteous Offspring and Future Generations              | 681–690  |
| 23  | Strength in Times of Trials and Hardship                | 691–700  |
| 24  | Guidance and Barakah in Life                            | 701–710  |
| 25  | Spiritual Growth and Forgiveness                        | 711–720  |
| 26  | Service to Deen and Ummah                               | 721–730  |
| 27  | Acceptance of Duas and End of Life Requests             | 731–750  |
| 28  | Success in Career, Exams & Becoming a Beneficial Doctor | 751–800  |
| 29  | Righteous Death, Good Endings & Kalima on the Tongue    | 801–842  |
| 30  | Good Character and Manners                              | 843–852  |
| 31  | Love and Compassion for Others                          | 853–862  |
| 32  | Excellence in Worship                                   | 863–872  |
| 33  | Barakah in Time and Effort                              | 873–882  |
| 34  | Righteous Death and Hereafter                           | 883–892  |
| 35  | Jannah and Final Abode                                  | 893–902  |
| 36  | Acceptance of Hajj and Umrah                            | 903–912  |
| 37  | Global Ummah and Justice                                | 913–922  |
| 38  | Prayers for Our Entire Lives                            | 923–932  |
| 39  | Lifetime Acceptance and Legacy                          | 933–942  |
| 40  | Final Comprehensive Duas                                | 943–1000 |

> Note: Some sections in the source repeat themes (e.g. multiple "Hereafter" sections). Preserve them as-is — do not merge. The repetition is intentional to the source.

---

## 4. Repository Layout

```
duas-arafah/
├── CLAUDE.md                    # this file
├── README.md                    # short public-facing readme
├── LICENSE                      # MIT for the code; content noted as public devotional material
├── index.html                   # single entry point
├── assets/
│   ├── css/
│   │   └── styles.css           # all styles, single file
│   ├── js/
│   │   ├── app.js               # main app controller
│   │   ├── views.js             # cards / list / table renderers
│   │   ├── search.js            # search + filter logic
│   │   └── theme.js             # dark/light toggle + persistence
│   ├── fonts/                   # self-hosted fonts (woff2)
│   └── icons/                   # inline SVG sprite or individual files
├── data/
│   ├── duas.json                # all 1000 Duas for Arafah, structured
│   └── sections.json            # section metadata
├── scripts/
│   └── build-data.js            # node script that parses the raw text into JSON
└── service-worker.js            # offline caching
```

---

## 5. Data Schema

### `data/duas.json`

```json
[
    {
        "id": 1,
        "text": "O Allah, increase me in Imaan and make it firm in my heart.",
        "sectionId": "imaan-worship",
        "sectionTitle": "Imaan & Worship"
    }
]
```

### `data/sections.json`

```json
[
    {
        "id": "imaan-worship",
        "title": "Imaan & Worship",
        "range": [1, 50],
        "count": 50,
        "order": 1
    }
]
```

The build script (`scripts/build-data.js`) must parse the raw `.txt` source and produce both files. Section detection: a line that matches `/^Section:/i` OR a header followed by `(\d+–\d+)` defines a section. Each numbered line `^\d+\.\s` is a dua.

---

## 6. UX / UI Design Specification

### 6.1 Layout (desktop)

```
┌──────────────────────────────────────────────────────────────┐
│  [logo]  1000 Duas for Arafah          [search]  [view]  [☾] │  ← sticky top bar
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐   ┌────────────────────────────────────┐   │
│  │              │   │                                    │   │
│  │  Sections    │   │   Main content area                │   │
│  │  (sidebar)   │   │   — cards / list / table           │   │
│  │              │   │                                    │   │
│  │  Imaan       │   │                                    │   │
│  │  Forgiveness │   │                                    │   │
│  │  Health      │   │                                    │   │
│  │  ...         │   │                                    │   │
│  │              │   │                                    │   │
│  └──────────────┘   └────────────────────────────────────┘   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 6.2 Layout (mobile)

- Top bar collapses; sidebar becomes a drawer triggered by a hamburger icon.
- View switcher and theme toggle remain visible in the top bar.
- Cards stack to a single column.

### 6.3 The Three Views

**Cards view (default)**

- Grid: 1 column on mobile, 2 on tablet, 3 on desktop, 4 on wide screens.
- Each card: dua number top-left in a soft pill, dua text in serif body, hover state lifts subtly with a shadow that reads as _quiet_, not bouncy.
- Click a card → opens a modal with that single dua at large size, with copy and share buttons.

**List view**

- Vertical list, full-width rows.
- Number, then dua text, separated by a thin divider.
- More information-dense; ideal for scrolling through a section.

**Table view**

- Three columns: `#`, `Dua`, `Section`.
- Sticky header row.
- Striped rows in light mode (very subtle), transparent in dark mode.
- Click any row → same modal as cards.

The active view persists in `localStorage` under `duas:view`.

### 6.4 Sidebar — Browse by Section

- Lists all sections with their range and count, e.g. `Imaan & Worship · 1–50`.
- Active section is highlighted with a left accent bar (1px, accent color).
- Clicking a section scrolls smoothly to its anchor in the main content and updates the URL hash (`#section-imaan-worship`).
- On mobile, it's a slide-in drawer with a backdrop.
- Sidebar has its own scroll, independent of main content.

### 6.5 Search

- A search input in the top bar with a subtle leading icon.
- Searches `text` only (not section titles, to keep results focused).
- Live filter — debounced 150 ms.
- When active, the main view shows a "Results (N)" header and hides section dividers.
- A clear (×) button inside the input resets.
- Keyboard shortcut: `/` focuses search, `Esc` clears and blurs.

### 6.6 Dua Modal

- Opens on dua click (cards / list / table all share it).
- Elegant dark design with semi-transparent background and backdrop blur.
- Max-width 500px, centered, with rounded corners (24px radius).
- **Header (centered)**:
    - "No. X / 1000" in muted text
    - Section badge below in pill shape with uppercase text
- **Body (centered)**:
    - "In the name of Allah" in golden italic text
    - Dua text in large serif font (Georgia)
    - "— Ameen —" in golden italic text
- **Navigation buttons** (above footer):
    - Two elongated pill-shaped buttons (44px × 64px)
    - Previous/Next navigation centered with gap
    - Positioned between content and action buttons
- **Footer actions**:
    - Three buttons: Star, Copy, Share
    - Icon above label, evenly spaced
    - Transparent background with hover effects
- Close button (×) in top-right corner
- `Esc` closes; arrow keys navigate prev/next; click outside closes.
- Deep-linkable: `?dua=42` opens dua 42 on load.
- Fully responsive with light/dark theme support.

### 6.7 Theme: Dark & Light

A single toggle in the top bar. Three states cycled in this order: **System → Light → Dark → System**.

- Default is `system` (respects `prefers-color-scheme`).
- Choice persists in `localStorage` under `duas:theme`.
- The toggle icon reflects the _current resolved_ theme (sun in light, moon in dark) plus a small "auto" indicator dot when in system mode.
- Theme transitions use a 200 ms ease on `background-color` and `color` only — no flicker, no flash.
- On first paint, theme must be applied **before** body renders (inline script in `<head>`) to prevent FOUC.

### 6.8 Color & Type Tokens

Define as CSS custom properties under `:root` and override under `[data-theme="dark"]`.

**Light theme**

```
--bg:           #FBF9F4   /* warm parchment, never pure white */
--bg-elevated:  #FFFFFF
--surface:      #F4F0E8
--border:       #E8E2D4
--text:         #1C1A14   /* near-black, slight warm tint */
--text-muted:   #6B6657
--accent:       #2F5D4F   /* deep masjid green — restrained */
--accent-soft:  #E5EDE9
```

**Dark theme**

```
--bg:           #1A1C24   /* elegant dark blue-gray */
--bg-elevated:  #1E202A   /* slightly lighter for cards */
--surface:      #252732   /* buttons and inputs */
--border:       rgba(255, 255, 255, 0.1)  /* subtle white borders */
--text:         rgba(255, 255, 255, 0.95) /* near-white */
--text-muted:   rgba(255, 255, 255, 0.6)  /* muted white */
--accent:       #D4AF37   /* golden accent for spiritual feel */
--accent-soft:  #1F2D27
```

**Typography**

- Body / UI: `Inter` (self-hosted woff2, weights 400 / 500 / 600).
- Dua text: `"Cormorant Garamond"` or `"Source Serif Pro"` for a quiet, classical feel — weight 400, size 1.125rem in cards / 1.5rem in modal, line-height 1.6.
- Numerals (dua IDs): use a tabular-nums variant.

**Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px.
**Radii:** 8px (small), 12px (cards), 16px (modal).
**Shadows (light only):** very soft — `0 1px 2px rgba(28,26,20,0.04), 0 4px 12px rgba(28,26,20,0.06)`.

### 6.9 Motion

- All transitions ≤ 200ms.
- Easing: `cubic-bezier(0.2, 0, 0, 1)` for enters, `cubic-bezier(0.4, 0, 1, 1)` for exits.
- Card hover: `transform: translateY(-2px)`, no scale.
- Respect `@media (prefers-reduced-motion: reduce)` — disable all transforms and transitions, keep instant state changes.

---

## 7. Functional Requirements

1. **Render all 1000 Duas for Arafah** grouped by section, with anchor IDs per section (`id="section-imaan-worship"`).
2. **Three view modes** (cards, list, table) toggleable via segmented control in the top bar.
3. **Sidebar navigation** with smooth scroll to sections.
4. **Search** across dua text with live filtering.
5. **Dua modal** with copy, share, prev/next, deep-linking.
6. **Theme toggle** with system / light / dark.
7. **Keyboard shortcuts:**
    - `/` focus search
    - `Esc` close modal / clear search
    - `←` / `→` navigate duas in modal
    - `g` then `s` jump to sections sidebar (focus first item)
    - `t` cycle theme
8. **Copy individual dua** to clipboard with a small toast confirmation.
9. **Deep linking:**
    - `#section-<id>` scrolls to a section
    - `?dua=<n>` opens that dua's modal on load
10. **Offline:** service worker caches `index.html`, CSS, JS, JSON, fonts on first visit.
11. **404-safe:** if `?dua=9999` is passed, fall through silently and show the home view.
12. **Print stylesheet:** `@media print` strips chrome, shows duas as numbered paragraphs grouped by section.

---

## 8. Non-Goals (explicitly out of scope)

- Audio recitations
- Arabic text or transliteration (the source provided is English-only; do not invent Arabic)
- User accounts, favorites stored server-side, or any backend
- Comments, ratings, or social features
- Push notifications, "dua of the day" reminders
- Translation switcher
- Analytics of any kind

If the user later asks for any of these, treat as a separate change request.

---

## 9. Accessibility Checklist

- [ ] All interactive elements are real `<button>` or `<a>` (no `div` click-handlers).
- [ ] Modal traps focus when open; focus returns to the trigger on close.
- [ ] Sidebar is a `<nav aria-label="Sections">`.
- [ ] Search input has a visible label or `aria-label="Search duas"`.
- [ ] Theme toggle has `aria-label` that updates with state.
- [ ] Color contrast ≥ 4.5:1 for body text in both themes; verified with a contrast checker.
- [ ] Skip-to-content link as the first focusable element.
- [ ] All images / icons have `alt` or `aria-hidden="true"` if decorative.
- [ ] Page has a sensible heading hierarchy: one `<h1>`, sections as `<h2>`.

---

## 10. Performance Budget

| Asset                  | Target                      |
| ---------------------- | --------------------------- |
| HTML                   | < 8 KB                      |
| CSS                    | < 20 KB gzipped             |
| JS                     | < 25 KB gzipped             |
| Fonts (subset)         | < 60 KB total               |
| `duas.json`            | < 80 KB gzipped             |
| First Contentful Paint | < 1.0 s on 4G               |
| Total Blocking Time    | < 100 ms                    |
| Lighthouse score       | ≥ 95 in all four categories |

Strategies:

- Inline critical CSS in `<head>`.
- Defer non-critical JS.
- Use `font-display: swap` on self-hosted fonts.
- Render-on-scroll for the main list (IntersectionObserver) so initial paint shows ~50 duas, rest mount as you scroll.

---

## 11. Implementation Notes for Claude Code

- **Stack:** vanilla HTML + CSS + JS. No React, no build step required for shipping (though a `scripts/build-data.js` Node script is fine for parsing the source text once).
- **State management:** a single `appState` object in `app.js` with `view`, `theme`, `searchQuery`, `activeSection`, `openDuaId`. Pub/sub via a tiny event emitter, ~30 lines.
- **Rendering:** template literals + `innerHTML` for the initial render of the 1000 list; subsequent updates (theme / view / search) should not re-render the whole list — toggle classes on `<html>` or use CSS `display` rules driven by data attributes (e.g. `[data-view="cards"]`) so the same DOM works for all views.
- **No frameworks. No bundler.** Plain ES modules referenced from `index.html` with `<script type="module">`.
- **One file per concern** as laid out in §4. Don't collapse into a single 1500-line file.
- **Don't over-comment.** Code should read clearly on its own; reserve comments for non-obvious decisions.
- **Don't generate placeholder duas.** All 1000 must come from parsing the canonical source text.
- **Don't add Arabic, transliteration, hadith citations, or commentary** — the source is English supplications only and the project deliberately stays minimal.

---

## 12. Build & Deploy

1. Run `node scripts/build-data.js` once (or whenever the source changes) to produce `data/duas.json` and `data/sections.json`.
2. Commit and push to `main`.
3. In repo settings, set GitHub Pages source to `main` branch / root.
4. The site should work locally just by opening `index.html` in a browser, or via `python3 -m http.server` for a clean origin (needed for service worker testing).

---

## 13. Definition of Done

- All 1000 Duas for Arafah render correctly, in their proper sections, with no duplicates and no missed entries.
- Cards / list / table views all work and switch instantly without re-rendering.
- Search filters across all duas with no visible lag.
- Light and dark themes both pass contrast checks.
- Modal opens, navigates, copies, shares, and closes correctly.
- Lighthouse mobile scores ≥ 95 across Performance, Accessibility, Best Practices, SEO.
- Site works offline after first load.
- Site works with JS disabled to the extent of showing the duas as plain semantic HTML grouped by section (progressive enhancement: pre-render the list server-side at build time into `index.html` so even a no-JS visitor can read all 1000).
- README has a one-paragraph description, a screenshot, and deploy instructions.

---

## 14. Tone for Copy

When writing UI copy (empty states, tooltips, button labels), keep it understated:

- Search empty state: _"No duas match that search."_ — not _"Oops! Nothing here 😅"_
- Copied toast: _"Copied"_ — not _"Yay! Copied to clipboard ✨"_
- Theme toggle tooltip: _"Theme: Light"_ / _"Theme: Dark"_ / _"Theme: System"_
- Footer: _"1000 supplications, gathered for the Day of Arafah."_ and a small line: _"May Allah accept."_

That's it. No marketing voice. No exclamation marks. Let the content carry the weight.
