# Feature Doc: CloudtoTerra Landing Page

## Overview

A "Mission Briefing" styled landing page that introduces operators to the CloudtoTerra geospatial intelligence platform. The page serves as the entry point (`/`) and drives users to the Command Center map at `/map`.

## Route Change

| Before | After |
|--------|-------|
| `/` → Map App | `/` → Landing Page |
| — | `/map` → Map App |

## Design Concept: "Mission Briefing Terminal"

The landing page follows the app's "intelligence terminal" aesthetic. It's not a typical SaaS landing page — it's an operational briefing document rendered as a digital terminal interface.

**Personality:** "You're not signing up for a product. You're being briefed on a classified territorial intelligence system."

## Sections

### 1. Hero — "System Access"

- Full-screen dark void with subtle topographic grid lines and noise texture
- Boot sequence animation (4 lines appear sequentially): system init, geospatial engine, pilot zone, awaiting input
- CloudtoTerra wordmark with "TO" highlighted in signal orange
- Crosshair/target reticle icon
- Tagline: "The geospatial marketplace where Network Societies find physical territory."
- Primary CTA: "ENTER COMMAND CENTER" (links to `/map`)
- Scroll hint at bottom

### 2. Three Signal Types — "Intelligence Classification"

Three cards representing the node typologies:

| Type | Color | Key Stat |
|------|-------|----------|
| **Society** | Cyan `#22d3ee` | 42 avg population |
| **Asset** | Orange `#ff8033` | $35k median price |
| **Facility** | Purple `#b07aff` | FREE offers available |

Each card has:
- Typology icon (SVG)
- Mono label with colored dot
- Description text
- Bottom stat bar with divider

### 3. Pilot Zone: Buffalo, NY

- Section branded as "PILOT ZONE ALPHA"
- GPS coordinates display
- Narrative paragraph about Buffalo's opportunity
- 4-stat grid: $30k assets, 15k+ jobs, 7 metro stations, 3 Olmsted parks
- 3 investment zone callouts (Fruit Belt, Black Rock, Broadway-Fillmore) with thesis + price range

### 4. Operations Manual — "How It Works"

Four-step vertical timeline with connecting lines:

1. **SIGNAL** (cyan) — Select your node type
2. **LOCATE** (orange) — Drop pin or draw boundary polygon
3. **TRANSMIT** (purple) — Add intel, no account needed
4. **CONNECT** (green) — Flag for investors

### 5. Open Protocol

- Green "Open Protocol" badge
- "No Gatekeepers" headline
- Explanation of no-auth philosophy
- Solid orange "OPEN THE MAP" CTA button
- "Buffalo Alpha Live" indicator

### 6. Footer

- Wordmark + version number
- Tagline: "The Interface Between Cloud and Land"

## Visual Elements

| Element | Implementation |
|---------|---------------|
| **Grid background** | CSS linear-gradient, 60px spacing, 3% opacity cyan lines |
| **Noise texture** | Inline SVG `feTurbulence` filter, 1.5% opacity |
| **Vignette** | Radial gradient from transparent center to void edges |
| **Boot sequence** | `setInterval` at 180ms, 4 lines, then content fade-in |
| **Crosshair** | Nested circles with cross lines, cyan glow center |
| **Color system** | Same as app — void `#04060b`, signal colors, `#5a6a80` dim text |
| **Typography** | JetBrains Mono for labels/data, Inter for body |
| **Hover states** | Cards lift `-translate-y-1`, CTAs glow + shift |

## Technical Details

- **File:** `src/app/page.tsx` (client component)
- **Route:** `/` (landing page)
- **Map moved to:** `src/app/map/page.tsx` → `/map`
- **CSS change:** `body { overflow: hidden }` → `body.map-view { overflow: hidden }` (landing page scrolls, map doesn't)
- **Dependencies:** None new — uses existing Next.js, React, Tailwind
- **Performance:** Static page, no API calls, no heavy dependencies

## Responsive Behavior

- **Desktop:** 3-column typology cards, 4-column stats grid, side-by-side footer
- **Mobile:** Single column stack, 2-column stats grid, centered footer
- **Breakpoints:** `sm:` (640px), `md:` (768px) via Tailwind
