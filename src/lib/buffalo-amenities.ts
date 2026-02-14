export const amenitiesGeoJSON: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    // ═══════════════════════════════════════════
    // 🏛 Cultural Institutions ("Blue Chips")
    // ═══════════════════════════════════════════

    {
      type: 'Feature',
      properties: { name: 'Buffalo AKG Art Museum', category: 'institution', color: '#ff5aad', description: 'World-class modern art collection' },
      geometry: { type: 'Point', coordinates: [-78.8728, 42.9364] },
    },
    {
      type: 'Feature',
      properties: { name: 'Darwin Martin House', category: 'architecture', color: '#b07aff', description: 'Frank Lloyd Wright masterpiece. A pilgrimage site for architects.' },
      geometry: { type: 'Point', coordinates: [-78.8502, 42.9397] },
    },
    {
      type: 'Feature',
      properties: { name: 'Buffalo History Museum', category: 'institution', color: '#ff5aad', description: 'Only building surviving from the 1901 Pan-American Expo' },
      geometry: { type: 'Point', coordinates: [-78.8694, 42.9364] },
    },
    {
      type: 'Feature',
      properties: { name: "Shea's Performing Arts Center", category: 'institution', color: '#ff5aad', description: 'Historic theatre district anchor' },
      geometry: { type: 'Point', coordinates: [-78.8724, 42.8867] },
    },
    {
      type: 'Feature',
      properties: { name: 'Buffalo Niagara Medical Campus', category: 'institution', color: '#ff5aad', description: 'Economic engine of downtown. 15,000+ jobs.' },
      geometry: { type: 'Point', coordinates: [-78.8613, 42.8990] },
    },
    {
      type: 'Feature',
      properties: { name: 'Central Terminal', category: 'architecture', color: '#b07aff', description: 'Massive abandoned Art Deco train station. The ultimate "Distressed Masterpiece" for a Network State HQ.' },
      geometry: { type: 'Point', coordinates: [-78.8280, 42.8865] },
    },
    {
      type: 'Feature',
      properties: { name: 'Kleinhans Music Hall', category: 'institution', color: '#ff5aad', description: 'Eliel & Eero Saarinen designed concert hall' },
      geometry: { type: 'Point', coordinates: [-78.8756, 42.9303] },
    },
    {
      type: 'Feature',
      properties: { name: 'Graycliff Estate', category: 'architecture', color: '#b07aff', description: 'Frank Lloyd Wright lakeside estate' },
      geometry: { type: 'Point', coordinates: [-79.0048, 42.6262] },
    },

    // ═══════════════════════════════════════════
    // 🌳 Nature & Parks (The Olmsted System)
    // ═══════════════════════════════════════════

    {
      type: 'Feature',
      properties: { name: 'Delaware Park', category: 'park', color: '#2ee672', description: 'The "Central Park" of Buffalo' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-78.8712, 42.9405], [-78.8635, 42.9405], [-78.8582, 42.9375],
          [-78.8568, 42.9338], [-78.8590, 42.9310], [-78.8648, 42.9305],
          [-78.8710, 42.9325], [-78.8728, 42.9358], [-78.8725, 42.9385],
          [-78.8712, 42.9405],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Front Park', category: 'park', color: '#2ee672', description: 'Views of Lake Erie and Canada' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-78.9028, 42.9210], [-78.8990, 42.9215], [-78.8975, 42.9185],
          [-78.8990, 42.9170], [-78.9025, 42.9175], [-78.9028, 42.9210],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'MLK Jr. Park', category: 'park', color: '#2ee672', description: 'East Side anchor, connected by parkways' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-78.8510, 42.9105], [-78.8438, 42.9105], [-78.8430, 42.9060],
          [-78.8502, 42.9055], [-78.8510, 42.9105],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Canalside', category: 'park', color: '#2ee672', description: 'Waterfront revitalization zone' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-78.8802, 42.8772], [-78.8758, 42.8772], [-78.8748, 42.8745],
          [-78.8792, 42.8740], [-78.8802, 42.8772],
        ]],
      },
    },

    // ═══════════════════════════════════════════
    // 🚇 Public Transport (The "Veins")
    // ═══════════════════════════════════════════

    // NFTA Metro Rail — glowing cyan line (the spine of the city)
    {
      type: 'Feature',
      properties: { name: 'NFTA Metro Rail', category: 'transit', color: '#22d3ee', description: 'The spine of the city — Main Street Line' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-78.8777, 42.8831],   // Canalside (Waterfront)
          [-78.8765, 42.8870],   // Erie Canal Harbor
          [-78.8758, 42.8920],   // Fountain Plaza (Downtown)
          [-78.8730, 42.8955],   // Lafayette Square
          [-78.8716, 42.8990],   // Allen/Medical Campus (Midtown)
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
          [-78.8555, 42.9460],   // University (North)
        ],
      },
    },

    // Metro stations as points
    {
      type: 'Feature',
      properties: { name: 'University Station', category: 'transit', color: '#22d3ee', description: 'Metro Rail — North terminus' },
      geometry: { type: 'Point', coordinates: [-78.8555, 42.9460] },
    },
    {
      type: 'Feature',
      properties: { name: 'Allen/Medical Station', category: 'transit', color: '#22d3ee', description: 'Metro Rail — Midtown / Medical Campus' },
      geometry: { type: 'Point', coordinates: [-78.8716, 42.8990] },
    },
    {
      type: 'Feature',
      properties: { name: 'Fountain Plaza Station', category: 'transit', color: '#22d3ee', description: 'Metro Rail — Downtown' },
      geometry: { type: 'Point', coordinates: [-78.8758, 42.8920] },
    },
    {
      type: 'Feature',
      properties: { name: 'Canalside Station', category: 'transit', color: '#22d3ee', description: 'Metro Rail — Waterfront' },
      geometry: { type: 'Point', coordinates: [-78.8777, 42.8831] },
    },
    {
      type: 'Feature',
      properties: { name: 'Buffalo Niagara Intl Airport (BUF)', category: 'transit', color: '#22d3ee', description: '15 min drive from downtown' },
      geometry: { type: 'Point', coordinates: [-78.7322, 42.9405] },
    },

    // ═══════════════════════════════════════════
    // 🏭 Other landmarks / yellow
    // ═══════════════════════════════════════════

    {
      type: 'Feature',
      properties: { name: 'Highmark Stadium', category: 'institution', color: '#ffd026', description: 'NFL — Buffalo Bills' },
      geometry: { type: 'Point', coordinates: [-78.7870, 42.7738] },
    },
    {
      type: 'Feature',
      properties: { name: 'Broadway Market', category: 'institution', color: '#ffd026', description: 'Historic food hall — Broadway-Fillmore anchor' },
      geometry: { type: 'Point', coordinates: [-78.8340, 42.8900] },
    },
  ],
};

