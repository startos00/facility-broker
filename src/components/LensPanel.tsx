'use client';

interface ArchiveEntry {
  id: string;
  name: string;
  city: string;
  country: string;
  typologyTags: string[];
  originalFunction: string | null;
  currentFunction: string | null;
  isConversion: boolean;
  floorAreaSqm: string | null;
  publicPrivateRatio: string | null;
  floorCount: number | null;
  yearBuilt: number | null;
  yearConverted: number | null;
  digitalFootprintScore: number | null;
  activationScore: number | null;
  photoUrls: string[] | null;
}

interface GhostSite {
  id: string;
  address: string | null;
  city: string;
  abandonmentProbability: string;
  vacancySince: string | null;
  lastKnownFunction: string | null;
  lotSizeSqm: string | null;
  ownershipType: string | null;
  ndviScore: string | null;
  nightLightScore: string | null;
  hasBoardedWindows: boolean | null;
  osmStatus: string | null;
}

interface LensPanelProps {
  ghostSite?: GhostSite | null;
  archiveEntry?: ArchiveEntry | null;
  onClose: () => void;
  onAnalyzeNeighborhood?: () => void;
}

function ScoreBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="w-full h-1.5 rounded-full bg-white/5">
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export default function LensPanel({ ghostSite, archiveEntry, onClose, onAnalyzeNeighborhood }: LensPanelProps) {
  return (
    <div className="absolute left-0 top-0 h-full w-[380px] z-30 slide-in-left">
      <style>{`
        @keyframes slide-in-left-kf {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .slide-in-left { animation: slide-in-left-kf 0.3s ease-out both; }
      `}</style>

      <div className="glass-panel-solid h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <p className="font-mono text-[10px] text-text-dim tracking-[0.2em]">
            {ghostSite ? 'SITE ASSESSMENT' : 'TYPOLOGY LENS'}
          </p>
          <button onClick={onClose} className="text-text-dim hover:text-text-primary transition-colors text-xl cursor-pointer leading-none">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-4">

            {/* ── Ghost Site View ── */}
            {ghostSite && (
              <>
                {/* Abandonment probability */}
                <div>
                  <p className="field-label">Abandonment Probability</p>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-2xl font-bold text-red-400 font-mono">
                      {Math.round(parseFloat(ghostSite.abandonmentProbability) * 100)}%
                    </span>
                  </div>
                  <ScoreBar value={parseFloat(ghostSite.abandonmentProbability) * 100} color="#f87171" />
                </div>

                {/* Address */}
                {ghostSite.address && (
                  <div>
                    <p className="field-label">Address</p>
                    <p className="text-text-bright text-sm mt-1">{ghostSite.address}</p>
                  </div>
                )}

                {/* Key metrics grid */}
                <div className="grid grid-cols-2 gap-4">
                  {ghostSite.lastKnownFunction && (
                    <div>
                      <p className="field-label">Last Function</p>
                      <p className="text-text-bright text-sm mt-1">{ghostSite.lastKnownFunction}</p>
                    </div>
                  )}
                  {ghostSite.vacancySince && (
                    <div>
                      <p className="field-label">Vacant Since</p>
                      <p className="text-text-bright text-sm mt-1">~{ghostSite.vacancySince}</p>
                    </div>
                  )}
                  {ghostSite.lotSizeSqm && (
                    <div>
                      <p className="field-label">Lot Size</p>
                      <p className="text-text-bright text-sm mt-1">{parseFloat(ghostSite.lotSizeSqm).toLocaleString()} sqm</p>
                    </div>
                  )}
                  {ghostSite.ownershipType && (
                    <div>
                      <p className="field-label">Ownership</p>
                      <p className="text-text-bright text-sm mt-1">{ghostSite.ownershipType}</p>
                    </div>
                  )}
                </div>

                {/* Condition signals */}
                <div>
                  <p className="field-label">Entropy Signals</p>
                  <div className="mt-2 space-y-2">
                    {ghostSite.ndviScore && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-primary">Vegetation Overgrowth (NDVI)</span>
                        <span className="font-mono" style={{ color: parseFloat(ghostSite.ndviScore) > 0.5 ? '#f87171' : '#2ee672' }}>
                          {parseFloat(ghostSite.ndviScore).toFixed(2)}
                        </span>
                      </div>
                    )}
                    {ghostSite.nightLightScore && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-primary">Night Light Deficit</span>
                        <span className="font-mono" style={{ color: parseFloat(ghostSite.nightLightScore) < 0.3 ? '#f87171' : '#2ee672' }}>
                          {parseFloat(ghostSite.nightLightScore).toFixed(2)}
                        </span>
                      </div>
                    )}
                    {ghostSite.hasBoardedWindows != null && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-primary">Boarded Windows</span>
                        <span className="font-mono" style={{ color: ghostSite.hasBoardedWindows ? '#f87171' : '#2ee672' }}>
                          {ghostSite.hasBoardedWindows ? 'DETECTED' : 'CLEAR'}
                        </span>
                      </div>
                    )}
                    {ghostSite.osmStatus && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-primary">OSM Status</span>
                        <span className="font-mono text-text-dim">{ghostSite.osmStatus}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Analyze neighborhood CTA */}
                {onAnalyzeNeighborhood && (
                  <button
                    onClick={onAnalyzeNeighborhood}
                    className="w-full px-4 py-3 rounded-lg font-mono text-xs tracking-[0.12em] uppercase text-[#22d3ee] border border-[#22d3ee]/30 bg-[#22d3ee]/5 hover:bg-[#22d3ee]/10 transition-colors cursor-pointer"
                  >
                    Analyze Neighborhood
                  </button>
                )}
              </>
            )}

            {/* ── Archive Entry View ── */}
            {archiveEntry && (
              <>
                <div>
                  <h2 className="text-lg font-medium text-text-bright">{archiveEntry.name}</h2>
                  <p className="text-xs text-text-dim mt-1">{archiveEntry.city}, {archiveEntry.country}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {archiveEntry.typologyTags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-[#ffd026]/10 text-[#ffd026] border border-[#ffd026]/20">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Conversion info */}
                {archiveEntry.isConversion && (
                  <div className="glass-panel px-4 py-3">
                    <p className="font-mono text-[10px] text-[#b07aff] tracking-wider uppercase mb-1">Adaptive Reuse</p>
                    <p className="text-sm text-text-bright">
                      {archiveEntry.originalFunction} → {archiveEntry.currentFunction}
                    </p>
                    {archiveEntry.yearConverted && (
                      <p className="text-xs text-text-dim mt-1">Converted {archiveEntry.yearConverted}</p>
                    )}
                  </div>
                )}

                {/* Metrics grid */}
                <div className="grid grid-cols-2 gap-4">
                  {archiveEntry.floorAreaSqm && (
                    <div>
                      <p className="field-label">Floor Area</p>
                      <p className="text-text-bright text-sm mt-1">{parseFloat(archiveEntry.floorAreaSqm).toLocaleString()} sqm</p>
                    </div>
                  )}
                  {archiveEntry.publicPrivateRatio && (
                    <div>
                      <p className="field-label">Public/Private Ratio</p>
                      <p className="text-text-bright text-sm mt-1">{Math.round(parseFloat(archiveEntry.publicPrivateRatio) * 100)}% public</p>
                    </div>
                  )}
                  {archiveEntry.floorCount && (
                    <div>
                      <p className="field-label">Floors</p>
                      <p className="text-text-bright text-sm mt-1">{archiveEntry.floorCount}</p>
                    </div>
                  )}
                  {archiveEntry.yearBuilt && (
                    <div>
                      <p className="field-label">Year Built</p>
                      <p className="text-text-bright text-sm mt-1">{archiveEntry.yearBuilt}</p>
                    </div>
                  )}
                </div>

                {/* Success metrics */}
                {(archiveEntry.digitalFootprintScore != null || archiveEntry.activationScore != null) && (
                  <div>
                    <p className="field-label">Success Metrics</p>
                    <div className="mt-2 space-y-3">
                      {archiveEntry.digitalFootprintScore != null && (
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-text-primary">Digital Footprint</span>
                            <span className="font-mono text-[#22d3ee]">{archiveEntry.digitalFootprintScore}/100</span>
                          </div>
                          <ScoreBar value={archiveEntry.digitalFootprintScore} color="#22d3ee" />
                        </div>
                      )}
                      {archiveEntry.activationScore != null && (
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-text-primary">Activation</span>
                            <span className="font-mono text-[#2ee672]">{archiveEntry.activationScore}/100</span>
                          </div>
                          <ScoreBar value={archiveEntry.activationScore} color="#2ee672" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
