"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import InitiativeCard, { InitiativeCardProps } from "@/src/components/dashboard/InitiativeCard";
import { 
  Globe, CheckCircle2, BarChart3, Sparkles, TrendingUp, Search, 
  MapPin, Users, Target, HeartHandshake, ShieldCheck, X, 
  ExternalLink, BadgeCheck 
} from "lucide-react";

/* ── Mock Data for Active Initiatives ───────────────── */
const INITIATIVES: (InitiativeCardProps & { region: string; goal: string; audience: string; details: string })[] = [
  {
    id: 1,
    entityName: "جمعية البريد الخيرية",
    category: "تنمية بيئية",
    categoryColor: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/40",
    timestamp: "نشط الآن",
    title: "المبادرة الخضراء لغرس 1000 شجرة",
    description: "نسعى إلى تحويل الأحياء السكنية إلى بيئات خضراء مستدامة من خلال زراعة 1000 شجرة متنوعة بمشاركة المتطوعين والمجتمع المحلي على مدى ستة أشهر.",
    details: "تهدف هذه المبادرة إلى غرس الأشجار في الأرصفة والحدائق العامة لتعزيز الغطاء النباتي وتقليل درجات الحرارة داخل الأحياء السكنية. تشمل خطة العمل تجهيز شبكات ري ذكية وورش عمل بيئية للمتطوعين.",
    collected: 37500,
    target: 60000,
    avatarGradient: "from-emerald-200 to-teal-300",
    region: "الرياض",
    goal: "تنمية بيئية",
    audience: "المجتمع المحلي",
  },
  {
    id: 2,
    entityName: "مؤسسة الرحمة الإنسانية",
    category: "إسكان اجتماعي",
    categoryColor: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/40",
    timestamp: "نشط الآن",
    title: "ترميم وتجهيز 20 منزلاً للأسر الأشد حاجة",
    description: "مشروع متكامل لترميم وتأهيل المساكن المتهالكة لصالح 20 أسرة من الأشد احتياجاً، يشمل الأعمال الإنشائية والأثاث الأساسي وتجهيزات المطبخ.",
    details: "يركز هذا البرنامج على تحسين الظروف المعيشية للأسر الضمانية والأيتام من خلال صيانة الأسقف، معالجة الجدران، وتأمين الأجهزة الكهربائية والمستلزمات الضرورية لبناء مسكن آمن وصحي.",
    collected: 82000,
    target: 120000,
    avatarGradient: "from-blue-200 to-indigo-300",
    region: "مكة المكرمة",
    goal: "إسكان اجتماعي",
    audience: "أسر محتاجة",
  },
  {
    id: 3,
    entityName: "جمعية نقاء التنموية",
    category: "مياه وصحة",
    categoryColor: "bg-cyan-50 text-cyan-700 border-cyan-100 dark:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-900/40",
    timestamp: "نشط الآن",
    title: "سقيا الماء وحفر 5 آبار ارتوازية",
    description: "توفير مياه الشرب النظيفة للمناطق النائية عبر حفر 5 آبار ارتوازية وتركيب منظومات ضخ حديثة تخدم أكثر من 1200 مستفيد.",
    details: "يهدف المشروع إلى مكافحة الجفاف والأمراض الناتجة عن المياه الملوثة في القرى النائية. نقوم بحفر الآبار على أعماق مناسبة وتركيب مضخات تعمل بالطاقة الشمسية لضمان استدامة الخدمة.",
    collected: 15200,
    target: 85000,
    avatarGradient: "from-cyan-200 to-sky-300",
    region: "المنطقة الشرقية",
    goal: "مياه وصحة",
    audience: "سكان القرى",
  },
];

