'use client';

import { useState, useRef } from 'react';
import type { Typology } from './MapApp';

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

interface SubmissionModalProps {
  typology: Typology;
  location: { latitude: number; longitude: number };
  boundary: GeoJSON.Polygon | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SubmissionModal({ typology, location, boundary, onClose, onSuccess }: SubmissionModalProps) {
  const [nodeName, setNodeName] = useState('');
  const [description, setDescription] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [seekingCapital, setSeekingCapital] = useState(false);
  const [capitalAmount, setCapitalAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [website, setWebsite] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Society fields
  const [population, setPopulation] = useState('');
  const [vibe, setVibe] = useState('');
  const [nextEventDate, setNextEventDate] = useState('');

  // Asset fields
  const [acreage, setAcreage] = useState('');
  const [price, setPrice] = useState('');
  const [zoning, setZoning] = useState('');
  const [editability, setEditability] = useState('');
  const [isDistressed, setIsDistressed] = useState(false);

  // Facility fields
  const [capacityPax, setCapacityPax] = useState('');
  const [internetSpeed, setInternetSpeed] = useState('');
  const [availability, setAvailability] = useState('');
  const [isFreeOffer, setIsFreeOffer] = useState(false);

  const color = NODE_COLORS[typology];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError('Photo must be under 5MB'); return; }
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = Math.min(1, 800 / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
        setPhotoPreview(canvas.toDataURL('image/jpeg', 0.8));
        setError('');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!nodeName.trim()) { setError('Node name is required'); return; }
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/nodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodeName: nodeName.trim(),
          typology,
          description: description.trim() || undefined,
          photoUrl: photoPreview || undefined,
          latitude: location.latitude,
          longitude: location.longitude,
          boundary: boundary || undefined,
          population: population || undefined,
          vibe: vibe.trim() || undefined,
          nextEventDate: nextEventDate || undefined,
          acreage: acreage.trim() || undefined,
          price: price || undefined,
          zoning: zoning.trim() || undefined,
          editability: editability || undefined,
          isDistressed,
          capacityPax: capacityPax || undefined,
          internetSpeed: internetSpeed.trim() || undefined,
          availability: availability.trim() || undefined,
          isFreeOffer,
          seekingCapital,
          capitalAmount: capitalAmount.trim() || undefined,
          website,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="absolute right-0 top-0 h-full w-[420px] z-30 slide-in-right">
      <div className="glass-panel-solid h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div>
            <h2 className="text-sm font-medium tracking-[0.2em] uppercase" style={{ color }}>
              Signal {TYPOLOGY_LABELS[typology]}
            </h2>
            <p className="font-mono text-[10px] text-text-dim mt-1 tracking-wider">NEW {typology.toUpperCase()} NODE</p>
          </div>
          <button onClick={onClose} className="text-text-dim hover:text-text-primary transition-colors text-xl cursor-pointer leading-none">&times;</button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} className="absolute -left-[9999px]" tabIndex={-1} autoComplete="off" />

          {/* Coordinates */}
          <div className="glass-panel px-4 py-3 font-mono text-xs">
            <span className="text-text-dim">LOC&nbsp;</span>
            <span style={{ color }}>{location.latitude.toFixed(6)}</span>
            <span className="text-text-dim">,&nbsp;</span>
            <span style={{ color }}>{location.longitude.toFixed(6)}</span>
            {boundary && <span className="text-text-dim ml-2">&middot; POLYGON</span>}
          </div>

