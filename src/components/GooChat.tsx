import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Bot, Loader2, Minimize2, Maximize2 } from "lucide-react";
import { GoogleGenAI, Type } from "@google/genai";

interface Message {
  role: "user" | "model" | "function";
  text: string;
  name?: string;
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

  const sendLeadEmail = async (name: string, phone: string, email: string, message: string) => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message: `[AI Lead] ${message}` }),
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, error: data.error || "Unknown server error" };
      }
      return { success: true };
    } catch (error) {
      console.error("Error sending lead email:", error);
      return { success: false, error: "Network error" };
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user" as const, text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Safely access GEMINI_API_KEY
      const apiKey = (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : (window as any).process?.env?.GEMINI_API_KEY) || "";
      
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.length < 10) {
        throw new Error("GEMINI_API_KEY is missing or invalid.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `
        Та бол Cornerstone AI компанийн мэргэжлийн AI агент "Гоо" юм. 
        
        ХАРИЛЦААНЫ ДҮРЭМ:
        1. Зөвхөн Cornerstone AI компани, түүний үйлчилгээ, төслүүдтэй холбоотой асуултанд хариулна.
        2. Хэрэв хэрэглэгч компанитай холбоогүй зүйл асуувал: "Уучлаарай, би зөвхөн Cornerstone AI компани болон манай үйлчилгээтэй холбоотой мэдээлэл өгөх боломжтой." гэж хариулна.
        3. Хариулт нь товч бөгөөд тодорхой байна.
        
        ХЭРЭГЛЭГЧИЙН МЭДЭЭЛЭЛ ЦУГЛУУЛАХ:
        - Хэрэв хэрэглэгч ажил хийлгэх сонирхолтой байвал та заавал тэдний Нэр, Утас, Имэйлийг асууж авна.
        - Мэдээллийг авсны дараа "sendLeadInformation" функцийг ашиглана.

        Cornerstone AI Үйлчилгээнүүд:
        - AI автоматжуулалт, Вэб хөгжүүлэлт, Мобайл апп, Бизнес аналитик.
      `;

      // Format contents for @google/genai
      // Strictly alternate roles, starting with 'user'
      const contents = newMessages
        .filter((m, i) => {
          // If first message is model, skip it to ensure we start with user
          if (i === 0 && m.role === 'model') return false;
          return true;
        })
        .map(m => ({
          role: m.role === "function" ? "model" as const : (m.role as "user" | "model"),
          parts: [{ text: m.text }]
        }));

      if (contents.length === 0) {
        contents.push({ role: "user", parts: [{ text: userMessage }] });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents,
        config: {
          systemInstruction,
          temperature: 0.5,
          tools: [{
            functionDeclarations: [{
              name: "sendLeadInformation",
              description: "Sends user contact information (lead) to Cornerstone AI team.",
              parameters: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "User's full name" },
                  phone: { type: Type.STRING, description: "User's phone number" },
                  email: { type: Type.STRING, description: "User's email address" },
                  message: { type: Type.STRING, description: "Brief description of the request" }
                },
                required: ["name", "phone", "email", "message"]
              }
            }]
          }]
        },
      });

      const functionCalls = response.functionCalls;
      
      if (functionCalls && functionCalls.length > 0 && functionCalls[0].name === "sendLeadInformation") {
        const { name, phone, email, message } = functionCalls[0].args as any;
        const result = await sendLeadEmail(name, phone, email, message);
        
        const finalResponse = result.success 
          ? "Мэдээллийг хүлээн авлаа, манай баг тантай удахгүй холбогдох болно. Баярлалаа!" 
          : "Уучлаарай, мэдээлэл илгээхэд алдаа гарлаа. Гэхдээ таны хүсэлтийг тэмдэглэж авлаа.";
          
        setMessages(prev => [...prev, { role: "model", text: finalResponse }]);
      } else {
        const modelResponse = response.text || "Уучлаарай, хариу өгөхөд алдаа гарлаа. Та асуултаа тодруулна уу.";
        setMessages(prev => [...prev, { role: "model", text: modelResponse }]);
      }
    } catch (error: any) {
      console.error("Chat Error Detail:", error);
      const msg = error?.message || String(error);
      let userMsg = "Уучлаарай, системд алдаа гарлаа. Та дараа дахин оролдоно уу.";
      if (msg.includes("GEMINI_API_KEY") || msg.includes("API_KEY") || msg.includes("apiKey")) {
        userMsg = "AI систем түр ажиллагаагүй байна (API Key тохиргоо дутуу).";
      }
      setMessages(prev => [...prev, { role: "model", text: userMsg }]);
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
                      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-1">
                        <motion.span
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          className="w-1.5 h-1.5 bg-[#C49A3C] rounded-full"
                        />
                        <motion.span
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          className="w-1.5 h-1.5 bg-[#C49A3C] rounded-full"
                        />
                        <motion.span
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          className="w-1.5 h-1.5 bg-[#C49A3C] rounded-full"
                        />
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
