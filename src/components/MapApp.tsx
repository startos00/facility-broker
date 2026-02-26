'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Map, { Source, Layer, Marker, NavigationControl, Popup } from 'react-map-gl/mapbox';
import type { MapMouseEvent } from 'react-map-gl/mapbox';
import mapboxgl from 'mapbox-gl';
import * as THREE from 'three';
// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { amenitiesGeoJSON as buffaloAmenities, searchZonesGeoJSON as buffaloZones } from '@/lib/buffalo-amenities';
import { amenitiesGeoJSON as stKildaAmenities, searchZonesGeoJSON as stKildaZones } from '@/lib/st-kilda-amenities';
import { amenitiesGeoJSON as fremantleAmenities, searchZonesGeoJSON as fremantleZones } from '@/lib/fremantle-amenities';
import { stKildaClipGeoJSON } from '@/lib/st-kilda-clip';
import SubmissionModal from './SubmissionModal';
import DetailDrawer from './DetailDrawer';
import LensPanel from './LensPanel';
import PulsePanel from './PulsePanel';
import DrawControl from './DrawControl';

export type PilotCity = 'buffalo' | 'st-kilda' | 'fremantle';

const PILOT_CITIES: Record<PilotCity, { label: string; lat: number; lng: number; zoom: number }> = {
  buffalo:   { label: 'Buffalo, NY',       lat: 42.8864,  lng: -78.8784, zoom: 12 },
  'st-kilda': { label: 'St Kilda, Melbourne', lat: -37.8676, lng: 144.9801, zoom: 14 },
  fremantle: { label: 'Fremantle, WA',     lat: -32.0569, lng: 115.7439, zoom: 14 },
};

const CITY_AMENITIES: Record<PilotCity, GeoJSON.FeatureCollection> = {
  buffalo: buffaloAmenities,
  'st-kilda': stKildaAmenities,
  fremantle: fremantleAmenities,
};

const CITY_ZONES: Record<PilotCity, GeoJSON.FeatureCollection> = {
  buffalo: buffaloZones,
  'st-kilda': stKildaZones,
  fremantle: fremantleZones,
};

interface GhostSiteData {
  id: string;
  latitude: number;
  longitude: number;
  abandonmentProbability: string;
  address: string | null;
  city: string;
  lastKnownFunction: string | null;
  vacancySince: string | null;
  lotSizeSqm: string | null;
  ownershipType: string | null;
  ndviScore: string | null;
  nightLightScore: string | null;
  hasBoardedWindows: boolean | null;
  osmStatus: string | null;
}

interface ArchiveEntryData {
  id: string;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
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

export type Typology = 'society' | 'asset' | 'facility';

export interface NodeData {
  id: string;
  nodeName: string;
  typology: Typology;
  description: string | null;
  photoUrl: string | null;
  latitude: number;
  longitude: number;
  boundary: GeoJSON.Polygon | null;
  population: number | null;
  vibe: string | null;
  nextEventDate: string | null;
  acreage: string | null;
  price: number | null;
  zoning: string | null;
  editability: number | null;
  isDistressed: boolean;
  capacityPax: number | null;
  internetSpeed: string | null;
  availability: string | null;
  isFreeOffer: boolean;
  seekingCapital: boolean;
  capitalAmount: string | null;
  createdAt: string;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const NODE_COLORS: Record<Typology, string> = {
  society: '#22d3ee',
  asset: '#ff8033',
  facility: '#b07aff',
};

interface NearestAmenity {
  name: string;
  color: string;
  coordinates: [number, number];
  distance: number;
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function MapApp() {
  // ── Theme ──
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const isDark = theme === 'dark';

  // ── Map ──
  const [viewState, setViewState] = useState({
    latitude: 42.8864,
    longitude: -78.8784,
    zoom: 12,
    pitch: 0,
    bearing: 0,
  });
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // ── Data ──
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  // ── Pilot City ──
  const [activeCity, setActiveCity] = useState<PilotCity>('buffalo');
  const amenitiesGeoJSON = CITY_AMENITIES[activeCity];
  const searchZonesGeoJSON = CITY_ZONES[activeCity];

  // ── CivicPattern: Ghost Sites ──
  const [ghostSites, setGhostSites] = useState<GhostSiteData[]>([]);
  const [showGhostSites, setShowGhostSites] = useState(false);
  const [selectedGhostSite, setSelectedGhostSite] = useState<GhostSiteData | null>(null);

  // ── CivicPattern: Archive Entries ──
  const [archiveEntries, setArchiveEntries] = useState<ArchiveEntryData[]>([]);
  const [showArchive, setShowArchive] = useState(false);
  const [selectedArchiveEntry, setSelectedArchiveEntry] = useState<ArchiveEntryData | null>(null);

  // ── Amenity Popup ──
  const [selectedAmenity, setSelectedAmenity] = useState<{
    name: string; description: string; category: string; color: string; photoUrl?: string;
    lng: number; lat: number;
  } | null>(null);

  // ── CivicPattern: Context Menu ──
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; lat: number; lng: number } | null>(null);

  // ── CivicPattern: Panels ──
  const [showLens, setShowLens] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [neighborhoodAnalysis, setNeighborhoodAnalysis] = useState<Record<string, unknown> | null>(null);
  const [recommendation, setRecommendation] = useState<Record<string, unknown> | null>(null);
  const [caseStudies, setCaseStudies] = useState<Record<string, unknown>[]>([]);
  const [pulseLoading, setPulseLoading] = useState(false);

  // ── Filters ──
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeTypologies, setActiveTypologies] = useState<Set<Typology>>(
    new Set(['society', 'asset', 'facility']),
  );
  const [activeAmenities, setActiveAmenities] = useState<Set<string>>(
    new Set(['park', 'architecture', 'transit', 'institution', 'faith', 'housing']),
  );
  const [showParcels, setShowParcels] = useState(true);

