# Feature Update: Fremantle Expanded Institution Layer

**Status:** Ready for implementation
**Created:** 2026-02-15
**Pilot Context:** Fremantle, Western Australia (Beta)
**Affects:** `src/lib/fremantle-amenities.ts`

---

## Summary

Expand the Fremantle amenity map layer with 19 new institutions across six categories: **Maritime & Industrial Heritage**, **Faith & Spiritual**, **Heritage Pubs & Hotels**, **Education**, **Civic & Community** additions, and **Mutual Aid & Recreational**. Categories are deliberately different from St Kilda's to reflect Fremantle's distinct character as a convict-era port town with strong maritime, pub, and warehouse-conversion culture.

---

## Audit: Existing vs New

### Already Present (no change needed)

| Name | Category in file | Status |
|------|-----------------|--------|
| Fremantle Prison | `institution` | Exists |
| WA Maritime Museum | `institution` | Exists |
| Fremantle Arts Centre | `architecture` | Exists |
| The Roundhouse | `architecture` | Exists |
| Fremantle Markets | `institution` | Exists |
| Shipwreck Galleries | `institution` | Exists |
| Moores Building | `architecture` | Exists |
| Fremantle Town Hall | `institution` | Exists |
| MANY 6160 | `architecture` | Exists |
| Fremantle Library | `institution` | Exists |
| Fishing Boat Harbour | `institution` | Exists |
| Cappuccino Strip | `institution` | Exists |

### New Entries to Add (19)

#### Maritime & Industrial Heritage (new category: `maritime`)

| # | Name | Coordinates | Description |
|---|------|-------------|-------------|
| 1 | J Shed | 115.7406, -32.0559 | Former cargo shed on Victoria Quay. Now artist studios and gallery space. Industrial-to-creative conversion. |
| 2 | E Shed Markets | 115.7426, -32.0533 | Heritage harbour shed converted to indoor market. Victoria Quay waterfront. Weekend markets + food hall. |
| 3 | Kidogo Arthouse | 115.7417, -32.0576 | Heritage limestone building at Bathers Beach. Gallery, performances, events. Exemplary small-scale adaptive reuse. |
| 4 | PS Art Space | 115.7450, -32.0551 | Former Pakenham Street warehouse. Contemporary art gallery + studios. Raw industrial conversion. |
| 5 | Warders Cottages | 115.7498, -32.0547 | Row of 1850s convict-era warders' houses on Henderson Street. Heritage-listed. Boutique accommodation reuse. |

**Map color:** `#4a9eff` (maritime blue — distinct from transit cyan)
**Relevance to CivicPattern:** Fremantle's identity is its port. Maritime sheds, warehouses, and harbour buildings are the primary conversion substrate — analogous to Buffalo's grain elevators. Mapping them reveals the port-to-culture pipeline.

#### Faith & Spiritual (reuses existing category: `faith`)

| # | Name | Coordinates | Description |
|---|------|-------------|-------------|
| 6 | St Patrick's Basilica | 115.7500, -32.0510 | 1900 Gothic Revival basilica. Adelaide Street. Heritage-listed. Largest church in Fremantle. |
| 7 | Fremantle Synagogue | 115.7498, -32.0568 | Heritage synagogue (1902). South Terrace. One of WA's oldest. Now events venue — adaptive reuse case study. |
| 8 | Wesley Church Fremantle | 115.7463, -32.0535 | Uniting/Methodist heritage church on Cantonment Street. Active congregation. Community programs. |
| 9 | St John's Anglican Church | 115.7482, -32.0537 | Anglican parish on Adelaide Street. Heritage stone church. Active parish + community hall. |

**Map color:** `#e8a838` (warm gold — consistent with St Kilda faith layer)
**Relevance to CivicPattern:** Fremantle's faith institutions anchor a multicultural community — Italian Catholic, Greek Orthodox, Jewish, Protestant. They are civic infrastructure in plain sight.

#### Heritage Pubs & Hotels (new category: `pub`)

| # | Name | Coordinates | Description |
|---|------|-------------|-------------|
| 10 | Sail and Anchor | 115.7487, -32.0560 | Craft beer pioneer (1984). Heritage hotel building. South Terrace landmark. Catalyzed Freo pub renaissance. |
| 11 | National Hotel | 115.7462, -32.0544 | 1907 heritage hotel. High Street. Rooftop bar with port views. Boutique hotel conversion. |
| 12 | Norfolk Hotel | 115.7495, -32.0571 | 1887 heritage pub. South Terrace. Live music venue. Cultural anchor for local scene. |
| 13 | Left Bank | 115.7615, -32.0394 | Riverside bar in East Fremantle. Former rowing club conversion. Swan River views. |

**Map color:** `#d4622b` (warm brick — heritage pub warmth)
**Relevance to CivicPattern:** Fremantle's heritage pubs are de facto community centres — live music, trivia nights, Sunday sessions. They are the informal "third places" that commercial real estate metrics miss. Mapping them reveals the social infrastructure network that no council planned.

