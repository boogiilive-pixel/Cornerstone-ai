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
  MessageSquare,
  HelpCircle,
  ExternalLink,
  Play,
  RotateCcw,
  Check
} from "lucide-react";

interface PracticeScenario {
  id: string;
  category: string;
  title: string;
  situation: string;
  targetPhrase: string;
  phoneticTip: string;
  executiveFeedback: string;
  alternatives: string[];
}

const practiceScenarios: PracticeScenario[] = [
  {
    id: "negotiation",
    category: "Negotiation",
    title: "Handling Supplier Price Pushback",
    situation: "Your supplier just announced an 8% price increase for next quarter's raw materials.",
    targetPhrase: "We value our long-term partnership; however, given our committed volume, we propose capping the adjustment at 3%.",
    phoneticTip: "Stress 'value' and 'partnership' with warm firmness, then deliver '3%' clearly.",
    executiveFeedback: "Excellent balance of relationship-building and firm commercial discipline. Tone is polite yet unyielding.",
    alternatives: [
      "Could we explore a tiered rebate structure tied to our annual procurement volume?",
      "Let's look at extending contract length in exchange for maintaining baseline pricing."
    ]
  },
  {
    id: "pitch",
    category: "Pitch & QA",
    title: "Answering an Investor's Margin Question",
    situation: "A venture investor asks why your gross margins dipped slightly last quarter.",
    targetPhrase: "The margin variation was a strategic decision to front-load logistics capacity, which expands our net margin to 68% next quarter.",
    phoneticTip: "Keep a steady cadence. Pause after 'strategic decision' to signal deliberate control.",
    executiveFeedback: "Demonstrates proactive executive governance. Reframes a temporary expense into a competitive moat.",
    alternatives: [
      "Our unit economics remain exceptionally healthy with a 4.2x LTV-to-CAC ratio.",
      "We absorbed one-off setup costs that will yield a 30% reduction in fulfillment expense."
    ]
  },
  {
    id: "email",
    category: "Email",
    title: "Firm Milestone Follow-Up",
    situation: "A client partner has not provided feedback on a critical deliverable due tomorrow.",
    targetPhrase: "To ensure we remain on schedule for Friday's launch, please confirm approval on the revised scope by 3 PM EST today.",
    phoneticTip: "Crisp and courteous. Setting an exact hour eliminates ambiguity.",
    executiveFeedback: "Action-oriented and respectful. Anchors the urgency to their success (Friday's launch).",
    alternatives: [
      "I want to make sure your team doesn't experience any rollout delay—could you review section 3?",
      "Following up on our sprint timeline: we are standing by to deploy as soon as you sign off."
    ]
  },
  {
    id: "meeting",
    category: "Meeting",
    title: "Aligning Key Decisions",
    situation: "Wrapping up a 45-minute cross-border call with multi-national team leads.",
    targetPhrase: "To summarize our agreed next steps: Marcus leads supplier outreach, while our team finalizes the technical audit by Thursday.",
    phoneticTip: "Maintain high vocal energy through names and responsibilities to solidify ownership.",
    executiveFeedback: "Textbook executive wrap-up. Clear ownership, deadlines, and no room for misunderstandings.",
    alternatives: [
      "Before we adjourn, let's verify that everyone has what they need to hit this week's milestones.",
      "I'll circulate a brief 3-bullet recap immediately following this session."
    ]
  }
];

