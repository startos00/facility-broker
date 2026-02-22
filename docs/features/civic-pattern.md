# Feature Requirement Document: CivicPattern — AI Operating System for Social Infrastructure

**Feature Name:** CivicPattern
**Spec Version:** v2.1
**Status:** Draft
**Created:** 2026-02-15
**Depends on:** SPEC-v2.0 (map, nodes, PostGIS)

---

## Goal

Transform CloudtoTerra from a crowdsourced asset directory into a **full-lifecycle intelligence platform for social infrastructure**. CivicPattern unifies three AI engines — The Archive, The Context Scanner, and The Site Scout — into a circular ecosystem that can:

1. Catalog what civic institutions exist and how well they perform (globally)
2. Diagnose neighborhood health and identify gaps in social infrastructure
3. Detect abandoned sites and automatically propose adaptive reuse interventions

**Why:** Urban planners, non-profits, and community developers currently operate blind. There is no single tool that connects "what works globally" with "what's needed locally" and "what's available to convert." CivicPattern closes that loop.

---

## User Story

**As a** community developer / non-profit planner / municipal official,
**I want to** find abandoned buildings in my city, understand what the surrounding neighborhood needs, and see global examples of successful conversions for similar buildings,
**So that I can** make evidence-based decisions about adaptive reuse without hiring consultants or spending months on research.

---

## Functional Requirements

### Engine A: The Archive ("The Teacher")

A searchable global database of civic architecture with AI-powered classification and success scoring.

#### A.1 Typology Decomposition

- [ ] User uploads a photo or enters an address of a civic building
- [ ] AI classifies the building with typology tags (e.g., "Nordic Modernism, Public Atrium, High Transparency")
- [ ] System extracts architectural metrics from available floor plans or satellite imagery:
  - Public-to-Private area ratio
  - Circulation area percentage
  - Number of floors
  - Estimated floor area (sqm)
- [ ] If the building is a conversion, record both original and current function

#### A.2 Success Metrics

- [ ] **Digital Footprint Score** (0-100): Scraped from Instagram tag count, Google review volume, Wikipedia presence
- [ ] **Activation Score** (0-100): Estimated from anonymized mobility data (foot traffic patterns)
- [ ] **Annual Visitor Estimate**: Triangulated from available public data
- [ ] Scores update on a rolling 90-day window

#### A.3 Archive Search & Browse

- [ ] Search by: typology tags, function (original or current), city, country
- [ ] Filter by: conversion (yes/no), success score range, floor area range
- [ ] Map view: Gold diamond pins for all archive entries globally
- [ ] List view: Sortable table with thumbnail, tags, scores
- [ ] Each entry links to full detail in the Lens panel

#### A.4 Data Ingestion Pipeline

The Archive is populated through a **multi-source ingestion pipeline** — the critical data backbone of CivicPattern.

##### A.4.1 Web Crawling (Scrapy)

- [ ] Automated crawlers targeting architectural databases and award sites:
  - ArchDaily, Dezeen, Divisare (project pages)
  - Pritzker Prize, Aga Khan Award, RIBA Award archives
  - Municipal "public buildings" registries
- [ ] Extract per-project: name, location, architect, year, typology, photos, floor area
- [ ] Crawler runs on schedule (weekly) with deduplication by coordinates + name
- [ ] Respect `robots.txt` and rate-limit to 1 req/sec per domain
- [ ] Store raw HTML + extracted structured data for audit trail

##### A.4.2 OpenStreetMap Mining (OSMnx)

- [ ] Query OSM for tagged civic buildings globally:
  - `amenity=library`, `amenity=community_centre`, `amenity=social_facility`
  - `building=civic`, `building=public`
  - `amenity=post_office`, `amenity=theatre`, `amenity=arts_centre`
- [ ] Extract: name, coordinates, building footprint polygon, tags, opening hours
- [ ] Cross-reference with Wikidata QIDs for enrichment (architect, year built, photos)
- [ ] Detect "Permanently Closed" status from `disused:*` and `abandoned:*` tag prefixes
- [ ] Run differential updates (daily) — only process changesets since last run
- [ ] OSMnx handles network graph extraction for street connectivity analysis (feeds Engine B)

##### A.4.3 Google Places API (Business Intelligence)

- [ ] For each Archive entry and Ghost Site, query Google Places:
  - **Place Details**: current status (OPERATIONAL / CLOSED_TEMPORARILY / CLOSED_PERMANENTLY)
  - **Reviews**: count, average rating, date of most recent review
  - **Photos**: reference IDs for facade/interior imagery
  - **Popular Times**: hourly foot traffic histogram (where available)
- [ ] Compute **Digital Silence Score**: months since last review (>24 months = flagged)
- [ ] Compute **Activation Score** from Popular Times histogram peak-to-baseline ratio
- [ ] Cache responses with 30-day TTL to manage API quota
- [ ] Quota budget: ~1,000 Place Details calls/day on MVP; scale with billing tier

