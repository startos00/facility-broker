export const amenitiesGeoJSON: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    // ═══════════════════════════════════════════
    // 🏛 Cultural Institutions
    // ═══════════════════════════════════════════

    {
      type: 'Feature',
      properties: { name: 'Fremantle Prison', category: 'institution', color: '#ff5aad', description: 'UNESCO World Heritage Site (2010). Convict-era prison (1855). Now museum + events + art.' },
      geometry: { type: 'Point', coordinates: [115.7540, -32.0555] },
    },
    {
      type: 'Feature',
      properties: { name: 'WA Maritime Museum', category: 'institution', color: '#ff5aad', description: 'Striking modern building (2002). Houses submarine HMAS Ovens + America\'s Cup history.' },
      geometry: { type: 'Point', coordinates: [115.7380, -32.0530] },
    },
    {
      type: 'Feature',
      properties: { name: 'Fremantle Arts Centre', category: 'architecture', color: '#b07aff', description: '1860s Gothic asylum converted to arts center (1972). Exemplary adaptive reuse — Archive benchmark.' },
      geometry: { type: 'Point', coordinates: [115.7500, -32.0510] },
    },
    {
      type: 'Feature',
      properties: { name: 'The Roundhouse', category: 'architecture', color: '#b07aff', description: 'WA\'s oldest public building (1831). Convict-built. Heritage anchor at Arthur Head.' },
      geometry: { type: 'Point', coordinates: [115.7385, -32.0565] },
    },
    {
      type: 'Feature',
      properties: { name: 'Fremantle Markets', category: 'institution', color: '#ff5aad', description: 'Heritage market hall (1897). Active weekend market. High activation score.' },
      geometry: { type: 'Point', coordinates: [115.7480, -32.0575] },
    },
    {
      type: 'Feature',
      properties: { name: 'Shipwreck Galleries', category: 'institution', color: '#ff5aad', description: 'Branch of WA Museum. Houses Dutch VOC shipwreck artifacts. Colonial heritage.' },
      geometry: { type: 'Point', coordinates: [115.7435, -32.0548] },
    },
    {
      type: 'Feature',
      properties: { name: 'Moores Building', category: 'architecture', color: '#b07aff', description: 'Contemporary art gallery in heritage commercial building. Community-run.' },
      geometry: { type: 'Point', coordinates: [115.7460, -32.0552] },
    },
    {
      type: 'Feature',
      properties: { name: 'Fremantle Town Hall', category: 'institution', color: '#ff5aad', description: '1887 Victorian civic building. Still active municipal function.' },
      geometry: { type: 'Point', coordinates: [115.7470, -32.0560] },
    },
    {
      type: 'Feature',
      properties: { name: 'MANY 6160', category: 'architecture', color: '#b07aff', description: 'Community creative hub in former warehouse. Maker spaces, studios, events. Model civic reuse.' },
      geometry: { type: 'Point', coordinates: [115.7458, -32.0598] },
    },

    // ═══════════════════════════════════════════
    // 🌳 Nature & Parks
    // ═══════════════════════════════════════════

    {
      type: 'Feature',
      properties: { name: 'Esplanade Reserve', category: 'park', color: '#2ee672', description: 'Large urban park between CBD and Fishing Boat Harbour. Events, playground, Norfolk pines.' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [115.7425, -32.0575], [115.7490, -32.0575], [115.7490, -32.0615],
          [115.7425, -32.0615], [115.7425, -32.0575],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Arthur Head Reserve', category: 'park', color: '#2ee672', description: 'Headland with Roundhouse + sculpture walk + Indian Ocean views.' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [115.7370, -32.0550], [115.7405, -32.0550], [115.7405, -32.0580],
          [115.7370, -32.0580], [115.7370, -32.0550],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Bathers Beach', category: 'park', color: '#2ee672', description: 'Only city beach between harbour and Round House. Swimming + venue.' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [115.7360, -32.0570], [115.7395, -32.0570], [115.7395, -32.0595],
          [115.7360, -32.0595], [115.7360, -32.0570],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Cantonment Hill', category: 'park', color: '#2ee672', description: 'Former military reserve. Panoramic views of port and city. Heritage site.' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [115.7520, -32.0480], [115.7560, -32.0480], [115.7560, -32.0510],
          [115.7520, -32.0510], [115.7520, -32.0480],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'South Beach', category: 'park', color: '#2ee672', description: 'Southern swimming beach. Less touristy, local families.' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [115.7520, -32.0720], [115.7560, -32.0720], [115.7560, -32.0760],
          [115.7520, -32.0760], [115.7520, -32.0720],
        ]],
      },
    },

    // ═══════════════════════════════════════════
    // 🚂 Transit
    // ═══════════════════════════════════════════

    // Fremantle Line (rail from Perth)
    {
      type: 'Feature',
      properties: { name: 'Fremantle Train Line', category: 'transit', color: '#22d3ee', description: 'Perth CBD ↔ Fremantle (25 min). Heritage-listed terminus.' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [115.7445, -32.0520],   // Fremantle Station
          [115.7520, -32.0480],
          [115.7650, -32.0400],
          [115.7780, -32.0350],   // North Fremantle
          [115.7900, -32.0280],   // Heading toward Perth
        ],
      },
    },
    // Blue CAT Bus loop
    {
      type: 'Feature',
      properties: { name: 'Blue CAT Bus Loop', category: 'transit', color: '#22d3ee', description: 'Free loop bus: Station ↔ Fishing Boat Harbour ↔ West End ↔ Markets' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [115.7445, -32.0520],   // Fremantle Station
          [115.7430, -32.0545],   // West End
          [115.7410, -32.0580],   // Fishing Boat Harbour
          [115.7460, -32.0600],
          [115.7490, -32.0575],   // Markets
          [115.7470, -32.0545],
          [115.7445, -32.0520],   // Back to Station
        ],
      },
    },
    // Key transit points
    {
      type: 'Feature',
      properties: { name: 'Fremantle Station', category: 'transit', color: '#22d3ee', description: 'Heritage terminus (1907). Hub for trains, buses, Blue CAT.' },
      geometry: { type: 'Point', coordinates: [115.7445, -32.0520] },
    },
    {
      type: 'Feature',
      properties: { name: 'Victoria Quay Ferry Terminal', category: 'transit', color: '#22d3ee', description: 'Ferry to Rottnest Island. Major tourist transit.' },
      geometry: { type: 'Point', coordinates: [115.7380, -32.0505] },
    },

    // ═══════════════════════════════════════════
    // 🏭 Other Landmarks
    // ═══════════════════════════════════════════

    {
      type: 'Feature',
      properties: { name: 'Fremantle Library', category: 'institution', color: '#ffd026', description: 'City of Fremantle library. Heritage building. High activation.' },
      geometry: { type: 'Point', coordinates: [115.7485, -32.0540] },
    },
    {
      type: 'Feature',
      properties: { name: 'Fishing Boat Harbour', category: 'institution', color: '#ffd026', description: 'Working harbour + fish & chips precinct. Tourist anchor.' },
      geometry: { type: 'Point', coordinates: [115.7410, -32.0610] },
    },
    {
      type: 'Feature',
      properties: { name: 'Cappuccino Strip (South Terrace)', category: 'institution', color: '#ffd026', description: 'Iconic cafe strip. Al fresco dining spine of Fremantle.' },
      geometry: { type: 'Point', coordinates: [115.7490, -32.0568] },
    },
  ],
};

