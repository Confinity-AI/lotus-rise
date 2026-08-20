import * as THREE from "three";

type BloomSceneOptions = {
  canvas: HTMLCanvasElement;
  host: HTMLElement;
  onReady: () => void;
};

type RingSpec = {
  name: "sepal" | "outer" | "middle" | "inner";
  count: number;
  offset: number;
  length: number;
  width: number;
  baseRadius: number;
  closedHeight: number;
  openBase: number;
  openArch: number;
  tipLift: number;
  sideCup: number;
  tipFloor: number;
  delay: number;
  duration: number;
  colors: [number, number, number];
};

type Petal = {
  geometry: THREE.BufferGeometry;
  mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>;
  positions: THREE.BufferAttribute;
  u: Float32Array;
  v: Float32Array;
  angle: number;
  phase: number;
  delay: number;
  duration: number;
  length: number;
  width: number;
  baseRadius: number;
  closedHeight: number;
  openBase: number;
  openArch: number;
  tipLift: number;
  sideCup: number;
  tipFloor: number;
  twist: number;
};

export type LotusBloomScene = {
  dispose: () => void;
};

const rings: RingSpec[] = [
  {
    name: "sepal",
    count: 5,
    offset: 0.18,
    length: 2.28,
    width: 0.56,
    baseRadius: 0.2,
    closedHeight: 1.36,
    openBase: 0.02,
    openArch: 0.11,
    tipLift: -0.08,
    sideCup: 0.1,
    tipFloor: 0.06,
    delay: 2.55,
    duration: 8.2,
    colors: [0x235b46, 0x5f9779, 0xa6c7ad],
  },
  {
    name: "outer",
    count: 12,
    offset: 0,
    length: 2.14,
    width: 0.56,
    baseRadius: 0.18,
    closedHeight: 1.5,
    openBase: 0.07,
    openArch: 0.16,
    tipLift: 0.01,
    sideCup: 0.14,
    tipFloor: 0.08,
    delay: 1.65,
    duration: 8.05,
    colors: [0xd7e0d2, 0xeeeae0, 0xe5b7bd],
  },
  {
    name: "middle",
    count: 10,
    offset: 0.27,
    length: 1.66,
    width: 0.58,
    baseRadius: 0.13,
    closedHeight: 1.66,
    openBase: 0.13,
    openArch: 0.17,
    tipLift: 0.05,
    sideCup: 0.12,
    tipFloor: 0.55,
    delay: 0.82,
    duration: 7.7,
    colors: [0xd9ded4, 0xeee9df, 0xe2afb6],
  },
  {
    name: "inner",
    count: 8,
    offset: 0.08,
    length: 1.03,
    width: 0.48,
    baseRadius: 0.08,
    closedHeight: 1.82,
    openBase: 0.21,
    openArch: 0.14,
    tipLift: 0.04,
    sideCup: 0.13,
    tipFloor: 0.75,
    delay: 0.08,
    duration: 7.15,
    colors: [0xe1e4dc, 0xeee8dd, 0xdfaab2],
  },
];

const angleJitter = [-0.026, 0.013, -0.009, 0.021, -0.017, 0.006, 0.024, -0.012, 0.01];
const sizeJitter = [0.97, 1.015, 0.99, 1.025, 0.98, 1.008, 1.02, 0.985];
const totalBloomTime = 11.2;

