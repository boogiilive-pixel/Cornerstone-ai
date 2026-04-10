import { motion } from "motion/react";

export default function SectionDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden">
      {/* Base Line */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Animated Glow */}
      <motion.div 
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut",
          repeatDelay: 1
        }}
        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent blur-sm"
      />
      
      {/* Sharp Center Line */}
      <motion.div 
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut",
          repeatDelay: 1
        }}
        className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
      />
    </div>
  );
}