          {/* Photo */}
          <div>
            <label className="field-label">Recon Photo</label>
            <div onClick={() => fileInputRef.current?.click()} className="mt-2 border border-dashed border-white/10 rounded-lg p-4 text-center cursor-pointer hover:border-white/20 transition-colors">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="w-full h-40 object-cover rounded" />
              ) : (
                <div className="text-text-dim text-sm py-6">
                  <p className="text-xs tracking-wider">CLICK TO UPLOAD</p>
                  <p className="text-[10px] mt-1.5 opacity-50">JPG / PNG &middot; Max 5MB</p>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </div>

          {/* Name */}
          <div>
            <label className="field-label">Node Name</label>
            <input type="text" value={nodeName} onChange={(e) => setNodeName(e.target.value)} placeholder={typology === 'society' ? 'Buffalo DAO Meetup' : typology === 'asset' ? 'Abandoned Victorian on Main' : 'Downtown Cowork Hall'} className="field-input" />
          </div>

          {/* Description */}
          <div>
            <label className="field-label">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What makes this node notable?" rows={2} className="field-input resize-none" />
          </div>

          {/* ── Type-specific fields ── */}
          {typology === 'society' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="field-label">Population</label>
                  <input type="number" value={population} onChange={(e) => setPopulation(e.target.value)} placeholder="42" className="field-input" />
                </div>
                <div>
                  <label className="field-label">Vibe</label>
                  <input type="text" value={vibe} onChange={(e) => setVibe(e.target.value)} placeholder="Builder / Hacker" className="field-input" />
                </div>
              </div>
              <div>
                <label className="field-label">Next Event Date</label>
                <input type="date" value={nextEventDate} onChange={(e) => setNextEventDate(e.target.value)} className="field-input" />
              </div>
            </>
          )}

          {typology === 'asset' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="field-label">Price</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="35000" className="field-input" />
                </div>
                <div>
                  <label className="field-label">Acreage</label>
                  <input type="text" value={acreage} onChange={(e) => setAcreage(e.target.value)} placeholder="0.25" className="field-input" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="field-label">Zoning</label>
                  <input type="text" value={zoning} onChange={(e) => setZoning(e.target.value)} placeholder="Residential" className="field-input" />
                </div>
                <div>
                  <label className="field-label">Editability (1-10)</label>
                  <input type="number" min="1" max="10" value={editability} onChange={(e) => setEditability(e.target.value)} placeholder="8" className="field-input" />
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={isDistressed} onChange={(e) => setIsDistressed(e.target.checked)} className="accent-signal-orange" />
                <span className="text-sm text-text-primary">Distressed Asset</span>
              </label>
            </>
          )}

          {typology === 'facility' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="field-label">Capacity (pax)</label>
                  <input type="number" value={capacityPax} onChange={(e) => setCapacityPax(e.target.value)} placeholder="20" className="field-input" />
                </div>
                <div>
                  <label className="field-label">Internet Speed</label>
                  <input type="text" value={internetSpeed} onChange={(e) => setInternetSpeed(e.target.value)} placeholder="500 Mbps" className="field-input" />
                </div>
              </div>
              <div>
                <label className="field-label">Availability</label>
                <input type="text" value={availability} onChange={(e) => setAvailability(e.target.value)} placeholder="3 months" className="field-input" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={isFreeOffer} onChange={(e) => setIsFreeOffer(e.target.checked)} className="accent-signal-green" />
                <span className="text-sm text-text-primary">Free Offer for Builders</span>
              </label>
            </>
          )}

          {/* ── Investor Flag ── */}
          <div className="pt-2 border-t border-white/5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={seekingCapital} onChange={(e) => setSeekingCapital(e.target.checked)} className="accent-signal-green" />
              <span className="text-sm text-text-primary">Seeking Capital</span>
            </label>
            {seekingCapital && (
              <div className="mt-3">
                <label className="field-label">Capital Amount</label>
                <input type="text" value={capitalAmount} onChange={(e) => setCapitalAmount(e.target.value)} placeholder="$50,000" className="field-input" />
              </div>
            )}
          </div>

          {error && <p className="text-xs text-red-400 font-mono tracking-wide">{error}</p>}
        </div>

        {/* Submit */}
        <div className="px-6 py-4 border-t border-white/5">
          <button onClick={handleSubmit} disabled={submitting || !nodeName.trim()} className="submit-btn" style={{ borderColor: `${color}4d`, color, background: `${color}1a` }}>
            {submitting ? 'TRANSMITTING...' : 'TRANSMIT SIGNAL'}
          </button>
        </div>
      </div>
    </div>
  );
}