/* ── Mock Data for Completed Initiatives ────────────── */
const COMPLETED_INITIATIVES: (InitiativeCardProps & { region: string; goal: string; audience: string; details: string })[] = [
  {
    id: 101,
    entityName: "جمعية نقاء التنموية",
    category: "مياه وصحة",
    categoryColor: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/40",
    timestamp: "مكتملة - قيد المتابعة",
    title: "سقيا الماء بالخرج - توفير المياه لـ 50 عائلة",
    description: "تم حفر البئر الارتوازي وتركيب مضخات الطاقة الشمسية وتوصيل شبكة المياه لـ 50 عائلة بنجاح.",
    details: "يهدف هذا المشروع إلى توفير مياه الشرب النظيفة والمستدامة لخمسين عائلة من خلال حفر بئر ارتوازي وتجهيز مضخة تعمل بالطاقة الشمسية وتمديد شبكة توزيع المياه.",
    collected: 85000,
    target: 85000,
    avatarGradient: "from-emerald-205 to-teal-300",
    region: "الرياض",
    goal: "مياه وصحة",
    audience: "أسر محتاجة",
  },
  {
    id: 102,
    entityName: "جمعية البريد الخيرية",
    category: "تعليم",
    categoryColor: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/40",
    timestamp: "مكتملة - قيد المتابعة",
    title: "كفالة 3 طلاب علم متميزين جامعيًا",
    description: "تغطية كامل التكاليف الدراسية والمعيشية لـ 3 طلاب علم متميزين طوال مسيرتهم الجامعية.",
    details: "توفير الدعم التعليمي والمعيشي لثلاثة طلاب متميزين لمواصلة دراستهم الجامعية وتأمين كافة الاحتياجات الدراسية لتمكينهم من التفوق والتميز المهني.",
    collected: 45000,
    target: 45000,
    avatarGradient: "from-blue-200 to-indigo-300",
    region: "المنطقة الشرقية",
    goal: "تعليم",
    audience: "طلاب العلم",
  }
];

