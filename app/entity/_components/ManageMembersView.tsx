"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Shield, Save, CheckCircle2, User, Mail, ShieldAlert } from "lucide-react";

interface Member {
  id: string;
  name: string;
  avatarColor: string;
  email: string;
  role: string;
  permissions: {
    manageRevenues: boolean;
    manageBeneficiaries: boolean;
    launchInitiatives: boolean;
    digitalMarketing: boolean;
  };
}

export function ManageMembersView() {
  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "سلطان المطيري",
      avatarColor: "bg-teal-500",
      email: "s.mutairi@najah.org.sa",
      role: "محاسب مالي",
      permissions: {
        manageRevenues: true,
        manageBeneficiaries: false,
        launchInitiatives: false,
        digitalMarketing: false,
      },
    },
    {
      id: "2",
      name: "ياسر القحطاني",
      avatarColor: "bg-blue-500",
      email: "y.qahtani@najah.org.sa",
      role: "مدير مشاريع ومبادرات",
      permissions: {
        manageRevenues: true,
        manageBeneficiaries: true,
        launchInitiatives: true,
        digitalMarketing: false,
      },
    },
    {
      id: "3",
      name: "نورة العتيبي",
      avatarColor: "bg-rose-500",
      email: "n.otaibi@najah.org.sa",
      role: "مدير تسويق رقمي",
      permissions: {
        manageRevenues: false,
        manageBeneficiaries: false,
        launchInitiatives: true,
        digitalMarketing: true,
      },
    },
    {
      id: "4",
      name: "فيصل الدوسري",
      avatarColor: "bg-amber-500",
      email: "f.dawsari@najah.org.sa",
      role: "منسق ميداني",
      permissions: {
        manageRevenues: false,
        manageBeneficiaries: true,
        launchInitiatives: false,
        digitalMarketing: false,
      },
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePermissionToggle = (memberId: string, permissionKey: keyof Member["permissions"]) => {
    setMembers(prev =>
      prev.map(member => {
        if (member.id === memberId) {
          const updatedPermissions = {
            ...member.permissions,
            [permissionKey]: !member.permissions[permissionKey],
          };
          return { ...member, permissions: updatedPermissions };
        }
        return member;
      })
    );
    triggerToast("تم تحديث الصلاحيات بنجاح!");
  };

  const handleRoleChange = (memberId: string, newRole: string) => {
    setMembers(prev =>
      prev.map(member => (member.id === memberId ? { ...member, role: newRole } : member))
    );
    triggerToast("تم تغيير دور العضو وحفظه.");
  };

  const filteredMembers = members.filter(
    m =>
      m.name.includes(searchQuery) ||
      m.role.includes(searchQuery) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h3 className="text-[16px] font-bold text-slate-800 dark:text-slate-200">إدارة الأعضاء والصلاحيات</h3>
          <p className="text-[12px] text-slate-400 dark:text-slate-500">التحكم في أدوار موظفي الكيان وتعديل صلاحيات الوصول الممنوحة لهم</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          placeholder="ابحث عن عضو بالاسم، الدور، أو البريد الإلكتروني..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 text-[13px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none transition-all focus:border-teal-400 dark:focus:border-teal-500 shadow-sm"
        />
      </div>

      {/* Members Grid / Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-2xl p-5 md:p-6 space-y-6 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl ${member.avatarColor} text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0`}>
                  {member.name.split(" ")[0][0]}
                </div>
                <div>
                  <h4 className="text-[15px] font-black text-slate-900 dark:text-slate-100 leading-tight mb-0.5">
                    {member.name}
                  </h4>
                  <p className="text-[12px] text-slate-400 dark:text-slate-500 font-semibold flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                    {member.email}
                  </p>
                </div>
              </div>

              {/* Role Dropdown */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0">الدور الحالي:</span>
                <select
                  value={member.role}
                  onChange={(e) => handleRoleChange(member.id, e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 text-[12px] font-bold text-slate-800 dark:text-slate-200 outline-none cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <option value="محاسب مالي">محاسب مالي</option>
                  <option value="منسق ميداني">منسق ميداني</option>
                  <option value="مدير تسويق رقمي">مدير تسويق رقمي</option>
                  <option value="مدير مشاريع ومبادرات">مدير مشاريع ومبادرات</option>
                  <option value="مدخل بيانات مستفيدين">مدخل بيانات مستفيدين</option>
                </select>
              </div>
            </div>

            {/* Permissions Toggles */}
            <div className="border-t border-slate-100 dark:border-white/5 pt-4">
              <h5 className="text-[12px] font-bold text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-primary" /> صلاحيات الوصول الممنوحة
              </h5>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* Switch 1: Manage Revenues */}
                <div
                  onClick={() => handlePermissionToggle(member.id, "manageRevenues")}
                  className={`cursor-pointer flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                    member.permissions.manageRevenues
                      ? "bg-teal-50/50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-900/30 text-teal-800 dark:text-teal-400 font-bold"
                      : "bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-850/30 text-slate-450 dark:text-slate-500"
                  }`}
                >
                  <span className="text-[12px]">إدارة التبرعات</span>
                  <div className={`w-8 h-4.5 rounded-full p-0.5 flex transition-colors ${member.permissions.manageRevenues ? "bg-teal-500 justify-end" : "bg-slate-200 dark:bg-slate-700 justify-start"}`}>
                    <span className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
                  </div>
                </div>

                {/* Switch 2: Manage Beneficiaries */}
                <div
                  onClick={() => handlePermissionToggle(member.id, "manageBeneficiaries")}
                  className={`cursor-pointer flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                    member.permissions.manageBeneficiaries
                      ? "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/30 text-blue-800 dark:text-blue-400 font-bold"
                      : "bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-850/30 text-slate-450 dark:text-slate-500"
                  }`}
                >
                  <span className="text-[12px]">إضافة المستفيدين</span>
                  <div className={`w-8 h-4.5 rounded-full p-0.5 flex transition-colors ${member.permissions.manageBeneficiaries ? "bg-blue-500 justify-end" : "bg-slate-200 dark:bg-slate-700 justify-start"}`}>
                    <span className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
                  </div>
                </div>

                {/* Switch 3: Launch Initiatives */}
                <div
                  onClick={() => handlePermissionToggle(member.id, "launchInitiatives")}
                  className={`cursor-pointer flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                    member.permissions.launchInitiatives
                      ? "bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/30 text-amber-800 dark:text-amber-400 font-bold"
                      : "bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-850/30 text-slate-450 dark:text-slate-500"
                  }`}
                >
                  <span className="text-[12px]">إطلاق المبادرات</span>
                  <div className={`w-8 h-4.5 rounded-full p-0.5 flex transition-colors ${member.permissions.launchInitiatives ? "bg-amber-500 justify-end" : "bg-slate-200 dark:bg-slate-700 justify-start"}`}>
                    <span className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
                  </div>
                </div>

                {/* Switch 4: Digital Marketing */}
                <div
                  onClick={() => handlePermissionToggle(member.id, "digitalMarketing")}
                  className={`cursor-pointer flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                    member.permissions.digitalMarketing
                      ? "bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/30 text-rose-800 dark:text-rose-400 font-bold"
                      : "bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-850/30 text-slate-450 dark:text-slate-500"
                  }`}
                >
                  <span className="text-[12px]">التسويق الرقمي</span>
                  <div className={`w-8 h-4.5 rounded-full p-0.5 flex transition-colors ${member.permissions.digitalMarketing ? "bg-rose-500 justify-end" : "bg-slate-200 dark:bg-slate-700 justify-start"}`}>
                    <span className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredMembers.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-2xl">
            <ShieldAlert className="w-10 h-10 text-slate-350 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-[13px] text-slate-400 dark:text-slate-500">لا يوجد أعضاء يطابقون بحثك الحالي.</p>
          </div>
        )}
      </div>
    </div>
  );
}
