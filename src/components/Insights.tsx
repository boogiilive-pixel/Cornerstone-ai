import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import ScrollToHashElement from "./ScrollToHashElement";
import InsightCard from "./InsightCard";
import { useLanguage } from "../translations";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ARTICLES = [
  {
    category: "AI",
    title: "AI агент гэж юу вэ? Бизнест хэрхэн ашиглах вэ?",
    excerpt: "AI-г зүгээр л чатбот гэж хардаг үе өнгөрчээ. Одоо таны өмнөөс имэйл бичиж, уулзалт товлож, бүр дата шинжилгээ хийдэг 'дижитал ажилтан'-тай болох боломжтой болсон. Гэхдээ яг хаанаас эхлэх вэ?",
    date: "2026.03.15",
    readTime: "5 мин",
    slug: "what-is-ai-agent",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop"
  },
  {
    category: "Технологи",
    title: "Next.js яагаад WordPress-ээс дээр вэ?",
    excerpt: "WordPress бол гайхалтай платформ, гэхдээ орчин үеийн хэрэглэгчид хурдыг хамгийн түрүүнд тавьдаг болсон. Next.js ашигласнаар таны вэбсайт нүд ирмэхийн зуур ачаалж, Google-ийн хайлтад дээгүүр гарах боломж 2 дахин нэмэгдэнэ.",
    date: "2026.01.20",
    readTime: "4 мин",
    slug: "nextjs-vs-wordpress",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1000&auto=format&fit=crop"
  },
  {
    category: "Бизнес",
    title: "Вэбсайтгүй бизнес яагаад хоцрогдож байна вэ?",
    excerpt: "Фэйсбүүк хуудастай байхад вэбсайт хэрэггүй гэж бодож байна уу? Тэгвэл та маш том боломжийг алдаж байна. Вэбсайт бол таны бизнесийн 24/7 ажилладаг 'дижитал оффис' бөгөөд хэрэглэгчийн итгэлийг олох хамгийн гол зэвсэг юм.",
    date: "2025.11.05",
    readTime: "3 мин",
    slug: "why-business-needs-website",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    category: "Cornerstone",
    title: "Mergejil.com вэб системийг хэрхэн хийсэн бэ?",
    excerpt: "Монголын мянга мянган залууст мэргэжлээ зөв сонгоход нь туслах зорилготой Mergejil.com платформын ард ямар технологи, AI шийдлүүд ажиллаж байгааг сонирхоорой.",
    date: "2025.12.12",
    readTime: "6 мин",
    slug: "mergejil-com-case-study",
    image: "https://lh3.googleusercontent.com/d/1E56NBG6aF2eI87IP9WYDhvetefmxpCs-"
  },
  {
    category: "AI",
    title: "Goo: Cornerstone AI-н контент агент",
    excerpt: "Манай багийн хамгийн идэвхтэй гишүүн Goo-той танилц. Тэр бол зүгээр нэг текст бичигч биш, брэндийн өнгө аясыг мэдэрч, хэрэглэгчдийн сонирхлыг татах контент бүтээгч юм. Бид түүнийг хэрхэн сургаж, ажилдаа ашигладаг вэ?",
    date: "2026.02.28",
    readTime: "4 мин",
    slug: "goo-content-agent",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop"
  },
  {
    category: "Бизнес",
    title: "Монгол компанид SEO яагаад чухал вэ?",
    excerpt: "Google-ийн эхний хуудсанд гарах нь сард хэдэн зуун мянган төгрөгийн сурталчилгааны зардлыг хэмнэх боломж юм. Монголын зах зээлд SEO-г зөв ашиглаж чадвал та өрсөлдөгчдөөсөө хэдэн алхам түрүүлж чадна.",
    date: "2026.04.05",
    readTime: "5 мин",
    slug: "seo-for-mongolian-companies",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=1000&auto=format&fit=crop"
  }
];

const CATEGORIES = ["Бүгд", "Технологи", "AI", "Бизнес", "Cornerstone"];

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState("Бүгд");
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredArticles = activeCategory === "Бүгд" 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-[#F0EBE0] selection:bg-gold-500 selection:text-navy-900">
      <Navbar />
      <ScrollToHashElement />
      
      {/* Subtle grid background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(196,154,60,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,154,60,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} 
      />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-32">
        {/* Header */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[#C49A3C] text-xs font-bold tracking-widest uppercase mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C49A3C] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C49A3C]"></span>
            </span>
            Cornerstone AI
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-8"
          >
            Мэдээлэл{" "}
            <span className="text-[#C49A3C] italic font-normal">булан</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#6B7A99] max-w-xl leading-relaxed"
          >
            Технологи, AI болон бизнесийн талаарх бидний мэдлэг, туршлага.
          </motion.p>
        </div>

        {/* Filter Bar */}
        <div className="mb-12 border-b border-white/5 flex flex-wrap gap-x-8 gap-y-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-4 text-sm font-bold tracking-widest uppercase transition-all relative ${
                activeCategory === cat ? "text-[#C49A3C]" : "text-[#6B7A99] hover:text-white"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeCategory"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C49A3C]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article) => (
              <InsightCard 
                key={article.slug} 
                title={article.title}
                excerpt={article.excerpt}
                category={article.category}
                date={article.date}
                readTime={article.readTime}
                slug={article.slug}
                image={article.image}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-16 rounded-[2.5rem] glass border-white/5 text-center relative overflow-hidden group"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#C49A3C]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -top-24 -right-24 w-64 h-64 bg-[#C49A3C] rounded-full blur-[100px] pointer-events-none"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#3B82F6] rounded-full blur-[120px] pointer-events-none"
          />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C49A3C]/10 border border-[#C49A3C]/20 text-[#C49A3C] text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
            >
              Ready to scale?
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
              Та төслөө эхлүүлэхэд <br /> 
              <span className="text-gradient-gold italic font-normal">бэлэн үү?</span>
            </h2>
            
            <p className="text-[#6B7A99] text-lg max-w-2xl mx-auto mb-12">
              Бид таны санааг бодит болгож, технологийн хүчээр бизнесийг тань шинэ шатанд гаргахад бэлэн байна.
            </p>

            <motion.a 
              href="https://cornerstoneai.dev/digitalcard"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-12 py-5 bg-[#C49A3C] text-[#0A0F1E] rounded-full font-bold text-base glow-gold hover:bg-[#D4AA4C] transition-all"
            >
              Холбоо барих <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
