'use client';

import type { NodeData, Typology } from './MapApp';

const NODE_COLORS: Record<Typology, string> = {
  society: '#22d3ee',
  asset: '#ff8033',
  facility: '#b07aff',
};

const TYPOLOGY_LABELS: Record<Typology, string> = {
  society: 'Society',
  asset: 'Asset',
  facility: 'Facility',
};

interface NearestAmenity {
  name: string;
  color: string;
  distance: number;
}

interface DetailDrawerProps {
  node: NodeData;
  nearestAmenities: NearestAmenity[];
  onClose: () => void;
  isDark: boolean;
}

export default function DetailDrawer({ node, nearestAmenities, onClose, isDark }: DetailDrawerProps) {
  const color = NODE_COLORS[node.typology];
  const formattedDate = new Date(node.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="absolute right-0 top-0 h-full w-[400px] z-30 slide-in-right">
      <div className="glass-panel-solid h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <p className="font-mono text-[10px] text-text-dim tracking-[0.2em]">NODE INTEL</p>
          <button onClick={onClose} className="text-text-dim hover:text-text-primary transition-colors text-xl cursor-pointer leading-none">&times;</button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Photo */}
          {node.photoUrl && (
            <div className="w-full h-52 bg-surface">
              <img src={node.photoUrl} alt={node.nodeName} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="px-6 py-5 space-y-4">
            {/* Name + typology + badges */}
            <div>
              <h2 className="text-lg font-medium text-text-bright leading-tight">{node.nodeName}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-2.5">
                <span className="inline-block px-3 py-1 rounded font-mono text-[10px] tracking-[0.15em] uppercase border" style={{ borderColor: `${color}33`, color, background: `${color}15` }}>
                  {TYPOLOGY_LABELS[node.typology]}
                </span>
                {node.isDistressed && (
                  <span className="inline-block px-2.5 py-1 rounded font-mono text-[10px] tracking-wider uppercase bg-red-500/10 text-red-400 border border-red-500/20">
                    DISTRESSED
                  </span>
                )}
                {node.isFreeOffer && (
                  <span className="inline-block px-2.5 py-1 rounded font-mono text-[10px] tracking-wider uppercase bg-signal-green/10 text-signal-green border border-signal-green/20">
                    FREE OFFER
                  </span>
                )}
                {node.seekingCapital && (
                  <span className="inline-block px-2.5 py-1 rounded font-mono text-[10px] tracking-wider uppercase bg-signal-green/10 text-signal-green border border-signal-green/20">
                    SEEKING CAPITAL
                  </span>
                )}
              </div>
            </div>

            {/* Coordinates */}
            <div className="glass-panel px-4 py-3 font-mono text-xs">
              <span className="text-text-dim">LOC&nbsp;</span>
              <span style={{ color }}>{node.latitude.toFixed(6)}, {node.longitude.toFixed(6)}</span>
              {node.boundary && <span className="text-text-dim ml-2">&middot; POLYGON</span>}
            </div>

            {/* Investor block */}
            {node.seekingCapital && node.capitalAmount && (
              <div className="glass-panel px-4 py-3">
                <p className="font-mono text-[10px] text-signal-green tracking-wider uppercase mb-1">INVESTOR SIGNAL</p>
                <p className="text-sm text-text-bright">Seeking {node.capitalAmount} for this node.</p>
              </div>
            )}

            {/* Price (asset) */}
            {node.typology === 'asset' && node.price != null && (
              <div>
                <p className="field-label">Price</p>
                <p className="text-text-bright text-lg font-medium mt-1">${node.price.toLocaleString()}</p>
              </div>
            )}

            {/* Society fields */}
            {node.typology === 'society' && (
              <div className="grid grid-cols-2 gap-4">
                {node.population != null && (
                  <div><p className="field-label">Population</p><p className="text-text-bright text-sm mt-1">{node.population}</p></div>
                )}
                {node.vibe && (
                  <div><p className="field-label">Vibe</p><p className="text-text-bright text-sm mt-1">{node.vibe}</p></div>
                )}
                {node.nextEventDate && (
                  <div><p className="field-label">Next Event</p><p className="text-text-bright text-sm mt-1">{node.nextEventDate}</p></div>
                )}
              </div>
            )}

            {/* Asset fields */}
            {node.typology === 'asset' && (
              <div className="grid grid-cols-2 gap-4">
                {node.acreage && (
                  <div><p className="field-label">Acreage</p><p className="text-text-bright text-sm mt-1">{node.acreage} ac</p></div>
                )}
                {node.zoning && (
                  <div><p className="field-label">Zoning</p><p className="text-text-bright text-sm mt-1">{node.zoning}</p></div>
                )}
                {node.editability != null && (
                  <div><p className="field-label">Editability</p><p className="text-text-bright text-sm mt-1">{node.editability}/10</p></div>
                )}
              </div>
            )}

            {/* Facility fields */}
            {node.typology === 'facility' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {node.capacityPax != null && (
                    <div><p className="field-label">Capacity</p><p className="text-text-bright text-sm mt-1">{node.capacityPax} pax</p></div>
                  )}
                  {node.internetSpeed && (
                    <div><p className="field-label">Internet</p><p className="text-text-bright text-sm mt-1">{node.internetSpeed}</p></div>
                  )}
                  {node.availability && (
                    <div><p className="field-label">Availability</p><p className="text-text-bright text-sm mt-1">{node.availability}</p></div>
                  )}
                </div>
                {node.isFreeOffer && (
                  <div className="glass-panel px-4 py-3">
                    <p className="text-sm text-signal-green">Available for Free for Network State Founders.</p>
                  </div>
                )}
              </>
            )}

            {/* Description */}
            {node.description && (
              <div>
                <p className="field-label">Field Notes</p>
                <p className="text-text-primary text-sm mt-1.5 leading-relaxed">{node.description}</p>
              </div>
            )}

            {/* Nearest Amenities */}
            {nearestAmenities.length > 0 && (
              <div>
                <p className="field-label">Neighborhood Context</p>
                <div className="mt-2 space-y-1.5">
                  {nearestAmenities.map((a, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-text-primary">{a.name}</span>
                      <span className="font-mono text-text-dim">{a.distance.toFixed(1)} mi</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Meta */}
            <div className="pt-3 border-t border-white/5">
              <p className="font-mono text-[10px] text-text-dim tracking-[0.15em]">LOGGED {formattedDate.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
