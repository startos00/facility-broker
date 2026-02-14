import { config } from 'dotenv';
config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

interface SeedNode {
  node_name: string;
  typology: 'society' | 'asset' | 'facility';
  description: string;
  latitude: number;
  longitude: number;
  // Society fields
  population?: number;
  vibe?: string;
  next_event_date?: string;
  // Asset fields
  acreage?: string;
  price?: number;
  zoning?: string;
  editability?: number;
  is_distressed?: boolean;
  // Facility fields
  capacity_pax?: number;
  internet_speed?: string;
  availability?: string;
  is_free_offer?: boolean;
  // Investor flag
  seeking_capital?: boolean;
  capital_amount?: string;
}

const seedNodes: SeedNode[] = [
  // ── Type 1: Society Node ──
  {
    node_name: 'Buffalo DAO Meetup Spot',
    typology: 'society',
    description: 'Local Web3 / Network State community. Weekly builder sessions at rotating venues in Allentown. Open to all.',
    latitude: 42.8995,
    longitude: -78.8720,
    population: 42,
    vibe: 'Builder / Hacker',
    next_event_date: '2026-03-15',
  },

  // ── Type 2: Assets — Zone A: Fruit Belt ──
  {
    node_name: 'Fruit Belt 2-Story Wood Frame',
    typology: 'asset',
    description: 'Needs Roof/Gut Reno. 2 blocks from Innovation Center on the Medical Campus. Classic Buffalo balloon-frame construction.',
    latitude: 42.8995,
    longitude: -78.8545,
    price: 65000,
    acreage: '0.08',
    zoning: 'Residential',
    editability: 8,
    is_distressed: true,
    seeking_capital: true,
    capital_amount: '$40,000 for renovation',
  },
  {
    node_name: 'Fruit Belt Duplex — Near BNMC',
    typology: 'asset',
    description: 'Walkable to Downtown + Medical Campus. Upper/lower duplex with potential for live/work conversion.',
    latitude: 42.8988,
    longitude: -78.8560,
    price: 85000,
    acreage: '0.06',
    zoning: 'Residential',
    editability: 7,
    is_distressed: true,
  },

  // ── Type 2: Assets — Zone B: Black Rock / Grant Street ──
  {
    node_name: 'Mixed-Use Storefront — Grant St',
    typology: 'asset',
    description: 'Storefront bottom, apartment top. Active but tired. Potential for ground floor makerspace in the Immigrant/Punk hub.',
    latitude: 42.9240,
    longitude: -78.8870,
    price: 120000,
    acreage: '0.04',
    zoning: 'Mixed-Use',
    editability: 7,
    is_distressed: false,
  },
  {
    node_name: 'Black Rock Double — River Access',
    typology: 'asset',
    description: 'High density, walkable. Near Wegmans, live music venues, and Niagara River trail. Historic brick.',
    latitude: 42.9260,
    longitude: -78.8850,
    price: 95000,
    acreage: '0.05',
    zoning: 'Residential',
    editability: 6,
    is_distressed: false,
  },

  // ── Type 2: Assets — Zone C: Broadway-Fillmore ──
  {
    node_name: 'Large Victorian — Broadway-Fillmore',
    typology: 'asset',
    description: 'Abandoned / Bank Owned. 3,000+ sqft. Near the Central Terminal (the Sleeping Giant). High risk, massive upside if Terminal reopens.',
    latitude: 42.8875,
    longitude: -78.8290,
    price: 35000,
    acreage: '0.12',
    zoning: 'Residential',
    editability: 9,
    is_distressed: true,
    seeking_capital: true,
    capital_amount: '$80,000 for full renovation',
  },
  {
    node_name: 'Broadway-Fillmore Shell',
    typology: 'asset',
    description: 'Very cheap, high vacancy block. Near Broadway Market (historic food hall). Could be a DAO headquarters.',
    latitude: 42.8890,
    longitude: -78.8310,
    price: 42000,
    acreage: '0.09',
    zoning: 'Residential',
    editability: 8,
    is_distressed: true,
  },

  // ── Type 2: Large "Distressed Territory" Examples ──
  {
    node_name: 'Wonderbread Factory (Belt Line Corridor)',
    typology: 'asset',
    description: 'Large brick industrial shell in the Belt Line corridor. Ideal for DAO compound or creative collective. Zoned industrial.',
    latitude: 42.8850,
    longitude: -78.8480,
    price: 180000,
    acreage: '0.8',
    zoning: 'Industrial',
    editability: 9,
    is_distressed: true,
    seeking_capital: true,
    capital_amount: '$500,000 for adaptive reuse',
  },
  {
    node_name: 'East Side Church Conversion',
    typology: 'asset',
    description: 'Empty church due to demographic shifts. Beautiful stone architecture, high ceilings. Could be a community hub or event space.',
    latitude: 42.9020,
    longitude: -78.8430,
    price: 90000,
    acreage: '0.25',
    zoning: 'Institutional',
    editability: 7,
    is_distressed: true,
    seeking_capital: true,
    capital_amount: '$200,000 for conversion',
  },

  // ── Type 3: Facilities ──
  {
    node_name: 'HANSA Workspace',
    typology: 'facility',
    description: 'Modern coworking in a warehouse conversion at 505 Ellicott St. Hot desks, private offices, and event space.',
    latitude: 42.8942,
    longitude: -78.8620,
    capacity_pax: 80,
    internet_speed: '1 Gbps',
    availability: 'Ongoing — monthly memberships',
    is_free_offer: false,
  },
  {
    node_name: 'The Foundry Makerspace',
    typology: 'facility',
    description: 'Makerspace with wood/metal shops at 298 Northampton St. Ideal for hardware startups. Equipment included.',
    latitude: 42.9148,
    longitude: -78.8760,
    capacity_pax: 30,
    internet_speed: '500 Mbps',
    availability: '6 months',
    is_free_offer: true,
  },
  {
    node_name: 'Buffalo Game Space',
    typology: 'facility',
    description: 'Game dev collective at Tri-Main Center. Good "Internet Gang" energy. Shared dev stations and streaming setup.',
    latitude: 42.9170,
    longitude: -78.8700,
    capacity_pax: 20,
    internet_speed: '500 Mbps',
    availability: '3 months',
    is_free_offer: true,
  },
  {
    node_name: '500 Pearl',
    typology: 'facility',
    description: 'Mixed use complex with bowling/hotel. Good for "Zuzalu" style retreats. Can book floors for pop-up events.',
    latitude: 42.8910,
    longitude: -78.8735,
    capacity_pax: 150,
    internet_speed: '300 Mbps',
    availability: 'On-demand booking',
    is_free_offer: false,
  },
];

