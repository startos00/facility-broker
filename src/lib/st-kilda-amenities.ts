export const amenitiesGeoJSON: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    // ═══════════════════════════════════════════
    // 🏛 Cultural Institutions
    // ═══════════════════════════════════════════

    {
      type: 'Feature',
      properties: { name: 'Palais Theatre', category: 'institution', color: '#ff5aad', description: '1927 atmospheric theatre. 2,896 seats. Heritage icon of St Kilda.', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Palais_Theatre_St_Kilda.jpg/400px-Palais_Theatre_St_Kilda.jpg' },
      geometry: { type: 'Point', coordinates: [144.9740, -37.8686] },
    },
    {
      type: 'Feature',
      properties: { name: 'Luna Park', category: 'institution', color: '#ff5aad', description: 'Heritage amusement park (1912). The iconic face gate is Melbourne\'s most recognizable landmark.', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Melbourne%27s_Luna_Park_entrance_at_night.jpg/400px-Melbourne%27s_Luna_Park_entrance_at_night.jpg' },
      geometry: { type: 'Point', coordinates: [144.9762, -37.8678] },
    },
    {
      type: 'Feature',
      properties: { name: 'Linden New Art', category: 'institution', color: '#ff5aad', description: 'Contemporary art gallery in 1870s Victorian mansion. Free entry. Community arts hub.', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Linden_Arts_Centre_and_Gallery.JPG/400px-Linden_Arts_Centre_and_Gallery.JPG' },
      geometry: { type: 'Point', coordinates: [144.9797, -37.8671] },
    },
    {
      type: 'Feature',
      properties: { name: 'Jewish Museum of Australia', category: 'institution', color: '#ff5aad', description: 'Cultural institution serving one of Melbourne\'s largest Jewish communities.', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Jewish_Museum_of_Australia_-_www.joyofmuseums.com_-_exterior_2.jpg/400px-Jewish_Museum_of_Australia_-_www.joyofmuseums.com_-_exterior_2.jpg' },
      geometry: { type: 'Point', coordinates: [144.9838, -37.8620] },
    },
    {
      type: 'Feature',
      properties: { name: 'National Theatre', category: 'architecture', color: '#b07aff', description: 'Performing arts + ballet school. Heritage Art Deco building.', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/National_theatre_st_kilda.jpg/400px-National_theatre_st_kilda.jpg' },
      geometry: { type: 'Point', coordinates: [144.9870, -37.8612] },
    },
    {
      type: 'Feature',
      properties: { name: 'Astor Theatre', category: 'architecture', color: '#b07aff', description: '1936 Art Deco cinema. Melbourne\'s last atmospheric single-screen cinema.', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Astor_Theatre_facade%2C_Melbourne%2C_1936.tif/lossy-page1-400px-Astor_Theatre_facade%2C_Melbourne%2C_1936.tif.jpg' },
      geometry: { type: 'Point', coordinates: [144.9854, -37.8583] },
    },
    {
      type: 'Feature',
      properties: { name: 'St Kilda Town Hall', category: 'institution', color: '#ff5aad', description: 'Victorian civic building. Council offices + community spaces.', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/St_Kilda_Town_Hall%2C_jjron%2C_23.10.2011.jpg/400px-St_Kilda_Town_Hall%2C_jjron%2C_23.10.2011.jpg' },
      geometry: { type: 'Point', coordinates: [144.9875, -37.8610] },
    },
    {
      type: 'Feature',
      properties: { name: 'The Espy (Hotel Esplanade)', category: 'architecture', color: '#b07aff', description: 'Heritage pub/live music venue. Restored 2018 after years of dereliction. Adaptive reuse case study.', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Hotel_Esplanade_St_Kilda_Melbourne.jpg' },
      geometry: { type: 'Point', coordinates: [144.9742, -37.8682] },
    },
    {
      type: 'Feature',
      properties: { name: 'St Kilda Pier', category: 'institution', color: '#ff5aad', description: 'Little Penguin colony at breakwater. Tourist anchor. Kiosk rebuilt 2024.', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/St_Kilda_Pier_and_Kiosk_with_Catani_Gardens_in_foreground_-_panoramio.jpg/400px-St_Kilda_Pier_and_Kiosk_with_Catani_Gardens_in_foreground_-_panoramio.jpg' },
      geometry: { type: 'Point', coordinates: [144.9730, -37.8620] },
    },

    // ═══════════════════════════════════════════
    // 🌳 Nature & Parks
    // ═══════════════════════════════════════════

    {
      type: 'Feature',
      properties: { name: 'St Kilda Beach & Foreshore', category: 'park', color: '#2ee672', description: '700m beach, cycling/walking promenade, sunset institution', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/St_Kilda_Beach_Panorama.jpg/400px-St_Kilda_Beach_Panorama.jpg' },
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
      properties: { name: 'St Kilda Botanical Gardens', category: 'park', color: '#2ee672', description: 'Heritage gardens (1859). Subtropical conservatory, Alister Clark rose garden.', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/St_Kilda_Botanic_Gardens.jpg/400px-St_Kilda_Botanic_Gardens.jpg' },
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
      properties: { name: "O'Donnell Gardens", category: 'park', color: '#2ee672', description: 'Upper Esplanade. Harbor views. Social services pressure point.', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Edward_O%27Donnell_Memorial_located_in_O%27Donnell_Gardens%2C_St_Kilda_%281%29.jpg/400px-Edward_O%27Donnell_Memorial_located_in_O%27Donnell_Gardens%2C_St_Kilda_%281%29.jpg' },
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
      properties: { name: 'Albert Park Lake', category: 'park', color: '#2ee672', description: 'Major green lung (225 ha). Melbourne Grand Prix circuit.', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Albert_park_aerial.jpg/400px-Albert_park_aerial.jpg' },
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
      properties: { name: 'Balaclava Station', category: 'transit', color: '#22d3ee', description: 'Frankston Line rail station. Walk to Carlisle St strip.', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Balaclava_station_2024_b.jpg/400px-Balaclava_station_2024_b.jpg' },
      geometry: { type: 'Point', coordinates: [144.9930, -37.8700] },
    },

    // ═══════════════════════════════════════════
    // 🏭 Other Landmarks
    // ═══════════════════════════════════════════

    {
      type: 'Feature',
      properties: { name: 'St Kilda Library', category: 'institution', color: '#ffd026', description: 'City of Port Phillip library. Recently renovated. High activation benchmark.', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Elevation%2C_St_Kilda_Library.jpg/400px-Elevation%2C_St_Kilda_Library.jpg' },
      geometry: { type: 'Point', coordinates: [144.9880, -37.8607] },
    },
    {
      type: 'Feature',
      properties: { name: 'Veg Out Community Gardens', category: 'institution', color: '#ffd026', description: 'Community garden on former bowling green. Model civic reuse case study.' },
      geometry: { type: 'Point', coordinates: [144.9740, -37.8646] },
    },

    // ═══════════════════════════════════════════
    // ⛪ Faith & Spiritual
    // ═══════════════════════════════════════════

    {
      type: 'Feature',
      properties: { name: 'St Kilda Hebrew Congregation', category: 'faith', color: '#e8a838', description: 'Orthodox synagogue (est. 1872), 12 Charnwood Grove. One of Melbourne\'s oldest Jewish congregations. Heritage-listed.' },
      geometry: { type: 'Point', coordinates: [144.9853, -37.8596] },
    },
    {
      type: 'Feature',
      properties: { name: 'St Kilda Elsternwick Baptist Church', category: 'faith', color: '#e8a838', description: 'Baptist church serving St Kilda and Elsternwick communities. Rippon Grove area.' },
      geometry: { type: 'Point', coordinates: [144.9890, -37.8660] },
    },
    {
      type: 'Feature',
      properties: { name: 'Sacred Heart Catholic Church', category: 'faith', color: '#e8a838', description: 'Gothic Revival parish church on Grey Street. Heritage-listed. Active parish.', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Sacred_Heart_Church%2C_St_Kilda.jpg/400px-Sacred_Heart_Church%2C_St_Kilda.jpg' },
      geometry: { type: 'Point', coordinates: [144.97985676118213, -37.8626556260632] },
    },
    {
      type: 'Feature',
      properties: { name: 'St Colman\'s Catholic Church', category: 'faith', color: '#e8a838', description: 'Catholic parish at Crimea Street, Balaclava. Serves St Kilda East / Balaclava area.' },
      geometry: { type: 'Point', coordinates: [144.9870, -37.8630] },
    },
    {
      type: 'Feature',
      properties: { name: 'St Kilda Uniting Church', category: 'faith', color: '#e8a838', description: 'Uniting Church on Alma Road. Active community outreach and social justice programs.' },
      geometry: { type: 'Point', coordinates: [144.9830, -37.8603] },
    },

    // ═══════════════════════════════════════════
    // 🏢 Post-War Walk-Up Flats
    // ═══════════════════════════════════════════

    {
      type: 'Feature',
      properties: { name: 'Walk-Up Flats, 28 Carlisle St', category: 'housing', color: '#8b95a4', description: 'Mid-century residential walk-up. Typology study: post-war density response.' },
      geometry: { type: 'Point', coordinates: [144.9817, -37.8670] },
    },
    {
      type: 'Feature',
      properties: { name: 'Walk-Up Flats, 11 Burnett St', category: 'housing', color: '#8b95a4', description: 'Low-rise apartment block. Characteristic St Kilda residential form.' },
      geometry: { type: 'Point', coordinates: [144.9804, -37.8612] },
    },
    {
      type: 'Feature',
      properties: { name: 'Walk-Up Flats, 22 Dalgety St', category: 'housing', color: '#8b95a4', description: 'Walk-up flats. Represents dominant housing typology in inner St Kilda.' },
      geometry: { type: 'Point', coordinates: [144.9797, -37.8600] },
    },

    // ═══════════════════════════════════════════
    // 🏛 Civic & Community (additions)
    // ═══════════════════════════════════════════

    {
      type: 'Feature',
      properties: { name: 'Elwood & St Kilda Learning Centre', category: 'institution', color: '#ff5aad', description: 'Neighbourhood house. Adult education, ESL, digital literacy. Community glue.' },
      geometry: { type: 'Point', coordinates: [144.9780, -37.8750] },
    },
    {
      type: 'Feature',
      properties: { name: 'Victorian Pride Centre', category: 'institution', color: '#ff5aad', description: 'Australia\'s first purpose-built LGBTQ+ community hub (2021). 79-81 Fitzroy St. Landmark civic institution.' },
      geometry: { type: 'Point', coordinates: [144.9763, -37.8606] },
    },

    // ═══════════════════════════════════════════
    // 🤝 Mutual Aid & Recreational
    // ═══════════════════════════════════════════

    {
      type: 'Feature',
      properties: { name: 'St Kilda Bowling Club', category: 'institution', color: '#ffd026', description: 'Lawn bowling club on Fitzroy Street. Long-established local sporting and social venue.' },
      geometry: { type: 'Point', coordinates: [144.9730, -37.8595] },
    },
    {
      type: 'Feature',
      properties: { name: 'St Kilda RSL', category: 'institution', color: '#ffd026', description: 'Returned Services League sub-branch, Acland Street. Veterans\' club and community venue.' },
      geometry: { type: 'Point', coordinates: [144.9785, -37.8675] },
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