// ═══════════════════════════════════════════
// Search Zone boundaries (for visual context)
// ═══════════════════════════════════════════

export const searchZonesGeoJSON: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    // Zone A: The Fruit Belt
    {
      type: 'Feature',
      properties: {
        name: 'Zone A: Fruit Belt',
        color: '#ff8033',
        thesis: 'Adjacent to Medical Campus (15k jobs). Rapidly gentrifying, distressed shells remain.',
        priceRange: '$50k–$120k',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-78.8590, 42.9030], [-78.8510, 42.9030], [-78.8510, 42.8960],
          [-78.8590, 42.8960], [-78.8590, 42.9030],
        ]],
      },
    },
    // Zone B: Black Rock / Grant Street
    {
      type: 'Feature',
      properties: {
        name: 'Zone B: Black Rock',
        color: '#ff8033',
        thesis: 'High density, walkable, historic storefronts. The "cool" gritty neighborhood.',
        priceRange: '$80k–$150k',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-78.8920, 42.9300], [-78.8780, 42.9300], [-78.8780, 42.9180],
          [-78.8920, 42.9180], [-78.8920, 42.9300],
        ]],
      },
    },
    // Zone C: Broadway-Fillmore
    {
      type: 'Feature',
      properties: {
        name: 'Zone C: Broadway-Fillmore',
        color: '#ff8033',
        thesis: 'Near Central Terminal (Sleeping Giant). Very cheap, high vacancy. High risk, massive upside.',
        priceRange: '$30k–$70k',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-78.8360, 42.8920], [-78.8200, 42.8920], [-78.8200, 42.8820],
          [-78.8360, 42.8820], [-78.8360, 42.8920],
        ]],
      },
    },
  ],
};
