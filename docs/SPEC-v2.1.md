# CloudtoTerra — Product Spec (v2.1)

**Version:** 2.1 — The "CivicPattern" Release
**Core Concept:** The AI Operating System for Social Infrastructure.
**Evolution:** Extends v2.0's geospatial marketplace with AI-powered civic analysis engines.
**Pilot Contexts:** Buffalo, NY (Alpha) | St Kilda, Melbourne (Beta) | Fremantle, WA (Gamma).

---

## 1. Executive Summary

v2.1 introduces **CivicPattern** — a three-engine intelligence layer that transforms CloudtoTerra from a crowdsourced asset map into a full-lifecycle tool for social infrastructure. The platform now covers:

1. **Understanding** what civic institutions exist globally (The Archive)
2. **Analyzing** how neighborhoods perform around them (The Context Scanner)
3. **Identifying** where to build next (The Site Scout)

The "killer feature" is the **Synthesis Loop**: when the Site Scout finds an abandoned building, the system automatically analyzes the neighborhood context, searches the global archive for precedents, and generates an adaptive reuse recommendation with case studies.

**Tagline:** The AI Operating System for Social Infrastructure.

---

## 2. User Interface: The Three-Panel Dashboard

The v2.0 map-first interface evolves into a three-panel layout. The panels interact — selecting a site on the Map populates both the Lens and the Pulse.

### A. The Map (Center Panel)

The existing Mapbox 3D map, now enhanced with:

- **Ghost Site markers** — Abandoned/underutilized buildings detected by the Site Scout (pulsing red-orange pins)
- **Heatmap overlays** — Neighborhood health scores, social desert zones
- **Isochrone rings** — Walkability catchments drawn on demand (5/10/15 min)
- **Archive pins** — Global case study locations (gold diamond markers)

Inherits all v2.0 map features: dark/light mode, search/filter, polygon drawing, parcel boundaries.

### B. The Lens (Left Panel)

Detailed architectural and typological data for the selected site:

| Section | Content |
|---------|---------|
| **Classification** | AI-assigned typology tags (e.g., "Nordic Modernism, Public Atrium, High Transparency") |
| **Floor Plan Analysis** | Public-to-private ratio, circulation area, accessibility score |
| **Condition Assessment** | Roof status, structural grade, entropy indicators |
| **Success Metrics** | Foot traffic estimate, digital footprint score, activation level |
| **Case Studies** | Matched global precedents from the Archive |

### C. The Pulse (Right Panel)

Real-time urban analytics for the surrounding neighborhood:

| Section | Content |
|---------|---------|
| **Density** | Solid-to-void ratio, building coverage %, dwelling units per hectare |
| **Connectivity** | Intersections per km², street integration score, transit access |
| **Demographics** | Population within isochrone, age distribution, household income |
| **Social Gap** | Missing civic amenities identified (e.g., "No library within 2km") |
| **Recommendation** | AI-generated intervention suggestion with confidence score |

### D. Panel Behavior

- **Default:** Map full-screen (v2.0 behavior)
- **Site selected:** Lens slides in from left, Pulse slides in from right
- **Mobile:** Panels stack as bottom sheets (swipe up to reveal)
- **Keyboard shortcut:** `L` toggles Lens, `P` toggles Pulse, `Esc` closes both

---

## 3. The Three Core Engines

### Engine A: The Archive ("The Teacher")

**Purpose:** A searchable global database of "what works" in civic architecture.

**Data Collection:**
- Users upload photos or enter addresses of civic buildings worldwide
- AI classifies the typology, extracts architectural features, estimates floor plan ratios
- System scrapes public data to score "success" (Instagram tags, Google reviews, mobility data)

**Outputs per entry:**

| Field | Example |
|-------|---------|
| **Name** | Oodi Library, Helsinki |
| **Typology Tags** | Nordic Modernism, Public Atrium, High Transparency |
| **Public-to-Private Ratio** | 72:28 |
| **Digital Footprint Score** | 94/100 (high Instagram presence) |
| **Activation Score** | 88/100 (high foot traffic) |
| **Original Function** | Purpose-built Library |
| **Conversion** | N/A (new build) |

**Map Representation:** Gold diamond markers with subtle glow. Clicking opens Lens panel with full typology breakdown.

### Engine B: The Context Scanner ("The Analyst")

**Purpose:** Diagnoses the urban fabric surrounding any selected site.

**Analysis Pipeline:**

1. **Urban Grain Analysis** (Computer Vision on satellite imagery)
   - Solid-to-Void Ratio: density classification
   - Permeability: intersections per km² (walkability proxy)
   - Street network integration (Space Syntax-style)

2. **Catchment Dynamics**
   - Isochrone generation: 5/10/15-minute walk polygons
   - Demographic overlay: census data matched to walk-zone
   - Amenity gap detection: what's missing in the catchment

3. **Neighborhood Diagnosis**
   - Text summary: e.g., "High density, zero community gathering spaces within 10-min walk"
   - Health score: 0-100 composite metric
   - Comparison: percentile rank vs. other neighborhoods in the city

**Map Representation:** Heatmap overlay (green = healthy, red = social desert). Isochrone rings on click.

### Engine C: The Site Scout ("The Hunter")

**Purpose:** Automatically detects abandoned or underutilized sites for intervention.

**Detection Methods:**

