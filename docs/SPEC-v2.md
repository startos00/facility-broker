# CloudtoTerra — Product Spec (v2.0)

**Version:** 2.0 — The "Three Node" Release
**Core Concept:** A geospatial marketplace connecting Network Societies with physical asset.
**MVP Constraints:** No Authentication required for viewing or posting.
**Pilot Context:** Buffalo, NY (Upstate Alpha).

---

## 1. User Interface: The "Command Center"

The UI is a map-first dashboard with a floating control panel.

### A. View Modes (Feature #2)

**Toggle:** A prominent Sun/Moon icon in the top right.

| Mode | Aesthetic | Use Case |
|------|-----------|----------|
| **Dark Mode** (Default) | "Hacker/Cyberpunk" — High contrast neons on dark grey | Best for visualizing data clusters |
| **Light Mode** | "Architect/Blueprint" — Clean white/paper background with blue lines | Best for viewing satellite terrain and street names |

### B. Search & Filter Bar (Feature #1)

A floating bar at the top center allows users to slice the map data:

| Filter | Input |
|--------|-------|
| **Location** | Text search (e.g., "Buffalo," "Sicily") |
| **Typology** | Multi-select dropdown (e.g., "Land," "Pop-up," "Facility") |
| **Price Range** | Slider ($0 – $5M+) |
| **Badges** | Toggle for "Distressed Only" or "Free Offers" |

### C. Filter Dropdown (Feature #10)

A filter button next to the search bar opens a dropdown panel with toggle chips for fine-grained map control:

| Section | Chips | Behavior |
|---------|-------|----------|
| **Node Types** | Society, Asset, Facility | Multi-toggle — hide/show pins by typology |
| **Layers** | Parcels | Toggle land parcel boundary outlines (visible at zoom ≥ 14) |
| **Amenities** | Parks, Architecture, Transit, Institutions | Multi-toggle — hide/show amenity features by category |

- Each chip shows a colored dot matching its map color
- Active count badge on the filter button when filters are narrowed
- Filters apply instantly — no "Apply" button needed

### D. Land Parcel Boundaries (Feature #11)

When zoomed to street level (zoom ≥ 14), the map renders building/parcel footprint outlines from Mapbox vector tiles:

- **Source:** Mapbox Streets v8 `building` layer
- **Visual:** Subtle cyan outlines (0.8px) with faint fill
- **Purpose:** Helps scouts identify specific parcels, lot boundaries, and building footprints when evaluating assets
- **Toggle:** Controllable via the Filter dropdown "Parcels" chip

---

## 2. The Data Model: Three Node Typologies

We are moving beyond just "Properties" to three distinct categories of nodes on the map.

### Type 1: The Network Society Node (Feature #3)

- **What it is:** Active communities, "Pop-up Cities," or existing "Base" locations (e.g., Zuzalu, Cabin, Vibecamp).
- **Map Pin Color:** 🔵 Cyan (Electric Blue)
- **Data Fields:**

| Field | Example |
|-------|---------|
| Community Name | "Buffalo DAO Meetup" |
| Current Population | 42 |
| "Vibe" | "Builder / Hacker" |
| Next Event Date | 2026-03-15 |

### Type 2: The Asset (Feature #4 & #8)

- **What it is:** Assets for sale. Raw land, whole buildings, abandoned hotels.
- **Map Pin Color:** 🟠 Orange (Construction)
- **Sub-Category:** Distressed Asset (flagged if the property is damaged/abandoned but high potential).
- **Data Fields:**

| Field | Example |
|-------|---------|
| Acreage | 0.25 |
| Price | $35,000 |
| Zoning | Residential / Mixed-Use |
| "Editability Score" | 8/10 |

### Type 3: The Facility / Space (Feature #5)

- **What it is:** Partial usage. A coworking hall, a garage, a basement, or a specific room within a building.
- **Map Pin Color:** 🟣 Purple (Access)
- **Special Flag:** "Free Offer" — Users can list space for free to attract builders.
- **Data Fields:**

| Field | Example |
|-------|---------|
| Capacity (pax) | 20 |
| Internet Speed | 500 Mbps |
| Availability | 3 months |

---

## 3. Functional Requirements

