import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Bot, User, Loader2, Minimize2, Maximize2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function GooChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Би Cornerstone Ai компанийн ажилтан Гоо байна танд юугаар туслах вэ?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      console.log("Attempting to initialize Gemini with API Key length:", apiKey?.length || 0);
      
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.length < 10) {
        throw new Error("Invalid or missing GEMINI_API_KEY. Please check your Vercel Environment Variables.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `
        You are Goo, a professional AI agent and employee at Cornerstone AI, a leading Mongolian AI and technology company. 
        Your tone is professional, helpful, and innovative. 
        You speak in Mongolian (and English if requested).
        
        Cornerstone AI Services:
        - AI Automation & Agents (like yourself)
        - Web Development (Next.js, React, modern web tech)
        - Mobile App Development (Flutter, high-performance apps)
        - Business Intelligence & Dashboards (Cornerstone OS)
        - SEO Optimization for Mongolian market
        
        Key Projects to mention if relevant:
        - Mergejil.com (Career selection system)
        - Mongol Mind (Personal development app)
        - Sorilt.com (Psychological testing platform)
        - Suut Resort (Modern resort website)
        
        Your goal is to assist visitors, answer questions about Cornerstone AI, and encourage them to start a project.
        Always be polite and represent the company's high standards.
        If you don't know something specific, suggest they contact the team via the contact form or digital card.
      `;

      // Gemini history must start with a 'user' message. 
      const history = messages
        .slice(1) 
        .map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }));

      console.log("Sending request to Gemini model...");
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [
          ...history,
          { role: "user", parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const modelResponse = response.text || "Уучлаарай, хариу өгөхөд алдаа гарлаа. Та дахин оролдоно уу.";
      setMessages(prev => [...prev, { role: "model", text: modelResponse }]);
    } catch (error: any) {
      console.error("Detailed Chat Error:", error);
      let errorMessage = "Уучлаарай, системд алдаа гарлаа. Та дараа дахин оролдоно уу.";
      
      if (error?.message?.includes("API_KEY")) {
        errorMessage = "API Key тохиргоо буруу байна. Vercel дээр GEMINI_API_KEY-г зөв оруулсан эсэхээ шалгана уу.";
      } else if (error?.status === 403 || error?.message?.includes("403")) {
        errorMessage = "API Key-д хандах эрхгүй байна (403). Google AI Studio-оос шинэ түлхүүр авч үзнэ үү.";
      } else if (error?.status === 404 || error?.message?.includes("404")) {
        errorMessage = "Модель олдсонгүй (404). Систем шинэчлэгдэж байна.";
      }

      setMessages(prev => [...prev, { role: "model", text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? "64px" : "500px",
              width: "380px"
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-[#0D1526] border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden mb-4 glow-gold"
          >
            {/* Header */}
            <div className="p-4 bg-[#111827] border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C49A3C] to-[#E5C17E] flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 text-[#0A0F1E]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-none">Goo Agent</h3>
                  <span className="text-[10px] text-[#C49A3C] font-medium uppercase tracking-wider">Cornerstone AI</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/5 rounded-full text-[#6B7A99] transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-full text-[#6B7A99] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user" 
                          ? "bg-[#C49A3C] text-[#0A0F1E] rounded-tr-none font-medium" 
                          : "bg-white/5 text-[#F0EBE0] border border-white/10 rounded-tl-none"
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none">
                        <Loader2 className="w-4 h-4 text-[#C49A3C] animate-spin" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-[#111827] border-t border-white/5">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Асуултаа энд бичнэ үү..."
                      className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-5 pr-12 text-sm text-white placeholder:text-[#6B7A99] focus:outline-none focus:border-[#C49A3C]/50 transition-all"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 p-2 bg-[#C49A3C] text-[#0A0F1E] rounded-full hover:bg-[#D4AA4C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? "bg-[#111827] text-[#C49A3C] rotate-90" : "bg-[#C49A3C] text-[#0A0F1E]"
        } glow-gold`}
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#C49A3C] animate-ping opacity-20"></span>
        )}
      </motion.button>
    </div>
  );
}
