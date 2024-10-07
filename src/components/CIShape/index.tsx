import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const DShape = (props: ThreeElements['mesh']) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const swaySpeedRef = useRef(0.01);
  const swayAmplitudeRef = useRef(1.0);
  const elapsedTimeRef = useRef(0);

  useFrame(() => {
    if (meshRef.current) {
      elapsedTimeRef.current += swaySpeedRef.current;
      meshRef.current.rotation.y = Math.sin(elapsedTimeRef.current) * swayAmplitudeRef.current;
    }
  });

  useEffect(() => {
    const shape = new THREE.Shape();
    shape.moveTo(18.9, 9.7);
    shape.lineTo(30.5, 9.7);
    shape.lineTo(30.5, 0.2);
    shape.lineTo(0.7, 0.2);
    shape.lineTo(0.7, 73.5);
    shape.lineTo(30.5, 73.5);
    shape.lineTo(30.5, 64.3);
    shape.lineTo(18.9, 64.3);
    shape.lineTo(18.9, 9.7);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 10,
      bevelEnabled: true,
      bevelSize: 1.5,
      bevelThickness: 1.5,
      bevelSegments: 10,
      curveSegments: 64,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    if (meshRef.current) meshRef.current.geometry = geometry;
  }, []);

  return (
    <mesh
      {...props}
      ref={meshRef as never}
      scale={[1, 1, 1]}
      rotation={[
        THREE.MathUtils.degToRad(18),
        THREE.MathUtils.degToRad(26),
        THREE.MathUtils.degToRad(8.1),
      ]}
    >
      <meshStandardMaterial attach="material" metalness={0.8} roughness={0.2} color={0x363850} />
    </mesh>
  );
};

const CIShape = () => {
  return (
    <Canvas camera={{ position: [0, 0, 80], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7.5]} intensity={1} />
      <Environment preset="sunset" />
      <DShape />
      <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default CIShape;