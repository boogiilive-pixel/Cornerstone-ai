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
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full aspect-square glass rounded-[40px] flex items-center justify-center relative overflow-hidden group"
            >
              {/* Background Grid */}
              <div className="absolute inset-0 opacity-10" 
                style={{ 
                  backgroundImage: 'linear-gradient(to right, #D4AF37 1px, transparent 1px), linear-gradient(to bottom, #D4AF37 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} 
              />
              
              {/* Assembling UI Elements */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Header Block */}
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                  className="absolute top-12 left-12 right-12 h-8 glass rounded-lg border-gold-500/20 flex items-center px-4 gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-gold-500/40" />
                  <div className="w-12 h-1 bg-gold-500/20 rounded" />
                </motion.div>

                {/* Sidebar Block */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
                  className="absolute top-24 left-12 bottom-24 w-12 glass rounded-lg border-gold-500/20 flex flex-col items-center py-4 gap-4"
                >
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded bg-gold-500/10" />
                  ))}
                </motion.div>

                {/* Content Cards */}
                {[
                  { top: '24%', left: '30%', w: '120px', h: '80px', delay: 0.9 },
                  { top: '24%', left: '65%', w: '100px', h: '120px', delay: 1.1 },
                  { top: '55%', left: '30%', w: '140px', h: '100px', delay: 1.3 },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0, rotate: -10 }}
                    whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ delay: card.delay, duration: 0.8, type: "spring" }}
                    style={{ top: card.top, left: card.left, width: card.w, height: card.h }}
                    className="absolute glass rounded-xl border-gold-500/30 p-3 flex flex-col gap-2 shadow-xl"
                  >
                    <div className="w-1/2 h-2 bg-gold-500/30 rounded" />
                    <div className="w-full h-1 bg-gold-500/10 rounded" />
                    <div className="w-full h-1 bg-gold-500/10 rounded" />
                    <div className="mt-auto w-8 h-4 bg-gold-500/40 rounded-md self-end" />
                  </motion.div>
                ))}

                {/* Floating Code Snippets */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="absolute bottom-12 right-12 glass rounded-lg border-gold-500/20 p-4 font-mono text-[8px] text-gold-500/60"
                >
                  <div>const app = () =&gt; &#123;</div>
                  <div className="pl-2">return &lt;AI /&gt;;</div>
                  <div>&#125;;</div>
                </motion.div>
              </div>

              {/* Central Core (The "Engine") */}
              <div className="relative z-10 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 20px rgba(212,175,55,0.2)",
                      "0 0 40px rgba(212,175,55,0.4)",
                      "0 0 20px rgba(212,175,55,0.2)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-32 h-32 glass rounded-3xl border-2 border-gold-500/50 flex items-center justify-center rotate-45 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-transparent" />
                  <motion.div 
                    animate={{ rotate: -45 }}
                    className="font-serif font-bold text-4xl text-gold-500 z-10"
                  >
                    C
                  </motion.div>
                  
                  {/* Internal Scanning Line */}
                  <motion.div
                    animate={{ top: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1/2 bg-gradient-to-b from-transparent via-gold-500/20 to-transparent -rotate-45"
                  />
                </motion.div>
              </div>

              {/* Connecting "Laser" Lines & Data Flow */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(212,175,55,0)" />
                    <stop offset="50%" stopColor="rgba(212,175,55,0.5)" />
                    <stop offset="100%" stopColor="rgba(212,175,55,0)" />
                  </linearGradient>
                </defs>
                
                {/* Lines to UI Elements (Hub & Spoke) */}
                {[
                  { d: "M 200,200 L 200,60", delay: 1.5 }, // To Header
                  { d: "M 200,200 L 60,200", delay: 1.7 },  // To Sidebar
                  { d: "M 200,200 L 140,120", delay: 1.9 }, // To Card 1
                  { d: "M 200,200 L 280,140", delay: 2.1 }, // To Card 2
                  { d: "M 200,200 L 150,260", delay: 2.3 }, // To Card 3
                ].map((line, i) => (
                  <g key={`hub-${i}`}>
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.3 }}
                      transition={{ delay: line.delay, duration: 1 }}
                      d={line.d}
                      stroke="#D4AF37"
                      strokeWidth="1"
                      fill="none"
                      strokeDasharray="4 4"
                    />
                    <motion.path
                      initial={{ pathOffset: 0, opacity: 0 }}
                      animate={{ pathOffset: [-1, 0], opacity: [0, 1, 0] }}
                      transition={{ 
                        delay: line.delay + 1, 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      d={line.d}
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                      fill="none"
                      pathLength="1"
                    />
                  </g>
                ))}

                {/* Inter-component Connections (Mesh Network) */}
                {[
                  { d: "M 200,60 L 140,120", delay: 2.5 },  // Header to Card 1
                  { d: "M 200,60 L 280,140", delay: 2.7 },  // Header to Card 2
                  { d: "M 60,200 L 140,120", delay: 2.9 },  // Sidebar to Card 1
                  { d: "M 60,200 L 150,260", delay: 3.1 },  // Sidebar to Card 3
                  { d: "M 140,120 L 280,140", delay: 3.3 }, // Card 1 to Card 2
                  { d: "M 140,120 L 150,260", delay: 3.5 }, // Card 1 to Card 3
                ].map((line, i) => (
                  <g key={`mesh-${i}`}>
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.15 }}
                      transition={{ delay: line.delay, duration: 1.2 }}
                      d={line.d}
                      stroke="#D4AF37"
                      strokeWidth="0.5"
                      fill="none"
                      strokeDasharray="2 2"
                    />
                    <motion.path
                      initial={{ pathOffset: 0, opacity: 0 }}
                      animate={{ pathOffset: [1, 0], opacity: [0, 0.5, 0] }}
                      transition={{ 
                        delay: line.delay + 1.5, 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      d={line.d}
                      stroke="url(#lineGradient)"
                      strokeWidth="1"
                      fill="none; opacity: 0.3"
                      pathLength="1"
                    />
                  </g>
                ))}
              </svg>
            </motion.div>
            
            {/* External Glows */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-navy-700/50 rounded-full blur-3xl" />
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
