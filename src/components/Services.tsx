import { motion } from "motion/react";
import { Globe, Smartphone, Briefcase, ChevronRight } from "lucide-react";

const services = [
  {
    title: "Веб сайт хөгжүүлэлт",
    description: "Conversion төвтэй дизайн, SEO бүтэц, хурдны оптимизаци болон брендингт нийцсэн шийдлүүд.",
    icon: Globe,
    features: ["Conversion төвтэй дизайн", "SEO бүтэц", "Хурд оптимизаци", "Брендинг нийцүүлэлт"],
    color: "from-blue-500/20 to-gold-500/20"
  },
  {
    title: "Апп хөгжүүлэлт",
    description: "Web app болон SaaS системүүд, CRM, автоматжуулалт болон хэмжээгээ тэлэх боломжтой backend.",
    icon: Smartphone,
    features: ["Web app / SaaS систем", "CRM, automation", "Хэмжээ тэлэх backend"],
    color: "from-purple-500/20 to-gold-500/20"
  },
  {
    title: "Бизнес зөвлөх үйлчилгээ",
    description: "Funnel систем, борлуулалтын бүтэц, AI workflow нэвтрүүлэлт болон дижитал стратеги.",
    icon: Briefcase,
    features: ["Funnel систем", "Борлуулалтын бүтэц", "AI workflow нэвтрүүлэлт", "Дижитал стратеги"],
    color: "from-emerald-500/20 to-gold-500/20"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
          >
            Бидний <span className="text-gradient-gold">Үйлчилгээ</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg"
          >
            Бид таны бизнесийг дараагийн шатанд гаргах цогц технологийн шийдлүүдийг санал болгож байна.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-3xl glass hover:bg-white/10 transition-all duration-500 overflow-hidden"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <service.icon className="w-8 h-8 text-gold-500" />
                </div>
                
                <h3 className="text-2xl font-serif font-bold mb-4">{service.title}</h3>
                <p className="text-white/60 mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-white/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="flex items-center gap-2 text-gold-500 font-bold text-sm group/btn">
                  Дэлгэрэнгүй үзэх
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
