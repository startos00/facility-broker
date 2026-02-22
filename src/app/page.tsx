'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import NetworkGraph from '@/components/NetworkGraph';

const CloudIcon = () => (
  <div className="relative group flex items-center justify-center w-48 h-48">
    {/* Dynamic background glow */}
    <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full scale-110 opacity-50 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" />
    
    <svg width="180" height="180" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-[0_0_30px_rgba(59,130,246,0.2)] overflow-visible">
      <defs>
        <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="signal-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="50%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <filter id="arc-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <mask id="cloud-bite">
          <rect x="0" y="0" width="256" height="256" fill="white" />
          <circle cx="140" cy="136" r="28" fill="black" />
        </mask>
      </defs>

      {/* Cloud Body - Glassy, Transparent, and "Eaten" by the signal */}
      <path 
        d="M 52 124 C 52 105, 60 90, 78 84 C 80 64, 95 48, 118 43 C 141 38, 160 44, 170 58 C 178 52, 194 54, 202 66 C 212 61, 226 68, 228 84 C 240 87, 247 98, 245 112 C 244 128, 232 136, 218 136 L 72 136 C 56 136, 49 128, 52 124 Z" 
        fill="url(#cloud-grad)"
        stroke="rgba(147, 197, 253, 0.4)"
        strokeWidth="1.5"
        mask="url(#cloud-bite)"
      />
      
      {/* Signal Arcs - Radiating from the "bite" center */}
      <g filter="url(#arc-glow)">
        <path d="M 65 136 A 75 75 0 0 1 215 136" stroke="url(#signal-grad)" strokeWidth="12" strokeLinecap="round" className="animate-beam-3" />
        <path d="M 90 136 A 50 50 0 0 1 190 136" stroke="url(#signal-grad)" strokeWidth="12" strokeLinecap="round" className="animate-beam-2" />
        <path d="M 115 136 A 25 25 0 0 1 165 136" stroke="url(#signal-grad)" strokeWidth="12" strokeLinecap="round" className="animate-beam-1" />
      </g>

      {/* Terra Point - Originating from inside the cloud bite */}
      <circle cx="140" cy="120" r="10" fill="#10B981" className="animate-pulse shadow-[0_0_20px_#10B981]" />
      
      {/* Ground lines - subtle and transparent */}
      <g opacity="0.15">
        <path d="M 102 224 Q 140 214, 178 224" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
        <path d="M 115 232 Q 140 225, 165 232" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  </div>
);

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
    <div className="min-h-screen bg-[#04060b] text-[#d4dce8] overflow-x-hidden font-mono">
      {/* ═══ KEYFRAME ANIMATIONS ═══ */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.15); opacity: 0.1; }
          100% { transform: scale(1); opacity: 0.4; }
        }
        @keyframes scan-line {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-pulse-ring { animation: pulse-ring 3s ease-in-out infinite; }
        .animate-scan { animation: scan-line 6s ease-in-out infinite; }
        .fade-up { animation: fade-up 0.7s ease-out both; }
        .fade-up-d1 { animation: fade-up 0.7s ease-out 0.1s both; }
        .fade-up-d2 { animation: fade-up 0.7s ease-out 0.2s both; }
        .fade-up-d3 { animation: fade-up 0.7s ease-out 0.3s both; }
        .fade-up-d4 { animation: fade-up 0.7s ease-out 0.4s both; }
        .fade-up-d5 { animation: fade-up 0.7s ease-out 0.5s both; }

        @keyframes beam {
          0% { opacity: 0.2; stroke-width: 8; }
          50% { opacity: 1; stroke-width: 12; }
          100% { opacity: 0.2; stroke-width: 8; }
        }
        .animate-beam-1 { animation: beam 3s ease-in-out infinite; }
        .animate-beam-2 { animation: beam 3s ease-in-out infinite 0.5s; }
        .animate-beam-3 { animation: beam 3s ease-in-out infinite 1s; }
      `}</style>

      {/* ═══ TOPOGRAPHIC GRID BACKGROUND ═══ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#04060b_80%)]" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#04060b] to-transparent" />
      </div>

      {/* ═══ SCAN LINE ═══ */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22d3ee]/30 to-transparent animate-scan" />
      </div>

      {/* ═══ NOISE TEXTURE OVERLAY ═══ */}
      <div className="fixed inset-0 pointer-events-none z-[2] opacity-[0.015] mix-blend-overlay" style={{
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
            <span className="text-[#22d3ee]">[{'>>'}]</span> AWAITING OPERATOR INPUT...
          </p>
        </div>

        {/* Status indicator — top right */}
        <div className="absolute top-8 right-8 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em]">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2ee672] animate-pulse" />
          <span className="text-[#2ee672]">LIVE</span>
        </div>

        {/* Main hero content */}
        <div className={`text-center transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Cloud Icon — floating & dynamic */}
          <div className="mb-8 flex justify-center animate-float">
            <CloudIcon />
          </div>

          {/* Wordmark */}
          <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.08em] text-[#f0f4f8] mb-4">
            CLOUD<span className="text-[#22d3ee]">TO</span>TERRA
          </h1>

          <p className="font-mono text-xs tracking-[0.3em] text-[#5a6a80] uppercase mb-2">
            Territorial Intelligence Platform
          </p>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#22d3ee]/40 to-transparent mx-auto my-6" />

          <p className="max-w-lg mx-auto text-base sm:text-lg text-[#8c95a4] leading-relaxed mb-10">
            The geospatial marketplace where Network Societies find physical territory.
            Scout assets. Signal communities. Broker space.
          </p>

          {/* CTA */}
          <Link
            href="/map"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-[#22d3ee]/30 bg-[#22d3ee]/5 rounded-full font-mono text-sm tracking-[0.15em] text-[#22d3ee] transition-all duration-300 hover:bg-[#22d3ee]/10 hover:border-[#22d3ee]/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)] hover:-translate-y-0.5"
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

      {/* ═══ NETWORK DISCOVERY GRAPH ═══ */}
      <NetworkGraph />

      {/* ═══ FOOTER ═══ */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.08em] text-[#5a6a80]">
              CLOUD<span className="text-[#22d3ee]">TO</span>TERRA
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
