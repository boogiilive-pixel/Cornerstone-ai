import { motion } from "motion/react";

const steps = [
  {
    title: "Foundation Audit",
    subtitle: "Оношлогоо",
    description: "Таны бизнесийн одоогийн байдал болон хэрэгцээг нарийвчлан судална."
  },
  {
    title: "Strategic Architecture",
    subtitle: "Стратеги",
    description: "Хамгийн оновчтой технологийн болон бизнесийн архитектурыг боловсруулна."
  },
  {
    title: "Design & Build",
    subtitle: "Хөгжүүлэлт",
    description: "Premium дизайн болон өндөр гүйцэтгэлтэй кодчилол."
  },
  {
    title: "AI Integration",
    subtitle: "Интеграци",
    description: "AI болон автоматжуулалтын системүүдийг бизнест тань нэвтрүүлнэ."
  },
  {
    title: "Scale & Automate",
    subtitle: "Өсөлт",
    description: "Бизнесийн өсөлтийг дэмжиж, үйл ажиллагааг автоматжуулна."
  }
];

export default function Process() {
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
            Бидний <span className="text-gradient-gold">Ажлын Процесс</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-2xl"
          >
            Бид системтэй, үр дүнтэй арга барилаар таны төслийг амжилтанд хүргэдэг.
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
                    Step 0{i + 1}
                  </span>
                  <h3 className="text-xl font-serif font-bold mb-2">{step.title}</h3>
                  <p className="text-gold-500/80 text-sm font-medium mb-4 italic">{step.subtitle}</p>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {step.description}
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
