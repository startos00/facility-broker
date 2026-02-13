'use client';

import { useState, useEffect, useCallback } from 'react';
import Map, { Source, Layer, Marker, NavigationControl } from 'react-map-gl/mapbox';
import type { MapLayerMouseEvent } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { amenitiesGeoJSON } from '@/lib/buffalo-amenities';
import SubmissionModal from './SubmissionModal';
import DetailDrawer from './DetailDrawer';

export interface Property {
  id: string;
  nodeName: string;
  latitude: number;
  longitude: number;
  typology: string;
  priceEstimate: string | null;
  notes: string | null;
  photoUrl: string | null;
  createdAt: string;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapApp() {
  const [viewState, setViewState] = useState({
    latitude: 42.8864,
    longitude: -78.8784,
    zoom: 12,
    pitch: 0,
    bearing: 0,
  });

  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showSubmission, setShowSubmission] = useState(false);
  const [placingPin, setPlacingPin] = useState(false);
  const [pinLocation, setPinLocation] = useState<{ latitude: number; longitude: number } | null>(
    null,
  );
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch properties on mount
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    fetch('/api/properties')
      .then((r) => r.json())
      .then((data) => setProperties(data))
      .catch(console.error);
  };

  const handleMapClick = useCallback(
    (e: MapLayerMouseEvent) => {
      if (placingPin) {
        setPinLocation({ latitude: e.lngLat.lat, longitude: e.lngLat.lng });
        setShowSubmission(true);
      }
    },
    [placingPin],
  );

  const handleFABClick = () => {
    setPlacingPin(true);
    setSelectedProperty(null);
  };

  const handleSubmissionClose = () => {
    setShowSubmission(false);
    setPlacingPin(false);
    setPinLocation(null);
  };

  const handleSubmissionSuccess = () => {
    handleSubmissionClose();
    fetchProperties();
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setShowSubmission(false);
    setPlacingPin(false);
    setPinLocation(null);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${MAPBOX_TOKEN}&limit=1`,
      );
      const data = await res.json();
      if (data.features?.[0]) {
        const [lng, lat] = data.features[0].center;
        setViewState((prev) => ({ ...prev, latitude: lat, longitude: lng, zoom: 13 }));
      }
    } catch {
      // Silently fail geocoding
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-void">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        {...viewState}
        onMove={(e) => setViewState(e.viewState)}
        onClick={handleMapClick}
        onMouseMove={(e) => setCursorCoords({ lat: e.lngLat.lat, lng: e.lngLat.lng })}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        cursor={placingPin ? 'crosshair' : 'grab'}
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="top-right" showCompass={false} />

        {/* ── Amenity Layers ── */}
        <Source id="amenities" type="geojson" data={amenitiesGeoJSON}>
          {/* Polygon fill */}
          <Layer
            id="amenity-polygon-fill"
            type="fill"
            filter={['==', ['geometry-type'], 'Polygon']}
            paint={{
              'fill-color': ['get', 'color'],
              'fill-opacity': 0.1,
            }}
          />
          {/* Polygon border */}
          <Layer
            id="amenity-polygon-stroke"
            type="line"
            filter={['==', ['geometry-type'], 'Polygon']}
            paint={{
              'line-color': ['get', 'color'],
              'line-width': 1.5,
              'line-opacity': 0.5,
            }}
          />
          {/* Polygon glow */}
          <Layer
            id="amenity-polygon-glow"
            type="line"
            filter={['==', ['geometry-type'], 'Polygon']}
            paint={{
              'line-color': ['get', 'color'],
              'line-width': 6,
              'line-opacity': 0.08,
              'line-blur': 4,
            }}
          />
          {/* Line stroke */}
          <Layer
            id="amenity-line-stroke"
            type="line"
            filter={['==', ['geometry-type'], 'LineString']}
            paint={{
              'line-color': ['get', 'color'],
              'line-width': 3,
              'line-opacity': 0.7,
            }}
          />
          {/* Line glow */}
          <Layer
            id="amenity-line-glow"
            type="line"
            filter={['==', ['geometry-type'], 'LineString']}
            paint={{
              'line-color': ['get', 'color'],
              'line-width': 10,
              'line-opacity': 0.12,
              'line-blur': 5,
            }}
          />
          {/* Point circles */}
          <Layer
            id="amenity-points"
            type="circle"
            filter={['==', ['geometry-type'], 'Point']}
            paint={{
              'circle-color': ['get', 'color'],
              'circle-radius': 5,
              'circle-opacity': 0.9,
              'circle-stroke-width': 1.5,
              'circle-stroke-color': ['get', 'color'],
              'circle-stroke-opacity': 0.3,
            }}
          />
          {/* Point glow */}
          <Layer
            id="amenity-points-glow"
            type="circle"
            filter={['==', ['geometry-type'], 'Point']}
            paint={{
              'circle-color': ['get', 'color'],
              'circle-radius': 18,
              'circle-opacity': 0.06,
              'circle-blur': 1,
            }}
          />
        </Source>

        {/* Amenity labels */}
        <Source id="amenity-labels" type="geojson" data={amenitiesGeoJSON}>
          <Layer
            id="amenity-label-text"
            type="symbol"
            filter={['any', ['==', ['geometry-type'], 'Point'], ['==', ['geometry-type'], 'Polygon']]}
            layout={{
              'text-field': ['get', 'name'],
              'text-size': 10,
              'text-offset': [0, 1.4],
              'text-anchor': 'top',
              'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
              'text-allow-overlap': false,
            }}
            paint={{
              'text-color': ['get', 'color'],
              'text-opacity': 0.6,
              'text-halo-color': '#000000',
              'text-halo-width': 1.2,
            }}
          />
        </Source>

        {/* ── Property Markers ── */}
        {properties.map((p) => (
          <Marker
            key={p.id}
            latitude={p.latitude}
            longitude={p.longitude}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              handlePropertyClick(p);
            }}
          >
            <div className="property-marker">
              <div className="property-marker-inner" />
            </div>
          </Marker>
        ))}

        {/* ── Pin Placement Marker ── */}
        {pinLocation && (
          <Marker
            latitude={pinLocation.latitude}
            longitude={pinLocation.longitude}
            anchor="center"
          >
            <div className="placement-marker">
              <div className="placement-marker-inner" />
            </div>
          </Marker>
        )}
      </Map>

      {/* ── Vignette Overlay ── */}
      <div className="vignette" />

      {/* ── Search Bar ── */}
      <form className="search-bar" onSubmit={handleSearch}>
        <span className="search-icon">&#x2315;</span>
        <input
          type="text"
          placeholder="Search location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {/* ── Pin Placement Instruction ── */}
      {placingPin && !showSubmission && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 fade-in">
          <div className="glass-panel px-6 py-3 font-mono text-xs text-signal-cyan tracking-[0.2em] uppercase">
            Click map to place pin
          </div>
        </div>
      )}

      {/* ── FAB Button ── */}
      {!showSubmission && !placingPin && (
        <button onClick={handleFABClick} className="fab-button">
          <span className="fab-icon">+</span>
          <span>SIGNAL TERRITORY</span>
        </button>
      )}

      {/* ── Cancel Placement ── */}
      {placingPin && !showSubmission && (
        <button
          onClick={() => {
            setPlacingPin(false);
            setPinLocation(null);
          }}
          className="absolute bottom-10 right-8 z-20 glass-panel px-5 py-2.5 font-mono text-xs text-text-dim hover:text-text-primary tracking-wider transition-colors cursor-pointer"
        >
          ESC &middot; CANCEL
        </button>
      )}

      {/* ── Status Bar ── */}
      <div className="status-bar">
        <span className="font-mono text-[10px] text-text-dim tracking-wider">CLOUDTOTERRA v1.0</span>
        <span className="font-mono text-[10px] text-signal-green tracking-wider">&#x25CF; LIVE</span>
        {cursorCoords && (
          <span className="font-mono text-[10px] text-text-dim tracking-wider">
            {cursorCoords.lat.toFixed(4)}&deg;N&nbsp;&nbsp;{Math.abs(cursorCoords.lng).toFixed(4)}&deg;W
          </span>
        )}
        <span className="font-mono text-[10px] text-text-dim tracking-wider">
          {properties.length} NODE{properties.length !== 1 ? 'S' : ''}
        </span>
      </div>

      {/* ── Detail Drawer ── */}
      {selectedProperty && (
        <DetailDrawer
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {/* ── Submission Modal ── */}
      {showSubmission && pinLocation && (
        <SubmissionModal
          location={pinLocation}
          onClose={handleSubmissionClose}
          onSuccess={handleSubmissionSuccess}
        />
      )}
    </div>
  );
}
