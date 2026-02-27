import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

interface CameraControllerProps {
  phase: 'intro' | 'vault-opening' | 'nexus';
}

export default function CameraController({ phase }: CameraControllerProps) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 12));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    if (phase === 'intro') {
      camera.position.set(0, 0, 12);
      camera.lookAt(0, 0, 0);
    }
  }, []);

  useEffect(() => {
    tweensRef.current.forEach(t => t.kill());
    tweensRef.current = [];

    if (phase === 'vault-opening') {
      const tw = gsap.to(camera.position, {
        x: 0,
        y: 0.5,
        z: -2,
        duration: 3.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          camera.lookAt(0, 0, -5);
        },
      });
      tweensRef.current.push(tw);
      targetPosition.current.set(0, 0.5, -2);
    }

    if (phase === 'nexus') {
      const tw1 = gsap.to(camera.position, {
        x: 0,
        y: 1.5,
        z: 9,
        duration: 3,
        ease: 'power2.inOut',
        delay: 0.5,
      });

      const tw2 = gsap.to(targetLookAt.current, {
        x: 0,
        y: 0,
        z: 0,
        duration: 3,
        ease: 'power2.inOut',
        delay: 0.5,
      });

      tweensRef.current.push(tw1, tw2);
      targetPosition.current.set(0, 1.5, 9);
    }

    return () => {
      tweensRef.current.forEach(t => t.kill());
      tweensRef.current = [];
    };
  }, [phase, camera]);

  useFrame((state) => {
    if (phase === 'nexus') {
      const t = state.clock.getElapsedTime();
      const swayX = Math.sin(t * 0.15) * 0.3;
      const swayY = Math.cos(t * 0.1) * 0.15;
      
      camera.position.x = targetPosition.current.x + swayX;
      camera.position.y = targetPosition.current.y + swayY;
      camera.lookAt(targetLookAt.current);
    }
  });

  return null;
}
