'use client';

import Link from 'next/link';
import { useEffect, useState, useRef, useCallback } from 'react';
import {
  GRAPH_NODES,
  GRAPH_EDGES,
  PHASE_LABELS,
  type GraphNode,
} from '@/lib/network-graph-data';

/* ─── useScrollPhase ─── */
function useScrollPhase(containerRef: React.RefObject<HTMLElement | null>) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const sectionHeight = el.offsetHeight;
        const viewportH = window.innerHeight;
        // progress: 0 when top of section hits bottom of viewport → 1 when bottom of section leaves top
        const scrolled = viewportH - rect.top;
        const total = sectionHeight + viewportH;
        const raw = Math.max(0, Math.min(1, scrolled / total));
        const newPhase = Math.min(4, Math.floor(raw * 5));
        setPhase((prev) => Math.max(prev, newPhase));
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [containerRef]);

  return phase;
}

/* ─── SVG Shape Renderers ─── */
function Circle({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={`${color}18`}
      stroke={color}
      strokeWidth="2"
    />
  );
}

function Diamond({ cx, cy, size, color }: { cx: number; cy: number; size: number; color: string }) {
  const s = size;
  return (
    <polygon
      points={`${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`}
      fill={`${color}18`}
      stroke={color}
      strokeWidth="2"
    />
  );
}

function Triangle({ cx, cy, size, color }: { cx: number; cy: number; size: number; color: string }) {
  const s = size;
  return (
    <polygon
      points={`${cx},${cy - s} ${cx + s * 0.87},${cy + s * 0.5} ${cx - s * 0.87},${cy + s * 0.5}`}
      fill={`${color}18`}
      stroke={color}
      strokeWidth="2"
    />
  );
}

function Hexagon({ cx, cy, size, color }: { cx: number; cy: number; size: number; color: string }) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return `${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`;
  }).join(' ');
  return (
    <polygon
      points={pts}
      fill={`${color}18`}
      stroke={color}
      strokeWidth="2"
    />
  );
}

function NodeShape({ node, size }: { node: GraphNode; size: number }) {
  switch (node.shape) {
    case 'circle':
      return <Circle cx={node.x} cy={node.y} r={size} color={node.color} />;
    case 'diamond':
      return <Diamond cx={node.x} cy={node.y} size={size} color={node.color} />;
    case 'triangle':
      return <Triangle cx={node.x} cy={node.y} size={size} color={node.color} />;
    case 'hexagon':
      return <Hexagon cx={node.x} cy={node.y} size={size} color={node.color} />;
  }
}

