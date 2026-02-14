# CloudtoTerra — Product Spec (MVP)

**Version:** 1.0 — The "Open Directory" Release
**Core Philosophy:** "The Interface Between Cloud and Land."
**Constraint:** No Authentication (Frictionless Submission)
**Primary Interface:** Global Geospatial Map

---

## 1. Executive Summary

CloudtoTerra is a permissionless, crowdsourced map of distressed real estate suitable for Network State incubation.

**MVP Goal:** A user can land on the site, zoom into a region (e.g., Buffalo, NY), see strategic amenities (Olmsted Parks, Metro), and instantly upload a property they find — without creating an account.

---

## 2. User Experience Flow

### A. The Viewer (Global Strategy)

- **Landing:** User sees a full-screen World Map (Dark Mode).
- **Navigation:** User zooms in from Continent → Country → City. Example: Zoom into Buffalo, NY.
- **Visualization:**
  - **The Amenities (Fixed Layer):** The map already highlights "Strategic Assets" (e.g., The Olmsted Park System is a glowing green polygon; The Metro Rail is a bright cyan line).
  - **The Inventory (User Layer):** User sees Pins dropped by other scouts.
- **Detail View:** Clicking a Pin opens a Sidebar Overlay showing the photo, price, and description.

### B. The Scout (The "No Auth" Submission)

- **The Trigger:** A prominent floating button on the bottom right: `[ + SIGNAL TERRITORY ]`
- **The Form:** A modal pops up over the map.
- **The Input:**
  1. Upload Photo (Direct from camera or camera roll)
  2. Location (Auto-detect GPS or Drag Pin on Map)
  3. Details (Name, Price Estimate, Description)
  4. Submit
- **The Result:** The Pin appears on the map instantly for all users.

---

## 3. Functional Requirements

### 3.1 Map Interface (The "Game Board")

**Engine:** Mapbox GL JS (preferred for custom styling) or Leaflet (simpler/free).

**Layer 1 — Strategic Amenities (Hardcoded for MVP):**
Pre-loaded "Civilizational Assets" so the map is never empty.

| Type | Asset | Visual |
|------|-------|--------|
| Polygon | Delaware Park | Green |
| Point | Darwin Martin House / FLW Architecture | Purple Icon |
| Point | AKG Art Museum | Pink Icon |
| Line | Metro Rail Main St | Cyan Line |
| Point | Highmark Stadium | Yellow Icon |

**Layer 2 — User Inventory:**
Pins added by users. Distinct color (Orange) to separate from Amenities.

### 3.2 The Submission System (No Auth)