/* ── Initiative Details Modal ──────────────────────── */
function DetailModal({
  initiative,
  onClose,
  onDonateClick,
}: {
  initiative: typeof INITIATIVES[0];
  onClose: () => void;
  onDonateClick: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const pct = Math.min(Math.round((initiative.collected / initiative.target) * 100), 100);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[9999] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden text-right"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Top Header Banner */}
        <div className="h-4 bg-tanmawy-gradient w-full" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-all z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
          {/* Title Header */}
          <div className="space-y-2">
            <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full border ${initiative.categoryColor}`}>
              {initiative.category}
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100 leading-snug">
              {initiative.title}
            </h2>
            <div className="flex items-center gap-2 text-[13px] text-slate-500 dark:text-slate-400 font-semibold mt-1">
              <span className="flex items-center gap-1">
                {initiative.entityName}
                <BadgeCheck className="w-4 h-4 text-primary" strokeWidth={2.5} />
              </span>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-450">{initiative.timestamp}</span>
            </div>
          </div>

          {/* Details & Target Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 rounded-2xl p-4">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">المنطقة الجغرافية</span>
              <p className="text-[14px] font-black text-slate-800 dark:text-slate-200">{initiative.region}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">الفئة المستهدفة</span>
              <p className="text-[14px] font-black text-slate-800 dark:text-slate-200">{initiative.audience}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">الهدف الرئيسي</span>
              <p className="text-[14px] font-black text-slate-800 dark:text-slate-200">{initiative.goal}</p>
            </div>
          </div>

          {/* Detailed Paragraphs */}
          <div className="space-y-3">
            <h4 className="text-[15px] font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" /> تفاصيل المبادرة التنموية
            </h4>
            <p className="text-[14px] text-slate-600 dark:text-slate-350 leading-relaxed">
              {initiative.description}
            </p>
            <p className="text-[13.5px] text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3">
              {initiative.details}
            </p>
          </div>

          {/* Progress Bar Container */}
          <div className="space-y-3 bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="text-slate-500 dark:text-slate-400">التقدم التمويلي</span>
              <span className="text-primary font-black">{pct}% مكتمل</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700/60 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <div className="flex items-center justify-between text-[13px] pt-1">
              <div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 block">تم جمع</span>
                <span className="font-black text-slate-800 dark:text-slate-100">{initiative.collected.toLocaleString("ar-SA")} ر.س</span>
              </div>
              <div className="text-left">
                <span className="text-[11px] text-slate-400 dark:text-slate-500 block">المستهدف</span>
                <span className="font-bold text-slate-600 dark:text-slate-300">{initiative.target.toLocaleString("ar-SA")} ر.س</span>
              </div>
            </div>
          </div>

          {/* Verification & Official Rules */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30">
            <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" strokeWidth={2} />
            <p className="text-[11.5px] text-indigo-750 dark:text-indigo-400 leading-relaxed font-semibold">
              هذه المبادرة مرخصة رسمياً وتحت إشراف مباشر. تذهب كافة التبرعات والمساهمات مباشرة من خلال القنوات البنكية المعتمدة إلى الحساب الرسمي للكيان.
            </p>
          </div>

          {/* Action Row */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onDonateClick();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-tanmawy-gradient text-white text-[14px] font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <ExternalLink className="w-4 h-4" />
              المساهمة المباشرة في الدعم
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

/* ── Community Widgets (left column) ────────────────────── */
function CommunityWidgets() {
  const completedList = [
    { name: "تجهيز 50 شنطة رمضان", entity: "جمعية البر الخيري", progress: 100, badge: "مكتملة - قيد المتابعة" },
    { name: "سقيا الماء بالخارج", entity: "جمعية نقاء التنموية", progress: 100, badge: "مكتملة - قيد المتابعة" },
    { name: "كفالة طلاب علم متميزين", entity: "جمعية البريد الخيرية", progress: 100, badge: "مكتملة - قيد المتابعة" },
  ];

  return (
    <>
      {/* Completed Initiatives Widget */}
      <div className="bg-surface rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-white/5">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <h3 className="text-sm font-bold text-foreground">المبادرات المكتملة</h3>
        </div>
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {completedList.map((item) => (
            <li key={item.name} className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/[0.04] cursor-pointer transition-colors">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-[13px] font-semibold text-foreground leading-snug text-right">{item.name}</span>
                <span className="shrink-0 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-100/60 dark:border-emerald-900/30 whitespace-nowrap">{item.badge}</span>
              </div>
              <p className="text-[11px] text-muted-fg mb-2 text-right">بواسطة: {item.entity}</p>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `100%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* AI Insight */}
      <div className="bg-surface rounded-2xl border border-slate-200 dark:border-white/5 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-[18px] h-[18px] text-secondary shrink-0" strokeWidth={2.5} />
          <h3 className="text-sm font-bold text-foreground">رؤية تنموي AI</h3>
        </div>
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-xl p-3.5 text-right">
          <p className="text-[13px] text-slate-700 dark:text-slate-350 font-medium leading-relaxed">
            مبادرات المياه والتعليم حققت أعلى معدلات اكتمال هذا الأسبوع بفضل المساهمات المجتمعية النشطة.
          </p>
          <button className="mt-2 text-[11px] font-bold text-secondary hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            عرض التقارير الكاملة ←
          </button>
        </div>
      </div>

      {/* Community Stats */}
      <div className="bg-surface rounded-2xl border border-slate-200 dark:border-white/5 p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-[18px] h-[18px] text-primary shrink-0" strokeWidth={2} />
          <h3 className="text-sm font-bold text-foreground">إحصائيات المجتمع</h3>
        </div>
        <div className="space-y-2.5">
          {[
            { label: "كيانات نشطة", value: "142", color: "text-primary" },
            { label: "متبرعون مسجلون", value: "3,800+", color: "text-secondary" },
            { label: "مستفيد هذا الشهر", value: "920", color: "text-emerald-600 dark:text-emerald-455" },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-white/5 last:border-0">
              <span className="text-[12px] text-slate-500 dark:text-slate-400 font-medium">{label}</span>
              <span className="text-[14px] font-black">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Tabs ─────────────────────────────────────────────── */
const TABS = [
  { id: "all",       label: "كل المبادرات",     icon: Globe  },
  { id: "completed", label: "المبادرات المكتملة", icon: CheckCircle2 },
  { id: "impact",    label: "تقارير الأثر",     icon: BarChart3 },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* ── Page ─────────────────────────────────────────────── */
export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [selectedInitiative, setSelectedInitiative] = useState<typeof INITIATIVES[0] | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [audienceFilter, setAudienceFilter] = useState("all");
  const [goalFilter, setGoalFilter] = useState("all");

  const filteredInitiatives = INITIATIVES.filter((item) => {
    const matchesSearch = item.title.includes(searchQuery) || item.description.includes(searchQuery) || item.entityName.includes(searchQuery);
    const matchesRegion = regionFilter === "all" || item.region === regionFilter;
    const matchesAudience = audienceFilter === "all" || item.audience === audienceFilter;
    const matchesGoal = goalFilter === "all" || item.goal === goalFilter;
    return matchesSearch && matchesRegion && matchesAudience && matchesGoal;
  });

  return (
    <DashboardLayout widgets={<CommunityWidgets />}>
      {/* ── Page Header ── */}
      <div className="px-5 pt-5 pb-4 border-b border-border">
        <h1 className="text-[20px] font-black text-slate-900 dark:text-slate-100 leading-tight">
          مجتمع تنموي
        </h1>
        <p className="text-[13px] text-slate-500 dark:text-slate-455 mt-0.5 leading-relaxed font-semibold">
          استكشف المبادرات التنموية المعتمدة وتابع أثر تبرعك
        </p>
      </div>

      {/* ── Tab Bar ── */}
      <div className="flex border-b border-border sticky top-[50px] z-20 bg-surface/85 backdrop-blur-xl">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 flex items-center justify-center gap-1.5 py-3.5 text-[13px] font-semibold transition-colors duration-155 cursor-pointer ${
                isActive ? "text-primary font-bold" : "text-muted-fg hover:bg-slate-50 dark:hover:bg-white/[0.06] hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 right-1/2 translate-x-1/2 h-[2.5px] w-10 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Filter Bar ── */}
      {activeTab === "all" && (
        <div className="p-4 border-b border-border bg-slate-50/50 dark:bg-slate-900/20 space-y-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="ابحث عن مبادرة أو جهة تنموية..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-surface text-[14px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-655 outline-none focus:border-teal-400 dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-950/20 transition-all"
            />
          </div>

          {/* Select Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Region */}
            <div className="relative flex items-center">
              <MapPin className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full pr-9 pl-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-surface text-[12.5px] text-slate-700 dark:text-slate-355 font-semibold outline-none appearance-none cursor-pointer focus:border-teal-400 dark:focus:border-teal-500"
              >
                <option value="all">كل المناطق الجغرافية</option>
                <option value="الرياض">الرياض</option>
                <option value="مكة المكرمة">مكة المكرمة</option>
                <option value="المنطقة الشرقية">المنطقة الشرقية</option>
                <option value="عسير">عسير</option>
              </select>
            </div>

            {/* Audience */}
            <div className="relative flex items-center">
              <Users className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                value={audienceFilter}
                onChange={(e) => setAudienceFilter(e.target.value)}
                className="w-full pr-9 pl-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-surface text-[12.5px] text-slate-700 dark:text-slate-355 font-semibold outline-none appearance-none cursor-pointer focus:border-teal-400 dark:focus:border-teal-500"
              >
                <option value="all">كل الفئات المستهدفة</option>
                <option value="أسر محتاجة">أسر محتاجة</option>
                <option value="المجتمع المحلي">المجتمع المحلي</option>
                <option value="سكان القرى">سكان القرى</option>
              </select>
            </div>

            {/* Goals */}
            <div className="relative flex items-center">
              <Target className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                value={goalFilter}
                onChange={(e) => setGoalFilter(e.target.value)}
                className="w-full pr-9 pl-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-surface text-[12.5px] text-slate-700 dark:text-slate-355 font-semibold outline-none appearance-none cursor-pointer focus:border-teal-400 dark:focus:border-teal-500"
              >
                <option value="all">كل الأهداف والبرامج</option>
                <option value="مياه وصحة">مياه وصحة</option>
                <option value="إسكان اجتماعي">إسكان اجتماعي</option>
                <option value="تنمية بيئية">تنمية بيئية</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ── Cards Grid ── */}
      <div className="p-4">
        {activeTab === "all" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredInitiatives.map((initiative) => (
                <InitiativeCard 
                  key={initiative.id} 
                  {...initiative} 
                  onCardClick={() => setSelectedInitiative(initiative)} 
                />
              ))}
            </div>
            {filteredInitiatives.length === 0 && (
              <EmptyState message="لم نجد أي مبادرات تطابق الفلاتر المحددة" />
            )}
          </>
        )}

        {activeTab === "completed" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPLETED_INITIATIVES.map((initiative) => (
              <InitiativeCard 
                key={initiative.id} 
                {...initiative} 
                onCardClick={() => setSelectedInitiative(initiative as any)} 
              />
            ))}
          </div>
        )}

        {activeTab === "impact" && (
          <div className="space-y-4">
            <ImpactReport />
          </div>
        )}
      </div>

      {/* ── Details Modal Portal rendering ─────────── */}
      {isMounted && selectedInitiative && (
        <AnimatePresence>
          <DetailModal
            initiative={selectedInitiative}
            onClose={() => setSelectedInitiative(null)}
            onDonateClick={() => {
              // Trigger payment portal simulator inside card or mock
              alert("سيتم نقلك للبوابة الرسمية لإتمام الدعم.");
            }}
          />
        </AnimatePresence>
      )}
    </DashboardLayout>
  );
}

/* ── Empty State ─────────────────────────────────────── */
function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
        <Globe className="w-8 h-8 text-slate-300 dark:text-slate-655" strokeWidth={1.5} />
      </div>
      <p className="text-[14px] font-semibold text-slate-400 dark:text-slate-500">{message}</p>
    </div>
  );
}

