"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import { useUserStore } from "@/src/store/useUserStore";
import {
  Building, FileText, ShieldCheck, CheckCircle2, Building2, Calendar, Landmark, ArrowLeft
} from "lucide-react";

export default function CreateEntityPage() {
  const router = useRouter();
  const { setFounder } = useUserStore();
  const [licenseNumber, setLicenseNumber] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fetchedData, setFetchedData] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseNumber.trim()) return;

    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
      setFetchedData({
        name: "جمعية روافد للتمكين والتعليم الأهلية",
        type: "جمعية أهلية",
        licenseNum: licenseNumber,
        authority: "المركز الوطني لتنمية القطاع غير الربحي",
        establishDate: "1442/08/12 هـ",
        status: "نشط ومعتمد",
      });
      setSubmitted(true);
    }, 2000);
  };

  const handleConfirm = () => {
    setFounder(true);
    router.push("/entity");
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto py-12 px-4 min-h-[80vh] flex flex-col justify-center">
        
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <Building className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
            <span className="text-[12px] font-bold text-primary">توثيق الكيان الفوري</span>
          </div>
          <h1 className="text-[26px] font-black text-slate-900 dark:text-slate-100 leading-tight mb-2">
            توثيق كيان تنموي جديد
          </h1>
          <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
            أدخل رقم الترخيص لجلب بيانات الكيان الخاص بك وتوثيقه تلقائياً من السجلات الرسمية
          </p>
        </div>

        <div className="bg-surface border border-border rounded-3xl shadow-xl overflow-hidden relative">
          <div className="h-1.5 w-full bg-tanmawy-gradient" />

          <AnimatePresence mode="wait">
            {isFetching ? (
              <motion.div
                key="fetching"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 py-16 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                  <Building2 className="w-6 h-6 text-primary absolute animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    جاري جلب بيانات الكيان...
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-450 max-w-xs">
                    نقوم الآن بالاستعلام من قاعدة بيانات المركز الوطني لتنمية القطاع غير الربحي
                  </p>
                </div>
              </motion.div>
            ) : submitted && fetchedData ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-6 md:p-8 space-y-6 text-right"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-55/10 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/30 flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-8 h-8 text-emerald-55" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-[20px] font-black text-slate-900 dark:text-slate-100">
                      تم العثور على الكيان وتوثيقه!
                    </h2>
                    <p className="text-[13px] text-slate-500 dark:text-slate-450 mt-1">
                      تم التحقق من صحة الترخيص بنجاح وجلب البيانات الرسمية
                    </p>
                  </div>
                </div>

                {/* Fetched Data Block */}
                <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/5 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-200/50 dark:border-white/5 pb-3">
                    <span className="text-[12px] text-slate-450 dark:text-slate-500 font-semibold">اسم الكيان</span>
                    <span className="text-[14px] font-black text-slate-800 dark:text-slate-200 text-left">{fetchedData.name}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-white/5 pb-3">
                    <span className="text-[12px] text-slate-450 dark:text-slate-500 font-semibold">نوع الكيان</span>
                    <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300">{fetchedData.type}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-white/5 pb-3">
                    <span className="text-[12px] text-slate-450 dark:text-slate-500 font-semibold">رقم الترخيص</span>
                    <span className="text-[13.5px] font-bold text-primary tabular-nums">{fetchedData.licenseNum}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-white/5 pb-3">
                    <span className="text-[12px] text-slate-450 dark:text-slate-500 font-semibold">الجهة المشرفة</span>
                    <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-slate-400" />
                      {fetchedData.authority}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-white/5 pb-3">
                    <span className="text-[12px] text-slate-450 dark:text-slate-500 font-semibold">تاريخ التأسيس</span>
                    <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {fetchedData.establishDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-slate-450 dark:text-slate-500 font-semibold">حالة الترخيص</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 px-2.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-55" />
                      {fetchedData.status}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleConfirm}
                    className="w-full py-3.5 rounded-xl bg-tanmawy-gradient text-white text-[15px] font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    تأكيد البيانات والدخول للوحة التحكم
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setLicenseNumber("");
                    }}
                    className="w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 text-[14px] font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    البحث عن ترخيص آخر
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 md:p-8 text-right"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* License Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="licenseNumber"
                      className="block text-sm font-bold text-slate-700 dark:text-slate-350"
                    >
                      رقم الترخيص الرسمي
                    </label>
                    <div className="relative">
                      <FileText
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none"
                        strokeWidth={1.8}
                      />
                      <input
                        id="licenseNumber"
                        type="text"
                        required
                        placeholder="مثال: SA-10293"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        className="w-full pr-11 pl-4 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[15px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-650 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-950/30"
                      />
                    </div>
                  </div>

                  {/* Warning/Info Box */}
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
                    <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" strokeWidth={2} />
                    <p className="text-[12px] text-amber-800 dark:text-amber-400 leading-relaxed font-semibold">
                      يجب إدخال ترخيص ساري ومسجل لدى الجهات الرسمية لكي تتمكن من إطلاق مبادراتك الخيرية وقبول التبرعات.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="space-y-4 pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-tanmawy-gradient text-white text-[15px] font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                      توثيق الكيان وجلب البيانات
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 text-[14px] font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      العودة للخلف
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
}
