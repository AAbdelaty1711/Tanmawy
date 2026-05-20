"use client";

import React, { useState } from "react";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import InitiativeCard, { InitiativeCardProps } from "@/src/components/dashboard/InitiativeCard";
import { Globe, Flame, BarChart3, Sparkles, TrendingUp } from "lucide-react";

/* ── Mock Data ───────────────────────────────────────── */
const INITIATIVES: InitiativeCardProps[] = [
  {
    id: 1,
    entityName: "جمعية البريد الخيرية",
    category: "تنمية بيئية",
    categoryColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
    timestamp: "نشط الآن",
    title: "المبادرة الخضراء لغرس 1000 شجرة",
    description:
      "نسعى إلى تحويل الأحياء السكنية إلى بيئات خضراء مستدامة من خلال زراعة 1000 شجرة متنوعة بمشاركة المتطوعين والمجتمع المحلي على مدى ستة أشهر.",
    collected: 37500,
    target: 60000,
    avatarGradient: "from-emerald-200 to-teal-300",
  },
  {
    id: 2,
    entityName: "مؤسسة الرحمة الإنسانية",
    category: "إسكان اجتماعي",
    categoryColor: "bg-blue-50 text-blue-700 border-blue-100",
    timestamp: "نشط الآن",
    title: "ترميم وتجهيز 20 منزلاً للأسر الأشد حاجة",
    description:
      "مشروع متكامل لترميم وتأهيل المساكن المتهالكة لصالح 20 أسرة من الأشد احتياجاً، يشمل الأعمال الإنشائية والأثاث الأساسي وتجهيزات المطبخ.",
    collected: 82000,
    target: 120000,
    avatarGradient: "from-blue-200 to-indigo-300",
  },
  {
    id: 3,
    entityName: "جمعية نقاء التنموية",
    category: "مياه وصحة",
    categoryColor: "bg-cyan-50 text-cyan-700 border-cyan-100",
    timestamp: "نشط الآن",
    title: "سقيا الماء وحفر 5 آبار ارتوازية",
    description:
      "توفير مياه الشرب النظيفة للمناطق النائية عبر حفر 5 آبار ارتوازية وتركيب منظومات ضخ حديثة تخدم أكثر من 1200 مستفيد.",
    collected: 15200,
    target: 85000,
    avatarGradient: "from-cyan-200 to-sky-300",
  },
];

