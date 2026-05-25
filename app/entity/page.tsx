"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import { useUserStore } from "@/src/store/useUserStore";
import {
  BadgeCheck, ShieldCheck, Plus, TrendingUp,
  BrainCircuit, Wallet, Users, Megaphone, FolderHeart, Link as LinkIcon,
  Gift, ArrowUpRight, ChevronRight, UserPlus
} from "lucide-react";

import { AIView } from "./_components/AIView";
import { RevenuesView } from "./_components/RevenuesView";
import { BeneficiariesView } from "./_components/BeneficiariesView";
import { MarketingView } from "./_components/MarketingView";
import { ProjectsView } from "./_components/ProjectsView";
import { LinksView } from "./_components/LinksView";
import { InviteMembersView } from "./_components/InviteMembersView";
import { ManageMembersView } from "./_components/ManageMembersView";

/* ── Animation helper ───────────────────────────────── */
function fadeUpProps(i: number) {
  return {
    initial: { opacity: 0, y: 20 } as const,
    animate: { opacity: 1, y: 0 } as const,
    transition: { duration: 0.4, delay: i * 0.07 },
  };
}

/* ── Types ───────────────────────────────────────────── */
interface StatCard {
  label: string;
  value: string;
  sub?: string;
  subColor?: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconBg: string;
  iconColor: string;
}

interface ToolCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconBg: string;
  iconColor: string;
  badge?: string;
}

interface EntityItem {
  id: string;
  name: string;
  type: string;
  status: "active" | "pending";
  emoji: string;
}

/* ── Data ────────────────────────────────────────────── */
const MY_ENTITIES: EntityItem[] = [
  { id: "1", name: "جمعية نقاء التنموية", type: "جمعية خيرية", status: "active", emoji: "🏛️" },
  { id: "2", name: "مبادرة البيئة النظيفة", type: "مبادرة مجتمعية", status: "pending", emoji: "🌿" },
];

const STATS: StatCard[] = [
  {
    label: "إجمالي الإيرادات",
    value: "120,500 ر.س",
    sub: "↑ 14% هذا الشهر",
    subColor: "text-emerald-600 dark:text-emerald-400",
    icon: Wallet,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    label: "المبادرات النشطة",
    value: "3 مبادرات",
    sub: "1 على وشك الاكتمال",
    subColor: "text-amber-600 dark:text-amber-400",
    icon: FolderHeart,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    label: "المستفيدون",
    value: "450 أسرة",
    sub: "↑ 32 هذا الأسبوع",
    subColor: "text-blue-600 dark:text-blue-400",
    icon: Users,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "إجمالي التبرعات",
    value: "74,200 ر.س",
    sub: "↑ 22% هذا الشهر",
    subColor: "text-violet-600 dark:text-violet-400",
    icon: Gift,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
  },
];