function clamp01(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function smoothstep(value: number) {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

function mix(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

function widthProfile(v: number, tipFloor: number) {
  const base = 0.06 + smoothstep(v / 0.3) * 0.94;
  if (v <= 0.82) return base;
  const tip = clamp01((v - 0.82) / 0.18);
  const roundedTip = Math.sqrt(Math.max(0, 1 - tip * tip));
  return base * mix(tipFloor, 1, roundedTip);
}

function createPetalGeometry(spec: RingSpec, index: number) {
  const widthSegments = 16;
  const lengthSegments = 34;
  const vertexCount = (widthSegments + 1) * (lengthSegments + 1);
  const positions = new Float32Array(vertexCount * 3);
  const colors = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);
  const uValues = new Float32Array(vertexCount);
  const vValues = new Float32Array(vertexCount);
  const indices: number[] = [];
  const base = new THREE.Color(spec.colors[0]);
  const middle = new THREE.Color(spec.colors[1]);
  const tip = new THREE.Color(spec.colors[2]);
  const white = new THREE.Color(0xffffff);
  const color = new THREE.Color();

  let vertex = 0;
  for (let row = 0; row <= lengthSegments; row += 1) {
    const v = row / lengthSegments;
    for (let column = 0; column <= widthSegments; column += 1) {
      const u = (column / widthSegments) * 2 - 1;
      uValues[vertex] = u;
      vValues[vertex] = v;
      uvs[vertex * 2] = (u + 1) / 2;
      uvs[vertex * 2 + 1] = v;

      if (v < 0.58) {
        color.lerpColors(base, middle, v / 0.58);
      } else {
        color.lerpColors(middle, tip, (v - 0.58) / 0.42);
      }
      const ridge = Math.exp(-u * u * 17) * 0.06;
      const veins = Math.max(0, Math.cos(u * 20 + index * 0.7)) * 0.014 * Math.sin(Math.PI * v);
      const edge = Math.abs(u) ** 2.25 * 0.025;
      const variation = 0.985 + ((index * 7) % 5) * 0.004;
      color.lerp(white, ridge + veins).multiplyScalar((1 - edge) * variation);
      colors.set([color.r, color.g, color.b], vertex * 3);
      vertex += 1;
    }
  }

  for (let row = 0; row < lengthSegments; row += 1) {
    for (let column = 0; column < widthSegments; column += 1) {
      const a = row * (widthSegments + 1) + column;
      const b = a + 1;
      const c = a + widthSegments + 1;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  const positionAttribute = new THREE.BufferAttribute(positions, 3);
  positionAttribute.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute("position", positionAttribute);
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);

  const angle =
    spec.offset + (index / spec.count) * Math.PI * 2 + angleJitter[index % angleJitter.length];
  const lengthScale = sizeJitter[index % sizeJitter.length];
  const widthScale = sizeJitter[(index + 3) % sizeJitter.length];
  const phase = index * 1.37 + spec.offset * 3;

  return {
    geometry,
    positions: positionAttribute,
    u: uValues,
    v: vValues,
    angle,
    phase,
    delay: spec.delay + (index % 4) * 0.065,
    duration: spec.duration + (index % 3) * 0.14,
    length: spec.length * lengthScale,
    width: spec.width * widthScale,
    baseRadius: spec.baseRadius,
    closedHeight: spec.closedHeight * (0.98 + (index % 3) * 0.012),
    openBase: spec.openBase,
    openArch: spec.openArch,
    tipLift: spec.tipLift,
    sideCup: spec.sideCup,
    tipFloor: spec.tipFloor,
    twist: (index % 2 === 0 ? 1 : -1) * (0.018 + (index % 3) * 0.004),
  };
}

function updatePetal(petal: Petal, progress: number, time: number, reducedMotion: boolean) {
  const positions = petal.positions.array as Float32Array;
  const open = smoothstep(progress);
  const settled = progress >= 1 && !reducedMotion;
  const breathing = settled ? Math.sin(time * 0.47 + petal.phase) : 0;
  const slowerBreathing = settled ? Math.sin(time * 0.21 + petal.phase * 0.6) : 0;

  for (let vertex = 0; vertex < petal.u.length; vertex += 1) {
    const u = petal.u[vertex];
    const v = petal.v[vertex];
    const unfurl = smoothstep(clamp01(open * 1.16 + v * 0.2 - 0.18));
    const profile = widthProfile(v, petal.tipFloor);
    const closedRadius = petal.baseRadius * 0.55 + petal.length * (0.025 + v * 0.225);
    const capZone = smoothstep((v - 0.84) / 0.16);
    const capCurve = petal.width * petal.tipFloor * 0.18 * u * u * capZone;
    const openRadius = petal.baseRadius + petal.length * v - capCurve;
    const radius = mix(closedRadius, openRadius, unfurl) + slowerBreathing * v * 0.015;
    const widthScale = mix(0.24, 1, unfurl) * (1 + slowerBreathing * 0.006);
    const side = u * petal.width * profile * widthScale;
    const twist = petal.twist * Math.sin(Math.PI * v) * u * (1 - unfurl * 0.48);
    const angle = petal.angle + twist;
    const closedY = 0.09 + petal.closedHeight * v ** 0.72 + Math.sin(Math.PI * v) * 0.16;
    const openY =
      petal.openBase +
      petal.openArch * Math.sin(Math.PI * v) +
      petal.tipLift * v ** 2.5 +
      petal.sideCup * u * u * Math.sin(Math.PI * v) +
      Math.exp(-u * u * 18) * Math.sin(Math.PI * v) * 0.025;
    const movement = breathing * (0.007 + v * 0.026) + slowerBreathing * v * 0.008;
    const y = mix(closedY, openY, unfurl) + movement;
    const radialX = Math.sin(angle);
    const radialZ = -Math.cos(angle);
    const tangentX = Math.cos(angle);
    const tangentZ = Math.sin(angle);

    const offset = vertex * 3;
    positions[offset] = radialX * radius + tangentX * side;
    positions[offset + 1] = y;
    positions[offset + 2] = radialZ * radius + tangentZ * side;
  }

  petal.positions.needsUpdate = true;
  petal.geometry.computeVertexNormals();
}

function createSoftShadowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 160;
  canvas.height = 160;
  const context = canvas.getContext("2d");
  if (!context) return null;
  const gradient = context.createRadialGradient(80, 80, 7, 80, 80, 76);
  gradient.addColorStop(0, "rgba(18, 70, 55, 0.18)");
  gradient.addColorStop(0.48, "rgba(18, 70, 55, 0.09)");
  gradient.addColorStop(1, "rgba(18, 70, 55, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 160, 160);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createLotusBloomScene({
  canvas,
  host,
  onReady,
}: BloomSceneOptions): LotusBloomScene {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
    premultipliedAlpha: true,
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 30);
  camera.position.set(0, 9.05, 0.001);
  camera.up.set(0, 0, -1);
  camera.lookAt(0, 0.22, 0);

  const flower = new THREE.Group();
  flower.rotation.y = -0.03;
  scene.add(flower);

  const ambient = new THREE.HemisphereLight(0xfffbf4, 0x315b49, 1.28);
  scene.add(ambient);
  const keyLight = new THREE.DirectionalLight(0xfff5e7, 1.62);
  keyLight.position.set(-3.5, 6, -2.2);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(512, 512);
  keyLight.shadow.camera.left = -3;
  keyLight.shadow.camera.right = 3;
  keyLight.shadow.camera.top = 3;
  keyLight.shadow.camera.bottom = -3;
  keyLight.shadow.camera.near = 1;
  keyLight.shadow.camera.far = 12;
  keyLight.shadow.bias = -0.0003;
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0xc9e0d2, 0.62);
  fillLight.position.set(4.2, 4.5, 2.6);
  scene.add(fillLight);
  const rimLight = new THREE.DirectionalLight(0xffe5e3, 0.42);
  rimLight.position.set(0.5, 3, -5);
  scene.add(rimLight);

  const petalMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    side: THREE.DoubleSide,
    roughness: 0.8,
    metalness: 0,
    clearcoat: 0.06,
    clearcoatRoughness: 0.86,
    sheen: 0.32,
    sheenColor: new THREE.Color(0xf0c7cb),
    sheenRoughness: 0.9,
  });

  const petals: Petal[] = [];
  for (const ring of rings) {
    for (let index = 0; index < ring.count; index += 1) {
      const petal = createPetalGeometry(ring, index);
      const mesh = new THREE.Mesh(petal.geometry, petalMaterial);
      mesh.frustumCulled = false;
      mesh.renderOrder = rings.indexOf(ring);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      flower.add(mesh);
      petals.push({ ...petal, mesh });
    }
  }

  const center = new THREE.Group();
  center.position.y = 0.34;
  flower.add(center);
  const seedPodGeometry = new THREE.CylinderGeometry(0.22, 0.29, 0.17, 48, 2, false);
  const seedPodMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xc8a942,
    roughness: 0.78,
    clearcoat: 0.08,
  });
  const seedPod = new THREE.Mesh(seedPodGeometry, seedPodMaterial);
  seedPod.castShadow = true;
  seedPod.receiveShadow = true;
  center.add(seedPod);

  const seedGeometry = new THREE.SphereGeometry(0.024, 10, 8);
  const seedMaterial = new THREE.MeshStandardMaterial({ color: 0x675619, roughness: 0.9 });
  const seedPositions = [
    [0, 0],
    [-0.095, -0.056],
    [0.098, -0.052],
    [-0.078, 0.084],
    [0.081, 0.082],
    [0.006, -0.122],
    [0.005, 0.13],
  ] as const;
  for (const [x, z] of seedPositions) {
    const seed = new THREE.Mesh(seedGeometry, seedMaterial);
    seed.position.set(x, 0.092, z);
    seed.scale.y = 0.42;
    center.add(seed);
  }

  const stamenCount = 32;
  const filamentGeometry = new THREE.CylinderGeometry(0.008, 0.011, 0.18, 6);
  const filamentMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4ac35,
    roughness: 0.76,
  });
  const filaments = new THREE.InstancedMesh(filamentGeometry, filamentMaterial, stamenCount);
  const filamentMatrix = new THREE.Matrix4();
  const filamentQuaternion = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  for (let index = 0; index < stamenCount; index += 1) {
    const angle = (index / stamenCount) * Math.PI * 2 + (index % 2) * 0.038;
    const radius = index % 2 === 0 ? 0.35 : 0.4;
    const radial = new THREE.Vector3(Math.sin(angle), 0, -Math.cos(angle));
    filamentQuaternion.setFromUnitVectors(up, radial);
    filamentMatrix.compose(
      radial.clone().multiplyScalar(radius),
      filamentQuaternion,
      new THREE.Vector3(1, 0.88 + (index % 3) * 0.06, 1),
    );
    filaments.setMatrixAt(index, filamentMatrix);
  }
  filaments.instanceMatrix.needsUpdate = true;
  filaments.castShadow = true;
  center.add(filaments);

  const stamenGeometry = new THREE.SphereGeometry(0.028, 10, 7);
  const stamenMaterial = new THREE.MeshStandardMaterial({
    color: 0xe5c44d,
    roughness: 0.68,
  });
  const stamens = new THREE.InstancedMesh(stamenGeometry, stamenMaterial, stamenCount);
  stamens.castShadow = true;
  const stamenMatrix = new THREE.Matrix4();
  for (let index = 0; index < stamenCount; index += 1) {
    const angle = (index / stamenCount) * Math.PI * 2 + (index % 2) * 0.038;
    const radius = index % 2 === 0 ? 0.44 : 0.49;
    const scale = index % 3 === 0 ? 1.12 : 0.88;
    stamenMatrix.compose(
      new THREE.Vector3(
        Math.sin(angle) * radius,
        0.045 + (index % 2) * 0.018,
        -Math.cos(angle) * radius,
      ),
      new THREE.Quaternion(),
      new THREE.Vector3(scale, scale * 0.85, scale),
    );
    stamens.setMatrixAt(index, stamenMatrix);
  }
  stamens.instanceMatrix.needsUpdate = true;
  center.add(stamens);

  const shadowTexture = createSoftShadowTexture();
  const shadowGeometry = new THREE.PlaneGeometry(5.2, 5.2);
  const shadowMaterial = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
  });
  const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -0.07;
  shadow.renderOrder = -1;
  scene.add(shadow);

  let disposed = false;
  let visible = false;
  let ready = false;
  let bloomStartedAt = performance.now();
  let lastFrameAt = 0;
  let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const resize = () => {
    const width = Math.max(Math.round(canvas.clientWidth), 1);
    const height = Math.max(Math.round(canvas.clientHeight), 1);
    const deviceScale = Math.min(window.devicePixelRatio || 1, 1.6);
    const maxPixels = 1_150_000;
    const requestedPixels = width * height * deviceScale * deviceScale;
    const cappedScale =
      requestedPixels > maxPixels
        ? deviceScale * Math.sqrt(maxPixels / requestedPixels)
        : deviceScale;
    renderer.setPixelRatio(cappedScale);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const renderFrame = (now: number, forceOpen = false) => {
    if (disposed) return;
    const time = forceOpen ? totalBloomTime + 1 : Math.max((now - bloomStartedAt) / 1000, 0);
    for (const petal of petals) {
      const progress = forceOpen ? 1 : clamp01((time - petal.delay) / petal.duration);
      updatePetal(petal, progress, time, reducedMotion);
    }
    const centerProgress = forceOpen ? 1 : smoothstep((time - 2.15) / 3.45);
    center.scale.setScalar(0.12 + centerProgress * 0.88);
    center.rotation.y = reducedMotion ? 0 : Math.sin(time * 0.2) * 0.008;
    flower.rotation.y = -0.03 + (reducedMotion ? 0 : Math.sin(time * 0.14) * 0.0045);
    flower.position.y = reducedMotion ? 0 : Math.sin(time * 0.23) * 0.004;
    shadow.material.opacity = 0.38 + smoothstep(Math.min(time / 7, 1)) * 0.32;
    renderer.render(scene, camera);
    if (!ready) {
      ready = true;
      onReady();
    }
  };

  const animate = (now: number) => {
    if (now - lastFrameAt < 32) return;
    lastFrameAt = now;
    renderFrame(now, false);
  };
  const setRunning = (shouldRun: boolean) => {
    if (disposed) return;
    if (shouldRun && !reducedMotion) {
      renderer.setAnimationLoop(animate);
    } else {
      renderer.setAnimationLoop(null);
    }
  };

  const resizeObserver = new ResizeObserver(() => {
    resize();
    renderFrame(performance.now(), reducedMotion);
  });
  resizeObserver.observe(host);
  resize();
  renderFrame(performance.now(), reducedMotion);

  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      setRunning(visible);
      if (visible && reducedMotion) renderFrame(performance.now(), true);
    },
    { threshold: 0.05 },
  );
  visibilityObserver.observe(host);

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handleMotionChange = (event: MediaQueryListEvent) => {
    reducedMotion = event.matches;
    if (reducedMotion) {
      setRunning(false);
      renderFrame(performance.now(), true);
    } else {
      bloomStartedAt = performance.now() - totalBloomTime * 1000;
      setRunning(visible);
    }
  };
  motionQuery.addEventListener("change", handleMotionChange);

  return {
    dispose() {
      disposed = true;
      renderer.setAnimationLoop(null);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      motionQuery.removeEventListener("change", handleMotionChange);
      for (const petal of petals) petal.geometry.dispose();
      petalMaterial.dispose();
      seedPodGeometry.dispose();
      seedPodMaterial.dispose();
      seedGeometry.dispose();
      seedMaterial.dispose();
      filamentGeometry.dispose();
      filamentMaterial.dispose();
      stamenGeometry.dispose();
      stamenMaterial.dispose();
      shadowGeometry.dispose();
      shadowMaterial.dispose();
      shadowTexture?.dispose();
      renderer.dispose();
    },
  };
}
