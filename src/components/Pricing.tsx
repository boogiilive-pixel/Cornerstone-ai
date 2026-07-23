import { motion } from "motion/react";
import { Check, Zap } from "lucide-react";
import { useLanguage } from "../translations";

export default function Pricing() {
  const { t, language } = useLanguage();

  const plans = [
    {
      name: { mn: "Starter Foundation", en: "Starter Foundation" },
      price: { mn: "₮2.8M+", en: "₮2.8M+" },
      description: { 
        mn: "Жижиг бизнес болон танилцуулга вэб сайтуудад зориулагдсан.", 
        en: "Designed for small businesses and presentation websites." 
      },
      features: {
        mn: ["Custom Дизайн", "5 хүртэлх хуудас", "SEO суурь тохиргоо", "Гар утсанд нийцтэй", "1 сарын дэмжлэг"],
        en: ["Custom Design", "Up to 5 pages", "Basic SEO setup", "Mobile responsive", "1 month support"]
      },
      highlight: false,
      color: "from-blue-500/10 to-gold-500/10"
    },
    {
      name: { mn: "Growth Builder", en: "Growth Builder" },
      price: { mn: "₮4.8M+", en: "₮4.8M+" },
      description: { 
        mn: "Борлуулалт болон систем интеграци шаардлагатай бизнесүүдэд.", 
        en: "For businesses requiring sales and system integration." 
      },
      features: {
        mn: ["Starter-ийн бүх боломж", "E-commerce / Бүртгэлийн систем", "AI Чатбот интеграци", "CRM холболт", "3 сарын дэмжлэг"],
        en: ["All Starter features", "E-commerce / Registration system", "AI Chatbot integration", "CRM connection", "3 months support"]
      },
      highlight: true,
      color: "from-gold-500/20 to-gold-400/20"
    },
    {
      name: { mn: "Enterprise Architect", en: "Enterprise Architect" },
      price: { mn: "Custom", en: "Custom" },
      description: { 
        mn: "Томоохон хэмжээний систем болон AI автоматжуулалт.", 
        en: "Large-scale systems and AI automation." 
      },
      features: {
        mn: ["Custom Вэб/Апп систем", "Бүрэн автоматжуулалт", "AI Workflow систем", "Dedicated сервер", "Урт хугацааны хамтын ажиллагаа"],
        en: ["Custom Web/App system", "Full automation", "AI Workflow system", "Dedicated server", "Long-term partnership"]
      },
      highlight: false,
      color: "from-purple-500/10 to-gold-500/10"
    }
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
          >
            {t('pricing_title')} <span className="text-gradient-gold">{t('pricing_title_accent')}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg"
          >
            {t('pricing_desc')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name.en}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`group relative p-8 rounded-[32px] glass flex flex-col transition-all duration-500 ${plan.highlight ? 'border-gold-500/50 glow-gold' : 'border-white/5'}`}
            >
              {/* Background Glow (Clipped by this container) */}
              <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none">
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
              
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gold-500 text-navy-900 text-xs font-bold rounded-full flex items-center gap-1 z-30 shadow-xl whitespace-nowrap">
                  <Zap className="w-3 h-3 fill-current" />
                  {t('pricing_popular')}
                </div>
              )}

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-serif font-bold mb-2">{plan.name[language]}</h3>
                  <div className="text-4xl font-bold text-gold-500 mb-4">{plan.price[language]}</div>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {plan.description[language]}
                  </p>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features[language].map((feature: string) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-white/80">
                      <Check className="w-5 h-5 text-gold-500 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.highlight ? 'bg-gold-500 text-navy-900 hover:bg-gold-400' : 'glass hover:bg-white/10'}`}
                >
                  {t('pricing_cta')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