const TOOLS: ToolCard[] = [
  {
    id: "ai",
    title: "تحليل AI",
    description: "تحليل ذكي لبيانات التبرعات وسلوك الداعمين",
    icon: BrainCircuit,
    iconBg: "bg-indigo-50",
    iconColor: "text-secondary",
    badge: "AI",
  },
  {
    id: "revenues",
    title: "الإيرادات والتبرعات",
    description: "تتبع التدفقات النقدية والمصروفات",
    icon: Wallet,
    iconBg: "bg-teal-50",
    iconColor: "text-primary",
  },
  {
    id: "beneficiaries",
    title: "المستفيدون والمدعومون",
    description: "إدارة بيانات الأسر والحالات وتحديث حالتها",
    icon: Users,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: "marketing",
    title: "التسويق الرقمي",
    description: "إدارة الحملات التسويقية وتتبع الوصول والتفاعل",
    icon: Megaphone,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
  },
  {
    id: "projects",
    title: "مشاريع وبرامج",
    description: "إدارة المبادرات الحالية وإطلاق حملات جديدة",
    icon: FolderHeart,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    id: "links",
    title: "روابط الدفع",
    description: "إنشاء روابط دفع مخصصة وتتبع التحويلات",
    icon: LinkIcon,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    id: "invite-members",
    title: "دعوة الأعضاء",
    description: "إرسال دعوات وتوليد روابط انضمام سريعة",
    icon: UserPlus,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
  {
    id: "manage-members",
    title: "إدارة الأعضاء",
    description: "التحكم في أدوار موظفي الكيان وتعديل صلاحياتهم",
    icon: ShieldCheck,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
  },
];

/* ── Access Denied State ─────────────────────────────── */
function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-sm w-full"
      >
        <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <ShieldCheck className="w-10 h-10 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
        </div>
        <h2 className="text-[20px] font-black text-slate-800 dark:text-slate-100 mb-2">
          منطقة الكيانات المعتمدة
        </h2>
        <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
          هذه المساحة مخصصة للكيانات المعتمدة فقط. قم بتوثيق كيانك للوصول إلى لوحة التحكم الكاملة وأدوات الإدارة المتقدمة.
        </p>
        <button className="w-full py-3.5 rounded-2xl bg-tanmawy-gradient text-white text-[15px] font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
          وثّق كيانك الآن
        </button>
        <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-4">
          يمكنك تفعيل وضع &quot;Founder&quot; من زر التبديل أسفل الشاشة لرؤية هذه الصفحة
        </p>
      </motion.div>
    </div>
  );
}

/* ── Stat Card ───────────────────────────────────────── */
function StatCardComponent({ card, index }: { card: StatCard; index: number }) {
  const Icon = card.icon;
  return (
    <motion.div
      {...fadeUpProps(index)}
      className="bg-surface border border-border rounded-2xl p-3.5 md:p-5 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-2 md:mb-4">
        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl ${card.iconBg} dark:bg-slate-900/60 flex items-center justify-center shrink-0`}>
          <Icon className={`w-4 h-4 md:w-5 md:h-5 ${card.iconColor}`} strokeWidth={2} />
        </div>
        <ArrowUpRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
      </div>
      <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mb-0.5">{card.label}</p>
      <p className="text-[18px] md:text-[22px] font-black text-slate-900 dark:text-slate-100 leading-tight mb-0.5">{card.value}</p>
      {card.sub && (
        <p className={`text-[12px] font-semibold ${card.subColor}`}>{card.sub}</p>
      )}
    </motion.div>
  );
}

/* ── Tool Card ───────────────────────────────────────── */
function ToolCardComponent({ tool, index, onClick }: { tool: ToolCard; index: number; onClick: () => void }) {
  const Icon = tool.icon;
  return (
    <motion.div
      {...fadeUpProps(index + 4)}
      onClick={onClick}
      className="group cursor-pointer bg-surface border border-slate-100 dark:border-white/5 rounded-2xl p-4 md:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl ${tool.iconBg} dark:bg-slate-900/40 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${tool.iconColor}`} strokeWidth={2} />
        </div>
        {tool.badge && (
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
            {tool.badge}
          </span>
        )}
      </div>
      <h3 className="text-[15px] font-black text-slate-900 dark:text-slate-100 mb-1.5 group-hover:text-primary transition-colors">
        {tool.title}
      </h3>
      <p className="text-[13px] text-slate-400 dark:text-slate-500 leading-relaxed">
        {tool.description}
      </p>
      <div className="mt-4 flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[12px] font-bold">فتح</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </div>
    </motion.div>
  );
}

