import { motion } from "motion/react";
import { useLanguage } from "../translations";

export default function Process() {
  const { t, language } = useLanguage();

  const steps = [
    {
      title: "Foundation Audit",
      subtitle: { mn: "Оношлогоо", en: "Diagnosis" },
      description: { 
        mn: "Таны бизнесийн одоогийн байдал болон хэрэгцээг нарийвчлан судална.", 
        en: "We analyze your current business state and needs in detail." 
      }
    },
    {
      title: "Strategic Architecture",
      subtitle: { mn: "Стратеги", en: "Strategy" },
      description: { 
        mn: "Хамгийн оновчтой технологийн болон бизнесийн архитектурыг боловсруулна.", 
        en: "We develop the most optimal technological and business architecture." 
      }
    },
    {
      title: "Design & Build",
      subtitle: { mn: "Хөгжүүлэлт", en: "Development" },
      description: { 
        mn: "Premium дизайн болон өндөр гүйцэтгэлтэй кодчилол.", 
        en: "Premium design and high-performance coding." 
      }
    },
    {
      title: "AI Integration",
      subtitle: { mn: "Интеграци", en: "Integration" },
      description: { 
        mn: "AI болон автоматжуулалтын системүүдийг бизнест тань нэвтрүүлнэ.", 
        en: "Implement AI and automation systems into your business." 
      }
    },
    {
      title: "Scale & Automate",
      subtitle: { mn: "Өсөлт", en: "Growth" },
      description: { 
        mn: "Бизнесийн өсөлтийг дэмжиж, үйл ажиллагааг автоматжуулна.", 
        en: "Support business growth and automate operations." 
      }
    }
  ];

  return (
    <section id="process" className="py-24 bg-navy-800/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
          >
            {language === 'mn' ? 'Бидний' : 'Our'} <span className="text-gradient-gold">{t('nav_process')}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-2xl"
          >
            {language === 'mn' ? 'Бид системтэй, үр дүнтэй арга барилаар таны төслийг амжилтанд хүргэдэг.' : 'We lead your project to success with a systematic and effective approach.'}
          </motion.p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 hidden lg:block" />
          
          <div className="grid lg:grid-cols-5 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {/* Dot */}
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center mb-8 mx-auto lg:mx-0 relative">
                   <div className="w-3 h-3 rounded-full bg-gold-500 animate-pulse" />
                   <motion.div 
                     initial={{ scale: 0 }}
                     whileInView={{ scale: 1 }}
                     transition={{ delay: i * 0.1 + 0.5 }}
                     className="absolute -inset-2 border border-gold-500/20 rounded-full"
                   />
                </div>

                <div className="text-center lg:text-left">
                  <span className="text-gold-500 font-mono text-xs font-bold tracking-widest uppercase mb-2 block">
                    {language === 'mn' ? 'Алхам' : 'Step'} 0{i + 1}
                  </span>
                  <h3 className="text-xl font-serif font-bold mb-2">{step.title}</h3>
                  <p className="text-gold-500/80 text-sm font-medium mb-4 italic">{step.subtitle[language]}</p>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {step.description[language]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
