"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import InitiativeCard from "@/src/components/dashboard/InitiativeCard";
import { useUserStore } from "@/src/store/useUserStore";
import {
  BadgeCheck, Pencil, MapPin, Mail, Calendar,
  Heart, MessageCircle, Share2, CheckCircle2,
} from "lucide-react";

/* ── Animation ───────────────────────────────────────── */
function fadeUpProps(i = 0) {
  return {
    initial: { opacity: 0, y: 14 } as const,
    animate: { opacity: 1, y: 0 } as const,
    transition: { duration: 0.32, delay: i * 0.06 },
  };
}

/* ── Mock Data ───────────────────────────────────────── */
const FOUNDER_INITIATIVES = [
  {
    id: 1,
    entityName: "جمعية نقاء التنموية",
    category: "مياه وصحة",
    categoryColor: "bg-cyan-50 text-cyan-700 border-cyan-100",
    timestamp: "نشط الآن",
    title: "سقيا الماء وحفر 5 آبار ارتوازية",
    description: "توفير مياه الشرب النظيفة للمناطق النائية عبر حفر 5 آبار ارتوازية.",
    collected: 15200,
    target: 85000,
    avatarGradient: "from-cyan-200 to-teal-300",
  },
  {
    id: 2,
    entityName: "جمعية نقاء التنموية",
    category: "تعليم",
    categoryColor: "bg-amber-50 text-amber-700 border-amber-100",
    timestamp: "نشط الآن",
    title: "كفالة 100 طالب علم متميز",
    description: "برنامج لكفالة الطلاب المتفوقين من الأسر المحتاجة وتأمين مستقبلهم الأكاديمي.",
    collected: 35000,
    target: 50000,
    avatarGradient: "from-amber-200 to-yellow-300",
  },
];

const FOUNDER_POSTS = [
  {
    id: 1,
    content: "تنموي يسعدنا الإعلان عن اكتمال المرحلة الأولى من مشروع سقيا الماء بنجاح 🌊\nتم حفر بئر ارتوازية في منطقة الخرج وتمديد شبكة المياه لـ 240 مستفيداً.\nشكراً لكل داعم ومتبرع كريم!",
    time: "منذ ساعتين",
    likes: 142,
    comments: 28,
  },
  {
    id: 2,
    content: "إطلاق برنامج كفالة الطلاب للفصل الدراسي الثاني 📚\nنبحث عن 50 داعماً يمكّنون طلاباً متميزين من إكمال دراستهم.\nانضم إلينا ودعم المستقبل.",
    time: "منذ يومين",
    likes: 89,
    comments: 15,
  },
];

const USER_POSTS = [
  {
    id: 1,
    content: "شاركت اليوم في مشروع سقيا الماء وكان تجربة رائعة 💧\nنسينا أن الماء نعمة حتى نرى من يفتقدها. أحثّكم على المشاركة!",
    time: "منذ 3 أيام",
    likes: 31,
    comments: 7,
  },
  {
    id: 2,
    content: "أنهيت 24 ساعة تطوع هذا الشهر 🌱\nكل ساعة صغيرة نمنحها لخدمة الآخرين هي استثمار في مجتمع أفضل. ما الذي تطوعتَ به اليوم؟",
    time: "منذ أسبوع",
    likes: 54,
    comments: 11,
  },
];

const USER_SUPPORTED = [
  { id: 1, title: "المبادرة الخضراء لغرس 1000 شجرة", entity: "جمعية البريد الخيرية", amount: "200 ر.س", category: "تنمية بيئية" },
  { id: 2, title: "سقيا الماء وحفر 5 آبار ارتوازية", entity: "جمعية نقاء التنموية", amount: "500 ر.س", category: "مياه وصحة" },
  { id: 3, title: "ترميم 20 منزلاً للأسر الأشد حاجة", entity: "مؤسسة الرحمة الإنسانية", amount: "1,000 ر.س", category: "إسكان اجتماعي" },
];