// ═══════════════════════════════════════════
// Search Zone boundaries
// ═══════════════════════════════════════════

export const searchZonesGeoJSON: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    // Zone G: West End Heritage Precinct
    {
      type: 'Feature',
      properties: {
        name: 'Zone G: West End',
        color: '#ff8033',
        thesis: 'Best-preserved 19th-century port streetscape globally. Upper floors chronically vacant above active retail. Ultimate adaptive reuse territory.',
        priceRange: 'AUD $500k–$800k',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [115.7390, -32.0520], [115.7470, -32.0520], [115.7470, -32.0580],
          [115.7390, -32.0580], [115.7390, -32.0520],
        ]],
      },
    },
    // Zone H: Fishing Boat Harbour / South Fremantle
    {
      type: 'Feature',
      properties: {
        name: 'Zone H: Harbour / South Freo',
        color: '#ff8033',
        thesis: 'Working harbour transitioning to mixed-use. Former wool stores and maritime warehouses being converted. Industrial-to-creative corridor.',
        priceRange: 'AUD $700k–$1.2M',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [115.7380, -32.0590], [115.7520, -32.0590], [115.7520, -32.0660],
          [115.7380, -32.0660], [115.7380, -32.0590],
        ]],
      },
    },
    // Zone I: North Fremantle
    {
      type: 'Feature',
      properties: {
        name: 'Zone I: North Fremantle',
        color: '#ff8033',
        thesis: 'Post-industrial riverfront. Flour mills, timber yards converting to apartments. Social infrastructure desert in rapid-growth residential area.',
        priceRange: 'AUD $800k–$1.5M',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [115.7550, -32.0380], [115.7700, -32.0380], [115.7700, -32.0470],
          [115.7550, -32.0470], [115.7550, -32.0380],
        ]],
      },
    },
  ],
};
