"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import {
  LifeBuoy, ShieldCheck, ShieldAlert, CheckCircle2,
  ChevronDown, AlertTriangle, ExternalLink,
} from "lucide-react";

/* ── Helpers ─────────────────────────────────────────── */
const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[14px] text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10";

function fadeUpProps(i: number) {
  return {
    initial: { opacity: 0, y: 16 } as const,
    animate: { opacity: 1, y: 0 } as const,
    transition: { duration: 0.35, delay: i * 0.07 },
  };
}

/* ── FAQ Item ────────────────────────────────────────── */
function FAQItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-right hover:bg-slate-50 transition-colors"
      >
        <span className="text-[14px] font-bold text-slate-800 leading-snug">
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-[13.5px] text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Support Form ────────────────────────────────────── */
function SupportForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-10 text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-7 h-7 text-emerald-500" strokeWidth={2} />
        </div>
        <h3 className="text-[16px] font-black text-slate-900 mb-1">
          تم إرسال تذكرتك بنجاح!
        </h3>
        <p className="text-[13px] text-slate-500 leading-relaxed max-w-xs">
          سيتواصل معك فريق الدعم خلال 24 ساعة. رقم تذكرتك:{" "}
          <span className="font-bold text-primary">SUP-2026-03821</span>
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-5 text-[13px] font-semibold text-primary hover:underline"
        >
          إرسال تذكرة جديدة
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-4"
    >
      {/* Issue Type */}
      <div className="space-y-1.5">
        <label className="text-[13px] font-bold text-slate-700 block">
          نوع المشكلة <span className="text-rose-400 text-[11px]">*</span>
        </label>
        <div className="relative">
          <select
            required
            defaultValue=""
            className={`${inputCls} appearance-none pl-9 cursor-pointer`}
          >
            <option value="" disabled>اختر نوع المشكلة...</option>
            <option value="tech">مشكلة تقنية</option>
            <option value="entity">استفسار عن توثيق كيان</option>
            <option value="report">الإبلاغ عن محتوى</option>
            <option value="other">أخرى</option>
          </select>
          <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Details */}
      <div className="space-y-1.5">
        <label className="text-[13px] font-bold text-slate-700 block">
          تفاصيل المشكلة <span className="text-rose-400 text-[11px]">*</span>
        </label>
        <textarea
          required
          rows={4}
          placeholder="اشرح مشكلتك بالتفصيل لمساعدتك بشكل أفضل..."
          className={`${inputCls} resize-none leading-relaxed`}
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-tanmawy-gradient text-white text-[14px] font-bold shadow-sm hover:shadow-md transition-all hover:scale-[1.01] active:scale-[0.98]"
      >
        إرسال التذكرة
      </button>
    </form>
  );
}

