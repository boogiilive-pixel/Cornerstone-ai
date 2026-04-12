import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Wallet, 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Search,
  Calendar,
  MoreVertical
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar
} from "recharts";

const salesData = [
  { name: "1-р сар", income: 120, expense: 80 },
  { name: "2-р сар", income: 145, expense: 92 },
  { name: "3-р сар", income: 132, expense: 88 },
  { name: "4-р сар", income: 168, expense: 105 },
  { name: "5-р сар", income: 155, expense: 98 },
  { name: "6-р сар", income: 189, expense: 115 },
  { name: "7-р сар", income: 201, expense: 121 },
  { name: "8-р сар", income: 178, expense: 108 },
  { name: "9-р сар", income: 220, expense: 132 },
  { name: "10-р сар", income: 198, expense: 118 },
  { name: "11-р сар", income: 284, expense: 142 },
];

const channelData = [
  { name: "Шууд борлуулалт", value: 42, count: 775, color: "#C49A3C" },
  { name: "Онлайн", value: 31, count: 572, color: "#3B82F6" },
  { name: "Түнш", value: 18, count: 332, color: "#10B981" },
  { name: "Бусад", value: 9, count: 168, color: "#6B7A99" },
];

const employeeKPI = [
  { name: "Б.Мөнхбат", sales: "₮28.4M", target: "₮25M", progress: 113, status: "Давсан", color: "green" },
  { name: "Д.Оюунчимэг", sales: "₮24.1M", target: "₮25M", progress: 96, status: "Ойртсон", color: "amber" },
  { name: "Г.Төмөрбаатар", sales: "₮21.8M", target: "₮20M", progress: 109, status: "Давсан", color: "green" },
  { name: "Н.Сарантуяа", sales: "₮19.2M", target: "₮20M", progress: 96, status: "Ойртсон", color: "amber" },
  { name: "Э.Болормаа", sales: "₮14.1M", target: "₮20M", progress: 70, status: "Хоцорсон", color: "red" },
];

const financialSummary = [
  { category: "Бараа борлуулалт", amount: "₮168M", percent: 60, color: "#C49A3C" },
  { category: "Үйлчилгээ", amount: "₮72M", percent: 25, color: "#3B82F6" },
  { category: "Түрээс", amount: "₮28M", percent: 10, color: "#10B981" },
  { category: "Бусад", amount: "₮16M", percent: 5, color: "#6B7A99" },
];

