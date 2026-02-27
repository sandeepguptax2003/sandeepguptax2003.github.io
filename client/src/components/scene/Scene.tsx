import { Suspense, Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { Canvas } from '@react-three/fiber';
import VaultDoor from './VaultDoor';
import NexusCore from './NexusCore';
import ProjectHolograms from './ProjectHolograms';
import HeroText from './HeroText';
import SceneEnvironment from './Environment';
import CameraController from './CameraController';

interface SceneProps {
  phase: 'intro' | 'vault-opening' | 'nexus';
  onVaultOpenComplete: () => void;
  onSnapSound: () => void;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL not available:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function WebGLFallback() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at center, #1a1410 0%, #080604 100%)' }}
      data-testid="webgl-fallback"
    >
      <div className="text-center">
        <div className="text-2xl font-bold mb-2" style={{ color: '#e8d5b8' }}>
          SANDEEP GUPTA
        </div>
        <div className="text-xs tracking-[0.3em] uppercase" style={{ color: '#8B7355' }}>
          Backend Architect
        </div>
        <div className="mt-6 text-[10px] tracking-widest" style={{ color: '#5a4a38' }}>
          3D experience requires WebGL support
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#c27828" wireframe />
    </mesh>
  );
}

export default function Scene({ phase, onVaultOpenComplete, onSnapSound }: SceneProps) {
  return (
    <WebGLErrorBoundary fallback={<WebGLFallback />}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: 3,
          toneMappingExposure: 1.2,
          alpha: false,
          failIfMajorPerformanceCaveat: false,
        }}
        camera={{ position: [0, 0, 12], fov: 55, near: 0.1, far: 100 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        data-testid="canvas-3d"
        onCreated={() => {
          console.log('3D scene initialized successfully');
        }}
      >
        <color attach="background" args={['#080604']} />

        <Suspense fallback={<LoadingFallback />}>
          <CameraController phase={phase} />
          <SceneEnvironment showNexus={phase === 'nexus'} />

          <VaultDoor
            isOpen={phase === 'vault-opening' || phase === 'nexus'}
            onOpenComplete={onVaultOpenComplete}
          />

          <NexusCore visible={phase === 'nexus'} />
          <HeroText visible={phase === 'nexus'} />
          <ProjectHolograms
            visible={phase === 'nexus'}
            onSnap={onSnapSound}
          />
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  );
}
