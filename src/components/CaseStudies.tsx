import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ChevronDown, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../translations";

export default function CaseStudies() {
  const { t, language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const cases = [
    {
      id: 1,
      title: { mn: "Мэргэжлээ сонгох бүрэн автомат систем", en: "Fully Automated Career Selection System" },
      result: { mn: "AI Платформ", en: "AI Platform" },
      description: { 
        mn: "Мэргэжил сонголтын ухаалаг зөвлөх систем болон бүрэн автоматжуулсан процесс.", 
        en: "Intelligent career advisory system and fully automated process." 
      },
      image: "https://lh3.googleusercontent.com/d/1E56NBG6aF2eI87IP9WYDhvetefmxpCs-",
      link: "https://mergejil.com/"
    },
    {
      id: 2,
      title: { mn: "Хувь хүний хөгжлийн бүрэн автомат апп", en: "Personal Development Automation App" },
      result: { mn: "Mobile App", en: "Mobile App" },
      description: { 
        mn: "Хувь хүний хөгжил, сэтгэл зүйн цогц платформ болон автоматжуулсан систем.", 
        en: "Comprehensive personal development and psychology platform." 
      },
      image: "https://lh3.googleusercontent.com/d/15tCUAVrMqRf5PWrZa-W3SVeXzet6AgyH",
      link: "https://www.mongolmind.com/"
    },
    {
      id: 3,
      title: { mn: "Вэбсайт /Админ панел/", en: "Website /Admin Panel/" },
      result: { mn: "Web System", en: "Web System" },
      description: { 
        mn: "Мэдээ мэдээллийн нэгдсэн портал болон удирдлагын админ систем.", 
        en: "Integrated news portal and administrative management system." 
      },
      image: "https://lh3.googleusercontent.com/d/1URIvBZXdwF8Da3f24K4AN5TPFMANjQ8d",
      link: "https://ilchlelt.com/"
    },
    {
      id: 4,
      title: { mn: "Sorilt.com - Сэтгэлзүйн тестүүд", en: "Sorilt.com - Psych Tests" },
      result: { mn: "Web System", en: "Web System" },
      description: { 
        mn: "Бүх төрлийн шалгалт, сорилтыг онлайнаар авах цогц систем.", 
        en: "Comprehensive system for taking all types of exams and tests online." 
      },
      image: "https://lh3.googleusercontent.com/d/1LW9HuOVmm2uxIHK1CHRwA-zsSSD-uLoy",
      link: "https://sorilt.com/"
    },
    {
      id: 5,
      title: { mn: "Бизнес Дата Аналитик", en: "Business Data Analytics" },
      result: { mn: "Dashboard", en: "Dashboard" },
      description: { 
        mn: "Бизнесийн шийдвэр гаргалтад туслах дата визуалчлалын систем.", 
        en: "Data visualization system to assist in business decision making." 
      },
      image: "https://picsum.photos/seed/dashboard/800/1200",
      link: "#"
    },
    {
      id: 6,
      title: { mn: "AI Сошиал Платформ", en: "AI Social Platform" },
      result: { mn: "Social Web", en: "Social Web" },
      description: { 
        mn: "AI-д суурилсан шинэ үеийн сошиал медиа платформ.", 
        en: "Next-generation AI-powered social media platform." 
      },
      image: "https://picsum.photos/seed/social-media/800/1200",
      link: "#"
    },
    {
      id: 7,
      title: { mn: "Фитнесс Трэкэр Апп", en: "Fitness Tracker App" },
      result: { mn: "Mobile UI", en: "Mobile UI" },
      description: { 
        mn: "Хэрэглэгчийн идэвх хянах ухаалаг гар утасны аппликейшн.", 
        en: "Smart mobile application for tracking user activity." 
      },
      image: "https://picsum.photos/seed/fitness-app/800/1200",
      link: "#"
    }
  ];

  const visibleCases = isExpanded ? cases : cases.slice(0, 6);

  return (
    <section id="cases" className="py-32 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gold-500/50" />
            <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase">
              {language === 'mn' ? 'Бидний амжилт' : 'Our Success'}
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-tight"
          >
            {t('cases_title')} <span className="text-gradient-gold italic">{t('cases_title_accent')}</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-xl leading-relaxed font-light"
          >
            {t('cases_desc')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleCases.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.1,
                  duration: 0.6,
                  ease: [0.23, 1, 0.32, 1]
                }}
                className="group relative rounded-3xl overflow-hidden border border-white/5 bg-navy-800/30 aspect-[4/5]"
              >
                {/* Image Container */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <motion.img 
                    src={item.image} 
                    alt={item.title[language]}
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-navy-950/60 group-hover:bg-navy-950/20 transition-colors duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent opacity-90" />
                </div>

                {/* Content Overlay - Black Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-32 group-hover:h-3/4 bg-gradient-to-t from-black via-black/80 to-transparent transition-all duration-700 ease-in-out" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="relative z-20">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 bg-gold-500/10 border border-gold-500/20 text-gold-500 text-[9px] font-bold rounded-full uppercase tracking-widest">
                        {item.result[language]}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold mb-3 leading-tight group-hover:text-gold-500 transition-colors duration-300">
                      {item.title[language]}
                    </h3>

                    <div className="overflow-hidden max-h-0 group-hover:max-h-48 transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100">
                      <p className="text-white/50 text-xs mb-5 leading-relaxed line-clamp-3">
                        {item.description[language]}
                      </p>
                      <a 
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gold-500 font-bold text-[10px] uppercase tracking-widest hover:text-white transition-colors duration-300"
                      >
                        {t('cases_view_live')} 
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Subtle Border Glow on Hover */}
                <div className="absolute inset-0 border-2 border-gold-500/0 group-hover:border-gold-500/20 transition-colors duration-700 pointer-events-none rounded-3xl" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {cases.length > 6 && (
          <div className="mt-20 text-center">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-12 py-5 glass rounded-full font-bold text-sm text-gold-500 flex items-center gap-3 mx-auto border border-gold-500/20 transition-all duration-300"
            >
              {isExpanded ? t('cases_less') : t('cases_more')}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.4, ease: "backOut" }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}

