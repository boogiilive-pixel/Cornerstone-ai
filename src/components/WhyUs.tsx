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
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="w-full aspect-square glass rounded-[40px] flex items-center justify-center p-12 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-transparent" />
                 {/* 3D-like Cornerstone Visual */}
                 <div className="w-48 h-48 bg-gold-500/20 rounded-2xl rotate-45 border-4 border-gold-500/30 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gold-500 rounded-xl -rotate-45 flex items-center justify-center font-serif font-bold text-4xl text-navy-900">
                      C
                    </div>
                 </div>
              </div>
            </motion.div>
            
            {/* Background Decorations */}
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
