import { useState } from "react";
import { motion } from "motion/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import ScrollToHashElement from "./ScrollToHashElement";
import { useLanguage } from "../translations";

const HUMAN_TEAM = [
  {
    name: "Б. Энхжаргал",
    role: "Chief Operating Officer",
    bio: "Cornerstone AI-ийн өдөр тутмын үйл ажиллагаа, үйлчлүүлэгчийн харилцаа болон төслийн удирдлагыг хариуцдаг. Клиент бүрт чанартай, цаг хугацаандаа хүргэгдэх шийдлийг баталгаажуулах нь түүний гол үүрэг. Үйл ажиллагааны үр ашгийг нэмэгдүүлж, багийн ажлын урсгалыг оновчтой зохион байгуулахад мэргэшсэн.",
    image: "https://lh3.googleusercontent.com/d/1Ozd--nQsyc4jwQXb0uCMFcO5oMsIjEBa",
  },
  {
    name: "Л. Болорсайхан",
    role: "Lead Full-Stack Developer",
    bio: "Cornerstone AI-ийн клиент төслүүдийн техникийн архитектур, хөгжүүлэлтийг удирддаг. React, Next.js, Node.js зэрэг орчин үеийн вэб технологиуд дээр мэргэшсэн. Erdem AI agent-тай хамтран ажиллаж, production-grade веб платформ болон AI-powered системүүдийг хөгжүүлэхэд манлайлагч үүрэг гүйцэтгэдэг.",
    image: "https://lh3.googleusercontent.com/d/1BSU6M-Jsv78vkHCY76zZs_1nL36D_drA",
  },
  {
    name: "Б. Дөлгөөн",
    role: "Junior Brand Designer",
    bio: "Cornerstone AI болон түүний клиентүүдийн визуал брэндинг, UI дизайн, нийгмийн сүлжээний контентыг бүтээдэг. Dalai AI agent-тай хамтран ажиллаж, брэндийн хэв маяг, дизайн системийг хөгжүүлэхэд хувь нэмрээ оруулдаг. Орчин үеийн дизайны чиг хандлага, хэрэглэгчийн туршлагын чиглэлээр суралцаж буй идэвхтэй бүтээгч.",
    image: "https://lh3.googleusercontent.com/d/1BKdjGbOuqYnGLzX5zmM2Px7dOh462ntV",
  },
];

