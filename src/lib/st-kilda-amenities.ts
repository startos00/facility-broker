export const amenitiesGeoJSON: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    // ═══════════════════════════════════════════
    // 🏛 Cultural Institutions
    // ═══════════════════════════════════════════

    {
      type: 'Feature',
      properties: { name: 'Palais Theatre', category: 'institution', color: '#ff5aad', description: '1927 atmospheric theatre. 2,896 seats. Heritage icon of St Kilda.' },
      geometry: { type: 'Point', coordinates: [144.9740, -37.8686] },
    },
    {
      type: 'Feature',
      properties: { name: 'Luna Park', category: 'institution', color: '#ff5aad', description: 'Heritage amusement park (1912). The iconic face gate is Melbourne\'s most recognizable landmark.' },
      geometry: { type: 'Point', coordinates: [144.9762, -37.8678] },
    },
    {
      type: 'Feature',
      properties: { name: 'Linden New Art', category: 'institution', color: '#ff5aad', description: 'Contemporary art gallery in 1870s Victorian mansion. Free entry. Community arts hub.' },
      geometry: { type: 'Point', coordinates: [144.9797, -37.8671] },
    },
    {
      type: 'Feature',
      properties: { name: 'Jewish Museum of Australia', category: 'institution', color: '#ff5aad', description: 'Cultural institution serving one of Melbourne\'s largest Jewish communities.' },
      geometry: { type: 'Point', coordinates: [144.9838, -37.8620] },
    },
    {
      type: 'Feature',
      properties: { name: 'National Theatre', category: 'architecture', color: '#b07aff', description: 'Performing arts + ballet school. Heritage Art Deco building.' },
      geometry: { type: 'Point', coordinates: [144.9870, -37.8612] },
    },
    {
      type: 'Feature',
      properties: { name: 'Astor Theatre', category: 'architecture', color: '#b07aff', description: '1936 Art Deco cinema. Melbourne\'s last atmospheric single-screen cinema.' },
      geometry: { type: 'Point', coordinates: [144.9854, -37.8583] },
    },
    {
      type: 'Feature',
      properties: { name: 'St Kilda Town Hall', category: 'institution', color: '#ff5aad', description: 'Victorian civic building. Council offices + community spaces.' },
      geometry: { type: 'Point', coordinates: [144.9875, -37.8610] },
    },
    {
      type: 'Feature',
      properties: { name: 'The Espy (Hotel Esplanade)', category: 'architecture', color: '#b07aff', description: 'Heritage pub/live music venue. Restored 2018 after years of dereliction. Adaptive reuse case study.' },
      geometry: { type: 'Point', coordinates: [144.9742, -37.8682] },
    },
    {
      type: 'Feature',
      properties: { name: 'St Kilda Pier', category: 'institution', color: '#ff5aad', description: 'Little Penguin colony at breakwater. Tourist anchor. Kiosk rebuilt 2024.' },
      geometry: { type: 'Point', coordinates: [144.9730, -37.8620] },
    },

    // ═══════════════════════════════════════════
    // 🌳 Nature & Parks
    // ═══════════════════════════════════════════

    {
      type: 'Feature',
      properties: { name: 'St Kilda Beach & Foreshore', category: 'park', color: '#2ee672', description: '700m beach, cycling/walking promenade, sunset institution' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [144.9680, -37.8630], [144.9760, -37.8630], [144.9775, -37.8700],
          [144.9740, -37.8720], [144.9680, -37.8710], [144.9680, -37.8630],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'St Kilda Botanical Gardens', category: 'park', color: '#2ee672', description: 'Heritage gardens (1859). Subtropical conservatory, Alister Clark rose garden.' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [144.9818, -37.8680], [144.9860, -37.8680], [144.9860, -37.8710],
          [144.9818, -37.8710], [144.9818, -37.8680],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Catani Gardens', category: 'park', color: '#2ee672', description: 'Beachfront parkland with Norfolk pines, playground, event space.' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [144.9762, -37.8695], [144.9795, -37.8695], [144.9795, -37.8720],
          [144.9762, -37.8720], [144.9762, -37.8695],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: "O'Donnell Gardens", category: 'park', color: '#2ee672', description: 'Upper Esplanade. Harbor views. Social services pressure point.' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [144.9738, -37.8648], [144.9758, -37.8648], [144.9758, -37.8665],
          [144.9738, -37.8665], [144.9738, -37.8648],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Albert Park Lake', category: 'park', color: '#2ee672', description: 'Major green lung (225 ha). Melbourne Grand Prix circuit.' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [144.9680, -37.8440], [144.9810, -37.8440], [144.9810, -37.8560],
          [144.9680, -37.8560], [144.9680, -37.8440],
        ]],
      },
    },

    // ═══════════════════════════════════════════
    // 🚃 Transit (Tram Network)
    // ═══════════════════════════════════════════

    // Tram Route 96 — St Kilda's spine
    {
      type: 'Feature',
      properties: { name: 'Tram Route 96', category: 'transit', color: '#22d3ee', description: 'St Kilda Beach ↔ East Brunswick via CBD. One of Melbourne\'s busiest routes.' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [144.9738, -37.8678],   // St Kilda Beach terminus
          [144.9760, -37.8665],
          [144.9788, -37.8640],
          [144.9800, -37.8618],
          [144.9815, -37.8590],
          [144.9830, -37.8560],   // Heading toward CBD via St Kilda Rd
          [144.9720, -37.8420],   // Albert Park
          [144.9680, -37.8270],   // Domain Interchange
        ],
      },
    },
    // Tram Route 16 — Fitzroy St route
    {
      type: 'Feature',
      properties: { name: 'Tram Route 16', category: 'transit', color: '#22d3ee', description: 'St Kilda Beach ↔ Melbourne University via Fitzroy St and CBD.' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [144.9738, -37.8678],   // Fitzroy St terminus
          [144.9752, -37.8665],
          [144.9778, -37.8635],
          [144.9792, -37.8610],
          [144.9730, -37.8470],   // St Kilda Rd
        ],
      },
    },
    // Key transit stops
    {
      type: 'Feature',
      properties: { name: 'St Kilda Beach Terminus', category: 'transit', color: '#22d3ee', description: 'Tram Routes 3, 16, 96 terminus at the Esplanade' },
      geometry: { type: 'Point', coordinates: [144.9738, -37.8678] },
    },
    {
      type: 'Feature',
      properties: { name: 'Balaclava Station', category: 'transit', color: '#22d3ee', description: 'Frankston Line rail station. Walk to Carlisle St strip.' },
      geometry: { type: 'Point', coordinates: [144.9930, -37.8700] },
    },

    // ═══════════════════════════════════════════
    // 🏭 Other Landmarks
    // ═══════════════════════════════════════════

    {
      type: 'Feature',
      properties: { name: 'St Kilda Library', category: 'institution', color: '#ffd026', description: 'City of Port Phillip library. Recently renovated. High activation benchmark.' },
      geometry: { type: 'Point', coordinates: [144.9880, -37.8607] },
    },
    {
      type: 'Feature',
      properties: { name: 'Veg Out Community Gardens', category: 'institution', color: '#ffd026', description: 'Community garden on former bowling green. Model civic reuse case study.' },
      geometry: { type: 'Point', coordinates: [144.9740, -37.8646] },
    },
  ],
};

