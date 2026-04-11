import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'mn' | 'en';

interface Translations {
  [key: string]: {
    mn: string;
    en: string;
  };
}

export const translations: Translations = {
  // Navbar
  nav_services: { mn: "Үйлчилгээ", en: "Services" },
  nav_about: { mn: "Бидний тухай", en: "About Us" },
  nav_process: { mn: "Процесс", en: "Process" },
  nav_cases: { mn: "Ажил", en: "Portfolio" },
  nav_pricing: { mn: "Үнэ", en: "Pricing" },
  nav_cta: { mn: "Төслөө эхлүүлэх", en: "Start Project" },

  // Hero
  hero_title_1: { mn: "Оюун ухаанд тулгуурласан.", en: "Built on Intelligence." },
  hero_title_2: { mn: "Үр дүнд чиглэсэн.", en: "Driven by Results." },
  hero_desc: { mn: "Вэбсайт хөгжүүлэлт, Апп хөгжүүлэлт, Брэнд бүтээх болон Бизнес зөвлөгөө өгөх AI-д суурилсан технологийн компани. Бид таны бизнесийг дижитал ертөнцөд хамгийн бат бөх суурьтайгаар босгоно.", en: "AI-powered technology company providing Web Development, App Development, Branding, and Business Consulting. We build your business on the most solid foundation in the digital world." },
  hero_cta: { mn: "Үнэгүй зөвлөгөө авах", en: "Get Free Consultation" },
  hero_stats_clients: { mn: "Сэтгэл ханамжтай харилцагчид", en: "Happy Clients" },
  hero_stats_projects: { mn: "Амжилттай төслүүд", en: "Successful Projects" },

  // Services
  services_title: { mn: "Бид юу хийдэг вэ?", en: "What We Do" },
  services_desc: { mn: "Таны бизнесийг дараагийн шатанд гаргах цогц шийдлүүд.", en: "Comprehensive solutions to take your business to the next level." },
  service_web_title: { mn: "Вэб хөгжүүлэлт", en: "Web Development" },
  service_web_desc: { mn: "Хурдан, аюулгүй, хайлтын системд оновчтой вэбсайтууд.", en: "Fast, secure, and SEO-optimized websites." },
  service_app_title: { mn: "Апп хөгжүүлэлт", en: "App Development" },
  service_app_desc: { mn: "iOS болон Android үйлдлийн системд зориулсан орчин үеийн аппликейшн.", en: "Modern applications for iOS and Android systems." },
  service_ai_title: { mn: "AI Автоматжуулалт", en: "AI Automation" },
  service_ai_desc: { mn: "Бизнесийн процессыг AI ашиглан автоматжуулж, зардлыг бууруулах.", en: "Automate business processes using AI to reduce costs." },

  // Process
  process_title: { mn: "Ажлын процесс", en: "Our Process" },
  process_step_1: { mn: "Зөвлөгөө", en: "Consultation" },
  process_step_2: { mn: "Төлөвлөлт", en: "Planning" },
  process_step_3: { mn: "Хөгжүүлэлт", en: "Development" },
  process_step_4: { mn: "Нээлт", en: "Launch" },

  // Case Studies
  cases_title: { mn: "Хийгдсэн", en: "Our" },
  cases_title_accent: { mn: "ажлууд", en: "Works" },
  cases_desc: { mn: "Бидний хэрэгжүүлсэн төслүүд болон тэдгээрийн бодит үр дүнгүүд.", en: "Our implemented projects and their real results." },
  cases_more: { mn: "Цааш үзэх", en: "Show More" },
  cases_less: { mn: "Хумих", en: "Show Less" },
  cases_view_live: { mn: "Шууд үзэх", en: "View Live" },

  // Pricing
  pricing_title: { mn: "Үнийн", en: "Pricing" },
  pricing_title_accent: { mn: "Багцууд", en: "Plans" },
  pricing_desc: { mn: "Таны бизнесийн хэрэгцээнд нийцсэн уян хатан үнийн саналууд.", en: "Flexible pricing offers tailored to your business needs." },
  pricing_popular: { mn: "Хамгийн эрэлттэй", en: "Most Popular" },
  pricing_cta: { mn: "Сонгох", en: "Choose Plan" },

  // Contact
  contact_title: { mn: "Бат бөх зүйл", en: "Let's Build" },
  contact_title_accent: { mn: "хамтдаа байгуулцгаая", en: "Something Solid Together" },
  contact_desc: { mn: "Таны төслийн талаар ярилцахад бид бэлэн байна. Доорх формыг бөглөж эсвэл шууд холбогдоорой.", en: "We are ready to discuss your project. Fill out the form below or contact us directly." },
  contact_name: { mn: "Нэр", en: "Name" },
  contact_phone: { mn: "Утас", en: "Phone" },
  contact_email: { mn: "И-мэйл", en: "Email" },
  contact_email_label: { mn: "И-мэйл хаяг", en: "Email Address" },
  contact_address: { mn: "Хаяг", en: "Address" },
  contact_message: { mn: "Мессеж", en: "Message" },
  contact_message_placeholder: { mn: "Төслийн талаарх товч мэдээлэл", en: "Brief information about the project" },
  contact_send: { mn: "Илгээх", en: "Send" },
  contact_sending: { mn: "Илгээж байна...", en: "Sending..." },
  contact_success_title: { mn: "Амжилттай илгээгдлээ!", en: "Successfully Sent!" },
  contact_success_desc: { mn: "Бид тантай тун удахгүй холбогдох болно.", en: "We will contact you very soon." },
  contact_resend: { mn: "Дахин илгээх", en: "Send Again" },
  contact_error: { mn: "Илгээхэд алдаа гарлаа. Дахин оролдоно уу.", en: "Error sending. Please try again." },
  contact_network_error: { mn: "Сүлжээний алдаа гарлаа.", en: "Network error occurred." },

  // Footer
  footer_links: { mn: "Цэс", en: "Menu" },
  footer_contact: { mn: "Холбоо барих", en: "Contact" },
  footer_rights: { mn: "Бүх эрх хуулиар хамгаалагдсан.", en: "All rights reserved." },
  footer_scroll_top: { mn: "Дээшээ буцах", en: "Back to Top" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('mn');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
