'use client';

import type { Property } from './MapApp';

interface DetailDrawerProps {
  property: Property;
  onClose: () => void;
}

export default function DetailDrawer({ property, onClose }: DetailDrawerProps) {
  const formattedDate = new Date(property.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="absolute right-0 top-0 h-full w-[380px] z-30 slide-in-right">
      <div className="glass-panel-solid h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <p className="font-mono text-[10px] text-text-dim tracking-[0.2em]">NODE INTEL</p>
          <button
            onClick={onClose}
            className="text-text-dim hover:text-text-primary transition-colors text-xl cursor-pointer leading-none"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Photo */}
          {property.photoUrl && (
            <div className="w-full h-52 bg-surface">
              <img
                src={property.photoUrl}
                alt={property.nodeName}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="px-6 py-5 space-y-4">
            {/* Name + typology */}
            <div>
              <h2 className="text-lg font-medium text-text-bright leading-tight">
                {property.nodeName}
              </h2>
              <span className="inline-block mt-2.5 px-3 py-1 rounded font-mono text-[10px] tracking-[0.15em] uppercase bg-signal-orange/10 text-signal-orange border border-signal-orange/20">
                {property.typology}
              </span>
            </div>

            {/* Coordinates */}
            <div className="glass-panel px-4 py-3 font-mono text-xs">
              <span className="text-text-dim">LOC&nbsp;</span>
              <span className="text-signal-cyan">
                {property.latitude.toFixed(6)}, {property.longitude.toFixed(6)}
              </span>
            </div>

            {/* Price */}
            {property.priceEstimate && (
              <div>
                <p className="field-label">Estimate</p>
                <p className="text-text-bright text-lg font-medium mt-1">
                  {property.priceEstimate}
                </p>
              </div>
            )}

            {/* Notes */}
            {property.notes && (
              <div>
                <p className="field-label">Field Notes</p>
                <p className="text-text-primary text-sm mt-1.5 leading-relaxed">
                  {property.notes}
                </p>
              </div>
            )}

            {/* Metadata */}
            <div className="pt-4 border-t border-white/5">
              <p className="font-mono text-[10px] text-text-dim tracking-[0.15em]">
                LOGGED {formattedDate.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