| Signal | Data Source | Technique |
|--------|-----------|-----------|
| **Overgrown vegetation** | Sentinel-2 satellite | NDVI change detection (time-lapse) |
| **Boarded windows** | Google Street View | YOLO v8 object detection |
| **Dark at night** | VIIRS nighttime lights | Radiance drop below threshold |
| **Digital silence** | Google Places, OSM | No new reviews in 24+ months, marked "Permanently Closed" |
| **Permit inactivity** | Municipal open data | No building permits filed in 5+ years |

**Outputs per site:**

| Field | Example |
|-------|---------|
| **Abandonment Probability** | 94% |
| **Estimated Vacancy Duration** | Since ~2018 |
| **Roof Condition** | Fair (satellite estimate) |
| **Lot Size** | 1,200 sqm |
| **Last Known Function** | Post Office |
| **Ownership** | City-owned (tax lien) |

**Map Representation:** Pulsing red-orange markers. Opacity corresponds to abandonment probability. Clicking opens Lens with condition assessment.

---

## 4. The Synthesis Loop ("The Killer Feature")

When a user selects a Ghost Site detected by Engine C, the system executes this logic chain automatically:

```
┌──────────────────────────────────────────────────────────────────┐
│  1. SITE SCOUT finds: Abandoned Post Office (Engine C)           │
│     → "94% probability of abandonment. 1,200 sqm. City-owned."  │
│                                                                  │
│  2. CONTEXT SCANNER analyzes neighborhood (Engine B)             │
│     → "High youth density. Zero study spaces or libraries        │
│        within 15-min walk. Social Desert score: 23/100."         │
│                                                                  │
│  3. ARCHIVE searches global precedents (Engine A)                │
│     → "3 case studies found for Post Office → Library/Media Lab  │
│        conversions in similar demographic contexts."             │
│                                                                  │
│  4. SYNTHESIS generates recommendation                           │
│     → "Convert to Youth Media Lab. Confidence: 82%.              │
│        See: Chicago (2019), Berlin (2021), Melbourne (2022)."    │
└──────────────────────────────────────────────────────────────────┘
```

### Recommendation Card (displayed in Pulse panel)

| Field | Content |
|-------|---------|
| **Suggested Intervention** | Youth Media Lab |
| **Confidence** | 82% |
| **Rationale** | High youth density + zero study spaces + successful precedents |
| **Case Study 1** | Old Post Office → YOUmedia, Chicago (2019) |
| **Case Study 2** | Postamt → Medienzentrum, Berlin (2021) |
| **Case Study 3** | GPO → The Hub, Melbourne (2022) |
| **Estimated Conversion Cost** | $180–$240/sqm (based on precedents) |
| **Action** | [Contact City] [Save to Project] [Share Report] |

---

## 5. Data Model Updates

### 5.1 Inherited from v2.0 (No Changes)

The `nodes` table, amenities layer, and all v2.0 schema remain intact.

### 5.2 New Tables for v2.1

