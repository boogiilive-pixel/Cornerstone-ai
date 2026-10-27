import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Mic,
  Volume2,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Shield,
  Clock,
  Flame,
  Award,
  Zap,
  Briefcase,
  Mail,
  Users,
  TrendingUp,
  RotateCcw,
  Check,
  Globe,
  ArrowLeft,
  Smartphone,
  Star
} from "lucide-react";

interface PracticeScenario {
  id: string;
  category: { en: string; mn: string };
  title: { en: string; mn: string };
  situation: { en: string; mn: string };
  targetPhrase: string;
  phoneticTip: { en: string; mn: string };
  executiveFeedback: { en: string; mn: string };
  alternatives: string[];
}

const practiceScenarios: PracticeScenario[] = [
  {
    id: "negotiation",
    category: { en: "Negotiation", mn: "Хэлэлцээр" },
    title: { en: "Handling Supplier Price Pushback", mn: "Нийлүүлэгчийн үнийн өсөлтөд хариу өгөх" },
    situation: {
      en: "Your supplier just announced an 8% price increase for next quarter's raw materials.",
      mn: "Танай нийлүүлэгч ирэх улирлын түүхий эдийн үнийг 8%-иар өсгөх мэдэгдэл ирүүлсэн үед."
    },
    targetPhrase: "We value our long-term partnership; however, given our committed volume, we propose capping the adjustment at 3%.",
    phoneticTip: {
      en: "Stress 'value' and 'partnership' with warm firmness, then deliver '3%' clearly.",
      mn: "'Value' болон 'partnership' үгсийг нөхөрсөг боловч тууштай дуудаж, дараа нь '3%' саналыг тодорхой хэлээрэй."
    },
    executiveFeedback: {
      en: "Excellent balance of relationship-building and firm commercial discipline. Tone is polite yet unyielding.",
      mn: "Харилцаагаа хадгалах болон бизнесийн ашгаа хамгаалах төгс тэнцвэр. Эелдэг боловч зарчимч өнгө аястай."
    },
    alternatives: [
      "Could we explore a tiered rebate structure tied to our annual procurement volume?",
      "Let's look at extending contract length in exchange for maintaining baseline pricing."
    ]
  },
  {
    id: "pitch",
    category: { en: "Pitch & QA", mn: "Питч & Хөрөнгө оруулагчид" },
    title: { en: "Answering an Investor's Margin Question", mn: "Хөрөнгө оруулагчийн маржингийн асуултад хариулах" },
    situation: {
      en: "A venture investor asks why your gross margins dipped slightly last quarter.",
      mn: "Хөрөнгө оруулагч өнгөрсөн улиралд нийт ашгийн маржин яагаад үл ялиг буурсныг асуух үед."
    },
    targetPhrase: "The margin variation was a strategic decision to front-load logistics capacity, which expands our net margin to 68% next quarter.",
    phoneticTip: {
      en: "Keep a steady cadence. Pause after 'strategic decision' to signal deliberate control.",
      mn: "Жигд хурдаар хэл. 'Strategic decision' гэсний дараа богино зогсолт хийж нөхцөл байдлыг бүрэн удирдаж буйгаа мэдрүүл."
    },
    executiveFeedback: {
      en: "Demonstrates proactive executive governance. Reframes a temporary expense into a competitive moat.",
      mn: "Удирдлагын өндөр ур чадварыг харууллаа. Түр зуурын зардлыг өрсөлдөх давуу тал болгон тайлбарлав."
    },
    alternatives: [
      "Our unit economics remain exceptionally healthy with a 4.2x LTV-to-CAC ratio.",
      "We absorbed one-off setup costs that will yield a 30% reduction in fulfillment expense."
    ]
  },
  {
    id: "email",
    category: { en: "Email", mn: "Имэйл харилцаа" },
    title: { en: "Firm Milestone Follow-Up", mn: "Хугацаа сануулах албан имэйл" },
    situation: {
      en: "A client partner has not provided feedback on a critical deliverable due tomorrow.",
      mn: "Маргааш дуусах чухал ажлын хэсэг дээр түнш тань хариу өгөөгүй удсан үед."
    },
    targetPhrase: "To ensure we remain on schedule for Friday's launch, please confirm approval on the revised scope by 3 PM EST today.",
    phoneticTip: {
      en: "Crisp and courteous. Setting an exact hour eliminates ambiguity.",
      mn: "Товч бөгөөд эелдэг. Тодорхой цаг зааж өгснөөр үл ойлголцлыг арилгана."
    },
    executiveFeedback: {
      en: "Action-oriented and respectful. Anchors the urgency to their success (Friday's launch).",
      mn: "Үр дүнд чиглэсэн хүндэтгэлтэй бичвэр. Яаралтай байдлыг тэдний төслийн амжилттай холбосон."
    },
    alternatives: [
      "I want to make sure your team doesn't experience any rollout delay—could you review section 3?",
      "Following up on our sprint timeline: we are standing by to deploy as soon as you sign off."
    ]
  },
  {
    id: "meeting",
    category: { en: "Meeting", mn: "Уулзалт & Дуудлага" },
    title: { en: "Aligning Key Decisions", mn: "Уулзалтын шийдвэрийг нэгтгэн дүгнэх" },
    situation: {
      en: "Wrapping up a 45-minute cross-border call with multi-national team leads.",
      mn: "Олон улсын багийн ахлагч нартай хийсэн 45 минутын цахим уулзалтыг нэгтгэн дүгнэх үед."
    },
    targetPhrase: "To summarize our agreed next steps: Marcus leads supplier outreach, while our team finalizes the technical audit by Thursday.",
    phoneticTip: {
      en: "Maintain high vocal energy through names and responsibilities to solidify ownership.",
      mn: "Нэрс болон үүрэг даалгаврыг тодорхой өндөр дуугаар хэлж хариуцлагыг бэхжүүл."
    },
    executiveFeedback: {
      en: "Textbook executive wrap-up. Clear ownership, deadlines, and no room for misunderstandings.",
      mn: "Удирдах ажилтны төгс дүгнэлт. Хариуцагч, дуусах хугацаа тодорхой тул эргэлзээ гарахгүй."
    },
    alternatives: [
      "Before we adjourn, let's verify that everyone has what they need to hit this week's milestones.",
      "I'll circulate a brief 3-bullet recap immediately following this session."
    ]
  }
];

