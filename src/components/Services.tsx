import { motion } from "motion/react";
import { Globe, Smartphone, Briefcase, ChevronRight } from "lucide-react";
import { useLanguage } from "../translations";

export default function Services() {
  const { t, language } = useLanguage();

  const services = [
    {
      title: { mn: "Веб сайт хөгжүүлэлт", en: "Web Development" },
      description: { 
        mn: "Conversion төвтэй дизайн, SEO бүтэц, хурдны оптимизаци болон брендингт нийцсэн шийдлүүд.", 
        en: "Conversion-focused design, SEO structure, speed optimization, and brand-aligned solutions." 
      },
      icon: Globe,
      features: {
        mn: ["Conversion төвтэй дизайн", "SEO бүтэц", "Хурд оптимизаци", "Брендинг нийцүүлэлт"],
        en: ["Conversion-focused design", "SEO structure", "Speed optimization", "Brand alignment"]
      },
      color: "from-blue-500/20 to-gold-500/20"
    },
    {
      title: { mn: "Апп хөгжүүлэлт", en: "App Development" },
      description: { 
        mn: "Web app болон SaaS системүүд, CRM, автоматжуулалт болон хэмжээгээ тэлэх боломжтой backend.", 
        en: "Web apps and SaaS systems, CRM, automation, and scalable backend solutions." 
      },
      icon: Smartphone,
      features: {
        mn: ["Web app / SaaS систем", "CRM, automation", "Хэмжээ тэлэх backend"],
        en: ["Web app / SaaS systems", "CRM, automation", "Scalable backend"]
      },
      color: "from-purple-500/20 to-gold-500/20"
    },
    {
      title: { mn: "Бизнес зөвлөх үйлчилгээ", en: "Business Consulting" },
      description: { 
        mn: "Funnel систем, борлуулалтын бүтэц, AI workflow нэвтрүүлэлт болон дижитал стратеги.", 
        en: "Funnel systems, sales structures, AI workflow implementation, and digital strategy." 
      },
      icon: Briefcase,
      features: {
        mn: ["Funnel систем", "Борлуулалтын бүтэц", "AI workflow нэвтрүүлэлт", "Дижитал стратеги"],
        en: ["Funnel systems", "Sales structures", "AI workflow implementation", "Digital strategy"]
      },
      color: "from-emerald-500/20 to-gold-500/20"
    }
  ];

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
            {language === 'mn' ? 'Бидний' : 'Our'} <span className="text-gradient-gold">{t('nav_services')}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg"
          >
            {t('services_desc')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title.en}
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
                
                <h3 className="text-2xl font-serif font-bold mb-4">{service.title[language]}</h3>
                <p className="text-white/60 mb-8 leading-relaxed">
                  {service.description[language]}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {service.features[language].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-white/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="flex items-center gap-2 text-gold-500 font-bold text-sm group/btn">
                  {language === 'mn' ? 'Дэлгэрэнгүй үзэх' : 'Learn More'}
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
