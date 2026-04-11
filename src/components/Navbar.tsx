import { motion } from "motion/react";
import { Menu, X, Globe } from "lucide-react";
import React, { useState } from "react";
import { useLanguage } from "../translations";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      const targetId = hash;
      
      // If we are already on the target path (or it's the homepage and we are on /)
      const isCurrentPath = location.pathname === path || (path === '/' && location.pathname === '/');
      
      if (isCurrentPath) {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: t('nav_services'), href: "/#services" },
    { name: t('nav_about'), href: "/about" },
    { name: t('nav_process'), href: "/#process" },
    { name: t('nav_cases'), href: "/#cases" },
    { name: t('nav_pricing'), href: "/#pricing" },
    { name: "Digital Card", href: "/digitalcard" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Logo iconSize="w-8 h-8" textSize="text-2xl" />
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            link.href.includes('#') ? (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className="text-sm font-medium text-white/70 hover:text-gold-500 transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-white/70 hover:text-gold-500 transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
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
            onClick={(e) => handleNavLinkClick(e, '/#contact')}
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
            <Link
              key={link.name}
              to={link.href}
              className="text-lg font-medium"
              onClick={(e) => handleNavLinkClick(e, link.href)}
            >
              {link.name}
            </Link>
          ))}
          <button 
            className="w-full py-4 bg-gold-500 text-navy-900 rounded-xl font-bold"
            onClick={(e) => handleNavLinkClick(e, '/#contact')}
          >
            {t('nav_cta')}
          </button>
        </motion.div>
      )}
    </nav>
  );
}