- **Mechanism:** Public API Endpoint. No user ID required.
- **Spam Protection (MVP Level):**
  - Simple "Honeypot" field (hidden field bots fill but humans don't)
  - Rate limiting (1 post per IP per minute)
- **Admin Dashboard** required to delete bad posts manually.

### 3.3 The Input Fields

| Field | Example |
|-------|---------|
| **Node Name** | "Abandoned Victorian on Main" |
| **Photo** | File Upload — Max 5MB |
| **Location** | Lat/Long (GPS auto-detect or pin drag) |
| **Typology** | Dropdown: House, Land, Commercial, Industrial |
| **Highlights/Notes** | "Needs roof, but 2 mins from Metro" |

---

## 4. Technical Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | Next.js (React) | Fast, responsive, easy to deploy |
| **Map** | React-Map-GL (Mapbox wrapper) | Handles zoom, overlays, custom styles |
| **Database** | Neon (Serverless PostgreSQL) | Serverless Postgres with branching, scales to zero |
| **Image Storage** | Neon + Base64 or external (Cloudflare R2 / Vercel Blob) | MVP: store image URLs; future: dedicated object storage |
| **Auth** | OFF | No authentication — public INSERT allowed |
| **Hosting** | Vercel | Free tier covers MVP |

### 4.1 Database: Neon PostgreSQL

**Provider:** Neon Serverless Postgres
**Region:** US East 1 (AWS)
**Connection:** Pooled endpoint via `@neondatabase/serverless` driver

#### Schema

```sql
-- Enable PostGIS for geospatial queries (optional, MVP can use lat/lng columns)
-- CREATE EXTENSION IF NOT EXISTS postgis;

-- Properties table (User-submitted inventory)
CREATE TABLE properties (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    node_name       VARCHAR(255) NOT NULL,
    latitude        DOUBLE PRECISION NOT NULL,
    longitude       DOUBLE PRECISION NOT NULL,
    typology        VARCHAR(50) NOT NULL CHECK (typology IN ('house', 'land', 'commercial', 'industrial')),
    price_estimate  VARCHAR(100),
    notes           TEXT,
    photo_url       TEXT,
    ip_hash         VARCHAR(64),           -- SHA-256 hash of submitter IP (for rate limiting, not tracking)
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    is_visible      BOOLEAN DEFAULT TRUE   -- Admin soft-delete flag
);

-- Index for geospatial queries (bounding box lookups)
CREATE INDEX idx_properties_location ON properties (latitude, longitude);

-- Index for admin moderation
CREATE INDEX idx_properties_visible ON properties (is_visible, created_at DESC);

-- Index for rate limiting
CREATE INDEX idx_properties_ip_hash ON properties (ip_hash, created_at DESC);

-- Amenities table (Admin-managed strategic assets)
CREATE TABLE amenities (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    category        VARCHAR(50) NOT NULL CHECK (category IN ('park', 'architecture', 'transit', 'institution', 'other')),
    geometry_type   VARCHAR(20) NOT NULL CHECK (geometry_type IN ('point', 'line', 'polygon')),
    coordinates     JSONB NOT NULL,        -- GeoJSON coordinates array
    color           VARCHAR(20) NOT NULL,  -- Display color (e.g., '#22c55e', 'cyan')
    icon            VARCHAR(50),           -- Optional icon identifier
    city            VARCHAR(100) NOT NULL,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Index for city-based amenity loading
CREATE INDEX idx_amenities_city ON amenities (city);
```

#### Environment Variable

```
DATABASE_URL=<your-neon-connection-string>
```

---

## 5. UI / Visual Design

### Design Direction (VS Design Diverge Output)

**Aesthetic:** Clean Urban Analytics Intelligence Platform
**Typicality Score:** T < 0.2 (Experimental/Bold)

#### Emotional Tone
- **Covert Ops / Recon** — but refined and clean, not gritty
- High-caliber urban analytics energy
- The user should feel like they're accessing a sophisticated territorial intelligence platform built for people who make real land decisions

#### Anti-References (What This Is NOT)
- **Not Zillow/Redfin** — No friendly consumer real estate. No pastels, no house icons, no "Dream Home" energy.
- **Not Google Maps** — No sterile corporate cartography. This needs intentionality, not utility.
- **Not a SaaS Startup** — No gradient buttons, no rounded cards, no "Sign up free." This is a mission briefing, not a product demo.

#### Visual System

| Element | Specification |
|---------|--------------|
| **Map Base** | Dark Grey / Midnight Blue — near-black with minimal labels |
| **UI Chrome** | Semi-transparent frosted glass panels — clean, not decorative |
| **Typography** | Refined sans-serif headers + monospace for data/coordinates |
| **Color Palette** | Calibrated signal colors on dark field (green zones, cyan routes, orange inventory) |
| **Amenity Rendering** | Subtle glow effects — parks as luminous polygons, transit as traced lines |
| **User Pins** | Distinct orange markers with soft halo — clearly separated from amenities |
| **Animations** | Minimal, purposeful — smooth transitions, no gratuitous motion |

#### Screen Layout

```
┌─────────────────────────────────────────────────┐
│ [🔍 Search: "Find Buffalo..."]                  │
│                                                 │
│                                                 │
│            FULL-SCREEN MAP                      │
│         (The Intelligence Surface)              │
│                                                 │
│                                    ┌──────────┐ │
│                                    │ DETAIL   │ │
│                                    │ DRAWER   │ │
│                                    │ (hidden  │ │
│                                    │  default)│ │
│                                    │          │ │
│                                    └──────────┘ │
│                                                 │
│                              [ + SIGNAL TERRITORY ]│
└─────────────────────────────────────────────────┘
```

- **Top Left:** Search bar
- **Bottom Right:** Circular FAB for property submission
- **Right Side (hidden by default):** Slide-out detail drawer, triggered by clicking a pin
  - Large photo (top)
  - Distance to nearest amenity (e.g., "0.4 mi to Olmsted Park")
  - Description text
  - Typology badge

---

## 6. Data Strategy: Buffalo Alpha

Since the map starts empty, Amenities must be populated before launch so the "Context" exists.

### Pre-Loaded Data Points (The "Magnets")

| Category | Assets |
|----------|--------|
| **Olmsted Park System** | Polygons: Delaware Park, The Parade, The Front |
| **FLW Architecture** | Pins: Darwin Martin House, Graycliff |
| **Transit** | Line: NFTA Metro Rail |
| **Institutions** | Pins: Buffalo AKG Art Museum, Highmark Stadium, Kleinhans Music Hall |

**User Behavior:** Users find cheap houses near these magnets and pin them.

---

## 7. Success Metrics

| Metric | Target |
|--------|--------|
| **Friction Test** | User can upload a property in under 30 seconds |
| **Visual Density** | Map looks populated (Amenities + Properties) in Buffalo |
| **Directory Growth** | Number of valid user submissions per week |

---

## 8. Design Guardrails (VS Quality Gates)

These are non-negotiable regardless of aesthetic ambition:

| Guardrail | Requirement |
|-----------|-------------|
| **Visual Hierarchy** | Clear priority ordering — eye knows where to go first |
| **Contrast & Legibility** | Text readable against backgrounds (WCAG AA minimum) |
| **Internal Consistency** | Design follows its own coherent system |
| **Functional Clarity** | Interactive elements are recognizable as interactive |
| **Intentionality** | Every design choice has a justifiable reason |
| **No Frankenstein** | One unified design personality, describable in one sentence |

**Design Personality (One Sentence):**
"A classified urban intelligence terminal that makes territory acquisition feel like strategic operations."