/* ─── Info Panel ─── */
function InfoPanel({
  node,
  onClose,
}: {
  node: GraphNode;
  onClose: () => void;
}) {
  return (
    <div
      className="absolute right-4 top-4 bottom-4 w-72 sm:w-80 z-20 rounded-xl overflow-hidden"
      style={{
        background: 'rgba(8, 12, 20, 0.92)',
        border: `1px solid ${node.color}30`,
        backdropFilter: 'blur(16px)',
        animation: 'slide-in-right 0.3s ease-out both',
      }}
    >
      <div className="p-6 h-full flex flex-col">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-[#5a6a80] hover:text-[#d4dce8] hover:bg-white/5 transition-colors"
          aria-label="Close panel"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: node.color, boxShadow: `0 0 10px ${node.color}80` }}
            />
            {node.subtitle && (
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: node.color }}>
                {node.subtitle}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-[#f0f4f8] tracking-wide">{node.label}</h3>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-5" style={{ background: `${node.color}20` }} />

        {/* Description */}
        <p className="text-sm text-[#8c95a4] leading-relaxed flex-1">{node.description}</p>

        {/* Stat */}
        {node.stat && (
          <div className="mt-5 pt-4 border-t" style={{ borderColor: `${node.color}15` }}>
            <span className="font-mono text-2xl font-bold" style={{ color: node.color }}>
              {node.stat}
            </span>
            {node.statLabel && (
              <span className="font-mono text-[10px] tracking-[0.15em] text-[#5a6a80] uppercase ml-2">
                {node.statLabel}
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        {node.cta && (
          <div className="mt-5">
            <Link
              href={node.cta.href}
              className="group flex items-center justify-center gap-3 w-full px-6 py-3 bg-[#22d3ee] rounded-full font-mono text-sm tracking-[0.12em] text-[#04060b] font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] hover:-translate-y-0.5"
            >
              <span>{node.cta.label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Legend ─── */
function Legend() {
  const items = [
    { shape: 'circle', color: '#22d3ee', label: 'Society' },
    { shape: 'diamond', color: '#ff8033', label: 'Asset' },
    { shape: 'triangle', color: '#b07aff', label: 'Facility' },
    { shape: 'hexagon', color: '#2ee672', label: 'Hub / Protocol' },
  ] as const;

  return (
    <div
      className="absolute left-4 bottom-4 z-20 px-4 py-3 rounded-lg"
      style={{
        background: 'rgba(8, 12, 20, 0.8)',
        border: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <p className="font-mono text-[9px] tracking-[0.2em] text-[#5a6a80] uppercase mb-2">Legend</p>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14">
              {item.shape === 'circle' && <circle cx="7" cy="7" r="5" fill={`${item.color}30`} stroke={item.color} strokeWidth="1.5" />}
              {item.shape === 'diamond' && <polygon points="7,1 13,7 7,13 1,7" fill={`${item.color}30`} stroke={item.color} strokeWidth="1.5" />}
              {item.shape === 'triangle' && <polygon points="7,1 13,12 1,12" fill={`${item.color}30`} stroke={item.color} strokeWidth="1.5" />}
              {item.shape === 'hexagon' && <polygon points="7,1 12.2,4 12.2,10 7,13 1.8,10 1.8,4" fill={`${item.color}30`} stroke={item.color} strokeWidth="1.5" />}
            </svg>
            <span className="font-mono text-[10px] text-[#8c95a4]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Phase Dots ─── */
function PhaseDots({ phase }: { phase: number }) {
  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
      {PHASE_LABELS.map((label, i) => (
        <button
          key={label}
          className="group relative flex items-center"
          aria-label={`Phase ${i}: ${label}`}
          tabIndex={-1}
        >
          <span
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: i <= phase ? '#22d3ee' : 'rgba(90,106,128,0.3)',
              boxShadow: i <= phase ? '0 0 8px rgba(34,211,238,0.5)' : 'none',
            }}
          />
          <span className="absolute right-5 font-mono text-[9px] tracking-wider text-[#5a6a80] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ─── Mobile Flowchart ─── */
function MobileFlowchart({ phase }: { phase: number }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const phaseGroups = [0, 1, 2, 3, 4].map((p) =>
    GRAPH_NODES.filter((n) => n.phase === p)
  );

  return (
    <div className="md:hidden px-4 py-8 space-y-2">
      {phaseGroups.map((group, phaseIdx) => (
        <div
          key={phaseIdx}
          className="transition-all duration-500"
          style={{
            opacity: phaseIdx <= phase ? 1 : 0.15,
            transform: phaseIdx <= phase ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          {/* Phase label */}
          <p className="font-mono text-[9px] tracking-[0.25em] text-[#5a6a80] uppercase mb-2 ml-1">
            {PHASE_LABELS[phaseIdx]}
          </p>

          {/* Nodes */}
          <div className="space-y-2">
            {group.map((node) => {
              const isExpanded = expanded === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setExpanded(isExpanded ? null : node.id)}
                  className="w-full text-left rounded-lg p-4 transition-all duration-200"
                  style={{
                    background: isExpanded ? `rgba(8,12,20,0.9)` : 'rgba(12,16,24,0.5)',
                    border: `1px solid ${isExpanded ? `${node.color}30` : 'rgba(255,255,255,0.04)'}`,
                  }}
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3">
                    {/* Mini shape */}
                    <svg width="20" height="20" viewBox="0 0 20 20" className="flex-shrink-0">
                      {node.shape === 'circle' && <circle cx="10" cy="10" r="7" fill={`${node.color}30`} stroke={node.color} strokeWidth="1.5" />}
                      {node.shape === 'diamond' && <polygon points="10,2 18,10 10,18 2,10" fill={`${node.color}30`} stroke={node.color} strokeWidth="1.5" />}
                      {node.shape === 'triangle' && <polygon points="10,2 18,16 2,16" fill={`${node.color}30`} stroke={node.color} strokeWidth="1.5" />}
                      {node.shape === 'hexagon' && <polygon points="10,2 17,6 17,14 10,18 3,14 3,6" fill={`${node.color}30`} stroke={node.color} strokeWidth="1.5" />}
                    </svg>

                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-sm font-semibold text-[#f0f4f8] tracking-wide">
                        {node.label}
                      </span>
                      {node.subtitle && (
                        <span className="font-mono text-[9px] tracking-wider text-[#5a6a80] ml-2">
                          {node.subtitle}
                        </span>
                      )}
                    </div>

                    {/* Expand indicator */}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#5a6a80"
                      strokeWidth="2"
                      className="flex-shrink-0 transition-transform duration-200"
                      style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>

                  {/* Expanded content */}
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isExpanded ? '200px' : '0',
                      opacity: isExpanded ? 1 : 0,
                      marginTop: isExpanded ? '12px' : '0',
                    }}
                  >
                    <p className="text-sm text-[#8c95a4] leading-relaxed">{node.description}</p>
                    {node.stat && (
                      <div className="mt-3 pt-3 border-t" style={{ borderColor: `${node.color}15` }}>
                        <span className="font-mono text-lg font-bold" style={{ color: node.color }}>
                          {node.stat}
                        </span>
                        {node.statLabel && (
                          <span className="font-mono text-[9px] tracking-wider text-[#5a6a80] uppercase ml-2">
                            {node.statLabel}
                          </span>
                        )}
                      </div>
                    )}
                    {node.cta && (
                      <Link
                        href={node.cta.href}
                        className="group mt-3 inline-flex items-center gap-2 px-5 py-2 bg-[#22d3ee] rounded-full font-mono text-xs tracking-[0.12em] text-[#04060b] font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>{node.cta.label}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Connector line between phase groups */}
          {phaseIdx < 4 && (
            <div className="flex justify-center py-1">
              <div
                className="w-px h-6 transition-all duration-500"
                style={{
                  background: phaseIdx < phase
                    ? 'linear-gradient(to bottom, rgba(34,211,238,0.3), rgba(34,211,238,0.1))'
                    : 'rgba(90,106,128,0.15)',
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Main Component ─── */
export default function NetworkGraph() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const phase = useScrollPhase(sectionRef);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodeMap = useCallback(() => {
    const map = new Map<string, GraphNode>();
    GRAPH_NODES.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  const nodesById = nodeMap();

  const handleNodeClick = useCallback((node: GraphNode) => {
    setSelectedNode((prev) => (prev?.id === node.id ? null : node));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, node: GraphNode) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleNodeClick(node);
      }
    },
    [handleNodeClick]
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-10"
      style={{ minHeight: '250vh' }}
    >
      {/* Keyframes for this component */}
      <style>{`
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes node-appear {
          from { opacity: 0; transform: scale(0.6); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes edge-draw {
          from { stroke-dashoffset: var(--edge-length); }
          to { stroke-dashoffset: 0; }
        }
        .node-enter {
          animation: node-appear 0.5s ease-out both;
        }
        .edge-enter {
          animation: edge-draw 0.6s ease-out both;
        }
      `}</style>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Section header */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-20">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#5a6a80] uppercase">
            Network Discovery
          </p>
        </div>

        {/* ── Desktop Graph ── */}
        <div className="hidden md:block relative w-full max-w-5xl mx-auto px-8">
          <div className="relative">
            <svg
              viewBox="0 0 1000 600"
              className="w-full h-auto"
              role="img"
              aria-label="Interactive network graph showing CloudToTerra platform structure"
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Edges */}
              {GRAPH_EDGES.map((edge) => {
                const fromNode = nodesById.get(edge.from);
                const toNode = nodesById.get(edge.to);
                if (!fromNode || !toNode) return null;

                const visible = edge.phase <= phase;
                const highlighted =
                  hoveredNode === edge.from || hoveredNode === edge.to;
                const dx = toNode.x - fromNode.x;
                const dy = toNode.y - fromNode.y;
                const length = Math.sqrt(dx * dx + dy * dy);

                return (
                  <line
                    key={`${edge.from}-${edge.to}`}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={highlighted ? '#22d3ee' : 'rgba(90,106,128,0.25)'}
                    strokeWidth={highlighted ? 2 : 1}
                    strokeDasharray={length}
                    className={visible ? 'edge-enter' : ''}
                    style={{
                      ['--edge-length' as string]: length,
                      opacity: visible ? 1 : 0,
                      transition: 'stroke 0.2s, stroke-width 0.2s, opacity 0.3s',
                    }}
                  />
                );
              })}

              {/* Nodes */}
              {GRAPH_NODES.map((node, i) => {
                const visible = node.phase <= phase;
                const isSelected = selectedNode?.id === node.id;
                const isHovered = hoveredNode === node.id;
                const isHub = node.id === 'hub';
                const size = isHub ? 32 : node.shape === 'hexagon' ? 28 : 22;

                return (
                  <g
                    key={node.id}
                    className={`cursor-pointer ${visible ? 'node-enter' : ''}`}
                    style={{
                      opacity: visible ? 1 : 0,
                      animationDelay: `${(i % 4) * 100}ms`,
                      transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                      transformOrigin: `${node.x}px ${node.y}px`,
                      transition: 'transform 0.2s ease-out',
                    }}
                    onClick={() => visible && handleNodeClick(node)}
                    onKeyDown={(e) => visible && handleKeyDown(e, node)}
                    onMouseEnter={() => visible && setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    tabIndex={visible ? 0 : -1}
                    role="button"
                    aria-label={`${node.label}: ${node.subtitle || ''}`}
                    aria-pressed={isSelected}
                  >
                    {/* Hover glow ring */}
                    {(isHovered || isSelected) && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={size + 8}
                        fill="none"
                        stroke={node.color}
                        strokeWidth="1"
                        opacity="0.3"
                        filter="url(#glow)"
                      />
                    )}

                    {/* Hub float animation */}
                    {isHub && (
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 0,-4; 0,0"
                        dur="5s"
                        repeatCount="indefinite"
                      />
                    )}

                    <NodeShape node={node} size={size} />

                    {/* Label */}
                    <text
                      x={node.x}
                      y={node.y + size + 16}
                      textAnchor="middle"
                      className="font-mono"
                      style={{
                        fontSize: isHub ? '12px' : '10px',
                        fill: '#f0f4f8',
                        letterSpacing: '0.08em',
                        fontWeight: isHub ? 700 : 600,
                      }}
                    >
                      {node.label}
                    </text>

                    {/* Subtitle */}
                    {node.subtitle && (
                      <text
                        x={node.x}
                        y={node.y + size + 28}
                        textAnchor="middle"
                        style={{
                          fontSize: '8px',
                          fill: '#5a6a80',
                          letterSpacing: '0.15em',
                        }}
                      >
                        {node.subtitle}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Info panel overlay */}
            {selectedNode && (
              <InfoPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
            )}

            {/* Legend */}
            <Legend />
          </div>
        </div>

        {/* ── Mobile Flowchart ── */}
        <div className="md:hidden w-full h-full overflow-y-auto">
          <MobileFlowchart phase={phase} />
        </div>

        {/* Phase dots */}
        <PhaseDots phase={phase} />
      </div>
    </section>
  );
}
