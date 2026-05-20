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
        <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="text-[14px] font-black text-slate-900 mb-1">{link.name}</h4>
            <p className="text-[12px] text-slate-500 font-mono" dir="ltr">{link.url}</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-[13px] font-bold transition-colors">
            <Copy className="w-4 h-4" />
            نسخ الرابط
          </button>
        </div>
      ))}
    </div>
  );
}
