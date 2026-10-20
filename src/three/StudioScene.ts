import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createChronographModel, MaterialFinish, Procedural3DModel } from './models/chronographModel';
import { createMonolithModel } from './models/monolithModel';
import { createAeroModel } from './models/aeroModel';
import { createContactShadowTexture } from './proceduralTextures';
import { studioAudio } from './audioSynthesizer';

export type SceneSubject = 'chronograph' | 'monolith' | 'aero';
export type CameraPreset = 'hero' | 'macro' | 'profile' | 'top';

export interface StudioSceneConfig {
  container: HTMLDivElement;
  initialSubject?: SceneSubject;
  initialFinish?: MaterialFinish;
  onFpsUpdate?: (fps: number) => void;
}

// Reusable zero-GC vectors at module scope
const _camTarget = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();

export class StudioScene {
  private container: HTMLDivElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private clock: THREE.Clock;

  private currentSubjectType: SceneSubject = 'chronograph';
  private currentModel: Procedural3DModel | null = null;
  private contactShadowMesh: THREE.Mesh | null = null;
  private contactShadowTex: THREE.CanvasTexture | null = null;

  private activeFinish: MaterialFinish = 'gold';
  private targetExplodedProgress: number = 0;
  private currentExplodedProgress: number = 0;
  private isAutoRotating: boolean = true;
  private isWireframe: boolean = false;

  // Camera preset damping targets
  private targetCamPos = new THREE.Vector3(0, 0.8, 5.6);
  private targetLookAt = new THREE.Vector3(0, 0, 0);
  private isUserInteracting = false;

  private animFrameId: number | null = null;
  private isDestroyed = false;

  // FPS measurement
  private frameCount = 0;
  private lastFpsCheck = 0;
  private onFpsUpdate?: (fps: number) => void;

  constructor(config: StudioSceneConfig) {
    this.container = config.container;
    this.onFpsUpdate = config.onFpsUpdate;
    if (config.initialSubject) this.currentSubjectType = config.initialSubject;
    if (config.initialFinish) this.activeFinish = config.initialFinish;

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Scene & Horizon Fog
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0A0A0C);
    this.scene.fog = new THREE.Fog(0x0A0A0C, 9, 22);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    this.camera.position.set(0, 0.8, 5.6);
    this.scene.add(this.camera);