#### Education (new category: `education`)

| # | Name | Coordinates | Description |
|---|------|-------------|-------------|
| 14 | University of Notre Dame Australia (Fremantle) | 115.7435, -32.0561 | Catholic university campus distributed across heritage West End buildings. Adaptive reuse at urban scale — entire precinct is the campus. |

**Map color:** `#6c5ce7` (academic purple)
**Relevance to CivicPattern:** Notre Dame's distributed campus model is a masterclass in heritage reuse — the university occupied 20+ vacant heritage buildings rather than building a walled campus. It reversed West End decline single-handedly.

#### Civic & Community (additions to existing `institution` category)

| # | Name | Coordinates | Description |
|---|------|-------------|-------------|
| 15 | Walyalup Civic Centre | 115.7484, -32.0542 | New civic centre (2022) replacing old council offices. Library, council chambers, event spaces. "Walyalup" is Noongar name for Fremantle. |
| 16 | Fremantle Leisure Centre | 115.7531, -32.0484 | Public pool and gym on Shuffrey Street. Community recreation hub. |
| 17 | Fremantle PCYC | 115.7817, -32.0682 | Police Citizens Youth Club. Youth programs, boxing, basketball. Social infrastructure for at-risk youth. |

**Map color:** `#ff5aad` (existing institution pink) / `#ffd026` (landmark gold)

#### Mutual Aid & Recreational (additions to existing `institution` category)

| # | Name | Coordinates | Description |
|---|------|-------------|-------------|
| 18 | Fremantle Sailing Club | 115.7494, -32.0685 | Sailing club on Success Harbour. Established 1938. Community sailing and social venue. |
| 19 | South Fremantle Football Club | 115.7505, -32.0568 | WAFL club (est. 1900). Fremantle Oval. Deep community roots. "South Freo Bulldogs." |

**Map color:** `#ffd026` (landmark gold)

---

## New Amenity Categories

Three new `category` values are introduced for the filter system (one shared with St Kilda):

| Category | Color | Filter Label | Description |
|----------|-------|-------------|-------------|
| `maritime` | `#4a9eff` | Maritime | Port sheds, warehouses, harbour conversions |
| `pub` | `#d4622b` | Pubs | Heritage hotels and pubs as social infrastructure |
| `education` | `#6c5ce7` | Education | Universities and learning institutions |
| `faith` | `#e8a838` | Faith | Churches, synagogues, mosques, temples (shared with St Kilda) |

These require:
1. New filter chips in `MapApp.tsx` filter dropdown (maritime, pub, education — faith already exists from St Kilda update)
2. New entries in `activeAmenities` default set
3. Color definitions matching the amenity data

---

## Coordinate Sources

| Method | Entries | Accuracy |
|--------|---------|----------|
| OSM Nominatim geocoded | St Patrick's, Notre Dame, Sail and Anchor, National Hotel, Norfolk Hotel, Synagogue, Wesley Church, St John's, Kidogo, E Shed, J Shed, Left Bank, Sailing Club, South Freo FC, PCYC, Leisure Centre, Walyalup Civic Centre, Warders Cottages | Address-level |
| Street-level interpolation | PS Art Space | Approximate (~50m) |

Coordinates geocoded from OpenStreetMap Nominatim API against known street addresses. Approximate entries should be verified against Google Maps before production deployment.

---

## Design Notes: Why Different Categories?

St Kilda and Fremantle are deliberately mapped with different institution categories to reflect their distinct urban characters:

| St Kilda | Fremantle | Why |
|----------|-----------|-----|
| Post-War Walk-Up Flats (`housing`) | Maritime & Industrial Heritage (`maritime`) | St Kilda's identity is its mid-century density. Fremantle's is its port. |
| — | Heritage Pubs & Hotels (`pub`) | Fremantle's pub culture is uniquely strong — pubs ARE the community infrastructure. |
| — | Education (`education`) | Notre Dame's distributed heritage campus has no equivalent in St Kilda. |

Shared categories (`faith`, `institution`) use consistent colors across cities.

---

## Implementation Checklist

- [ ] Add 19 new GeoJSON features to `src/lib/fremantle-amenities.ts`
- [ ] Add `maritime`, `pub`, and `education` filter chips to `MapApp.tsx`
- [ ] Update `activeAmenities` default set to include new categories
- [ ] Update filter badge count (`maxFilters`) in MapApp
- [ ] Ensure `faith` filter chip works for both St Kilda and Fremantle (already added in St Kilda update)
- [ ] Verify all 19 markers render correctly on Fremantle map view
- [ ] Verify filter toggles show/hide new categories independently
- [ ] Source Wikimedia Commons photos for key Fremantle institutions
- [ ] Update SPEC-v2.1.md Section 12.2 institution count
