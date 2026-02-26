declare module 'threebox-plugin' {
  import { Scene, Camera, WebGLRenderer, Object3D, Group, Color, Light, AnimationMixer, AnimationAction } from 'three';
  import { Map, CustomLayerInterface } from 'mapbox-gl';

  export interface ThreeboxOptions {
    defaultLights?: boolean;
    passiveRendering?: boolean;
    enableSelectingFeatures?: boolean;
    enableSelectingObjects?: boolean;
    enableDraggingObjects?: boolean;
    enableRotatingObjects?: boolean;
    enableTooltips?: boolean;
    multiLayer?: boolean;
    orthographic?: boolean;
    fov?: number;
    realSunlight?: boolean;
    sky?: boolean;
    terrain?: boolean;
  }

  export class Threebox {
    constructor(map: Map, glContext: WebGLRenderingContext, options?: ThreeboxOptions);
    
    // Core properties
    map: Map;
    scene: Scene;
    camera: Camera;
    renderer: WebGLRenderer;
    
    // Methods (selection of common ones based on documentation)
    setupDefaultLights(): void;
    update(): void;
    add(obj: Object3D | Group): void;
    remove(obj: Object3D | Group): void;
    
    // Object creators
    loadModel(options: {
      type: string;
      obj: string;
      mtl?: string;
      units?: 'meters' | 'pixels';
      scale?: number;
      rotation?: { x: number; y: number; z: number };
      anchor?: string;
      adjustment?: { x: number; y: number; z: number };
      normalize?: boolean;
    }, callback: (model: any) => void): void;

    // ... add more as needed based on common usage
  }
}