##### A.4.4 Ingestion Orchestration

- [ ] Pipeline stages: `crawl → extract → geocode → deduplicate → enrich → store`
- [ ] Each source writes to a `raw_ingestion` staging table before promotion to `archive_entries`
- [ ] Confidence scoring: entries with 3+ corroborating sources auto-verify; others flagged for manual review
- [ ] Admin dashboard shows ingestion stats: sources crawled, entries added, duplicates caught, errors

```
┌─────────────┐   ┌────────────┐   ┌──────────────┐
│   Scrapy     │   │   OSMnx    │   │ Google Places│
│  (ArchDaily, │   │  (amenity  │   │  (status,    │
│   Dezeen...) │   │   tags)    │   │   reviews)   │
└──────┬───────┘   └─────┬──────┘   └──────┬───────┘
       │                 │                  │
       └────────┬────────┘──────────────────┘
                │
         ┌──────▼──────┐
         │  Geocode +  │
         │ Deduplicate │
         └──────┬──────┘
                │
         ┌──────▼──────┐
         │   Enrich    │
         │ (cross-ref) │
         └──────┬──────┘
                │
         ┌──────▼──────┐
         │  PostGIS /  │
         │ archive_    │
         │ entries     │
         └─────────────┘
```

---

### Engine B: The Context Scanner ("The Analyst")

Analyzes neighborhood patterns surrounding any selected site.

#### B.1 Urban Grain Analysis

- [ ] Calculate **Solid-to-Void Ratio** from satellite/building footprint data
  - Dense (>60%), Medium (30-60%), Sparse (<30%)
- [ ] Calculate **Permeability**: intersections per km² from OSMnx street graph
- [ ] Calculate **Street Integration Score**: betweenness centrality of nearest streets (Space Syntax proxy)
- [ ] Classify neighborhood grain: "Fine Urban," "Coarse Suburban," "Industrial Grid," etc.

#### B.2 Catchment Dynamics

- [ ] Generate **Isochrone Polygons** for 5, 10, 15-minute walks from any point
- [ ] Overlay **Census Demographics** within each isochrone:
  - Total population, age distribution, median income
  - Household composition (families, singles, elderly)
- [ ] Calculate **Amenity Density** within catchment:
  - Count of each civic amenity type (library, park, community center, school, clinic)
  - Distance to nearest of each type

#### B.3 Social Desert Detection

- [ ] Define thresholds for "adequate" civic amenity access:
  - Library within 10-min walk
  - Park/green space within 5-min walk
  - Community center within 15-min walk
  - Primary school within 10-min walk
  - Health clinic within 15-min walk
- [ ] Flag neighborhoods falling below thresholds as **Social Deserts**
- [ ] Generate **Health Score** (0-100): composite of amenity access, green space, connectivity, demographics
- [ ] Produce natural language **Diagnosis**: e.g., "This neighborhood has high residential density (4,200 residents within 10-min walk) but zero community gathering spaces. The nearest library is 2.1 km away."

#### B.4 Context Output

- [ ] Display as heatmap overlay on map (green → red gradient)
- [ ] Show in Pulse panel with all metrics + diagnosis text
- [ ] Cache analysis results for 30 days (neighborhood fabric changes slowly)

---

### Engine C: The Site Scout ("The Hunter")

Automatically detects abandoned or underutilized civic buildings.

#### C.1 Entropy Detection (Satellite + Street View)

- [ ] **NDVI Analysis** (Sentinel-2): Compare vegetation index around building perimeter over 2-year window. Rising NDVI on roof/lot = overgrown = likely abandoned.
- [ ] **Night Light Analysis** (VIIRS): Compare radiance at building location vs. surroundings. Significantly darker = likely vacant.
- [ ] **Object Detection** (YOLO v8 on Street View): Detect boarded windows, graffiti accumulation, collapsed roofing, "For Sale" signs.
- [ ] **Structural Assessment**: Estimate roof condition and facade state from available imagery.

#### C.2 Digital Silence Detection

- [ ] Cross-reference OSM `disused:*` / `abandoned:*` tags
- [ ] Check Google Places for "CLOSED_PERMANENTLY" status
- [ ] Flag buildings with zero new Google reviews in 24+ months
- [ ] Check municipal permit databases for buildings with no activity in 5+ years

#### C.3 Ghost Site Scoring

- [ ] Compute **Abandonment Probability** (0-100%) from weighted signal combination:
  - NDVI anomaly: 20%
  - Night light deficit: 15%
  - Object detection features: 25%
  - Digital silence: 25%
  - Permit inactivity: 15%
