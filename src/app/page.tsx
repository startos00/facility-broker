'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const TYPOLOGIES = [
  {
    name: 'Society',
    color: '#22d3ee',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    label: 'NETWORK NODES',
    desc: 'Active communities, pop-up cities, and builder bases. Track where the tribes are gathering.',
    stat: '42 avg',
    statLabel: 'population',
  },
  {
    name: 'Asset',
    color: '#ff8033',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    label: 'PHYSICAL ASSETS',
    desc: 'Land, buildings, and distressed properties for acquisition. From $30k shells to industrial compounds.',
    stat: '$35k',
    statLabel: 'median price',
  },
  {
    name: 'Facility',
    color: '#b07aff',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
    label: 'SHARED SPACES',
    desc: 'Coworking halls, makerspaces, and garages. Some listed free for Network State builders.',
    stat: 'FREE',
    statLabel: 'offers available',
  },
];

const STEPS = [
  { num: '01', label: 'SIGNAL', desc: 'Select your node type — Society, Asset, or Facility.' },
  { num: '02', label: 'LOCATE', desc: 'Drop a pin or draw a boundary polygon on the map.' },
  { num: '03', label: 'TRANSMIT', desc: 'Add intel — photos, price, capacity. No account needed.' },
  { num: '04', label: 'CONNECT', desc: 'Flag for investors. The network sees your signal.' },
];

const BUFFALO_STATS = [
  { value: '$30k', label: 'Distressed assets from' },
  { value: '15,000+', label: 'Medical campus jobs' },
  { value: '7', label: 'Metro Rail stations' },
  { value: '3', label: 'Olmsted parks' },
];

