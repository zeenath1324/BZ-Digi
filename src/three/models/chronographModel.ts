import * as THREE from 'three';
import { createWatchDialTexture, createBrushedMetalTexture } from '../proceduralTextures';
import { studioAudio } from '../audioSynthesizer';

export type MaterialFinish = 'gold' | 'dark' | 'rose' | 'platinum';

export interface Procedural3DModel {
  group: THREE.Group;
  update: (time: number, delta: number, explodedProgress: number) => void;
  setFinish: (finish: MaterialFinish) => void;
  setWireframe: (wireframe: boolean) => void;
  dispose: () => void;
}

export function createChronographModel(): Procedural3DModel {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'Chronograph_Root';

  // Shared procedural maps
  let dialTexture = createWatchDialTexture('gold');
  const brushedNormalMap = createBrushedMetalTexture();

  // Color palettes for finishes
  const finishColors: Record<MaterialFinish, { main: number; accent: number; steel: number; rough: number; metal: number }> = {
    gold: { main: 0xD6B878, accent: 0xF7E3B5, steel: 0x2A3B52, rough: 0.18, metal: 0.96 },
    dark: { main: 0x2C2E33, accent: 0xD6B878, steel: 0x98A2B3, rough: 0.28, metal: 0.92 },
    rose: { main: 0xE2A499, accent: 0xF7D0C8, steel: 0x28354A, rough: 0.16, metal: 0.95 },
    platinum: { main: 0xDFE3E8, accent: 0xFFFFFF, steel: 0x1A2B42, rough: 0.08, metal: 0.98 },
  };

  let currentFinish: MaterialFinish = 'gold';

  // 1. Primary Materials
  const caseMaterial = new THREE.MeshPhysicalMaterial({
    color: finishColors.gold.main,
    metalness: finishColors.gold.metal,
    roughness: finishColors.gold.rough,
    clearcoat: 0.3,
    clearcoatRoughness: 0.15,
    normalMap: brushedNormalMap,
    normalScale: new THREE.Vector2(0.08, 0.08),
  });

  const bezelMaterial = new THREE.MeshPhysicalMaterial({
    color: finishColors.gold.accent,
    metalness: 0.98,
    roughness: 0.1,
    clearcoat: 0.6,
    clearcoatRoughness: 0.05,
  });

  const sapphireMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xFFFFFF,
    metalness: 0.05,
    roughness: 0.03,
    transmission: 0.96,
    thickness: 1.4,
    ior: 1.77, // Sapphire glass index of refraction
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    transparent: true,
    opacity: 1.0,
    depthWrite: false,
  });

  const dialMaterial = new THREE.MeshStandardMaterial({
    map: dialTexture,
    metalness: 0.85,
    roughness: 0.22,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });

  const bluedSteelMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x1B3B6F, // Heat-treated blued horlogerie steel
    metalness: 0.92,
    roughness: 0.12,
    clearcoat: 0.8,
  });

  const rubyJewelMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xDC143C, // Synthetic ruby bearing
    emissive: 0x550011,
    emissiveIntensity: 0.2,
    roughness: 0.08,
    metalness: 0.1,
    transmission: 0.85,
    thickness: 0.8,
    ior: 1.76,
  });

  const gearGoldMaterial = new THREE.MeshStandardMaterial({
    color: 0xE0C068,
    metalness: 0.94,
    roughness: 0.25,
  });

  const innerMovementPlateMaterial = new THREE.MeshStandardMaterial({
    color: 0x1A1A1D,
    metalness: 0.88,
    roughness: 0.35,
    normalMap: brushedNormalMap,
    normalScale: new THREE.Vector2(0.12, 0.12),
  });

  // Track parts for exploded view
  interface ExplodedPart {
    object: THREE.Object3D;
    baseZ: number;
    explodedZOffset: number;
    rotationMult?: number;
  }
  const explodedParts: ExplodedPart[] = [];

  // ==========================================
  // PART 1: Main Case Body & Chamfered Lugs
  // ==========================================
  const caseGroup = new THREE.Group();
  caseGroup.name = 'Part_1_Case_And_Lugs';

  // Middle cylinder chassis
  const caseGeom = new THREE.CylinderGeometry(2.1, 2.15, 0.45, 64);
  caseGeom.rotateX(Math.PI / 2);
  const caseMesh = new THREE.Mesh(caseGeom, caseMaterial);
  caseMesh.castShadow = true;
  caseMesh.receiveShadow = true;
  caseGroup.add(caseMesh);

  // 4 Faceted Beveled Lugs (top-left, top-right, bottom-left, bottom-right)
  const lugGeom = new THREE.BoxGeometry(0.35, 1.1, 0.38);
  const lugOffsets = [
    { x: -1.35, y: 1.85, rz: -0.18 },
    { x: 1.35, y: 1.85, rz: 0.18 },
    { x: -1.35, y: -1.85, rz: 0.18 },
    { x: 1.35, y: -1.85, rz: -0.18 },
  ];
  lugOffsets.forEach(({ x, y, rz }) => {
    const lug = new THREE.Mesh(lugGeom, caseMaterial);
    lug.position.set(x, y, 0);
    lug.rotation.z = rz;
    lug.castShadow = true;
    caseGroup.add(lug);
  });
  rootGroup.add(caseGroup);
  explodedParts.push({ object: caseGroup, baseZ: 0, explodedZOffset: -0.2 });

  // ==========================================
  // PART 2: Fluted Bezel Ring
  // ==========================================
  const bezelGroup = new THREE.Group();
  bezelGroup.name = 'Part_2_Fluted_Bezel';
  const bezelBaseGeom = new THREE.TorusGeometry(2.05, 0.14, 24, 64);
  const bezelBase = new THREE.Mesh(bezelBaseGeom, bezelMaterial);
  bezelGroup.add(bezelBase);

  // Micro-fluting teeth (90 subtle ridges)
  const fluteGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.16, 6);
  const fluteInstanced = new THREE.InstancedMesh(fluteGeom, bezelMaterial, 90);
  const dummyMat = new THREE.Matrix4();
  const dummyPos = new THREE.Vector3();
  const dummyRot = new THREE.Euler();
  const dummyQuat = new THREE.Quaternion();
  const dummyScale = new THREE.Vector3(1, 1, 1);

  for (let i = 0; i < 90; i++) {
    const angle = (i * Math.PI * 2) / 90;
    dummyPos.set(Math.cos(angle) * 2.05, Math.sin(angle) * 2.05, 0.05);
    dummyRot.set(0, 0, angle + Math.PI / 2);
    dummyQuat.setFromEuler(dummyRot);
    dummyMat.compose(dummyPos, dummyQuat, dummyScale);
    fluteInstanced.setMatrixAt(i, dummyMat);
  }
  fluteInstanced.instanceMatrix.needsUpdate = true;
  fluteInstanced.computeBoundingSphere();
  bezelGroup.add(fluteInstanced);

  bezelGroup.position.z = 0.26;
  rootGroup.add(bezelGroup);
  explodedParts.push({ object: bezelGroup, baseZ: 0.26, explodedZOffset: 1.4 });

  // ==========================================
  // PART 3: Domed Sapphire Crystal Lens
  // ==========================================
  const crystalGroup = new THREE.Group();
  crystalGroup.name = 'Part_3_Sapphire_Crystal';
  const crystalGeom = new THREE.CylinderGeometry(1.98, 1.98, 0.12, 64);
  crystalGeom.rotateX(Math.PI / 2);
  const crystalMesh = new THREE.Mesh(crystalGeom, sapphireMaterial);
  crystalMesh.renderOrder = 20; // Ensure transparency renders after internals
  crystalGroup.add(crystalMesh);
  crystalGroup.position.z = 0.36;
  rootGroup.add(crystalGroup);
  explodedParts.push({ object: crystalGroup, baseZ: 0.36, explodedZOffset: 2.2 });

  // ==========================================
  // PART 4: Watch Dial Face with Guilloché Texture
  // ==========================================
  const dialGroup = new THREE.Group();
  dialGroup.name = 'Part_4_Guilloche_Dial';
  const dialGeom = new THREE.CircleGeometry(1.94, 64);
  const dialMesh = new THREE.Mesh(dialGeom, dialMaterial);
  dialMesh.receiveShadow = true;
  dialGroup.add(dialMesh);

  // Chapter ring metal bevel border
  const chapterBorderGeom = new THREE.RingGeometry(1.88, 1.95, 64);
  const chapterBorderMesh = new THREE.Mesh(chapterBorderGeom, bezelMaterial);
  chapterBorderMesh.position.z = 0.005;
  dialGroup.add(chapterBorderMesh);

  dialGroup.position.z = 0.21;
  rootGroup.add(dialGroup);
  explodedParts.push({ object: dialGroup, baseZ: 0.21, explodedZOffset: 0.8 });

  // ==========================================
  // PART 5: Internal Movement Baseplate
  // ==========================================
  const plateGroup = new THREE.Group();
  plateGroup.name = 'Part_5_Movement_Plate';
  const plateGeom = new THREE.CylinderGeometry(1.85, 1.85, 0.15, 48);
  plateGeom.rotateX(Math.PI / 2);
  const plateMesh = new THREE.Mesh(plateGeom, innerMovementPlateMaterial);
  plateMesh.receiveShadow = true;
  plateGroup.add(plateMesh);
  plateGroup.position.z = 0.05;
  rootGroup.add(plateGroup);
  explodedParts.push({ object: plateGroup, baseZ: 0.05, explodedZOffset: -0.8 });

  // ==========================================
  // PART 6: Gear Train Mechanisms
  // ==========================================
  const gearsGroup = new THREE.Group();
  gearsGroup.name = 'Part_6_Gear_Train';

  // Helper to create a cog wheel with teeth
  function createGearMesh(radius: number, teeth: number, depth: number) {
    const shape = new THREE.Shape();
    const toothDepth = radius * 0.12;
    const numPoints = teeth * 2;
    for (let i = 0; i < numPoints; i++) {
      const angle = (i * Math.PI * 2) / numPoints;
      const isTip = i % 2 === 0;
      const r = isTip ? radius : radius - toothDepth;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();

    // Center hole for axle
    const hole = new THREE.Path();
    hole.arc(0, 0, radius * 0.25, 0, Math.PI * 2, true);
    shape.holes.push(hole);

    const extrudeSettings = {
      depth,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    };
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return new THREE.Mesh(geom, gearGoldMaterial);
  }

  const gear1 = createGearMesh(0.55, 24, 0.04);
  gear1.position.set(-0.45, 0.45, 0);
  gearsGroup.add(gear1);

  const gear2 = createGearMesh(0.38, 16, 0.04);
  gear2.position.set(0.35, 0.4, 0.02);
  gearsGroup.add(gear2);

  const gear3 = createGearMesh(0.28, 12, 0.03);
  gear3.position.set(-0.35, -0.2, 0.03);
  gearsGroup.add(gear3);

  gearsGroup.position.z = 0.12;
  rootGroup.add(gearsGroup);
  explodedParts.push({ object: gearsGroup, baseZ: 0.12, explodedZOffset: -0.3 });

  // ==========================================
  // PART 7: Open-Heart Tourbillon Cage & Escapement
  // ==========================================
  const tourbillonGroup = new THREE.Group();
  tourbillonGroup.name = 'Part_7_Tourbillon_Cage';
  tourbillonGroup.position.set(0, -0.65, 0.16);

  // Tourbillon Bridge Bar
  const bridgeGeom = new THREE.BoxGeometry(0.85, 0.1, 0.03);
  const bridgeMesh = new THREE.Mesh(bridgeGeom, bezelMaterial);
  tourbillonGroup.add(bridgeMesh);

  // Rotating cage
  const cageSubGroup = new THREE.Group();
  const cageRingGeom = new THREE.TorusGeometry(0.36, 0.025, 16, 32);
  const cageRingMesh = new THREE.Mesh(cageRingGeom, bezelMaterial);
  cageSubGroup.add(cageRingMesh);

  // 3-Spoke cage carriage
  for (let s = 0; s < 3; s++) {
    const spokeGeom = new THREE.BoxGeometry(0.34, 0.03, 0.02);
    const spoke = new THREE.Mesh(spokeGeom, bezelMaterial);
    spoke.position.x = 0.17;
    const spokeHolder = new THREE.Group();
    spokeHolder.rotation.z = (s * Math.PI * 2) / 3;
    spokeHolder.add(spoke);
    cageSubGroup.add(spokeHolder);
  }

  // Balance wheel inside cage (oscillates back and forth)
  const balanceWheelSubGroup = new THREE.Group();
  const balanceRingGeom = new THREE.TorusGeometry(0.26, 0.02, 16, 32);
  const balanceRingMesh = new THREE.Mesh(balanceRingGeom, gearGoldMaterial);
  balanceWheelSubGroup.add(balanceRingMesh);

  // 2 Gold balance wheel regulatory counterweights
  const weightGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.04, 12);
  const w1 = new THREE.Mesh(weightGeom, bezelMaterial);
  w1.position.set(0.26, 0, 0);
  const w2 = new THREE.Mesh(weightGeom, bezelMaterial);
  w2.position.set(-0.26, 0, 0);
  balanceWheelSubGroup.add(w1, w2);

  cageSubGroup.add(balanceWheelSubGroup);
  tourbillonGroup.add(cageSubGroup);

  // Central Ruby jewel on tourbillon bridge
  const rubyGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.04, 16);
  rubyGeom.rotateX(Math.PI / 2);
  const rubyMesh = new THREE.Mesh(rubyGeom, rubyJewelMaterial);
  rubyMesh.position.z = 0.025;
  tourbillonGroup.add(rubyMesh);

  rootGroup.add(tourbillonGroup);
  explodedParts.push({ object: tourbillonGroup, baseZ: 0.16, explodedZOffset: 0.25 });

  // ==========================================
  // PART 8: Synthetic Ruby Bearing Array (9 pivots)
  // ==========================================
  const jewelsGroup = new THREE.Group();
  jewelsGroup.name = 'Part_8_Jewel_Bearings';
  const jewelPositions = [
    [-0.45, 0.45], [0.35, 0.4], [-0.35, -0.2],
    [0.75, 0], [-0.75, 0.1], [0.1, 0.75],
    [-0.2, 0.7], [0.55, -0.3], [-0.55, -0.3]
  ];
  jewelPositions.forEach(([jx, jy]) => {
    const j = new THREE.Mesh(rubyGeom, rubyJewelMaterial);
    j.position.set(jx, jy, 0);
    jewelsGroup.add(j);
  });
  jewelsGroup.position.z = 0.09;
  rootGroup.add(jewelsGroup);
  explodedParts.push({ object: jewelsGroup, baseZ: 0.09, explodedZOffset: -0.55 });

  // ==========================================
  // PART 9: Sweeping Blued-Steel & Gold Hands
  // ==========================================
  const handsGroup = new THREE.Group();
  handsGroup.name = 'Part_9_Watch_Hands';

  // Hour Hand
  const hourHandGroup = new THREE.Group();
  const hourBladeGeom = new THREE.ConeGeometry(0.065, 0.95, 4);
  hourBladeGeom.translate(0, 0.47, 0);
  const hourBlade = new THREE.Mesh(hourBladeGeom, bezelMaterial);
  hourBlade.castShadow = true;
  hourHandGroup.add(hourBlade);

  // Minute Hand
  const minHandGroup = new THREE.Group();
  const minBladeGeom = new THREE.ConeGeometry(0.05, 1.45, 4);
  minBladeGeom.translate(0, 0.72, 0);
  const minBlade = new THREE.Mesh(minBladeGeom, bezelMaterial);
  minBlade.castShadow = true;
  minHandGroup.add(minBlade);

  // Blued Steel Chronograph Seconds Sweep Hand (slender with counterweight)
  const secHandGroup = new THREE.Group();
  const secBladeGeom = new THREE.BoxGeometry(0.02, 1.65, 0.015);
  secBladeGeom.translate(0, 0.65, 0);
  const secBlade = new THREE.Mesh(secBladeGeom, bluedSteelMaterial);

  // Counterweight circle at bottom of sec hand
  const secCounterGeom = new THREE.CircleGeometry(0.07, 16);
  secCounterGeom.translate(0, -0.25, 0);
  const secCounter = new THREE.Mesh(secCounterGeom, bluedSteelMaterial);
  secHandGroup.add(secBlade, secCounter);

  // Center Cap Pin
  const capGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 24);
  capGeom.rotateX(Math.PI / 2);
  const capMesh = new THREE.Mesh(capGeom, bezelMaterial);
  capMesh.position.z = 0.04;

  hourHandGroup.position.z = 0.01;
  minHandGroup.position.z = 0.022;
  secHandGroup.position.z = 0.034;

  handsGroup.add(hourHandGroup, minHandGroup, secHandGroup, capMesh);
  handsGroup.position.z = 0.24;
  rootGroup.add(handsGroup);
  explodedParts.push({ object: handsGroup, baseZ: 0.24, explodedZOffset: 1.1 });

  // ==========================================
  // PART 10: Knurled Crown & Dual Chrono Pushers
  // ==========================================
  const controlsGroup = new THREE.Group();
  controlsGroup.name = 'Part_10_Crown_Pushers';

  // Winding crown at 3 o'clock (x: 2.25, y: 0)
  const crownGeom = new THREE.CylinderGeometry(0.24, 0.28, 0.35, 24);
  crownGeom.rotateZ(Math.PI / 2);
  const crownMesh = new THREE.Mesh(crownGeom, bezelMaterial);
  crownMesh.position.set(2.35, 0, 0);
  controlsGroup.add(crownMesh);

  // Top Pusher (Start / Stop) at 2 o'clock
  const pusherGeom = new THREE.CylinderGeometry(0.12, 0.14, 0.26, 16);
  pusherGeom.rotateZ(Math.PI / 4);
  const pusher1 = new THREE.Mesh(pusherGeom, bezelMaterial);
  pusher1.position.set(2.1, 1.05, 0);

  // Bottom Pusher (Reset) at 4 o'clock
  const pusher2Geom = new THREE.CylinderGeometry(0.12, 0.14, 0.26, 16);
  pusher2Geom.rotateZ(-Math.PI / 4);
  const pusher2 = new THREE.Mesh(pusher2Geom, bezelMaterial);
  pusher2.position.set(2.1, -1.05, 0);

  controlsGroup.add(pusher1, pusher2);
  controlsGroup.position.z = 0;
  rootGroup.add(controlsGroup);
  explodedParts.push({ object: controlsGroup, baseZ: 0, explodedZOffset: 0, rotationMult: 0 });

  // ==========================================
  // PART 11: Exhibition Caseback & Oscillating Rotor
  // ==========================================
  const rotorGroup = new THREE.Group();
  rotorGroup.name = 'Part_11_Oscillating_Rotor';

  // Exhibition sapphire ring back
  const backRingGeom = new THREE.TorusGeometry(1.8, 0.12, 16, 48);
  const backRingMesh = new THREE.Mesh(backRingGeom, bezelMaterial);
  rotorGroup.add(backRingMesh);

  // Semi-circular oscillating weighted rotor (22K Gold heavy mass)
  const rotorShape = new THREE.Shape();
  rotorShape.absarc(0, 0, 1.6, 0, Math.PI, false);
  rotorShape.absarc(0, 0, 0.6, Math.PI, 0, true);
  rotorShape.closePath();

  const rotorGeom = new THREE.ExtrudeGeometry(rotorShape, {
    depth: 0.05,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.015,
    bevelThickness: 0.015,
  });
  rotorGeom.center();
  const rotorMesh = new THREE.Mesh(rotorGeom, gearGoldMaterial);
  rotorMesh.position.z = -0.06;
  rotorGroup.add(rotorMesh);

  rotorGroup.position.z = -0.25;
  rootGroup.add(rotorGroup);
  explodedParts.push({ object: rotorGroup, baseZ: -0.25, explodedZOffset: -1.4 });

  // Track state for ticking sounds
  let lastSecondInt = -1;

  // Animation Update Function
  function update(time: number, delta: number, explodedProgress: number) {
    // Smooth exploded displacement along Z axis using exponential damping
    explodedParts.forEach((part) => {
      const targetZ = part.baseZ + part.explodedZOffset * explodedProgress;
      part.object.position.z = THREE.MathUtils.damp(part.object.position.z, targetZ, 8, delta);
    });

    // 1. Hands sweep
    const seconds = (time % 60);
    const minutes = ((time / 60) % 60);
    const hours = ((time / 3600) % 12);

    secHandGroup.rotation.z = -seconds * (Math.PI * 2 / 60);
    minHandGroup.rotation.z = -minutes * (Math.PI * 2 / 60);
    hourHandGroup.rotation.z = -hours * (Math.PI * 2 / 12);

    // Trigger subtle escapement tick on each passing second / half second
    const secFloor = Math.floor(seconds * 4); // 4Hz frequency
    if (secFloor !== lastSecondInt) {
      lastSecondInt = secFloor;
      studioAudio.playEscapementTick(secFloor % 2 === 0);
    }

    // 2. Tourbillon continuous 60s rotation
    cageSubGroup.rotation.z = time * 0.45;

    // 3. Balance wheel high-frequency oscillation (4 Hz harmonic motion)
    balanceWheelSubGroup.rotation.z = Math.sin(time * 18) * 1.85;

    // 4. Interlocking Gear train rotations
    gear1.rotation.z = time * 0.35;
    gear2.rotation.z = -time * 0.35 * (24 / 16);
    gear3.rotation.z = time * 0.35 * (24 / 12);

    // 5. Rotor natural gentle pendulum swing
    rotorMesh.rotation.z = Math.sin(time * 1.2) * 0.8 + Math.cos(time * 0.5) * 0.3;
  }

  function setFinish(finish: MaterialFinish) {
    currentFinish = finish;
    const colors = finishColors[finish];

    caseMaterial.color.setHex(colors.main);
    caseMaterial.metalness = colors.metal;
    caseMaterial.roughness = colors.rough;

    bezelMaterial.color.setHex(colors.accent);
    bezelMaterial.roughness = colors.rough * 0.6;

    // Regenerate dial texture for corresponding palette
    dialTexture.dispose();
    dialTexture = createWatchDialTexture(finish);
    dialMaterial.map = dialTexture;
    dialMaterial.needsUpdate = true;

    if (finish === 'dark') {
      bluedSteelMaterial.color.setHex(0xD6B878); // gold hands on dark dial
    } else {
      bluedSteelMaterial.color.setHex(0x1B3B6F); // blued steel
    }
  }

  function setWireframe(wireframe: boolean) {
    caseMaterial.wireframe = wireframe;
    bezelMaterial.wireframe = wireframe;
    innerMovementPlateMaterial.wireframe = wireframe;
    gearGoldMaterial.wireframe = wireframe;
  }

  function dispose() {
    dialTexture.dispose();
    brushedNormalMap.dispose();
    caseGeom.dispose();
    lugGeom.dispose();
    bezelBaseGeom.dispose();
    fluteGeom.dispose();
    fluteInstanced.dispose();
    crystalGeom.dispose();
    dialGeom.dispose();
    chapterBorderGeom.dispose();
    plateGeom.dispose();
    rubyGeom.dispose();
    hourBladeGeom.dispose();
    minBladeGeom.dispose();
    secBladeGeom.dispose();
    secCounterGeom.dispose();
    crownGeom.dispose();
    pusherGeom.dispose();
    pusher2Geom.dispose();
    rotorGeom.dispose();

    caseMaterial.dispose();
    bezelMaterial.dispose();
    sapphireMaterial.dispose();
    dialMaterial.dispose();
    bluedSteelMaterial.dispose();
    rubyJewelMaterial.dispose();
    gearGoldMaterial.dispose();
    innerMovementPlateMaterial.dispose();
  }

  return {
    group: rootGroup,
    update,
    setFinish,
    setWireframe,
    dispose,
  };
}
