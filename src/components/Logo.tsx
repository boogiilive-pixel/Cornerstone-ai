import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  iconSize?: string;
  textSize?: string;
}

export default function Logo({ className = "", iconSize = "w-10 h-10", textSize = "text-2xl" }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${iconSize} grid grid-cols-2 gap-1`}>
        <div className="bg-gold-500 rounded-sm"></div>
        <div className="bg-gold-500/60 rounded-sm"></div>
        <div className="bg-gold-500/40 rounded-sm"></div>
        <div className="bg-gold-500/20 rounded-sm"></div>
      </div>
      <span className={`${textSize} font-serif font-bold tracking-tight text-white`}>
        Cornerstone<span className="text-gold-500">AI</span>
      </span>
    </div>
  );
}
