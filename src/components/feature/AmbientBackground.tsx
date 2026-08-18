import { useEffect, useState } from 'react';

export default function AmbientBackground() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate viewport percentage
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 1. Dynamic Cursor Ambient Glow */}
      <div
        className="absolute w-[650px] h-[650px] rounded-full blur-[140px] opacity-15 pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(197,168,128,0.35) 0%, rgba(140,109,70,0.12) 45%, transparent 70%)',
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* 2. Top Header Fixed Ambient Vignette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#C5A880]/[0.03] to-transparent pointer-events-none" />

      {/* 3. Architectural Drafting Lines (Subtle Vertical Blueprint Guides) */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex justify-between pointer-events-none opacity-40">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent hidden sm:block" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent hidden md:block" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
      </div>

      {/* 4. Film Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.025] mix-blend-screen bg-repeat bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
    </div>
  );
}