const faqs = [
  {
    q: "What makes Bizora different from general language apps like Duolingo?",
    a: "General apps teach casual conversation, tourist vocabulary, and gamified trivia. Bizora is built exclusively for founders, business owners, and corporate executives. Every lesson is anchored in high-stakes commercial moments—contract negotiations, investor pitches, board updates, and cross-border emails."
  },
  {
    q: "How does the 10-minute micro-lesson structure work?",
    a: "We know your schedule is packed. Each session introduces one real business scenario, delivers 3–4 executive-grade power phrases, guides you to speak them out loud, and provides instant AI speech feedback. You finish in 10 focused minutes with actionable phrases you can immediately use in your next meeting."
  },
  {
    q: "How does the AI Coach evaluate my speaking?",
    a: "The Bizora AI Coach listens to your spoken delivery and analyzes your pronunciation, pacing, authority, and diplomatic tone. Instead of simple 'correct/incorrect' scoring, you receive nuanced feedback: whether your phrasing sounds too passive, overly aggressive, or impeccably executive."
  },
  {
    q: "Who is Bizora designed for?",
    a: "Bizora is tailored for business owners, startup founders, export/import entrepreneurs, product managers, and professionals who already work with international partners—or are preparing to expand into global markets."
  },
  {
    q: "Is Bizora free to download?",
    a: "Yes. Bizora is 100% free to download on the Apple App Store. You can start with foundational daily lessons, explore core business scenarios, and test the AI Coach with zero obligation."
  },
  {
    q: "What does Bizora Premium include, and how does billing work?",
    a: "Bizora Premium unlocks unlimited daily lessons, unlimited AI coach voice dialogues, full pitch & negotiation simulations, and advanced email toolkits. Payment is securely charged to your Apple ID account at purchase confirmation. Subscriptions renew automatically unless cancelled at least 24 hours prior to the current cycle's end. You can manage or cancel anytime in your Apple App Store account settings."
  },
  {
    q: "Can I use Bizora if my English is currently intermediate?",
    a: "Yes! Bizora assumes you understand foundational English grammar and focuses on elevating you from 'getting by' to 'commanding respect' in business meetings. The lessons build intuitive executive reflexes."
  },
  {
    q: "How can I contact the Bizora team or request a corporate team tier?",
    a: "You can reach our leadership and engineering team directly at boogii@cornerstoneai.dev for user feedback, feature requests, or corporate team access."
  }
];

