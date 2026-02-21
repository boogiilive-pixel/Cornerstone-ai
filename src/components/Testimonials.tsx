import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Б. Гантулга",
    role: "Үл хөдлөх хөрөнгийн захирал",
    content: "CornerstoneAI-тай хамтарснаар манай борлуулалт 3 дахин өссөн. Тэдний AI шийдлүүд үнэхээр гайхалтай.",
    image: "https://picsum.photos/seed/p1/100/100"
  },
  {
    name: "С. Ариунаа",
    role: "Сургалтын төвийн үүсгэн байгуулагч",
    content: "Бүртгэлийн систем маань бүрэн автомат болсноор бид илүү олон сурагчдад анхаарал хандуулах боломжтой болсон.",
    image: "https://picsum.photos/seed/p2/100/100"
  },
  {
    name: "Д. Бат-Эрдэнэ",
    role: "Стартап үүсгэн байгуулагч",
    content: "Технологийн суурийг маш зөв тавьж өгсөн. Одоо бид ямар ч асуудалгүйгээр системээ тэлж байна.",
    image: "https://picsum.photos/seed/p3/100/100"
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-navy-800/50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full glass mb-12"
          >
            <Quote className="w-8 h-8 text-gold-500" />
          </motion.div>

          <div className="relative h-[300px] md:h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <p className="text-2xl md:text-3xl font-serif italic mb-12 leading-relaxed text-white/90">
                  "{testimonials[index].content}"
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-gold-500 p-1">
                    <img 
                      src={testimonials[index].image} 
                      alt={testimonials[index].name}
                      className="w-full h-full rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-lg">{testimonials[index].name}</h4>
                    <p className="text-gold-500 text-sm">{testimonials[index].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-gold-500' : 'bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
