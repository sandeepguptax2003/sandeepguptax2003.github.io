import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface HeroTextProps {
  visible: boolean;
}

export default function HeroText({ visible }: HeroTextProps) {
  const groupRef = useRef<THREE.Group>(null);
  const subtitleRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!visible || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    if (subtitleRef.current) {
      subtitleRef.current.position.y = -0.7 + Math.sin(t * 0.5) * 0.05;
    }
  });

  if (!visible) return null;

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.15}>
      <group ref={groupRef} position={[0, 3.2, 0]}>
        <Text
          fontSize={0.6}
          color="#e8d5b8"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
          font="/fonts/Inter-Bold.woff"
        >
          SANDEEP GUPTA
          <meshStandardMaterial
            color="#e8d5b8"
            emissive="#c27828"
            emissiveIntensity={0.4}
            metalness={0.6}
            roughness={0.3}
          />
        </Text>

        <group ref={subtitleRef} position={[0, -0.7, 0]}>
          <Text
            fontSize={0.18}
            color="#8B7355"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.35}
            font="/fonts/Inter-Regular.woff"
          >
            BACKEND ARCHITECT
            <meshStandardMaterial
              color="#8B7355"
              emissive="#c27828"
              emissiveIntensity={0.2}
              metalness={0.5}
              roughness={0.4}
            />
          </Text>
        </group>

        <mesh position={[-1.8, -0.35, 0]}>
          <boxGeometry args={[0.8, 0.002, 0.001]} />
          <meshStandardMaterial
            color="#c27828"
            emissive="#c27828"
            emissiveIntensity={1}
            transparent
            opacity={0.5}
          />
        </mesh>
        <mesh position={[1.8, -0.35, 0]}>
          <boxGeometry args={[0.8, 0.002, 0.001]} />
          <meshStandardMaterial
            color="#c27828"
            emissive="#c27828"
            emissiveIntensity={1}
            transparent
            opacity={0.5}
          />
        </mesh>

        <pointLight position={[0, 0, 2]} intensity={2} color="#c27828" distance={8} />
      </group>
    </Float>
  );
}