/* ── Community Widgets (left column) ────────────────────── */
function CommunityWidgets() {
  const urgent = [
    { name: "كفالة 100 طالب علم متميز", entity: "جمعية البريد", progress: 35 },
    { name: "سقيا الماء — 5 آبار ارتوازية", entity: "جمعية نقاء", progress: 18 },
    { name: "ترميم 20 منزلاً للأسر الأشد حاجة", entity: "مؤسسة الرحمة", progress: 68 },
  ];

  return (
    <>
      {/* Urgent Initiatives */}
      <div className="bg-surface rounded-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
          </span>
          <h3 className="text-sm font-bold text-foreground">مبادرات عاجلة</h3>
        </div>
        <ul className="divide-y divide-slate-100">
          {urgent.map((item) => (
            <li key={item.name} className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors">
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-[13px] font-semibold text-foreground leading-snug text-right">{item.name}</span>
                <span className="shrink-0 text-[11px] font-bold text-rose-500 whitespace-nowrap">متبقي {100 - item.progress}%</span>
              </div>
              <p className="text-[11px] text-muted-fg mb-2 text-right">بواسطة: {item.entity}</p>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${item.progress}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* AI Insight */}
      <div className="bg-surface rounded-2xl border border-slate-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-[18px] h-[18px] text-secondary shrink-0" strokeWidth={2.5} />
          <h3 className="text-sm font-bold text-foreground">رؤية تنموي AI</h3>
        </div>
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3.5 text-right">
          <p className="text-[13px] text-slate-700 font-medium leading-relaxed">
            مبادرات المياه تحتاج اهتماماً أكثر هذا الشهر — التمويل أقل من 20% من المستهدف.
          </p>
          <button className="mt-2 text-[11px] font-bold text-secondary hover:text-indigo-600 transition-colors">
            عرض المقترحات ←
          </button>
        </div>
      </div>

      {/* Community Stats */}
      <div className="bg-surface rounded-2xl border border-slate-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-[18px] h-[18px] text-primary shrink-0" strokeWidth={2} />
          <h3 className="text-sm font-bold text-foreground">إحصائيات المجتمع</h3>
        </div>
        <div className="space-y-2.5">
          {[
            { label: "كيانات نشطة", value: "142", color: "text-primary" },
            { label: "متبرعون مسجلون", value: "3,800+", color: "text-secondary" },
            { label: "مستفيد هذا الشهر", value: "920", color: "text-emerald-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
              <span className="text-[12px] text-slate-500 font-medium">{label}</span>
              <span className={`text-[14px] font-black ${color}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Tabs ─────────────────────────────────────────────── */
const TABS = [
  { id: "all",    label: "كل المبادرات",   icon: Globe  },
  { id: "urgent", label: "مبادرات عاجلة",  icon: Flame, urgent: true },
  { id: "impact", label: "تقارير الأثر",   icon: BarChart3 },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* ── Page ─────────────────────────────────────────────── */
export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<TabId>("all");

  return (
    <DashboardLayout widgets={<CommunityWidgets />}>
      {/* ── Page Header ── */}
      <div className="px-5 pt-5 pb-4 border-b border-border">
        <h1 className="text-[20px] font-black text-slate-900 leading-tight">
          مجتمع تنموي
        </h1>
        <p className="text-[13px] text-slate-500 mt-0.5 leading-relaxed">
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
              className={`relative flex-1 flex items-center justify-center gap-1.5 py-3 text-[13px] font-semibold transition-colors duration-150 ${
                isActive ? "text-primary" : "text-muted-fg hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
              {tab.label}
              {"urgent" in tab && tab.urgent && (
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 right-1/2 translate-x-1/2 h-[2.5px] w-10 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Cards Grid ── */}
      <div className="p-4 space-y-4">
        {activeTab === "all" && INITIATIVES.map((initiative) => (
          <InitiativeCard key={initiative.id} {...initiative} />
        ))}

        {activeTab === "urgent" && (
          <>
            {/* Show a subset for urgent — only those below 50% funded */}
            {INITIATIVES.filter(i => (i.collected / i.target) < 0.5).map((initiative) => (
              <InitiativeCard key={initiative.id} {...initiative} />
            ))}
            {INITIATIVES.filter(i => (i.collected / i.target) < 0.5).length === 0 && (
              <EmptyState message="لا توجد مبادرات عاجلة حالياً" />
            )}
          </>
        )}

        {activeTab === "impact" && (
          <div className="space-y-4">
            <ImpactReport />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

/* ── Empty State ─────────────────────────────────────── */
function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <Globe className="w-8 h-8 text-slate-300" strokeWidth={1.5} />
      </div>
      <p className="text-[14px] font-semibold text-slate-400">{message}</p>
    </div>
  );
}

/* ── Impact Report Placeholder ───────────────────────── */
function ImpactReport() {
  const stats = [
    { label: "مبادرات مكتملة", value: "47", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { label: "مستفيد مباشر",   value: "8,200+", color: "text-primary bg-primary/5 border-primary/10" },
    { label: "ريال تم جمعه",   value: "1.2M", color: "text-secondary bg-secondary/5 border-secondary/10" },
  ];
  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-[15px] font-black text-slate-900">تقرير الأثر التراكمي</h3>
        <p className="text-[12px] text-slate-400 mt-0.5">منذ انطلاق منصة تنموي</p>
      </div>
      <div className="p-5 grid grid-cols-3 gap-3">
        {stats.map(({ label, value, color }) => (
          <div key={label} className={`flex flex-col items-center gap-1 px-3 py-4 rounded-xl border ${color}`}>
            <span className="text-[20px] font-black leading-none">{value}</span>
            <span className="text-[10px] font-semibold text-center leading-tight opacity-70">{label}</span>
          </div>
        ))}
      </div>
      <div className="px-5 pb-5">
        <p className="text-[12.5px] text-slate-500 leading-relaxed text-center">
          هذه الأرقام تعكس الأثر الحقيقي لمجتمع تنموي في خدمة المجتمعات المحلية.
        </p>
      </div>
    </div>
  );
}
