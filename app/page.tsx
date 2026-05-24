"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import PostCard from "@/src/components/dashboard/PostCard";
import InitiativeCard from "@/src/components/dashboard/InitiativeCard";
import { 
  Image as ImageIcon, Sparkles, MapPin, BarChart2, BadgeCheck, 
  Target, X, ShieldCheck, ExternalLink, Calendar, Users, HeartHandshake
} from "lucide-react";
import { useUserStore } from "@/src/store/useUserStore";

/* ── Cleaned up Feed Posts ───────────────────────── */
const FEED_POSTS = [
  {
    id: 2,
    author: "أحمد عبد العزيز",
    role: "داعم فضي",
    time: "٥ س",
    category: "كيان جديد",
    categoryColor: "bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
    content: "يسعدني الإعلان عن ترخيص كيان «روافد للتمكين والتدريب» رسمياً اليوم! الكيان سيقدم برامج تأهيل مهني للشباب والشابات على مدار العام القادم. 🎉",
    likes: 542, comments: 95, reposts: 124,
    avatarGradient: "from-blue-200 to-indigo-300",
  },
  {
    id: 4,
    author: "محمد الشهري",
    role: "مؤسس",
    time: "يومان",
    content: "سؤال للمجتمع 🧵\n\nما أكثر تحدٍّ واجهتموه عند إنشاء الكيانات التنموية؟\n\nأعمل على تقرير شامل وأريد أن يعكس تجاربكم الحقيقية على الأرض.",
    likes: 758, comments: 231, reposts: 97,
    avatarGradient: "from-amber-200 to-orange-300",
  },
  {
    id: 5,
    author: "نورة الحربي",
    role: "متطوعة نشطة",
    time: "٣ أيام",
    category: "قصة نجاح",
    categoryColor: "bg-rose-500/10 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
    content: "بعد 6 أشهر من الانضمام لمجتمع تنموي، تمكنت من تحويل فكرة بسيطة إلى مشروع يخدم 300 أسرة في حيّي 💚\n\nالشكر لكل من آمن بي في هذه الرحلة الجميلة 🙏",
    likes: 4200, comments: 318, reposts: 892,
    avatarGradient: "from-rose-200 to-pink-300",
  },
];

/* ── Mock Active Initiatives for Grid ─────────────── */
const MOCK_INITIATIVES = [
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
    audience: "المجتمع المحلي"
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
    audience: "أسر محتاجة"
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
    audience: "سكان القرى"
  },
];

/* ── Initiative Details Modal ──────────────────────── */
function DetailModal({
  initiative,
  onClose,
  onDonateClick,
}: {
  initiative: typeof MOCK_INITIATIVES[0];
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
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-[14px] font-semibold text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              رجوع
            </button>
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

export default function Home() {
  const [postText, setPostText] = useState("");
  const { isFounder } = useUserStore();
  const [activeTab, setActiveTab] = useState<"feed" | "initiatives">("feed");
  const [selectedInitiative, setSelectedInitiative] = useState<typeof MOCK_INITIATIVES[0] | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const COMPOSER_ACTIONS = [
    { icon: ImageIcon,  label: "صورة",    color: "text-primary  hover:bg-primary/10"  },
    { icon: BarChart2,  label: "استطلاع", color: "text-primary  hover:bg-primary/10"  },
    { icon: MapPin,     label: "موقع",    color: "text-primary  hover:bg-primary/10"  },
    ...(isFounder ? [{ icon: Target, label: "إرفاق مبادرة", color: "text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/20" }] : []),
    { icon: Sparkles,   label: "تنموي AI",color: "text-secondary hover:bg-secondary/10" },
  ];

  return (
    <DashboardLayout>
      {/* ── Tabs Bar ── */}
      <div className="flex border-b border-border sticky top-[50px] z-20 bg-surface/85 backdrop-blur-xl">
        <button
          onClick={() => setActiveTab("feed")}
          className={`relative flex-1 py-3.5 text-[14.5px] font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === "feed" ? "text-primary" : "text-muted-fg hover:text-slate-700 dark:hover:text-slate-200"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          آخر الأخبار والمجتمع
          {activeTab === "feed" && (
            <motion.span
              layoutId="feed-tab-indicator"
              className="absolute bottom-0 right-1/2 translate-x-1/2 h-[3px] w-12 bg-primary rounded-full"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("initiatives")}
          className={`relative flex-1 py-3.5 text-[14.5px] font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === "initiatives" ? "text-primary" : "text-muted-fg hover:text-slate-700 dark:hover:text-slate-200"
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          المبادرات النشطة
          {activeTab === "initiatives" && (
            <motion.span
              layoutId="feed-tab-indicator"
              className="absolute bottom-0 right-1/2 translate-x-1/2 h-[3px] w-12 bg-primary rounded-full"
            />
          )}
        </button>
      </div>

      {activeTab === "feed" ? (
        <>
          {/* ── Composer ───────────────────────────── */}
          <div className="border-b border-border px-4 pt-4 pb-3">
            <form onSubmit={(e) => { e.preventDefault(); setPostText(""); }}>
              <div className="flex gap-3">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center ring-1 ring-border">
                    <span className="text-[13px] font-bold text-foreground">ع</span>
                  </div>
                  {isFounder && (
                    <div className="absolute -bottom-1 -right-1 bg-surface rounded-full p-0.5 shadow-sm">
                      <BadgeCheck className="w-3.5 h-3.5 text-teal-500" strokeWidth={2.5} />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Textarea */}
                  <textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder={isFounder ? "شارك آخر أخبار كيانك، أو أطلق مبادرة جديدة..." : "ما الذي يدور في ذهنك؟ شارك فكرة أو مقترحاً..."}
                    rows={2}
                    className="w-full resize-none text-[15px] text-foreground
                      placeholder:text-muted-fg bg-transparent border-none outline-none
                      leading-relaxed text-right pt-1.5 pb-0"
                  />

                  {/* Composer Footer Actions */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-0.5 -ml-2">
                      {COMPOSER_ACTIONS.map(({ icon: Icon, label, color }) => (
                        <button
                          key={label}
                          type="button"
                          aria-label={label}
                          className={`flex items-center justify-center w-9 h-9 rounded-full ${color} transition-colors`}
                        >
                          <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      {postText.length > 0 && (
                        <span className={`text-xs font-medium tabular-nums ${postText.length > 260 ? "text-rose-500" : "text-muted-fg"}`}>
                          {280 - postText.length}
                        </span>
                      )}
                      <button
                        type="submit"
                        disabled={!postText.trim() || postText.length > 280}
                        className="px-5 py-2 rounded-full text-[15px] font-bold text-white
                          bg-tanmawy-gradient transition-all duration-150
                          disabled:bg-none disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:shadow-none disabled:opacity-70 disabled:cursor-not-allowed
                          shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                      >
                        نشر
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* ── Feed List ──────────────────────────── */}
          {FEED_POSTS.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </>
      ) : (
        /* ── Grid of Initiative Cards ───────────────── */
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_INITIATIVES.map((init) => (
            <InitiativeCard 
              key={init.id} 
              {...init} 
              onCardClick={() => setSelectedInitiative(init)} 
            />
          ))}
        </div>
      )}

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
