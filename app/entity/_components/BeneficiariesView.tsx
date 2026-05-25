"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, User, CreditCard, Users, HeartHandshake, CircleDollarSign, UploadCloud, CheckCircle2, FolderHeart } from "lucide-react";
import { createPortal } from "react-dom";

export function BeneficiariesView() {
  const [families, setFamilies] = useState([
    { name: "عائلة عبدالله السديري", type: "دعم مالي شهري", status: "نشط", nationalId: "1092837465", members: 5, program: "حملة الشتاء الدافئ" },
    { name: "عائلة اليتيم فهد الخالدي", type: "كفالة أيتام", status: "نشط", nationalId: "1082736452", members: 3, program: "كفالة 100 طالب علم متميز" },
    { name: "عائلة محمد الشمري", type: "سلة غذائية", status: "قيد المراجعة", nationalId: "1072839401", members: 6, program: "سقيا الماء وحفر الآبار" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nationalId: "",
    members: "",
    type: "دعم مالي شهري",
    income: "",
    fileName: "",
    program: "حملة الشتاء الدافئ",
  });

  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setFormData(prev => ({ ...prev, fileName: "ثبوتية_العائلة_مرفق.pdf" }));
    }, 1000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.nationalId.length !== 10) return;

    const newFamily = {
      name: formData.name,
      type: formData.type,
      status: "قيد المراجعة",
      nationalId: formData.nationalId,
      members: parseInt(formData.members) || 1,
      program: formData.program,
    };

    setFamilies([newFamily, ...families]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      nationalId: "",
      members: "",
      type: "دعم مالي شهري",
      income: "",
      fileName: "",
      program: "حملة الشتاء الدافئ",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header / Add Button */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
        <div>
          <h3 className="text-[16px] font-bold text-slate-800 dark:text-slate-200">سجل المستفيدين</h3>
          <p className="text-[12px] text-slate-400 dark:text-slate-500">إضافة وإدارة بيانات الأسر المستفيدة وتتبع حالة الدعم</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-tanmawy-gradient text-white text-[13px] font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          إضافة مستفيد جديد
        </button>
      </div>

      {/* Grid of Families */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {families.map((f, i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div>
              <h4 className="text-[15px] font-black text-slate-900 dark:text-slate-100 mb-1">
                {f.name}
              </h4>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-455 dark:text-slate-500 flex-wrap">
                <span>{f.type}</span>
                <span>•</span>
                <span>{f.members} أفراد</span>
                <span>•</span>
                <span className="tabular-nums">هوية: {f.nationalId}</span>
                {f.program && (
                  <>
                    <span>•</span>
                    <span className="bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100/60 dark:border-indigo-900/30 px-2 py-0.5 rounded-md font-bold text-[10px]">
                      {f.program}
                    </span>
                  </>
                )}
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 ${
                f.status === "نشط"
                  ? "bg-emerald-55/10 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30"
                  : "bg-amber-50/50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30"
              }`}
            >
              {f.status}
            </span>
          </div>
        ))}
      </div>

      {/* Add Beneficiary Modal */}
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
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">إضافة مستفيد جديد للسجل</h3>
                <p className="text-xs text-slate-500 dark:text-slate-450 mt-1 font-semibold">تثبيت بيانات رب الأسرة وربطها بنوع الدعم المحدد</p>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                {/* Beneficiary Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">اسم رب الأسرة / المستفيد</label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450 dark:text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="الاسم الكامل لرب الأسرة"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[14px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-650 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500"
                    />
                  </div>
                </div>

                {/* Grid 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* National ID */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">رقم الهوية الوطنية</label>
                    <div className="relative">
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-455 dark:text-slate-500" />
                      <input
                        type="text"
                        required
                        maxLength={10}
                        pattern="\d{10}"
                        placeholder="1XXXXXXXXX"
                        value={formData.nationalId}
                        onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                        className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[14px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-655 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500"
                      />
                    </div>
                  </div>

                  {/* Family Members Count */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">عدد أفراد الأسرة</label>
                    <div className="relative">
                      <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-455 dark:text-slate-500 pointer-events-none" />
                      <input
                        type="number"
                        required
                        min="1"
                        placeholder="مثال: 5"
                        value={formData.members}
                        onChange={(e) => setFormData({ ...formData, members: e.target.value })}
                        className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[14px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-655 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Grid 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Support Type */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">نوع الدعم المطلوب</label>
                    <div className="relative">
                      <HeartHandshake className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-455 dark:text-slate-500 pointer-events-none" />
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[14px] text-slate-800 dark:text-slate-100 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500 appearance-none cursor-pointer"
                      >
                        <option value="دعم مالي شهري">دعم مالي شهري</option>
                        <option value="سلة غذائية">سلة غذائية</option>
                        <option value="كفالة أيتام">كفالة أيتام</option>
                        <option value="إسكان اجتماعي">إسكان اجتماعي</option>
                      </select>
                    </div>
                  </div>

                  {/* Monthly Income */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">الدخل الشهري للأسرة (ر.س)</label>
                    <div className="relative">
                      <CircleDollarSign className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-455 dark:text-slate-500" />
                      <input
                        type="number"
                        required
                        min="0"
                        placeholder="الدخل بالريال"
                        value={formData.income}
                        onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                        className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[14px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-655 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Program/Initiative Selection */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">البرنامج / المبادرة التابع لها</label>
                  <div className="relative">
                    <FolderHeart className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-455 dark:text-slate-500 pointer-events-none" />
                    <select
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[14px] text-slate-800 dark:text-slate-100 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500 appearance-none cursor-pointer"
                    >
                      <option value="حملة الشتاء الدافئ">حملة الشتاء الدافئ</option>
                      <option value="سقيا الماء وحفر الآبار">سقيا الماء وحفر الآبار</option>
                      <option value="كفالة 100 طالب علم متميز">كفالة 100 طالب علم متميز</option>
                    </select>
                  </div>
                </div>

                {/* File Attachment */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">المستندات الثبوتية والتقارير</label>
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={uploading}
                    className={`w-full py-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
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
                        <span className="text-[12px] font-bold text-emerald-600 dark:text-emerald-400">{formData.fileName}</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-6 h-6 text-slate-450 dark:text-slate-500" />
                        <span className="text-[12px] font-bold text-slate-655 dark:text-slate-300">انقر لرفع المستندات (صك العائلة، تقارير الحالة)</span>
                        <span className="text-[10px] text-slate-450 dark:text-slate-500">PDF, PNG, JPG حتى 5 ميجابايت</span>
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
                    إضافة المستفيد
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