/* ── Entity Card (switcher) ──────────────────────────── */
function EntityCard({
  entity,
  active,
  onClick,
}: {
  entity: EntityItem;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl border text-right transition-all duration-200 w-full ${
        active
          ? "bg-primary/5 border-primary/30 shadow-sm"
          : "bg-white dark:bg-slate-800/40 border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/10 hover:shadow-sm"
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${active ? "bg-primary/10" : "bg-slate-50 dark:bg-slate-800"}`}>
        {entity.emoji}
      </div>
      <div className="flex-1 min-w-0 text-right">
        <p className={`text-[13px] font-black truncate ${active ? "text-primary" : "text-slate-800 dark:text-slate-200"}`}>
          {entity.name}
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold">{entity.type}</p>
      </div>
      <div className="shrink-0 flex items-center gap-1.5">
        {entity.status === "active" ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            مفعّل
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-450 bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-450 inline-block" />
            قيد المراجعة
          </span>
        )}
        {active && <ChevronRight className="w-3.5 h-3.5 text-primary" />}
      </div>
    </button>
  );
}

/* ── Main Page ───────────────────────────────────────── */
export default function EntityPage() {
  const { isFounder } = useUserStore();
  const router = useRouter();
  const [activeEntityId, setActiveEntityId] = useState("1");
  const [activeView, setActiveView] = useState<string>("hub");

  const activeEntity = MY_ENTITIES.find((e) => e.id === activeEntityId) ?? MY_ENTITIES[0];
  const activeTool = TOOLS.find((t) => t.id === activeView);

  const renderActiveView = () => {
    switch (activeView) {
      case 'ai': return <AIView />;
      case 'revenues': return <RevenuesView />;
      case 'beneficiaries': return <BeneficiariesView />;
      case 'marketing': return <MarketingView />;
      case 'projects': return <ProjectsView />;
      case 'links': return <LinksView />;
      case 'invite-members': return <InviteMembersView />;
      case 'manage-members': return <ManageMembersView />;
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      {!isFounder ? (
        <AccessDenied />
      ) : (
        <div className={`px-4 py-4 md:px-5 md:py-6 ${
          activeView === "hub"
            ? "min-h-screen"
            : "min-h-screen lg:h-[calc(100vh-50px)] lg:min-h-0 lg:overflow-hidden lg:flex lg:flex-col"
        }`}>
          <AnimatePresence mode="wait">
            {activeView === "hub" ? (
              <motion.div
                key="hub"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 md:space-y-8"
              >
                {/* ── Header ── */}
                <motion.div
                  {...fadeUpProps(0)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-[20px] font-black text-slate-900 dark:text-slate-100 leading-tight">
                        لوحة تحكم الكيان
                      </h1>
                      <BadgeCheck className="w-5 h-5 text-primary shrink-0" strokeWidth={2.5} />
                    </div>
                    <p className="text-[14px] text-slate-500 dark:text-slate-400 font-semibold">
                      {activeEntity.name}
                    </p>
                  </div>

                  <button
                    onClick={() => router.push("/create-entity")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-tanmawy-gradient text-white text-[14px] font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
                  >
                    <Plus className="w-4 h-4" strokeWidth={2.5} />
                    إنشاء كيان جديد
                  </button>
                </motion.div>

                {/* ── Entities Switcher ── */}
                <motion.div {...fadeUpProps(1)}>
                  <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                    كياناتي ({MY_ENTITIES.length})
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {MY_ENTITIES.map((entity) => (
                      <EntityCard
                         key={entity.id}
                        entity={entity}
                        active={entity.id === activeEntityId}
                        onClick={() => setActiveEntityId(entity.id)}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* ── Stats Row ── */}
                <div>
                  <motion.p
                    {...fadeUpProps(2)}
                    className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3"
                  >
                    نظرة سريعة
                  </motion.p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {STATS.map((card, i) => (
                      <StatCardComponent key={card.label} card={card} index={i + 1} />
                    ))}
                  </div>
                </div>

                {/* ── Divider ── */}
                <motion.div
                  {...fadeUpProps(6)}
                  className="flex items-center gap-3"
                >
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest shrink-0">
                    أدوات الإدارة
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </motion.div>

                {/* ── Tools Grid ── */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {TOOLS.map((tool, i) => (
                    <ToolCardComponent key={tool.id} tool={tool} index={i} onClick={() => setActiveView(tool.id)} />
                  ))}
                </div>

                {/* ── Bottom note ── */}
                <motion.div
                  {...fadeUpProps(11)}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30"
                >
                  <div className="w-8 h-8 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-secondary" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-slate-800 dark:text-slate-200">
                      رؤية تنموي AI: كيانك في تطور مستمر 🚀
                    </p>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      بناءً على بيانات الشهر الماضي، يُوصى برفع الاستهداف لـ 600 أسرة في المبادرة البيئية.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="sub-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5 lg:space-y-0 lg:flex-1 lg:flex lg:flex-col lg:overflow-hidden"
              >
                {/* ── Secondary Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/5 pb-4 lg:pb-3 shrink-0">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setActiveView("hub")}
                      className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/5 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-105 transition-all text-slate-600 dark:text-slate-300"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div>
                      <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-400 dark:text-slate-500 mb-1">
                        <span className="hover:text-primary cursor-pointer transition-colors" onClick={() => setActiveView("hub")}>إدارة الكيان</span>
                        <span className="text-[10px]">/</span>
                        <span className="text-primary">{activeTool?.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {activeTool && (
                          <div className={`w-8 h-8 rounded-lg ${activeTool.iconBg} dark:bg-slate-900/40 flex items-center justify-center shrink-0`}>
                            <activeTool.icon className={`w-4 h-4 ${activeTool.iconColor}`} />
                          </div>
                        )}
                        <h1 className="text-[22px] font-black text-slate-900 dark:text-slate-100 leading-tight">
                          {activeTool?.title}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Master-Detail Layout ── */}
                <div className="flex flex-col lg:flex-row-reverse gap-6 lg:gap-5 lg:flex-1 lg:overflow-hidden mt-6 lg:mt-4">
                  {/* ── Inner Sidebar (Tools List) ── */}
                  <div className="flex flex-row overflow-x-auto gap-2 pb-3 pt-1 scrollbar-none shrink-0 w-full lg:flex-col lg:w-1/4 lg:space-y-2 lg:overflow-y-auto lg:pb-0 lg:pt-0 lg:shrink-0 lg:h-full lg:rtl:pl-4 lg:ltr:pr-4">
                    {TOOLS.map((tool) => {
                      const isActive = tool.id === activeView;
                      const Icon = tool.icon;
                      return (
                        <button
                          key={tool.id}
                          onClick={() => setActiveView(tool.id)}
                          className={`flex items-center gap-2.5 transition-all shrink-0 px-4 py-2.5 rounded-full border text-xs md:text-sm font-semibold select-none
                            lg:w-full lg:text-right lg:px-4 lg:py-3 lg:rounded-xl lg:flex lg:gap-3 lg:text-[14px] lg:border-y-0 lg:border-l-0 lg:border-r-4
                            ${
                              isActive
                                ? "bg-primary/10 text-primary font-bold border-primary/30 lg:border-primary lg:rounded-r-none"
                                : "bg-white dark:bg-slate-800/40 border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 lg:border-transparent lg:bg-transparent"
                            }`}
                        >
                          <Icon className={`w-4 h-4 lg:w-5 lg:h-5 shrink-0 ${isActive ? "text-primary" : "text-slate-400 dark:text-slate-500"}`} />
                          <span className="truncate">{tool.title}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* ── Content Area ── */}
                  <div className="w-full lg:w-3/4 lg:h-full lg:flex lg:flex-col lg:overflow-hidden">
                    <div className="bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-white/5 rounded-2xl p-4 md:p-6 shadow-sm min-h-[400px] lg:min-h-0 lg:h-full flex flex-col lg:overflow-hidden">
                      <div className="flex-1 overflow-y-auto min-h-0 px-1">
                        {renderActiveView()}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </DashboardLayout>
  );
}
