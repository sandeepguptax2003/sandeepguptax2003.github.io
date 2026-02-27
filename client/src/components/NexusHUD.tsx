import { useState, useEffect } from 'react';

interface NexusHUDProps {
  visible: boolean;
}

export default function NexusHUD({ visible }: NexusHUDProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!show) return null;

  return (
    <>
      <div
        className="fixed top-6 left-6 z-30 transition-all duration-1000"
        style={{ opacity: show ? 1 : 0, transform: show ? 'translateX(0)' : 'translateX(-20px)' }}
        data-testid="hud-top-left"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#c27828' }} />
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: '#8B7355' }}>
            Command Nexus Active
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          {['Core Systems', 'Network Integrity', 'Security Protocol'].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: i === 2 ? '#c27828' : '#2d8a4e' }} />
              <span className="text-[9px] tracking-widest uppercase" style={{ color: '#5a4a38' }}>
                {label}
              </span>
              <span className="text-[9px] tracking-widest" style={{ color: i === 2 ? '#c27828' : '#2d8a4e' }}>
                {i === 2 ? 'ACTIVE' : 'NOMINAL'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="fixed top-6 right-6 z-30 text-right transition-all duration-1000"
        style={{ opacity: show ? 1 : 0, transform: show ? 'translateX(0)' : 'translateX(20px)' }}
        data-testid="hud-top-right"
      >
        <div className="flex items-center gap-3 justify-end mb-3">
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: '#8B7355' }}>
            Portfolio Interface
          </span>
          <div className="w-6 h-[1px]" style={{ backgroundColor: '#c27828' }} />
        </div>
        <div className="text-[9px] tracking-widest uppercase" style={{ color: '#5a4a38' }}>
          Architect: Sandeep Gupta
        </div>
        <div className="text-[9px] tracking-widest uppercase mt-1" style={{ color: '#3a3028' }}>
          Click Projects to Inspect
        </div>
      </div>

      <div
        className="fixed bottom-6 left-6 z-30 transition-all duration-1000"
        style={{ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(20px)' }}
        data-testid="hud-bottom-left"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#c27828" strokeWidth="0.5" opacity="0.5" />
              <circle cx="6" cy="6" r="2" fill="#c27828" opacity="0.6" />
            </svg>
            <span className="text-[9px] tracking-widest uppercase" style={{ color: '#5a4a38' }}>
              Drag to Rotate
            </span>
          </div>
          <div className="w-[1px] h-3" style={{ backgroundColor: '#2a2018' }} />
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="1" width="10" height="10" rx="1" stroke="#c27828" strokeWidth="0.5" opacity="0.5" />
              <path d="M4 6L6 4L8 6" stroke="#c27828" strokeWidth="0.8" opacity="0.6" />
            </svg>
            <span className="text-[9px] tracking-widest uppercase" style={{ color: '#5a4a38' }}>
              Click to Focus
            </span>
          </div>
        </div>
      </div>

      <div
        className="fixed bottom-6 right-6 z-30 transition-all duration-1000"
        style={{ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(20px)' }}
        data-testid="hud-bottom-right"
      >
        <div className="flex flex-col items-end gap-1">
          <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: '#3a3028' }}>
            Node.js / React / PostgreSQL / Docker
          </span>
          <div className="flex items-center gap-2">
            <div className="w-16 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, #c27828)' }} />
            <span className="text-[9px] tracking-widest uppercase" style={{ color: '#5a4a38' }}>
              Backend Specialist
            </span>
          </div>
        </div>
      </div>

      <div className="fixed top-0 left-0 w-full h-[1px] z-30" style={{ background: 'linear-gradient(to right, transparent, rgba(194, 120, 40, 0.15), transparent)' }} />
      <div className="fixed bottom-0 left-0 w-full h-[1px] z-30" style={{ background: 'linear-gradient(to right, transparent, rgba(194, 120, 40, 0.15), transparent)' }} />
      <div className="fixed top-0 left-0 w-[1px] h-full z-30" style={{ background: 'linear-gradient(to bottom, transparent, rgba(194, 120, 40, 0.1), transparent)' }} />
      <div className="fixed top-0 right-0 w-[1px] h-full z-30" style={{ background: 'linear-gradient(to bottom, transparent, rgba(194, 120, 40, 0.1), transparent)' }} />

      <div className="fixed top-4 left-4 w-3 h-3 z-30" style={{ borderTop: '1px solid rgba(194, 120, 40, 0.3)', borderLeft: '1px solid rgba(194, 120, 40, 0.3)' }} />
      <div className="fixed top-4 right-4 w-3 h-3 z-30" style={{ borderTop: '1px solid rgba(194, 120, 40, 0.3)', borderRight: '1px solid rgba(194, 120, 40, 0.3)' }} />
      <div className="fixed bottom-4 left-4 w-3 h-3 z-30" style={{ borderBottom: '1px solid rgba(194, 120, 40, 0.3)', borderLeft: '1px solid rgba(194, 120, 40, 0.3)' }} />
      <div className="fixed bottom-4 right-4 w-3 h-3 z-30" style={{ borderBottom: '1px solid rgba(194, 120, 40, 0.3)', borderRight: '1px solid rgba(194, 120, 40, 0.3)' }} />
    </>
  );
}