### A. The "Neighborhood Study" Layer (Feature #7)

This is the "Context" layer that sits under the user nodes. It helps investors understand where they are buying.

**The Amenities:** Fixed icons on the map that do not disappear.

| Icon | Category | Example |
|------|----------|---------|
| 🏛️ | Culture | Museums, Historic Sites (e.g., Darwin Martin House) |
| 🌳 | Nature | Parks (e.g., Olmsted System) |
| 🚇 | Transit | Metro stations, Airports |

**The Radius:** When a user clicks a Asset Node, the app draws a line to the nearest 3 Amenities showing distance (e.g., "0.5 miles to Metro").

### B. The Submission Flow (No Auth)

When a user clicks **[ + Signal Node ]**:

1. **Select Typology:** Society / Asset / Facility
2. **Draw the Boundary (Feature #9):**
   - **Desktop:** Click points on the map to draw a Polygon shape around the specific land/building footprint.
   - **Mobile:** Tap center to drop a pin (Polygon is hard on mobile MVP; fallback to Pin).
3. **The "Find Investor" Flag (Feature #6):**
   - A checkbox: "Are you seeking capital?"
   - If checked, the listing gets a 💸 Green Badge on the card.
4. **Upload:** Photo + Description.
5. **Submit:** Instant publication.

---

## 4. The "Parcel Details" Sidebar

When a user clicks a shape or pin, the sidebar slides out:

- **Header:** Image + Price + "Distressed" Badge (if applicable)
- **The "Investor" Block:**
  - "This node is seeking $50k for renovation." (Feature #6)
- **The Neighborhood Context:**
  - List of nearby Amenities (calculated geospatially)
- **The "Facility Broker" Offer:**
  - If it's a Type 3 Node: "Available for Free for Network State Founders."

---

## 5. Technical Stack (Building on v1)

v2 inherits the entire v1 infrastructure and extends it. No migration to a different provider.

### 5.1 Inherited from v1 (No Changes)

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Database** | Neon Serverless PostgreSQL | Same instance — `ep-super-brook-ahcg1lcp-pooler`, US East 1 (AWS) |
| **DB Driver** | `@neondatabase/serverless` | Pooled HTTP connection via Neon's serverless driver |
| **ORM** | Drizzle ORM + Drizzle Kit | Schema-first, type-safe queries, migration generation |
| **Frontend** | Next.js (App Router) | Server components + API routes |
| **Styling** | Tailwind CSS v4 | Utility-first, used for theming and Light/Dark Mode (Feature #2) |
| **Map** | Mapbox GL JS + `react-map-gl` | Dark map style, custom GeoJSON layers, markers |
| **Hosting** | Vercel | Free tier, auto-deploys from main branch |
| **Auth** | OFF | No authentication — public read/write |
| **Env Config** | `.env.local` | `DATABASE_URL` (Neon) + `NEXT_PUBLIC_MAPBOX_TOKEN` (Mapbox) |

### 5.2 New in v2

| Layer | Technology | Requirement |
|-------|-----------|-------------|
| **Map Drawing** | `mapbox-gl-draw` plugin | Enables users to click and draw Polygon shapes on the map (Feature #9) |
| **PostGIS** | Neon PostgreSQL extension | `geometry` column type to store drawn Polygons; spatial indexing with GIST |
| **Light/Dark Mode** | Tailwind `dark:` variant | Dual-theme support with CSS custom properties per mode |

### 5.3 Database Schema Update

The v1 `properties` and `amenities` tables are replaced by a unified `nodes` table with typology discrimination. The v1 amenities remain as hardcoded client-side GeoJSON for the Neighborhood Study layer.

```sql
-- Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- Unified nodes table with typology discrimination
CREATE TABLE nodes (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- Core fields (all types)
    node_name       VARCHAR(255) NOT NULL,
    typology        VARCHAR(20) NOT NULL CHECK (typology IN ('society', 'asset', 'facility')),
    description     TEXT,
    photo_url       TEXT,

    -- Geospatial (pin or polygon)
    location        GEOMETRY(Point, 4326),
    boundary        GEOMETRY(Polygon, 4326),
    latitude        DOUBLE PRECISION NOT NULL,
    longitude       DOUBLE PRECISION NOT NULL,

    -- Type 1: Society fields
    population      INTEGER,
    vibe            VARCHAR(100),
    next_event_date DATE,

    -- Type 2: Asset fields
    acreage         DECIMAL(10, 2),
    price           INTEGER,
    zoning          VARCHAR(100),
    editability     INTEGER CHECK (editability BETWEEN 1 AND 10),
    is_distressed   BOOLEAN DEFAULT FALSE,

    -- Type 3: Facility fields
    capacity_pax    INTEGER,
    internet_speed  VARCHAR(50),
    availability    VARCHAR(100),
    is_free_offer   BOOLEAN DEFAULT FALSE,

    -- Investor flag (Feature #6)
    seeking_capital BOOLEAN DEFAULT FALSE,
    capital_amount  VARCHAR(100),

    -- Metadata
    ip_hash         VARCHAR(64),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    is_visible      BOOLEAN DEFAULT TRUE
);

-- Spatial index
CREATE INDEX idx_nodes_location ON nodes USING GIST (location);
CREATE INDEX idx_nodes_boundary ON nodes USING GIST (boundary);

-- Query indexes
CREATE INDEX idx_nodes_typology ON nodes (typology, is_visible);
CREATE INDEX idx_nodes_price ON nodes (price) WHERE typology = 'asset';
CREATE INDEX idx_nodes_distressed ON nodes (is_distressed) WHERE is_distressed = TRUE;
CREATE INDEX idx_nodes_free ON nodes (is_free_offer) WHERE is_free_offer = TRUE;
```

---

## 6. Feature Summary

| # | Feature | Description | Status |
|---|---------|-------------|--------|
| 1 | Search & Filter | Location search, typology filter, price range, badge toggles | New |
| 2 | Light/Dark Mode | Sun/Moon toggle, Cyberpunk vs Blueprint aesthetics | New |
| 3 | Society Nodes | Cyan pins for active communities with population & events | New |
| 4 | Asset Nodes | Orange pins for land/buildings for sale | Enhanced from v1 |
| 5 | Facility Nodes | Purple pins for partial-use spaces, "Free Offer" flag | New |
| 6 | Investor Flag | "Seeking Capital" checkbox with 💸 badge | New |
| 7 | Neighborhood Study | Amenity context layer with distance radius on click | Enhanced from v1 |
| 8 | Distressed Asset Flag | Sub-category badge for high-potential damaged properties | New |
| 9 | Polygon Drawing | Desktop: draw boundary shapes; Mobile: pin fallback | New |
| 10 | Filter Dropdown | Toggle chips for node types, amenities, and map layers | New |
| 11 | Land Parcel Boundaries | Building/parcel footprint outlines at street-level zoom | New |

---

## 7. MVP Content Strategy (Buffalo Alpha)

To make the map useful immediately, pre-seed it with:

| Type | Count | Example |
|------|-------|---------|
| **Society Node** | 1 | "Buffalo DAO Meetup Spot" — Type 1 |
| **Amenities** | 5 | Olmsted Parks, Metro Line, Art Gallery — Neighborhood Layer |
| **Distressed Assets** | 5 | Cheap houses under $50k near the Metro — Type 2 |
| **Facility Offer** | 1 | Local coworking space offering free desks to builders — Type 3 |

---

## 8. Design Continuity from v1

The v2 design inherits the v1 "intelligence terminal" personality but expands it with dual-mode capability:

**Dark Mode Personality:** "A classified urban intelligence terminal that makes asset acquisition feel like strategic operations."

**Light Mode Personality:** "An architect's survey table where every parcel is a blueprint waiting for its builder."

### Design Guardrails (Carried from v1)

| Guardrail | Requirement |
|-----------|-------------|
| **Visual Hierarchy** | Clear priority ordering — eye knows where to go first |
| **Contrast & Legibility** | Text readable against backgrounds (WCAG AA minimum) |
| **Internal Consistency** | Design follows its own coherent system per mode |
| **Functional Clarity** | Interactive elements are recognizable as interactive |
| **Intentionality** | Every design choice has a justifiable reason |
| **No Frankenstein** | One unified design personality per mode |

---

## 9. Buffalo Alpha — Seed Data

### 9.1 The Anchors: Institutions & Amenities (Fixed Map Layer)

Permanent "Blue Chips" that drive value. Large, unmissable icons on the map.

**Cultural Institutions:**
| Name | Address | Note |
|------|---------|------|
| Buffalo AKG Art Museum | 1285 Elmwood Ave | World-class modern art collection |
| Darwin Martin House | 125 Jewett Pkwy | Frank Lloyd Wright masterpiece. Pilgrimage site for architects. |
| Buffalo History Museum | 1 Museum Ct | Only building surviving from the 1901 Pan-American Expo |
| Shea's Performing Arts Center | 646 Main St | Historic theatre district anchor |
| Buffalo Niagara Medical Campus (BNMC) | Ellicott & High St | Economic engine of downtown. 15,000+ jobs. |
| Central Terminal | 495 Paderewski Dr | Massive abandoned Art Deco train station. The ultimate "Distressed Masterpiece" for a Network State HQ. |

**Nature & Parks (The Olmsted System):**
| Name | Note |
|------|------|
| Delaware Park | The "Central Park" of Buffalo |
| Front Park | Views of Lake Erie and Canada |
| MLK Jr. Park | East Side anchor, connected by parkways |
| Canalside | Waterfront revitalization zone |

**Public Transport (The "Veins"):**
| Name | Note |
|------|------|
| NFTA Metro Rail (Main Street Line) | The spine of the city |
| Key Stations | University (North), Allen/Medical (Midtown), Fountain Plaza (Downtown), Canalside (Waterfront) |
| Buffalo Niagara International Airport (BUF) | 15 min drive from downtown |

### 9.2 The Inventory: Cheap Housing Clusters (Search Zones)

**Zone A: The Fruit Belt (Strategic High Ground)**
- **Thesis:** Directly adjacent to Medical Campus (15k jobs). Rapidly gentrifying but still has distressed shells.
- **Target Price:** $50k–$120k
- **Amenities:** Walkable to Downtown + Medical Campus
- **Sample:** 2-Story Wood Frame. "Needs Roof/Gut Reno." 2 blocks from Innovation Center.

**Zone B: Black Rock / Grant Street (The Immigrant/Punk Hub)**
- **Thesis:** High density, walkable, historic storefronts. The "cool" gritty neighborhood.
- **Target Price:** $80k–$150k
- **Amenities:** Wegmans, Live Music Venues, River access
- **Sample:** Mixed-Use (Storefront bottom, Apt top). "Potential for ground floor makerspace."

**Zone C: Broadway-Fillmore (The Deep Value Play)**
- **Thesis:** Near the Central Terminal (the Sleeping Giant). Very cheap, high vacancy.
- **Target Price:** $30k–$70k
- **Amenities:** Broadway Market (Historic food hall)
- **Sample:** Large Victorians (3,000+ sqft). Abandoned / Bank Owned. "High risk, massive upside if Terminal reopens."

### 9.3 The Facilities: Space Brokers (Type 3 Nodes)

| Name | Address | Note |
|------|---------|------|
| HANSA Workspace | 505 Ellicott St | Modern coworking in warehouse conversion |
| The Foundry | 298 Northampton St | Makerspace with wood/metal shops. Ideal for hardware startups. |
| Buffalo Game Space | Tri-Main Center | Game dev collective. Good "Internet Gang" energy. |
| 500 Pearl | 500 Pearl St | Mixed use — bowling/hotel. Good for "Zuzalu" style retreats. |

### 9.4 Distressed Asset Examples (Type 2 Nodes)

Large assets for DAOs to acquire:
- **Wonderbread Factory** — Large brick industrial shells in the Belt Line corridor
- **Church Conversions** — Buffalo has many empty churches due to demographic shifts (e.g., East Side listings)
- **"Zombie" Hotels** — Near Niagara Falls Blvd or outskirts, motels convertible to housing

### 9.5 Implementation: Metro Rail GeoJSON

The NFTA Metro Rail line is rendered as a **glowing Cyan LineString** (`#00FFFF` / `#22d3ee`) on the map — not just points. This visualizes "Connectivity" value immediately. A $40k house "on the Cyan Line" communicates instant transit access.
