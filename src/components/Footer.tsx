import { motion } from "motion/react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "../translations";
import Logo from "./Logo";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-20 bg-navy-900 border-t border-white/5 relative overflow-hidden">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div 
            key={i}
            initial={{ 
              top: "100%", 
              left: `${Math.random() * 100}%`,
              opacity: 0,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              top: "-5%", 
              opacity: [0, 0.4, 0.4, 0],
              left: `${(Math.random() * 100)}%`
            }}
            transition={{ 
              duration: Math.random() * 10 + 15, 
              repeat: Infinity, 
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute w-1.5 h-1.5 bg-gold-500/40 rounded-full blur-[1px]"
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <Logo className="mb-8" iconSize="w-8 h-8" textSize="text-2xl" />
            <p className="text-white/50 max-w-sm mb-8 leading-relaxed">
              {t('hero_desc')}
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="https://www.facebook.com/cornerstoneai"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, color: "#D4AF37" }}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold mb-8">{t('footer_links')}</h4>
            <ul className="space-y-4">
              {[
                { name: t('nav_services'), href: "#services" },
                { name: t('nav_process'), href: "#process" },
                { name: t('nav_cases'), href: "#cases" },
                { name: t('nav_pricing'), href: "#pricing" }
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-white/50 hover:text-gold-500 transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold mb-8">{t('footer_contact')}</h4>
            <ul className="space-y-4">
              <li className="text-white/50">boogiilive@gmail.com</li>
              <li className="text-white/50">+976 9507-6599</li>
              <li className="text-white/50">Ulaanbaatar, Mongolia</li>
              <li className="pt-2">
                <a 
                  href="/digitalcard" 
                  className="text-gold-500/80 hover:text-gold-500 text-sm font-medium transition-colors flex items-center gap-2 group"
                >
                  Digital Card
                  <span className="w-4 h-px bg-gold-500/30 group-hover:w-6 transition-all"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} CornerstoneAI. {t('footer_rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
