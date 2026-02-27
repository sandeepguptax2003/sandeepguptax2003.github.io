import { useRef, useState, useCallback, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  color: string;
  icon: string;
}

const PROJECTS: Project[] = [
  {
    id: 'jungle-buy',
    title: 'Jungle Buy',
    description: 'Full-stack e-commerce platform with real-time inventory management and payment processing',
    tech: ['Node.js', 'React', 'MongoDB', 'Stripe'],
    color: '#2d8a4e',
    icon: 'S',
  },
  {
    id: 'chat-mate',
    title: 'Chat Mate',
    description: 'Real-time messaging application with WebSocket architecture and end-to-end encryption',
    tech: ['Socket.io', 'Express', 'Redis', 'PostgreSQL'],
    color: '#2563eb',
    icon: 'C',
  },
  {
    id: 'health-connect',
    title: 'Health Connect+',
    description: 'Healthcare platform connecting patients with providers through secure telehealth integration',
    tech: ['Python', 'FastAPI', 'React', 'AWS'],
    color: '#dc2626',
    icon: 'H',
  },
  {
    id: 'dev-ops-hub',
    title: 'DevOps Hub',
    description: 'CI/CD pipeline management dashboard with automated deployment and monitoring',
    tech: ['Docker', 'Kubernetes', 'Go', 'Grafana'],
    color: '#7c3aed',
    icon: 'D',
  },
  {
    id: 'data-forge',
    title: 'Data Forge',
    description: 'ETL pipeline builder with visual workflow editor and real-time data transformation',
    tech: ['Apache Spark', 'Kafka', 'Python', 'React'],
    color: '#ea580c',
    icon: 'F',
  },
];

interface HologramCardProps {
  project: Project;
  index: number;
  total: number;
  focusedIndex: number | null;
  onFocus: (index: number) => void;
  onSnap: () => void;
}

function HologramCard({ project, index, total, focusedIndex, onFocus, onSnap }: HologramCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const baseAngle = (index / total) * Math.PI * 2;
  const radius = 4.5;
  const isFocused = focusedIndex === index;

  const targetPos = useMemo(() => {
    if (isFocused) {
      return new THREE.Vector3(0, 0.5, 3);
    }
    return new THREE.Vector3(
      Math.sin(baseAngle) * radius,
      Math.sin(baseAngle * 2) * 0.3,
      Math.cos(baseAngle) * radius
    );
  }, [isFocused, baseAngle, radius]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.position.lerp(targetPos, 0.05);

    if (!isFocused) {
      groupRef.current.position.y += Math.sin(t * 0.8 + index) * 0.003;
    }

    groupRef.current.lookAt(0, 0, 0);
    groupRef.current.rotateY(Math.PI);

    const targetScale = isFocused ? 1.3 : hovered ? 1.08 : 1;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08
    );
  });

  const handleClick = useCallback(() => {
    onFocus(isFocused ? -1 : index);
    onSnap();
  }, [onFocus, onSnap, index, isFocused]);

  return (
    <group
      ref={groupRef}
      position={[Math.sin(baseAngle) * radius, 0, Math.cos(baseAngle) * radius]}
      onClick={handleClick}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      <RoundedBox
        ref={meshRef}
        args={[2.4, 3.2, 0.08]}
        radius={0.08}
        smoothness={4}
        castShadow
      >
        <meshStandardMaterial
          color="#0d0a08"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={isFocused ? 0.95 : 0.75}
          envMapIntensity={1.5}
        />
      </RoundedBox>

      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[2.2, 3]} />
        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={0.03}
        />
      </mesh>

      <mesh position={[-0.7, 1.1, 0.06]}>
        <circleGeometry args={[0.25, 32]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={hovered || isFocused ? 1.5 : 0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      <Text
        position={[-0.7, 1.1, 0.07]}
        fontSize={0.22}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        {project.icon}
      </Text>

      <Text
        position={[0.2, 1.1, 0.06]}
        fontSize={0.2}
        color="#e8d5b8"
        anchorX="left"
        anchorY="middle"
        maxWidth={1.2}
        font="/fonts/Inter-Bold.woff"
      >
        {project.title}
      </Text>

      <mesh position={[0, 0.7, 0.05]}>
        <boxGeometry args={[2, 0.003, 0.001]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
        />
      </mesh>

      <Text
        position={[-0.95, 0.35, 0.06]}
        fontSize={0.11}
        color="#a0917d"
        anchorX="left"
        anchorY="top"
        maxWidth={1.9}
        lineHeight={1.5}
        font="/fonts/Inter-Regular.woff"
      >
        {project.description}
      </Text>

      {project.tech.map((t, i) => (
        <group key={t} position={[-0.85 + i * 0.55, -0.95, 0.06]}>
          <RoundedBox args={[0.5, 0.18, 0.01]} radius={0.04} smoothness={2}>
            <meshStandardMaterial
              color={project.color}
              transparent
              opacity={0.15}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.07}
            color="#c0b098"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Regular.woff"
          >
            {t}
          </Text>
        </group>
      ))}

      <pointLight
        position={[0, 0, 0.5]}
        intensity={hovered || isFocused ? 1 : 0.3}
        color={project.color}
        distance={3}
      />

      <mesh position={[0, -1.35, 0.05]}>
        <boxGeometry args={[2, 0.003, 0.001]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

interface ProjectHologramsProps {
  visible: boolean;
  onSnap: () => void;
}

export default function ProjectHolograms({ visible, onSnap }: ProjectHologramsProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const prevPointerX = useRef(0);
  const rotationVelocity = useRef(0);
  const rotationAngle = useRef(0);

  useFrame(() => {
    if (!groupRef.current || !visible) return;

    if (!isDragging.current) {
      rotationVelocity.current *= 0.95;
      if (Math.abs(rotationVelocity.current) < 0.0001) {
        rotationVelocity.current = 0;
      }
    }

    rotationAngle.current += rotationVelocity.current;
    groupRef.current.rotation.y = rotationAngle.current;
  });

  const handlePointerDown = useCallback((e: any) => {
    if (e.button !== undefined && e.button !== 0) return;
    isDragging.current = true;
    prevPointerX.current = e.clientX || (e.touches?.[0]?.clientX ?? 0);
  }, []);

  const handlePointerMove = useCallback((e: any) => {
    if (!isDragging.current) return;
    const currentX = e.clientX || (e.touches?.[0]?.clientX ?? 0);
    const delta = (currentX - prevPointerX.current) * 0.003;
    rotationVelocity.current = delta;
    prevPointerX.current = currentX;
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  if (!visible) return null;

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {PROJECTS.map((project, index) => (
        <HologramCard
          key={project.id}
          project={project}
          index={index}
          total={PROJECTS.length}
          focusedIndex={focusedIndex}
          onFocus={(i) => setFocusedIndex(i === -1 ? null : i)}
          onSnap={onSnap}
        />
      ))}
    </group>
  );
}
