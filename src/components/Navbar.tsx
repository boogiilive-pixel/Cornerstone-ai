import { motion } from "motion/react";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../translations";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t('nav_services'), href: "#services" },
    { name: t('nav_process'), href: "#process" },
    { name: t('nav_cases'), href: "#cases" },
    { name: t('nav_pricing'), href: "#pricing" },
    { name: "Digital Card", href: "/digitalcard" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center font-bold text-navy-900 text-xl">
            C
          </div>
          <span className="text-2xl font-serif font-bold tracking-tight">
            Cornerstone<span className="text-gold-500">AI</span>
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            link.href.startsWith('/') ? (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.href}
                  className="text-sm font-medium text-white/70 hover:text-gold-500 transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ) : (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm font-medium text-white/70 hover:text-gold-500 transition-colors"
              >
                {link.name}
              </motion.a>
            )
          ))}
          
          {/* Language Switcher */}
          <div className="flex items-center gap-2 border-l border-white/10 pl-8">
            <button 
              onClick={() => setLanguage('mn')}
              className={`text-xs font-bold transition-all ${language === 'mn' ? 'text-gold-500 scale-110' : 'text-white/40 hover:text-white/60'}`}
              title="Монгол"
            >
              MN
            </button>
            <span className="text-white/10 text-[10px]">|</span>
            <button 
              onClick={() => setLanguage('en')}
              className={`text-xs font-bold transition-all ${language === 'en' ? 'text-gold-500 scale-110' : 'text-white/40 hover:text-white/60'}`}
              title="English"
            >
              EN
            </button>
          </div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2.5 bg-gold-500 text-navy-900 rounded-full font-bold text-sm glow-gold hover:bg-gold-400 transition-colors"
          >
            {t('nav_cta')}
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLanguage(language === 'mn' ? 'en' : 'mn')}
              className="w-8 h-8 rounded-full glass flex items-center justify-center text-[10px] font-bold text-gold-500"
            >
              {language.toUpperCase()}
            </button>
          </div>
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden glass border-t border-white/5 px-6 py-8 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            link.href.startsWith('/') ? (
              <Link
                key={link.name}
                to={link.href}
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ) : (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            )
          ))}
          <button 
            className="w-full py-4 bg-gold-500 text-navy-900 rounded-xl font-bold"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              setIsOpen(false);
            }}
          >
            {t('nav_cta')}
          </button>
        </motion.div>
      )}
    </nav>
  );
}
