import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Clock, Calendar, ArrowRight } from "lucide-react";

interface InsightCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
  image: string;
  key?: string;
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  "AI": { bg: "#1A2744", text: "#5B8FD4" },
  "Технологи": { bg: "#1E1230", text: "#9B7FD4" },
  "Бизнес": { bg: "#231A0A", text: "#C49A3C" },
  "Cornerstone": { bg: "#0F2018", text: "#4CAF7D" },
};

export default function InsightCard({ title, excerpt, category, date, readTime, slug, image }: InsightCardProps) {
  const style = CATEGORY_STYLES[category] || { bg: "rgba(255,255,255,0.05)", text: "#6B7A99" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group bg-[#111827] rounded-2xl border border-white/5 hover:border-[#C49A3C]/30 transition-all duration-500 overflow-hidden flex flex-col h-full"
    >
      {/* Thumbnail */}
      <div className="aspect-[16/9] overflow-hidden relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-8 flex flex-col h-full">
        <div className="mb-6">
          <span 
            className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border"
            style={{ 
              backgroundColor: style.bg, 
              color: style.text, 
              borderColor: `${style.text}33` 
            }}
          >
            {category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-[#F0EBE0] mb-4 group-hover:text-white transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-[#6B7A99] text-sm leading-relaxed mb-8 line-clamp-2">
          {excerpt}
        </p>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[10px] text-[#6B7A99] font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              {date}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {readTime}
            </div>
          </div>

          <Link 
            to={`/insights/${slug}`}
            className="text-[#C49A3C] text-xs font-bold flex items-center gap-1.5 hover:gap-2 transition-all"
          >
            Унших <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
