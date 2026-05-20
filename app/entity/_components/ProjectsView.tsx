import React from "react";

export function ProjectsView() {
  const projects = [
    { title: "حملة الشتاء الدافئ", progress: 75, daysLeft: 12 },
    { title: "سقيا الماء", progress: 40, daysLeft: 25 },
  ];
  return (
    <div className="space-y-4">
      {projects.map((p, i) => (
        <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[16px] font-black text-slate-900">{p.title}</h4>
            <span className="text-[12px] font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              باقي {p.daysLeft} يوم
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2">
            <div className="bg-primary h-2.5 rounded-full transition-all duration-1000" style={{ width: `${p.progress}%` }}></div>
          </div>
          <div className="flex justify-between text-[12px] text-slate-500 font-semibold">
            <span>تم جمع {p.progress}%</span>
            <span>الهدف المتبقي: {100 - p.progress}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
