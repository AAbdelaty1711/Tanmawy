"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const PLEDGE_TEXT =
  "أتعاهد بصفتي عضواً في مجتمع تنموي على الشفافية المطلقة، وعدم تداول السيولة النقدية خارج الأطر الرسمية، والالتزام بميثاق العمل الأخلاقي.";

const CHECKBOXES = [
  { id: "legal",  label: "أقرّ بصحة البيانات المرفقة قانونياً." },
  { id: "ethics", label: 'أتعهد بالالتزام بميثاق "تنموي" الأخلاقي.' },
];

export default function StepPledge({
  onBack,
  onSubmit,
  submitting,
}: {
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const allChecked = CHECKBOXES.every(({ id }) => checked[id]);

  const toggle = (id: string) =>
    setChecked((p) => ({ ...p, [id]: !p[id] }));

  const handleSubmit = () => {
    if (!allChecked) return;
    onSubmit();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-5 h-5 text-teal-500" strokeWidth={2} />
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">حائط التعهد</h2>
        </div>
        <p className="text-[13px] text-slate-500 dark:text-slate-400">
          هذا الميثاق هو أساس ثقتنا المشتركة في مجتمع تنموي
        </p>
      </div>

      {/* Pledge Card */}
      <div className="relative rounded-2xl border border-indigo-100 dark:border-indigo-900/30 bg-gradient-to-br from-indigo-50/60 to-teal-50/40 dark:from-indigo-950/20 dark:to-teal-950/20 p-5 overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-br-[40px]" />
        <p className="relative z-10 text-[14px] text-slate-700 dark:text-slate-200 leading-[1.9] font-medium text-right">
          {PLEDGE_TEXT}
        </p>
      </div>

      {/* Checkboxes */}
      <div className="space-y-3">
        {CHECKBOXES.map(({ id, label: checkboxLabel }) => (
          <div
            key={id}
            onClick={() => toggle(id)}
            className={`
              flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 select-none text-right
              ${checked[id]
                ? "border-teal-300 dark:border-teal-800/60 bg-teal-50/60 dark:bg-teal-950/20"
                : "border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-white/20"
              }
            `}
          >
            <div className="mt-0.5 shrink-0">
              <input
                type="checkbox"
                checked={!!checked[id]}
                readOnly
                className="sr-only"
              />
              <motion.div
                animate={checked[id] ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                className={`
                  w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200
                  ${checked[id]
                    ? "bg-teal-500 border-teal-500"
                    : "border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900"
                  }
                `}
              >
                {checked[id] && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </motion.div>
            </div>
            <span className={`text-[13.5px] font-medium leading-relaxed ${checked[id] ? "text-teal-800 dark:text-teal-400" : "text-slate-700 dark:text-slate-300"}`}>
              {checkboxLabel}
            </span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-[14px] font-semibold text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronRight className="w-4 h-4" strokeWidth={2} />
          السابق
        </button>

        <motion.button
          onClick={handleSubmit}
          disabled={!allChecked || submitting}
          whileTap={allChecked ? { scale: 0.98 } : {}}
          className={`
            flex-1 py-2.5 rounded-xl text-[15px] font-bold text-white transition-all duration-300
            ${allChecked
              ? "bg-tanmawy-gradient shadow-md hover:shadow-lg hover:scale-[1.01]"
              : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-550 cursor-not-allowed"
            }
          `}
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              جارٍ توثيق الحساب...
            </span>
          ) : (
            "توثيق الحساب والدخول"
          )}
        </motion.button>
      </div>
    </div>
  );
}