/* ── Personalized Impact Report ──────────────────────── */
function ImpactReport() {
  const stats = [
    { label: "مساهماتك المكتملة", value: "٢ مبادرتين", color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/40" },
    { label: "أفراد تم مساعدتهم",   value: "+٢٥٠ فرداً", color: "text-primary bg-primary/5 dark:bg-primary/10 border-primary/10 dark:border-primary/20" },
    { label: "إجمالي مساهماتك",   value: "١,٥٠٠ ر.س", color: "text-secondary bg-secondary/5 dark:bg-secondary/10 border-secondary/10 dark:border-secondary/20" },
  ];

  const contributions = [
    {
      title: "سقيا الماء بالخرج — حفر بئر ارتوازي وتمديد شبكة مياه",
      entity: "جمعية نقاء التنموية",
      donation: "٥٠٠ ر.س",
      achievement: "توفير المياه النظيفة لـ ٥٠ عائلة (أكثر من ٢٠٠ فرد) بشكل مستدام وصحي.",
      date: "تمت المساهمة في مارس ٢٠٢٦",
    },
    {
      title: "كفالة ٣ طلاب علم متميزين جامعيًا طوال سنوات دراستهم",
      entity: "جمعية البريد الخيرية",
      donation: "١,٠٠٠ ر.س",
      achievement: "تأمين السكن والرسوم الجامعية لثلاثة طلاب متميزين لمواصلة تفوقهم الأكاديمي.",
      date: "تمت المساهمة في يناير ٢٠٢٦",
    }
  ];

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Overview Block */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-border bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-black text-slate-900 dark:text-slate-100">سجل الأثر الخاص بك</h3>
            <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5">تقارير أثر تبرعاتك ومساهماتك الشخصية</p>
          </div>
          <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full uppercase tracking-wider">نشط</span>
        </div>
        
        <div className="p-5 grid grid-cols-3 gap-3">
          {stats.map(({ label, value, color }) => (
            <div key={label} className={`flex flex-col items-center gap-1 px-3 py-4 rounded-xl border ${color}`}>
              <span className="text-[17px] font-black leading-none">{value}</span>
              <span className="text-[10px] font-bold text-center leading-tight opacity-70 mt-1">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contributions Achievements List */}
      <div>
        <h4 className="text-[14px] font-black text-slate-900 dark:text-slate-150 mb-3 px-1">تفاصيل نتائج مساهماتك</h4>
        <div className="space-y-4">
          {contributions.map((c, i) => (
            <div key={i} className="bg-surface border border-border rounded-2xl p-5 hover:shadow-md transition-shadow relative">
              {/* Header */}
              <div className="flex justify-between items-start gap-3 mb-3">
                <div>
                  <h5 className="text-[14px] font-black text-slate-900 dark:text-slate-100 leading-snug">{c.title}</h5>
                  <p className="text-[11.5px] text-slate-400 dark:text-slate-550 mt-0.5 font-semibold">الجهة المشرفة: {c.entity}</p>
                </div>
                <span className="shrink-0 text-[11px] font-bold text-emerald-600 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 px-2 py-0.5 rounded-full">
                  مكتمل ومفعّل
                </span>
              </div>

              {/* Achievement Result Box */}
              <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-white/5 rounded-xl p-3.5 text-right space-y-1">
                <span className="text-[10px] font-bold text-slate-455 dark:text-slate-550">الأثر الحقيقي لمساهمتك:</span>
                <p className="text-[13px] text-slate-800 dark:text-slate-200 font-bold leading-relaxed">
                  {c.achievement}
                </p>
              </div>

              {/* Footer info */}
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100 dark:border-white/5 text-[11px] text-slate-400 dark:text-slate-550 font-semibold">
                <span>قيمة دعمك: <strong className="text-primary font-bold">{c.donation}</strong></span>
                <span>{c.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certification Badge */}
      <div className="flex items-start gap-2.5 p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30">
        <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" strokeWidth={2} />
        <div>
          <p className="text-[12px] text-indigo-750 dark:text-indigo-400 font-bold leading-relaxed">
            شهادة أثر معتمدة وموثقة
          </p>
          <p className="text-[11px] text-indigo-650 dark:text-indigo-400 mt-0.5 leading-relaxed font-semibold">
            جميع البيانات المذكورة أعلاه مصدقة بالكامل وتخضع لمعايير الحوكمة والتحقق من الأثر لدى وزارة الموارد البشرية والمركز الوطني لتنمية القطاع غير الربحي.
          </p>
        </div>
      </div>
    </div>
  );
}
