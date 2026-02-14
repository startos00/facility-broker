'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const MapApp = dynamic(() => import('@/components/MapApp'), { ssr: false });

export default function MapPage() {
  useEffect(() => {
    document.body.classList.add('map-view');
    return () => document.body.classList.remove('map-view');
  }, []);

  return <MapApp />;
}
