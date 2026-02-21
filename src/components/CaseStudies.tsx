import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

const cases = [
  {
    title: "Үл хөдлөх хөрөнгө",
    result: "3x Lead өсөлт",
    description: "AI-д суурилсан хайлтын систем болон автоматжуулсан чатбот нэвтрүүлсэн.",
    image: "https://picsum.photos/seed/realestate/800/600",
    size: "lg"
  },
  {
    title: "Сургалтын төв",
    result: "Автомат бүртгэл",
    description: "Бүртгэлийн процессыг 100% автоматжуулж, цаг хэмнэсэн.",
    image: "https://picsum.photos/seed/education/800/800",
    size: "md"
  },
  {
    title: "Сүм",
    result: "Онлайн хандив",
    description: "Олон улсын хандив хүлээн авах аюулгүй систем.",
    image: "https://picsum.photos/seed/church/800/600",
    size: "md"
  },
  {
    title: "Стартап",
    result: "50% Хурд өсөлт",
    description: "Backend архитектурыг шинэчилж, хурдыг нэмэгдүүлсэн.",
    image: "https://picsum.photos/seed/startup/800/800",
    size: "lg"
  }
];

export default function CaseStudies() {
  return (
    <section id="cases" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold mb-6"
            >
              Амжилтын <span className="text-gradient-gold">Түүхүүд</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/60 text-lg"
            >
              Бидний хэрэгжүүлсэн төслүүд болон тэдгээрийн бодит үр дүнгүүд.
            </motion.p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass rounded-full font-bold text-sm"
          >
            Бүх кейсийг үзэх
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {cases.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative rounded-3xl overflow-hidden aspect-[4/3] ${item.size === 'lg' ? 'md:col-span-1' : ''}`}
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-gold-500 text-navy-900 text-xs font-bold rounded-full">
                      {item.result}
                    </span>
                    <h3 className="text-2xl font-serif font-bold">{item.title}</h3>
                  </div>
                  <p className="text-white/70 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-md">
                    {item.description}
                  </p>
                  <button className="flex items-center gap-2 text-gold-500 font-bold text-sm">
                    Дэлгэрэнгүй <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