export default function InternalSystemDemo() {
  const [activeNav, setActiveNav] = useState("Overview");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-off-white font-sans flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[240px] bg-[#0D1526] border-r border-white/5 flex flex-col h-screen sticky top-0 z-50">
        <div className="p-8">
          <div className="text-xl font-bold text-[#C49A3C] flex items-center gap-2">
            <span className="text-2xl">◈</span> Cornerstone OS
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {[
            { name: "Overview", icon: LayoutDashboard, label: "Ерөнхий тойм" },
            { name: "Sales", icon: ShoppingBag, label: "Борлуулалт" },
            { name: "Finance", icon: Wallet, label: "Санхүү" },
            { name: "Team", icon: Users, label: "Ажилтнууд" },
            { name: "Reports", icon: BarChart3, label: "Тайлан" },
            { name: "Settings", icon: Settings, label: "Тохиргоо" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveNav(item.name)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all group relative ${
                activeNav === item.name 
                  ? "text-[#C49A3C] bg-[#C49A3C]/5" 
                  : "text-[#6B7A99] hover:text-white hover:bg-white/5"
              }`}
            >
              {activeNav === item.name && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute left-0 top-2 bottom-2 w-1 bg-[#C49A3C] rounded-r-full"
                />
              )}
              <item.icon className={`w-5 h-5 ${activeNav === item.name ? "text-[#C49A3C]" : "group-hover:text-white"}`} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C49A3C] to-[#8B6E2A] flex items-center justify-center font-bold text-stealth-black">
              B
            </div>
            <div>
              <p className="text-xs font-bold">Boogii</p>
              <p className="text-[10px] text-[#6B7A99]">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen relative overflow-y-auto">
        {/* Demo Banner */}
        <div className="sticky top-0 z-[60] w-full bg-[#0D1526]/80 backdrop-blur-md border-b border-[#C49A3C]/20 py-3 px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs font-bold tracking-wide">
            <span className="text-[#C49A3C]">⚡ Cornerstone AI</span>
            <span className="text-white/40">—</span>
            <span className="text-white/80">Таны компанид зориулсан ухаалаг систем</span>
          </div>
          <a 
            href="https://cornerstoneai.dev/digitalcard" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#C49A3C] text-stealth-black px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-[#D4AA4C] transition-colors"
          >
            Үнэ авах →
          </a>
        </div>

        {/* Top Bar */}
        <header className="px-8 py-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Ерөнхий тойм</h2>
            <p className="text-sm text-[#6B7A99]">Сайн байна уу, Boogii ✦</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#111827] border border-white/5 rounded-lg text-xs font-medium text-[#6B7A99] hover:text-white transition-colors">
              <Calendar className="w-4 h-4" /> 2024 оны 11-р сар
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/5">
              <button className="relative p-2 bg-[#111827] border border-white/5 rounded-lg text-[#6B7A99] hover:text-white transition-colors">
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
              </button>
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10" />
            </div>
          </div>
        </header>

        <div className="px-8 pb-12 space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Нийт Орлого", value: "₮284,500,000", change: "+12.5% ↑", color: "gold", icon: Wallet },
              { label: "Борлуулалт", value: "1,847", change: "+8.2% ↑", color: "blue", icon: ShoppingBag },
              { label: "Шинэ Клиент", value: "243", change: "+24.1% ↑", color: "teal", icon: Users },
              { label: "Зардал", value: "₮98,200,000", change: "-3.2% ↓", color: "red", icon: TrendingDown },
            ].map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#111827]/60 backdrop-blur-xl border border-white/5 p-6 rounded-2xl relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-${kpi.color === 'gold' ? '[#C49A3C]' : kpi.color === 'blue' ? '[#3B82F6]' : kpi.color === 'teal' ? '[#10B981]' : '[#EF4444]'}/5 rounded-full -mr-8 -mt-8 blur-2xl group-hover:blur-3xl transition-all`} />
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-${kpi.color === 'gold' ? '[#C49A3C]' : kpi.color === 'blue' ? '[#3B82F6]' : kpi.color === 'teal' ? '[#10B981]' : '[#EF4444]'}/10`}>
                    <kpi.icon className={`w-5 h-5 text-${kpi.color === 'gold' ? '[#C49A3C]' : kpi.color === 'blue' ? '[#3B82F6]' : kpi.color === 'teal' ? '[#10B981]' : '[#EF4444]'}`} />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${kpi.change.includes('↑') ? "text-[#10B981] bg-[#10B981]/10" : "text-[#EF4444] bg-[#EF4444]/10"}`}>
                    {kpi.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{kpi.value}</h3>
                <p className="text-xs text-[#6B7A99] uppercase tracking-wider">{kpi.label}</p>
                <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className={`h-full bg-${kpi.color === 'gold' ? '[#C49A3C]' : kpi.color === 'blue' ? '[#3B82F6]' : kpi.color === 'teal' ? '[#10B981]' : '[#EF4444]'}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Area Chart */}
            <div className="lg:col-span-7 bg-[#111827]/60 backdrop-blur-xl border border-white/5 p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold">Сарын Борлуулалт & Орлого</h3>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#C49A3C]" /> Орлого</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#3B82F6]" /> Зардал</div>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C49A3C" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#C49A3C" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#6B7A99" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false} 
                      dy={10}
                    />
                    <YAxis 
                      stroke="#6B7A99" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `₮${value}M`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#0D1526", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                      itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
                    />
                    <Area type="monotone" dataKey="income" stroke="#C49A3C" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                    <Area type="monotone" dataKey="expense" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Donut Chart */}
            <div className="lg:col-span-5 bg-[#111827]/60 backdrop-blur-xl border border-white/5 p-8 rounded-2xl">
              <h3 className="text-lg font-bold mb-8">Борлуулалтын сувгууд</h3>
              <div className="h-[240px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#0D1526", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold">1,847</span>
                  <span className="text-[10px] text-[#6B7A99] uppercase tracking-widest">Нийт</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {channelData.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <div>
                      <p className="text-[10px] text-[#6B7A99] uppercase tracking-wider">{item.name}</p>
                      <p className="text-sm font-bold">{item.value}% <span className="text-[10px] text-white/40 font-normal ml-1">({item.count})</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table & Financial Row */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* KPI Table */}
            <div className="lg:col-span-7 bg-[#111827]/60 backdrop-blur-xl border border-white/5 p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold">Ажилтны KPI</h3>
                <button className="text-[#C49A3C] text-xs font-bold hover:underline">Бүгдийг харах</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-white/5">
                      <th className="pb-4 text-[10px] uppercase tracking-widest text-[#6B7A99]">Нэр</th>
                      <th className="pb-4 text-[10px] uppercase tracking-widest text-[#6B7A99]">Борлуулалт</th>
                      <th className="pb-4 text-[10px] uppercase tracking-widest text-[#6B7A99]">Зорилт</th>
                      <th className="pb-4 text-[10px] uppercase tracking-widest text-[#6B7A99]">Гүйцэтгэл</th>
                      <th className="pb-4 text-[10px] uppercase tracking-widest text-[#6B7A99]">Статус</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {employeeKPI.map((emp) => (
                      <tr key={emp.name} className="group hover:bg-white/5 transition-colors">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold">
                              {emp.name.charAt(0)}
                            </div>
                            <span className="text-sm font-medium">{emp.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-sm font-bold">{emp.sales}</td>
                        <td className="py-4 text-sm text-[#6B7A99]">{emp.target}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden min-w-[60px]">
                              <div 
                                className={`h-full bg-${emp.color === 'green' ? '[#10B981]' : emp.color === 'amber' ? '[#C49A3C]' : '[#EF4444]'}`} 
                                style={{ width: `${Math.min(emp.progress, 100)}%` }} 
                              />
                            </div>
                            <span className="text-[10px] font-bold">{emp.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                            emp.color === 'green' ? "text-[#10B981] bg-[#10B981]/10" : 
                            emp.color === 'amber' ? "text-[#C49A3C] bg-[#C49A3C]/10" : 
                            "text-[#EF4444] bg-[#EF4444]/10"
                          }`}>
                            ● {emp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Financial Overview */}
            <div className="lg:col-span-5 bg-[#111827]/60 backdrop-blur-xl border border-white/5 p-8 rounded-2xl">
              <h3 className="text-lg font-bold mb-8">Орлого & Зарлага</h3>
              <div className="space-y-6 mb-10">
                {financialSummary.map((item) => (
                  <div key={item.category}>
                    <div className="flex justify-between text-[10px] uppercase tracking-widest mb-2">
                      <span className="text-[#6B7A99]">{item.category}</span>
                      <span className="font-bold">{item.amount} ({item.percent}%)</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percent}%` }}
                        viewport={{ once: true }}
                        className="h-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Авлага", value: "₮42.1M", color: "red" },
                  { label: "Өглөг", value: "₮18.3M", color: "amber" },
                  { label: "Мөнгөн урсгал", value: "₮124M", color: "green" },
                  { label: "Ашиг", value: "₮186.3M", color: "gold" },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-[9px] uppercase tracking-widest text-[#6B7A99] mb-1">{stat.label}</p>
                    <p className={`text-sm font-bold ${
                      stat.color === 'gold' ? "text-[#C49A3C]" : 
                      stat.color === 'green' ? "text-[#10B981]" : 
                      stat.color === 'red' ? "text-[#EF4444]" : 
                      "text-[#C49A3C]"
                    }`}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity & AI Row */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Activity Feed */}
            <div className="lg:col-span-7 bg-[#111827]/60 backdrop-blur-xl border border-white/5 p-8 rounded-2xl">
              <h3 className="text-lg font-bold mb-8">Сүүлийн үйл ажиллагаа</h3>
              <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-white/5">
                {[
                  { text: "Захиалга #4521 баталгаажлаа", time: "2 минутын өмнө", icon: CheckCircle2, color: "green" },
                  { text: "Шинэ клиент бүртгэгдлээ", time: "15 минутын өмнө", icon: Sparkles, color: "gold" },
                  { text: "Төлбөр хугацаа хэтэрлээ", time: "1 цагийн өмнө", icon: AlertCircle, color: "red" },
                  { text: "Тайлан үүслээ", time: "3 цагийн өмнө", icon: BarChart3, color: "blue" },
                  { text: "Ажилтан нэмэгдлээ", time: "5 цагийн өмнө", icon: Users, color: "teal" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-6 relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-[#0D1526] border border-white/10 text-${activity.color === 'gold' ? '[#C49A3C]' : activity.color === 'blue' ? '[#3B82F6]' : activity.color === 'teal' ? '[#10B981]' : activity.color === 'red' ? '[#EF4444]' : '[#10B981]'}`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.text}</p>
                      <p className="text-[10px] text-[#6B7A99] mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="lg:col-span-5 bg-[#111827]/60 backdrop-blur-xl border border-[#C49A3C]/20 p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C49A3C]/5 rounded-full -mr-16 -mt-16 blur-3xl" />
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-[#C49A3C]/10">
                  <Sparkles className="w-5 h-5 text-[#C49A3C]" />
                </div>
                <h3 className="text-lg font-bold">◈ AI Зөвлөмж</h3>
              </div>
              <div className="space-y-4">
                {[
                  { title: "📈 Борлуулалт өнгөрсөн сараас 12.5%-иар өслөө. Гол шалтгаан: онлайн суваг", color: "gold" },
                  { title: "⚠️ 5 клиентийн төлбөр хугацаа хэтэрч байна. Яаралтай анхааруулга илгээх", color: "red" },
                  { title: "💡 Б.Мөнхбат ажилтан зорилтоо 113% биелүүллээ. Урамшуулал олгохыг зөвлөж байна", color: "teal" },
                ].map((insight, i) => (
                  <div key={i} className={`p-4 bg-white/5 rounded-xl border-l-4 border-${insight.color === 'gold' ? '[#C49A3C]' : insight.color === 'teal' ? '[#10B981]' : '[#EF4444]'}`}>
                    <p className="text-xs leading-relaxed mb-3">{insight.title}</p>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-[#C49A3C] hover:underline">Дэлгэрэнгүй →</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
