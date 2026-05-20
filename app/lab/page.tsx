"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import { useUserStore } from "@/src/store/useUserStore";
import {
  ShieldCheck, Code2, PenTool, Scale, Camera,
  HandHeart, ArrowLeft, Plus, X, Building, Mail,
  FileText, CheckCircle2, ChevronDown
} from "lucide-react";

/* ── Types ───────────────────────────────────────────── */
interface Provider {
  id: number;
  name: string;
  category: string;
  categoryId: string;
  description: string;
  offer: string;
  iconName: string;
  iconBg: string;
  iconColor: string;
}

/* ── Mock Data ───────────────────────────────────────── */
const INITIAL_PROVIDERS: Provider[] = [
  {
    id: 1,
    name: "وكالة إبداع للتسويق",
    category: "تسويق وتصميم",
    categoryId: "marketing",
    description:
      "وكالة تسويق رقمي متخصصة في القطاع غير الربحي، تؤمن بأن الأثر الاجتماعي يستحق صوتاً قوياً.",
    offer:
      "إدارة حملات التواصل الاجتماعي مجاناً خلال شهر رمضان لكيان واحد شهرياً، بما يشمل إعداد المحتوى والجدولة والتحليل.",
    iconName: "PenTool",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
  },
  {
    id: 2,
    name: "مكتب العدل والمساواة",
    category: "استشارات قانونية",
    categoryId: "legal",
    description:
      "مكتب محاماة متخصص في قانون المنظمات غير الربحية والامتثال التنظيمي لدى وزارة الموارد البشرية.",
    offer:
      "مراجعة العقود واتفاقيات التبرع وتقديم استشارات الامتثال القانوني بالكامل مجاناً للكيانات المعتمدة.",
    iconName: "Scale",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    id: 3,
    name: "حلول تك",
    category: "تقنية وبرمجة",
    categoryId: "tech",
    description:
      "شركة تقنية سعودية متخصصة في بناء أنظمة إدارة البيانات والحلول الرقمية للقطاع الاجتماعي.",
    offer:
      "إعداد وتهيئة نظام CRM متكامل لإدارة بيانات المستفيدين والتبرعات، مع التدريب المجاني للفريق.",
    iconName: "Code2",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: 4,
    name: "استوديو العدسة",
    category: "تسويق وتصميم",
    categoryId: "marketing",
    description:
      "استوديو إبداعي متخصص في التصوير الوثائقي والمحتوى البصري للمبادرات الإنسانية والاجتماعية.",
    offer:
      "تصوير وتوثيق مبادرة رئيسية كاملة شهرياً — صور + فيديو احترافي جاهز للنشر — مجاناً.",
    iconName: "Camera",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
  },
];

const CATEGORIES = [
  { id: "all",       label: "الكل" },
  { id: "tech",      label: "تقنية وبرمجة" },
  { id: "marketing", label: "تسويق وتصميم" },
  { id: "legal",     label: "استشارات قانونية" },
];

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  PenTool,
  Scale,
  Code2,
  Camera,
  Building,
  Mail,
  FileText
};

const CATEGORY_DETAILS: Record<string, { label: string; iconName: string; iconBg: string; iconColor: string }> = {
  tech: {
    label: "تقنية وبرمجة",
    iconName: "Code2",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500"
  },
  marketing: {
    label: "تسويق وتصميم",
    iconName: "PenTool",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500"
  },
  legal: {
    label: "استشارات قانونية",
    iconName: "Scale",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500"
  }
};

const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[14px] text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-right";

function fadeUpProps(i: number) {
  return {
    initial: { opacity: 0, y: 18 } as const,
    animate: { opacity: 1, y: 0 } as const,
    transition: { duration: 0.35, delay: i * 0.07 },
  };
}

/* ── Access Denied ───────────────────────────────────── */
function AccessDenied({ onOpenRegister }: { onOpenRegister: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-sm w-full"
      >
        <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <ShieldCheck className="w-10 h-10 text-slate-400" strokeWidth={1.5} />
        </div>
        <h2 className="text-[20px] font-black text-slate-800 mb-2">
          منطقة الكيانات المعتمدة
        </h2>
        <p className="text-[14px] text-slate-500 leading-relaxed mb-6">
          هذه المساحة مخصصة للكيانات المعتمدة للوصول إلى الخدمات المجانية المقدمة من شبكة الممكّنين.
        </p>
        <a
          href="/create-entity"
          className="block w-full py-3.5 rounded-2xl bg-tanmawy-gradient text-white text-[15px] font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] mb-3"
        >
          وثّق كيانك الآن
        </a>
        <button
          onClick={onOpenRegister}
          className="w-full py-3.5 rounded-2xl border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 text-[14px] font-bold transition-all shadow-sm active:scale-[0.99] cursor-pointer"
        >
          هل أنت مزود خدمة؟ سجل شركتك كممكّن
        </button>
      </motion.div>
    </div>
  );
}

