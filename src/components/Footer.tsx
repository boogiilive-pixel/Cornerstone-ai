import { motion } from "motion/react";
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-20 bg-navy-900 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Particles Background (Simplified) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-gold-500 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center font-bold text-navy-900 text-xl">
                C
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight">
                Cornerstone<span className="text-gold-500">AI</span>
              </span>
            </div>
            <p className="text-white/50 max-w-sm mb-8 leading-relaxed">
              Бид таны бизнесийн зөв суурийг AI-тай хамт байгуулна. Өндөр гүйцэтгэлтэй веб сайт, апп болон стратегийн зөвлөх үйлчилгээ.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: "#D4AF37" }}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold mb-8">Цэс</h4>
            <ul className="space-y-4">
              {[
                { name: "Үйлчилгээ", href: "#services" },
                { name: "Процесс", href: "#process" },
                { name: "Кейс судалгаа", href: "#cases" },
                { name: "Үнийн багц", href: "#pricing" }
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-white/50 hover:text-gold-500 transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold mb-8">Холбоо барих</h4>
            <ul className="space-y-4">
              <li className="text-white/50">boogiilive@gmail.com</li>
              <li className="text-white/50">+976 9507-6599</li>
              <li className="text-white/50">Улаанбаатар, Монгол Улс</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-sm">
            © 2026 CornerstoneAI. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm font-bold text-white/50 hover:text-gold-500 transition-colors"
          >
            Дээшээ буцах
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-gold-500 group-hover:text-navy-900 transition-all">
              <ArrowUp className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
