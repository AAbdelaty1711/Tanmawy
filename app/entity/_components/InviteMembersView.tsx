"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, User, ShieldCheck, Trash2, CheckCircle2, XCircle, CreditCard, Search } from "lucide-react";

interface DirectMember {
  id: string;
  name: string;
  nationalId: string;
  role: string;
  status: "registered" | "pending_reg";
  dateAdded: string;
}

export function InviteMembersView() {
  const [members, setMembers] = useState<DirectMember[]>([
    { id: "1", name: "خالد بن عبدالله السديري", nationalId: "1029384756", role: "محاسب مالي", status: "registered", dateAdded: "2026-05-24" },
    { id: "2", name: "محمد بن سعيد الحربي", nationalId: "1098273645", role: "منسق ميداني", status: "pending_reg", dateAdded: "2026-05-25" },
    { id: "3", name: "عبدالرحمن بن علي الشهري", nationalId: "1076543210", role: "مدير تسويق رقمي", status: "pending_reg", dateAdded: "2026-05-25" },
  ]);

  const [name, setName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [role, setRole] = useState("منسق ميداني");
  const [searchQuery, setSearchQuery] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || nationalId.length !== 10) {
      triggerToast("يجب إدخال اسم صحيح ورقم هوية وطنية من 10 خانات.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const newMember: DirectMember = {
        id: Date.now().toString(),
        name,
        nationalId,
        role,
        status: "pending_reg",
        dateAdded: new Date().toISOString().split("T")[0],
      };

      setMembers([newMember, ...members]);
      setName("");
      setNationalId("");
      setSubmitting(false);
      triggerToast("تم إضافة بيانات العضو بنجاح وبانتظار تسجيل دخوله.");
    }, 1000);
  };

  const removeMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
    triggerToast("تم حذف بيانات العضو وإلغاء صلاحية تسجيله.");
  };

  const filteredMembers = members.filter(
    m =>
      m.name.includes(searchQuery) ||
      m.role.includes(searchQuery) ||
      m.nationalId.includes(searchQuery)
  );

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 left-6 md:left-auto md:w-80 bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-4 py-3.5 rounded-2xl shadow-xl border border-slate-800 dark:border-slate-100 flex items-center justify-between gap-3 z-[99999]"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-[13px] font-bold">{toastMsg}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
        <div>
          <h3 className="text-[16px] font-bold text-slate-800 dark:text-slate-200">إضافة الأعضاء الجدد</h3>
          <p className="text-[12px] text-slate-400 dark:text-slate-500">إضافة الاسم ورقم الهوية الوطنية للموظف ليتم التعرف على حسابه وصلاحياته فور قيامه بالتسجيل</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form to add member (1 col on large screen, can be 1/3 layout) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-2xl p-5 md:p-6 space-y-5">
            <h4 className="text-[14px] font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-primary" /> إضافة بيانات عضو جديد
            </h4>

            <form onSubmit={handleAddMember} className="space-y-4">
              {/* Member Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-350">الاسم الكامل للعضو</label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="الاسم الثلاثي أو الكامل"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[13px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500"
                  />
                </div>
              </div>

              {/* National ID */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-350">رقم الهوية الوطنية</label>
                <div className="relative">
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    required
                    maxLength={10}
                    pattern="\d{10}"
                    placeholder="1XXXXXXXXX"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[13px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Role dropdown */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-350">الدور أو المسمى الوظيفي</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-[13px] text-slate-800 dark:text-slate-100 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500 cursor-pointer"
                >
                  <option value="محاسب مالي">محاسب مالي</option>
                  <option value="منسق ميداني">منسق ميداني</option>
                  <option value="مدير تسويق رقمي">مدير تسويق رقمي</option>
                  <option value="مدير مشاريع ومبادرات">مدير مشاريع ومبادرات</option>
                  <option value="مدخل بيانات مستفيدين">مدخل بيانات مستفيدين</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-2.5 rounded-xl bg-tanmawy-gradient text-white text-[13px] font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
              >
                {submitting ? (
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <UserPlus className="w-4 h-4" />
                )}
                إضافة العضو للنظام
              </button>
            </form>
          </div>
        </div>

        {/* Members List (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h4 className="text-[14px] font-black text-slate-900 dark:text-slate-100">قائمة بيانات الأعضاء المضافة</h4>
              
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  placeholder="ابحث بالاسم أو الهوية..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-8 pl-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 text-[12px] text-slate-800 dark:text-slate-100 placeholder:text-slate-450 dark:placeholder:text-slate-600 outline-none transition-all focus:border-teal-400 dark:focus:border-teal-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-[13px]">
                <thead className="bg-slate-50 dark:bg-slate-850/60 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-100 dark:border-white/5">
                  <tr>
                    <th className="px-5 py-3.5">الاسم الكامل</th>
                    <th className="px-5 py-3.5">الهوية الوطنية</th>
                    <th className="px-5 py-3.5">الدور المخصص</th>
                    <th className="px-5 py-3.5">حالة الحساب</th>
                    <th className="px-5 py-3.5 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4 font-semibold text-slate-800 dark:text-slate-200">{member.name}</td>
                      <td className="px-5 py-4 font-mono text-slate-500 dark:text-slate-400">{member.nationalId}</td>
                      <td className="px-5 py-4 text-slate-600 dark:text-slate-450">{member.role}</td>
                      <td className="px-5 py-4">
                        {member.status === "registered" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            مكتمل التسجيل
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            بانتظار التسجيل
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => removeMember(member.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-450 rounded-lg text-[12px] font-bold transition-all hover:scale-105 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredMembers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-slate-450 dark:text-slate-500 bg-slate-50/20 dark:bg-transparent">
                        لا يوجد أعضاء يطابقون بحثك.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