    // 3. Renderer with Modern PBR Color Pipeline
    const isHeadless = typeof navigator !== 'undefined' && (navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent));
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = !isHeadless;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);

    // 4. Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Studio 3-Point Lighting Rig
    this.setupLighting();

    // 6. Ground Contact Shadow Plane
    this.setupContactShadow();

    // 7. OrbitControls with smooth damping
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 2.2;
    this.controls.maxDistance = 12.0;
    this.controls.maxPolarAngle = Math.PI / 2 + 0.15; // don't go below ground
    this.controls.autoRotate = this.isAutoRotating;
    this.controls.autoRotateSpeed = 0.8;

    this.controls.addEventListener('start', () => {
      this.isUserInteracting = true;
    });
    this.controls.addEventListener('end', () => {
      this.isUserInteracting = false;
      this.targetCamPos.copy(this.camera.position);
      this.targetLookAt.copy(this.controls.target);
    });

    this.clock = new THREE.Clock();

    // 8. Load initial procedural subject
    this.loadSubject(this.currentSubjectType);

    // Pre-warm shaders
    this.renderer.compile(this.scene, this.camera);

    // 9. Resize listener
    window.addEventListener('resize', this.handleResize);

    // 10. Start render loop
    this.animate();
  }

  private setupLighting() {
    // Warm Key Light with soft shadow map
    const keyLight = new THREE.DirectionalLight(0xFFF0D4, 2.6);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 16;
    keyLight.shadow.camera.left = -3;
    keyLight.shadow.camera.right = 3;
    keyLight.shadow.camera.top = 3;
    keyLight.shadow.camera.bottom = -3;
    keyLight.shadow.bias = -0.0004;
    keyLight.shadow.normalBias = 0.02;
    this.scene.add(keyLight);

    // Cool Fill Light (Hemisphere light: sky vs ground)
    const hemiLight = new THREE.HemisphereLight(0xD8E4F8, 0x1A1410, 0.85);
    hemiLight.position.set(0, 10, 0);
    this.scene.add(hemiLight);

    // Rim / Backlight for razor-sharp specular bevel contours
    const rimLight = new THREE.DirectionalLight(0xD6B878, 1.8);
    rimLight.position.set(-4, 3, -4);
    this.scene.add(rimLight);

    // Subtle front fill
    const frontLight = new THREE.DirectionalLight(0xFFFFFF, 0.6);
    frontLight.position.set(0, 0, 5);
    this.scene.add(frontLight);
  }

  private setupContactShadow() {
    this.contactShadowTex = createContactShadowTexture();
    const shadowGeom = new THREE.PlaneGeometry(6.5, 6.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: this.contactShadowTex,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    this.contactShadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
    this.contactShadowMesh.rotation.x = -Math.PI / 2;
    this.contactShadowMesh.position.y = -2.25;
    this.contactShadowMesh.renderOrder = 0;
    this.scene.add(this.contactShadowMesh);
  }

  public loadSubject(subject: SceneSubject) {
    if (this.currentModel) {
      this.scene.remove(this.currentModel.group);
      this.currentModel.dispose();
      this.currentModel = null;
    }

    this.currentSubjectType = subject;

    if (subject === 'chronograph') {
      this.currentModel = createChronographModel();
      if (this.contactShadowMesh) this.contactShadowMesh.position.y = -2.25;
    } else if (subject === 'monolith') {
      this.currentModel = createMonolithModel();
      if (this.contactShadowMesh) this.contactShadowMesh.position.y = -2.35;
    } else if (subject === 'aero') {
      this.currentModel = createAeroModel();
      if (this.contactShadowMesh) this.contactShadowMesh.position.y = -1.6;
    }

    if (this.currentModel) {
      this.currentModel.setFinish(this.activeFinish);
      this.currentModel.setWireframe(this.isWireframe);
      this.scene.add(this.currentModel.group);
    }
  }

  public setExplodedProgress(progress: number) {
    this.targetExplodedProgress = Math.max(0, Math.min(1, progress));
  }

  public setFinish(finish: MaterialFinish) {
    this.activeFinish = finish;
    if (this.currentModel) {
      this.currentModel.setFinish(finish);
    }
  }

  public setWireframe(wireframe: boolean) {
    this.isWireframe = wireframe;
    if (this.currentModel) {
      this.currentModel.setWireframe(wireframe);
    }
  }

  public setAutoRotate(rotate: boolean) {
    this.isAutoRotating = rotate;
    this.controls.autoRotate = rotate;
  }

  public applyCameraPreset(preset: CameraPreset) {
    this.setAutoRotate(false);
    studioAudio.playGlideChime(480);

    if (this.currentSubjectType === 'chronograph') {
      if (preset === 'hero') {
        this.targetCamPos.set(0, 0.8, 5.6);
        this.targetLookAt.set(0, 0, 0);
      } else if (preset === 'macro') {
        // Zoom in on tourbillon mechanism at bottom of dial
        this.targetCamPos.set(0, -0.65, 2.3);
        this.targetLookAt.set(0, -0.65, 0.2);
      } else if (preset === 'profile') {
        // Crown profile side view
        this.targetCamPos.set(4.6, 0.4, 1.8);
        this.targetLookAt.set(0, 0, 0);
      } else if (preset === 'top') {
        // Direct architectural dial face
        this.targetCamPos.set(0, 0.01, 5.2);
        this.targetLookAt.set(0, 0, 0);
      }
    } else if (this.currentSubjectType === 'monolith') {
      if (preset === 'hero') {
        this.targetCamPos.set(0, 0.8, 6.2);
        this.targetLookAt.set(0, 0, 0);
      } else if (preset === 'macro') {
        // Core crystal close-up
        this.targetCamPos.set(0, 0.9, 2.5);
        this.targetLookAt.set(0, 0.9, 0);
      } else if (preset === 'profile') {
        this.targetCamPos.set(4.5, 0.5, 3.2);
        this.targetLookAt.set(0, 0, 0);
      } else if (preset === 'top') {
        this.targetCamPos.set(0, 6.2, 0.01);
        this.targetLookAt.set(0, 0, 0);
      }
    } else {
      // Aero
      if (preset === 'hero') {
        this.targetCamPos.set(3.2, 1.4, 4.8);
        this.targetLookAt.set(0, 0, 0);
      } else if (preset === 'macro') {
        this.targetCamPos.set(0, 0.6, 2.0);
        this.targetLookAt.set(0, 0.3, 0.4);
      } else if (preset === 'profile') {
        this.targetCamPos.set(5.5, 0.2, 0);
        this.targetLookAt.set(0, 0, 0);
      } else if (preset === 'top') {
        this.targetCamPos.set(0, 6.8, 0.01);
        this.targetLookAt.set(0, 0, 0);
      }
    }
  }

  private handleResize = () => {
    if (this.isDestroyed || !this.container) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private animate = () => {
    if (this.isDestroyed) return;
    this.animFrameId = requestAnimationFrame(this.animate);

    const delta = Math.min(this.clock.getDelta(), 0.1);
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Smoothly interpolate exploded progress
    this.currentExplodedProgress = THREE.MathUtils.damp(
      this.currentExplodedProgress,
      this.targetExplodedProgress,
      8,
      delta
    );

    // 2. Smoothly glide camera toward target preset if not actively user-orbiting
    if (!this.isUserInteracting) {
      this.camera.position.x = THREE.MathUtils.damp(this.camera.position.x, this.targetCamPos.x, 4, delta);
      this.camera.position.y = THREE.MathUtils.damp(this.camera.position.y, this.targetCamPos.y, 4, delta);
      this.camera.position.z = THREE.MathUtils.damp(this.camera.position.z, this.targetCamPos.z, 4, delta);

      this.controls.target.x = THREE.MathUtils.damp(this.controls.target.x, this.targetLookAt.x, 4, delta);
      this.controls.target.y = THREE.MathUtils.damp(this.controls.target.y, this.targetLookAt.y, 4, delta);
      this.controls.target.z = THREE.MathUtils.damp(this.controls.target.z, this.targetLookAt.z, 4, delta);
    }

    // 3. Update active 3D model
    if (this.currentModel) {
      this.currentModel.update(elapsedTime, delta, this.currentExplodedProgress);
    }

    // 4. Update controls
    this.controls.update();

    // 5. Render
    this.renderer.render(this.scene, this.camera);

    // 6. FPS counter callback
    this.frameCount++;
    if (elapsedTime - this.lastFpsCheck >= 1.0) {
      if (this.onFpsUpdate) {
        this.onFpsUpdate(Math.round((this.frameCount / (elapsedTime - this.lastFpsCheck))));
      }
      this.frameCount = 0;
      this.lastFpsCheck = elapsedTime;
    }
  };

  public dispose() {
    this.isDestroyed = true;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
    window.removeEventListener('resize', this.handleResize);

    if (this.currentModel) {
      this.scene.remove(this.currentModel.group);
      this.currentModel.dispose();
      this.currentModel = null;
    }

    if (this.contactShadowMesh) {
      this.scene.remove(this.contactShadowMesh);
      this.contactShadowMesh.geometry.dispose();
      (this.contactShadowMesh.material as THREE.Material).dispose();
      this.contactShadowTex?.dispose();
    }

    this.controls.dispose();
    this.renderer.dispose();

    if (this.container && this.renderer.domElement.parentElement === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
