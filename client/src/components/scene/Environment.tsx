import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GodRays() {
  const raysRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (raysRef.current) {
      raysRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  const rays = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      rotation: (i / 6) * Math.PI * 2,
      height: 15 + Math.random() * 5,
      width: 0.3 + Math.random() * 0.4,
      opacity: 0.02 + Math.random() * 0.03,
    }));
  }, []);

  return (
    <group ref={raysRef} position={[0, 5, 0]}>
      {rays.map((ray, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(ray.rotation) * 3,
            0,
            Math.cos(ray.rotation) * 3,
          ]}
          rotation={[0, ray.rotation, 0]}
        >
          <planeGeometry args={[ray.width, ray.height]} />
          <meshBasicMaterial
            color="#c27828"
            transparent
            opacity={ray.opacity}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function GridFloor() {
  return (
    <group position={[0, -4, 0]}>
      <gridHelper
        args={[40, 40, '#1a1410', '#0d0a05']}
        rotation={[0, 0, 0]}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          color="#080604"
          metalness={0.9}
          roughness={0.4}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
      const positions = (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.getElapsedTime() * 0.2 + i) * 0.002;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#c27828"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

interface EnvironmentProps {
  showNexus: boolean;
}

export default function SceneEnvironment({ showNexus }: EnvironmentProps) {
  return (
    <>
      <ambientLight intensity={0.05} color="#c27828" />

      <directionalLight
        position={[5, 10, 5]}
        intensity={0.3}
        color="#e8a840"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <pointLight position={[-8, 5, -5]} intensity={0.4} color="#c27828" distance={20} />
      <pointLight position={[8, 3, 5]} intensity={0.3} color="#8B6914" distance={15} />
      <pointLight position={[0, -3, 8]} intensity={0.2} color="#e8a840" distance={12} />

      <spotLight
        position={[0, 12, 0]}
        angle={0.4}
        penumbra={0.8}
        intensity={0.6}
        color="#c27828"
        castShadow
        target-position={[0, 0, 0]}
      />

      <fog attach="fog" args={['#080604', 8, 35]} />

      {showNexus && (
        <>
          <GodRays />
          <FloatingParticles />
        </>
      )}
      <GridFloor />
    </>
  );
}
