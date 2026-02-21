import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  {
    title: "Template биш стратеги",
    description: "Бид бэлэн загвар ашигладаггүй, харин таны бизнесийн зорилгод нийцсэн стратегийг боловсруулдаг."
  },
  {
    title: "AI-ээр сайжруулсан систем",
    description: "Хамгийн сүүлийн үеийн AI технологиудыг ашиглан үр ашгийг нэмэгдүүлнэ."
  },
  {
    title: "Борлуулалт төвтэй дизайн",
    description: "Зөвхөн гоё харагдах биш, бодит борлуулалт авчрах дизайны шийдлүүд."
  },
  {
    title: "Урт хугацааны суурь",
    description: "Ирээдүйд хэмжээгээ тэлэх боломжтой бат бөх технологийн суурь."
  }
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-navy-800/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative h-[500px] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Central Core */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="relative z-20 w-48 h-48"
              >
                <div className="absolute inset-0 bg-gold-500/20 blur-3xl rounded-full animate-pulse" />
                <div className="w-full h-full glass rounded-[40px] border-2 border-gold-500/30 flex items-center justify-center rotate-45 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gold-500/20 to-transparent absolute inset-0" />
                  <motion.div 
                    animate={{ rotate: -405 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="font-serif font-bold text-6xl text-gold-500 z-10"
                  >
                    C
                  </motion.div>
                </div>
              </motion.div>

              {/* Orbiting Nodes & Connections */}
              <div className="absolute inset-0 z-10">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    animate={{
                      rotate: [i * 60, i * 60 + 360],
                    }}
                    transition={{
                      duration: 15 + i * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <motion.div
                      animate={{
                        x: [120, 160, 120],
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-4 h-4 rounded-full bg-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                    />
                    {/* Connecting Line to Center */}
                    <div 
                      className="absolute top-2 left-2 h-[1px] bg-gradient-to-r from-gold-500/50 to-transparent origin-left"
                      style={{ width: '140px', transform: 'rotate(180deg)' }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Data Flow Particles */}
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`p-${i}`}
                    initial={{ 
                      x: Math.random() * 400 - 200, 
                      y: Math.random() * 400 - 200,
                      opacity: 0 
                    }}
                    animate={{ 
                      y: [null, Math.random() * -100 - 50],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2 + Math.random() * 3, 
                      repeat: Infinity, 
                      delay: Math.random() * 5 
                    }}
                    className="absolute w-1 h-1 bg-gold-400 rounded-full"
                  />
                ))}
              </div>

              {/* Rotating Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[300px] h-[300px] border border-gold-500/10 rounded-full animate-spin-slow" />
                <div className="w-[400px] h-[400px] border border-gold-500/5 rounded-full animate-reverse-spin-slow" />
              </div>
            </motion.div>
          </div>

          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold mb-12"
            >
              Яагаад <span className="text-gradient-gold">CornerstoneAI?</span>
            </motion.h2>

            <div className="space-y-8">
              {reasons.map((reason, i) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-gold-500 transition-colors duration-300">
                    <CheckCircle2 className="w-6 h-6 text-gold-500 group-hover:text-navy-900 transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold mb-2">{reason.title}</h3>
                    <p className="text-white/50 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
