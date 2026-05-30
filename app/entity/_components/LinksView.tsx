"use client";

import React, { useState } from "react";
import { Copy, Check, Plus, X, Link2, Coins, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export function LinksView() {
  const [links, setLinks] = useState([
    { name: "رابط التبرع العام", url: "https://tanmawy.sa/pay/gen-123", amount: "متغير", type: "تبرع عام" },
    { name: "حملة كفالة يتيم", url: "https://tanmawy.sa/pay/orph-456", amount: "100 ر.س", type: "كفالة أيتام" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    type: "تبرع عام",
    amountType: "variable",
    amountValue: "",
  });

  const handleCopy = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const randomId = Math.floor(100 + Math.random() * 900);
    const amountText = formData.amountType === "variable" 
      ? "متغير" 
      : `${formData.amountValue} ر.س`;

    const newLink = {
      name: formData.name,
      url: `https://tanmawy.sa/pay/lnk-${randomId}`,
      amount: amountText,
      type: formData.type,
    };

    setLinks([newLink, ...links]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      type: "تبرع عام",
      amountType: "variable",
      amountValue: "",
    });
  };

  return (
    <div className="space-y-6 text-right animate-fadeIn" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
        <div>
          <h3 className="text-[16px] font-bold text-slate-800 dark:text-slate-200">روابط الدفع والتبرع السريع</h3>
          <p className="text-[12px] text-slate-400 dark:text-slate-500">توليد وإدارة روابط الدفع المباشر للحملات والمبادرات</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-tanmawy-gradient text-white text-[13px] font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          إنشاء رابط جديد
        </button>
      </div>

      {/* Links List */}
      <div className="space-y-3">
        {links.map((link, i) => (
          <div 
            key={i} 
            className="bg-surface border border-border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-[15px] font-black text-slate-900 dark:text-slate-100">{link.name}</h4>
                <span className="text-[10px] font-bold text-primary bg-primary/5 dark:bg-primary/10 px-2 py-0.5 rounded-full border border-primary/10">
                  {link.type}
                </span>
                <span className="text-[10px] font-bold text-indigo-650 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-full border border-indigo-100/60 dark:border-indigo-900/20">
                  قيمة الدعم: {link.amount}
                </span>
              </div>
              <p className="text-[12px] text-slate-400 dark:text-slate-500 font-mono" dir="ltr">
                {link.url}
              </p>
            </div>
            
            <button 
              onClick={() => handleCopy(link.url, i)}
              className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer shrink-0 ${
                copiedIndex === i
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/10"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              {copiedIndex === i ? (
                <>
                  <Check className="w-4 h-4" />
                  تم النسخ
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  نسخ الرابط
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Create Link Modal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4" dir="rtl">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden text-right relative"
          >
            {/* Header Strip */}
            <div className="h-1.5 w-full bg-tanmawy-gradient" />
            
            {/* Close */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">توليد رابط دفع جديد</h3>
                <p className="text-xs text-slate-500 dark:text-slate-455 mt-1 font-semibold">تخصيص رابط دفع آمن وتحديد الفئة والمبلغ</p>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">اسم رابط الدفع / الحملة</label>
                  <div className="relative">
                    <Link2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-455 dark:text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="مثال: صدقة سقيا الماء للمساجد"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[14px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-650 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500"
                    />
                  </div>
                </div>

                {/* Donation Type */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">نوع التبرع</label>
                  <div className="relative">
                    <FileText className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-455 dark:text-slate-500 pointer-events-none" />
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[14px] text-slate-800 dark:text-slate-100 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500 appearance-none cursor-pointer"
                    >
                      <option value="تبرع عام">تبرع عام</option>
                      <option value="صدقة جارية">صدقة جارية</option>
                      <option value="زكاة المال">زكاة المال</option>
                      <option value="كفالة أيتام">كفالة أيتام</option>
                    </select>
                  </div>
                </div>

                {/* Amount type */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">قيمة التبرع</label>
                  <div className="relative">
                    <Coins className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-455 dark:text-slate-500 pointer-events-none" />
                    <select
                      value={formData.amountType}
                      onChange={(e) => setFormData({ ...formData, amountType: e.target.value })}
                      className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[14px] text-slate-800 dark:text-slate-100 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500 appearance-none cursor-pointer"
                    >
                      <option value="variable">مبلغ متغير (يحدده المتبرع)</option>
                      <option value="fixed">مبلغ ثابت محدد</option>
                    </select>
                  </div>
                </div>

                {/* Fixed Amount Value */}
                {formData.amountType === "fixed" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-1.5"
                  >
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">قيمة التبرع الثابتة (ر.س)</label>
                    <div className="relative">
                      <Coins className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-455 dark:text-slate-500" />
                      <input
                        type="number"
                        required
                        min="1"
                        placeholder="مثال: 50"
                        value={formData.amountValue}
                        onChange={(e) => setFormData({ ...formData, amountValue: e.target.value })}
                        className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[14px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-655 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-[13px] font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-tanmawy-gradient text-white text-[13px] font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    إنشاء رابط
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>,
        document.body
      )}
    </div>
  );
}