```sql
-- Global Archive of civic architecture case studies
CREATE TABLE archive_entries (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    city            VARCHAR(100) NOT NULL,
    country         VARCHAR(100) NOT NULL,
    location        GEOMETRY(Point, 4326),

    -- Typology classification
    typology_tags   TEXT[] NOT NULL,          -- e.g., {'Nordic Modernism', 'Public Atrium'}
    original_function VARCHAR(100),           -- e.g., 'Post Office'
    current_function VARCHAR(100),            -- e.g., 'Youth Media Lab'
    is_conversion   BOOLEAN DEFAULT FALSE,

    -- Architectural metrics
    floor_area_sqm  DECIMAL(12,2),
    public_private_ratio DECIMAL(5,2),        -- 0.72 = 72% public
    floor_count     INTEGER,
    year_built      INTEGER,
    year_converted  INTEGER,

    -- Success metrics
    digital_footprint_score INTEGER CHECK (digital_footprint_score BETWEEN 0 AND 100),
    activation_score        INTEGER CHECK (activation_score BETWEEN 0 AND 100),
    annual_visitors         INTEGER,

    -- Media
    photo_urls      TEXT[],
    source_url      TEXT,

    -- Metadata
    submitted_by_ip VARCHAR(64),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    is_verified     BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_archive_location ON archive_entries USING GIST (location);
CREATE INDEX idx_archive_tags ON archive_entries USING GIN (typology_tags);
CREATE INDEX idx_archive_function ON archive_entries (original_function, current_function);

-- Detected ghost sites (Engine C output)
CREATE TABLE ghost_sites (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    location        GEOMETRY(Point, 4326) NOT NULL,
    boundary        GEOMETRY(Polygon, 4326),
    latitude        DOUBLE PRECISION NOT NULL,
    longitude       DOUBLE PRECISION NOT NULL,

    -- Detection data
    abandonment_probability DECIMAL(5,2) NOT NULL,  -- 0.00 to 1.00
    vacancy_since   DATE,
    last_known_function VARCHAR(100),
    lot_size_sqm    DECIMAL(12,2),
    ownership_type  VARCHAR(50),                     -- city-owned, private, bank, etc.

    -- Condition signals
    ndvi_score      DECIMAL(5,3),                    -- vegetation overgrowth indicator
    night_light_score DECIMAL(5,3),                  -- VIIRS radiance
    has_boarded_windows BOOLEAN,
    last_review_date DATE,
    osm_status      VARCHAR(50),                     -- open, closed, demolished

    -- Address
    address         TEXT,
    city            VARCHAR(100) NOT NULL,
    country         VARCHAR(100) NOT NULL,

    -- Metadata
    detected_at     TIMESTAMPTZ DEFAULT NOW(),
    last_scanned    TIMESTAMPTZ DEFAULT NOW(),
    is_verified     BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_ghost_location ON ghost_sites USING GIST (location);
CREATE INDEX idx_ghost_city ON ghost_sites (city, abandonment_probability DESC);

-- Neighborhood analysis cache (Engine B output)
CREATE TABLE neighborhood_analyses (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    center_point    GEOMETRY(Point, 4326) NOT NULL,
    radius_meters   INTEGER NOT NULL DEFAULT 800,    -- ~10 min walk

    -- Urban grain
    solid_void_ratio   DECIMAL(5,2),
    intersections_per_sqkm INTEGER,
    street_integration_score DECIMAL(5,2),

    -- Demographics (from census overlay)
    population_in_catchment INTEGER,
    median_age      DECIMAL(4,1),
    median_income   INTEGER,
    youth_pct       DECIMAL(5,2),
    elderly_pct     DECIMAL(5,2),

    -- Amenity gaps
    missing_amenities TEXT[],                        -- e.g., {'library', 'community_center'}
    health_score    INTEGER CHECK (health_score BETWEEN 0 AND 100),
    diagnosis_text  TEXT,

    -- Cache
    computed_at     TIMESTAMPTZ DEFAULT NOW(),
    expires_at      TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days'
);

CREATE INDEX idx_neighborhood_center ON neighborhood_analyses USING GIST (center_point);

-- AI-generated recommendations (Synthesis Loop output)
CREATE TABLE reuse_recommendations (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ghost_site_id   UUID REFERENCES ghost_sites(id) ON DELETE CASCADE,
    analysis_id     UUID REFERENCES neighborhood_analyses(id),

    -- Recommendation
    suggested_function VARCHAR(255) NOT NULL,
    confidence_score   DECIMAL(5,2) NOT NULL,        -- 0.00 to 1.00
    rationale       TEXT NOT NULL,

    -- Matched case studies
    case_study_ids  UUID[],                          -- references to archive_entries
    estimated_cost_per_sqm_low  DECIMAL(10,2),
    estimated_cost_per_sqm_high DECIMAL(10,2),

    -- Metadata
    generated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reuse_ghost ON reuse_recommendations (ghost_site_id);
```

---

## 6. Technical Stack

### 6.1 Inherited from v2.0 (No Changes)

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js (App Router) |
| **Map** | Mapbox GL JS + `react-map-gl` |
| **Database** | Neon Serverless PostgreSQL + PostGIS |
| **ORM** | Drizzle ORM |
| **Styling** | Tailwind CSS v4 |
| **Hosting** | Vercel |

### 6.2 New in v2.1

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Data Ingestion** | Python (Scrapy) + OSMnx + Google Places API | **Primary data backbone** — scrapes architectural sites, OSM maps, business status |
| **Computer Vision** | YOLO v8 (Object Detection) + SAM (Segment Anything) | Detects abandonment features (boarded windows); parses floor plans |
| **Satellite Analysis** | Google Earth Engine / Sentinel-2 | NDVI vegetation change detection + VIIRS night lights |
| **Isochrone API** | Mapbox Isochrone API or Valhalla | Walk-time catchment polygon generation |
| **AI Logic** | Python (scikit-learn) or Claude API | Correlates typology + demographics → generates recommendations |
| **3D Visualization** | Three.js (via existing Mapbox GL) | 3D building massing for Archive entries and site proposals |
| **Job Queue** | Vercel Cron + serverless functions | Scheduled scans for ghost site detection |

### 6.3 Data Ingestion Pipeline (Critical Path)

The ingestion pipeline is the **foundation of all three engines**. Without automated data collection, the Archive is empty, the Context Scanner has no building footprints, and the Site Scout has nothing to scan. This is the first thing to build and the last thing to compromise.

#### 6.3.1 Scrapy — Architectural Web Crawling

**What it feeds:** Engine A (The Archive)

| Target | Data Extracted | Schedule |
|--------|---------------|----------|
| ArchDaily | Project name, location, architect, typology, photos, floor area, description | Weekly |
| Dezeen | Project name, location, architect, photos, awards | Weekly |
| Divisare | High-res imagery, typological classification | Biweekly |
| Pritzker / RIBA / Aga Khan Award archives | Award-winning civic buildings with documentation | Monthly |
| Municipal registries (per-city) | Public building inventories, addresses, year built | Monthly |

**Pipeline:**
1. Spider crawls target site, respecting `robots.txt` + 1 req/sec rate limit
2. Item pipeline extracts structured fields (name, coords, tags, image URLs)
3. Geocoder resolves address → lat/lng (via Mapbox Geocoding API)
4. Deduplicator checks PostGIS for existing entries within 50m radius with similar name
5. New entries written to `raw_ingestion` staging table
6. Admin reviews → promotes to `archive_entries`

**Infrastructure:** Python service deployed as Vercel Cron function or standalone container (Railway / Fly.io). Stores raw HTML in object storage for audit trail.

