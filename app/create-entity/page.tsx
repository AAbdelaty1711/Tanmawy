"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import {
  UploadCloud, Building, FileText, Mail, Phone,
  AlignLeft, ShieldCheck, CheckCircle2, ChevronDown,
} from "lucide-react";

/* ── Shared Input ─────────────────────────────────── */
function Field({
  label,
  id,
  icon: Icon,
  children,
  required,
}: {
  label: string;
  id: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex items-center gap-1.5 text-[13px] font-bold text-slate-700">
        <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={2} />
        {label}
        {required && <span className="text-rose-400 text-[11px]">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[14px] text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10";

/* ── Success State ────────────────────────────────── */
function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-20 text-center px-6"
    >
      {/* Animated check icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mb-6 shadow-sm"
      >
        <CheckCircle2 className="w-10 h-10 text-emerald-500" strokeWidth={2} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="text-[22px] font-black text-slate-900 mb-2"
      >
        تم إرسال طلبك بنجاح! 🎉
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="text-[14px] text-slate-500 leading-relaxed max-w-sm"
      >
        طلب توثيق كيانك قيد المراجعة من قِبَل فريق تنموي. سيتم إعلامك خلال 2-3 أيام عمل بعد التحقق من الترخيص.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mt-6 flex items-center gap-2 px-4 py-2.5 bg-primary/5 border border-primary/15 rounded-xl"
      >
        <ShieldCheck className="w-4 h-4 text-primary shrink-0" strokeWidth={2} />
        <span className="text-[12.5px] font-semibold text-primary">
          رقم الطلب: TAN-2026-00847
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Page ────────────────────────────────────── */
export default function CreateEntityPage() {
  const [submitted, setSubmitted] = useState(false);
  const [logoPreview, setLogoPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto py-8 px-4">

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/8 border border-primary/15 rounded-full mb-4">
            <Building className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
            <span className="text-[12px] font-bold text-primary">طلب توثيق رسمي</span>
          </div>
          <h1 className="text-[24px] font-black text-slate-900 leading-tight mb-2">
            تسجيل كيان تنموي جديد
          </h1>
          <p className="text-[14px] text-slate-500 leading-relaxed max-w-md mx-auto">
            انضم إلى شبكة الكيانات المعتمدة وابدأ في إدارة مبادراتك بذكاء
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="h-1.5 w-full bg-tanmawy-gradient" />
              <SuccessState />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <form onSubmit={handleSubmit}>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  {/* Top gradient accent */}
                  <div className="h-1.5 w-full bg-tanmawy-gradient" />

                  <div className="p-8 space-y-8">

                    {/* ── A: Logo Upload ── */}
                    <div className="flex flex-col items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setLogoPreview(!logoPreview)}
                        className={`w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer transition-all duration-200 ${
                          logoPreview
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-slate-300 bg-slate-50 hover:border-primary hover:bg-primary/5"
                        }`}
                      >
                        {logoPreview ? (
                          <span className="text-3xl">🏛️</span>
                        ) : (
                          <UploadCloud
                            className="w-8 h-8 text-slate-300"
                            strokeWidth={1.5}
                          />
                        )}
                      </button>
                      <div className="text-center">
                        <p className="text-[13px] font-semibold text-slate-600">رفع شعار الكيان</p>
                        <p className="text-[11px] text-slate-400">PNG, JPG – حتى 2MB</p>
                      </div>
                    </div>

                    {/* ── B: الأساسيات ── */}
                    <div>
                      <SectionTitle>الأساسيات</SectionTitle>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <Field label="اسم الكيان" id="entityName" icon={Building} required>
                          <input
                            id="entityName"
                            type="text"
                            placeholder="مثال: جمعية نقاء للتنمية"
                            className={inputCls}
                            required
                          />
                        </Field>

                        <Field label="نوع الكيان" id="entityType" icon={Building} required>
                          <div className="relative">
                            <select
                              id="entityType"
                              className={`${inputCls} appearance-none pr-4 pl-9 cursor-pointer`}
                              required
                              defaultValue=""
                            >
                              <option value="" disabled>اختر نوع الكيان...</option>
                              <option value="charity">جمعية خيرية</option>
                              <option value="foundation">مؤسسة أهلية</option>
                              <option value="volunteer">فريق تطوعي</option>
                              <option value="initiative">مبادرة مجتمعية</option>
                            </select>
                            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          </div>
                        </Field>
                      </div>
                    </div>

                    {/* ── C: التوثيق القانوني ── */}
                    <div>
                      <SectionTitle>التوثيق القانوني</SectionTitle>
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Field label="رقم الترخيص" id="licenseNumber" icon={FileText} required>
                            <input
                              id="licenseNumber"
                              type="text"
                              placeholder="SA-XXXXX"
                              className={inputCls}
                              required
                            />
                          </Field>

                          <Field label="جهة الترخيص" id="licensingAuthority" icon={ShieldCheck} required>
                            <input
                              id="licensingAuthority"
                              type="text"
                              placeholder="وزارة الموارد البشرية"
                              className={inputCls}
                              required
                            />
                          </Field>
                        </div>

                        {/* Legal hint */}
                        <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-100">
                          <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" strokeWidth={2} />
                          <p className="text-[11.5px] text-amber-700 leading-relaxed">
                            سيتم التحقق من بيانات الترخيص عبر السجلات الرسمية. تأكد من صحة الرقم قبل الإرسال.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ── D: التواصل والنبذة ── */}
                    <div>
                      <SectionTitle>التواصل والنبذة</SectionTitle>
                      <div className="mt-4 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Field label="البريد الإلكتروني للكيان" id="entityEmail" icon={Mail} required>
                            <input
                              id="entityEmail"
                              type="email"
                              placeholder="info@entity.org.sa"
                              className={inputCls}
                              required
                            />
                          </Field>

                          <Field label="رقم التواصل" id="entityPhone" icon={Phone}>
                            <input
                              id="entityPhone"
                              type="tel"
                              placeholder="05XXXXXXXX"
                              className={inputCls}
                            />
                          </Field>
                        </div>

                        <Field label="نبذة عن الكيان" id="entityBio" icon={AlignLeft} required>
                          <textarea
                            id="entityBio"
                            rows={3}
                            placeholder="اكتب وصفاً موجزاً عن مهمة الكيان وأهدافه وقيمه..."
                            className={`${inputCls} resize-none leading-relaxed`}
                            required
                          />
                        </Field>
                      </div>
                    </div>

                    {/* ── Action Area ── */}
                    <div className="pt-2 border-t border-slate-100 space-y-4">
                      <motion.button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-tanmawy-gradient text-white text-[16px] font-bold shadow-md hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                        whileTap={{ scale: 0.98 }}
                      >
                        إرسال طلب التوثيق
                      </motion.button>

                      <div className="flex items-center justify-center gap-2 text-center">
                        <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={2} />
                        <p className="text-[12px] text-slate-400 leading-relaxed">
                          بمجرد التحقق من الترخيص، سيتم تفعيل لوحة إدارة الكيان الخاصة بك
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}

/* ── Section Title ────────────────────────────────── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[13px] font-black text-slate-800">{children}</span>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}