  // ── Submission flow ──
  const [submissionStep, setSubmissionStep] = useState<
    'idle' | 'select-type' | 'choose-method' | 'placing' | 'drawing' | 'form'
  >('idle');
  const [selectedTypology, setSelectedTypology] = useState<Typology | null>(null);
  const [pinLocation, setPinLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [drawnBoundary, setDrawnBoundary] = useState<GeoJSON.Polygon | null>(null);

  // ── 3D Model Interaction ──
  const DEFAULT_MODEL_LNGLAT: [number, number] = [144.97985676118213, -37.8626556260632];
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const modelLngLatRef = useRef<[number, number]>([...DEFAULT_MODEL_LNGLAT]);
  const modelBearingRef = useRef(0);
  const modelDragStateRef = useRef<{
    active: boolean;
    mode: 'drag' | 'rotate';
    startScreenX: number;
    startScreenY: number;
    startLngLat: [number, number];
    startBearing: number;
  } | null>(null);
  const justDraggedRef = useRef(false);
  const [modelInteracting, setModelInteracting] = useState<'drag' | 'rotate' | null>(null);
  const [modelHovered, setModelHovered] = useState(false);
  const [modelRotateMode, setModelRotateMode] = useState(false);
  const rotateModeStartBearingRef = useRef(0);
  const rotateModeStartScreenXRef = useRef(0);
  const SACRED_HEART_MODEL_ID = 'sacred-heart-church';

  // Load saved model placement on mount
  useEffect(() => {
    fetch(`/api/model-placements?modelId=${SACRED_HEART_MODEL_ID}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.longitude != null && data?.latitude != null) {
          modelLngLatRef.current = [data.longitude, data.latitude];
          modelBearingRef.current = data.bearing ?? 0;
        }
      })
      .catch(() => {});
  }, []);

  const saveModelPlacement = useCallback(() => {
    fetch('/api/model-placements', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        modelId: SACRED_HEART_MODEL_ID,
        longitude: modelLngLatRef.current[0],
        latitude: modelLngLatRef.current[1],
        bearing: modelBearingRef.current,
      }),
    }).catch(() => {});
  }, []);

  // ── Fetch nodes ──
  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = () => {
    fetch('/api/nodes')
      .then((r) => r.json())
      .then((data) => setNodes(data))
      .catch(console.error);
  };

  // ── Filtered data ──
  const filteredNodes = nodes.filter((n) => activeTypologies.has(n.typology));

  const filteredAmenitiesGeoJSON = useMemo(
    () => ({
      ...amenitiesGeoJSON,
      features: amenitiesGeoJSON.features.filter((f: GeoJSON.Feature) =>
        activeAmenities.has((f.properties as Record<string, string>)?.category ?? ''),
      ),
    }),
    [activeAmenities, amenitiesGeoJSON],
  );

  // ── Nearest amenities (radius lines) ──
  const nearestAmenities = useMemo((): NearestAmenity[] => {
    if (!selectedNode || selectedNode.typology !== 'asset') return [];
    return amenitiesGeoJSON.features
      .filter((f: GeoJSON.Feature) => f.geometry.type === 'Point')
      .map((f: GeoJSON.Feature) => {
        const [aLng, aLat] = (f.geometry as GeoJSON.Point).coordinates;
        const props = f.properties as Record<string, string> | null;
        return {
          name: props?.name ?? '',
          color: props?.color ?? '#fff',
          coordinates: [aLng, aLat] as [number, number],
          distance: haversineDistance(selectedNode.latitude, selectedNode.longitude, aLat, aLng),
        };
      })
      .sort((a: { distance: number }, b: { distance: number }) => a.distance - b.distance)
      .slice(0, 3);
  }, [selectedNode, amenitiesGeoJSON]);

  const radiusLinesGeoJSON = useMemo(() => {
    if (!selectedNode || nearestAmenities.length === 0) return null;
    return {
      type: 'FeatureCollection' as const,
      features: nearestAmenities.map((a) => ({
        type: 'Feature' as const,
        properties: { name: a.name, distance: `${a.distance.toFixed(1)} mi` },
        geometry: {
          type: 'LineString' as const,
          coordinates: [[selectedNode.longitude, selectedNode.latitude], a.coordinates],
        },
      })),
    };
  }, [selectedNode, nearestAmenities]);

  // ── Node boundary polygons ──
  const nodeBoundariesGeoJSON = useMemo((): GeoJSON.FeatureCollection => ({
    type: 'FeatureCollection',
    features: filteredNodes
      .filter((n) => n.boundary)
      .map((n) => ({
        type: 'Feature' as const,
        properties: {
          id: n.id,
          name: n.nodeName,
          color: NODE_COLORS[n.typology],
          typology: n.typology,
        },
        geometry: n.boundary as GeoJSON.Polygon,
      })),
  }), [filteredNodes]);

  // ── Handlers ──
  const toggleTypology = (t: Typology) =>
    setActiveTypologies((prev) => {
      const next = new Set(prev);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });

  const toggleAmenity = (a: string) =>
    setActiveAmenities((prev) => {
      const next = new Set(prev);
      next.has(a) ? next.delete(a) : next.add(a);
      return next;
    });

  const handleMapClick = useCallback(
    (e: MapMouseEvent) => {
      if (submissionStep === 'placing') {
        setPinLocation({ latitude: e.lngLat.lat, longitude: e.lngLat.lng });
        setSubmissionStep('form');
      }
    },
    [submissionStep],
  );

  const handleFABClick = () => {
    setSubmissionStep('select-type');
    setSelectedNode(null);
  };

  const handleSelectTypology = (t: Typology) => {
    setSelectedTypology(t);
    setSubmissionStep('choose-method');
  };

  const handleChoosePin = () => {
    setSubmissionStep('placing');
  };

  const handleChooseDraw = () => {
    setSubmissionStep('drawing');
  };

  const handleDrawCreate = useCallback((e: { features: GeoJSON.Feature[] }) => {
    const polygon = e.features[0]?.geometry as GeoJSON.Polygon | undefined;
    if (polygon) {
      setDrawnBoundary(polygon);
      const coords = polygon.coordinates[0];
      const lat = coords.reduce((s, c) => s + c[1], 0) / coords.length;
      const lng = coords.reduce((s, c) => s + c[0], 0) / coords.length;
      setPinLocation({ latitude: lat, longitude: lng });
      setSubmissionStep('form');
    }
  }, []);

  const handleCancel = () => {
    setSubmissionStep('idle');
    setSelectedTypology(null);
    setPinLocation(null);
    setDrawnBoundary(null);
  };

  const handleSubmissionSuccess = () => {
    handleCancel();
    fetchNodes();
  };

  const handleMapLoad = useCallback((event: { target: any }) => {
    const map = event.target;
    mapInstanceRef.current = map;

    // Base rotation to stand the model upright (Rhino Y-up → Mapbox Z-up)
    const BASE_ROTATE_X = Math.PI / 2;

    // Custom layer following the official Mapbox "Add a 3D model" pattern
    // https://docs.mapbox.com/mapbox-gl-js/example/add-3d-model/
    const customLayer = {
      id: 'sacred-heart-church-model',
      type: 'custom',
      renderingMode: '3d',

      onAdd(this: any, map: mapboxgl.Map, gl: WebGL2RenderingContext) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);

        const loader = new GLTFLoader();
        loader.load('/models/sacred-heart/church_v3.glb', (gltf: any) => {
          this.scene.add(gltf.scene);
        });

        this.map = map;
        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true,
        });
        this.renderer.autoClear = false;
      },

      render(this: any, gl: WebGL2RenderingContext, matrix: number[]) {
        // Recompute position from refs each frame (enables drag/rotate)
        const mc = mapboxgl.MercatorCoordinate.fromLngLat(modelLngLatRef.current, 0);
        const scale = mc.meterInMercatorCoordinateUnits();
        const bearingRad = (modelBearingRef.current * Math.PI) / 180;

        const rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), BASE_ROTATE_X);
        const rotationBearing = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), bearingRad);

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
          .makeTranslation(mc.x, mc.y, mc.z)
          .scale(new THREE.Vector3(scale, -scale, scale))
          .multiply(rotationX)
          .multiply(rotationBearing);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
      },
    };

    map.addLayer(customLayer as mapboxgl.CustomLayerInterface);
  }, []);

  // ── 3D Model Drag / Rotate ──
  const MODEL_HIT_RADIUS_PX = 40;

  const isNearModel = (map: mapboxgl.Map, point: { x: number; y: number }) => {
    const modelScreen = map.project(modelLngLatRef.current as mapboxgl.LngLatLike);
    const dx = point.x - modelScreen.x;
    const dy = point.y - modelScreen.y;
    return dx * dx + dy * dy <= MODEL_HIT_RADIUS_PX * MODEL_HIT_RADIUS_PX;
  };

  const handleModelMouseDown = useCallback(
    (e: MapMouseEvent) => {
      const map = mapInstanceRef.current;
      if (!map) return;
      if (submissionStep === 'placing' || submissionStep === 'drawing') return;
      if (e.originalEvent.button !== 0) return;
      if (modelRotateMode) return; // rotate mode uses mousemove directly, not drag
      if (!isNearModel(map, e.point)) return;

      modelDragStateRef.current = {
        active: true,
        mode: 'drag',
        startScreenX: e.point.x,
        startScreenY: e.point.y,
        startLngLat: [...modelLngLatRef.current] as [number, number],
        startBearing: modelBearingRef.current,
      };

      setModelInteracting('drag');
      map.dragPan.disable();
      e.originalEvent.preventDefault();

      // Handle mouse-up outside the canvas
      const handleGlobalMouseUp = () => {
        if (modelDragStateRef.current?.active) {
          justDraggedRef.current = true;
          requestAnimationFrame(() => { justDraggedRef.current = false; });
          modelDragStateRef.current = null;
          setModelInteracting(null);
          mapInstanceRef.current?.dragPan.enable();
        }
        window.removeEventListener('mouseup', handleGlobalMouseUp);
      };
      window.addEventListener('mouseup', handleGlobalMouseUp);
    },
    [submissionStep, modelRotateMode],
  );

  const handleModelDblClick = useCallback(
    (e: MapMouseEvent) => {
      const map = mapInstanceRef.current;
      if (!map) return;
      if (submissionStep === 'placing' || submissionStep === 'drawing') return;

      if (modelRotateMode) {
        // Exit rotate mode on any double-click
        setModelRotateMode(false);
        setModelInteracting(null);
        map.dragPan.enable();
        saveModelPlacement();
        return;
      }

      if (!isNearModel(map, e.point)) return;

      // Enter rotate mode
      e.originalEvent.preventDefault();
      e.originalEvent.stopPropagation();
      rotateModeStartBearingRef.current = modelBearingRef.current;
      rotateModeStartScreenXRef.current = e.point.x;
      setModelRotateMode(true);
      setModelInteracting('rotate');
      map.dragPan.disable();
    },
    [submissionStep, modelRotateMode, saveModelPlacement],
  );

  const handleModelMouseMove = useCallback((e: MapMouseEvent) => {
    // Handle rotate mode (free mouse movement, no button held)
    if (modelRotateMode) {
      const dx = e.point.x - rotateModeStartScreenXRef.current;
      modelBearingRef.current = rotateModeStartBearingRef.current + dx * 0.5;
      return;
    }

    // Handle drag mode
    const map = mapInstanceRef.current;
    const drag = modelDragStateRef.current;
    if (!map || !drag?.active) return;

    const startGeo = map.unproject([drag.startScreenX, drag.startScreenY]);
    const currentGeo = map.unproject([e.point.x, e.point.y]);
    modelLngLatRef.current = [
      drag.startLngLat[0] + (currentGeo.lng - startGeo.lng),
      drag.startLngLat[1] + (currentGeo.lat - startGeo.lat),
    ];
  }, [modelRotateMode]);

  const handleModelMouseUp = useCallback(() => {
    if (!modelDragStateRef.current?.active) return;
    justDraggedRef.current = true;
    requestAnimationFrame(() => { justDraggedRef.current = false; });
    modelDragStateRef.current = null;
    setModelInteracting(null);
    mapInstanceRef.current?.dragPan.enable();
    saveModelPlacement();
  }, [saveModelPlacement]);

  // Exit rotate mode on Escape key
  useEffect(() => {
    if (!modelRotateMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModelRotateMode(false);
        setModelInteracting(null);
        mapInstanceRef.current?.dragPan.enable();
        saveModelPlacement();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modelRotateMode]);

  const handleNodeClick = (node: NodeData) => {
    setSelectedNode(node);
    setSelectedGhostSite(null);
    setShowLens(false);
    setShowPulse(false);
    handleCancel();
  };

  // ── City Switcher ──
  const handleCitySwitch = (city: PilotCity) => {
    setActiveCity(city);
    const c = PILOT_CITIES[city];
    setViewState((prev) => ({ ...prev, latitude: c.lat, longitude: c.lng, zoom: c.zoom }));
    setSelectedNode(null);
    setSelectedGhostSite(null);
    setSelectedArchiveEntry(null);
    setShowLens(false);
    setShowPulse(false);
    // Reset 3D model to default when returning to St Kilda
    if (city === 'st-kilda') {
      modelLngLatRef.current = [...DEFAULT_MODEL_LNGLAT];
      modelBearingRef.current = 0;
    }
  };

  // ── Ghost Sites ──
  const fetchGhostSites = useCallback(async () => {
    try {
      const cityName = PILOT_CITIES[activeCity].label.split(',')[0];
      const res = await fetch(`/api/ghost-sites?city=${encodeURIComponent(cityName)}`);
      const data = await res.json();
      setGhostSites(data);
    } catch { /* silent */ }
  }, [activeCity]);

  useEffect(() => {
    if (showGhostSites) fetchGhostSites();
  }, [showGhostSites, fetchGhostSites]);

  const handleGhostSiteClick = (site: GhostSiteData) => {
    setSelectedGhostSite(site);
    setSelectedNode(null);
    setShowLens(true);
    setShowPulse(false);
    setNeighborhoodAnalysis(null);
    setRecommendation(null);
    setCaseStudies([]);
  };

  const handleAnalyzeNeighborhood = async () => {
    if (!selectedGhostSite) return;
    setShowPulse(true);
    setPulseLoading(true);
    try {
      const res = await fetch('/api/analyze-neighborhood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude: selectedGhostSite.latitude, longitude: selectedGhostSite.longitude }),
      });
      const analysis = await res.json();
      setNeighborhoodAnalysis(analysis);

      // Auto-trigger recommendation
      const recRes = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ghostSiteId: selectedGhostSite.id }),
      });
      const recData = await recRes.json();
      setRecommendation(recData.recommendation || null);
      setCaseStudies(recData.caseStudies || []);
    } catch { /* silent */ }
    setPulseLoading(false);
  };

  // ── Right-Click: Analyze This Area ──
  const handleContextMenu = useCallback((e: MapMouseEvent) => {
    e.originalEvent.preventDefault();
    setContextMenu({ x: e.point.x, y: e.point.y, lat: e.lngLat.lat, lng: e.lngLat.lng });
  }, []);

  const handleAnalyzeArea = async (lat: number, lng: number) => {
    setContextMenu(null);
    setSelectedNode(null);
    setSelectedGhostSite(null);
    setSelectedArchiveEntry(null);
    setShowLens(false);
    setShowPulse(true);
    setPulseLoading(true);
    try {
      const res = await fetch('/api/analyze-neighborhood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude: lat, longitude: lng }),
      });
      const analysis = await res.json();
      setNeighborhoodAnalysis(analysis);
    } catch { /* silent */ }
    setPulseLoading(false);
  };

  // ── Archive Entries ──
  const fetchArchiveEntries = useCallback(async () => {
    try {
      const cityName = PILOT_CITIES[activeCity].label.split(',')[0];
      const res = await fetch(`/api/archive?city=${encodeURIComponent(cityName)}&limit=100`);
      const data = await res.json();
      setArchiveEntries(Array.isArray(data) ? data : []);
    } catch { /* silent */ }
  }, [activeCity]);

  useEffect(() => {
    if (showArchive) fetchArchiveEntries();
  }, [showArchive, fetchArchiveEntries]);

  const handleArchiveEntryClick = (entry: ArchiveEntryData) => {
    setSelectedArchiveEntry(entry);
    setSelectedNode(null);
    setSelectedGhostSite(null);
    setShowLens(true);
    setShowPulse(false);
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
      /* silent */
    }
  };

  // ── Amenity click handler ──
  const handleAmenityClick = useCallback((e: MapMouseEvent) => {
    const feature = e.features?.[0];
    if (!feature || !feature.properties) return;
    const props = feature.properties;
    const geom = feature.geometry;
    let lng = e.lngLat.lng;
    let lat = e.lngLat.lat;
    if (geom.type === 'Point') {
      [lng, lat] = (geom as GeoJSON.Point).coordinates;
    }
    setSelectedAmenity({
      name: props.name,
      description: props.description,
      category: props.category,
      color: props.color,
      photoUrl: props.photoUrl || undefined,
      lng, lat,
    });
  }, []);

  const mapStyle = isDark
    ? 'mapbox://styles/mapbox/dark-v11'
    : 'mapbox://styles/mapbox/light-v11';

  const totalFilters = activeTypologies.size + activeAmenities.size + (showParcels ? 1 : 0) + (showGhostSites ? 1 : 0) + (showArchive ? 1 : 0);
  const maxFilters = 3 + 6 + 3;

  return (
    <div className={`relative h-screen w-screen overflow-hidden ${isDark ? '' : 'light'}`}>
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        {...viewState}
        onMove={(e) => setViewState(e.viewState)}
        onLoad={handleMapLoad}
        onMouseDown={handleModelMouseDown}
        onMouseUp={handleModelMouseUp}
        onDblClick={handleModelDblClick}
        onMouseMove={(e) => {
          handleModelMouseMove(e);
          if (!modelDragStateRef.current?.active && !modelRotateMode) {
            setCursorCoords({ lat: e.lngLat.lat, lng: e.lngLat.lng });
            if (mapInstanceRef.current) {
              setModelHovered(isNearModel(mapInstanceRef.current, e.point));
            }
          } else {
            setCursorCoords({ lat: e.lngLat.lat, lng: e.lngLat.lng });
          }
        }}
        onClick={(e) => {
          if (justDraggedRef.current) { justDraggedRef.current = false; return; }
          // Single click exits rotate mode
          if (modelRotateMode) {
            setModelRotateMode(false);
            setModelInteracting(null);
            mapInstanceRef.current?.dragPan.enable();
            saveModelPlacement();
            return;
          }
          setContextMenu(null);
          if (e.features?.length && e.features[0].layer?.id === 'amenity-points') {
            handleAmenityClick(e as MapMouseEvent);
          } else {
            setSelectedAmenity(null);
            handleMapClick(e);
          }
        }}
        onContextMenu={(e) => {
          if (modelRotateMode) {
            setModelRotateMode(false);
            setModelInteracting(null);
            mapInstanceRef.current?.dragPan.enable();
            saveModelPlacement();
            return;
          }
          if (modelDragStateRef.current?.active) {
            modelDragStateRef.current = null;
            setModelInteracting(null);
            mapInstanceRef.current?.dragPan.enable();
            return;
          }
          handleContextMenu(e);
        }}
        mapStyle={mapStyle}
        interactiveLayerIds={['amenity-points']}
        cursor={
          submissionStep === 'placing'
            ? 'crosshair'
            : modelInteracting === 'rotate'
              ? 'ew-resize'
              : modelInteracting === 'drag'
                ? 'grabbing'
                : modelHovered
                  ? 'pointer'
                  : 'grab'
        }
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="top-right" showCompass={false} />

        {/* ── Draw Control ── */}
        {submissionStep === 'drawing' && (
          <DrawControl
            onCreate={handleDrawCreate}
            onUpdate={handleDrawCreate}
            onDelete={() => setDrawnBoundary(null)}
            position="top-left"
          />
        )}

        {/* ── Land Parcel Boundaries ── */}
        {showParcels && (
          <Source id="parcels" type="vector" url="mapbox://mapbox.mapbox-streets-v8">
            <Layer
              id="parcel-boundaries"
              type="line"
              source-layer="building"
              minzoom={14}
              paint={{
                'line-color': isDark ? 'rgba(34, 211, 238, 0.25)' : 'rgba(59, 130, 246, 0.3)',
                'line-width': 0.8,
              }}
            />
            <Layer
              id="parcel-fill"
              type="fill"
              source-layer="building"
              minzoom={14}
              paint={{
                'fill-color': isDark ? 'rgba(34, 211, 238, 0.03)' : 'rgba(59, 130, 246, 0.04)',
              }}
            />
          </Source>
        )}

        {/* ── Clip Layers (Remove default buildings) ── */}
        {activeCity === 'st-kilda' && (
          <Source id="st-kilda-clip" type="geojson" data={stKildaClipGeoJSON}>
            <Layer
              id="st-kilda-clip-layer"
              type="clip"
              layout={{
                'clip-layer-types': ['symbol', 'model'],
              }}
            />
          </Source>
        )}

        {/* ── Amenity Layers ── */}
        <Source id="amenities" type="geojson" data={filteredAmenitiesGeoJSON}>
          <Layer id="amenity-polygon-fill" type="fill" filter={['==', ['geometry-type'], 'Polygon']} paint={{ 'fill-color': ['get', 'color'], 'fill-opacity': 0.1 }} />
          <Layer id="amenity-polygon-stroke" type="line" filter={['==', ['geometry-type'], 'Polygon']} paint={{ 'line-color': ['get', 'color'], 'line-width': 1.5, 'line-opacity': 0.5 }} />
          <Layer id="amenity-polygon-glow" type="line" filter={['==', ['geometry-type'], 'Polygon']} paint={{ 'line-color': ['get', 'color'], 'line-width': 6, 'line-opacity': 0.08, 'line-blur': 4 }} />
          <Layer id="amenity-line-stroke" type="line" filter={['==', ['geometry-type'], 'LineString']} paint={{ 'line-color': ['get', 'color'], 'line-width': 3, 'line-opacity': 0.7 }} />
          <Layer id="amenity-line-glow" type="line" filter={['==', ['geometry-type'], 'LineString']} paint={{ 'line-color': ['get', 'color'], 'line-width': 10, 'line-opacity': 0.12, 'line-blur': 5 }} />
          <Layer id="amenity-points" type="circle" filter={['==', ['geometry-type'], 'Point']} paint={{ 'circle-color': ['get', 'color'], 'circle-radius': 5, 'circle-opacity': 0.9, 'circle-stroke-width': 1.5, 'circle-stroke-color': ['get', 'color'], 'circle-stroke-opacity': 0.3 }} />
          <Layer id="amenity-points-glow" type="circle" filter={['==', ['geometry-type'], 'Point']} paint={{ 'circle-color': ['get', 'color'], 'circle-radius': 18, 'circle-opacity': 0.06, 'circle-blur': 1 }} />
        </Source>

        <Source id="amenity-labels" type="geojson" data={filteredAmenitiesGeoJSON}>
          <Layer
            id="amenity-label-text"
            type="symbol"
            filter={['any', ['==', ['geometry-type'], 'Point'], ['==', ['geometry-type'], 'Polygon']]}
            layout={{ 'text-field': ['get', 'name'], 'text-size': 10, 'text-offset': [0, 1.4], 'text-anchor': 'top', 'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'], 'text-allow-overlap': false }}
            paint={{ 'text-color': ['get', 'color'], 'text-opacity': 0.6, 'text-halo-color': isDark ? '#000000' : '#ffffff', 'text-halo-width': 1.2 }}
          />
        </Source>

        {/* ── Search Zones (neighborhood investment zones) ── */}
        <Source id="search-zones" type="geojson" data={searchZonesGeoJSON}>
          <Layer
            id="search-zone-fill"
            type="fill"
            paint={{
              'fill-color': ['get', 'color'],
              'fill-opacity': isDark ? 0.06 : 0.08,
            }}
          />
          <Layer
            id="search-zone-stroke"
            type="line"
            paint={{
              'line-color': ['get', 'color'],
              'line-width': 1.5,
              'line-opacity': 0.4,
              'line-dasharray': [4, 2],
            }}
          />
          <Layer
            id="search-zone-label"
            type="symbol"
            layout={{
              'text-field': ['get', 'name'],
              'text-size': 11,
              'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
              'text-allow-overlap': false,
            }}
            paint={{
              'text-color': isDark ? '#ff8033' : '#c45a1a',
              'text-opacity': 0.7,
              'text-halo-color': isDark ? '#000000' : '#ffffff',
              'text-halo-width': 1,
            }}
          />
        </Source>

        {/* ── Radius Lines (nearest amenities) ── */}
        {radiusLinesGeoJSON && (
          <Source id="radius-lines" type="geojson" data={radiusLinesGeoJSON}>
            <Layer
              id="radius-line"
              type="line"
              paint={{
                'line-color': isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)',
                'line-width': 1,
                'line-dasharray': [4, 4],
              }}
            />
            <Layer
              id="radius-label"
              type="symbol"
              layout={{
                'symbol-placement': 'line-center',
                'text-field': ['get', 'distance'],
                'text-size': 10,
                'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
              }}
              paint={{
                'text-color': isDark ? '#ffffff' : '#1a1a2e',
                'text-halo-color': isDark ? '#000000' : '#ffffff',
                'text-halo-width': 1,
              }}
            />
          </Source>
        )}

        {/* ── Node Boundary Polygons ── */}
        {nodeBoundariesGeoJSON.features.length > 0 && (
          <Source id="node-boundaries" type="geojson" data={nodeBoundariesGeoJSON}>
            <Layer
              id="node-boundary-fill"
              type="fill"
              paint={{
                'fill-color': ['get', 'color'],
                'fill-opacity': isDark ? 0.12 : 0.15,
              }}
            />
            <Layer
              id="node-boundary-stroke"
              type="line"
              paint={{
                'line-color': ['get', 'color'],
                'line-width': 2,
                'line-opacity': 0.7,
              }}
            />
            <Layer
              id="node-boundary-glow"
              type="line"
              paint={{
                'line-color': ['get', 'color'],
                'line-width': 8,
                'line-opacity': 0.1,
                'line-blur': 4,
              }}
            />
          </Source>
        )}

        {/* ── Node Markers ── */}
        {filteredNodes.map((n) => (
          <Marker
            key={n.id}
            latitude={n.latitude}
            longitude={n.longitude}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              handleNodeClick(n);
            }}
          >
            <div className="node-marker" data-typology={n.typology}>
              <div
                className="node-marker-inner"
                style={{
                  background: NODE_COLORS[n.typology],
                  boxShadow: `0 0 12px ${NODE_COLORS[n.typology]}80, 0 0 24px ${NODE_COLORS[n.typology]}33`,
                  borderColor: `${NODE_COLORS[n.typology]}66`,
                }}
              />
              {n.seekingCapital && <span className="node-badge-capital">$</span>}
              {n.isDistressed && <span className="node-badge-distressed">!</span>}
              {n.isFreeOffer && <span className="node-badge-free">F</span>}
            </div>
          </Marker>
        ))}

        {/* ── Ghost Site Markers ── */}
        {showGhostSites && ghostSites.map((gs) => (
          <Marker
            key={gs.id}
            latitude={gs.latitude}
            longitude={gs.longitude}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              handleGhostSiteClick(gs);
            }}
          >
            <div
              className="ghost-site-marker"
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: `rgba(248, 113, 113, ${parseFloat(gs.abandonmentProbability)})`,
                border: '2px solid rgba(248, 113, 113, 0.6)',
                boxShadow: `0 0 12px rgba(248, 113, 113, ${parseFloat(gs.abandonmentProbability) * 0.5})`,
                cursor: 'pointer',
                animation: 'pulse-ring 3s ease-in-out infinite',
              }}
            />
          </Marker>
        ))}

        {/* ── Archive Entry Markers ── */}
        {showArchive && archiveEntries.map((ae) => (
          <Marker
            key={ae.id}
            latitude={ae.latitude}
            longitude={ae.longitude}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              handleArchiveEntryClick(ae);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" style={{ cursor: 'pointer', filter: 'drop-shadow(0 0 6px rgba(255, 208, 38, 0.5))' }}>
              <polygon
                points="10,1 13,7 19,8 14.5,12.5 16,19 10,15.5 4,19 5.5,12.5 1,8 7,7"
                fill={ae.isConversion ? '#b07aff' : '#ffd026'}
                stroke={ae.isConversion ? '#b07aff' : '#ffd026'}
                strokeWidth="0.5"
                opacity="0.9"
              />
            </svg>
          </Marker>
        ))}

        {/* ── Pin Placement ── */}
        {pinLocation && submissionStep !== 'idle' && (
          <Marker latitude={pinLocation.latitude} longitude={pinLocation.longitude} anchor="center">
            <div className="placement-marker">
              <div className="placement-marker-inner" />
            </div>
          </Marker>
        )}

        {/* ── Amenity Popup ── */}
        {selectedAmenity && (
          <Popup
            latitude={selectedAmenity.lat}
            longitude={selectedAmenity.lng}
            anchor="bottom"
            onClose={() => setSelectedAmenity(null)}
            closeOnClick={false}
            maxWidth="320px"
            className="amenity-popup"
          >
            <div style={{ background: isDark ? '#0a0e1a' : '#ffffff', borderRadius: '8px', overflow: 'hidden', minWidth: '260px' }}>
              {selectedAmenity.photoUrl && (
                <div style={{ width: '100%', height: '160px', overflow: 'hidden' }}>
                  <img
                    src={selectedAmenity.photoUrl}
                    alt={selectedAmenity.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
              <div style={{ padding: '12px 14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: selectedAmenity.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: selectedAmenity.color }}>
                    {selectedAmenity.category}
                  </span>
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: isDark ? '#e8eaf0' : '#1a1a2e', margin: '0 0 4px 0' }}>
                  {selectedAmenity.name}
                </h3>
                <p style={{ fontSize: '12px', lineHeight: '1.5', color: isDark ? '#8c95a4' : '#555', margin: 0 }}>
                  {selectedAmenity.description}
                </p>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      {/* ── Vignette ── */}
      <div className="vignette" />

      {/* ── Context Menu ── */}
      {contextMenu && (
        <div
          className="absolute z-40 fade-in"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <div className="glass-panel py-1 min-w-[180px]">
            <button
              onClick={() => handleAnalyzeArea(contextMenu.lat, contextMenu.lng)}
              className="w-full px-4 py-2.5 text-left font-mono text-[10px] tracking-[0.1em] uppercase text-[#22d3ee] hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              Analyze This Area
            </button>
          </div>
        </div>
      )}

      {/* ── Theme Toggle ── */}
      <button
        onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        className="theme-toggle"
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {isDark ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
        )}
      </button>

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

      {/* ── City Selector ── */}
      <div className="absolute top-16 left-4 z-20 flex gap-1.5">
        {(Object.keys(PILOT_CITIES) as PilotCity[]).map((city) => (
          <button
            key={city}
            onClick={() => handleCitySwitch(city)}
            className={`px-3 py-1.5 rounded font-mono text-[10px] tracking-wider uppercase transition-all cursor-pointer ${
              activeCity === city
                ? 'bg-[#22d3ee]/15 text-[#22d3ee] border border-[#22d3ee]/30'
                : 'bg-black/30 text-[#5a6a80] border border-white/5 hover:border-white/10 hover:text-[#8c95a4]'
            }`}
            style={{ backdropFilter: 'blur(8px)' }}
          >
            {PILOT_CITIES[city].label}
          </button>
        ))}
      </div>

      {/* ── Filter Dropdown ── */}
      <div className="filter-container">
        <button
          onClick={() => setFilterOpen((v) => !v)}
          className={`filter-toggle ${filterOpen ? 'filter-toggle-active' : ''}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" /></svg>
          <span>FILTER</span>
          {totalFilters < maxFilters && <span className="filter-badge">{totalFilters}</span>}
        </button>
        {filterOpen && (
          <div className="filter-dropdown fade-in">
            <div className="filter-section">
              <p className="filter-section-label">Node Types</p>
              <div className="filter-chips">
                {([
                  { key: 'society' as Typology, label: 'Society', color: NODE_COLORS.society },
                  { key: 'asset' as Typology, label: 'Asset', color: NODE_COLORS.asset },
                  { key: 'facility' as Typology, label: 'Facility', color: NODE_COLORS.facility },
                ]).map((t) => (
                  <button
                    key={t.key}
                    onClick={() => toggleTypology(t.key)}
                    className={`filter-chip ${activeTypologies.has(t.key) ? 'filter-chip-active' : ''}`}
                    style={activeTypologies.has(t.key) ? { borderColor: `${t.color}66`, color: t.color } : {}}
                  >
                    <span className="filter-chip-dot" style={{ background: activeTypologies.has(t.key) ? t.color : 'rgba(255,255,255,0.15)' }} />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-divider" />
            <div className="filter-section">
              <p className="filter-section-label">Layers</p>
              <div className="filter-chips">
                <button onClick={() => setShowParcels((v) => !v)} className={`filter-chip ${showParcels ? 'filter-chip-active' : ''}`} style={showParcels ? { borderColor: 'rgba(34,211,238,0.4)', color: '#22d3ee' } : {}}>
                  <span className="filter-chip-dot" style={{ background: showParcels ? '#22d3ee' : 'rgba(255,255,255,0.15)' }} />
                  Parcels
                </button>
                <button onClick={() => setShowGhostSites((v) => !v)} className={`filter-chip ${showGhostSites ? 'filter-chip-active' : ''}`} style={showGhostSites ? { borderColor: 'rgba(248,113,113,0.4)', color: '#f87171' } : {}}>
                  <span className="filter-chip-dot" style={{ background: showGhostSites ? '#f87171' : 'rgba(255,255,255,0.15)' }} />
                  Ghost Sites
                </button>
                <button onClick={() => setShowArchive((v) => !v)} className={`filter-chip ${showArchive ? 'filter-chip-active' : ''}`} style={showArchive ? { borderColor: 'rgba(255,208,38,0.4)', color: '#ffd026' } : {}}>
                  <span className="filter-chip-dot" style={{ background: showArchive ? '#ffd026' : 'rgba(255,255,255,0.15)' }} />
                  Archive
                </button>
              </div>
            </div>
            <div className="filter-divider" />
            <div className="filter-section">
              <p className="filter-section-label">Amenities</p>
              <div className="filter-chips">
                {([
                  { key: 'park', label: 'Parks', color: '#2ee672' },
                  { key: 'architecture', label: 'Architecture', color: '#b07aff' },
                  { key: 'transit', label: 'Transit', color: '#22d3ee' },
                  { key: 'institution', label: 'Institutions', color: '#ff5aad' },
                  { key: 'faith', label: 'Faith', color: '#e8a838' },
                  { key: 'housing', label: 'Housing', color: '#8b95a4' },
                ]).map((a) => (
                  <button key={a.key} onClick={() => toggleAmenity(a.key)} className={`filter-chip ${activeAmenities.has(a.key) ? 'filter-chip-active' : ''}`} style={activeAmenities.has(a.key) ? { borderColor: `${a.color}66`, color: a.color } : {}}>
                    <span className="filter-chip-dot" style={{ background: activeAmenities.has(a.key) ? a.color : 'rgba(255,255,255,0.15)' }} />
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Typology Selector ── */}
      {submissionStep === 'select-type' && (
        <div className="absolute inset-0 z-30 flex items-center justify-center fade-in">
          <div className="absolute inset-0 bg-black/40" onClick={handleCancel} />
          <div className="relative glass-panel p-6 w-[340px]">
            <h3 className="font-mono text-xs tracking-[0.2em] text-text-dim uppercase mb-1">Signal Node</h3>
            <p className="text-sm text-text-primary mb-5">Select node type</p>
            <div className="space-y-2.5">
              {([
                { key: 'society' as Typology, label: 'Society', desc: 'Community, pop-up city, or base', color: NODE_COLORS.society },
                { key: 'asset' as Typology, label: 'Asset', desc: 'Land, building, or distressed property', color: NODE_COLORS.asset },
                { key: 'facility' as Typology, label: 'Facility', desc: 'Coworking, garage, or shared space', color: NODE_COLORS.facility },
              ]).map((t) => (
                <button
                  key={t.key}
                  onClick={() => handleSelectTypology(t.key)}
                  className="typology-select-btn"
                  style={{ borderColor: `${t.color}33` }}
                >
                  <span className="typology-select-dot" style={{ background: t.color }} />
                  <div className="text-left">
                    <span className="text-sm font-medium text-text-bright">{t.label}</span>
                    <span className="block text-[11px] text-text-dim mt-0.5">{t.desc}</span>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={handleCancel} className="w-full mt-4 text-center text-xs text-text-dim font-mono tracking-wider hover:text-text-primary transition-colors cursor-pointer">CANCEL</button>
          </div>
        </div>
      )}

      {/* ── Choose Placement Method ── */}
      {submissionStep === 'choose-method' && selectedTypology && (
        <div className="absolute inset-0 z-30 flex items-center justify-center fade-in">
          <div className="absolute inset-0 bg-black/40" onClick={handleCancel} />
          <div className="relative glass-panel p-6 w-[340px]">
            <h3 className="font-mono text-xs tracking-[0.2em] text-text-dim uppercase mb-1">Placement Method</h3>
            <p className="text-sm text-text-primary mb-5">How do you want to mark this node?</p>
            <div className="space-y-2.5">
              <button
                onClick={handleChoosePin}
                className="typology-select-btn"
                style={{ borderColor: `${NODE_COLORS[selectedTypology]}33` }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={NODE_COLORS[selectedTypology]} strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <div className="text-left">
                  <span className="text-sm font-medium text-text-bright">Drop Pin</span>
                  <span className="block text-[11px] text-text-dim mt-0.5">Click the map to place a single point</span>
                </div>
              </button>
              <button
                onClick={handleChooseDraw}
                className="typology-select-btn"
                style={{ borderColor: `${NODE_COLORS[selectedTypology]}33` }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={NODE_COLORS[selectedTypology]} strokeWidth="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
                <div className="text-left">
                  <span className="text-sm font-medium text-text-bright">Draw Boundary</span>
                  <span className="block text-[11px] text-text-dim mt-0.5">Click to draw a polygon shape on the map</span>
                </div>
              </button>
            </div>
            <button onClick={handleCancel} className="w-full mt-4 text-center text-xs text-text-dim font-mono tracking-wider hover:text-text-primary transition-colors cursor-pointer">CANCEL</button>
          </div>
        </div>
      )}

      {/* ── Placement / Drawing Instructions ── */}
      {submissionStep === 'placing' && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 fade-in">
          <div className="glass-panel px-5 py-3">
            <span className="font-mono text-xs tracking-[0.15em] uppercase" style={{ color: NODE_COLORS[selectedTypology!] }}>
              Click map to place pin
            </span>
          </div>
        </div>
      )}

      {submissionStep === 'drawing' && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 fade-in">
          <div className="glass-panel px-5 py-3">
            <span className="font-mono text-xs tracking-[0.15em] uppercase" style={{ color: NODE_COLORS[selectedTypology!] }}>
              Click to draw polygon &middot; Double-click to finish
            </span>
          </div>
        </div>
      )}

      {/* ── Cancel ── */}
      {(submissionStep === 'placing' || submissionStep === 'drawing') && (
        <button onClick={handleCancel} className="absolute bottom-10 right-8 z-20 glass-panel px-5 py-2.5 font-mono text-xs text-text-dim hover:text-text-primary tracking-wider transition-colors cursor-pointer">
          ESC &middot; CANCEL
        </button>
      )}

      {/* ── FAB ── */}
      {submissionStep === 'idle' && !selectedNode && (
        <button onClick={handleFABClick} className="fab-button">
          <span className="fab-icon">+</span>
          <span>SIGNAL NODE</span>
        </button>
      )}

      {/* ── Status Bar ── */}
      <div className="status-bar">
        <span className="font-mono text-[10px] text-text-dim tracking-wider">CLOUDTOTERRA v2.1</span>
        <span className="font-mono text-[10px] text-signal-green tracking-wider">&#x25CF; LIVE</span>
        {cursorCoords && (
          <span className="font-mono text-[10px] text-text-dim tracking-wider">
            {Math.abs(cursorCoords.lat).toFixed(4)}&deg;{cursorCoords.lat >= 0 ? 'N' : 'S'}&nbsp;&nbsp;{Math.abs(cursorCoords.lng).toFixed(4)}&deg;{cursorCoords.lng >= 0 ? 'E' : 'W'}
          </span>
        )}
        <span className="font-mono text-[10px] text-text-dim tracking-wider">
          {filteredNodes.length} NODE{filteredNodes.length !== 1 ? 'S' : ''}
        </span>
      </div>

      {/* ── Detail Drawer ── */}
      {selectedNode && (
        <DetailDrawer
          node={selectedNode}
          nearestAmenities={nearestAmenities}
          onClose={() => setSelectedNode(null)}
          isDark={isDark}
        />
      )}

      {/* ── CivicPattern: Lens Panel (left) ── */}
      {showLens && (selectedGhostSite || selectedArchiveEntry) && (
        <LensPanel
          ghostSite={selectedGhostSite}
          archiveEntry={selectedArchiveEntry as Parameters<typeof LensPanel>[0]['archiveEntry']}
          onClose={() => { setShowLens(false); setSelectedGhostSite(null); setSelectedArchiveEntry(null); }}
          onAnalyzeNeighborhood={selectedGhostSite ? handleAnalyzeNeighborhood : undefined}
        />
      )}

      {/* ── CivicPattern: Pulse Panel (right) ── */}
      {showPulse && (
        <PulsePanel
          analysis={neighborhoodAnalysis as Parameters<typeof PulsePanel>[0]['analysis']}
          recommendation={recommendation as Parameters<typeof PulsePanel>[0]['recommendation']}
          caseStudies={(caseStudies || []) as unknown as Parameters<typeof PulsePanel>[0]['caseStudies']}
          onClose={() => { setShowPulse(false); setNeighborhoodAnalysis(null); setRecommendation(null); setCaseStudies([]); }}
          isLoading={pulseLoading}
        />
      )}

      {/* ── Submission Modal ── */}
      {submissionStep === 'form' && pinLocation && selectedTypology && (
        <SubmissionModal
          typology={selectedTypology}
          location={pinLocation}
          boundary={drawnBoundary}
          onClose={handleCancel}
          onSuccess={handleSubmissionSuccess}
        />
      )}
    </div>
  );
}