async function seed() {
  console.log(`Seeding ${seedNodes.length} nodes...`);

  for (const node of seedNodes) {
    const stmt = `
      INSERT INTO nodes (
        node_name, typology, description, latitude, longitude,
        population, vibe, next_event_date,
        acreage, price, zoning, editability, is_distressed,
        capacity_pax, internet_speed, availability, is_free_offer,
        seeking_capital, capital_amount
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8,
        $9, $10, $11, $12, $13,
        $14, $15, $16, $17,
        $18, $19
      )
    `;

    await sql.query(stmt, [
      node.node_name,
      node.typology,
      node.description,
      node.latitude,
      node.longitude,
      node.population ?? null,
      node.vibe ?? null,
      node.next_event_date ?? null,
      node.acreage ?? null,
      node.price ?? null,
      node.zoning ?? null,
      node.editability ?? null,
      node.is_distressed ?? false,
      node.capacity_pax ?? null,
      node.internet_speed ?? null,
      node.availability ?? null,
      node.is_free_offer ?? false,
      node.seeking_capital ?? false,
      node.capital_amount ?? null,
    ]);

    console.log(`  ✓ ${node.typology.toUpperCase()} — ${node.node_name}`);
  }

  console.log('Seed complete.');
}

seed().catch(console.error);