const faqs = [
  {
    q: {
      en: "What makes Bizora different from general language apps like Duolingo?",
      mn: "Bizora ердийн хэлний аппликейшнуудаас (Duolingo гэх мэт) юугаараа ялгаатай вэ?"
    },
    a: {
      en: "General apps teach casual conversation, tourist vocabulary, and gamified trivia. Bizora is built exclusively for founders, business owners, and corporate executives. Every lesson is anchored in high-stakes commercial moments—contract negotiations, investor pitches, board updates, and cross-border emails.",
      mn: "Ердийн аппууд өдөр тутмын яриа, аяллын үгс заадаг. Харин Bizora нь бизнес эрхлэгчид, үүсгэн байгуулагчид болон удирдах ажилтнуудад зориулагдсан. Бүх хичээл нь ханган нийлүүлэгчтэй үнэ тохиролцох, хөрөнгө оруулагчдад төслөө танилцуулах, уулзалт удирдах зэрэг бодит бизнесийн нөхцөл байдалд суурилдаг."
    }
  },
  {
    q: {
      en: "How does the 10-minute micro-lesson structure work?",
      mn: "10 минутын богино хичээл ямар бүтэцтэй явагддаг вэ?"
    },
    a: {
      en: "We know your schedule is packed. Each session introduces one real business situation, delivers 3–4 executive-grade power phrases, guides you to speak them out loud, and provides instant AI speech feedback. You finish in 10 focused minutes with actionable phrases you can immediately use in your next meeting.",
      mn: "Бизнес эрхлэгчдийн цаг хомс байдгийг бид мэднэ. Хичээл бүр бодит 1 бизнесийн нөхцөл байдлыг авч, 3-4 түлхүүр илэрхийллийг заан, чангаар дуудан дасгал хийлгэж, AI дасгалжуулагчаас шууд үнэлгээ өгдөг. Та ердөө 10 минутад дараагийн уулзалтдаа шууд ашиглах үг хэллэгтэй болно."
    }
  },
  {
    q: {
      en: "How does the AI Coach evaluate my speaking?",
      mn: "AI дасгалжуулагч яриаг хэрхэн үнэлж, зөвлөгөө өгдөг вэ?"
    },
    a: {
      en: "The Bizora AI Coach listens to your spoken delivery and analyzes your pronunciation, pacing, authority, and diplomatic tone. Instead of simple 'correct/incorrect' scoring, you receive nuanced feedback: whether your phrasing sounds too passive, overly aggressive, or impeccably executive.",
      mn: "Bizora AI Coach таны дуудлага, ярианы хурд, өөртөө итгэлтэй байдал, дипломат найрсаг өнгө аясыг шинжилдэг. Зүгээр л зөв/буруу гэж дүгнэхийн оронд хэт сул дорой, эсвэл хэт түрэмгий сонсогдож байгаа эсэхийг оношилж, яг юуг засахыг зөвлөдөг."
    }
  },
  {
    q: {
      en: "Who is Bizora designed for?",
      mn: "Bizora хэнд зориулагдсан бэ?"
    },
    a: {
      en: "Business owners, founders and managers who already work with international partners — or want to. If you understand basic English but freeze during high-stakes commercial moments, Bizora gives you executive reflexes.",
      mn: "Олон улсын түншүүдтэй хамтран ажиллаж буй эсвэл дэлхийн зах зээлд гарахыг зорьж буй бизнес эрхлэгчид, стартап үүсгэн байгуулагчид, удирдах ажилтнуудад зориулагдсан."
    }
  },
  {
    q: {
      en: "Is Bizora free to download?",
      mn: "Bizora-г татаж авах үнэгүй юу?"
    },
    a: {
      en: "Yes. Bizora is free to download on the Apple App Store. You can start with daily micro-lessons and experience the AI speech coach right away.",
      mn: "Тийм ээ. Bizora нь Apple App Store дээрээс татаж авахад 100% үнэгүй. Та суурь хичээлүүд болон AI ярианы дасгалжуулагчийг шууд туршиж эхлэх боломжтой."
    }
  },
  {
    q: {
      en: "What does Bizora Premium include, and how does subscription billing work?",
      mn: "Bizora Premium эрхэнд юу багтдаг вэ, төлбөр хэрхэн бодогддог вэ?"
    },
    a: {
      en: "Bizora Premium unlocks unlimited lessons, unlimited AI coach conversations, and all business toolkits. Payment is charged to your Apple ID account at confirmation of purchase. Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period. Manage or cancel anytime in your App Store account settings.",
      mn: "Bizora Premium нь хязгааргүй хичээл, хязгааргүй AI дасгалжуулагчтай харилцах боломж болон бүх бизнесийн хэрэгслүүдийг нээнэ. Худалдан авалт баталгаажсаны дараа төлбөр таны Apple ID данснаас шууд суутгагдана. Одоогийн хугацаа дуусахаас 24 цагийн өмнө цуцлаагүй тохиолдолд автоматаар сунгагдана. App Store-ийн тохиргооноос хүссэн үедээ удирдаж, цуцлах боломжтой."
    }
  },
  {
    q: {
      en: "How can I contact the Bizora team or get support?",
      mn: "Bizora багтай хэрхэн холбогдож асуулт тавих вэ?"
    },
    a: {
      en: "You can reach our founders and engineering team directly at boogii@cornerstoneai.dev. We reply within 24 hours.",
      mn: "Та манай баг хамт олонтой шууд boogii@cornerstoneai.dev имэйл хаягаар холбогдож асуулт асуух, санал хүсэлт илгээх боломжтой. Бид 24 цагийн дотор хариу өгөх болно."
    }
  }
];

