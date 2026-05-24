import React from "react";
import { Target, Eye, MousePointerClick, BarChart } from "lucide-react";

export function MarketingView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "الوصول (Reach)", value: "24.5K", icon: Target, color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/40" },
          { label: "الظهور (Impressions)", value: "58.2K", icon: Eye, color: "text-indigo-500 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-950/40" },
          { label: "النقرات (Clicks)", value: "3.4K", icon: MousePointerClick, color: "text-rose-500 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-950/40" },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} shrink-0`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
              <p className="text-xl font-black text-slate-900 dark:text-slate-100">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-white/5 rounded-2xl p-6 text-center">
         <BarChart className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
         <p className="text-[14px] text-slate-500 dark:text-slate-400">رسم بياني تفصيلي للحملات قريباً...</p>
      </div>
    </div>
  );
}
