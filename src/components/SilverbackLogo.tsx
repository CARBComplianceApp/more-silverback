import React from 'react';

interface SilverbackLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function SilverbackLogo({ className = '', size = 'md' }: SilverbackLogoProps) {
  // Determine width and height depending on size preset
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10 md:w-12 md:h-12',
    lg: 'w-14 h-14 md:w-16 md:h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`relative flex items-center justify-center bg-zinc-950/20 backdrop-blur-md rounded-xl p-1 border border-white/5 shadow-[0_0_20px_rgba(0,240,255,0.08)] ${sizeClasses[size]} ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full text-accent" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#d4d4d8" />
            <stop offset="70%" stopColor="#71717a" />
            <stop offset="100%" stopColor="#27272a" />
          </linearGradient>
          <linearGradient id="neon-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <filter id="glow-light" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Outer Tech Hexagon Matrix Cage */}
        <polygon 
          points="50,4 92,27 92,73 50,96 8,73 8,27" 
          stroke="url(#neon-cyan)" 
          strokeWidth="2" 
          strokeOpacity="0.8" 
          fill="none" 
          strokeDasharray="4 2"
        />
        
        {/* Abstract cyber grid connector lines */}
        <line x1="50" y1="4" x2="50" y2="18" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="92" y1="27" x2="78" y2="35" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="92" y1="73" x2="78" y2="65" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="50" y1="96" x2="50" y2="82" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="8" y1="73" x2="22" y2="65" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="8" y1="27" x2="22" y2="35" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.5" />

        {/* Polished Metallic Gorilla Face Mask */}
        {/* 1. Forehead Crest & Arch */}
        <path 
          d="M 28,32 L 50,38 L 72,32 L 64,43 L 50,45 L 36,43 Z" 
          fill="url(#silver-grad)" 
          stroke="#000" 
          strokeWidth="0.8" 
        />
        
        {/* 2. Temporal ridges and crown */}
        <polygon 
          points="28,32 36,18 50,22 64,18 72,32 60,34 50,36 40,34" 
          fill="#18181b" 
          stroke="url(#silver-grad)" 
          strokeWidth="1.2" 
        />

        {/* 3. Electronic Blue Cyber Eyes */}
        <rect x="33" y="47" width="11" height="4.5" rx="1.5" fill="#22d3ee" filter="url(#glow-light)" />
        <rect x="56" y="47" width="11" height="4.5" rx="1.5" fill="#22d3ee" filter="url(#glow-light)" />
        <path d="M 44,49 L 56,49" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="0.8" />

        {/* 4. Strong high cheekbones */}
        <path 
          d="M 24,52 L 35,58 L 35,68 L 22,64 Z" 
          fill="url(#silver-grad)" 
          stroke="#111" 
          strokeWidth="0.5" 
        />
        <path 
          d="M 76,52 L 65,58 L 65,68 L 78,64 Z" 
          fill="url(#silver-grad)" 
          stroke="#111" 
          strokeWidth="0.5" 
        />

        {/* 5. Metallic Mouth & Muzzle Guard */}
        <polygon 
          points="40,54 50,51 60,54 60,70 50,74 40,70" 
          fill="#27272a" 
          stroke="url(#silver-grad)" 
          strokeWidth="1.5" 
        />
        {/* High Tech Nostrils */}
        <circle cx="47" cy="61" r="2.2" fill="#0e7490" />
        <circle cx="47" cy="61" r="1" fill="#22d3ee" />
        <circle cx="53" cy="61" r="2.2" fill="#0e7490" />
        <circle cx="53" cy="61" r="1" fill="#22d3ee" />

        {/* 6. Heavy Chin Plate with central light indicator */}
        <polygon 
          points="38,76 50,81 62,76 59,86 50,89 41,86" 
          fill="url(#silver-grad)" 
          stroke="url(#neon-cyan)" 
          strokeWidth="1" 
        />
        <polygon 
          points="46,80 50,78 54,80 52,85 48,85" 
          fill="#22d3ee" 
          opacity="0.8"
        />
      </svg>
    </div>
  );
}
