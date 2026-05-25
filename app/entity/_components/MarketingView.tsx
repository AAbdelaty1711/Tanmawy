"use client";

import React, { useState } from "react";
import { Target, Eye, MousePointerClick, BarChart, Sparkles, BrainCircuit, Download, Check } from "lucide-react";

export function MarketingView() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedImg(null);

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedImg("/images/charity_sprout_marketing.png");
    }, 2000);
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Quick stats */}
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

      {/* AI Image Generation Section */}
      <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-2xl p-6 space-y-6">
        <div>
          <h3 className="text-[16px] font-black text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            صناعة المحتوى التسويقي بالذكاء الاصطناعي
          </h3>
          <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-1 font-semibold">
            اكتب وصفاً تفصيلياً (Prompt) ليقوم نموذج تنموي AI بتصميم بوستر تسويقي احترافي لحملتك
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">أمر التوليد (Prompt)</label>
            <textarea
              required
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="مثال: تصميم بوستر إعلاني ثلاثي الأبعاد لحملة سقيا الماء، يظهر أيدي دافئة تقدم كوباً من الماء العذب مع إضاءة ناعمة وخلفية تنموية مريحة..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[14px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-650 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500 resize-none text-right"
            />
          </div>

          <div className="flex justify-start">
            <button
              type="submit"
              disabled={!prompt.trim() || isGenerating}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-tanmawy-gradient text-white text-[13px] font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  جاري توليد الصورة...
                </>
              ) : (
                <>
                  <BrainCircuit className="w-4 h-4" />
                  توليد صورة بالـ AI
                </>
              )}
            </button>
          </div>
        </form>

        {/* Output area */}
        {isGenerating && (
          <div className="border border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 flex items-center justify-center animate-pulse">
              <Sparkles className="w-6 h-6 text-indigo-500 animate-spin" />
            </div>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 font-bold animate-pulse">يقوم نموذج تنموي AI برسم أفكارك الآن...</p>
          </div>
        )}

        {generatedImg && (
          <div className="space-y-4 animate-fadeIn">
            <div className="border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800/20 max-w-md mx-auto relative group">
              <img
                src={generatedImg}
                alt="AI Generated Banner"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  onClick={() => window.open(generatedImg, "_blank")}
                  className="p-3 bg-white hover:bg-slate-100 text-slate-800 rounded-full shadow-lg transition-all hover:scale-110 cursor-pointer"
                  title="تحميل الصورة"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-[12px] font-bold text-emerald-600 dark:text-emerald-450">
              <Check className="w-4 h-4" />
              تم التوليد بنجاح! يمكنك تحميل الصورة واستخدامها في حملتك الترويجية.
            </div>
          </div>
        )}
      </div>

      {/* Campaign Details Placeholder */}
      <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-white/5 rounded-2xl p-6 text-center">
        <BarChart className="w-10 h-10 text-slate-300 dark:text-slate-655 mx-auto mb-3" />
        <p className="text-[14px] text-slate-500 dark:text-slate-400">رسم بياني تفصيلي لنتائج حملات التسويق الرقمي قريباً...</p>
      </div>
    </div>
  );
}