export default function LandingPage() {
  const [bootLine, setBootLine] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const lines = 4;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setBootLine(i);
      if (i >= lines) {
        clearInterval(interval);
        setTimeout(() => setShowContent(true), 300);
      }
    }, 180);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#04060b] text-[#d4dce8] overflow-x-hidden">
      {/* ═══ TOPOGRAPHIC GRID BACKGROUND ═══ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#04060b_80%)]" />
        {/* Top gradient fade */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#04060b] to-transparent" />
      </div>

      {/* ═══ NOISE TEXTURE OVERLAY ═══ */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.015] mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      }} />

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Boot sequence */}
        <div className="absolute top-8 left-8 font-mono text-[10px] tracking-[0.2em] text-[#5a6a80] space-y-1.5">
          <p className={`transition-opacity duration-200 ${bootLine >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-[#2ee672]">[OK]</span> CLOUDTOTERRA v2.0 INIT
          </p>
          <p className={`transition-opacity duration-200 ${bootLine >= 2 ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-[#2ee672]">[OK]</span> GEOSPATIAL ENGINE LOADED
          </p>
          <p className={`transition-opacity duration-200 ${bootLine >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-[#2ee672]">[OK]</span> PILOT ZONE: BUFFALO, NY
          </p>
          <p className={`transition-opacity duration-200 ${bootLine >= 4 ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-[#22d3ee]">[>>]</span> AWAITING OPERATOR INPUT...
          </p>
        </div>

        {/* Status indicator — top right */}
        <div className="absolute top-8 right-8 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em]">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2ee672] animate-pulse" />
          <span className="text-[#2ee672]">LIVE</span>
        </div>

        {/* Main hero content */}
        <div className={`text-center transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Crosshair */}
          <div className="relative inline-block mb-8">
            <div className="w-16 h-16 border border-[#22d3ee]/20 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border border-[#22d3ee]/40 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-[#22d3ee] rounded-full shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
              </div>
            </div>
            {/* Crosshair lines */}
            <div className="absolute top-1/2 -left-4 w-3 h-px bg-[#22d3ee]/30" />
            <div className="absolute top-1/2 -right-4 w-3 h-px bg-[#22d3ee]/30" />
            <div className="absolute -top-4 left-1/2 w-px h-3 bg-[#22d3ee]/30" />
            <div className="absolute -bottom-4 left-1/2 w-px h-3 bg-[#22d3ee]/30" />
          </div>

          {/* Wordmark */}
          <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.08em] text-[#f0f4f8] mb-4">
            CLOUD<span className="text-[#ff8033]">TO</span>TERRA
          </h1>

          <p className="font-mono text-xs tracking-[0.3em] text-[#5a6a80] uppercase mb-2">
            Territorial Intelligence Platform
          </p>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#ff8033]/40 to-transparent mx-auto my-6" />

          <p className="max-w-lg mx-auto text-base sm:text-lg text-[#8c95a4] leading-relaxed mb-10">
            The geospatial marketplace where Network Societies find physical territory.
            Scout assets. Signal communities. Broker space.
          </p>

          {/* CTA */}
          <Link
            href="/map"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-[#ff8033]/30 bg-[#ff8033]/8 rounded-full font-mono text-sm tracking-[0.15em] text-[#ff8033] transition-all duration-300 hover:bg-[#ff8033]/15 hover:border-[#ff8033]/50 hover:shadow-[0_0_40px_rgba(255,128,51,0.12)] hover:-translate-y-0.5"
          >
            <span>ENTER COMMAND CENTER</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Scroll hint */}
          <div className="mt-16 flex flex-col items-center gap-2 text-[#5a6a80]">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase">Scroll for briefing</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-bounce">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ═══ THREE TYPOLOGIES ═══ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#5a6a80] uppercase mb-3">INTELLIGENCE CLASSIFICATION</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f4f8] tracking-wide">Three Signal Types</h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#22d3ee]/40 to-transparent mx-auto mt-4" />
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-5">
            {TYPOLOGIES.map((t) => (
              <div
                key={t.name}
                className="relative group p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'rgba(12, 16, 24, 0.6)',
                  borderColor: `${t.color}15`,
                  backdropFilter: 'blur(8px)',
                }}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 30px ${t.color}08, 0 0 20px ${t.color}05` }}
                />

                {/* Icon + dot */}
                <div className="flex items-start justify-between mb-5">
                  <div style={{ color: t.color }}>{t.icon}</div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: t.color, boxShadow: `0 0 8px ${t.color}80` }}
                    />
                    <span className="font-mono text-[9px] tracking-[0.2em]" style={{ color: t.color }}>
                      {t.label}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-xl font-semibold text-[#f0f4f8] mb-2">{t.name}</h3>
                <p className="text-sm text-[#8c95a4] leading-relaxed mb-5">{t.desc}</p>

                {/* Stat */}
                <div className="pt-4 border-t" style={{ borderColor: `${t.color}15` }}>
                  <span className="font-mono text-lg font-bold" style={{ color: t.color }}>{t.stat}</span>
                  <span className="font-mono text-[10px] tracking-[0.15em] text-[#5a6a80] uppercase ml-2">{t.statLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PILOT ZONE: BUFFALO ═══ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(12, 16, 24, 0.5)', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
            <div className="p-8 sm:p-12">
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] text-[#ff8033] uppercase mb-2">PILOT ZONE ALPHA</p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f4f8]">Buffalo, NY</h2>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-[#5a6a80]">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2ee672]" />
                  <span>42.8864&deg;N 78.8784&deg;W</span>
                </div>
              </div>

              <p className="text-[#8c95a4] leading-relaxed max-w-2xl mb-10">
                America&apos;s most affordable Rust Belt city meets its greatest opportunity. Frank Lloyd Wright architecture,
                Olmsted parks, a medical campus with 15,000 jobs, and distressed Victorian shells starting at $30k.
                The first city scanned by CloudtoTerra operators.
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {BUFFALO_STATS.map((s) => (
                  <div
                    key={s.label}
                    className="p-4 rounded-lg"
                    style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.04)' }}
                  >
                    <p className="font-mono text-xl sm:text-2xl font-bold text-[#ff8033] mb-1">{s.value}</p>
                    <p className="font-mono text-[9px] tracking-[0.15em] text-[#5a6a80] uppercase">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Zone callouts */}
              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                {[
                  { zone: 'A', name: 'Fruit Belt', thesis: 'Adjacent to Medical Campus. Gentrifying. Distressed shells.', price: '$50k–$120k' },
                  { zone: 'B', name: 'Black Rock', thesis: 'Walkable, historic storefronts. The punk/immigrant hub.', price: '$80k–$150k' },
                  { zone: 'C', name: 'Broadway-Fillmore', thesis: 'Near Central Terminal. Deep value play. High vacancy.', price: '$30k–$70k' },
                ].map((z) => (
                  <div
                    key={z.zone}
                    className="p-4 rounded-lg"
                    style={{ background: 'rgba(255, 128, 51, 0.04)', border: '1px solid rgba(255, 128, 51, 0.1)' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs font-bold text-[#ff8033]">ZONE {z.zone}</span>
                      <span className="text-sm font-medium text-[#f0f4f8]">{z.name}</span>
                    </div>
                    <p className="text-xs text-[#8c95a4] leading-relaxed mb-2">{z.thesis}</p>
                    <p className="font-mono text-[10px] text-[#ff8033] tracking-wider">{z.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#5a6a80] uppercase mb-3">OPERATIONS MANUAL</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f4f8] tracking-wide">Four Steps. No Login.</h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#b07aff]/40 to-transparent mx-auto mt-4" />
          </div>

          <div className="space-y-0">
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative flex gap-6 items-start">
                {/* Vertical line connector */}
                {i < STEPS.length - 1 && (
                  <div className="absolute left-[23px] top-12 bottom-0 w-px bg-gradient-to-b from-[#5a6a80]/30 to-transparent" />
                )}

                {/* Number circle */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full border flex items-center justify-center font-mono text-sm font-bold"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    color: i === 0 ? '#22d3ee' : i === 1 ? '#ff8033' : i === 2 ? '#b07aff' : '#2ee672',
                  }}
                >
                  {step.num}
                </div>

                {/* Content */}
                <div className="pb-10">
                  <h3 className="font-mono text-sm tracking-[0.15em] text-[#f0f4f8] font-semibold mb-1">{step.label}</h3>
                  <p className="text-sm text-[#8c95a4] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OPEN PROTOCOL ═══ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2ee672]/20 bg-[#2ee672]/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2ee672]" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#2ee672] uppercase">Open Protocol</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f4f8] mb-4">No Gatekeepers</h2>
          <p className="text-[#8c95a4] leading-relaxed max-w-xl mx-auto mb-10">
            CloudtoTerra is an open intelligence layer. No account needed to read or write.
            Anyone can signal a node, draw a boundary, or flag an asset for investors.
            The network is the authentication.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/map"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#ff8033] rounded-full font-mono text-sm tracking-[0.12em] text-[#04060b] font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,128,51,0.3)] hover:-translate-y-0.5"
            >
              <span>OPEN THE MAP</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <span className="font-mono text-[10px] tracking-[0.15em] text-[#5a6a80] uppercase">Buffalo Alpha Live</span>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.08em] text-[#5a6a80]">
              CLOUD<span className="text-[#ff8033]">TO</span>TERRA
            </span>
            <span className="text-[#5a6a80]/30">|</span>
            <span className="font-mono text-[10px] tracking-[0.15em] text-[#5a6a80]">v2.0</span>
          </div>
          <p className="font-mono text-[10px] tracking-[0.1em] text-[#5a6a80]">
            The Interface Between Cloud and Land
          </p>
        </div>
      </footer>
    </div>
  );
}
