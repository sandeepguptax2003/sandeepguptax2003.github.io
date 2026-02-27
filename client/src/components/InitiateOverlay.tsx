import { useState, useEffect } from 'react';

interface InitiateOverlayProps {
  onInitiate: () => void;
  phase: 'intro' | 'vault-opening' | 'nexus';
}

export default function InitiateOverlay({ onInitiate, phase }: InitiateOverlayProps) {
  const [showButton, setShowButton] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      onInitiate();
    }, 600);
  };

  if (phase !== 'intro') return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ background: 'radial-gradient(ellipse at center, #0d0a08 0%, #050302 70%, #000000 100%)' }}
      data-testid="overlay-initiate"
    >
      <div className="scanline-overlay absolute inset-0 pointer-events-none" />

      <div
        className={`mb-16 transition-all duration-1000 ${
          showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="text-center mb-2">
          <span className="text-[10px] tracking-[0.5em] uppercase" style={{ color: '#6b5a45' }}>
            System v2.7.1
          </span>
        </div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, #c27828)' }} />
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: '#8B7355' }}>
            Authorized Personnel Only
          </span>
          <div className="w-8 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, #c27828)' }} />
        </div>
      </div>

      <button
        onClick={handleClick}
        disabled={isExiting}
        className={`initiate-btn relative px-12 py-4 text-sm font-semibold tracking-[0.3em] uppercase transition-all duration-700 cursor-pointer ${
          showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{
          color: '#e8d5b8',
          background: 'linear-gradient(135deg, rgba(194, 120, 40, 0.08) 0%, rgba(139, 105, 20, 0.04) 100%)',
          border: '1px solid rgba(194, 120, 40, 0.4)',
          borderRadius: '2px',
          backdropFilter: 'blur(10px)',
          transitionDelay: showButton ? '400ms' : '0ms',
        }}
        data-testid="button-initiate"
      >
        <span className="relative z-10">Initiate Sequence</span>

        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(194, 120, 40, 0.15) 0%, rgba(139, 105, 20, 0.08) 100%)',
          }}
        />
      </button>

      <div
        className={`mt-16 flex items-center gap-4 transition-all duration-1000 ${
          showButton ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '800ms' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#c27828' }} />
          <span className="text-[10px] tracking-widest uppercase" style={{ color: '#5a4a38' }}>
            Vault Status: Sealed
          </span>
        </div>
        <div className="w-[1px] h-3" style={{ backgroundColor: '#2a2018' }} />
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#2d8a4e' }} />
          <span className="text-[10px] tracking-widest uppercase" style={{ color: '#5a4a38' }}>
            Systems Online
          </span>
        </div>
      </div>

      <div
        className={`absolute bottom-8 transition-all duration-1000 ${
          showButton ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1200ms' }}
      >
        <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: '#3a3028' }}>
          Sandeep Gupta Portfolio &mdash; Classified
        </span>
      </div>
    </div>
  );
}
