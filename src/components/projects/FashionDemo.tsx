import { motion } from "motion/react";
import { ShoppingBag, Search, Menu, ArrowRight, Filter, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FashionDemo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("SILVER");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const images = [
    "https://lh3.googleusercontent.com/d/1vlnCxzBiIPbPePJgx4PyJtGSSJeHvO9C",
    "https://lh3.googleusercontent.com/d/1BaypdxJnjiT3uRzNjaFPId1OnnRKc8AR",
    "https://lh3.googleusercontent.com/d/1z2QgihPoJq-qPosrNVpdiX4EZHwDKCaA",
    "https://lh3.googleusercontent.com/d/1Uj1K0dU5tld8b6psGlOQjaGtLsu3JmHx",
    "https://lh3.googleusercontent.com/d/1DXQ5gZ_4ouSY7zB5YuJ16m1JVJ0VYDLa"
  ];

  const products = [
    { id: 1, name: "AURORA SILVER", price: "$999.99", type: "REFLECTIVE PUFFER JACKET", image: images[0] },
    { id: 2, name: "ORBIT SILVER", price: "$1,299.99", type: "HIGH-GLOSS PUFFER", image: images[1] },
    { id: 3, name: "STEALTH BLACK", price: "$1,199.99", type: "HEAVY SHIELD PUFFER", image: images[2] },
    { id: 4, name: "GLACIER WHITE", price: "$1,299.99", type: "INSULATED PUFFER", image: images[3] },
    { id: 5, name: "POLAR GLOSS", price: "$899.99", type: "BLUE PUFFER JACKET", image: images[4] },
    { id: 6, name: "ICEFIELD BLUE", price: "$999.99", type: "TECH PUFFER JACKET", image: images[0] },
    { id: 7, name: "ARCTIC SHIELD", price: "$1,499.99", type: "EXTREME COLD PARKA", image: images[1] },
    { id: 8, name: "FROST BITE", price: "$799.99", type: "LIGHTWEIGHT PUFFER", image: images[2] },
    { id: 9, name: "TUNDRA TECH", price: "$1,099.99", type: "MODULAR JACKET", image: images[3] },
  ];

  return (
    <div className="min-h-screen bg-stealth-black text-off-white font-sans selection:bg-glacier-blue selection:text-stealth-black overflow-x-hidden">
      {/* Floating Banner */}
      <div className="fixed top-0 left-0 w-full z-[100] bg-glacier-blue text-stealth-black py-2 px-4 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-widest">
        <span>⚡ Энэ бол Cornerstone AI-ын demo загвар</span>
        <a 
          href="https://cornerstoneai.dev/digitalcard" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1 hover:underline"
        >
          Захиалга өгөх <ChevronRight className="w-3 h-3" />
        </a>
      </div>

      {/* Navigation */}
      <nav className="fixed top-10 left-0 w-full z-50 px-8 py-4 flex items-center justify-between bg-stealth-black/40 backdrop-blur-xl border-b border-white/5">
        <Link to="/" className="text-3xl font-display tracking-tighter text-white">FRZN</Link>
        
        <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold tracking-[0.3em] uppercase text-steel-gray">
          <a href="#" className="hover:text-white transition-colors">Catalog</a>
          <a href="#" className="hover:text-white transition-colors">Puffers</a>
          <a href="#" className="hover:text-white transition-colors">Boots</a>
          <a href="#" className="hover:text-white transition-colors">Catalog</a>
          <a href="#" className="hover:text-white transition-colors">Puffers</a>
        </div>

        <div className="flex items-center gap-6">
          <button className="hover:text-glacier-blue transition-colors"><Search className="w-5 h-5" /></button>
          <button className="hover:text-glacier-blue transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-glacier-blue text-stealth-black text-[8px] flex items-center justify-center rounded-full font-bold">2</span>
          </button>
          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden"><Menu className="w-6 h-6" /></button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/d/1vcYzDGW67-PMjCptlzkWtJ82phnxjZB8" 
            alt="Mountain Background" 
            className="w-full h-full object-cover opacity-70"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stealth-black/60 via-stealth-black/20 to-transparent" />
        </div>

        <div className="container mx-auto px-8 relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "circOut" }}
            >
              <div className="flex items-center gap-4 text-[10px] font-mono text-steel-gray mb-6 tracking-[0.2em]">
                <span>SERIES</span>
                <span className="w-8 h-px bg-steel-gray/30" />
                <span>SINGLE NO.1</span>
                <span className="w-8 h-px bg-steel-gray/30" />
                <span className="text-glacier-blue">SERIES 1</span>
              </div>

              <h1 className="text-[12vw] lg:text-[10vw] font-display leading-[0.85] mb-12 tracking-tighter">
                COLLECTION<br />
                <span className="text-glacier-blue">ARCTIC 01</span>
                <span className="text-[2vw] align-top ml-2 opacity-50">TM</span>
              </h1>

              <div className="flex flex-wrap items-center gap-16">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-steel-gray mb-4">Size selector</p>
                  <div className="flex gap-3">
                    {['S', 'M', 'L', 'XL'].map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 rounded-full border text-xs font-bold transition-all ${
                          selectedSize === size 
                            ? 'bg-off-white text-stealth-black border-off-white' 
                            : 'border-white/10 text-white/40 hover:border-white/40'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-steel-gray mb-4">Color swatches</p>
                  <div className="flex gap-4">
                    {['WHITE', 'SILVER'].map(color => (
                      <button 
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-2 rounded-full border text-[10px] font-bold tracking-widest transition-all ${
                          selectedColor === color 
                            ? 'bg-off-white text-stealth-black border-off-white' 
                            : 'border-white/10 text-white/40 hover:border-white/40'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-16 flex items-center gap-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-glacier-blue blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div 
                    className="relative flex items-center gap-6 bg-off-white text-stealth-black px-14 py-7 font-display text-3xl tracking-tight hover:bg-white transition-colors cursor-pointer"
                    style={{ clipPath: "polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)" }}
                  >
                    <span>ADD TO CART</span>
                    <span className="w-px h-6 bg-stealth-black/20" />
                    <span>$899.99</span>
                  </div>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="hidden lg:flex justify-end gap-6"
            >
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -15, scale: 1.05, rotate: i === 2 ? 0 : i === 1 ? -2 : 2 }}
                  className={`w-32 h-48 rounded-2xl overflow-hidden border border-white/20 shadow-2xl ${i === 2 ? 'mt-12' : ''} cursor-pointer`}
                >
                  <img 
                    src={products[i-1].image} 
                    alt="Product Thumbnail" 
                    className="w-full h-full object-cover transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Collection Grid */}
      <section className="py-32 bg-stealth-black">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="text-7xl lg:text-9xl font-display leading-none tracking-tighter mb-8">NEW COLLECTION</h2>
              <div className="flex flex-wrap gap-4">
                {['NEW COLLECTION', 'SERIES 01', 'PUFFERS'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono text-steel-gray tracking-widest">
                    [{tag}]
                  </span>
                ))}
              </div>
            </div>
            <button className="flex items-center gap-3 px-8 py-4 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-off-white hover:text-stealth-black transition-all self-start lg:self-end">
              <Filter className="w-4 h-4" /> FILTERS
            </button>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Featured Large Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative group cursor-pointer overflow-hidden rounded-3xl aspect-[4/5] lg:aspect-auto"
            >
              <div className="absolute inset-0 bg-glacier-blue/20 z-0" />
              <img 
                src={images[4]} 
                alt="Featured Product" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stealth-black via-transparent to-transparent opacity-80" />
              
              {/* Graffiti Accent */}
              <div className="absolute top-12 left-12 opacity-20 pointer-events-none">
                <span className="text-8xl font-display text-white italic tracking-tighter">AURORA</span>
              </div>

              <div className="absolute bottom-12 left-12 right-12 flex items-end justify-between">
                <div>
                  <h3 className="text-4xl font-display mb-2">AURORA<span className="text-xs align-top ml-1">TM</span></h3>
                  <p className="text-2xl font-display text-glacier-blue">$1,999</p>
                </div>
                <button className="w-16 h-16 rounded-full bg-off-white text-stealth-black flex items-center justify-center hover:scale-110 transition-transform">
                  <ArrowRight className="w-8 h-8 -rotate-45" />
                </button>
              </div>
            </motion.div>

            {/* 4-column product grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {products.slice(0, 4).map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="aspect-[3/4] bg-glacier-blue/10 rounded-2xl overflow-hidden mb-6 relative border border-white/5 group-hover:border-glacier-blue/50 group-hover:shadow-[0_0_30px_rgba(168,191,208,0.2)] transition-all duration-500">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute top-4 right-4 flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-white" />
                      <div className="w-2 h-2 rounded-full bg-steel-gray" />
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-display tracking-tight mb-1">{product.name}</h4>
                      <p className="text-[9px] uppercase tracking-widest text-steel-gray">{product.type}</p>
                    </div>
                    <p className="font-bold text-sm">{product.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Second row: 5-column smaller product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-20">
            {products.slice(4, 9).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group"
              >
                <div className="aspect-[4/5] bg-glacier-blue/5 rounded-xl overflow-hidden mb-4 relative border border-white/5 group-hover:border-glacier-blue/40 group-hover:shadow-[0_0_20px_rgba(168,191,208,0.15)] transition-all duration-500">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h5 className="text-xs font-display tracking-tight mb-1">{product.name}</h5>
                <p className="text-[10px] font-bold text-steel-gray">{product.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Graffiti Statement Section */}
      <section className="relative py-64 bg-stealth-black overflow-hidden">
        {/* Giant Graffiti Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none">
          <span className="text-[40vw] font-display italic leading-none whitespace-nowrap">FRZN CORE</span>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-xs">
              <p className="text-[10px] font-mono leading-relaxed text-steel-gray uppercase tracking-widest">
                FRZN WAS BORN IN THE MOUNTAINS, NOT AS A TREND, 
                BUT AS A RESPONSE · [PROTOCOL: ALTAIR OPS_01]
              </p>
            </div>
            <div className="text-right">
              <h3 className="text-4xl lg:text-6xl font-display leading-none tracking-tighter uppercase mb-4">
                FOR THOSE WHO CLIMB,<br />
                NOT FOR THE CROWD
              </h3>
            </div>
          </div>
        </div>

        {/* Mountain Silhouette */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-stealth-black to-transparent z-0" />
        <div className="absolute bottom-0 left-0 w-full opacity-20 pointer-events-none">
          <svg viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,218.7C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Footer Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://lh3.googleusercontent.com/d/1vcYzDGW67-PMjCptlzkWtJ82phnxjZB8" 
            alt="Footer Mountain" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stealth-black/60 via-transparent to-stealth-black/60" />
        </div>
        
        <div className="container mx-auto px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[12vw] font-display leading-[0.85] tracking-tighter uppercase mb-20">
              BUILT FOR COLD<br />
              MADE FOR HEIGHT<br />
              FORGED TO LAST
            </h2>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-20 border-t border-white/10">
              <div className="text-left">
                <span className="text-6xl font-display text-white">FRZN</span>
                <p className="text-[10px] font-mono text-steel-gray mt-2 tracking-[0.4em]">EST. 2026 / ULAANBAATAR</p>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="bg-white p-2 mb-4">
                  <div className="w-48 h-12 bg-black flex items-center justify-center">
                    <div className="flex gap-1 h-full items-center px-4">
                      {[1, 2, 4, 1, 3, 2, 1, 5, 2, 1, 4, 2, 1, 3, 2, 1].map((w, i) => (
                        <div key={i} className="bg-white h-8" style={{ width: `${w}px` }} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[8px] font-mono text-steel-gray tracking-widest">PRODUCT AUTHENTICITY CODE: 092834-X</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          className="fixed inset-0 z-[200] bg-stealth-black p-8 flex flex-col"
        >
          <div className="flex justify-between items-center mb-20">
            <span className="text-3xl font-display text-white">FRZN</span>
            <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
          </div>
          <div className="flex flex-col gap-8 text-6xl font-display uppercase">
            <a href="#" onClick={() => setIsMenuOpen(false)}>Catalog</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Puffers</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Boots</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>About</a>
          </div>
        </motion.div>
      )}
    </div>
  );
}
