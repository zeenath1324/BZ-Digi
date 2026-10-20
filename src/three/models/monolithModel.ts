import * as THREE from 'three';
import { MaterialFinish, Procedural3DModel } from './chronographModel';
import { createBrushedMetalTexture } from '../proceduralTextures';

export function createMonolithModel(): Procedural3DModel {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'Monolith_Root';

  const brushedMap = createBrushedMetalTexture();

  const finishColors: Record<MaterialFinish, { gold: number; accent: number; stone: number }> = {
    gold: { gold: 0xD6B878, accent: 0xF5DEB3, stone: 0x111113 },
    dark: { gold: 0x8892A0, accent: 0xD6B878, stone: 0x0C0D0F },
    rose: { gold: 0xE2A499, accent: 0xF7D0C8, stone: 0x141012 },
    platinum: { gold: 0xE8ECF0, accent: 0xFFFFFF, stone: 0x101216 },
  };

  // Materials
  const goldMetalMaterial = new THREE.MeshPhysicalMaterial({
    color: finishColors.gold.gold,
    metalness: 0.96,
    roughness: 0.16,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
    normalMap: brushedMap,
    normalScale: new THREE.Vector2(0.05, 0.05),
  });

  const stonePlinthMaterial = new THREE.MeshStandardMaterial({
    color: finishColors.gold.stone,
    roughness: 0.85,
    metalness: 0.2,
  });

  const crystalCoreMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xFFFFFF,
    transmission: 0.94,
    roughness: 0.05,
    ior: 2.1, // High diamond / crystal index of refraction
    thickness: 2.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    iridescence: 0.8,
    iridescenceIOR: 1.4,
    transparent: true,
    opacity: 1.0,
  });

  const glowWireMaterial = new THREE.MeshStandardMaterial({
    color: finishColors.gold.accent,
    emissive: finishColors.gold.gold,
    emissiveIntensity: 0.6,
    roughness: 0.1,
    metalness: 0.9,
  });

  // Tracking exploded parts
  interface ExplodedPart {
    object: THREE.Object3D;
    baseY: number;
    explodedYOffset: number;
  }
  const parts: ExplodedPart[] = [];

  // ==========================================
  // PART 1: Multi-tier Beveled Pedestal Plinth
  // ==========================================
  const plinthGroup = new THREE.Group();
  plinthGroup.name = 'Part_1_Plinth';

  const baseTierGeom = new THREE.CylinderGeometry(2.4, 2.6, 0.2, 8);
  const baseTierMesh = new THREE.Mesh(baseTierGeom, stonePlinthMaterial);
  baseTierMesh.position.y = -2.2;
  baseTierMesh.receiveShadow = true;
  plinthGroup.add(baseTierMesh);

  // Gold trim ring around plinth
  const trimGeom = new THREE.CylinderGeometry(2.42, 2.42, 0.04, 8);
  const trimMesh = new THREE.Mesh(trimGeom, goldMetalMaterial);
  trimMesh.position.y = -2.08;
  plinthGroup.add(trimMesh);

  const midTierGeom = new THREE.CylinderGeometry(1.8, 2.0, 0.25, 8);
  const midTierMesh = new THREE.Mesh(midTierGeom, stonePlinthMaterial);
  midTierMesh.position.y = -1.95;
  midTierMesh.receiveShadow = true;
  plinthGroup.add(midTierMesh);

  rootGroup.add(plinthGroup);
  parts.push({ object: plinthGroup, baseY: 0, explodedYOffset: -1.0 });

  // ==========================================
  // PART 2: Central Architectural Monolith Column
  // ==========================================
  const monolithGroup = new THREE.Group();
  monolithGroup.name = 'Part_2_Monolith';

  const monolithGeom = new THREE.BoxGeometry(0.75, 2.4, 0.75);
  const monolithMesh = new THREE.Mesh(monolithGeom, stonePlinthMaterial);
  monolithMesh.castShadow = true;
  monolithMesh.receiveShadow = true;
  monolithGroup.add(monolithMesh);

  // Gold chamfered corner frames on monolith
  for (let c = 0; c < 4; c++) {
    const angle = (c * Math.PI) / 2 + Math.PI / 4;
    const ribGeom = new THREE.BoxGeometry(0.04, 2.42, 0.04);
    const ribMesh = new THREE.Mesh(ribGeom, goldMetalMaterial);
    ribMesh.position.set(Math.cos(angle) * 0.52, 0, Math.sin(angle) * 0.52);
    monolithGroup.add(ribMesh);
  }

  monolithGroup.position.y = -0.6;
  rootGroup.add(monolithGroup);
  parts.push({ object: monolithGroup, baseY: -0.6, explodedYOffset: -0.4 });

  // ==========================================
  // PART 3: Gyroscopic Outer Ring (X-Axis Rotation)
  // ==========================================
  const ring1Group = new THREE.Group();
  ring1Group.name = 'Part_3_Gimbal_Ring_Outer';
  const ring1Geom = new THREE.TorusGeometry(1.65, 0.04, 16, 64);
  const ring1Mesh = new THREE.Mesh(ring1Geom, goldMetalMaterial);
  ring1Group.add(ring1Mesh);
  ring1Group.position.y = 0.9;
  rootGroup.add(ring1Group);
  parts.push({ object: ring1Group, baseY: 0.9, explodedYOffset: 0.8 });

  // ==========================================
  // PART 4: Gyroscopic Mid Ring (Y-Axis Rotation)
  // ==========================================
  const ring2Group = new THREE.Group();
  ring2Group.name = 'Part_4_Gimbal_Ring_Mid';
  const ring2Geom = new THREE.TorusGeometry(1.35, 0.035, 16, 64);
  const ring2Mesh = new THREE.Mesh(ring2Geom, goldMetalMaterial);
  ring2Group.add(ring2Mesh);
  ring2Group.position.y = 0.9;
  rootGroup.add(ring2Group);
  parts.push({ object: ring2Group, baseY: 0.9, explodedYOffset: 1.4 });

  // ==========================================
  // PART 5: Gyroscopic Inner Ring (Z-Axis Rotation)
  // ==========================================
  const ring3Group = new THREE.Group();
  ring3Group.name = 'Part_5_Gimbal_Ring_Inner';
  const ring3Geom = new THREE.TorusGeometry(1.05, 0.03, 16, 64);
  const ring3Mesh = new THREE.Mesh(ring3Geom, glowWireMaterial);
  ring3Group.add(ring3Mesh);
  ring3Group.position.y = 0.9;
  rootGroup.add(ring3Group);
  parts.push({ object: ring3Group, baseY: 0.9, explodedYOffset: 2.0 });

  // ==========================================
  // PART 6: Floating Diamond Octahedron Crystal Core
  // ==========================================
  const crystalGroup = new THREE.Group();
  crystalGroup.name = 'Part_6_Crystal_Core';
  const octaGeom = new THREE.OctahedronGeometry(0.65, 0);
  const crystalMesh = new THREE.Mesh(octaGeom, crystalCoreMaterial);
  crystalMesh.castShadow = true;
  crystalGroup.add(crystalMesh);

  // Wireframe bounding halo for crystal
  const wireGeom = new THREE.WireframeGeometry(octaGeom);
  const wireLine = new THREE.LineSegments(wireGeom, glowWireMaterial);
  wireLine.scale.set(1.04, 1.04, 1.04);
  crystalGroup.add(wireLine);

  crystalGroup.position.y = 0.9;
  rootGroup.add(crystalGroup);
  parts.push({ object: crystalGroup, baseY: 0.9, explodedYOffset: 2.6 });

  // Animation Update
  function update(time: number, delta: number, explodedProgress: number) {
    // Smooth exploded displacement along Y
    parts.forEach((p) => {
      const targetY = p.baseY + p.explodedYOffset * explodedProgress;
      p.object.position.y = THREE.MathUtils.damp(p.object.position.y, targetY, 8, delta);
    });

    // Gyroscopic rotations with coordinated kinetic speeds
    ring1Group.rotation.x = time * 0.4;
    ring1Group.rotation.y = time * 0.2;

    ring2Group.rotation.y = -time * 0.6;
    ring2Group.rotation.z = time * 0.3;

    ring3Group.rotation.z = time * 0.8;
    ring3Group.rotation.x = -time * 0.4;

    // Crystal floating hover & tumbling
    crystalMesh.rotation.x = time * 0.5;
    crystalMesh.rotation.y = time * 0.7;
    crystalGroup.position.y = (0.9 + (parts[4].explodedYOffset * explodedProgress)) + Math.sin(time * 2.0) * 0.08;
  }

  function setFinish(finish: MaterialFinish) {
    const c = finishColors[finish];
    goldMetalMaterial.color.setHex(c.gold);
    glowWireMaterial.color.setHex(c.accent);
    glowWireMaterial.emissive.setHex(c.gold);
    stonePlinthMaterial.color.setHex(c.stone);
  }

  function setWireframe(wireframe: boolean) {
    goldMetalMaterial.wireframe = wireframe;
    stonePlinthMaterial.wireframe = wireframe;
  }

  function dispose() {
    brushedMap.dispose();
    baseTierGeom.dispose();
    trimGeom.dispose();
    midTierGeom.dispose();
    monolithGeom.dispose();
    ring1Geom.dispose();
    ring2Geom.dispose();
    ring3Geom.dispose();
    octaGeom.dispose();
    wireGeom.dispose();

    goldMetalMaterial.dispose();
    stonePlinthMaterial.dispose();
    crystalCoreMaterial.dispose();
    glowWireMaterial.dispose();
  }

  return {
    group: rootGroup,
    update,
    setFinish,
    setWireframe,
    dispose,
  };
}