export default function Bizora() {
  const [selectedScenario, setSelectedScenario] = useState<PracticeScenario>(practiceScenarios[0]);
  const [isSimulatingSpeech, setIsSimulatingSpeech] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [speechProgress, setSpeechProgress] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="min-h-screen bg-navy-900 text-slate-100 selection:bg-gold-500 selection:text-navy-950 font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-radial from-gold-500/10 via-emerald-500/5 to-transparent blur-3xl opacity-70" />
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-radial from-blue-600/10 to-transparent blur-3xl opacity-50" />
        <div className="absolute bottom-10 left-[-5%] w-[500px] h-[500px] bg-radial from-gold-500/10 to-transparent blur-3xl opacity-40" />
      </div>

      {/* Top Bar Contract (1 line brand, 4-5 links, 1 primary action) */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-navy-950/80 border-b border-navy-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <Link
            to="/bizora"
            className="flex items-center gap-3.5 whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-lg p-1"
          >
            {/* App Icon Mark */}
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 p-[1.5px] shadow-lg shadow-gold-500/20 group-hover:shadow-gold-500/35 transition-all duration-300">
              <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/20 via-transparent to-amber-300/30 opacity-70" />
                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-amber-300 to-gold-500">
                  B
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-gold-400 transition-colors">
                  Bizora
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-400/90 border border-gold-500/30 px-1.5 py-0.5 rounded">
                  iOS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Business English App</p>
            </div>
          </Link>

          {/* Zone 2: Single-line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#what-you-can-do" className="hover:text-gold-400 transition-colors whitespace-nowrap shrink-0">
              Capabilities
            </a>
            <a href="#how-it-works" className="hover:text-gold-400 transition-colors whitespace-nowrap shrink-0">
              How It Works
            </a>
            <a href="#interactive-coach" className="hover:text-gold-400 transition-colors whitespace-nowrap shrink-0">
              AI Coach Demo
            </a>
            <a href="#subscription" className="hover:text-gold-400 transition-colors whitespace-nowrap shrink-0">
              Subscription
            </a>
            <a href="#faq" className="hover:text-gold-400 transition-colors whitespace-nowrap shrink-0">
              FAQ
            </a>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 px-3 py-2 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Back to Cornerstone AI</span>
            </Link>
            <a
              href="#subscription"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-navy-950 bg-gradient-to-r from-gold-400 to-amber-500 hover:from-gold-300 hover:to-amber-400 shadow-md shadow-gold-500/20 hover:shadow-gold-500/40 transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0"
            >
              <AppleIcon className="w-4 h-4 fill-current" />
              <span>Get on App Store</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-navy-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Value Proposition */}
              <div className="lg:col-span-7 space-y-6">
                {/* Quiet Kicker Metadata */}
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 tracking-wide">
                  <span className="text-gold-400 font-semibold">Bizora Business English</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>10-Minute Micro-Lessons</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>AI Speech Coach</span>
                </div>

                {/* Hero Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
                  Speak Business English with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-amber-400 to-gold-500">
                    Confidence
                  </span>{" "}
                  in the Moments That Matter.
                </h1>

                {/* Core Paragraph */}
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                  Bizora helps business owners, founders, and managers speak English with conviction when negotiating with suppliers, writing to high-value clients, leading cross-border meetings, and pitching to international investors.
                </p>

                {/* Micro-Features Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-navy-800/60 border border-navy-700/60">
                    <div className="flex items-center gap-2 text-gold-400 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-200">10 Min / Day</span>
                    </div>
                    <p className="text-xs text-slate-400">Built around real business situations with zero fluff.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-navy-800/60 border border-navy-700/60">
                    <div className="flex items-center gap-2 text-gold-400 mb-1">
                      <Mic className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Out Loud</span>
                    </div>
                    <p className="text-xs text-slate-400">Practice executive phrases out loud with instant AI diagnostics.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-navy-800/60 border border-navy-700/60">
                    <div className="flex items-center gap-2 text-gold-400 mb-1">
                      <Flame className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Daily Streak</span>
                    </div>
                    <p className="text-xs text-slate-400">Build a durable executive communication habit that sticks.</p>
                  </div>
                </div>

                {/* Call To Actions */}
                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <a
                    href="#subscription"
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl text-sm font-semibold text-navy-950 bg-gradient-to-r from-gold-400 via-amber-400 to-amber-500 hover:from-gold-300 hover:to-amber-400 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 transition-all duration-200 active:scale-95"
                  >
                    <AppleIcon className="w-5 h-5 fill-current" />
                    <div className="text-left">
                      <div className="text-[10px] uppercase font-medium leading-none text-navy-900/80">Download Free on</div>
                      <div className="text-sm font-bold leading-none mt-0.5">Apple App Store</div>
                    </div>
                  </a>

                  <a
                    href="#interactive-coach"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium text-slate-200 bg-navy-800 hover:bg-navy-700 border border-navy-700 hover:border-gold-500/50 transition-all duration-200"
                  >
                    <Sparkles className="w-4 h-4 text-gold-400" />
                    <span>Try Interactive AI Demo</span>
                  </a>
                </div>

                {/* Trust Note */}
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free download · No credit card required · Compatible with iOS 16.0+</span>
                </div>
              </div>

              {/* Right Column: Interactive App Interface Showcase */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
                  {/* Subtle Glow Behind Phone */}
                  <div className="absolute inset-0 bg-gold-500/20 blur-3xl rounded-full -z-10" />

                  {/* iPhone Hardware Frame */}
                  <div className="relative rounded-[48px] p-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-2xl shadow-black/80 border border-slate-700/80">
                    {/* Screen Glass */}
                    <div className="relative rounded-[38px] bg-navy-950 overflow-hidden border border-slate-800 text-slate-100 flex flex-col min-h-[580px]">
                      {/* Dynamic Island */}
                      <div className="pt-3 flex justify-center">
                        <div className="w-24 h-5 bg-black rounded-full flex items-center justify-between px-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                          <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                        </div>
                      </div>

                      {/* In-App Header */}
                      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-navy-800/80">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-gold-500/20 flex items-center justify-center text-gold-400 text-xs font-bold">
                            B
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">Bizora Coach</span>
                            <span className="text-[10px] text-slate-400 block">Negotiation · Lesson 04</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-bold">
                          <Flame className="w-3.5 h-3.5 text-amber-400" />
                          <span>7 Day Streak</span>
                        </div>
                      </div>

                      {/* In-App Scenario Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-wider text-gold-400 mb-1">
                            Real Business Situation
                          </div>
                          <p className="text-xs text-slate-300 bg-navy-900/90 p-3 rounded-xl border border-navy-800">
                            "A supplier is asking for an immediate 8% surcharge on your quarterly order due to logistics inflation."
                          </p>
                        </div>

                        {/* Target Phrase Box */}
                        <div className="bg-gradient-to-br from-navy-900 via-navy-850 to-navy-900 p-3.5 rounded-xl border border-gold-500/30 shadow-inner">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
                            <span>Target Phrase To Speak</span>
                            <span className="text-emerald-400 text-[10px]">Polite & Firm</span>
                          </div>
                          <p className="text-xs font-medium text-white leading-relaxed">
                            "We value our partnership; however, given our contracted volume, we propose capping the adjustment at 3%."
                          </p>
                        </div>

                        {/* Interactive Waveform / Feedback Simulation */}
                        <div className="bg-navy-900 p-3.5 rounded-xl border border-navy-800">
                          <div className="flex items-center justify-between text-[11px] mb-2">
                            <span className="text-slate-400">AI Speech Diagnostics</span>
                            <span className="text-emerald-400 font-bold">96% Executive Score</span>
                          </div>

                          {/* Sound wave bars */}
                          <div className="flex items-center justify-center gap-1 h-8 my-2">
                            {[40, 75, 55, 90, 65, 80, 45, 95, 70, 85, 50, 90, 60, 40].map((h, i) => (
                              <div
                                key={i}
                                className="w-1 bg-gradient-to-t from-gold-500 to-amber-300 rounded-full animate-pulse"
                                style={{
                                  height: `${h}%`,
                                  animationDelay: `${i * 90}ms`,
                                  animationDuration: "1.2s"
                                }}
                              />
                            ))}
                          </div>

                          <div className="text-[11px] text-slate-300 leading-snug pt-1">
                            <span className="text-gold-400 font-semibold">Coach Feedback:</span> Impeccable firmness. The delivery establishes commercial leverage without damaging goodwill.
                          </div>
                        </div>

                        {/* Mini Action Button */}
                        <div className="pt-1">
                          <div className="w-full py-2.5 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md">
                            <Mic className="w-4 h-4" />
                            <span>Practice Next Scenario</span>
                          </div>
                        </div>
                      </div>

                      {/* Home indicator bar */}
                      <div className="pb-2 pt-1 flex justify-center">
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
        <section id="what-you-can-do" className="py-20 border-b border-navy-800/60 bg-navy-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 block mb-2">
                What You Can Do
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white text-balance">
                High-Stakes English Mastered in 10-Minute Micro-Lessons.
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                Every tool, phrase, and simulation in Bizora is engineered specifically to help you win deals, align global teams, and command authority.
              </p>
            </div>

            {/* Asymmetric Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Pillar 1: Negotiation */}
              <div className="p-6 rounded-2xl bg-navy-900/80 border border-navy-700/80 hover:border-gold-500/40 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-gold-400 flex items-center justify-center mb-5">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Negotiation Practice</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Handle price talks, credit terms, and supplier pushback politely but firmly. Never concede ground accidentally due to phrasing hesitation.
                  </p>
                </div>
                <div className="pt-5 mt-5 border-t border-navy-800 text-xs text-gold-400 font-medium">
                  Price caps · Tiered discounts · Contract pushback
                </div>
              </div>

              {/* Pillar 2: Professional Email */}
              <div className="p-6 rounded-2xl bg-navy-900/80 border border-navy-700/80 hover:border-gold-500/40 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-gold-400 flex items-center justify-center mb-5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Professional Email</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Write clear openings, decisive follow-ups, delicate escalations, and respectful closings that get read and acted upon immediately.
                  </p>
                </div>
                <div className="pt-5 mt-5 border-t border-navy-800 text-xs text-gold-400 font-medium">
                  Follow-ups · Milestone sign-offs · Diplomatic boundaries
                </div>
              </div>

              {/* Pillar 3: Meetings & Calls */}
              <div className="p-6 rounded-2xl bg-navy-900/80 border border-navy-700/80 hover:border-gold-500/40 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-gold-400 flex items-center justify-center mb-5">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Meetings & Video Calls</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Run international Zoom calls, deliver crisp status updates, interject smoothly when interrupted, and summarize high-stakes decisions.
                  </p>
                </div>
                <div className="pt-5 mt-5 border-t border-navy-800 text-xs text-gold-400 font-medium">
                  Chairing calls · Action items · Polite interruptions
                </div>
              </div>

              {/* Pillar 4: Pitch Practice */}
              <div className="p-6 rounded-2xl bg-navy-900/80 border border-navy-700/80 hover:border-gold-500/40 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-gold-400 flex items-center justify-center mb-5">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Pitch Practice</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Present your business model with absolute clarity and answer tough questions from venture investors, lenders, and global distributors.
                  </p>
                </div>
                <div className="pt-5 mt-5 border-t border-navy-800 text-xs text-gold-400 font-medium">
                  Traction defense · Unit economics · Market sizing
                </div>
              </div>

              {/* Pillar 5: Business Ideas in English */}
              <div className="p-6 rounded-2xl bg-navy-900/80 border border-navy-700/80 hover:border-gold-500/40 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-gold-400 flex items-center justify-center mb-5">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Business Ideas in English</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Learn vital commercial concepts like cash flow management, pricing leverage, and sales funnels while naturally acquiring native English terms.
                  </p>
                </div>
                <div className="pt-5 mt-5 border-t border-navy-800 text-xs text-gold-400 font-medium">
                  Cash flow · Customer lifetime value · Pricing power
                </div>
              </div>

              {/* Pillar 6: Daily Streak & Goals */}
              <div className="p-6 rounded-2xl bg-navy-900/80 border border-navy-700/80 hover:border-gold-500/40 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-gold-400 flex items-center justify-center mb-5">
                    <Flame className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Daily Streak & Goals</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Build a habit that actually sticks. Ten minutes per day keeps your vocal cords conditioned, your vocabulary fresh, and your confidence high.
                  </p>
                </div>
                <div className="pt-5 mt-5 border-t border-navy-800 text-xs text-gold-400 font-medium">
                  Micro-goals · Habit loops · Daily voice conditioning
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION: INTERACTIVE AI COACH SIMULATOR */}
        <section id="interactive-coach" className="py-20 border-b border-navy-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 block mb-2">
                Live Interactive Experience
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white text-balance">
                Test the Bizora AI Coach Right Now.
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base">
                Select a business situation below, review the target phrase, and simulate speaking it out loud to see how Bizora delivers instant executive diagnostics.
              </p>
            </div>

            {/* Scenario Selector Tabs */}
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
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 ${
                      isActive
                        ? "bg-gold-500 text-navy-950 shadow-md shadow-gold-500/25"
                        : "bg-navy-800 text-slate-300 hover:text-white hover:bg-navy-700 border border-navy-700"
                    }`}
                  >
                    {scenario.category}: {scenario.title}
                  </button>
                );
              })}
            </div>

            {/* Interactive Lesson Card Container */}
            <div className="max-w-4xl mx-auto bg-navy-950 rounded-3xl border border-navy-700/80 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Left: Situation & Phrase */}
                <div className="md:col-span-7 space-y-5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-gold-400 uppercase tracking-wider">
                      Scenario #{selectedScenario.id.toUpperCase()}
                    </span>
                    <span>~10 Min Exercise</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {selectedScenario.title}
                    </h3>
                    <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <strong className="text-slate-100 block mb-1">Context:</strong>
                      {selectedScenario.situation}
                    </div>
                  </div>

                  {/* The Target Phrase */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-gold-500/10 via-navy-900 to-navy-900 border border-gold-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                        Target Phrase To Speak Out Loud
                      </span>
                      <Volume2 className="w-4 h-4 text-gold-400 cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-base sm:text-lg font-medium text-white italic leading-snug">
                      "{selectedScenario.targetPhrase}"
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      💡 <strong>Pronunciation & Cadence Tip:</strong> {selectedScenario.phoneticTip}
                    </p>
                  </div>

                  {/* Alternative Executive Variations */}
                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-semibold text-slate-400">Executive Alternative Phrasings:</div>
                    {selectedScenario.alternatives.map((alt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-navy-900/60 p-2.5 rounded-lg border border-navy-800">
                        <Check className="w-3.5 h-3.5 text-gold-400 mt-0.5 shrink-0" />
                        <span>"{alt}"</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: AI Speech Engine Simulator */}
                <div className="md:col-span-5 bg-navy-900 rounded-2xl p-5 border border-navy-700/80 flex flex-col justify-between h-full space-y-5">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gold-400" />
                        <span className="text-xs font-bold text-white">Bizora Voice Coach</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-medium">Ready</span>
                    </div>

                    <div className="py-6 text-center">
                      {!isSimulatingSpeech && !hasRecorded && (
                        <div className="space-y-3">
                          <button
                            onClick={handleSimulatePractice}
                            className="w-16 h-16 rounded-full bg-gradient-to-tr from-gold-500 to-amber-400 text-navy-950 flex items-center justify-center mx-auto shadow-lg shadow-gold-500/30 hover:scale-105 active:scale-95 transition-all"
                          >
                            <Mic className="w-7 h-7" />
                          </button>
                          <p className="text-xs font-semibold text-slate-200">
                            Tap to Practice Out Loud
                          </p>
                          <p className="text-[11px] text-slate-400 max-w-[220px] mx-auto">
                            Read the phrase above. Bizora analyzes tone, pacing, and business authority.
                          </p>
                        </div>
                      )}

                      {isSimulatingSpeech && (
                        <div className="space-y-4">
                          <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto animate-pulse">
                            <Mic className="w-7 h-7 animate-bounce" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">Listening to your delivery...</p>
                            <p className="text-[11px] text-slate-400">Analyzing cadence & business tone</p>
                          </div>
                          {/* Progress bar */}
                          <div className="w-full bg-navy-850 h-2 rounded-full overflow-hidden border border-navy-700">
                            <div
                              className="bg-gold-500 h-full transition-all duration-150"
                              style={{ width: `${speechProgress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {hasRecorded && (
                        <div className="space-y-4 text-left">
                          <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              <span className="text-xs font-bold text-emerald-300">Executive Tone Confirmed</span>
                            </div>
                            <span className="text-xs font-extrabold text-gold-400">97/100</span>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div className="p-3 bg-navy-950 rounded-xl border border-navy-800">
                              <span className="text-gold-400 font-bold block mb-1">Coach Diagnostic:</span>
                              <p className="text-slate-300 leading-relaxed">
                                {selectedScenario.executiveFeedback}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[11px]">
                              <div className="p-2 bg-navy-950 rounded-lg border border-navy-800">
                                <span className="text-slate-400 block">Pacing</span>
                                <span className="text-emerald-400 font-semibold">135 WPM (Optimal)</span>
                              </div>
                              <div className="p-2 bg-navy-950 rounded-lg border border-navy-800">
                                <span className="text-slate-400 block">Authority</span>
                                <span className="text-gold-400 font-semibold">High Conviction</span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={handleResetPractice}
                            className="w-full py-2.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Try Another Delivery</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 text-center border-t border-navy-800 pt-3">
                    In the iOS App, all voice diagnostics run seamlessly via high-fidelity real-time AI speech processing.
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* SECTION: WHO IT'S FOR */}
        <section className="py-20 border-b border-navy-800/60 bg-navy-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  Target Audience
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white text-balance">
                  Who It's For.
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Business owners, founders, and managers who already work with international partners — or want to.
                </p>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  You already know basic English. But when hundreds of thousands of dollars are on the table, you need exact corporate vocabulary, diplomatic phrasing, and the poise to lead the room.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-navy-900 border border-navy-800 space-y-2">
                  <div className="text-gold-400 text-xs font-bold uppercase tracking-wider">01. Founders & Tech CEOs</div>
                  <h3 className="text-base font-bold text-white">Pitching Global Investors</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Explain your TAM, unit economics, and competitive moats without freezing or relying on translated notes.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-navy-900 border border-navy-800 space-y-2">
                  <div className="text-gold-400 text-xs font-bold uppercase tracking-wider">02. Import / Export Leaders</div>
                  <h3 className="text-base font-bold text-white">Negotiating with Suppliers</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Protect margins, challenge shipping delays, and demand contractual quality guarantees without hostility.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-navy-900 border border-navy-800 space-y-2">
                  <div className="text-gold-400 text-xs font-bold uppercase tracking-wider">03. Project & Product Managers</div>
                  <h3 className="text-base font-bold text-white">Leading Multi-National Teams</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Keep international engineers and stakeholders aligned on roadmap priorities, deadlines, and scope changes.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-navy-900 border border-navy-800 space-y-2">
                  <div className="text-gold-400 text-xs font-bold uppercase tracking-wider">04. Growth & Sales Directors</div>
                  <h3 className="text-base font-bold text-white">Closing Overseas Clients</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Send irresistible discovery follow-ups and hold commanding pitch meetings that close cross-border contracts.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION: HOW IT WORKS (The 3-Step Routine) */}
        <section id="how-it-works" className="py-20 border-b border-navy-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 block mb-2">
                Proven Methodology
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white text-balance">
                Built Around Real Business Situations.
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base">
                Three focused steps completed in 10 minutes every day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative p-6 rounded-2xl bg-navy-900/60 border border-navy-800 flex flex-col justify-between">
                <div>
                  <span className="text-4xl font-black text-gold-500/30 mb-3 block">01</span>
                  <h3 className="text-lg font-bold text-white mb-2">Learn Executive Phrases</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Study real-world phrasing models used by global executives for negotiations, tough client emails, and sprint planning.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-navy-800/80 text-xs text-slate-400">
                  Real context · No grammar drills · Direct utility
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative p-6 rounded-2xl bg-navy-900/60 border border-navy-800 flex flex-col justify-between">
                <div>
                  <span className="text-4xl font-black text-gold-500/30 mb-3 block">02</span>
                  <h3 className="text-lg font-bold text-white mb-2">Practice Them Out Loud</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Condition your vocal cords. Speaking out loud cements neural pathways so phrases flow effortlessly under meeting stress.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-navy-800/80 text-xs text-slate-400">
                  Voice conditioning · Zero judgment · Private practice
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative p-6 rounded-2xl bg-navy-900/60 border border-navy-800 flex flex-col justify-between">
                <div>
                  <span className="text-4xl font-black text-gold-500/30 mb-3 block">03</span>
                  <h3 className="text-lg font-bold text-white mb-2">Get Instant AI Feedback</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Receive immediate diagnostics on authority, diplomatic politeness, and pronunciation so you understand exactly what to say better.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-navy-800/80 text-xs text-slate-400">
                  Instant coaching · Cadence scoring · Alternative phrasings
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: SUBSCRIPTION & APP STORE DETAILS */}
        <section id="subscription" className="py-20 border-b border-navy-800/60 bg-navy-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 block mb-2">
                Subscription Details
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white text-balance">
                Simple, Transparent App Store Pricing.
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base">
                Bizora is free to download. Upgrade whenever you are ready for unlimited executive speech training.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
              
              {/* Free Tier */}
              <div className="p-8 rounded-3xl bg-navy-900/70 border border-navy-700/70 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Starter Access</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">Free Forever</span>
                  </div>
                  <div className="text-3xl font-extrabold text-white mb-2">$0</div>
                  <p className="text-xs text-slate-400 mb-6">
                    Free to download on the Apple App Store. Perfect for testing your daily commitment.
                  </p>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Free App Store download</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Daily starter micro-lessons</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Core negotiation & email templates</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Daily streak & habit tracking</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <a
                    href="#subscription"
                    className="w-full py-3 rounded-xl bg-navy-800 hover:bg-navy-750 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-navy-700 transition-colors"
                  >
                    <AppleIcon className="w-4 h-4 fill-current" />
                    <span>Download Free on App Store</span>
                  </a>
                </div>
              </div>

              {/* Bizora Premium Tier */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-b from-navy-900 to-navy-950 border-2 border-gold-500/70 shadow-xl shadow-gold-500/10 flex flex-col justify-between">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gold-500 text-navy-950 text-[11px] font-extrabold uppercase tracking-wider shadow">
                  Most Popular
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Bizora Premium</span>
                    <span className="px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20 text-xs font-semibold">All-Access</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">Full Access</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-6">
                    Unlock your full executive communication potential with unlimited voice intelligence.
                  </p>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-gold-400 shrink-0" />
                      <strong className="text-white">Unlimited daily lessons</strong> in all categories
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-gold-400 shrink-0" />
                      <strong className="text-white">Unlimited AI Coach conversations</strong> and diagnostics
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>Full access to all negotiation & pitch toolkits</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>Custom scenario creation for your specific industry</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>Priority support from the Cornerstone AI engineering team</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <a
                    href="#subscription"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-400 via-amber-400 to-amber-500 hover:from-gold-300 hover:to-amber-400 text-navy-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-gold-500/30 transition-all duration-200 active:scale-95"
                  >
                    <AppleIcon className="w-4 h-4 fill-current" />
                    <span>Get Bizora Premium in App</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Official Apple Subscription Disclaimer */}
            <div className="max-w-3xl mx-auto mt-10 p-5 rounded-2xl bg-navy-900/40 border border-navy-800 text-xs text-slate-400 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-slate-300 font-semibold">
                <Shield className="w-4 h-4 text-gold-400" />
                <span>Apple App Store Subscription & Billing Terms</span>
              </div>
              <p>
                Bizora is free to download. Bizora Premium unlocks unlimited lessons, unlimited AI coach conversations, and all specialized tools. Payment is charged directly to your Apple ID account at confirmation of purchase. Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current billing cycle. You may manage or cancel your subscription at any time within your Apple App Store account settings.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: FAQ (Түгээмэл асуулт хариултууд) */}
        <section id="faq" className="py-20 border-b border-navy-800/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 block mb-2">
                Questions & Answers
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white text-balance">
                Түгээмэл Асуулт Хариултууд (FAQ)
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base">
                Everything you need to know about the Bizora Business English application.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-navy-900/70 border border-navy-800/90 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                    >
                      <span className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gold-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-navy-800/60">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Direct Support Inquiries */}
            <div className="mt-12 p-6 rounded-2xl bg-navy-950 border border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  Have more questions or corporate inquiry?
                </h3>
                <p className="text-xs text-slate-400">
                  Contact our product leadership directly. We respond within 24 hours.
                </p>
              </div>
              <a
                href="mailto:boogii@cornerstoneai.dev"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-gold-400 bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 transition-colors whitespace-nowrap shrink-0"
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
            <div className="relative rounded-3xl bg-gradient-to-b from-navy-850 to-navy-950 p-8 sm:p-14 border border-gold-500/40 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 blur-3xl rounded-full pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span>Start Your 10-Minute Executive Habit Today</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
                  Master the Moments That Define Your Business Career.
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Join founders and business leaders worldwide who practice with Bizora before critical negotiations, board calls, and investor meetings.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="#subscription"
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl text-sm font-semibold text-navy-950 bg-gradient-to-r from-gold-400 via-amber-400 to-amber-500 hover:from-gold-300 hover:to-amber-400 shadow-xl shadow-gold-500/30 transition-all duration-200 active:scale-95"
                  >
                    <AppleIcon className="w-5 h-5 fill-current" />
                    <div className="text-left">
                      <div className="text-[10px] uppercase font-medium leading-none text-navy-900/80">Available on</div>
                      <div className="text-sm font-bold leading-none mt-0.5">Apple App Store</div>
                    </div>
                  </a>

                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-navy-800 hover:bg-navy-750 border border-navy-700 transition-colors"
                  >
                    <span>Visit Cornerstone AI Main Page</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET FOOTER */}
      <footer className="border-t border-navy-800/80 py-12 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400 text-sm font-bold">
                B
              </div>
              <div>
                <span className="text-sm font-bold text-white">Bizora</span>
                <span className="text-xs text-slate-400 ml-2">by Cornerstone AI</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <Link to="/" className="hover:text-gold-400 transition-colors">
                Cornerstone AI Home
              </Link>
              <a href="#what-you-can-do" className="hover:text-gold-400 transition-colors">
                Capabilities
              </a>
              <a href="#subscription" className="hover:text-gold-400 transition-colors">
                Subscription & Pricing
              </a>
              <a href="#faq" className="hover:text-gold-400 transition-colors">
                FAQ
              </a>
              <a href="mailto:boogii@cornerstoneai.dev" className="hover:text-gold-400 transition-colors">
                boogii@cornerstoneai.dev
              </a>
            </div>

            <div className="text-xs text-slate-400">
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
