import { useState } from "react";
import { motion } from "motion/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import { useLanguage } from "../translations";

const AGENTS = [
  {
    id: "atlas",
    icon: "◈",
    name: "Atlas",
    role: "Судалгаа & Дүн шинжилгээний агент",
    badge: "Research AI",
    badgeColor: "blue",
    bio: "Зах зээлийн судалгаа, өрсөлдөгчдийн шинжилгээ, бизнесийн тайлан бэлтгэх мэргэшсэн агент.",
    skills: [
      "Market research",
      "Competitor analysis",
      "Data synthesis",
      "Report writing",
      "Trend forecasting",
      "Business strategy",
    ],
    tags: ["research", "analysis", "report"],
    color: "blue",
  },
  {
    id: "muse",
    icon: "✦",
    name: "Muse",
    role: "Контент & Маркетингийн агент",
    badge: "Content AI",
    badgeColor: "teal",
    bio: "Монгол болон англи хэлээр контент, нийгмийн сүлжээний пост, брэнд материал бэлтгэх агент.",
    skills: [
      "Copywriting MN/EN",
      "Social media posts",
      "Brand storytelling",
      "Ad copy",
      "Email marketing",
      "SEO content",
    ],
    tags: ["content", "social", "brand"],
    color: "teal",
  },
  {
    id: "forge",
    icon: "</>",
    name: "Forge",
    role: "Frontend хөгжүүлэлтийн агент",
    badge: "Frontend AI",
    badgeColor: "blue",
    bio: "Вэб болон мобайл интерфейс бүтээх, UI компонент болон хуудас дизайн хийх мэргэшсэн агент.",
    skills: [
      "React / Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Native",
      "HTML / CSS / JS",
    ],
    tags: ["component", "landing page", "dashboard", "mobile UI"],
    color: "blue",
  },
  {
    id: "core",
    icon: "{ }",
    name: "Core",
    role: "Backend хөгжүүлэлтийн агент",
    badge: "Backend AI",
    badgeColor: "purple",
    bio: "API, өгөгдлийн сан, серверийн архитектур болон AI интеграц хийх мэргэшсэн агент.",
    skills: [
      "Node.js / Express",
      "Python / FastAPI",
      "PostgreSQL",
      "MongoDB",
      "REST & GraphQL",
      "Claude API / LLM",
    ],
    tags: ["API", "database", "auth", "AI integration"],
    color: "purple",
  },
];

const BADGE_STYLES = {
  gold: { bg: "rgba(196,154,60,0.12)", text: "#C49A3C", border: "rgba(196,154,60,0.35)" },
  blue: { bg: "#1A2744", text: "#5B8FD4", border: "rgba(91,143,212,0.3)" },
  teal: { bg: "#0F2018", text: "#4CAF7D", border: "rgba(76,175,125,0.3)" },
  purple: { bg: "#1E1230", text: "#9B7FD4", border: "rgba(155,127,212,0.3)" },
};

const DOT_COLORS = {
  blue: "#5B8FD4",
  teal: "#4CAF7D",
  purple: "#9B7FD4",
};

export default function About() {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-[#E8E4DA] selection:bg-gold-500 selection:text-navy-900">
      <Navbar />
      
      {/* Subtle grid background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(196,154,60,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,154,60,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} 
      />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-32">
        {/* Header */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-gold-500 text-xs font-bold tracking-widest uppercase mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
            </span>
            Cornerstone AI
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-8"
          >
            {language === 'mn' ? 'Манай' : 'Our'}{" "}
            <span className="text-gradient-gold italic font-normal">{language === 'mn' ? 'баг' : 'Team'}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 max-w-xl leading-relaxed"
          >
            {language === 'mn' 
              ? "Хүний оюун ухаан болон AI-ийн хүч хослосон — бид ингэж ирээдүйг бүтээдэг." 
              : "Human intelligence combined with the power of AI — this is how we build the future."}
          </motion.p>
        </div>

        {/* Human founder */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 p-8 md:p-12 rounded-3xl glass border-gold-500/20 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full flex-shrink-0 bg-gradient-to-br from-navy-800 to-navy-900 border-2 border-gold-500/40 flex items-center justify-center text-3xl font-bold text-gold-500 shadow-2xl">
              БЭ
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <h2 className="text-3xl font-serif font-bold text-white">Л.Болор-Эрдэнэ</h2>
                <span className="text-white/40">— Boogii</span>
                <span className="px-4 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-[10px] font-bold uppercase tracking-widest">
                  Founder & CEO
                </span>
              </div>
              
              <p className="text-white/60 leading-relaxed mb-10 max-w-2xl">
                {language === 'mn'
                  ? "Cornerstone AI-г үүсгэн байгуулагч. AI шийдэл, вэб болон мобайл хөгжүүлэлт, брэнд стратегийн чиглэлээр Монголын бизнесүүдийг дэмжиж, технологийн хүчээр ирээдүйг бүтээдэг."
                  : "Founder of Cornerstone AI. Supporting Mongolian businesses through AI solutions, web and mobile development, and brand strategy, building the future with the power of technology."}
              </p>

              <div className="flex flex-wrap gap-4">
                {[
                  { num: "6+", label: language === 'mn' ? "Платформ" : "Platforms" },
                  { num: "AI", label: language === 'mn' ? "Чиглэл" : "Focus" },
                  { num: "MN", label: language === 'mn' ? "Зах зээл" : "Market" },
                ].map((s) => (
                  <div key={s.label} className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-center min-w-[120px]">
                    <div className="text-3xl font-bold text-white mb-1">{s.num}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Agents divider */}
        <div className="flex items-center gap-8 mb-16">
          <div className="flex-1 h-px bg-white/5" />
          <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
              AI Agents
            </span>
          </div>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Agent cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AGENTS.map((agent, idx) => {
            const badge = BADGE_STYLES[agent.badgeColor as keyof typeof BADGE_STYLES];
            const dotColor = DOT_COLORS[agent.color as keyof typeof DOT_COLORS];
            const isHovered = hoveredAgent === agent.id;

            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredAgent(agent.id)}
                onMouseLeave={() => setHoveredAgent(null)}
                className="group p-8 rounded-3xl glass border-white/5 hover:border-gold-500/20 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start gap-6 mb-8">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-mono font-bold transition-all duration-500"
                      style={{ 
                        background: "rgba(255,255,255,0.03)",
                        border: `1px solid ${badge.border}`,
                        color: badge.text
                      }}
                    >
                      {agent.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{agent.name}</h3>
                      <p className="text-xs text-white/40 mb-4">{agent.role}</p>
                      <span 
                        className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border"
                        style={{ 
                          background: badge.bg, 
                          color: badge.text, 
                          borderColor: badge.border 
                        }}
                      >
                        {agent.badge}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-white/60 leading-relaxed mb-8">
                    {agent.bio}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4">
                      {language === 'mn' ? 'Чадварууд' : 'Capabilities'}
                    </h4>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                      {agent.skills.map((skill) => (
                        <div key={skill} className="flex items-center gap-3 text-xs text-white/50">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: dotColor }} />
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                    {agent.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-white/30">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-32 text-center">
          <p className="text-xs tracking-[0.3em] text-white/20 uppercase">
            Built on Intelligence — <span className="text-gold-500/40">cornerstoneai.dev</span>
          </p>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
