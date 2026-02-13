import type { FeatureCollection } from 'geojson';

export const amenitiesGeoJSON: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    // ── Olmsted Park System (Green Polygons) ──
    {
      type: 'Feature',
      properties: { name: 'Delaware Park', category: 'park', color: '#2ee672' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-78.8712, 42.9405],
            [-78.8635, 42.9405],
            [-78.8582, 42.9375],
            [-78.8568, 42.9338],
            [-78.8590, 42.9310],
            [-78.8648, 42.9305],
            [-78.8710, 42.9325],
            [-78.8728, 42.9358],
            [-78.8725, 42.9385],
            [-78.8712, 42.9405],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'MLK Park (The Parade)', category: 'park', color: '#2ee672' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-78.8510, 42.9105],
            [-78.8438, 42.9105],
            [-78.8430, 42.9060],
            [-78.8502, 42.9055],
            [-78.8510, 42.9105],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Front Park', category: 'park', color: '#2ee672' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-78.9028, 42.9210],
            [-78.8990, 42.9215],
            [-78.8975, 42.9185],
            [-78.8990, 42.9170],
            [-78.9025, 42.9175],
            [-78.9028, 42.9210],
          ],
        ],
      },
    },

    // ── Transit (Cyan Line) ──
    {
      type: 'Feature',
      properties: { name: 'NFTA Metro Rail', category: 'transit', color: '#22d3ee' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-78.8777, 42.8831],
          [-78.8765, 42.8870],
          [-78.8758, 42.8920],
          [-78.8730, 42.8955],
          [-78.8716, 42.8990],
          [-78.8700, 42.9020],
          [-78.8675, 42.9055],
          [-78.8660, 42.9090],
          [-78.8640, 42.9135],
          [-78.8620, 42.9175],
          [-78.8615, 42.9220],
          [-78.8608, 42.9275],
          [-78.8600, 42.9335],
          [-78.8588, 42.9385],
          [-78.8570, 42.9440],
          [-78.8555, 42.9460],
        ],
      },
    },

    // ── FLW Architecture (Purple Points) ──
    {
      type: 'Feature',
      properties: { name: 'Darwin Martin House', category: 'architecture', color: '#b07aff' },
      geometry: {
        type: 'Point',
        coordinates: [-78.8502, 42.9397],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Graycliff Estate', category: 'architecture', color: '#b07aff' },
      geometry: {
        type: 'Point',
        coordinates: [-79.0048, 42.6262],
      },
    },

    // ── Institutions ──
    {
      type: 'Feature',
      properties: { name: 'Buffalo AKG Art Museum', category: 'institution', color: '#ff5aad' },
      geometry: {
        type: 'Point',
        coordinates: [-78.8728, 42.9364],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Highmark Stadium', category: 'institution', color: '#ffd026' },
      geometry: {
        type: 'Point',
        coordinates: [-78.7870, 42.7738],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Kleinhans Music Hall', category: 'institution', color: '#ff5aad' },
      geometry: {
        type: 'Point',
        coordinates: [-78.8756, 42.9303],
      },
    },
  ],
};