/* ── Disclaimer Card ─────────────────────────────────── */
function DisclaimerCard() {
  const rules = [
    {
      text: "منصة تنموي هي وسيط تقني فقط لربط الداعمين بالكيانات المعتمدة.",
      icon: "🔗",
    },
    {
      text: "لا يتم تداول أي سيولة نقدية أو جمع تبرعات داخل المنصة نهائياً.",
      icon: "🚫",
    },
    {
      text: "تتم كافة عمليات الدفع عبر قنوات رسمية (نفاذ / بوابات مرخصة) وتذهب مباشرةً لحسابات الكيانات المعتمدة.",
      icon: "✅",
    },
    {
      text: "أي محاولة لجمع تبرعات شخصية ستعرض الحساب للحظر الفوري والمساءلة القانونية.",
      icon: "⚠️",
    },
  ];

  return (
    <motion.div
      {...fadeUpProps(1)}
      className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden sticky top-20"
    >
      {/* Watermark background icon */}
      <div className="absolute -left-6 -bottom-6 opacity-[0.04] pointer-events-none select-none">
        <ShieldAlert className="w-48 h-48 text-slate-900" strokeWidth={1} />
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-secondary via-primary to-transparent rounded-t-2xl" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-secondary" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-[14px] font-black text-slate-900">
            إخلاء مسؤولية تنظيمي
          </h3>
          <p className="text-[11px] text-slate-400 font-medium">
            وفقاً للأنظمة السعودية المعتمدة
          </p>
        </div>
      </div>

      {/* Rules */}
      <div className="space-y-3 relative z-10">
        {rules.map((rule, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors ${
              i === 3
                ? "bg-rose-50 border-rose-100"
                : "bg-white border-slate-100"
            }`}
          >
            <span className="text-[16px] shrink-0 leading-none mt-0.5">
              {rule.icon}
            </span>
            <p
              className={`text-[12.5px] leading-relaxed ${
                i === 3 ? "text-rose-800 font-semibold" : "text-slate-700"
              }`}
            >
              {rule.text}
            </p>
          </div>
        ))}
      </div>

      {/* Footer warning */}
      <div className="mt-5 flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-100">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" strokeWidth={2} />
        <p className="text-[11.5px] text-amber-700 leading-relaxed font-medium">
          للاستفسار عن الإطار التنظيمي تواصل مع هيئة الهلال الأحمر أو وزارة الموارد البشرية والتنمية الاجتماعية.
        </p>
      </div>

      {/* Official links */}
      <div className="mt-4 space-y-1.5">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">
          جهات رسمية
        </p>
        {[
          "وزارة الموارد البشرية",
          "البوابة الوطنية للعمل التطوعي",
        ].map((link) => (
          <a
            key={link}
            href="#"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-slate-100 hover:border-primary/30 transition-colors group"
          >
            <span className="text-[12px] font-semibold text-slate-600 group-hover:text-primary transition-colors">
              {link}
            </span>
            <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-primary transition-colors" />
          </a>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main Page ───────────────────────────────────────── */
export default function SupportPage() {
  return (
    <DashboardLayout widgets={<DisclaimerCard />}>
      <div className="px-5 py-6 space-y-5">

        {/* ── Header ── */}
        <motion.div {...fadeUpProps(0)} className="mb-6">
          <h1 className="text-[20px] font-black text-slate-900 leading-tight mb-1">
            مساعدة ودعم فني
          </h1>
          <p className="text-[13.5px] text-slate-500 leading-relaxed">
            فريق تنموي متواجد دائماً لضمان تجربة سلسة وآمنة لكافة أعضاء المجتمع.
          </p>
        </motion.div>

        {/* ── Support Form Card ── */}
            <motion.div
              {...fadeUpProps(2)}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <LifeBuoy className="w-5 h-5 text-primary" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-[15px] font-black text-slate-900 leading-tight">
                    تواصل مع الدعم الفني
                  </h2>
                  <p className="text-[11px] text-slate-400 font-medium">
                    متوسط وقت الاستجابة: أقل من 24 ساعة
                  </p>
                </div>
              </div>
              <SupportForm />
            </motion.div>

            {/* FAQ Card */}
            <motion.div
              {...fadeUpProps(3)}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
            >
              <h2 className="text-[15px] font-black text-slate-900 mb-4">
                الأسئلة الشائعة
              </h2>
              <div className="space-y-2">
                <FAQItem
                  question="كيف يمكنني توثيق حساب الكيان الخاص بي؟"
                  answer="يتم التوثيق من خلال إدخال رقم الترخيص الرسمي الصادر من الجهات المعنية في صفحة (إنشاء كيان)، وسيتم مراجعته إلكترونياً وتفعيل لوحة الإدارة عند الموافقة."
                  defaultOpen
                />
                <FAQItem
                  question="هل هناك رسوم على التبرعات من خلال المنصة؟"
                  answer="لا، منصة تنموي مجانية بالكامل ولا تقتطع أي نسب من التبرعات. جميع المبالغ تذهب مباشرةً لحسابات الكيانات عبر بوابات الدفع الرسمية."
                />
                <FAQItem
                  question="كيف أتأكد من أن الكيان الذي أدعمه معتمد رسمياً؟"
                  answer="جميع الكيانات الظاهرة في منصة تنموي تحمل شارة التحقق الزرقاء ✓ وقد مرّت بعملية التحقق من الترخيص. يمكنك الضغط على اسم الكيان لعرض تفاصيل الترخيص."
                />
                <FAQItem
                  question="ماذا أفعل إذا واجهت محتوى مخالفاً أو مشبوهاً؟"
                  answer="يمكنك الإبلاغ عن أي محتوى مشبوه عبر نموذج الدعم أعلاه باختيار 'الإبلاغ عن محتوى'. سيتولى فريق الامتثال مراجعته خلال 4 ساعات وحظره فوراً عند الثبوت."
                />
              </div>
            </motion.div>

      </div>
    </DashboardLayout>
  );
}