// ═══════════════════════════════════════════
// Search Zone boundaries
// ═══════════════════════════════════════════

export const searchZonesGeoJSON: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    // Zone D: Fitzroy Street Corridor
    {
      type: 'Feature',
      properties: {
        name: 'Zone D: Fitzroy Street',
        color: '#ff8033',
        thesis: 'Contested social services corridor. Homelessness and new apartments coexist. Rich social infrastructure analysis territory.',
        priceRange: 'AUD $650k–$900k',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [144.9740, -37.8620], [144.9800, -37.8620], [144.9800, -37.8680],
          [144.9740, -37.8680], [144.9740, -37.8620],
        ]],
      },
    },
    // Zone E: Acland Street Precinct
    {
      type: 'Feature',
      properties: {
        name: 'Zone E: Acland Street',
        color: '#ff8033',
        thesis: 'Pedestrianized cultural spine. Bakeries, cafes, Luna Park. Jewish precinct. Emerging shopfront vacancies.',
        priceRange: 'AUD $700k–$1.1M',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [144.9770, -37.8650], [144.9830, -37.8650], [144.9830, -37.8700],
          [144.9770, -37.8700], [144.9770, -37.8650],
        ]],
      },
    },
    // Zone F: Carlisle Street / Balaclava
    {
      type: 'Feature',
      properties: {
        name: 'Zone F: Carlisle / Balaclava',
        color: '#ff8033',
        thesis: 'Where St Kilda meets Balaclava. Dense, walkable, multicultural. Near rail. Community kitchen potential.',
        priceRange: 'AUD $550k–$850k',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [144.9840, -37.8590], [144.9950, -37.8590], [144.9950, -37.8640],
          [144.9840, -37.8640], [144.9840, -37.8590],
        ]],
      },
    },
  ],
};
