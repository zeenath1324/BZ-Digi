import * as THREE from 'three';
import { MaterialFinish, Procedural3DModel } from './chronographModel';
import { createBrushedMetalTexture } from '../proceduralTextures';

export function createAeroModel(): Procedural3DModel {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'Aero_Concept_Root';

  const brushedMap = createBrushedMetalTexture();

  const finishColors: Record<MaterialFinish, { body: number; trim: number; engine: number }> = {
    gold: { body: 0x1E1B16, trim: 0xD6B878, engine: 0x2A2722 },
    dark: { body: 0x141517, trim: 0x7E8794, engine: 0x1B1D20 },
    rose: { body: 0x1F1A1B, trim: 0xE2A499, engine: 0x292224 },
    platinum: { body: 0x181A1D, trim: 0xDFE3E8, engine: 0x282C32 },
  };

  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: finishColors.gold.body,
    metalness: 0.94,
    roughness: 0.22,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
    normalMap: brushedMap,
    normalScale: new THREE.Vector2(0.04, 0.04),
  });

  const goldTrimMaterial = new THREE.MeshPhysicalMaterial({
    color: finishColors.gold.trim,
    metalness: 0.98,
    roughness: 0.12,
    clearcoat: 0.8,
  });

  const canopyMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x050810,
    transmission: 0.9,
    roughness: 0.04,
    ior: 1.6,
    thickness: 1.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    transparent: true,
    opacity: 0.88,
  });

  const turbineGlowMaterial = new THREE.MeshStandardMaterial({
    color: 0xF5DEB3,
    emissive: 0xD6B878,
    emissiveIntensity: 0.8,
    roughness: 0.2,
    metalness: 0.8,
  });

  interface ExplodedPart {
    object: THREE.Object3D;
    base: { x: number; y: number; z: number };
    offset: { x: number; y: number; z: number };
  }
  const parts: ExplodedPart[] = [];

  // ==========================================
  // PART 1: Main Supersonic Fuselage Hull
  // ==========================================
  const fuselageGroup = new THREE.Group();
  fuselageGroup.name = 'Part_1_Fuselage';

  // Needle nose & main cabin body
  const bodyGeom = new THREE.ConeGeometry(0.55, 3.8, 32);
  bodyGeom.rotateX(-Math.PI / 2);
  const bodyMesh = new THREE.Mesh(bodyGeom, bodyMaterial);
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  fuselageGroup.add(bodyMesh);

  // Aft fuselage cylinder
  const aftGeom = new THREE.CylinderGeometry(0.55, 0.42, 1.8, 32);
  aftGeom.rotateX(Math.PI / 2);
  const aftMesh = new THREE.Mesh(aftGeom, bodyMaterial);
  aftMesh.position.z = -1.8;
  aftMesh.castShadow = true;
  fuselageGroup.add(aftMesh);

  rootGroup.add(fuselageGroup);
  parts.push({
    object: fuselageGroup,
    base: { x: 0, y: 0, z: 0 },
    offset: { x: 0, y: 0, z: 0 },
  });

  // ==========================================
  // PART 2: Swept Titanium Wings & Gold Strakes
  // ==========================================
  const wingsGroup = new THREE.Group();
  wingsGroup.name = 'Part_2_Wings';

  const wingShape = new THREE.Shape();
  wingShape.moveTo(0, 0);
  wingShape.lineTo(2.8, -1.8);
  wingShape.lineTo(2.6, -2.4);
  wingShape.lineTo(0, -1.6);
  wingShape.closePath();

  const wingGeom = new THREE.ExtrudeGeometry(wingShape, {
    depth: 0.06,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.02,
    bevelThickness: 0.02,
  });
  wingGeom.center();
  wingGeom.rotateX(-Math.PI / 2);

  const rightWing = new THREE.Mesh(wingGeom, bodyMaterial);
  rightWing.position.set(1.4, -0.05, -0.8);
  rightWing.castShadow = true;

  const leftWing = rightWing.clone();
  leftWing.scale.x = -1;
  leftWing.position.set(-1.4, -0.05, -0.8);

  // Leading edge gold strakes
  const strakeGeom = new THREE.BoxGeometry(0.04, 0.04, 2.5);
  const rightStrake = new THREE.Mesh(strakeGeom, goldTrimMaterial);
  rightStrake.position.set(1.4, 0.02, -0.8);
  rightStrake.rotation.y = -0.65;

  const leftStrake = new THREE.Mesh(strakeGeom, goldTrimMaterial);
  leftStrake.position.set(-1.4, 0.02, -0.8);
  leftStrake.rotation.y = 0.65;

  wingsGroup.add(rightWing, leftWing, rightStrake, leftStrake);
  rootGroup.add(wingsGroup);
  parts.push({
    object: wingsGroup,
    base: { x: 0, y: 0, z: 0 },
    offset: { x: 0, y: -0.6, z: 0 },
  });

  // ==========================================
  // PART 3: Twin Turbofan Engine Nacelles
  // ==========================================
  const enginesGroup = new THREE.Group();
  enginesGroup.name = 'Part_3_Twin_Engines';

  const nacelleGeom = new THREE.CylinderGeometry(0.24, 0.22, 1.4, 24);
  nacelleGeom.rotateX(Math.PI / 2);

  const nacelleRight = new THREE.Mesh(nacelleGeom, goldTrimMaterial);
  nacelleRight.position.set(0.7, -0.1, -1.8);
  nacelleRight.castShadow = true;

  const nacelleLeft = new THREE.Mesh(nacelleGeom, goldTrimMaterial);
  nacelleLeft.position.set(-0.7, -0.1, -1.8);
  nacelleLeft.castShadow = true;

  // Spinning turbine fan disks
  const fanGeom = new THREE.CircleGeometry(0.2, 12);
  const fanRight = new THREE.Mesh(fanGeom, turbineGlowMaterial);
  fanRight.position.set(0.7, -0.1, -1.1);
  const fanLeft = new THREE.Mesh(fanGeom, turbineGlowMaterial);
  fanLeft.position.set(-0.7, -0.1, -1.1);

  enginesGroup.add(nacelleRight, nacelleLeft, fanRight, fanLeft);
  rootGroup.add(enginesGroup);
  parts.push({
    object: enginesGroup,
    base: { x: 0, y: 0, z: 0 },
    offset: { x: 0, y: 0, z: -1.2 },
  });

  // ==========================================
  // PART 4: Tinted Panoramic Sapphire Canopy
  // ==========================================
  const canopyGroup = new THREE.Group();
  canopyGroup.name = 'Part_4_Canopy';

  const canopyGeom = new THREE.SphereGeometry(0.38, 24, 16);
  canopyGeom.scale(0.8, 0.7, 2.2);
  const canopyMesh = new THREE.Mesh(canopyGeom, canopyMaterial);
  canopyMesh.position.set(0, 0.32, 0.4);
  canopyMesh.castShadow = true;
  canopyGroup.add(canopyMesh);

  rootGroup.add(canopyGroup);
  parts.push({
    object: canopyGroup,
    base: { x: 0, y: 0, z: 0 },
    offset: { x: 0, y: 1.1, z: 0.2 },
  });

  // ==========================================
  // PART 5: T-Tail Vertical Fin & Elevators
  // ==========================================
  const tailGroup = new THREE.Group();
  tailGroup.name = 'Part_5_Tail_Empennage';

  const finShape = new THREE.Shape();
  finShape.moveTo(0, 0);
  finShape.lineTo(0, 1.2);
  finShape.lineTo(0.5, 1.1);
  finShape.lineTo(0.9, 0);
  finShape.closePath();

  const finGeom = new THREE.ExtrudeGeometry(finShape, {
    depth: 0.05,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.015,
    bevelThickness: 0.015,
  });
  finGeom.center();
  finGeom.rotateY(Math.PI / 2);
  const verticalFin = new THREE.Mesh(finGeom, bodyMaterial);
  verticalFin.position.set(0, 0.6, -2.2);
  verticalFin.castShadow = true;

  // Horizontal stabilizer
  const stabGeom = new THREE.BoxGeometry(1.4, 0.04, 0.4);
  const horizontalStab = new THREE.Mesh(stabGeom, goldTrimMaterial);
  horizontalStab.position.set(0, 1.15, -2.4);

  tailGroup.add(verticalFin, horizontalStab);
  rootGroup.add(tailGroup);
  parts.push({
    object: tailGroup,
    base: { x: 0, y: 0, z: 0 },
    offset: { x: 0, y: 0.8, z: -0.8 },
  });

  function update(time: number, delta: number, explodedProgress: number) {
    // Smooth exploded displacement
    parts.forEach((p) => {
      const targetX = p.base.x + p.offset.x * explodedProgress;
      const targetY = p.base.y + p.offset.y * explodedProgress;
      const targetZ = p.base.z + p.offset.z * explodedProgress;

      p.object.position.x = THREE.MathUtils.damp(p.object.position.x, targetX, 8, delta);
      p.object.position.y = THREE.MathUtils.damp(p.object.position.y, targetY, 8, delta);
      p.object.position.z = THREE.MathUtils.damp(p.object.position.z, targetZ, 8, delta);
    });

    // Spinning turbine fans
    fanRight.rotation.z = time * 24;
    fanLeft.rotation.z = time * 24;

    // Gentle aerodynamic flight banking roll & pitch
    rootGroup.rotation.z = Math.sin(time * 0.8) * 0.06;
    rootGroup.rotation.x = Math.sin(time * 0.5) * 0.04 - 0.1;
  }

  function setFinish(finish: MaterialFinish) {
    const c = finishColors[finish];
    bodyMaterial.color.setHex(c.body);
    goldTrimMaterial.color.setHex(c.trim);
    turbineGlowMaterial.emissive.setHex(c.trim);
  }

  function setWireframe(wireframe: boolean) {
    bodyMaterial.wireframe = wireframe;
    goldTrimMaterial.wireframe = wireframe;
  }

  function dispose() {
    brushedMap.dispose();
    bodyGeom.dispose();
    aftGeom.dispose();
    wingGeom.dispose();
    strakeGeom.dispose();
    nacelleGeom.dispose();
    fanGeom.dispose();
    canopyGeom.dispose();
    finGeom.dispose();
    stabGeom.dispose();

    bodyMaterial.dispose();
    goldTrimMaterial.dispose();
    canopyMaterial.dispose();
    turbineGlowMaterial.dispose();
  }

  return {
    group: rootGroup,
    update,
    setFinish,
    setWireframe,
    dispose,
  };
}
