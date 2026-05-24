import React from "react";
import { BrainCircuit, CheckCircle2 } from "lucide-react";

export function AIView() {
  return (
    <div className="space-y-6">
      <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path className="text-indigo-100 dark:text-indigo-900/30" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="text-secondary" strokeWidth="3" strokeDasharray="80, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-xl font-black text-indigo-900 dark:text-indigo-100">80%</span>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-2">مؤشر النمو المدعوم بالذكاء الاصطناعي</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            تشير تحليلاتنا إلى زيادة متوقعة بنسبة 22% في التبرعات هذا الشهر بناءً على سلوك الداعمين الحالي.
          </p>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-2xl p-6">
        <h3 className="text-[15px] font-black text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-secondary" /> توصيات النظام
        </h3>
        <ul className="space-y-4">
          {[
            "إطلاق حملة تسويقية جديدة لاستهداف المتبرعين المتكررين.",
            "تحسين أوقات إرسال رسائل التذكير بناءً على تفاعل المستخدمين.",
            "تحديث بيانات المستفيدين لضمان دقة التقارير القادمة."
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
