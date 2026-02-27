import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

interface VaultDoorProps {
  isOpen: boolean;
  onOpenComplete?: () => void;
}

export default function VaultDoor({ isOpen, onOpenComplete }: VaultDoorProps) {
  const leftDoorRef = useRef<THREE.Mesh>(null);
  const rightDoorRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const materialLeft = useRef<THREE.MeshStandardMaterial>(null);
  const materialRight = useRef<THREE.MeshStandardMaterial>(null);

  useEffect(() => {
    let tl: gsap.core.Timeline | null = null;

    if (isOpen) {
      tl = gsap.timeline({
        onComplete: () => {
          if (onOpenComplete) onOpenComplete();
        }
      });

      if (leftDoorRef.current && rightDoorRef.current) {
        tl.to(leftDoorRef.current.position, {
          x: -6,
          duration: 2.5,
          ease: 'power3.inOut',
        }, 0);

        tl.to(rightDoorRef.current.position, {
          x: 6,
          duration: 2.5,
          ease: 'power3.inOut',
        }, 0);

        if (materialLeft.current && materialRight.current) {
          tl.to([materialLeft.current, materialRight.current], {
            opacity: 0,
            duration: 1.5,
            ease: 'power2.in',
          }, 1.5);
        }
      }
    }

    return () => {
      if (tl) tl.kill();
    };
  }, [isOpen, onOpenComplete]);

  useFrame((state) => {
    if (groupRef.current && !isOpen) {
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.02;
    }
  });

  const doorGeometry = [4, 8, 0.5] as const;
  const doorMaterial = {
    color: new THREE.Color('#1a1410'),
    metalness: 0.95,
    roughness: 0.2,
    transparent: true,
    opacity: 1,
  };

  return (
    <group ref={groupRef} position={[0, 0, 3]}>
      <mesh ref={leftDoorRef} position={[-2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[...doorGeometry]} />
        <meshStandardMaterial ref={materialLeft} {...doorMaterial} />
        <mesh position={[1.2, 0, 0.3]}>
          <cylinderGeometry args={[0.15, 0.15, 1.5, 16]} />
          <meshStandardMaterial color="#8B6914" metalness={0.9} roughness={0.1} />
        </mesh>
        {[...Array(4)].map((_, i) => (
          <mesh key={`bolt-l-${i}`} position={[1.5, -3 + i * 2, 0.26]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.1, 8]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#6B5010" metalness={0.95} roughness={0.15} />
          </mesh>
        ))}
        {[...Array(3)].map((_, i) => (
          <mesh key={`line-l-${i}`} position={[-0.5 + i * 1, 0, 0.26]}>
            <boxGeometry args={[0.02, 7.5, 0.02]} />
            <meshStandardMaterial color="#2a2018" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
      </mesh>

      <mesh ref={rightDoorRef} position={[2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[...doorGeometry]} />
        <meshStandardMaterial ref={materialRight} {...doorMaterial} />
        <mesh position={[-1.2, 0, 0.3]}>
          <cylinderGeometry args={[0.15, 0.15, 1.5, 16]} />
          <meshStandardMaterial color="#8B6914" metalness={0.9} roughness={0.1} />
        </mesh>
        {[...Array(4)].map((_, i) => (
          <mesh key={`bolt-r-${i}`} position={[-1.5, -3 + i * 2, 0.26]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.1, 8]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#6B5010" metalness={0.95} roughness={0.15} />
          </mesh>
        ))}
        {[...Array(3)].map((_, i) => (
          <mesh key={`line-r-${i}`} position={[-0.5 + i * 1, 0, 0.26]}>
            <boxGeometry args={[0.02, 7.5, 0.02]} />
            <meshStandardMaterial color="#2a2018" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
      </mesh>

      <pointLight position={[0, 0, 1]} intensity={2} color="#c27828" distance={8} />
      <pointLight position={[-3, 2, 1]} intensity={0.5} color="#8B6914" distance={6} />
      <pointLight position={[3, -2, 1]} intensity={0.5} color="#8B6914" distance={6} />
    </group>
  );
}
