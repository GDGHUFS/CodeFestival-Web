'use client';
import { Environment } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { clsx } from 'clsx';
import {
  RefObject,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { preload } from 'react-dom';
import * as THREE from 'three';

import * as styles from './styles.css';

const BRACKET = {
  width: 30,
  height: 66.6,
  stem: 18.3,
  bar: 8.5,
  depth: 8,
  bevel: 0.9,
};

const TILT = THREE.MathUtils.degToRad(17);
const BASE_PITCH = THREE.MathUtils.degToRad(6);
const SWAY_SPEED = 0.6;
const SWAY_AMPLITUDE = 0.5;

const FRAME_HALF_HEIGHT = 38.5;
const FRAME_HALF_WIDTH = 29;

const BRACKET_COLOR = '#7D8296';

const DISPLAY_SCALE = 0.8;

const ENTRANCE_DURATION = 1.1;
const ENTRANCE_SPIN = -Math.PI * 0.6;
const ENTRANCE_SCALE = 0.72;
const ENTRANCE_DROP = -10;
const MAX_FRAME_DELTA = 1 / 30;

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
const easeOutBack = (t: number) => {
  const overshoot = 1.4;
  return 1 + (overshoot + 1) * (t - 1) ** 3 + overshoot * (t - 1) ** 2;
};

const halfWidth = BRACKET.width / 2;
const halfHeight = BRACKET.height / 2;

const createBracketGeometry = () => {
  const { stem, bar, depth, bevel } = BRACKET;
  const shape = new THREE.Shape();
  shape.moveTo(-halfWidth, halfHeight);
  shape.lineTo(halfWidth, halfHeight);
  shape.lineTo(halfWidth, halfHeight - bar);
  shape.lineTo(-halfWidth + stem, halfHeight - bar);
  shape.lineTo(-halfWidth + stem, -halfHeight + bar);
  shape.lineTo(halfWidth, -halfHeight + bar);
  shape.lineTo(halfWidth, -halfHeight);
  shape.lineTo(-halfWidth, -halfHeight);
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSize: bevel,
    bevelThickness: bevel,
    bevelSegments: 6,
    curveSegments: 1,
  });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
};

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};

const usePrefersReducedMotion = () =>
  useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );

const useIsInView = (ref: RefObject<HTMLElement | null>) => {
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      rootMargin: '100px 0px',
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return isInView;
};

const CameraFit = () => {
  const camera = useThree(state => state.camera);
  const size = useThree(state => state.size);

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera) || size.height === 0) {
      return;
    }

    const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const aspect = size.width / size.height;
    const distance = Math.max(
      FRAME_HALF_HEIGHT / tanHalfFov,
      FRAME_HALF_WIDTH / (tanHalfFov * aspect),
    );
    camera.position.set(0, 0, distance);
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
};

type BracketProps = {
  reducedMotion: boolean;
  started: boolean;
};

const Bracket = ({ reducedMotion, started }: BracketProps) => {
  const tiltRef = useRef<THREE.Group>(null);
  const entranceRef = useRef<THREE.Group>(null);
  const swayRef = useRef<THREE.Group>(null);
  const elapsedRef = useRef(0);
  const entranceProgressRef = useRef(0);
  const geometry = useMemo(() => createBracketGeometry(), []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, rawDelta) => {
    if (!started) {
      return;
    }

    const delta = Math.min(rawDelta, MAX_FRAME_DELTA);

    if (entranceProgressRef.current < 1 && entranceRef.current) {
      entranceProgressRef.current = reducedMotion
        ? 1
        : Math.min(1, entranceProgressRef.current + delta / ENTRANCE_DURATION);

      const progress = entranceProgressRef.current;
      const eased = easeOutCubic(progress);
      entranceRef.current.rotation.y = (1 - eased) * ENTRANCE_SPIN;
      entranceRef.current.position.y = (1 - eased) * ENTRANCE_DROP;
      entranceRef.current.scale.setScalar(
        THREE.MathUtils.lerp(ENTRANCE_SCALE, 1, easeOutBack(progress)),
      );
    }

    if (!swayRef.current || !tiltRef.current) {
      return;
    }

    if (reducedMotion) {
      swayRef.current.rotation.y = 0;
      tiltRef.current.rotation.x = BASE_PITCH;
      return;
    }

    elapsedRef.current += delta;
    const sway = Math.sin(elapsedRef.current * SWAY_SPEED) * SWAY_AMPLITUDE;
    swayRef.current.rotation.y = THREE.MathUtils.lerp(
      swayRef.current.rotation.y,
      sway + state.pointer.x * 0.18,
      0.08,
    );
    tiltRef.current.rotation.x = THREE.MathUtils.lerp(
      tiltRef.current.rotation.x,
      BASE_PITCH - state.pointer.y * 0.12,
      0.08,
    );
  });

  return (
    <group ref={tiltRef} rotation={[BASE_PITCH, 0, TILT]} scale={DISPLAY_SCALE}>
      <group
        ref={entranceRef}
        rotation={[0, ENTRANCE_SPIN, 0]}
        position={[0, ENTRANCE_DROP, 0]}
        scale={ENTRANCE_SCALE}
      >
        <group ref={swayRef}>
          <mesh geometry={geometry}>
            <meshStandardMaterial color={BRACKET_COLOR} metalness={0.35} roughness={0.42} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

type ScenePreparerProps = {
  onPrepared: () => void;
};

const ScenePreparer = ({ onPrepared }: ScenePreparerProps) => {
  const gl = useThree(state => state.gl);
  const scene = useThree(state => state.scene);
  const camera = useThree(state => state.camera);

  useEffect(() => {
    let cancelled = false;

    gl.compileAsync(scene, camera)
      .catch(() => {})
      .finally(() => {
        if (!cancelled) onPrepared();
      });

    return () => {
      cancelled = true;
    };
  }, [gl, scene, camera, onPrepared]);

  return null;
};

const ENVIRONMENT = { path: '/static/hdri/', files: 'venice_sunset_256.hdr' };
const ENVIRONMENT_URL = `${ENVIRONMENT.path}${ENVIRONMENT.files}`;

type CIShapeProps = {
  start?: boolean;
  onPrepared?: () => void;
};

const CIShape = ({ start = true, onPrepared }: CIShapeProps) => {
  preload(ENVIRONMENT_URL, { as: 'fetch', crossOrigin: 'anonymous' });

  const containerRef = useRef<HTMLDivElement>(null);
  const [isPrepared, setIsPrepared] = useState(false);
  const handlePrepared = useCallback(() => {
    setIsPrepared(true);
    onPrepared?.();
  }, [onPrepared]);
  const reducedMotion = usePrefersReducedMotion();
  const isInView = useIsInView(containerRef);

  const frameloop = !isInView ? 'never' : !start || reducedMotion ? 'demand' : 'always';

  return (
    <div
      ref={containerRef}
      className={clsx(styles.canvas, isPrepared && start && styles.canvasReady)}
    >
      <Canvas camera={{ position: [0, 0, 140], fov: 35 }} dpr={[1, 2]} frameloop={frameloop}>
        <CameraFit />
        <ambientLight intensity={0.35} />
        <directionalLight position={[-20, 30, 40]} intensity={1.1} />
        <Suspense fallback={null}>
          <Environment {...ENVIRONMENT} environmentIntensity={0.55} />
          <Bracket reducedMotion={reducedMotion} started={start} />
          <ScenePreparer onPrepared={handlePrepared} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CIShape;
