import { motion } from "motion/react";
import { Globe, Smartphone, Briefcase, Palette, ChevronRight } from "lucide-react";
import { useLanguage } from "../translations";

export default function Services() {
  const { t, language } = useLanguage();

  const services = [
    {
      title: { mn: "Вэбсайт хөгжүүлэлт", en: "Web Development" },
      description: { 
        mn: "Орчин үеийн, хурдан, хайлтын системд (SEO) оновчтой вэбсайт хөгжүүлэлт. Бид таны бизнесийн онцлогт тохирсон вэб сайтыг мэргэжлийн түвшинд хийж гүйцэтгэнэ.", 
        en: "Modern, fast, and SEO-optimized web development. We professionally build websites tailored to your business needs." 
      },
      icon: Globe,
      features: {
        mn: ["SEO оновчлол", "UX/UI дизайн", "Хурдны оптимизаци", "Админ систем"],
        en: ["SEO Optimization", "UX/UI Design", "Speed Optimization", "Admin System"]
      },
      color: "from-blue-500/20 to-gold-500/20"
    },
    {
      title: { mn: "Апп хөгжүүлэлт", en: "App Development" },
      description: { 
        mn: "iOS болон Android үйлдлийн системд зориулсан гар утасны апп хөгжүүлэлт. Хэрэглэгчдэд ойлгомжтой, хялбар шийдэл бүхий аппликейшн.", 
        en: "Mobile app development for iOS and Android. Applications with intuitive and easy-to-use solutions for users." 
      },
      icon: Smartphone,
      features: {
        mn: ["iOS & Android", "Firebase / Cloud", "Push Notifications", "API Integration"],
        en: ["iOS & Android", "Firebase / Cloud", "Push Notifications", "API Integration"]
      },
      color: "from-purple-500/20 to-gold-500/20"
    },
    {
      title: { mn: "Брэнд бүтээх", en: "Branding" },
      description: { 
        mn: "Брэнд бүтээх, лого дизайн болон визуал төрх бүрдүүлэх үйлчилгээ. Таны бизнесийн үнэ цэнийг илэрхийлэх өвөрмөц брэндинг.", 
        en: "Branding, logo design, and visual identity creation services. Unique branding that represents your business value." 
      },
      icon: Palette,
      features: {
        mn: ["Лого дизайн", "Брэнд бук", "Визуал төрх", "Сошиал дизайн"],
        en: ["Logo Design", "Brand Book", "Visual Identity", "Social Media Design"]
      },
      color: "from-pink-500/20 to-gold-500/20"
    },
    {
      title: { mn: "Бизнес зөвлөгөө", en: "Business Consulting" },
      description: { 
        mn: "Бизнес зөвлөгөө болон дижитал шилжилтийн стратеги. AI ашиглан бизнесийн процессыг автоматжуулж, үр ашгийг нэмэгдүүлэх.", 
        en: "Business consulting and digital transformation strategy. Automate business processes using AI to increase efficiency." 
      },
      icon: Briefcase,
      features: {
        mn: ["Дижитал стратеги", "AI автоматжуулалт", "Борлуулалтын funnel", "Маркетинг төлөвлөгөө"],
        en: ["Digital Strategy", "AI Automation", "Sales Funnel", "Marketing Planning"]
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title.en}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-6 rounded-3xl glass hover:bg-white/10 transition-all duration-500 overflow-hidden"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <service.icon className="w-7 h-7 text-gold-500" />
                </div>
                
                <h3 className="text-xl font-serif font-bold mb-3">{service.title[language]}</h3>
                <p className="text-white/60 text-sm mb-6 leading-relaxed line-clamp-4">
                  {service.description[language]}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features[language].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-white/80">
                      <div className="w-1 h-1 rounded-full bg-gold-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="flex items-center gap-2 text-gold-500 font-bold text-xs group/btn">
                  {language === 'mn' ? 'Дэлгэрэнгүй үзэх' : 'Learn More'}
                  <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