- [ ] Rank ghost sites by probability, lot size, and strategic location (proximity to transit/amenities)
- [ ] Update scores monthly as new satellite passes and review data become available

#### C.4 Scout Output

- [ ] Display as pulsing red-orange markers on map (opacity = probability)
- [ ] Filterable by: probability threshold, lot size, last known function, ownership type
- [ ] Clicking opens Lens panel with full condition assessment
- [ ] "Analyze Neighborhood" button triggers Engine B for the site's surroundings

---

### The Synthesis Loop

The automatic connection between all three engines.

#### S.1 Trigger

- [ ] When user selects any Ghost Site with abandonment probability > 70%
- [ ] Or: user manually clicks "Get Recommendation" on any selected building

#### S.2 Logic Chain

1. Read Ghost Site data (Engine C output)
2. Run or retrieve Neighborhood Analysis (Engine B) for the site's location
3. Extract key context: missing amenities, demographic profile, density class
4. Query Archive (Engine A) for entries matching:
   - Similar `original_function` to the ghost site
   - Successful conversions in neighborhoods with similar demographics
   - High activation scores (>70)
5. Generate recommendation text with confidence score

#### S.3 Recommendation Output

- [ ] **Suggested Function**: e.g., "Youth Media Lab"
- [ ] **Confidence Score**: 0-100%, based on number of matching precedents + context fit
- [ ] **Rationale**: 2-3 sentences explaining the logic
- [ ] **Case Studies**: Up to 3 archive entries as precedents, with photos and links
- [ ] **Cost Estimate**: Per-sqm range based on precedent conversion costs
- [ ] **Actions**: Save to project, share as PDF report, contact municipality

---

## Data Requirements

### New Database Tables

See SPEC-v2.1.md Section 5.2 for full schema. Key tables:

| Table | Purpose | Engine |
|-------|---------|--------|
| `archive_entries` | Global civic building case studies | A |
| `ghost_sites` | Detected abandoned/underutilized buildings | C |
| `neighborhood_analyses` | Cached urban fabric diagnostics | B |
| `reuse_recommendations` | AI-generated intervention proposals | Synthesis |
| `raw_ingestion` | Staging table for data pipeline (pre-verification) | A (Ingestion) |

### External Data Sources

| Source | Data | Access |
|--------|------|--------|
| OpenStreetMap (via OSMnx) | Building footprints, amenity locations, status tags | Free / ODbL |
| Google Places API | Business status, reviews, popular times, photos | Paid (per-call) |
| Sentinel-2 (via Earth Engine) | NDVI satellite imagery | Free (research) |
| VIIRS (via Earth Engine) | Nighttime light radiance | Free (public) |
| Google Street View | Building facade imagery | Paid (per-image) |
| Census / ACS | Demographics by tract/block group | Free (US) |
| ArchDaily / Dezeen (Scrapy) | Architectural project data, photos | Scrape (respectful) |
| Municipal Open Data | Building permits, tax liens, ownership | Free (varies by city) |

---

## User Flow

### Flow 1: Explore Ghost Sites

1. User opens CloudtoTerra, navigates to Buffalo
2. Clicks "Ghost Sites" filter toggle — pulsing markers appear
3. Sets filter: "> 500 sqm, > 80% probability"
4. Clicks a Victorian schoolhouse marker
5. Lens panel slides in with condition assessment
6. User clicks "Analyze Neighborhood" — Pulse panel populates
7. Synthesis Loop auto-triggers — recommendation card appears
8. User reviews case studies, saves report

### Flow 2: Browse the Archive

1. User clicks "Archive" in top nav
2. Searches: "library conversion"
3. Map shows gold pins for matching entries worldwide
4. User clicks Helsinki Oodi Library
5. Lens panel shows full typology breakdown + success scores
6. User compares with 3 other libraries, notes patterns

### Flow 3: Diagnose a Neighborhood

1. User right-clicks any point on the map → "Analyze This Area"
2. Isochrone rings appear (5/10/15 min)
3. Pulse panel shows demographics, amenity gaps, health score
4. Social desert highlighted in red overlay
5. User identifies: "Zero libraries in 15-min walk for 6,000 residents"

### Flow 4: Submit to Archive

1. User finds an interesting civic building (e.g., visits a great library in Copenhagen)
2. Clicks "Add to Archive" → uploads photos, enters address
3. AI auto-classifies typology tags
4. Entry appears as "Unverified" pending admin review
5. Once verified, it becomes searchable and matchable by Synthesis Loop

---

## Acceptance Criteria

### MVP Acceptance

- [ ] Ghost Site detection works for Buffalo using OSM + Google Places data
- [ ] At least 15 case studies manually entered in the Archive with photos and tags
- [ ] Neighborhood analysis produces isochrone + demographic overlay for any clicked point
- [ ] Synthesis Loop generates a text recommendation for ghost sites with >70% probability
- [ ] Three-panel layout (Lens + Map + Pulse) renders on desktop without overlap
- [ ] Ghost site markers visible on map with probability-based opacity
- [ ] All information chunks are 2-3 sentences max (matching existing design language)

