declare module '@mapbox/mapbox-gl-draw' {
  import type { IControl } from 'mapbox-gl';

  interface DrawOptions {
    displayControlsDefault?: boolean;
    controls?: {
      point?: boolean;
      line_string?: boolean;
      polygon?: boolean;
      trash?: boolean;
      combine_features?: boolean;
      uncombine_features?: boolean;
    };
    defaultMode?: string;
    styles?: object[];
  }

  class MapboxDraw implements IControl {
    constructor(options?: DrawOptions);
    onAdd(map: mapboxgl.Map): HTMLElement;
    onRemove(map: mapboxgl.Map): void;
    getDefaultPosition(): 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    getAll(): GeoJSON.FeatureCollection;
    add(geojson: GeoJSON.Feature | GeoJSON.FeatureCollection): string[];
    delete(ids: string | string[]): this;
    deleteAll(): this;
    set(featureCollection: GeoJSON.FeatureCollection): string[];
    changeMode(mode: string, options?: object): this;
  }

  export default MapboxDraw;
}