export default function Bizora() {
  const [lang, setLang] = useState<"en" | "mn">("en");
  const [selectedScenario, setSelectedScenario] = useState<PracticeScenario>(practiceScenarios[0]);
  const [isSimulatingSpeech, setIsSimulatingSpeech] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [speechProgress, setSpeechProgress] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Text-to-Speech audio reader using browser SpeechSynthesis
  const handleSpeakPhrase = (textToSpeak: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "en-US";
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSimulatePractice = () => {
    if (isSimulatingSpeech) return;
    setIsSimulatingSpeech(true);
    setHasRecorded(false);
    setSpeechProgress(0);

    const interval = setInterval(() => {
      setSpeechProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulatingSpeech(false);
          setHasRecorded(true);
          return 100;
        }
        return prev + 12;
      });
    }, 180);
  };

  const handleResetPractice = () => {
    setHasRecorded(false);
    setSpeechProgress(0);
    setIsSimulatingSpeech(false);
  };

  return (
    <div className="min-h-screen bg-[#060D1E] text-slate-100 selection:bg-cyan-500 selection:text-navy-950 font-sans antialiased">
      {/* Background Tech Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-cyan-500/15 via-blue-600/10 to-transparent blur-3xl opacity-80" />
        <div className="absolute top-[45%] right-[-15%] w-[650px] h-[650px] bg-gradient-to-l from-blue-700/15 via-cyan-500/10 to-transparent blur-3xl opacity-60" />
        <div className="absolute bottom-10 left-[-10%] w-[500px] h-[500px] bg-gradient-to-r from-blue-600/15 to-transparent blur-3xl opacity-50" />
      </div>

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#060D1E]/85 border-b border-cyan-500/15 shadow-lg shadow-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Wordmark & Official Logo */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors pr-2 border-r border-slate-700/60"
              title="Back to Cornerstone AI"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Cornerstone AI</span>
            </Link>

            <Link to="/bizora" className="flex items-center gap-3 group">
              <img
                src="/assets/aistudio/logo_efb7f705.png"
                alt="Bizora"
                className="h-7 sm:h-8 object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-950 px-2 py-0.5 rounded-full font-mono">
                iOS
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wide uppercase text-slate-300">
            <a href="#what-you-can-do" className="hover:text-cyan-400 transition-colors">
              {lang === "en" ? "Capabilities" : "Боломжууд"}
            </a>
            <a href="#interactive-coach" className="hover:text-cyan-400 transition-colors">
              {lang === "en" ? "AI Coach Demo" : "AI Демо"}
            </a>
            <a href="#who-its-for" className="hover:text-cyan-400 transition-colors">
              {lang === "en" ? "Who It's For" : "Хэнд зориулсан"}
            </a>
            <a href="#subscription" className="hover:text-cyan-400 transition-colors">
              {lang === "en" ? "Subscription" : "Багц & Үнэ"}
            </a>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Controls: Language Toggle & CTA */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center rounded-xl bg-slate-900/90 border border-slate-700/70 p-1">
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  lang === "en"
                    ? "bg-cyan-500 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("mn")}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  lang === "mn"
                    ? "bg-cyan-500 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                MN
              </button>
            </div>

            {/* Apple App Store CTA */}
            <a
              href="#subscription"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 shadow-md shadow-cyan-500/25 transition-all duration-200 active:scale-95 whitespace-nowrap"
            >
              <AppleIcon className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">App Store</span>
              <span className="sm:hidden">Get</span>
            </a>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10">

        {/* HERO SECTION */}
        <section className="pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Value Proposition */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Quiet Kicker Metadata */}
                <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Bizora Business English App</span>
                  <span className="text-slate-500">·</span>
                  <span>10-Minute Micro-Lessons</span>
                </div>

                {/* Hero Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                  {lang === "en" ? (
                    <>
                      Speak English with{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400">
                        Confidence
                      </span>{" "}
                      in the Moments That Matter.
                    </>
                  ) : (
                    <>
                      Бизнесийн харилцаанд{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400">
                        Итгэл Төгс
                      </span>{" "}
                      ярих 10 минутын хичээлүүд.
                    </>
                  )}
                </h1>

                {/* Subtitle / Core Description */}
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                  {lang === "en"
                    ? "Bizora helps business owners and founders speak English with confidence in the moments that matter: negotiating with suppliers, writing to clients, leading meetings and pitching to investors."
                    : "Bizora нь бизнес эрхлэгчид, үүсгэн байгуулагчид, удирдах ажилтнуудад ханган нийлүүлэгчтэй үнэ тохиролцох, хэрэглэгчидтэй албан имэйлээр харилцах, хурал уулзалт даргалах болон хөрөнгө оруулагчдад төслөө танилцуулахад итгэлтэй ярих ур чадварыг суулгана."}
                </p>

                {/* 3 Core Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-2 text-cyan-400 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-200">10 Min / Day</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {lang === "en" ? "Every lesson is built around a real business situation." : "Бодит бизнесийн нөхцөл байдалд суурилсан богино хичээл."}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-2 text-cyan-400 mb-1">
                      <Mic className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Out Loud</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {lang === "en" ? "Learn the phrases and practice them out loud." : "Илэрхийллүүдийг сурч, чангаар дуудан зуршил болгоно."}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-2 text-cyan-400 mb-1">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-200">AI Coach</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {lang === "en" ? "Get instant feedback from an AI coach on what to say better." : "Юуг илүү сайн хэлэх талаар AI дасгалжуулагчаас шууд зөвлөгөө авна."}
                    </p>
                  </div>
                </div>

                {/* Call To Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="#subscription"
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 shadow-xl shadow-cyan-500/25 transition-all duration-200 active:scale-95"
                  >
                    <AppleIcon className="w-5 h-5 fill-current" />
                    <div className="text-left">
                      <div className="text-[10px] uppercase font-semibold leading-none text-slate-900/80">
                        {lang === "en" ? "Free to Download on" : "Үнэгүй татах"}
                      </div>
                      <div className="text-sm font-extrabold leading-none mt-1">Apple App Store</div>
                    </div>
                  </a>

                  <a
                    href="#interactive-coach"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 transition-all duration-200"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>{lang === "en" ? "Try AI Coach Simulator" : "AI Дасгалжуулагчийг турших"}</span>
                  </a>
                </div>

                {/* Trust Note */}
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    {lang === "en"
                      ? "Free to download · iOS 16.0+ · Developed by Cornerstone AI"
                      : "Үнэгүй татах · iOS 16.0+ дэмжинэ · Cornerstone AI бүтээв"}
                  </span>
                </div>
              </div>

              {/* Right Column: High-Res Official Mockup Asset */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
                  
                  {/* Cyan Ambient Glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-blue-600/30 blur-3xl rounded-full -z-10" />

                  {/* iPhone Hardware Outer Rim */}
                  <div className="relative rounded-[48px] p-3 bg-gradient-to-b from-slate-700 via-slate-850 to-slate-900 shadow-2xl shadow-cyan-950/60 border border-slate-700/80">
                    
                    {/* Screen Container */}
                    <div className="relative rounded-[38px] overflow-hidden bg-slate-950 border border-slate-800 flex flex-col min-h-[580px] max-h-[640px]">
                      
                      {/* Dynamic Island */}
                      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30">
                        <div className="w-24 h-5 bg-black rounded-full flex items-center justify-between px-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                          <div className="w-2 h-2 rounded-full bg-cyan-400/80 animate-pulse" />
                        </div>
                      </div>

                      {/* Official High-Resolution Graphic Display */}
                      <div className="relative flex-1 overflow-hidden">
                        <img
                          src="/assets/aistudio/bb39d0e6-2614-4ebd-8c77-d3576a13b31c_86466364.png"
                          alt="Bizora - English For A Bigger Tomorrow"
                          className="w-full h-full object-cover object-center"
                        />

                        {/* Interactive Overlay Card */}
                        <div className="absolute bottom-4 left-3 right-3 p-4 rounded-2xl backdrop-blur-xl bg-slate-950/80 border border-cyan-500/30 shadow-2xl space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <img
                                src="/assets/aistudio/Glossy_Bi_Tech_App_Icon_10c3021a.png"
                                alt="Bizora Icon"
                                className="w-7 h-7 rounded-lg shadow-sm"
                              />
                              <div>
                                <span className="text-xs font-bold text-white block">Bizora Coach</span>
                                <span className="text-[10px] text-cyan-300 block">Lesson 04 · Negotiation</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                              <Flame className="w-3 h-3 text-cyan-400" />
                              <span>7 Day Streak</span>
                            </div>
                          </div>

                          <p className="text-[11px] text-slate-200 leading-snug">
                            "We value our partnership; however, given our volume, we propose capping the adjustment at 3%."
                          </p>

                          <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[10px]">
                            <span className="text-slate-400">Executive Score:</span>
                            <span className="text-cyan-400 font-bold">96% Confident & Firm</span>
                          </div>
                        </div>
                      </div>

                      {/* iOS Bottom Navigation Bar Line */}
                      <div className="py-1.5 bg-slate-950 flex justify-center">
                        <div className="w-32 h-1 bg-slate-700 rounded-full" />
                      </div>

                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION: WHAT YOU CAN DO (6 Core Pillars) */}
        <section id="what-you-can-do" className="py-20 border-b border-slate-800/80 bg-slate-950/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-2">
                WHAT YOU CAN DO
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                {lang === "en"
                  ? "Every Tool Built for High-Stakes Moments."
                  : "Шийдвэрлэх мөчид тань туслах 6 үндсэн боломж."}
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                {lang === "en"
                  ? "Six practical capabilities designed to build intuitive executive reflexes in real commercial settings."
                  : "Бизнесийн бодит нөхцөлд шууд ашиглах зорилготой 6 цогц чиглэл."}
              </p>
            </div>

            {/* 6 Capabilities Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* 1. Negotiation */}
              <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {lang === "en" ? "Negotiation Practice" : "Хэлэлцээрийн дадлага"}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {lang === "en"
                      ? "Handle price talks, terms and pushback politely but firmly without backing down."
                      : "Үнийн санал, төлбөрийн нөхцөл, түншийн шахалтыг эелдэг боловч зарчимч хатуу байр суурьтай зохицуулах."}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800 text-xs text-cyan-400 font-medium">
                  {lang === "en" ? "Price talks · Payment terms · Pushback" : "Үнийн санал · Төлбөрийн нөхцөл · Хариу өгөх"}
                </div>
              </div>

              {/* 2. Professional Email */}
              <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {lang === "en" ? "Professional Email" : "Мэргэжлийн имэйл"}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {lang === "en"
                      ? "Write clear openings, follow-ups and closings that command immediate attention and action."
                      : "Харилцагчийн анхаарлыг татах тодорхой эхлэл, хугацаа сануулах болон үр дүнтэй төгсгөлийн имэйл бичих."}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800 text-xs text-cyan-400 font-medium">
                  {lang === "en" ? "Openings · Follow-ups · Clear closings" : "Имэйлийн эхлэл · Сануулах захидал · Төгсгөл"}
                </div>
              </div>

              {/* 3. Meetings */}
              <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {lang === "en" ? "Meetings & Calls" : "Хурал & Уулзалт даргалах"}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {lang === "en"
                      ? "Run calls, give updates and summarize decisions with confidence across timezones."
                      : "Олон улсын онлайн уулзалтыг удирдах, ажлын явц танилцуулах, шийдвэрүүдийг товч бөгөөд тодорхой нэгтгэн дүгнэх."}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800 text-xs text-cyan-400 font-medium">
                  {lang === "en" ? "Running calls · Status updates · Summarizing" : "Уулзалт удирдах · Явц танилцуулах · Дүгнэх"}
                </div>
              </div>

              {/* 4. Pitch practice */}
              <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {lang === "en" ? "Pitch Practice" : "Питч & Төсөл танилцуулах"}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {lang === "en"
                      ? "Present your business and answer tough questions from investors, partners and lenders."
                      : "Бизнесийнхээ үнэ цэн, бүтээгдэхүүнийг танилцуулж, хөрөнгө оруулагчдын хүнд хэцүү асуултуудад эргэлзээгүй хариулах."}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800 text-xs text-cyan-400 font-medium">
                  {lang === "en" ? "Investor Q&A · Value proposition · Confidence" : "Хөрөнгө оруулагчийн Асуулт Хариулт · Үнэ цэн"}
                </div>
              </div>

              {/* 5. Business ideas in English */}
              <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {lang === "en" ? "Business Ideas in English" : "Англи хэлээр бизнес сэтгэлгээ"}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {lang === "en"
                      ? "Learn concepts like cash flow, pricing and sales while you learn the language."
                      : "Мөнгөн урсгал (cash flow), үнийн бодлого (pricing), борлуулалт (sales) зэрэг үндсэн ойлголтуудыг хэлтэйгээ хамт зэрэг суралцах."}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800 text-xs text-cyan-400 font-medium">
                  {lang === "en" ? "Cash flow · Pricing strategy · Sales funnels" : "Мөнгөн урсгал · Үнийн стратеги · Борлуулалт"}
                </div>
              </div>

              {/* 6. Daily streak and goals */}
              <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Flame className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {lang === "en" ? "Daily Streak and Goals" : "Өдөр тутмын зуршил & Зорилго"}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {lang === "en"
                      ? "Build a habit that sticks. Consistent 10-minute daily practice builds durable executive reflexes."
                      : "Хэзээ ч мартагдахгүй зуршил бүтээх. Өдөрт ердөө 10 минут зарцуулснаар таны ярианы чадвар байнгын бэлэн байдалд байна."}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800 text-xs text-cyan-400 font-medium">
                  {lang === "en" ? "Habit loop · 10 min routine · Long-term reflexes" : "Өдөр тутмын зуршил · 10 минут · Бүрэн бэлтгэл"}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION: INTERACTIVE AI COACH SIMULATOR */}
        <section id="interactive-coach" className="py-20 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-2">
                {lang === "en" ? "Interactive Speech Coach" : "Интерактив AI Дасгалжуулагч"}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                {lang === "en" ? "Test Bizora's Feedback Right Now." : "AI Дасгалжуулагчийг шууд туршиж үзээрэй."}
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base">
                {lang === "en"
                  ? "Select a scenario, click the audio to hear native executive pronunciation, and simulate speaking out loud."
                  : "Сэдвээ сонгож, дуудлагыг сонсон, чангаар дуудан AI-ийн зөвлөгөөг шууд аваарай."}
              </p>
            </div>

            {/* Scenario Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {practiceScenarios.map((scenario) => {
                const isActive = selectedScenario.id === scenario.id;
                return (
                  <button
                    key={scenario.id}
                    onClick={() => {
                      setSelectedScenario(scenario);
                      handleResetPractice();
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25"
                        : "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700"
                    }`}
                  >
                    {scenario.category[lang]}: {scenario.title[lang]}
                  </button>
                );
              })}
            </div>

            {/* Interactive Lesson Card */}
            <div className="max-w-4xl mx-auto bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 relative">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Left: Situation & Target Phrase */}
                <div className="md:col-span-7 space-y-5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-cyan-400 uppercase tracking-wider">
                      {selectedScenario.category[lang]}
                    </span>
                    <span>10 Min Micro-Lesson</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {selectedScenario.title[lang]}
                    </h3>
                    <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <strong className="text-cyan-300 block mb-1">
                        {lang === "en" ? "Business Situation:" : "Бизнесийн нөхцөл байдал:"}
                      </strong>
                      {selectedScenario.situation[lang]}
                    </div>
                  </div>

                  {/* The Target Phrase */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                        {lang === "en" ? "Target Phrase To Speak Out Loud" : "Чангаар хэлэх дасгал үг"}
                      </span>
                      <button
                        onClick={() => handleSpeakPhrase(selectedScenario.targetPhrase)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isPlayingAudio
                            ? "bg-cyan-500 text-slate-950 animate-pulse"
                            : "bg-slate-800 text-cyan-400 hover:bg-slate-700"
                        }`}
                        title="Listen to native executive pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-base sm:text-lg font-medium text-white italic leading-snug">
                      "{selectedScenario.targetPhrase}"
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      💡 <strong>{lang === "en" ? "Executive Cadence Tip:" : "Дуудлага & Өнгө аяс:"}</strong>{" "}
                      {selectedScenario.phoneticTip[lang]}
                    </p>
                  </div>

                  {/* Alternative variations */}
                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-semibold text-slate-400">
                      {lang === "en" ? "Alternative Executive Variations:" : "Бусад хувилбарууд:"}
                    </div>
                    {selectedScenario.alternatives.map((alt, idx) => (
                      <div
                        key={idx}
                        className="flex items-start justify-between gap-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800"
                      >
                        <div className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                          <span>"{alt}"</span>
                        </div>
                        <button
                          onClick={() => handleSpeakPhrase(alt)}
                          className="text-slate-400 hover:text-cyan-400 shrink-0"
                          title="Listen"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: AI Coach Simulator Box */}
                <div className="md:col-span-5 bg-slate-900 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-5">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold text-white">Bizora AI Coach</span>
                      </div>
                      <span className="text-[10px] text-cyan-400 font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                        {lang === "en" ? "Interactive" : "Бэлэн"}
                      </span>
                    </div>

                    <div className="py-6 text-center">
                      {!isSimulatingSpeech && !hasRecorded && (
                        <div className="space-y-3">
                          <button
                            onClick={handleSimulatePractice}
                            className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all"
                          >
                            <Mic className="w-7 h-7" />
                          </button>
                          <p className="text-xs font-bold text-slate-200">
                            {lang === "en" ? "Tap to Practice Out Loud" : "Дарж чангаар дуудан турших"}
                          </p>
                          <p className="text-[11px] text-slate-400 max-w-[220px] mx-auto">
                            {lang === "en"
                              ? "Bizora listens and evaluates business firmness, pacing and diplomatic authority."
                              : "Bizora таны дуудлага, ярианы хурд, эелдэг тууштай байдлыг шууд шинжилнэ."}
                          </p>
                        </div>
                      )}

                      {isSimulatingSpeech && (
                        <div className="space-y-4">
                          <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-400 flex items-center justify-center mx-auto animate-pulse">
                            <Mic className="w-7 h-7 animate-bounce" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">
                              {lang === "en" ? "Listening to your delivery..." : "Таны дуудлагыг сонсож байна..."}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {lang === "en" ? "Analyzing executive cadence & tone" : "Өнгө аяс, ярианы хурдыг шинжилж байна"}
                            </p>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
                            <div
                              className="bg-cyan-400 h-full transition-all duration-150"
                              style={{ width: `${speechProgress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {hasRecorded && (
                        <div className="space-y-4 text-left">
                          <div className="flex items-center justify-between bg-cyan-500/10 border border-cyan-500/20 p-3 rounded-xl">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                              <span className="text-xs font-bold text-cyan-300">
                                {lang === "en" ? "Executive Tone Confirmed" : "Удирдах ажилтны түвшин"}
                              </span>
                            </div>
                            <span className="text-xs font-black text-cyan-400">97/100</span>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                              <span className="text-cyan-400 font-bold block mb-1">
                                {lang === "en" ? "Coach Feedback:" : "AI Зөвлөгөө:"}
                              </span>
                              <p className="text-slate-300 leading-relaxed">
                                {selectedScenario.executiveFeedback[lang]}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[11px]">
                              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                                <span className="text-slate-400 block">{lang === "en" ? "Cadence" : "Хурд"}</span>
                                <span className="text-cyan-400 font-semibold">135 WPM (Optimal)</span>
                              </div>
                              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                                <span className="text-slate-400 block">{lang === "en" ? "Conviction" : "Итгэл төгс"}</span>
                                <span className="text-teal-300 font-semibold">High Authority</span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={handleResetPractice}
                            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>{lang === "en" ? "Practice Again" : "Дахин дадлага хийх"}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 text-center border-t border-slate-800 pt-3">
                    {lang === "en"
                      ? "In the iOS app, speech evaluation runs live via on-device real-time neural models."
                      : "iOS апп дээр дуу хоолой шинжилгээ нь бодит цагийн өндөр нарийвчлалтай AI моделиор ажилладаг."}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* SECTION: WHO IT'S FOR */}
        <section id="who-its-for" className="py-20 border-b border-slate-800/80 bg-slate-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  WHO IT'S FOR
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                  {lang === "en" ? "Built for Decision Makers." : "Хэнд зориулагдсан бэ?"}
                </h2>
                <p className="text-slate-200 text-base sm:text-lg font-medium leading-relaxed">
                  {lang === "en"
                    ? "Business owners, founders and managers who already work with international partners — or want to."
                    : "Олон улсын түншүүдтэй хамтран ажилладаг эсвэл хамтран ажиллахыг зорьж буй бизнес эрхлэгчид, үүсгэн байгуулагчид, менежерүүдэд зориулагдсан."}
                </p>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {lang === "en"
                    ? "You already know basic grammar. What you need is the exact vocabulary and emotional poise to command respect when hundreds of thousands of dollars are on the table."
                    : "Та суурь дүрмээ мэднэ. Харин олон мянган долларын гэрээ, нийлүүлэлтийн хэлэлцээрт тань мэргэжлийн үгсийн сан болон дипломат итгэл төгс өнгө аяс хамгаас чухал."}
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider">01. Founders & CEOs</div>
                  <h3 className="text-base font-bold text-white">
                    {lang === "en" ? "Pitching Global Investors" : "Хөрөнгө оруулагчидтай уулзах"}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === "en"
                      ? "Explain unit economics, competitive advantages, and long-term vision with complete conviction."
                      : "Бизнесийнхээ өрсөлдөх давуу тал, зах зээлийн боломжоо хөрөнгө оруулагчдад чөлөөтэй тайлбарлах."}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider">02. Trade & Logistics</div>
                  <h3 className="text-base font-bold text-white">
                    {lang === "en" ? "Negotiating with Suppliers" : "Нийлүүлэгчидтэй тохиролцох"}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === "en"
                      ? "Push back on sudden price hikes, secure favorable payment terms, and prevent contract disputes."
                      : "Түүхий эдийн үнийн өсөлтөд хариу өгөх, төлбөрийн уян хатан нөхцөл авах, гэрээгээ хамгаалах."}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider">03. Project Leads</div>
                  <h3 className="text-base font-bold text-white">
                    {lang === "en" ? "Leading Multi-National Calls" : "Олон улсын баг удирдах"}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === "en"
                      ? "Run cross-border Zoom calls smoothly, deliver crisp updates, and summarize decisions."
                      : "Олон орны хамтрагч нартай хийх онлайн уулзалтыг үр дүнтэй даргалж, дараагийн алхмуудыг тодорхой болгох."}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider">04. Sales & Executives</div>
                  <h3 className="text-base font-bold text-white">
                    {lang === "en" ? "Writing Decisive Emails" : "Шийдвэртэй имэйл харилцаа"}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === "en"
                      ? "Send clear milestone sign-offs, follow-ups, and proposals that get prompt answers."
                      : "Үйлчлүүлэгчээс шууд хариу авах товч бөгөөд мэргэжлийн өндөр түвшний албан имэйл бичих."}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION: SUBSCRIPTION (Official Terms) */}
        <section id="subscription" className="py-20 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-2">
                SUBSCRIPTION
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                {lang === "en" ? "Free to Download. Built for Results." : "Үнэгүй татаж авах боломжтой."}
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base">
                {lang === "en"
                  ? "Bizora is free to download. Upgrade anytime to Bizora Premium for unlimited AI speech coaching."
                  : "Bizora-г үнэгүй татаж аваад өдөр бүрийн богино хичээлүүдээр эхлээрэй."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
              
              {/* Free Tier */}
              <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Bizora Free</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
                      {lang === "en" ? "Free to Download" : "Үнэгүй"}
                    </span>
                  </div>
                  <div className="text-3xl font-black text-white mb-2">$0</div>
                  <p className="text-xs text-slate-400 mb-6">
                    {lang === "en"
                      ? "Bizora is free to download on the Apple App Store."
                      : "Apple App Store дээрээс үнэгүй татаж авах боломжтой."}
                  </p>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{lang === "en" ? "Free App Store download" : "App Store-оос үнэгүй татах"}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{lang === "en" ? "Daily starter 10-minute micro-lessons" : "Өдөр тутмын 10 минутын хичээлүүд"}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{lang === "en" ? "Core negotiation and email phrases" : "Үндсэн хэлэлцээр ба имэйлийн илэрхийллүүд"}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{lang === "en" ? "Daily streak and habit tracking" : "Өдрийн зуршил хөтлөх систем"}</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <a
                    href="#subscription"
                    className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                  >
                    <AppleIcon className="w-4 h-4 fill-current" />
                    <span>{lang === "en" ? "Download Free on App Store" : "App Store-оос үнэгүй татах"}</span>
                  </a>
                </div>
              </div>

              {/* Premium Tier */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-cyan-400 shadow-2xl shadow-cyan-950/40 flex flex-col justify-between">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider shadow">
                  Bizora Premium
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">All-Access</span>
                    <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold">
                      Full Executive Tier
                    </span>
                  </div>
                  <div className="text-3xl font-black text-white mb-2">
                    {lang === "en" ? "Unlimited Lessons" : "Хязгааргүй Эрх"}
                  </div>
                  <p className="text-xs text-slate-400 mb-6">
                    {lang === "en"
                      ? "Bizora Premium unlocks unlimited lessons, unlimited AI coach conversations and all tools."
                      : "Bizora Premium нь хязгааргүй хичээл, хязгааргүй AI дасгалжуулагчтай харилцах болон бүх хэрэгслүүдийг нээнэ."}
                  </p>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                      <strong className="text-white">
                        {lang === "en" ? "Unlimited lessons in all categories" : "Бүх ангиллын хязгааргүй хичээл"}
                      </strong>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                      <strong className="text-white">
                        {lang === "en" ? "Unlimited AI coach voice conversations" : "Хязгааргүй AI ярианы дасгалжуулагч"}
                      </strong>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{lang === "en" ? "All negotiation & pitch practice tools" : "Хэлэлцээр ба питчийн бүх хэрэгслүүд"}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{lang === "en" ? "Real-time executive cadence diagnostics" : "Ярианы өнгө аясын бодит оношилгоо"}</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <a
                    href="#subscription"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all duration-200 active:scale-95"
                  >
                    <AppleIcon className="w-4 h-4 fill-current" />
                    <span>{lang === "en" ? "Unlock Premium in App" : "App Store дээрээс авах"}</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Official Apple Terms Callout */}
            <div className="max-w-4xl mx-auto mt-10 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-slate-300 font-bold">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>
                  {lang === "en"
                    ? "Apple ID Account Terms & Billing Disclaimer"
                    : "Apple ID Төлбөр болон Сунгалтын Нөхцөл"}
                </span>
              </div>
              <p>
                {lang === "en"
                  ? "Bizora is free to download. Bizora Premium unlocks unlimited lessons, unlimited AI coach conversations and all tools. Payment is charged to your Apple ID account at confirmation of purchase. Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period. Manage or cancel anytime in your App Store account settings."
                  : "Bizora нь татаж авахад үнэгүй. Bizora Premium нь хязгааргүй хичээл, хязгааргүй AI дасгалжуулагчийн харилцан яриа болон бүх хэрэгслийг нээнэ. Худалдан авалт баталгаажсаны дараа төлбөр таны Apple ID данснаас суутгагдана. Одоогийн хугацаа дуусахаас дор хаяж 24 цагийн өмнө цуцлаагүй тохиолдолд захиалга автоматаар сунгагдана. App Store-ийн тохиргооноос хүссэн үедээ удирдаж, цуцлах боломжтой."}
              </p>
            </div>

          </div>
        </section>

        {/* SECTION: FAQ ACCORDION (Түгээмэл асуулт хариултууд) */}
        <section id="faq" className="py-20 border-b border-slate-800/80 bg-slate-950/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-2">
                QUESTIONS & ANSWERS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                {lang === "en" ? "Frequently Asked Questions" : "Түгээмэл Асуулт Хариултууд (FAQ)"}
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base">
                {lang === "en"
                  ? "Everything you need to know about the Bizora Business English app."
                  : "Bizora Business English аппликейшний талаарх бүх түгээмэл асуултууд."}
              </p>
            </div>

            {/* Accordion */}
            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                    >
                      <span className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
                        {faq.q[lang]}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                        {faq.a[lang]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Direct Support Inquiries */}
            <div className="mt-12 p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {lang === "en" ? "Have more questions or custom inquiry?" : "Асуух зүйл эсвэл санал байна уу?"}
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === "en"
                    ? "Reach our leadership and engineering team directly."
                    : "Манай үүсгэн байгуулагч, хөгжүүлэгчтэй шууд холбогдоорой."}
                </p>
              </div>
              <a
                href="mailto:boogii@cornerstoneai.dev"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors whitespace-nowrap"
              >
                <Mail className="w-4 h-4" />
                <span>boogii@cornerstoneai.dev</span>
              </a>
            </div>

          </div>
        </section>

        {/* BOTTOM DOWNLOAD CTA BANNER */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-8 sm:p-14 border border-cyan-500/30 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>
                    {lang === "en" ? "Start Your 10-Minute Habit Today" : "Өнөөдрөөс 10 минутын зуршлаа эхлүүлээрэй"}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {lang === "en"
                    ? "Master the Moments That Define Your Career."
                    : "Бизнесийн шийдвэрлэх мөчүүдэд итгэл төгс ярь."}
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {lang === "en"
                    ? "Join founders and business leaders worldwide who practice with Bizora before critical negotiations, board calls, and investor meetings."
                    : "Олон улсын хөрөнгө оруулагчид, ханган нийлүүлэгчидтэй хийх уулзалтын өмнө Bizora-аар бэлтгэл хийдэг бизнес эрхлэгчидтэй нэгдээрэй."}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="#subscription"
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 shadow-xl shadow-cyan-500/30 transition-all duration-200 active:scale-95"
                  >
                    <AppleIcon className="w-5 h-5 fill-current" />
                    <div className="text-left">
                      <div className="text-[10px] uppercase font-semibold leading-none text-slate-900/80">
                        {lang === "en" ? "Available on" : "Татах"}
                      </div>
                      <div className="text-sm font-extrabold leading-none mt-0.5">Apple App Store</div>
                    </div>
                  </a>

                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
                  >
                    <span>{lang === "en" ? "Cornerstone AI Home" : "Нүүр хуудас руу буцах"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 py-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/Glossy_Bi_Tech_App_Icon_10c3021a.png"
                alt="Bizora"
                className="w-8 h-8 rounded-xl shadow"
              />
              <div>
                <span className="text-sm font-bold text-white">Bizora</span>
                <span className="text-xs text-slate-400 ml-2">by Cornerstone AI</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <Link to="/" className="hover:text-cyan-400 transition-colors">
                Cornerstone AI Home
              </Link>
              <a href="#what-you-can-do" className="hover:text-cyan-400 transition-colors">
                {lang === "en" ? "Capabilities" : "Боломжууд"}
              </a>
              <a href="#subscription" className="hover:text-cyan-400 transition-colors">
                {lang === "en" ? "Subscription" : "Багц"}
              </a>
              <a href="#faq" className="hover:text-cyan-400 transition-colors">
                FAQ
              </a>
              <a href="mailto:boogii@cornerstoneai.dev" className="hover:text-cyan-400 transition-colors">
                boogii@cornerstoneai.dev
              </a>
            </div>

            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} Bizora · All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Apple Logo SVG
function AppleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 170" className={className}>
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.66-7.79-11.89-14.24-5.35-8.2-9.61-17.65-12.79-28.34-3.17-10.7-4.77-21.2-4.77-31.5 0-14.54 3.84-26.65 11.53-36.33 7.68-9.68 17.2-14.59 28.56-14.73 4.89 0 10.14 1.3 15.75 3.9 5.62 2.6 9.4 3.98 11.36 4.13 1.52-.2 5.51-1.63 11.96-4.29 6.45-2.66 12.03-3.83 16.74-3.52 12.51.98 22.42 5.43 29.74 13.35-10.99 6.64-16.38 15.77-16.17 27.4.22 9.03 3.69 16.64 10.42 22.84 6.73 6.2 14.56 9.77 23.49 10.71-2.29 6.96-4.89 13.59-7.82 19.89zm-29.35-106.66c0-6.19 2.29-12.06 6.87-17.61 4.58-5.55 10.23-9.45 16.96-11.71 1.09 5.44.87 11.09-.65 16.96-1.52 5.87-4.46 11.2-8.81 15.99-4.24 4.57-9.3 7.94-15.18 10.12-.44-2.61-.7-5.29-.79-8.02-.09-1.9-.4-3.8-.4-5.73z" />
    </svg>
  );
}