const AGENTS = [
  {
    id: "atlas",
    icon: "◈",
    name: "Oyun",
    image: "https://lh3.googleusercontent.com/d/19GZWXff8FQNf-YJ-8MHdGPZSH5I5h31V",
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
    name: "Goo",
    image: "https://lh3.googleusercontent.com/d/10MPd1DgtlJw3miSSG9LEmJxtpdZmndz0",
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
    name: "Erdem",
    image: "https://lh3.googleusercontent.com/d/1NXx2HpLLQ1aDYQ0uT07y3b_4F6FaWsOr",
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
    name: "Dalai",
    image: "https://lh3.googleusercontent.com/d/1dKm2Nf7-dcyy6SE9mXJmd7k8rBYIYGi7",
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
      <ScrollToHashElement />
      
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
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center md:items-start">
            {/* Founder Image with Effects */}
            <div className="relative group/img flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-48 h-64 md:w-64 md:h-80 rounded-2xl overflow-hidden border-2 border-gold-500/30 z-10"
              >
                <img 
                  src="https://lh3.googleusercontent.com/d/1lT0O7ITl-yw40KjC4HklNlSXYsdzWLsw" 
                  alt="Л.Болор-Эрдэнэ" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-700 scale-110 group-hover/img:scale-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://picsum.photos/seed/founder/800/1200";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
              </motion.div>
              
              {/* Decorative frames */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold-500/40 rounded-tl-2xl z-0" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold-500/40 rounded-br-2xl z-0" />
              
              {/* Animated glow */}
              <div className="absolute inset-0 bg-gold-500/20 blur-3xl rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity duration-700 -z-10" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                <h2 className="text-3xl font-serif font-bold text-white">Л.Болор-Эрдэнэ</h2>
                <span className="text-white/40">— Boogii</span>
                <span className="px-4 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-[10px] font-bold uppercase tracking-widest">
                  {language === 'mn' ? 'Үүсгэн байгуулагч & Гүйцэтгэх захирал' : 'Founder & CEO'}
                </span>
              </div>
              
              <p className="text-white/60 leading-relaxed mb-10 max-w-2xl">
                {language === 'mn'
                  ? "Cornerstone AI-г үүсгэн байгуулагч бөгөөд компанийн стратеги, бүтээгдэхүүний чиглэлийг тодорхойлогч. AI шийдэл, вэб болон мобайл хөгжүүлэлт, брэнд стратегийн чиглэлээр Монголын бизнесүүдийг дэмжиж, технологийн хүчээр ирээдүйг бүтээдэг. Түүний хувьд технологи бол зорилго биш — хэрэгсэл. Жинхэнэ үнэ цэн нь зөв асуултыг асууж, бизнесийн бодит хэрэгцээнд нийцсэн шийдлийг бүтээхэд оршдог гэж үздэг. Энэ философи нь Cornerstone AI-ийн танилцуулж буй бүх шийдлийн үндэс суурь болдог."
                  : "Founder of Cornerstone AI, defining the company's strategy and product direction. Supporting Mongolian businesses through AI solutions, web and mobile development, and brand strategy, building the future with the power of technology. For him, technology is not just a goal — it's a tool. He believes true value lies in asking the right questions and creating solutions that meet real business needs. This philosophy is the foundation of all solutions presented by Cornerstone AI."}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {[
                  { num: "9+", label: language === 'mn' ? "Платформ" : "Platforms" },
                  { num: "AI", label: language === 'mn' ? "Чиглэл" : "Focus" },
                  { num: "MN", label: language === 'mn' ? "Зах зээл" : "Market" },
                ].map((s) => (
                  <div key={s.label} className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-center min-w-[100px]">
                    <div className="text-xl font-bold text-white mb-0.5">{s.num}</div>
                    <div className="text-[9px] uppercase tracking-widest text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Human Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {HUMAN_TEAM.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-3xl glass border-white/5 hover:border-gold-500/20 transition-all duration-500 relative overflow-hidden flex flex-col items-center text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 w-full">
                {/* Profile Image Wrapper */}
                <div className="relative mx-auto mb-6 group/member">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-gold-500/20 bg-navy-800 z-10 relative">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale group-hover/member:grayscale-0 transition-all duration-700 group-hover/member:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`;
                      }}
                    />
                  </div>
                  {/* Decorative frames for members */}
                  <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-gold-500/20 rounded-tl-xl z-0" />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-gold-500/20 rounded-br-xl z-0" />
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <div className="text-gold-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                  {member.role}
                </div>
                
                <p className="text-sm text-white/50 leading-relaxed line-clamp-6 group-hover:line-clamp-none transition-all duration-500">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

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
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                    {/* Agent Image with Effects */}
                    <div className="relative group/agent-img flex-shrink-0">
                      <div className="relative w-28 h-36 rounded-xl overflow-hidden border border-gold-500/20 z-10">
                        <img 
                          src={agent.image} 
                          alt={agent.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale group-hover/agent-img:grayscale-0 transition-all duration-500 scale-110 group-hover/agent-img:scale-100"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${agent.id}/400/600`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
                      </div>
                      {/* Decorative elements */}
                      <div className="absolute -top-2 -left-2 w-8 h-8 border-t border-l border-gold-500/30 rounded-tl-lg z-0" />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b border-r border-gold-500/30 rounded-br-lg z-0" />
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold"
                          style={{ 
                            background: "rgba(255,255,255,0.03)",
                            border: `1px solid ${badge.border}`,
                            color: badge.text
                          }}
                        >
                          {agent.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                      </div>
                      <p className="text-xs text-white/40 mb-3">{agent.role}</p>
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