#### 6.3.2 OSMnx — OpenStreetMap Mining

**What it feeds:** Engine A (Archive enrichment), Engine B (street networks), Engine C (closure detection)

**Queries:**
```python
# Civic buildings in Buffalo
tags = {
    'amenity': ['library', 'community_centre', 'social_facility',
                'post_office', 'theatre', 'arts_centre', 'school'],
    'building': ['civic', 'public']
}
gdf = ox.features_from_place("Buffalo, New York, USA", tags)

# Street network for connectivity analysis
G = ox.graph_from_place("Buffalo, New York, USA", network_type='walk')
```

**Data extracted per building:**
- Name, coordinates, building footprint polygon (GeoJSON)
- OSM tags (opening hours, website, phone)
- `disused:*` / `abandoned:*` tag prefixes → feeds Ghost Site detection
- Wikidata QID → cross-reference for architect, year built, photos

**Schedule:** Daily differential updates via OSM changeset API (only process new/modified elements).

**Street network output:** Intersection density (per km²), betweenness centrality, street integration scores — cached per neighborhood, feeds Engine B Context Scanner.

#### 6.3.3 Google Places API — Business Intelligence Layer

**What it feeds:** Engine A (success metrics), Engine C (digital silence detection)

**Calls per building:**

| Endpoint | Data | Use |
|----------|------|-----|
| Place Details | `business_status` (OPERATIONAL / CLOSED_TEMPORARILY / CLOSED_PERMANENTLY) | Ghost Site detection |
| Place Details | `reviews` (count, rating, recency) | Digital Footprint Score + Digital Silence |
| Place Details | `photos` (reference IDs) | Archive imagery enrichment |
| Place Details | `current_opening_hours` | Activation validation |

**Derived Scores:**
- **Digital Silence Score**: months since last review. >24 months = flagged for Engine C
- **Digital Footprint Score**: `min(100, review_count * 2 + rating * 10 + has_photos * 20)`
- **Activation Score**: Derived from Popular Times histogram where available (peak-to-baseline ratio)

**Quota Management:**
- MVP: ~1,000 Place Details calls/day (free tier covers initial seeding)
- Responses cached in PostGIS with 30-day TTL
- Batch processing: nightly job processes queue of buildings needing refresh
- Priority queue: Ghost Site candidates refreshed first

#### 6.3.4 Pipeline Orchestration

```
┌─────────────────────────────────────────────────────────────┐
│                    INGESTION PIPELINE                       │
│                                                             │
│  ┌──────────┐   ┌──────────┐   ┌───────────────┐          │
│  │  Scrapy   │   │  OSMnx   │   │ Google Places │          │
│  │ (weekly)  │   │ (daily)  │   │   (nightly)   │          │
│  └─────┬─────┘   └─────┬────┘   └──────┬────────┘          │
│        │               │               │                    │
│        └───────┬───────┘───────────────┘                    │
│                │                                            │
│         ┌──────▼──────┐                                     │
│         │ raw_ingest  │  Staging table — all sources land   │
│         │   table     │  here before promotion              │
│         └──────┬──────┘                                     │
│                │                                            │
│         ┌──────▼──────┐                                     │
│         │  Geocode +  │  Mapbox Geocoding API               │
│         │ Normalize   │  Standardize fields across sources  │
│         └──────┬──────┘                                     │
│                │                                            │
│         ┌──────▼──────┐                                     │
│         │ Deduplicate │  PostGIS: 50m radius + fuzzy name   │
│         │             │  match → merge or skip              │
│         └──────┬──────┘                                     │
│                │                                            │
│         ┌──────▼──────┐                                     │
│         │  Cross-ref  │  Wikidata QID, OSM ↔ Places match   │
│         │  & Enrich   │  Merge signals from multiple sources│
│         └──────┬──────┘                                     │
│                │                                            │
│         ┌──────▼──────┐                                     │
│         │  Confidence │  3+ corroborating sources → auto    │
│         │   Scoring   │  verify. <3 → manual review queue   │
│         └──────┬──────┘                                     │
│                │                                            │
│         ┌──────▼──────┐   ┌──────────────┐                  │
│         │ archive_    │   │ ghost_sites   │                  │
│         │ entries     │   │ (if closed/   │                  │
│         │             │   │  abandoned)   │                  │
│         └─────────────┘   └──────────────┘                  │
│                                                             │
│  ┌─────────────────────────────────────────────────┐        │
│  │ ADMIN DASHBOARD                                 │        │
│  │ • Sources crawled today: 3                      │        │
│  │ • New entries staged: 47                        │        │
│  │ • Auto-verified: 12                             │        │
│  │ • Pending review: 35                            │        │
│  │ • Duplicates caught: 8                          │        │
│  │ • Errors: 2 (geocoding failures)                │        │
│  └─────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

**Database table for staging:**

```sql
CREATE TABLE raw_ingestion (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    source          VARCHAR(50) NOT NULL,    -- 'scrapy_archdaily', 'osmx', 'google_places'
    source_id       TEXT,                    -- external ID (OSM node ID, Place ID, URL)
    raw_data        JSONB NOT NULL,          -- full extracted payload
    name            VARCHAR(255),
    latitude        DOUBLE PRECISION,
    longitude       DOUBLE PRECISION,
    status          VARCHAR(20) DEFAULT 'staged'
                    CHECK (status IN ('staged', 'verified', 'rejected', 'duplicate')),
    promoted_to     UUID,                    -- FK to archive_entries or ghost_sites
    ingested_at     TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at     TIMESTAMPTZ
);

