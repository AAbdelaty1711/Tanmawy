import React from "react";
import { Target, Eye, MousePointerClick, BarChart } from "lucide-react";

export function MarketingView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "الوصول (Reach)", value: "24.5K", icon: Target, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "الظهور (Impressions)", value: "58.2K", icon: Eye, color: "text-indigo-500", bg: "bg-indigo-50" },
          { label: "النقرات (Clicks)", value: "3.4K", icon: MousePointerClick, color: "text-rose-500", bg: "bg-rose-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} shrink-0`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-slate-500 mb-1">{stat.label}</p>
              <p className="text-xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center">
         <BarChart className="w-10 h-10 text-slate-300 mx-auto mb-3" />
         <p className="text-[14px] text-slate-500">رسم بياني تفصيلي للحملات قريباً...</p>
      </div>
    </div>
  );
}
