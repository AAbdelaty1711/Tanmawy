"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Target, Calendar, MapPin, Users, Coins, FileText, UploadCloud, CheckCircle2 } from "lucide-react";
import { createPortal } from "react-dom";

export function ProjectsView() {
  const [projects, setProjects] = useState([
    { title: "حملة الشتاء الدافئ", progress: 75, target: 80000, collected: 60000, daysLeft: 12, category: "أسر محتاجة", region: "الرياض" },
    { title: "سقيا الماء وحفر الآبار", progress: 40, target: 50000, collected: 20000, daysLeft: 25, category: "سكان القرى", region: "عسير" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "أسر محتاجة",
    target: "",
    region: "الرياض",
    description: "",
    daysLeft: "30",
    fileName: "",
  });

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setFormData((prev) => ({ ...prev, fileName: "دراسة_جدوى_المبادرة_مرفقة.pdf" }));
    }, 1000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.target) return;

    const newProj = {
      title: formData.title,
      progress: 0,
      target: parseFloat(formData.target),
      collected: 0,
      daysLeft: parseInt(formData.daysLeft) || 30,
      category: formData.category,
      region: formData.region,
    };

    setProjects([newProj, ...projects]);
    setIsModalOpen(false);
    setFormData({
      title: "",
      category: "أسر محتاجة",
      target: "",
      region: "الرياض",
      description: "",
      daysLeft: "30",
      fileName: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header / Add Button */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
        <div>
          <h3 className="text-[16px] font-bold text-slate-800 dark:text-slate-200">البرامج التنموية والمبادرات</h3>
          <p className="text-[12px] text-slate-400 dark:text-slate-500">إدارة المبادرات الحالية وإطلاق حملات تبرع جديدة</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-tanmawy-gradient text-white text-[13px] font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          إنشاء برنامج جديد
        </button>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p, i) => (
          <div key={i} className="bg-surface border border-border rounded-2xl p-5 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-[15px] font-black text-slate-900 dark:text-slate-100 line-clamp-1">{p.title}</h4>
                <span className="shrink-0 text-[11px] font-bold text-amber-600 dark:text-amber-450 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-100/60 dark:border-amber-900/20">
                  باقي {p.daysLeft} يوم
                </span>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-450 dark:text-slate-500">
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-350 px-2 py-0.5 rounded border border-slate-200/50 dark:border-white/5">{p.category}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3 text-slate-400" /> {p.region}</span>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2 mt-4">
              <div className="w-full bg-slate-100 dark:bg-slate-800/80 rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${p.progress}%` }}></div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-450 font-bold">
                <span>تم جمع {p.collected.toLocaleString("ar-SA")} ر.س ({p.progress}%)</span>
                <span className="text-slate-450 dark:text-slate-500">المستهدف: {p.target.toLocaleString("ar-SA")} ر.س</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Program Modal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn" dir="rtl">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden text-right relative"
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

            <div className="p-6 md:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">إطلاق برنامج تنموي جديد</h3>
                <p className="text-xs text-slate-500 dark:text-slate-450 mt-1 font-semibold">تعبئة التفاصيل الرسمية لتوفير الدعم المالي والاجتماعي</p>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">اسم المبادرة / البرنامج</label>
                  <div className="relative">
                    <Target className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450 dark:text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="مثال: مبادرة كسوة الشتاء للأيتام"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[14px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-650 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500"
                    />
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">الفئة المستهدفة</label>
                    <div className="relative">
                      <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450 dark:text-slate-500 pointer-events-none" />
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[14px] text-slate-800 dark:text-slate-100 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500 appearance-none cursor-pointer"
                      >
                        <option value="أيتام">أيتام</option>
                        <option value="أسر محتاجة">أسر محتاجة</option>
                        <option value="طلاب علم">طلاب علم</option>
                        <option value="أرامل ومطلقات">أرامل ومطلقات</option>
                      </select>
                    </div>
                  </div>

                  {/* Target Amount */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">المبلغ المستهدف (ر.س)</label>
                    <div className="relative">
                      <Coins className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450 dark:text-slate-500" />
                      <input
                        type="number"
                        required
                        min="100"
                        placeholder="مثال: 50000"
                        value={formData.target}
                        onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                        className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[14px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-650 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Grid 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Region */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">المنطقة الجغرافية</label>
                    <div className="relative">
                      <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450 dark:text-slate-500 pointer-events-none" />
                      <select
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[14px] text-slate-800 dark:text-slate-100 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500 appearance-none cursor-pointer"
                      >
                        <option value="الرياض">الرياض</option>
                        <option value="مكة المكرمة">مكة المكرمة</option>
                        <option value="المنطقة الشرقية">المنطقة الشرقية</option>
                        <option value="عسير">عسير</option>
                      </select>
                    </div>
                  </div>

                  {/* End date / days left */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">مدة البرنامج (أيام)</label>
                    <div className="relative">
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450 dark:text-slate-500" />
                      <input
                        type="number"
                        required
                        min="1"
                        placeholder="30"
                        value={formData.daysLeft}
                        onChange={(e) => setFormData({ ...formData, daysLeft: e.target.value })}
                        className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[14px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-650 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">وصف البرنامج وأهدافه</label>
                  <div className="relative">
                    <FileText className="absolute right-3 top-3 w-4 h-4 text-slate-450 dark:text-slate-500" />
                    <textarea
                      rows={3}
                      placeholder="اشرح الفائدة المرجوة من البرنامج التنموي والآلية المتبعة للتنفيذ..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[14px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-650 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500 resize-none"
                    />
                  </div>
                </div>

                {/* File Attachment */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">الملفات الثبوتية ودراسة الجدوى</label>
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={uploading}
                    className={`w-full py-5 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
                      formData.fileName 
                        ? "border-emerald-500 bg-emerald-50/20 dark:border-emerald-900/30" 
                        : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {uploading ? (
                      <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                    ) : formData.fileName ? (
                      <>
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        <span className="text-[12px] font-bold text-emerald-600 dark:text-emerald-450">{formData.fileName}</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-6 h-6 text-slate-450 dark:text-slate-500" />
                        <span className="text-[12px] font-bold text-slate-600 dark:text-slate-300">انقر لرفع المستندات (خطط العمل، دراسة الجدوى، صور التراخيص)</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-550 font-medium">PDF, DOCX, PNG, JPG حتى 10 ميجابايت</span>
                      </>
                    )}
                  </button>
                </div>

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
                    إطلاق المبادرة
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
