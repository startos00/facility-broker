# Feature Update: St Kilda Expanded Institution Layer

**Status:** Ready for implementation
**Created:** 2026-02-15
**Pilot Context:** St Kilda, Melbourne (Beta)
**Affects:** `src/lib/st-kilda-amenities.ts`

---

## Summary

Expand the St Kilda amenity map layer with 12 new institutions across four new categories: **Faith & Spiritual**, **Post-War Walk-Up Flats**, **Civic & Community** additions, and **Mutual Aid & Recreational**. Three existing entries (National Theatre, Palais Theatre, The Espy) are confirmed already present and require no changes.

---

## Audit: Existing vs New

### Already Present (no change needed)

| Name | Category in file | Status |
|------|-----------------|--------|
| Palais Theatre | `institution` | Exists |
| National Theatre | `architecture` | Exists |
| The Espy (Hotel Esplanade) | `architecture` | Exists |
| St Kilda Library | `institution` | Exists |
| Veg Out Community Gardens | `institution` | Exists |
| St Kilda Pier | `institution` | Exists |

### New Entries to Add (12)

#### Faith & Spiritual (new category: `faith`)

| # | Name | Coordinates | Description |
|---|------|-------------|-------------|
| 1 | St Kilda Hebrew Congregation | 144.9853, -37.8596 | Orthodox synagogue (est. 1872), 12 Charnwood Grove. One of Melbourne's oldest Jewish congregations. Heritage-listed. |
| 2 | St Kilda Elsternwick Baptist Church | 144.9890, -37.8660 | Baptist church serving St Kilda and Elsternwick communities. Rippon Grove area. |
| 3 | Sacred Heart Catholic Church | 144.97985676118213, -37.8626556260632 | Gothic Revival parish church on Grey Street. Heritage-listed. Active parish. |
| 4 | St Colman's Catholic Church | 144.9870, -37.8630 | Catholic parish at Crimea Street, Balaclava. Serves St Kilda East / Balaclava area. |
| 5 | St Kilda Uniting Church | 144.9830, -37.8603 | Uniting Church on Alma Road. Active community outreach and social justice programs. |

**Map color:** `#e8a838` (warm gold, distinct from existing institution pink)
**Relevance to CivicPattern:** Faith institutions are primary social infrastructure — often the last civic anchors in declining neighborhoods. Mapping them reveals the "invisible" mutual aid network.

#### Post-War Walk-Up Flats (new category: `housing`)

| # | Name | Coordinates | Description |
|---|------|-------------|-------------|
| 6 | Walk-Up Flats, 28 Carlisle St | 144.9817, -37.8670 | Mid-century residential walk-up. Typology study: post-war density response. |
| 7 | Walk-Up Flats, 11 Burnett St | 144.9804, -37.8612 | Low-rise apartment block. Characteristic St Kilda residential form. |
| 8 | Walk-Up Flats, 22 Dalgety St | 144.9797, -37.8600 | Walk-up flats. Represents dominant housing typology in inner St Kilda. |

**Map color:** `#8b95a4` (neutral grey — background infrastructure)
**Relevance to CivicPattern:** Walk-up flats are the dominant housing form in St Kilda. Mapping them reveals density patterns and potential conversion candidates (common room → community space, ground floor → micro-library).

#### Civic & Community (additions to existing `institution` category)

| # | Name | Coordinates | Description |
|---|------|-------------|-------------|
| 9 | Elwood & St Kilda Learning Centre | 144.9780, -37.8750 | Neighbourhood house. Adult education, ESL, digital literacy. Community glue. |
| 10 | Victorian Pride Centre | 144.9763, -37.8606 | Australia's first purpose-built LGBTQ+ community hub (2021). 79-81 Fitzroy St. Landmark civic reuse case study. |

**Map color:** `#ff5aad` (existing institution pink) / `#ffd026` (landmark gold)

#### Mutual Aid & Recreational (additions to existing `institution` category)

| # | Name | Coordinates | Description |
|---|------|-------------|-------------|
| 11 | St Kilda Bowling Club | 144.9730, -37.8595 | Lawn bowling club on Fitzroy Street. Long-established local sporting and social venue. |
| 12 | St Kilda RSL | 144.9785, -37.8675 | Returned Services League sub-branch, Acland Street. Veterans' club and community venue. |

**Map color:** `#ffd026` (landmark gold)

---

## New Amenity Categories

Two new `category` values are introduced for the filter system:

| Category | Color | Filter Label | Description |
|----------|-------|-------------|-------------|
| `faith` | `#e8a838` | Faith | Churches, synagogues, mosques, temples |
| `housing` | `#8b95a4` | Housing | Residential typologies mapped for study |

These require:
1. New filter chips in `MapApp.tsx` filter dropdown
2. New entries in `activeAmenities` default set
3. Color definitions matching the amenity data

---

## Coordinate Sources

| Method | Entries | Accuracy |
|--------|---------|----------|
| OSM Nominatim geocoded | Sacred Heart, Pride Centre, Hebrew Congregation, 28 Carlisle, 11 Burnett, 22 Dalgety | Exact (address-level) |
| Street-level interpolation | Elsternwick Baptist, St Colman's, Uniting Church, Learning Centre, Bowling Club, RSL | Approximate (~50m) |

Coordinates geocoded from OpenStreetMap Nominatim API against known street addresses. Approximate entries should be verified against Google Maps before production deployment.

---

## Implementation Checklist

- [ ] Add 12 new GeoJSON features to `src/lib/st-kilda-amenities.ts`
- [ ] Add `faith` and `housing` filter chips to `MapApp.tsx`
- [ ] Update `activeAmenities` default set to include new categories
- [ ] Update filter badge count (`maxFilters`) in MapApp
- [ ] Verify all 12 markers render correctly on St Kilda map view
- [ ] Verify filter toggles show/hide new categories independently
- [ ] Update SPEC-v2.1.md Section 12.2 institution count
