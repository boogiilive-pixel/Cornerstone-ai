import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

export default function FacebookChat() {
  const messengerUrl = "https://m.me/107350017841692";

  return (
    <motion.a
      href={messengerUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#0084FF] text-white rounded-full flex items-center justify-center shadow-lg glow-gold cursor-pointer"
      title="Message us on Messenger"
    >
      <MessageCircle className="w-7 h-7" />
      
      {/* Ripple Effect Animation */}
      <span className="absolute inset-0 rounded-full bg-[#0084FF] animate-ping opacity-20"></span>
    </motion.a>
  );
}