### Full Product Acceptance

- [ ] Archive contains 200+ verified entries across 20+ cities
- [ ] Ghost Site detection covers 5+ US cities with >80% ground-truth accuracy
- [ ] NDVI + VIIRS satellite analysis integrated for at least 1 city
- [ ] Computer vision (YOLO) detects boarded windows with >75% precision
- [ ] Synthesis recommendations rated "useful" by >60% of test users
- [ ] Mobile responsive: panels as bottom sheets, touch-friendly
- [ ] Data ingestion pipeline running autonomously (weekly crawl + daily OSM diff)

---

## Edge Cases

1. **No Archive matches** — Synthesis Loop returns "No precedents found. Showing nearest matches by building type." with lower confidence
2. **Incomplete demographic data** — Health score shows "Partial data" badge; uses available fields only
3. **False positive ghost sites** — Building marked abandoned but actually active (e.g., OSM data stale). Provide "Report as Active" button
4. **Street View unavailable** — Skip object detection signals; note reduced confidence in abandonment score
5. **Non-US demographics** — Census API is US-only; for international cities, use WorldPop or fallback to satellite-derived population estimates
6. **API quota limits** — Google Places calls cached aggressively (30-day TTL); degrade gracefully with "Limited data" indicator
7. **Very large cities** — Ghost site scan may return 1000+ results; paginate and default to "Top 50 by probability"

---

## Non-Functional Requirements

### Performance

- Neighborhood analysis (Engine B): < 3 seconds from click to full panel
- Archive search: < 500ms for tag/function queries
- Ghost site map render: < 1 second for 500 markers
- Synthesis recommendation: < 5 seconds (may involve Archive query + text generation)

### Design

- Matches CloudtoTerra dark/light mode aesthetic
- Glass-panel overlays for Lens and Pulse (consistent with existing UI)
- Data-dense but scannable — monospace for metrics, sans-serif for descriptions
- Ghost site markers use CSS animation (pulsing), not JavaScript (60fps)

### Security & Ethics

- No PII stored from mobility data or demographics (aggregate only)
- Google Places data cached, not re-served raw (ToS compliance)
- Abandonment labels are probabilistic, not definitive — UI always shows "Estimated"
- Scrapy crawlers respect robots.txt and include delay between requests

---

## Implementation Phases

| Phase | Features | Effort | Priority |
|-------|----------|--------|----------|
| **1** | Ghost Site detector (OSM + Google Places scraping), map markers | 1-2 weeks | P0 |
| **1** | Data ingestion pipeline setup (Scrapy + OSMnx + Places API scaffolding) | 1 week | P0 |
| **2** | Archive CRUD + manual seeding of 15-20 case studies | 1 week | P1 |
| **2** | Isochrone API + demographic overlay | 1-2 weeks | P1 |
| **3** | Three-panel dashboard layout (Lens + Pulse) | 1 week | P1 |
| **3** | Synthesis Loop (recommendation engine) | 1-2 weeks | P2 |
| **4** | Automated Scrapy crawlers for ArchDaily/Dezeen + OSMnx scheduled runs | 2-3 weeks | P2 |
| **5** | YOLO v8 object detection on Street View imagery | 2-3 weeks | P3 |
| **5** | Sentinel-2 NDVI + VIIRS satellite integration | 2-3 weeks | P3 |
| **6** | Automated Archive classifier (AI tagging from photos) | 2 weeks | P3 |
| **7** | Full pipeline orchestration with monitoring dashboard | 1-2 weeks | P3 |

**MVP (Phase 1-3):** 5-8 weeks
**Full product (Phase 1-7):** 14-20 weeks

---

## References

- [ArchDaily](https://www.archdaily.com/) — Architectural project database (crawl source)
- [OSMnx](https://osmnx.readthedocs.io/) — Python library for OpenStreetMap network analysis
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service) — Business status and review data
- [Scrapy](https://scrapy.org/) — Python web crawling framework
- [Sentinel-2 / Earth Engine](https://earthengine.google.com/) — Satellite imagery analysis
- [VIIRS Nighttime Lights](https://eogdata.mines.edu/products/vnl/) — Night light radiance data
- [Mapbox Isochrone API](https://docs.mapbox.com/api/navigation/isochrone/) — Walk-time catchment polygons
- [SAM (Segment Anything)](https://segment-anything.com/) — Meta's image segmentation model
- [YOLOv8](https://docs.ultralytics.com/) — Real-time object detection
- [Space Syntax](https://www.spacesyntax.com/) — Street network integration methodology
