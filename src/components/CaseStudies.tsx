import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../translations";
import { Link } from "react-router-dom";

type Category = "All" | "AI" | "Mobile" | "Website" | "Platform";

export default function CaseStudies() {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [isExpanded, setIsExpanded] = useState(false);

  const filters: { label: string; value: Category }[] = [
    { label: language === 'mn' ? "Бүгд" : "All", value: "All" },
    { label: language === 'mn' ? "AI Платформ" : "AI Platform", value: "AI" },
    { label: language === 'mn' ? "Мобайл" : "Mobile", value: "Mobile" },
    { label: language === 'mn' ? "Вэбсайт" : "Website", value: "Website" },
    { label: language === 'mn' ? "Платформ" : "Platform", value: "Platform" }
  ];

  const cases = [
    {
      id: 1,
      category: "AI",
      title: { mn: "Мэргэжлээ сонгох бүрэн автомат систем", en: "Fully Automated Career Selection System" },
      description: { 
        mn: "Мэргэжил сонголтын ухаалаг зөвлөх систем болон бүрэн автоматжуулсан процесс.", 
        en: "Intelligent career advisory system and fully automated process." 
      },
      image: "https://lh3.googleusercontent.com/d/1E56NBG6aF2eI87IP9WYDhvetefmxpCs-",
      link: "https://mergejil.com/",
      stack: ["AI", "Python", "React"]
    },
    {
      id: 2,
      category: "Mobile",
      title: { mn: "Хувь хүний хөгжлийн бүрэн автомат апп", en: "Personal Development Automation App" },
      description: { 
        mn: "Хувь хүний хөгжил, сэтгэл зүйн цогц платформ болон автоматжуулсан систем.", 
        en: "Comprehensive personal development and psychology platform." 
      },
      image: "https://lh3.googleusercontent.com/d/15tCUAVrMqRf5PWrZa-W3SVeXzet6AgyH",
      link: "https://www.mongolmind.com/",
      stack: ["Flutter", "Firebase"]
    },
    {
      id: 12,
      category: "Website",
      title: { mn: "Personal Brand Tselmegzorigt.com", en: "Personal Brand Tselmegzorigt.com" },
      description: { 
        mn: "Хувийн брэнд, контент бүтээгч болон мэргэжлийн үйл ажиллагааны орчин үеийн танилцуулга вэбсайт.", 
        en: "Modern personal brand portfolio, content hub, and professional showcase website." 
      },
      image: "https://lh3.googleusercontent.com/d/11nGKWo0h0fupaveLRjfZByqLP6xkMIuO",
      link: "https://tselmegzorigt.com/",
      stack: ["Next.js", "Tailwind", "React"]
    },
    {
      id: 13,
      category: "Website",
      title: { mn: "Топаз Эмнэлэг - topaz.mn", en: "Topaz Clinical Hospital" },
      description: { 
        mn: "Эмнэлгийн цогц үйлчилгээ, эмчийн цаг захиалга, зөвлөгөө мэдээллийн орчин үеийн систем бүхий вэбсайт.", 
        en: "Modern clinical hospital website with service booking, patient information, and specialist guides." 
      },
      image: "https://lh3.googleusercontent.com/d/1aD92butNmz68MNvLjgFKexXbNuJBw55X",
      link: "https://topaz.mn/",
      stack: ["React", "Next.js", "Tailwind"]
    },
    {
      id: 3,
      category: "Website",
      title: { mn: "Вэбсайт /Админ панел/", en: "Website /Admin Panel/" },
      description: { 
        mn: "Мэдээ мэдээллийн нэгдсэн портал болон удирдлагын админ систем.", 
        en: "Integrated news portal and administrative management system." 
      },
      image: "https://lh3.googleusercontent.com/d/1URIvBZXdwF8Da3f24K4AN5TPFMANjQ8d",
      link: "https://ilchlelt.com/",
      stack: ["Next.js", "Tailwind"]
    },
    {
      id: 4,
      category: "Website",
      title: { mn: "Sorilt.com - Сэтгэлзүйн тестүүд", en: "Sorilt.com - Psych Tests" },
      description: { 
        mn: "Бүх төрлийн шалгалт, сорилтыг онлайнаар авах цогц систем.", 
        en: "Comprehensive system for taking all types of exams and tests online." 
      },
      image: "https://lh3.googleusercontent.com/d/1LW9HuOVmm2uxIHK1CHRwA-zsSSD-uLoy",
      link: "https://sorilt.com/",
      stack: ["React", "Node.js"]
    },
    {
      id: 8,
      category: "Website",
      title: { mn: "Suut Resort - Амралтын газар", en: "Suut Resort - Vacation Spot" },
      description: { 
        mn: "Байгалийн сайханд байрлах амралтын газрын захиалга, мэдээллийн вэбсайт.", 
        en: "Booking and information website for a resort located in beautiful nature." 
      },
      image: "https://lh3.googleusercontent.com/d/15k39Lh7J5SSZOarukIvI8A6rcWrFOQ3f",
      link: "https://suutresort.com/",
      stack: ["Next.js", "Tailwind"]
    },
    {
      id: 9,
      category: "Platform",
      title: { mn: "Sellbot.mn - Чатын платформ", en: "Sellbot.mn - Chat Platform" },
      description: { 
        mn: "Мессенжер чатбот ухаалаг платформ болон автомат борлуулалтын систем.", 
        en: "Messenger chatbot intelligent platform and automated sales system." 
      },
      image: "https://lh3.googleusercontent.com/d/1BmKvE4yWVjbvxTx8dxw3SP4rgR53nVjV",
      link: "https://sellbot.mn",
      stack: ["AI", "Messenger", "Node.js"]
    },
    {
      id: 10,
      category: "Website",
      title: { mn: "Sahmyook MBC - Сам Юүк МБС", en: "Sahmyook MBC" },
      description: { 
        mn: "Самюүк Мэргэжлийн Боловсролын сургуулийн албан ёсны вэб сайт", 
        en: "Official website of Sahmyook Vocational Education School" 
      },
      image: "https://lh3.googleusercontent.com/d/1-2dHKXtBuYk-jUjL5rHVjXPnH2ZlUgze",
      link: "https://sahmyookmbc.com/",
      stack: ["Next.js", "Tailwind"]
    },
    {
      id: 11,
      category: "Platform",
      title: { mn: "Togdu.com - СӨХ ухаалаг платформ", en: "Togdu.com - Smart Platform" },
      description: { 
        mn: "Сууц өмчлөгчдийн холбооны үйл ажиллагааг хөнгөвчлөх, оршин суугчдад зориулсан ухаалаг систем.", 
        en: "Smart system for homeowners' associations and residents, simplifying operations." 
      },
      image: "https://lh3.googleusercontent.com/d/15i4sIUHt2r1i5FjBbb6FS9jGn1u-8f3Q",
      link: "https://togdu.com/",
      stack: ["React", "Firebase", "Node.js"]
    },
    {
      id: 5,
      category: "Platform",
      title: { mn: "Онлайн дэлгүүр", en: "Online Store" },
      description: { 
        mn: "Хэрэглэгчдэд ээлтэй, орчин үеийн загвартай онлайн худалдааны платформ.", 
        en: "User-friendly, modern design e-commerce platform." 
      },
      image: "https://lh3.googleusercontent.com/d/1vlnCxzBiIPbPePJgx4PyJtGSSJeHvO9C",
      link: "/projects/data-analytics",
      stack: ["React", "Tailwind", "Motion"]
    },
    {
      id: 6,
      category: "Platform",
      title: { mn: "Компанийн дотоод систем", en: "Company Internal System" },
      description: { 
        mn: "Бизнесийн бүх үйл ажиллагааг нэг дороос хянах ухаалаг систем.", 
        en: "Intelligent system to monitor all business operations from one place." 
      },
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
      link: "/projects/internal-system",
      stack: ["React", "Recharts", "Tailwind"]
    },
    {
      id: 7,
      category: "Platform",
      title: { mn: "eCard.mn - Онлайн нэрийн хуудас", en: "eCard.mn - Online Business Card" },
      description: { 
        mn: "Бизнесийн нэрийн хуудсыг онлайнаар үүсгэх, удирдах, хуваалцах нэгдсэн платформ.", 
        en: "Integrated platform for creating, managing, and sharing business cards online." 
      },
      image: "https://lh3.googleusercontent.com/d/1rwb5CuSI3D6v8Wui8OgyguDKZfSl7omw",
      link: "https://ecard.mn",
      stack: ["React", "Firebase", "QR Code"]
    }
  ];

  const filteredCases = activeFilter === "All" 
    ? cases 
    : cases.filter(c => c.category === activeFilter);

  const visibleCases = isExpanded ? filteredCases : filteredCases.slice(0, 6);

  const getTagStyles = (category: string) => {
    switch (category) {
      case "AI":
        return "bg-[#1A2744] text-[#5B8FD4] border-[rgba(91,143,212,0.3)]";
      case "Mobile":
        return "bg-[#0F2018] text-[#4CAF7D] border-[rgba(76,175,125,0.3)]";
      case "Website":
        return "bg-[#231A0A] text-[#C49A3C] border-[rgba(196,154,60,0.3)]";
      case "Platform":
        return "bg-[#1E1230] text-[#9B7FD4] border-[rgba(155,127,212,0.3)]";
      default:
        return "bg-white/5 text-white/50 border-white/10";
    }
  };

  const getCategoryLabel = (category: string) => {
    if (language === 'en') return category;
    switch (category) {
      case "AI": return "AI Платформ";
      case "Mobile": return "Мобайл апп";
      case "Website": return "Вэбсайт";
      case "Platform": return "Платформ";
      default: return category;
    }
  };

  return (
    <section id="cases" className="py-32 bg-[#0A0F1E] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-serif font-bold mb-12"
          >
            <span className="text-white">Хийгдсэн</span>{" "}
            <span className="text-[#C49A3C] italic font-normal">ажлууд</span>
          </motion.h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 border-b border-white/5 pb-4">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => {
                  setActiveFilter(filter.value);
                  setIsExpanded(false);
                }}
                className={`text-sm font-medium transition-all relative pb-4 ${
                  activeFilter === filter.value 
                    ? "text-[#C49A3C]" 
                    : "text-white/40 hover:text-white/60"
                }`}
              >
                {filter.label}
                {activeFilter === filter.value && (
                  <motion.div 
                    layoutId="activeFilter"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C49A3C]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleCases.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-[#0F1729] rounded-xl overflow-hidden border border-white/5 hover:border-[#C49A3C]/30 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <motion.img 
                    src={item.image} 
                    alt={item.title[language]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex mb-4">
                    <span className={`text-[10px] uppercase tracking-[0.08em] font-bold px-3 py-1 rounded-full border ${getTagStyles(item.category)}`}>
                      {getCategoryLabel(item.category)}
                    </span>
                  </div>

                  <h3 className="text-[17px] font-semibold text-white mb-3 leading-tight">
                    {item.title[language]}
                  </h3>

                  <p className="text-[14px] text-[#8B9AB5] leading-[1.7] mb-6 line-clamp-2">
                    {item.description[language]}
                  </p>

                  {/* Footer Row */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex flex-wrap gap-2">
                      {item.stack.map(tech => (
                        <span key={tech} className="bg-white/5 text-[#6B7A99] px-2 py-0.5 rounded-[4px] text-[11px] border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {item.link.startsWith('/') ? (
                      <Link 
                        to={item.link}
                        className="text-[#C49A3C] text-xs font-bold flex items-center gap-1 hover:underline transition-all"
                      >
                        {language === 'mn' ? 'Шууд үзэх' : 'View Live'} <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <a 
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C49A3C] text-xs font-bold flex items-center gap-1 hover:underline transition-all"
                      >
                        {language === 'mn' ? 'Шууд үзэх' : 'View Live'} <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {filteredCases.length > 6 && (
          <div className="mt-16 text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-bold text-[#C49A3C] transition-all flex items-center gap-2 mx-auto"
            >
              {isExpanded 
                ? (language === 'mn' ? "Бага харах" : "Show Less") 
                : (language === 'mn' ? "Бүгдийг харах" : "View All")}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}


