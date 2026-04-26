import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Bot, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function GooChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Сайн байна уу? Би Cornerstone AI-ийн агент Гоо байна. Танд юугаар туслах вэ?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendLeadEmail = async (name: string, phone: string, email: string, message: string) => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message }),
      });
      return await response.json();
    } catch (error) {
      console.error("Email send error:", error);
      return { success: false };
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const newMessages: Message[] = [...messages, { role: "user", text: userMessage }];
    
    setInput("");
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/goo-bot-v2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { error: `Server error (${response.status})` };
        }
        throw new Error(errorData.error || "Сервер талд үл мэдэгдэх алдаа гарлаа.");
      }

      const data = await response.json();

      if (data.functionCall && data.functionCall.name === "sendLeadInformation") {
        const { name, phone, email, message } = data.functionCall.args;
        const emailResult = await sendLeadEmail(name, phone, email, message);
        
        const finalResponse = emailResult.success 
          ? "Баярлалаа! Таны мэдээллийг хүлээн авлаа. Манай баг тантай удахгүй холбогдох болно." 
          : "Таны хүсэлтийг тэмдэглэж авлаа. (Имэйл илгээхэд бага зэргийн саатал гарсан ч мэдээлэл хадгалагдсан)";
            
        setMessages(prev => [...prev, { role: "model", text: finalResponse }]);
      } else if (data.text) {
        setMessages(prev => [...prev, { role: "model", text: data.text }]);
      } else {
        throw new Error("Хариу ирсэнгүй.");
      }
    } catch (error: any) {
      console.error("GooChat Error:", error);
      setMessages(prev => [...prev, { role: "model", text: `Алдаа: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-8 z-[100]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <MessageCircle size={32} />
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className={`bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
              isMinimized ? "h-16 w-80" : "h-[550px] w-[400px]"
            } transition-all duration-300 border border-gray-100 mb-4`}
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-none">Гоо Агент</h3>
                  {!isMinimized && <p className="text-[10px] opacity-80 mt-1">Cornerstone AI</p>}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50"
                >
                  {messages.map((m, i) => (
                    <div 
                      key={i} 
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                          m.role === "user" 
                            ? "bg-blue-600 text-white rounded-tr-none" 
                            : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none"
                        }`}
                        dangerouslySetInnerHTML={{ __html: m.text.replace(/\n/g, '<br />') }}
                      />
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-400 p-3 rounded-2xl shadow-sm border border-gray-100 rounded-tl-none text-xs italic flex items-center gap-2">
                        <div className="flex gap-1">
                          <span className="w-1 h-1 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1 h-1 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1 h-1 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        Гоо бичиж байна...
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-100">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Асуултаа энд бичнэ үү..."
                      className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
