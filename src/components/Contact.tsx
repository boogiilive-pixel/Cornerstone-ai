import { motion, AnimatePresence } from "motion/react";
import { Send, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { useState, FormEvent } from "react";
import { useLanguage } from "../translations";

export default function Contact() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 8000);
      } else {
        alert(t('contact_error'));
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(t('contact_network_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold mb-8"
            >
              {t('contact_title')} <br />
              <span className="text-gradient-gold">{t('contact_title_accent')}</span>
            </motion.h2>
            <p className="text-white/60 text-lg mb-12 max-w-md">
              {t('contact_desc')}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-gold-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-white/50">{t('contact_phone')}</p>
                  <p className="font-bold">+976 9507-6599</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-gold-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-white/50">{t('contact_email')}</p>
                  <p className="font-bold">boogiilive@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-gold-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-white/50">{t('contact_address')}</p>
                  <p className="font-bold">Ulaanbaatar, Mongolia</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 rounded-[40px] glass border-white/5 relative min-h-[500px] flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-1">{t('contact_name')}</label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        placeholder={t('contact_name')}
                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-gold-500 outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-1">{t('contact_phone')}</label>
                      <input 
                        required
                        name="phone"
                        type="text" 
                        placeholder={t('contact_phone')}
                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-gold-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-1">{t('contact_email_label')}</label>
                    <input 
                      required
                      name="email"
                      type="email" 
                      placeholder={t('contact_email_label')}
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-gold-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-1">{t('contact_message')}</label>
                    <textarea 
                      required
                      name="message"
                      rows={4}
                      placeholder={t('contact_message_placeholder')}
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-gold-500 outline-none transition-colors resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-gold-500 text-navy-900 rounded-2xl font-bold flex items-center justify-center gap-3 glow-gold hover:bg-gold-400 transition-all group disabled:opacity-50"
                  >
                    {loading ? t('contact_sending') : t('contact_send')}
                    {!loading && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-gold-500" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold">{t('contact_success_title')}</h3>
                  <p className="text-white/60">{t('contact_success_desc')}</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-gold-500 font-bold text-sm underline underline-offset-4"
                  >
                    {t('contact_resend')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
