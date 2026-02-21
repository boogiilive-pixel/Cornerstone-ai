import { motion } from "motion/react";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter Foundation",
    price: "₮1.5M+",
    description: "Жижиг бизнес болон танилцуулга вэб сайтуудад зориулагдсан.",
    features: [
      "Custom Дизайн",
      "5 хүртэлх хуудас",
      "SEO суурь тохиргоо",
      "Гар утсанд нийцтэй",
      "1 сарын дэмжлэг"
    ],
    highlight: false,
    color: "from-blue-500/10 to-gold-500/10"
  },
  {
    name: "Growth Builder",
    price: "₮3.5M+",
    description: "Борлуулалт болон систем интеграци шаардлагатай бизнесүүдэд.",
    features: [
      "Starter-ийн бүх боломж",
      "E-commerce / Бүртгэлийн систем",
      "AI Чатбот интеграци",
      "CRM холболт",
      "3 сарын дэмжлэг"
    ],
    highlight: true,
    color: "from-gold-500/20 to-gold-400/20"
  },
  {
    name: "Enterprise Architect",
    price: "Custom",
    description: "Томоохон хэмжээний систем болон AI автоматжуулалт.",
    features: [
      "Custom Вэб/Апп систем",
      "Бүрэн автоматжуулалт",
      "AI Workflow систем",
      "Dedicated сервер",
      "Урт хугацааны хамтын ажиллагаа"
    ],
    highlight: false,
    color: "from-purple-500/10 to-gold-500/10"
  }
];

export default function Pricing() {
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
            Үнийн <span className="text-gradient-gold">Багцууд</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg"
          >
            Таны бизнесийн хэрэгцээнд нийцсэн уян хатан үнийн саналууд.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
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
                  Хамгийн эрэлттэй
                </div>
              )}

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-serif font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-gold-500 mb-4">{plan.price}</div>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature) => (
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
                  Сонгох
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
