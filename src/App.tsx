/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import CaseStudies from "./components/CaseStudies";
import WhyUs from "./components/WhyUs";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FacebookChat from "./components/FacebookChat";
import NameCard from "./components/NameCard";
import { motion, useScroll, useSpring } from "motion/react";
import { LanguageProvider } from "./translations";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function MainLayout() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-navy-900 selection:bg-gold-500 selection:text-navy-900">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <Process />
        <CaseStudies />
        <WhyUs />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
      <FacebookChat />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/digitalcard" element={<NameCard />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
