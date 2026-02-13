'use client';

import { useState, useRef } from 'react';

interface SubmissionModalProps {
  location: { latitude: number; longitude: number };
  onClose: () => void;
  onSuccess: () => void;
}

export default function SubmissionModal({ location, onClose, onSuccess }: SubmissionModalProps) {
  const [nodeName, setNodeName] = useState('');
  const [typology, setTypology] = useState('');
  const [priceEstimate, setPriceEstimate] = useState('');
  const [notes, setNotes] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('Photo must be under 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 800;
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setPhotoPreview(canvas.toDataURL('image/jpeg', 0.8));
        setError('');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!nodeName.trim()) {
      setError('Node name is required');
      return;
    }
    if (!typology) {
      setError('Select a typology');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodeName: nodeName.trim(),
          latitude: location.latitude,
          longitude: location.longitude,
          typology,
          priceEstimate: priceEstimate.trim() || undefined,
          notes: notes.trim() || undefined,
          photoUrl: photoPreview || undefined,
          website, // honeypot
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
    <div className="absolute right-0 top-0 h-full w-[400px] z-30 slide-in-right">
      <div className="glass-panel-solid h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div>
            <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-signal-orange">
              Signal Territory
            </h2>
            <p className="font-mono text-[10px] text-text-dim mt-1 tracking-wider">
              NEW INTELLIGENCE NODE
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-dim hover:text-text-primary transition-colors text-xl cursor-pointer leading-none"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="absolute -left-[9999px]"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Coordinates display */}
          <div className="glass-panel px-4 py-3 font-mono text-xs">
            <span className="text-text-dim">LOC&nbsp;</span>
            <span className="text-signal-cyan">
              {location.latitude.toFixed(6)}
            </span>
            <span className="text-text-dim">,&nbsp;</span>
            <span className="text-signal-cyan">
              {location.longitude.toFixed(6)}
            </span>
          </div>

          {/* Photo upload */}
          <div>
            <label className="field-label">Recon Photo</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 border border-dashed border-white/10 rounded-lg p-4 text-center cursor-pointer hover:border-white/20 transition-colors"
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded"
                />
              ) : (
                <div className="text-text-dim text-sm py-8">
                  <p className="text-xs tracking-wider">CLICK TO UPLOAD</p>
                  <p className="text-[10px] mt-1.5 opacity-50">JPG / PNG &middot; Max 5MB</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          {/* Node name */}
          <div>
            <label className="field-label">Node Name</label>
            <input
              type="text"
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
              placeholder="Abandoned Victorian on Main"
              className="field-input"
            />
          </div>

          {/* Typology */}
          <div>
            <label className="field-label">Typology</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {(['house', 'land', 'commercial', 'industrial'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTypology(t)}
                  className={`typology-btn ${typology === t ? 'typology-btn-active' : ''}`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Price estimate */}
          <div>
            <label className="field-label">Price Estimate</label>
            <input
              type="text"
              value={priceEstimate}
              onChange={(e) => setPriceEstimate(e.target.value)}
              placeholder="$45,000"
              className="field-input"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="field-label">Highlights / Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Needs roof, but 2 mins from Metro"
              rows={3}
              className="field-input resize-none"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 font-mono tracking-wide">{error}</p>
          )}
        </div>

        {/* Submit */}
        <div className="px-6 py-4 border-t border-white/5">
          <button
            onClick={handleSubmit}
            disabled={submitting || !nodeName.trim() || !typology}
            className="submit-btn"
          >
            {submitting ? 'TRANSMITTING...' : 'TRANSMIT SIGNAL'}
          </button>
        </div>
      </div>
    </div>
  );
}