/* ── Provider Card ───────────────────────────────────── */
function ProviderCard({ provider, index }: { provider: Provider; index: number }) {
  const Icon = ICON_MAP[provider.iconName] || Building;
  return (
    <motion.div
      {...fadeUpProps(index)}
      className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-primary/40 transition-all duration-200 flex flex-col"
    >
      {/* Top row: Logo + Free badge */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl ${provider.iconBg} flex items-center justify-center shrink-0`}>
          <Icon className={`w-6 h-6 ${provider.iconColor}`} strokeWidth={2} />
        </div>
        <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
          مساهمة مجانية 100%
        </span>
      </div>

      {/* Middle: Info */}
      <div className="flex-1 mb-4">
        <div className="mb-0.5 flex items-center justify-between gap-2">
          <h3 className="text-[15px] font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">
            {provider.name}
          </h3>
        </div>
        <span className="inline-block text-[11px] font-bold text-slate-400 mb-2">
          {provider.category}
        </span>

        <p className="text-[13px] text-slate-500 leading-relaxed mt-3 mb-3">
          {provider.description}
        </p>

        {/* What they offer */}
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-3">
          <div className="flex items-start gap-2">
            <HandHeart className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2} />
            <div>
              <p className="text-[10.5px] font-black text-primary mb-0.5">ماذا يقدمون؟</p>
              <p className="text-[12.5px] text-slate-700 leading-relaxed">
                {provider.offer}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: divider + action */}
      <div className="border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold text-teal-600 truncate">
            {provider.id > 10 ? "✓ تسجيل ذاتي" : ""}
          </span>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/10 text-primary text-[13px] font-bold hover:bg-primary/20 transition-colors group-hover:shadow-sm cursor-pointer">
            طلب خدمة
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────── */
export default function EnablersPage() {
  const { isFounder } = useUserStore();
  const [activeCategory, setActiveCategory] = useState("all");
  
  // State for dynamic providers list
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("tech");
  const [description, setDescription] = useState("");
  const [offer, setOffer] = useState("");
  const [contact, setContact] = useState("");

  // Load enablers on mount safely
  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem("tanmawy_custom_enablers");
    if (stored) {
      try {
        const customProviders = JSON.parse(stored);
        setProviders([...INITIAL_PROVIDERS, ...customProviders]);
      } catch (e) {
        setProviders(INITIAL_PROVIDERS);
      }
    } else {
      setProviders(INITIAL_PROVIDERS);
    }
  }, []);

  const openModal = () => {
    setName("");
    setCategoryId("tech");
    setDescription("");
    setOffer("");
    setContact("");
    setSubmitted(false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !offer || !contact) return;

    const catInfo = CATEGORY_DETAILS[categoryId] || CATEGORY_DETAILS.tech;

    const newProvider: Provider = {
      id: Date.now(),
      name,
      category: catInfo.label,
      categoryId,
      description,
      offer,
      iconName: catInfo.iconName,
      iconBg: catInfo.iconBg,
      iconColor: catInfo.iconColor,
    };

    const stored = localStorage.getItem("tanmawy_custom_enablers");
    let customProviders = [];
    if (stored) {
      try {
        customProviders = JSON.parse(stored);
      } catch (err) {}
    }
    customProviders.push(newProvider);
    localStorage.setItem("tanmawy_custom_enablers", JSON.stringify(customProviders));

    setProviders([...providers, newProvider]);
    setSubmitted(true);
  };

  const filtered =
    activeCategory === "all"
      ? providers
      : providers.filter((p) => p.categoryId === activeCategory);

  const modalMarkup = (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 text-right relative z-[1000]"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <div className="relative">
              {/* Top accent */}
              <div className="h-1.5 w-full bg-tanmawy-gradient" />
              
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 left-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-10 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 280, delay: 0.1 }}
                        className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4"
                      >
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" strokeWidth={2} />
                      </motion.div>
                      <h3 className="text-[18px] font-black text-slate-900 mb-2">
                        تم تسجيل شركتك بنجاح! 🎉
                      </h3>
                      <p className="text-[13px] text-slate-500 leading-relaxed max-w-xs mb-6">
                        شكراً لمساهمتك في دعم القطاع غير الربحي. ستظهر شركتك الآن في قائمة الممكّنين لجميع الكيانات المعتمدة.
                      </p>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[14px] font-bold transition-colors cursor-pointer"
                      >
                        إغلاق النافذة
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="mb-6">
                        <h3 className="text-[18px] font-black text-slate-900 mb-1">
                          تسجيل شركة أو جهة كممكّن
                        </h3>
                        <p className="text-[13px] text-slate-500 font-medium">
                          شارك بخدماتك مجاناً لدعم تمكين الكيانات التنموية.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div className="space-y-1.5 text-right">
                          <label className="flex items-center gap-1.5 text-[13px] font-bold text-slate-700">
                            <Building className="w-3.5 h-3.5 text-slate-400" />
                            اسم الجهة / الشركة
                            <span className="text-rose-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="مثال: شركة الحلول المتقدمة"
                            className={inputCls}
                          />
                        </div>

                        {/* Category */}
                        <div className="space-y-1.5 text-right">
                          <label className="flex items-center gap-1.5 text-[13px] font-bold text-slate-700">
                            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                            مجال الخدمة / الفئة
                            <span className="text-rose-400">*</span>
                          </label>
                          <div className="relative animate-none">
                            <select
                              required
                              value={categoryId}
                              onChange={(e) => setCategoryId(e.target.value)}
                              className={`${inputCls} appearance-none pr-4 pl-9 cursor-pointer`}
                            >
                              <option value="tech">تقنية وبرمجة</option>
                              <option value="marketing">تسويق وتصميم</option>
                              <option value="legal">استشارات قانونية</option>
                            </select>
                            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-1.5 text-right">
                          <label className="flex items-center gap-1.5 text-[13px] font-bold text-slate-700">
                            <FileText className="w-3.5 h-3.5 text-slate-400" />
                            نبذة عن الجهة
                            <span className="text-rose-400">*</span>
                          </label>
                          <textarea
                            required
                            rows={2}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="صف مجالك وخبرتك باختصار..."
                            className={`${inputCls} resize-none leading-relaxed`}
                          />
                        </div>

                        {/* Offer */}
                        <div className="space-y-1.5 text-right">
                          <label className="flex items-center gap-1.5 text-[13px] font-bold text-slate-700">
                            <HandHeart className="w-3.5 h-3.5 text-slate-400" />
                            تفاصيل المساهمة المجانية
                            <span className="text-rose-400">*</span>
                          </label>
                          <textarea
                            required
                            rows={2}
                            value={offer}
                            onChange={(e) => setOffer(e.target.value)}
                            placeholder="ما هي الخدمة المجانية التي ستقدمها؟"
                            className={`${inputCls} resize-none leading-relaxed`}
                          />
                        </div>

                        {/* Contact */}
                        <div className="space-y-1.5 text-right">
                          <label className="flex items-center gap-1.5 text-[13px] font-bold text-slate-700">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            طريقة التواصل (البريد الإلكتروني)
                            <span className="text-rose-400">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="example@company.com"
                            className={inputCls}
                            dir="ltr"
                          />
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-tanmawy-gradient text-white text-[14px] font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                          >
                            تسجيل الجهة كممكّن
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <DashboardLayout>
      {!isFounder ? (
        <AccessDenied onOpenRegister={openModal} />
      ) : (
        <div className="px-5 py-6 space-y-6">

          {/* ── Header ── */}
          <motion.div {...fadeUpProps(0)} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-[20px] font-black text-slate-900 leading-tight mb-1">
                ممكّنو منصة تنموي
              </h1>
              <p className="text-[13.5px] text-slate-500 leading-relaxed max-w-xl">
                شركات ومحترفون يتبرعون بجهدهم ووقتهم لتقديم خدمات مجانية لدعم وتطوير الكيانات التنموية المعتمدة.
              </p>
            </div>
            <button
              onClick={openModal}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-tanmawy-gradient text-white text-[14px] font-bold shadow-md hover:shadow-lg transition-all duration-150 shrink-0 self-start sm:self-auto hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              سجل شركتك كممكّن
            </button>
          </motion.div>

          {/* ── Info Banner ── */}
          <motion.div
            {...fadeUpProps(1)}
            className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100"
          >
            <HandHeart className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" strokeWidth={2} />
            <div>
              <p className="text-[13px] font-bold text-emerald-900">
                جميع الخدمات المعروضة هنا مجانية 100% للكيانات المعتمدة
              </p>
              <p className="text-[12px] text-emerald-700 leading-relaxed mt-0.5">
                الممكّنون يقدمون مساهماتهم طوعاً كجزء من التزامهم بالمسؤولية الاجتماعية دون أي مقابل مادي.
              </p>
            </div>
          </motion.div>

          {/* ── Category Filter ── */}
          <motion.div {...fadeUpProps(2)} className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-all duration-150 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* ── Providers Grid ── */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((provider, i) => (
                <ProviderCard key={provider.id} provider={provider} index={i + 3} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <HandHeart className="w-7 h-7 text-slate-300" strokeWidth={1.5} />
              </div>
              <p className="text-[14px] font-semibold text-slate-400">
                لا يوجد ممكّنون في هذه الفئة حالياً
              </p>
            </div>
          )}

        </div>
      )}

      {/* Render modal directly in body via Portal */}
      {isMounted && createPortal(modalMarkup, document.body)}
    </DashboardLayout>
  );
}
