import React from "react";
import { Copy } from "lucide-react";

export function LinksView() {
  const links = [
    { name: "رابط التبرع العام", url: "https://tanmawy.sa/pay/gen-123" },
    { name: "حملة كفالة يتيم", url: "https://tanmawy.sa/pay/orph-456" },
  ];
  return (
    <div className="space-y-4">
      {links.map((link, i) => (
        <div key={i} className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="text-[14px] font-black text-slate-900 dark:text-slate-100 mb-1">{link.name}</h4>
            <p className="text-[12px] text-slate-500 dark:text-slate-400 font-mono" dir="ltr">{link.url}</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 rounded-xl text-[13px] font-bold transition-colors">
            <Copy className="w-4 h-4" />
            نسخ الرابط
          </button>
        </div>
      ))}
    </div>
  );
}
