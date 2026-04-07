import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "../translations";

export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-navy-700/50 rounded-full blur-[120px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          style={{ y }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Visually Hidden H1 for SEO */}
          <h1 className="sr-only">CornerstoneAI - Вэбсайт хөгжүүлэлт, Апп хөгжүүлэлт, Брэнд бүтээх, Бизнес зөвлөгөө</h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-gold-500 text-xs font-bold tracking-widest uppercase mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
            </span>
            {t('hero_title_1')} {t('hero_title_2')}
          </motion.div>
          
          <div className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-8" aria-hidden="true">
            {t('hero_title_1')} <br />
            <span className="text-gradient-gold">{t('hero_title_2')}</span>
          </div>
          
          <p className="text-lg text-white/60 max-w-xl mb-10 leading-relaxed">
            {t('hero_desc')}
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ x: 5, y: -2 }}
                className="px-8 py-4 bg-gold-500 text-navy-900 rounded-full font-bold flex items-center gap-2 glow-gold group"
              >
                {t('nav_cta')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ x: -5, y: -2 }}
                className="px-8 py-4 glass rounded-full font-bold flex items-center gap-2 hover:bg-white/10 transition-colors"
              >
                <Calendar className="w-5 h-5 text-gold-500" />
                {t('hero_cta')}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* 3D Cornerstone Block Animation */}
        <div className="relative flex justify-center items-center h-[500px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-64 h-64 preserve-3d"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              animate={{ 
                rotateY: [0, 360],
                rotateX: [0, 10, 0],
                y: [0, -20, 0]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="w-full h-full relative preserve-3d"
            >
              {/* Cube Sides */}
              {[
                "translateZ(128px)",
                "rotateY(180deg) translateZ(128px)",
                "rotateY(90deg) translateZ(128px)",
                "rotateY(-90deg) translateZ(128px)",
                "rotateX(90deg) translateZ(128px)",
                "rotateX(-90deg) translateZ(128px)",
              ].map((transform, i) => (
                <div
                  key={i}
                  className="absolute inset-0 border-2 border-gold-500/30 bg-navy-800/80 backdrop-blur-sm flex items-center justify-center"
                  style={{ transform, backfaceVisibility: "hidden" }}
                >
                  <div className="w-1/2 h-1/2 border border-gold-500/20 rounded-full animate-pulse" />
                </div>
              ))}
              
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-gold-500/20 blur-3xl rounded-full" />
            </motion.div>
            
            {/* Neural Network Connections (Simplified with CSS) */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
               <div className="absolute top-0 left-0 w-full h-full border border-gold-500/10 rounded-full animate-spin-slow" />
               <div className="absolute top-0 left-0 w-full h-full border border-gold-500/5 rounded-full animate-reverse-spin-slow" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
