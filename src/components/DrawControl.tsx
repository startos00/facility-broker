'use client';

import { useControl } from 'react-map-gl/mapbox';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

interface DrawControlProps {
  onCreate: (e: { features: GeoJSON.Feature[] }) => void;
  onUpdate: (e: { features: GeoJSON.Feature[] }) => void;
  onDelete: () => void;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export default function DrawControl({ onCreate, onUpdate, onDelete, position = 'top-left' }: DrawControlProps) {
  useControl(
    () =>
      new MapboxDraw({
        displayControlsDefault: false,
        controls: { polygon: true, trash: true },
        defaultMode: 'draw_polygon',
      }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (context: any) => {
      const map = context.map.getMap();
      map.on('draw.create', onCreate);
      map.on('draw.update', onUpdate);
      map.on('draw.delete', onDelete);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (context: any) => {
      const map = context.map.getMap();
      map.off('draw.create', onCreate);
      map.off('draw.update', onUpdate);
      map.off('draw.delete', onDelete);
    },
    { position },
  );

  return null;
}