CREATE INDEX idx_ingestion_status ON raw_ingestion (status, ingested_at DESC);
CREATE INDEX idx_ingestion_source ON raw_ingestion (source, source_id);
```

### 6.4 API Routes (New)

| Route | Method | Description |
|-------|--------|-------------|
| `/api/archive` | GET | Search archive entries by tags, function, location |
| `/api/archive` | POST | Submit new archive entry (photo + address) |
| `/api/ghost-sites` | GET | List ghost sites by city, probability threshold |
| `/api/analyze-neighborhood` | POST | Trigger neighborhood analysis for a lat/lng |
| `/api/recommend` | POST | Generate reuse recommendation for a ghost site |
| `/api/isochrone` | GET | Get walk-time polygon for a point |
| `/api/ingestion/status` | GET | Pipeline health dashboard — entries staged, verified, errors |
| `/api/ingestion/review` | GET | List entries pending manual review |
| `/api/ingestion/review/:id` | POST | Approve or reject a staged entry |
| `/api/ingestion/trigger` | POST | Manually trigger a crawl job (admin only) |

---

## 7. Feature Summary

| # | Feature | Engine | Description | Status |
|---|---------|--------|-------------|--------|
| 12 | Global Archive | A | Searchable database of civic architecture case studies with typology tags | New |
| 13 | Typology Decomposition | A | AI-powered architectural classification from photos | New |
| 14 | Success Metrics | A | Digital footprint + foot traffic scoring for archive entries | New |
| 15 | Urban Grain Analysis | B | Solid-void ratio, permeability, street integration from satellite | New |
| 16 | Isochrone Catchments | B | 5/10/15-min walk polygons with demographic overlay | New |
| 17 | Social Desert Detection | B | Identifies neighborhoods missing key civic amenities | New |
| 18 | Ghost Site Detection | C | Automated abandonment probability scoring via multi-signal analysis | New |
| 19 | Entropy Indicators | C | NDVI, night lights, boarded windows, digital silence detection | New |
| 20 | Synthesis Loop | A+B+C | Auto-generates adaptive reuse recommendations with case studies | New |
| 21 | Three-Panel Dashboard | UI | Lens (left) + Map (center) + Pulse (right) layout | New |
| 22 | Recommendation Cards | UI | AI-generated intervention proposals with confidence scores | New |

Features 1-11 from v2.0 remain unchanged.

---

## 8. User Journey: A Scenario

**The User:** A non-profit developer in Buffalo, NY.

### Step 1: The Hunt (Engine C)

User opens CivicPattern and sets filter: "Ghost Sites > 500 sqm, Buffalo, NY."

The map lights up with 12 pulsing red-orange markers. The user clicks an old Victorian schoolhouse on the East Side.

**Lens Panel shows:**
- Abandonment Probability: 94%
- Roof Condition: Fair
- Lot Size: 1,800 sqm
- Last Active: ~2018
- Ownership: City of Buffalo (tax lien)

### Step 2: The Diagnosis (Engine B)

User clicks "Analyze Neighborhood" in the Pulse panel.

Isochrone rings appear on the map. The Pulse panel updates:
- Population within 10-min walk: 4,200
- Youth (under 25): 38%
- Nearest community center: 2.1 km (outside catchment)
- Health Score: 23/100
- Diagnosis: "Social Desert. High residential density but zero community gathering spaces."

### Step 3: The Solution (Engine A + Synthesis)

The Synthesis Loop triggers automatically. A recommendation card appears:

- **Suggested Intervention:** Community Kitchen + Co-working Hybrid
- **Confidence:** 78%
- **Rationale:** High youth density, no gathering spaces, successful Victorian school conversions in similar contexts
- **Case Study:** "The Old School House," Toronto — similar brick structure, similar demographics, converted 2021
- **Estimated Cost:** $160–$220/sqm

User clicks "Save to Project" and "Share Report."

---

## 9. MVP Priorities (CivicPattern)

Development order optimized for earliest demonstrable value:

| Priority | Task | Effort |
|----------|------|--------|
| **P0** | Ghost Site Detector — OSM "Closed" + no-review scraping for Buffalo | 1 week |
| **P0** | Map UI — Display ghost sites as pulsing markers on existing map | 3 days |
| **P1** | Archive CRUD — Manual entry of 15-20 case study buildings with photos | 1 week |
| **P1** | Neighborhood Analysis — Isochrone API + basic demographic overlay | 1-2 weeks |
| **P2** | Synthesis Loop — Match ghost site context to archive entries, generate text recommendation | 1-2 weeks |
| **P2** | Three-Panel Layout — Lens + Pulse side panels | 1 week |
| **P3** | Computer Vision — YOLO v8 boarded window detection from Street View | 2-3 weeks |
| **P3** | Satellite Analysis — NDVI + VIIRS integration via Earth Engine | 2-3 weeks |
| **P4** | Automated Archive Crawler — Scrape architectural databases, auto-classify | 3-4 weeks |

**MVP scope (P0 + P1):** 3-4 weeks. Delivers ghost site detection + basic archive + neighborhood analysis for Buffalo.

---

## 10. Design Continuity

### Dashboard Personality

**Dark Mode:** "An AI command center that reads the city like an organism — diagnosing its health, finding its wounds, and prescribing interventions."

**Light Mode:** "An urban planner's diagnostic table where every building has a patient chart and every neighborhood has a health score."

### Design Guardrails (Carried from v2.0)

| Guardrail | Requirement |
|-----------|-------------|
| **Visual Hierarchy** | Clear priority ordering — eye knows where to go first |
| **Contrast & Legibility** | Text readable against backgrounds (WCAG AA minimum) |
| **Internal Consistency** | Design follows its own coherent system per mode |
| **Functional Clarity** | Interactive elements are recognizable as interactive |
| **Intentionality** | Every design choice has a justifiable reason |
| **No Frankenstein** | One unified design personality per mode |

### New Visual Elements

| Element | Specification |
|---------|--------------|
| **Ghost Site Markers** | Pulsing red-orange circles, opacity = abandonment probability |
| **Isochrone Rings** | Semi-transparent teal polygons with dashed borders |
| **Health Score Heatmap** | Green (healthy) → Yellow → Red (social desert) gradient overlay |
| **Archive Pins** | Gold diamond markers with subtle inner glow |
| **Recommendation Cards** | Glass-panel cards with confidence bar, case study thumbnails |
| **Panel Transitions** | Slide from edge, 300ms ease-out, glass-blur backdrop |

---

## 11. Success Metrics

| Metric | Target |
|--------|--------|
| **Ghost Site Accuracy** | >80% of flagged sites confirmed abandoned on ground-truth check |
| **Archive Coverage** | 50+ global case studies within 3 months of launch |
| **Recommendation Relevance** | >60% of generated recommendations rated "useful" by test users |
| **Neighborhood Analysis Speed** | <3 seconds from click to full Pulse panel population |
| **User Engagement** | Average 4+ ghost sites explored per session |

---

## 12. Pilot City Seed Data

Three pilot contexts provide geographic and cultural diversity — a Rust Belt American city, an Australian beachside suburb, and an Australian port heritage town.

### 12.1 Pilot 1: Buffalo, NY (Alpha)

See SPEC-v2.0 Section 9 for full Buffalo seed data. Summary:

| Metric | Value |
|--------|-------|
| **Coordinates** | 42.8864°N, 78.8784°W |
| **Thesis** | Cheapest Rust Belt city + medical campus + Olmsted parks = ideal Network State incubator |
| **Target Zones** | Fruit Belt ($50k–$120k), Black Rock ($80k–$150k), Broadway-Fillmore ($30k–$70k) |
| **Key Anchors** | Buffalo AKG, Darwin Martin House, BNMC, Central Terminal, NFTA Metro Rail |
| **Ghost Site Potential** | High — massive vacancy on East Side, abandoned churches, industrial shells |

---

### 12.2 Pilot 2: St Kilda, Melbourne (Beta)

**Coordinates:** 37.8676°S, 144.9801°E
**Thesis:** Dense, transit-rich beachside suburb with Art Deco heritage, high cultural activation, and notable underutilized civic sites amid gentrification pressure. Perfect for testing CivicPattern in a high-density, mixed-use Australian context.

#### Cultural Institutions (The Anchors)

| Name | Address | Note |
|------|---------|------|
| Palais Theatre | 14 Lower Esplanade | 1927 atmospheric theatre. 2,896 seats. Heritage icon. Recently restored but surrounding precinct underactivated. |
| Luna Park | 18 Lower Esplanade | Heritage amusement park (1912). The "face" gate is Melbourne's most recognizable landmark. |
| St Kilda Pier & Breakwater | Pier Rd | Little Penguin colony at the breakwater. Tourist anchor. Kiosk rebuilt 2024. |
| Linden New Art | 26 Acland St | Contemporary art gallery in 1870s Victorian mansion. Free entry. Community arts hub. |
| Jewish Museum of Australia | 26 Alma Rd | Cultural institution serving one of Melbourne's largest Jewish communities. |
| National Theatre | 20 Carlisle St | Performing arts + ballet school. Heritage Art Deco building. |
| Astor Theatre | 1 Chapel St (corner Dandenong Rd) | 1936 Art Deco cinema. Single-screen heritage. Melbourne's last atmospheric cinema. |
| St Kilda Town Hall | 99a Carlisle St | Victorian civic building. Council offices + community spaces. |

#### Nature & Parks

| Name | Note |
|------|------|
| St Kilda Beach & Foreshore | 700m beach, cycling/walking promenade, sunset institution |
| St Kilda Botanical Gardens | Heritage gardens (1859). Subtropical conservatory, Alister Clark rose garden |
| Catani Gardens | Beachfront parkland with Norfolk pines, playground, event space |
| O'Donnell Gardens | Upper Esplanade. Harbor views. Homeless services pressure point — social infrastructure gap indicator |
| Albert Park / Albert Park Lake | Adjacent suburb. Melbourne Grand Prix circuit. Major green lung (225 ha) |

#### Transit (The "Veins")

| Name | Note |
|------|------|
| Tram Route 96 | St Kilda Beach ↔ East Brunswick via CBD. One of Melbourne's busiest routes. Spine of St Kilda. |
| Tram Route 3/3a | St Kilda Beach ↔ Melbourne University. Along St Kilda Rd (Australia's most prestigious boulevard). |
| Tram Route 16 | St Kilda Beach ↔ Melbourne University via Fitzroy St and CBD |
| Tram Route 12 | Victoria Gardens ↔ St Kilda (Fitzroy St terminus). Heritage route. |
| Balaclava Station | Frankston Line. Walk to Carlisle St strip. Key rail connection. |
| St Kilda Road corridor | Melbourne's "boulevard" — dense office/apartment spine connecting CBD to bay |

#### Search Zones (CivicPattern Target Areas)

**Zone D: Fitzroy Street Corridor (The Contested Strip)**
- **Thesis:** Once-glamorous boulevard now a social services pressure zone. Homelessness, rooming houses, and drug services coexist with new apartments and restaurants. Rich social infrastructure analysis territory — classic "gap" neighborhood.
- **Target Assets:** Rooming houses, disused pubs, empty shopfronts mid-strip
- **Median Property:** AUD $650k–$900k (apartments)
- **CivicPattern Signal:** High need for community gathering spaces, daytime activation, safe spaces

**Zone E: Acland Street Precinct (The Cultural Spine)**
- **Thesis:** Pedestrianized strip with bakeries, cafes, Luna Park. Jewish cultural precinct. High foot traffic but several empty shopfronts emerging as retail shifts.
- **Target Assets:** Upper-floor vacancies above retail, disused commercial spaces
- **Median Property:** AUD $700k–$1.1M (apartments)
- **CivicPattern Signal:** High activation, potential for creative/maker space above retail

**Zone F: Carlisle Street / Balaclava (The Intersection)**
- **Thesis:** Where St Kilda meets Balaclava. Kosher bakeries, Ethiopian restaurants, vintage shops. Dense, walkable, multicultural. Near rail station.
- **Target Assets:** Warehouse conversions along railway corridor, empty above-shop spaces
- **Median Property:** AUD $550k–$850k (apartments)
- **CivicPattern Signal:** Transit-adjacent density with community kitchen/cultural space potential

#### Ghost Site Candidates (Engine C Targets)

| Site | Type | Note |
|------|------|------|
| Former St Kilda Sea Baths (original structure remnants) | Heritage/Recreational | Multiple iterations. Current complex active but original civic bath heritage partially lost. |
| Disused rooming houses on Fitzroy St | Residential/Social | Several marked for redevelopment. Transitional housing history. |
| Upper floors above Acland St retail | Commercial | Chronic vacancy above active ground-floor shops. |
| Former RSL clubs | Civic/Social | Multiple RSL and ex-services clubs across Port Phillip have closed in recent decades. |
| Grey Street precinct buildings | Mixed-use | Historically Melbourne's red-light district. Several buildings cycling through vacancy. |

#### Facilities & Spaces

| Name | Address | Note |
|------|---------|------|
| St Kilda Library | 150 Carlisle St | City of Port Phillip library. Recently renovated. High activation benchmark for Archive. |
| Veg Out Community Gardens | Cnr Shakespeare Grove & Blessington St | Community garden on former bowling green. Model civic reuse case study. |
| The Espy (Hotel Esplanade) | 11 The Esplanade | Heritage pub/live music venue. Restored 2018 after years of dereliction. Archive case study: successful adaptive reuse. |
| InStudio | 26 Grey St | Co-working and creative studio space |

---

### 12.3 Pilot 3: Fremantle, WA (Gamma)

**Coordinates:** 32.0569°S, 115.7439°E
**Thesis:** Heritage port city with one of the best-preserved 19th-century streetscapes in the world. UNESCO-adjacent significance, massive warehouse district, creative economy rising from post-industrial decline. Fremantle's West End is a living laboratory for adaptive reuse — dozens of heritage buildings have been (or are waiting to be) converted. Ideal for all three CivicPattern engines.

#### Cultural Institutions (The Anchors)

| Name | Address | Note |
|------|---------|------|
| Fremantle Prison | 1 The Terrace | UNESCO World Heritage Site (2010). Convict-era prison (1855). Now museum + events + art installations. Top Archive case study. |
| WA Maritime Museum | Victoria Quay | Striking modern building (2002). Houses the submarine HMAS Ovens + America's Cup history. |
| Fremantle Arts Centre | 1 Finnerty St | 1860s Gothic asylum converted to arts center (1972). Exemplary adaptive reuse — Archive benchmark. |
| The Roundhouse | 10 Arthur Head | WA's oldest public building (1831). Convict-built. Heritage anchor at Arthur Head. |
| Fremantle Markets | Cnr South Terrace & Henderson St | Heritage market hall (1897). Active weekend market. High activation score. |
| Shipwreck Galleries | 47 Cliff St | Branch of WA Museum. Houses Dutch VOC shipwreck artifacts. Colonial heritage. |
| Moores Building | 46 Henry St | Contemporary art gallery in heritage commercial building. Community-run. |
| Fremantle Town Hall | 8 William St | 1887 Victorian civic building. Still active municipal function. |

#### Nature & Parks

| Name | Note |
|------|------|
| Esplanade Reserve | Large urban park between CBD and Fishing Boat Harbour. Events, playground, Norfolk pines. |
| Bathers Beach | Only city beach between harbour and Round House. Swimming + Bathers Beach House venue. |
| Fremantle Park | East Fremantle edge. Sports grounds + passive green space. |
| Arthur Head Reserve | Headland with Roundhouse + sculpture walk + Indian Ocean views. |
| South Beach | Southern swimming beach. Less touristy, local families. |
| Cantonment Hill | Former military reserve. Panoramic views of port and city. Heritage site. |

#### Transit (The "Veins")

| Name | Note |
|------|------|
| Fremantle Line (Transperth) | Perth CBD ↔ Fremantle (25 min). Fremantle Station is heritage-listed terminus (1907). |
| Fremantle Station | Heritage terminus. Beautifully restored. Hub for buses + CAT (free city buses). |
| Blue CAT Bus | Free loop bus connecting Fremantle Station ↔ Fishing Boat Harbour ↔ West End ↔ Markets |
| Ferry to Rottnest Island | B Shed, Victoria Quay. Major tourist transit route. |
| Cycling infrastructure | Fremantle is WA's most bikeable city. Dedicated lanes on main corridors. |

#### Search Zones (CivicPattern Target Areas)

**Zone G: West End Heritage Precinct (The Gold Standard)**
- **Thesis:** One of the most intact 19th-century port streetscapes globally. Georgian and Victorian commercial buildings. Many heritage-listed. Some ground-floor retail active, upper floors chronically vacant. The ultimate adaptive reuse testing ground.
- **Target Assets:** Upper-floor vacancies in heritage commercial buildings, disused warehouses
- **Median Property:** AUD $500k–$800k (apartments), heritage commercial varies widely
- **CivicPattern Signal:** Mass upper-floor vacancy above active street life = classic "vertical ghost site" pattern

**Zone H: Fishing Boat Harbour / South Fremantle (The Industrial Edge)**
- **Thesis:** Working harbour transitioning to mixed-use. Fish & chips tourist precinct meets industrial sheds. Former wool stores and maritime warehouses being converted.
- **Target Assets:** Industrial sheds, former wool stores, disused cold storage
- **Median Property:** AUD $700k–$1.2M (renovated warehouse apartments)
- **CivicPattern Signal:** Industrial-to-creative conversion corridor. Compare with Williamsburg, Shoreditch.

**Zone I: North Fremantle (The Quiet Frontier)**
- **Thesis:** Former industrial riverfront along Stirling Highway. Flour mills, timber yards, rail sidings now converting to apartments. Contested zone between heritage and density.
- **Target Assets:** Former industrial sites along river, disused rail corridor land
- **Median Property:** AUD $800k–$1.5M
- **CivicPattern Signal:** Post-industrial riverfront with social infrastructure desert — zero community centers in rapid-growth residential area

#### Ghost Site Candidates (Engine C Targets)

| Site | Type | Note |
|------|------|------|
| Upper floors, West End commercial buildings | Heritage/Commercial | Dozens of heritage buildings with active ground floor, vacant upper floors. Systematic opportunity. |
| Former Fremantle Woolstores | Industrial/Heritage | Large warehouse buildings. Some converted (apartments, climbing gym), some vacant. |
| Old Customs House surrounds | Heritage/Civic | Port-adjacent civic buildings with underutilization. |
| Former power station site (South Fremantle) | Industrial | Large brownfield. Community debate over redevelopment vs. civic use. |
| Disused rail corridor (North Fremantle) | Infrastructure | Former freight rail alignment. Linear park / community space potential (like NYC High Line). |
| Victoria Quay sheds | Industrial/Maritime | Several large port sheds underutilized as port functions consolidate. |

#### Facilities & Spaces

| Name | Address | Note |
|------|---------|------|
| MANY 6160 | 2 Paget St | Community creative hub in former warehouse. Maker spaces, studios, events. Model civic reuse. |
| The Auctioneer | 29 Pakenham St | Co-working in heritage building. West End precinct. |
| Fremantle Library | 151 High St | City of Fremantle library. Heritage building. High activation. |
| Fremantle PCYC | 32a Paget St | Youth & community center. Sports + social programs. |
| Moore & Moore | 46 Henry St | Gallery + café in heritage building. Community arts anchor. |
| Stackwood | 35 Pakenham St | Creative space + venue in converted warehouse. |

---

### 12.4 Pilot City Comparison Matrix

| Metric | Buffalo, NY | St Kilda, Melbourne | Fremantle, WA |
|--------|------------|-------------------|---------------|
| **Codename** | Alpha | Beta | Gamma |
| **Country** | USA | Australia | Australia |
| **Population** | ~280,000 (city) | ~20,000 (suburb) | ~30,000 (city) |
| **Character** | Rust Belt post-industrial | Dense beachside gentrifying | Heritage port creative |
| **Property Cost** | USD $30k–$150k | AUD $550k–$1.1M | AUD $500k–$1.5M |
| **Ghost Site Density** | Very High | Medium (vertical vacancy) | High (upper floors + industrial) |
| **Heritage Classification** | National Register | Victorian Heritage Register | State Heritage + UNESCO (Prison) |
| **Transit Spine** | NFTA Metro Rail | Tram Routes 3, 12, 16, 96 | Fremantle Train Line + Blue CAT |
| **Best CivicPattern Test** | Engine C (mass vacancy) | Engine B (social gaps in density) | Engine A (adaptive reuse archive) |
| **Unique Value** | Scale of distressed inventory | Social desert detection in affluent areas | Heritage conversion case studies |
