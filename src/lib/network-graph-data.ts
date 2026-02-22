export interface GraphNode {
  id: string;
  label: string;
  subtitle?: string;
  x: number;
  y: number;
  shape: 'circle' | 'diamond' | 'triangle' | 'hexagon';
  color: string;
  phase: number;
  description: string;
  stat?: string;
  statLabel?: string;
  cta?: { label: string; href: string };
}

export interface GraphEdge {
  from: string;
  to: string;
  phase: number;
}

export const GRAPH_NODES: GraphNode[] = [
  {
    id: 'hub',
    label: 'CLOUDTOTERRA',
    subtitle: 'Territorial Intelligence Platform',
    x: 500,
    y: 50,
    shape: 'hexagon',
    color: '#22d3ee',
    phase: 0,
    description:
      'The geospatial marketplace where Network Societies find physical territory. Scout assets, signal communities, broker space.',
    stat: 'v2.0',
    statLabel: 'live',
  },
  {
    id: 'society',
    label: 'Society',
    subtitle: 'Network Nodes',
    x: 200,
    y: 180,
    shape: 'circle',
    color: '#22d3ee',
    phase: 1,
    description:
      'Active communities, pop-up cities, and builder bases. Track where the tribes are gathering.',
    stat: '42 avg',
    statLabel: 'population',
  },
  {
    id: 'asset',
    label: 'Asset',
    subtitle: 'Physical Assets',
    x: 500,
    y: 180,
    shape: 'diamond',
    color: '#ff8033',
    phase: 1,
    description:
      'Land, buildings, and distressed properties for acquisition. From $30k shells to industrial compounds.',
    stat: '$35k',
    statLabel: 'median price',
  },
  {
    id: 'facility',
    label: 'Facility',
    subtitle: 'Shared Spaces',
    x: 800,
    y: 180,
    shape: 'triangle',
    color: '#b07aff',
    phase: 1,
    description:
      'Coworking halls, makerspaces, and garages. Some listed free for Network State builders.',
    stat: 'FREE',
    statLabel: 'offers available',
  },
  {
    id: 'buffalo',
    label: 'Buffalo, NY',
    subtitle: 'Pilot Zone Alpha',
    x: 500,
    y: 320,
    shape: 'hexagon',
    color: '#2ee672',
    phase: 2,
    description:
      "America's most affordable Rust Belt city meets its greatest opportunity. Frank Lloyd Wright architecture, Olmsted parks, and distressed Victorian shells starting at $30k.",
    stat: '15,000+',
    statLabel: 'medical campus jobs',
  },
  {
    id: 'fruitbelt',
    label: 'Fruit Belt',
    subtitle: 'Zone A',
    x: 200,
    y: 440,
    shape: 'circle',
    color: '#22d3ee',
    phase: 3,
    description:
      'Adjacent to Medical Campus. Gentrifying. Distressed shells available for acquisition.',
    stat: '$50k–$120k',
    statLabel: 'price range',
  },
  {
    id: 'blackrock',
    label: 'Black Rock',
    subtitle: 'Zone B',
    x: 500,
    y: 440,
    shape: 'circle',
    color: '#22d3ee',
    phase: 3,
    description:
      'Walkable, historic storefronts. The punk/immigrant hub with strong community energy.',
    stat: '$80k–$150k',
    statLabel: 'price range',
  },
  {
    id: 'broadway',
    label: 'Broadway-Fillmore',
    subtitle: 'Zone C',
    x: 800,
    y: 440,
    shape: 'circle',
    color: '#22d3ee',
    phase: 3,
    description:
      'Near Central Terminal. Deep value play. High vacancy creates opportunity for builders.',
    stat: '$30k–$70k',
    statLabel: 'price range',
  },
  {
    id: 'protocol',
    label: 'No Gatekeepers',
    subtitle: 'Open Protocol',
    x: 500,
    y: 560,
    shape: 'hexagon',
    color: '#2ee672',
    phase: 4,
    description:
      'CloudtoTerra is an open intelligence layer. No account needed to read or write. Anyone can signal a node, draw a boundary, or flag an asset. The network is the authentication.',
    cta: { label: 'OPEN THE MAP', href: '/map' },
  },
];

export const GRAPH_EDGES: GraphEdge[] = [
  { from: 'hub', to: 'society', phase: 1 },
  { from: 'hub', to: 'asset', phase: 1 },
  { from: 'hub', to: 'facility', phase: 1 },
  { from: 'society', to: 'buffalo', phase: 2 },
  { from: 'asset', to: 'buffalo', phase: 2 },
  { from: 'facility', to: 'buffalo', phase: 2 },
  { from: 'buffalo', to: 'fruitbelt', phase: 3 },
  { from: 'buffalo', to: 'blackrock', phase: 3 },
  { from: 'buffalo', to: 'broadway', phase: 3 },
  { from: 'blackrock', to: 'protocol', phase: 4 },
];

export const PHASE_LABELS = [
  'Platform',
  'Signal Types',
  'Pilot Zone',
  'Target Zones',
  'Protocol',
];
