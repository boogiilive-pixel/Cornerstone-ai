import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../translations";

export default function CaseStudies() {
  const { t, language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const cases = [
    {
      title: { mn: "Мэргэжлээ сонгох бүрэн автомат систем", en: "Fully Automated Career Selection System" },
      result: { mn: "AI Платформ", en: "AI Platform" },
      description: { 
        mn: "Мэргэжил сонголтын ухаалаг зөвлөх систем болон бүрэн автоматжуулсан процесс.", 
        en: "Intelligent career advisory system and fully automated process." 
      },
      image: "https://lh3.googleusercontent.com/d/1E56NBG6aF2eI87IP9WYDhvetefmxpCs-",
      link: "https://mergejil.com/",
      size: "lg"
    },
    {
      title: { mn: "Хувь хүний хөгжлийн бүрэн автомат апп", en: "Personal Development Automation App" },
      result: { mn: "Mobile App", en: "Mobile App" },
      description: { 
        mn: "Хувь хүний хөгжил, сэтгэл зүйн цогц платформ болон автоматжуулсан систем.", 
        en: "Comprehensive personal development and psychology platform." 
      },
      image: "https://lh3.googleusercontent.com/d/15tCUAVrMqRf5PWrZa-W3SVeXzet6AgyH",
      link: "https://www.mongolmind.com/",
      size: "md"
    },
    {
      title: { mn: "Вэбсайт /Админ панел, мэдээ оруулах/", en: "Website /Admin Panel, Content Management/" },
      result: { mn: "Web System", en: "Web System" },
      description: { 
        mn: "Мэдээ мэдээллийн нэгдсэн портал болон удирдлагын админ систем.", 
        en: "Integrated news portal and administrative management system." 
      },
      image: "https://lh3.googleusercontent.com/d/1URIvBZXdwF8Da3f24K4AN5TPFMANjQ8d",
      link: "https://ilchlelt.com/",
      size: "md"
    },
    {
      title: { mn: "Sorilt.com - Бүх төрлийн Сэтгэлзүйн тестүүд", en: "Sorilt.com - All Types of Psychological Tests" },
      result: { mn: "Web System", en: "Web System" },
      description: { 
        mn: "Бүх төрлийн шалгалт, сорилтыг онлайнаар авах цогц систем.", 
        en: "Comprehensive system for taking all types of exams and tests online." 
      },
      image: "https://lh3.googleusercontent.com/d/1LW9HuOVmm2uxIHK1CHRwA-zsSSD-uLoy",
      link: "https://sorilt.com/",
      size: "md"
    },
    {
      title: { mn: "Фитнесс Трэкэр Апп", en: "Fitness Tracker App" },
      result: { mn: "Mobile UI", en: "Mobile UI" },
      description: { 
        mn: "Хэрэглэгчийн идэвх хянах ухаалаг гар утасны аппликейшн.", 
        en: "Smart mobile application for tracking user activity." 
      },
      image: "https://picsum.photos/seed/fitness-app/800/1200",
      link: "#",
      size: "md"
    },
    {
      title: { mn: "Бизнес Дата Аналитик", en: "Business Data Analytics" },
      result: { mn: "Dashboard", en: "Dashboard" },
      description: { 
        mn: "Бизнесийн шийдвэр гаргалтад туслах дата визуалчлалын систем.", 
        en: "Data visualization system to assist in business decision making." 
      },
      image: "https://picsum.photos/seed/dashboard/800/1200",
      link: "#",
      size: "md"
    },
    {
      title: { mn: "AI Сошиал Платформ", en: "AI Social Platform" },
      result: { mn: "Social Web", en: "Social Web" },
      description: { 
        mn: "AI-д суурилсан шинэ үеийн сошиал медиа платформ.", 
        en: "Next-generation AI-powered social media platform." 
      },
      image: "https://picsum.photos/seed/social-media/800/1200",
      link: "#",
      size: "md"
    }
  ];

  const visibleCases = isExpanded ? cases : cases.slice(0, 6);

  return (
    <section id="cases" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold mb-6"
            >
              {t('cases_title')} <span className="text-gradient-gold">{t('cases_title_accent')}</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/60 text-lg"
            >
              {t('cases_desc')}
            </motion.p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleCases.map((item, i) => (
              <motion.div
                key={item.title.en}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl border border-white/5"
              >
                <img 
                  src={item.image} 
                  alt={item.title[language]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-gold-500 text-navy-900 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        {item.result[language]}
                      </span>
                      <h3 className="text-xl font-serif font-bold mt-3 leading-tight">{item.title[language]}</h3>
                    </div>
                    <p className="text-white/70 text-xs mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-3">
                      {item.description[language]}
                    </p>
                    <a 
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gold-500 font-bold text-xs hover:text-gold-400 transition-colors"
                    >
                      {t('cases_view_live')} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {cases.length > 6 && (
          <div className="mt-16 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-10 py-4 glass rounded-full font-bold text-sm text-gold-500 flex items-center gap-2 mx-auto hover:bg-white/10 transition-colors"
            >
              {isExpanded ? t('cases_less') : t('cases_more')}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
