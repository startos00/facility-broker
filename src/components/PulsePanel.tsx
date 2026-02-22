'use client';

import Link from 'next/link';

interface NeighborhoodAnalysis {
  id: string;
  healthScore: number | null;
  diagnosisText: string | null;
  populationInCatchment: number | null;
  medianAge: string | null;
  medianIncome: number | null;
  youthPct: string | null;
  elderlyPct: string | null;
  solidVoidRatio: string | null;
  intersectionsPerSqkm: number | null;
  missingAmenities: string[] | null;
  radiusMeters: number;
}

interface Recommendation {
  id: string;
  suggestedFunction: string;
  confidenceScore: string;
  rationale: string;
  caseStudyIds: string[] | null;
  estimatedCostPerSqmLow: string | null;
  estimatedCostPerSqmHigh: string | null;
}

interface CaseStudy {
  id: string;
  name: string;
  city: string;
  country: string;
  originalFunction: string | null;
  currentFunction: string | null;
  activationScore: number | null;
}

interface PulsePanelProps {
  analysis: NeighborhoodAnalysis | null;
  recommendation: Recommendation | null;
  caseStudies: CaseStudy[];
  onClose: () => void;
  isLoading?: boolean;
}

function HealthGauge({ score }: { score: number }) {
  const color = score >= 70 ? '#2ee672' : score >= 40 ? '#ffd026' : '#f87171';
  const label = score >= 70 ? 'Healthy' : score >= 40 ? 'Moderate' : 'Social Desert';
  return (
    <div className="text-center">
      <div className="relative inline-flex items-center justify-center w-20 h-20">
        <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
          <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
          <circle
            cx="18" cy="18" r="15.5" fill="none"
            stroke={color} strokeWidth="3"
            strokeDasharray={`${(score / 100) * 97.4} 97.4`}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <span className="absolute text-lg font-bold font-mono" style={{ color }}>{score}</span>
      </div>
      <p className="font-mono text-[9px] tracking-wider uppercase mt-1" style={{ color }}>{label}</p>
    </div>
  );
}