/* ── Mini Post Card ──────────────────────────────────── */
function MiniPost({ post, isFounder }: {
  post: { id: number; content: string; time: string; likes: number; comments: number };
  isFounder: boolean;
}) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-white/5 rounded-2xl p-5">
      {isFounder && (
        <span className="inline-block text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full mb-3">
          تحديث رسمي
        </span>
      )}
      <p className="text-[14px] text-slate-800 dark:text-slate-200 leading-[1.7] whitespace-pre-line mb-4">{post.content}</p>
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-3">
        <span className="text-[12px] text-slate-400">{post.time}</span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLiked(l => !l)}
            className={`flex items-center gap-1.5 text-[13px] font-semibold transition-colors ${liked ? "text-rose-500" : "text-slate-400 hover:text-rose-500"}`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-rose-500" : ""}`} strokeWidth={2} />
            {post.likes + (liked ? 1 : 0)}
          </button>
          <button className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-400 hover:text-primary transition-colors">
            <MessageCircle className="w-4 h-4" strokeWidth={2} />
            {post.comments}
          </button>
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <Share2 className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Supported Initiative Card ───────────────────────── */
function SupportedCard({ item }: { item: typeof USER_SUPPORTED[0] }) {
  return (
    <div className="bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-white/5 rounded-2xl p-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-5 h-5 text-primary" strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0 text-right">
        <p className="text-[14px] font-bold text-slate-900 dark:text-slate-100 leading-snug truncate">{item.title}</p>
        <p className="text-[12px] text-slate-400 mt-0.5">{item.entity}</p>
      </div>
      <div className="shrink-0 text-right">
        <span className="block text-[13px] font-black text-primary">{item.amount}</span>
        <span className="inline-block mt-0.5 text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40 px-2 py-0.5 rounded-full">
          تم الدعم ✓
        </span>
      </div>
    </div>
  );
}

/* ── About Section ───────────────────────────────────── */
function AboutSection({ isFounder }: { isFounder: boolean }) {
  const founderInfo = [
    { icon: Mail, label: "البريد الرسمي", value: "info@naqa-charity.org.sa" },
    { icon: MapPin, label: "المقر الرئيسي", value: "الرياض، المملكة العربية السعودية" },
    { icon: Calendar, label: "تاريخ التأسيس", value: "2021 • رقم الترخيص: SA-10293" },
  ];
  const userInfo = [
    { icon: Mail, label: "البريد الإلكتروني", value: "abdulaziz.q@email.com" },
    { icon: MapPin, label: "الموقع", value: "الرياض، المملكة العربية السعودية" },
    { icon: Calendar, label: "تاريخ الانضمام", value: "مارس 2026" },
  ];
  const info = isFounder ? founderInfo : userInfo;

  return (
    <div className="bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-white/5 rounded-2xl p-6 space-y-5">
      <div>
        <h3 className="text-[14px] font-black text-slate-900 dark:text-slate-100 mb-2">النبذة التعريفية</h3>
        <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed">
          {isFounder
            ? "جمعية نقاء التنموية كيان خيري مرخص من وزارة الموارد البشرية، تأسست عام 2021 بهدف تمكين الأسر المحتاجة وتعزيز التنمية المستدامة في المناطق النائية. نعمل في مجالات المياه، التعليم، والإسكان الاجتماعي."
            : "مهتم بالعمل التطوعي والتنمية البيئية. أسعى لترك أثر إيجابي في مجتمعي من خلال دعم المبادرات التنموية والمشاركة الفاعلة في برامج التطوع المحلية."
          }
        </p>
      </div>
      <div className="border-t border-slate-100 dark:border-white/5 pt-5 space-y-3.5">
        {info.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" strokeWidth={2} />
            </div>
            <div className="text-right">
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold">{label}</p>
              <p className="text-[13px] text-slate-800 dark:text-slate-200 font-semibold">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────── */
export default function ProfilePage() {
  const { isFounder } = useUserStore();
  const [activeTab, setActiveTab] = useState<"posts" | "initiatives" | "about">("posts");

  const TABS = [
    { id: "posts" as const, label: "المنشورات" },
    { id: "initiatives" as const, label: "المبادرات" },
    { id: "about" as const, label: "حول" },
  ];

  const stats = isFounder
    ? [
        { label: "مبادرة نشطة", value: "12" },
        { label: "مستفيد", value: "450+" },
        { label: "مؤشر الشفافية", value: "98%" },
      ]
    : [
        { label: "مبادرات مدعومة", value: "5" },
        { label: "ساعات تطوع", value: "24" },
        { label: "نقاط الأثر", value: "1,200" },
      ];

  const coverClass = isFounder
    ? "bg-gradient-to-l from-teal-400 via-primary to-emerald-500"
    : "bg-gradient-to-l from-indigo-400 via-secondary to-blue-500";

  return (
    <DashboardLayout>
      {/* ── Cover Photo ── */}
      <div className={`relative h-48 md:h-56 ${coverClass} rounded-b-3xl overflow-hidden`}>
        {/* Subtle noise overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E\")"
          }}
        />
        {/* Edit cover button */}
        <button className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white text-[12px] font-semibold rounded-full transition-colors">
          <Pencil className="w-3 h-3" />
          تعديل الغلاف
        </button>
      </div>

      {/* ── Avatar row ── */}
      <div className="px-5 relative">
        <div className="flex items-end justify-between -mt-16 md:-mt-20 mb-4">
          {/* Avatar */}
          <div className="relative">
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-slate-900 shadow-lg ${
              isFounder ? "bg-gradient-to-br from-teal-200 to-primary" : "bg-gradient-to-br from-indigo-200 to-secondary"
            } flex items-center justify-center`}>
              <span className="text-3xl md:text-4xl font-black text-white select-none">
                {isFounder ? "ن" : "ع"}
              </span>
            </div>
            {isFounder && (
              <div className="absolute -bottom-1 -left-1 w-7 h-7 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
                <BadgeCheck className="w-5 h-5 text-primary" strokeWidth={2.5} />
              </div>
            )}
          </div>

          {/* Edit Profile button */}
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-[13px] font-bold text-slate-700 dark:text-slate-350 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors shadow-sm mb-2">
            <Pencil className="w-3.5 h-3.5" strokeWidth={2} />
            تعديل الملف
          </button>
        </div>

        {/* ── Profile Info ── */}
        <motion.div {...fadeUpProps(0)}>
          {/* Name */}
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-[20px] font-black text-slate-900 dark:text-slate-100">
              {isFounder ? "جمعية نقاء التنموية" : "عبدالعزيز القحطاني"}
            </h1>
            {isFounder && <BadgeCheck className="w-5 h-5 text-primary shrink-0" strokeWidth={2.5} />}
          </div>

          {/* Bio */}
          <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
            {isFounder
              ? "جمعية مرخصة تسعى لتمكين الأسر المحتاجة وتعزيز التنمية المستدامة."
              : "مهتم بالعمل التطوعي والتنمية البيئية. أسعى لترك أثر إيجابي."}
          </p>

          {/* Metadata */}
          <p className="text-[12px] text-slate-400 dark:text-slate-500 font-medium mb-5">
            {isFounder ? "رقم الترخيص: 10293 • تأسست 2021" : "انضم في مارس 2026"}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {stats.map(({ label, value }) => (
              <div key={label} className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-2xl px-3 py-3.5 text-center">
                <p className={`text-[20px] font-black leading-tight mb-0.5 ${isFounder ? "text-primary" : "text-secondary"}`}>
                  {value}
                </p>
                <p className="text-[11px] text-slate-500 font-semibold leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Tabs ── */}
        <div className="flex border-b border-slate-200 dark:border-white/5 mb-5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 py-3 text-[14px] font-bold transition-colors ${
                activeTab === tab.id
                  ? "text-primary"
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute bottom-0 right-1/2 translate-x-1/2 h-[2.5px] w-10 bg-primary rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="pb-8 space-y-4"
          >
            {/* POSTS */}
            {activeTab === "posts" && (
              <>
                {(isFounder ? FOUNDER_POSTS : USER_POSTS).map((post) => (
                  <MiniPost key={post.id} post={post} isFounder={isFounder} />
                ))}
              </>
            )}

            {/* INITIATIVES */}
            {activeTab === "initiatives" && (
              <>
                {isFounder ? (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-bold text-slate-400">
                        {FOUNDER_INITIATIVES.length} مبادرة نشطة
                      </span>
                    </div>
                    {FOUNDER_INITIATIVES.map((init) => (
                      <InitiativeCard key={init.id} {...init} />
                    ))}
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-bold text-slate-400">
                        دعمت {USER_SUPPORTED.length} مبادرات
                      </span>
                    </div>
                    {USER_SUPPORTED.map((item) => (
                      <SupportedCard key={item.id} item={item} />
                    ))}
                  </>
                )}
              </>
            )}

            {/* ABOUT */}
            {activeTab === "about" && <AboutSection isFounder={isFounder} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
