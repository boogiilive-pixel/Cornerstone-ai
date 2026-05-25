import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, Sparkles, Phone, Mail, User, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { useLanguage } from "../translations";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isLeadForm?: boolean;
}

export default function GeminiChatbot() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [leadStatus, setLeadStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages when opening or language changes
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: language === "mn"
            ? "Сайн уу! Би Сорнерстоун АЙ-ийн ухаалаг туслах байна. Танд манай компанийн үйлчилгээ, баг хамт олон, үнийн багц эсвэл хийсэн ажлуудын талаар мэдээлэл хэрэгтэй байна уу? Надаас юу ч хамаагүй асуугаарай! 😊"
            : "Hello! I am the Cornerstone AI Smart Assistant. Do you need information about our services, team, pricing, or portfolio? Feel free to ask me anything! 😊"
        }
      ]);
    }
  }, [language, messages.length]);

  // Adjust greeting language when user switches language choice mid-way
  useEffect(() => {
    setMessages(prev => 
      prev.map(m => {
        if (m.id === "welcome") {
          return {
            ...m,
            content: language === "mn"
              ? "Сайн уу! Би Сорнерстоун АЙ-ийн ухаалаг туслах байна. Танд манай компанийн үйлчилгээ, баг хамт олон, үнийн багц эсвэл хийсэн ажлуудын талаар мэдээлэл хэрэгтэй байна уу? Надаас юу ч хамаагүй асуугаарай! 😊"
              : "Hello! I am the Cornerstone AI Smart Assistant. Do you need information about our services, team, pricing, or portfolio? Feel free to ask me anything! 😊"
          };
        }
        return m;
      })
    );
  }, [language]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, leadStatus]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Failed to post message");
      }

      const data = await response.json();
      
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.text
        }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: language === "mn"
            ? "Уучлаарай, холболтын алдаа гарлаа. Та түр хүлээгээд дахин оролдоно уу эсвэл манай холбоо барих хуудсыг ашиглаарай."
            : "Sorry, a communication error occurred. Please try again in a moment or use our contact page."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestClick = (suggestion: { mn: string; en: string }) => {
    const text = language === "mn" ? suggestion.mn : suggestion.en;
    handleSendMessage(text);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email || !leadForm.message) return;

    setLeadStatus("submitting");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadForm)
      });

      if (response.ok) {
        setLeadStatus("success");
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: language === "mn"
              ? `Баярлалаа, ${leadForm.name}! Таны төслийн тухай мэдээлэл амжилттай илгээгдлээ. Манай багийнхан boogiilive@gmail.com хаягаар таны хүсэлтийг хүлээн авч, тун удахгүй эргэн холбогдох болно.`
              : `Thank you, ${leadForm.name}! Your project inquiry has been successfully sent. Our team has received it at boogiilive@gmail.com and will contact you very soon.`
          }
        ]);
        // Reset form
        setLeadForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setLeadStatus("error");
      }
    } catch (err) {
      console.error(err);
      setLeadStatus("error");
    }
  };

  const showLeadFormMessage = () => {
    setLeadStatus("idle");
    setMessages(prev => [
      ...prev,
      {
        id: "form-trigger-" + Date.now(),
        role: "assistant",
        content: language === "mn" 
          ? "Доорх төслийн анкетыг бөглөөд шууд илгээнэ үү. Бид холбогдож зөвлөгөө өгөх болно."
          : "Please fill out the project form below. We will reach out to schedule a consultation.",
        isLeadForm: true
      }
    ]);
  };

  const suggestions = [
    { mn: "Ямар үйлчилгээ санал болгодог вэ?", en: "What services do you offer?" },
    { mn: "Манайд тохирох үнийн багц?", en: "Which pricing plan is best?" },
    { mn: "Баг хамт олны тухай", en: "Tell me about your team" },
    { mn: "Төслийн хүсэлт илгээх 📝", en: "Send project request 📝" }
  ];

  // Manual basic formatting of markdown-like syntax
  const renderMessageContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      // Bold rendering
      let formattedLine = line;
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={match.index} className="text-gold-500 font-bold">
            {match[1]}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }
      
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const finalContent = parts.length > 0 ? parts : formattedLine;

      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        return (
          <li key={i} className="ml-4 list-disc text-white/95 my-1 leading-relaxed">
            {line.trim().substring(2)}
          </li>
        );
      }
      if (line.match(/^\d+\./)) {
        return (
          <div key={i} className="pl-4 text-white/95 my-1.5 leading-relaxed">
            {finalContent}
          </div>
        );
      }
      return (
        <p key={i} className="text-white/90 my-1 leading-relaxed min-h-[1.2em]">
          {finalContent}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          id="chatbot-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative h-14 w-14 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900 shadow-[0_8px_30px_rgb(212,175,55,0.3)] flex items-center justify-center cursor-pointer overflow-hidden border border-gold-400 group"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 stroke-[2.5]" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageSquare className="w-6 h-6 stroke-[2.5]" />
                {/* Status Dot */}
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-navy-900 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-gold-500"></span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat Window Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-24 right-6 w-[380px] sm:w-[420px] max-w-[calc(100vw-32px)] h-[580px] rounded-3xl z-50 overflow-hidden flex flex-col glass border border-gold-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-navy-950"
          >
            {/* Ambient overlay inside chat */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-transparent to-navy-950/40 pointer-events-none z-0" />

            {/* Header */}
            <div className="relative z-10 px-6 py-4 border-b border-white/5 bg-navy-900/60 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-white text-sm flex items-center gap-1.5">
                    Cornerstone AI <Sparkles className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-medium text-white/40 tracking-wider uppercase">
                      {language === "mn" ? "Идэвхтэй" : "Online"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 relative z-10">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-3">
                  <div
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-gold-500/10 border border-gold-500/30 text-white rounded-tr-none"
                          : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none font-sans"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        renderMessageContent(msg.content)
                      ) : (
                        <p className="my-0.5">{msg.content}</p>
                      )}
                    </div>
                  </div>

                  {/* Render Lead Form Inside Chat */}
                  {msg.isLeadForm && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-5 rounded-2xl border border-gold-500/20 bg-navy-900/80 space-y-4"
                    >
                      {leadStatus === "success" ? (
                        <div className="text-center py-4 space-y-2">
                          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                          <h4 className="font-bold text-white text-sm">
                            {language === "mn" ? "Амжилттай илгээгдлээ!" : "Sent Successfully!"}
                          </h4>
                        </div>
                      ) : (
                        <form onSubmit={handleLeadSubmit} className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-white/40 flex items-center gap-1.5">
                              <User className="w-3 h-3 text-gold-500" />
                              {language === "mn" ? "Таны Нэр" : "Your Name"} *
                            </label>
                            <input
                              type="text"
                              required
                              value={leadForm.name}
                              onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                              placeholder={language === "mn" ? "Боргил" : "Full Name"}
                              className="w-full bg-navy-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500/50"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase font-bold tracking-wider text-white/40 flex items-center gap-1.5">
                                <Mail className="w-3 h-3 text-gold-500" />
                                {language === "mn" ? "Имэйл" : "Email"} *
                              </label>
                              <input
                                type="email"
                                required
                                value={leadForm.email}
                                onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                                placeholder="name@email.com"
                                className="w-full bg-navy-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500/50"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase font-bold tracking-wider text-white/40 flex items-center gap-1.5">
                                <Phone className="w-3 h-3 text-gold-500" />
                                {language === "mn" ? "Утас" : "Phone"}
                              </label>
                              <input
                                type="tel"
                                value={leadForm.phone}
                                onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                                placeholder="9911****"
                                className="w-full bg-navy-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500/50"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-white/40">
                              {language === "mn" ? "Төслийн хэрэгцээ ба Мессеж" : "Project Requirements"} *
                            </label>
                            <textarea
                              required
                              value={leadForm.message}
                              onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                              placeholder={language === "mn" ? "Төслийн талаар мэдээлэл..." : "Describe your request..."}
                              className="w-full bg-navy-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white h-20 resize-none focus:outline-none focus:border-gold-500/50"
                            />
                          </div>

                          {leadStatus === "error" && (
                            <div className="text-rose-500 text-[10px] flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>{language === "mn" ? "Илгээхэд алдаа гарлаа. Дахин оролдоно уу." : "Fail to send. Try again."}</span>
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={leadStatus === "submitting"}
                            className="w-full py-2 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 font-bold text-navy-900 text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                          >
                            {leadStatus === "submitting" ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                <span>{language === "mn" ? "Илгээж байна..." : "Sending..."}</span>
                              </>
                            ) : (
                              <span>{language === "mn" ? "Мэдээлэл Илгээх" : "Send Inquiry"}</span>
                            )}
                          </button>
                        </form>
                      )}
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Typing wave */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gold-500/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-gold-500/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-gold-500/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions wrapper */}
            <div className="relative z-10 px-6 py-2 border-t border-white/5 bg-navy-900/20">
              <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto py-1 scrollbar-none">
                {suggestions.map((sug, id) => (
                  <button
                    key={id}
                    onClick={() => {
                      if (sug.en.includes("Send project")) {
                        showLeadFormMessage();
                      } else {
                        handleSuggestClick(sug);
                      }
                    }}
                    className="px-2.5 py-1 text-[10px] font-medium border border-white/10 rounded-full hover:border-gold-500/40 text-white/60 hover:text-gold-500 transition-colors bg-white/5 cursor-pointer whitespace-nowrap"
                  >
                    {language === "mn" ? sug.mn : sug.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Input fields */}
            <div className="relative z-10 px-5 pb-5 pt-2 bg-navy-950">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex items-center gap-2 border border-white/10 hover:border-white/20 focus-within:!border-gold-500/50 bg-navy-900/60 rounded-2xl px-3 py-1.5 transition-colors duration-200"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    language === "mn"
                      ? "Асуултаа энд бичнэ үү..."
                      : "Type your query here..."
                  }
                  className="flex-1 bg-transparent text-xs text-white placeholder-white/30 focus:outline-none min-w-0"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="p-1.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-900 disabled:opacity-40 disabled:hover:bg-gold-500 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