export default function PulsePanel({ analysis, recommendation, caseStudies, onClose, isLoading }: PulsePanelProps) {
  return (
    <div className="absolute right-0 top-0 h-full w-[400px] z-30 slide-in-right">
      <div className="glass-panel-solid h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <p className="font-mono text-[10px] text-text-dim tracking-[0.2em]">NEIGHBORHOOD PULSE</p>
          <button onClick={onClose} className="text-text-dim hover:text-text-primary transition-colors text-xl cursor-pointer leading-none">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-5">

            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 border-2 border-[#22d3ee]/30 border-t-[#22d3ee] rounded-full animate-spin" />
                <span className="ml-3 font-mono text-xs text-text-dim">Analyzing neighborhood...</span>
              </div>
            )}

            {/* ── Neighborhood Analysis ── */}
            {analysis && !isLoading && (
              <>
                {/* Health score */}
                {analysis.healthScore != null && (
                  <div className="flex items-start gap-5">
                    <HealthGauge score={analysis.healthScore} />
                    <div className="flex-1">
                      <p className="field-label">Neighborhood Health</p>
                      <p className="text-text-primary text-sm mt-1 leading-relaxed">
                        {analysis.diagnosisText || 'Analysis complete.'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Demographics */}
                {analysis.populationInCatchment != null && (
                  <div>
                    <p className="field-label">
                      Catchment ({analysis.radiusMeters}m / ~{Math.round(analysis.radiusMeters / 80)} min walk)
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div className="glass-panel px-3 py-2">
                        <p className="text-lg font-bold text-text-bright font-mono">{analysis.populationInCatchment.toLocaleString()}</p>
                        <p className="text-[9px] font-mono text-text-dim tracking-wider uppercase">Population</p>
                      </div>
                      {analysis.medianAge && (
                        <div className="glass-panel px-3 py-2">
                          <p className="text-lg font-bold text-text-bright font-mono">{parseFloat(analysis.medianAge).toFixed(0)}</p>
                          <p className="text-[9px] font-mono text-text-dim tracking-wider uppercase">Median Age</p>
                        </div>
                      )}
                      {analysis.youthPct && (
                        <div className="glass-panel px-3 py-2">
                          <p className="text-lg font-bold text-[#22d3ee] font-mono">{parseFloat(analysis.youthPct).toFixed(0)}%</p>
                          <p className="text-[9px] font-mono text-text-dim tracking-wider uppercase">Youth (&lt;25)</p>
                        </div>
                      )}
                      {analysis.elderlyPct && (
                        <div className="glass-panel px-3 py-2">
                          <p className="text-lg font-bold text-[#b07aff] font-mono">{parseFloat(analysis.elderlyPct).toFixed(0)}%</p>
                          <p className="text-[9px] font-mono text-text-dim tracking-wider uppercase">Elderly (65+)</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Urban grain */}
                {(analysis.solidVoidRatio || analysis.intersectionsPerSqkm) && (
                  <div>
                    <p className="field-label">Urban Grain</p>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {analysis.solidVoidRatio && (
                        <div>
                          <p className="text-sm text-text-bright font-mono">{parseFloat(analysis.solidVoidRatio).toFixed(0)}%</p>
                          <p className="text-[9px] font-mono text-text-dim tracking-wider">SOLID-VOID RATIO</p>
                        </div>
                      )}
                      {analysis.intersectionsPerSqkm && (
                        <div>
                          <p className="text-sm text-text-bright font-mono">{analysis.intersectionsPerSqkm}</p>
                          <p className="text-[9px] font-mono text-text-dim tracking-wider">INTERSECTIONS/KM²</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Missing amenities */}
                {analysis.missingAmenities && analysis.missingAmenities.length > 0 && (
                  <div>
                    <p className="field-label">Missing Amenities</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {analysis.missingAmenities.map((amenity) => (
                        <span key={amenity} className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-red-500/10 text-red-400 border border-red-500/20">
                          {amenity.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ── Recommendation ── */}
            {recommendation && !isLoading && (
              <div className="border-t border-white/5 pt-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2ee672]" />
                  <p className="font-mono text-[10px] text-[#2ee672] tracking-[0.2em] uppercase">AI Recommendation</p>
                </div>

                <div className="glass-panel px-4 py-4 space-y-3">
                  <div>
                    <p className="text-base font-medium text-text-bright">{recommendation.suggestedFunction}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="font-mono text-xs text-text-dim">Confidence</span>
                      <div className="flex-1 h-1.5 rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-[#2ee672] transition-all duration-500"
                          style={{ width: `${parseFloat(recommendation.confidenceScore) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs text-[#2ee672]">
                        {Math.round(parseFloat(recommendation.confidenceScore) * 100)}%
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-text-primary leading-relaxed">{recommendation.rationale}</p>

                  {/* Cost estimate */}
                  {recommendation.estimatedCostPerSqmLow && recommendation.estimatedCostPerSqmHigh && (
                    <div className="pt-2 border-t border-white/5">
                      <p className="field-label">Estimated Conversion Cost</p>
                      <p className="text-sm text-text-bright font-mono mt-1">
                        ${parseFloat(recommendation.estimatedCostPerSqmLow).toFixed(0)}–${parseFloat(recommendation.estimatedCostPerSqmHigh).toFixed(0)}/sqm
                      </p>
                    </div>
                  )}
                </div>

                {/* Case studies */}
                {caseStudies.length > 0 && (
                  <div className="mt-4">
                    <p className="field-label">Matched Precedents</p>
                    <div className="mt-2 space-y-2">
                      {caseStudies.map((cs) => (
                        <div key={cs.id} className="glass-panel px-3 py-2.5 flex items-center justify-between">
                          <div>
                            <p className="text-sm text-text-bright">{cs.name}</p>
                            <p className="text-[10px] text-text-dim font-mono mt-0.5">
                              {cs.city}, {cs.country}
                              {cs.originalFunction && cs.currentFunction && ` · ${cs.originalFunction} → ${cs.currentFunction}`}
                            </p>
                          </div>
                          {cs.activationScore != null && (
                            <span className="font-mono text-xs text-[#2ee672]">{cs.activationScore}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <Link
                    href="/map"
                    className="flex-1 px-4 py-2.5 rounded-lg font-mono text-[10px] tracking-[0.12em] uppercase text-center text-[#04060b] bg-[#22d3ee] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all cursor-pointer"
                  >
                    Save to Project
                  </Link>
                  <button className="px-4 py-2.5 rounded-lg font-mono text-[10px] tracking-[0.12em] uppercase text-text-dim border border-white/10 hover:border-white/20 transition-colors cursor-pointer">
                    Share
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
