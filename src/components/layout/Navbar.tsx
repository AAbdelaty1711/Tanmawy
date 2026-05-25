"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { 
  Bell, Menu, Search, ChevronDown, PanelLeft, Sun, Moon, 
  Users, Wallet, ShieldCheck, CheckCircle2, HeartHandshake 
} from "lucide-react";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUserStore } from "@/src/store/useUserStore";

export interface NavbarProps {
  onMenuClick: () => void;
  isSidebarCollapsed: boolean;
  /** Called when the user clicks the left-panel toggle button */
  onLeftPanelToggle: () => void;
  /** Whether the left widget panel is currently open */
  isLeftPanelOpen: boolean;
  /** Hide the left-panel toggle on content-heavy routes */
  hideLeftPanelToggle?: boolean;
  title?: string;
}

const ROUTE_TITLES: Record<string, string> = {
  "/":              "الرئيسية",
  "/community":     "مجتمع تنموي",
  "/entity":        "إدارة الكيان",
  "/create-entity": "إنشاء كيان",
  "/ai":            "تنموي AI",
  "/lab":           "ممكّنو منصة تنموي",
  "/support":       "مساعدة ودعم فني",
  "/profile":       "الملف الشخصي",
};

export default function Navbar({
  onMenuClick,
  onLeftPanelToggle,
  isLeftPanelOpen,
  hideLeftPanelToggle,
  title,
}: NavbarProps) {
  const pathname = usePathname();
  const resolvedTitle = ROUTE_TITLES[pathname] || title || "الرئيسية";
  const { theme, setTheme } = useTheme();
  const { isFounder } = useUserStore();
  const [mounted, setMounted] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const founderNotifications = [
    {
      id: 1,
      title: "متطوع جديد",
      desc: "تم تسجيل متطوع جديد في مبادرة كسوة الشتاء",
      time: "منذ ٥ د",
      icon: Users,
      iconColor: "text-blue-500 bg-blue-500/10 dark:text-blue-400 dark:bg-blue-950/40",
      unread: true,
    },
    {
      id: 2,
      title: "تبرع جديد",
      desc: "تلقيت مساهمة جديدة بقيمة 1,000 ر.س من سارة الدوسري",
      time: "منذ ساعة",
      icon: Wallet,
      iconColor: "text-emerald-500 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-950/40",
      unread: true,
    },
    {
      id: 3,
      title: "اعتماد رسمي",
      desc: "تم اعتماد مبادرة «سقيا الماء» رسمياً من المركز الوطني",
      time: "منذ يومين",
      icon: ShieldCheck,
      iconColor: "text-indigo-500 bg-indigo-500/10 dark:text-indigo-400 dark:bg-indigo-950/40",
      unread: false,
    },
  ];

  const userNotifications = [
    {
      id: 1,
      title: "اكتمال مبادرة",
      desc: "اكتملت مبادرة «سقيا الماء بالخرج» التي ساهمت بها بنجاح",
      time: "منذ ساعة",
      icon: CheckCircle2,
      iconColor: "text-emerald-500 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-950/40",
      unread: true,
    },
    {
      id: 2,
      title: "مبادرة مقترحة",
      desc: "مبادرة جديدة تبحث عن دعم: «ترميم وتجهيز 20 منزلاً»",
      time: "منذ ٣ ساعات",
      icon: HeartHandshake,
      iconColor: "text-rose-500 bg-rose-500/10 dark:text-rose-450 dark:bg-rose-950/40",
      unread: true,
    },
    {
      id: 3,
      title: "تقرير الأثر",
      desc: "تم نشر تقرير الأثر السنوي لجمعية نقاء التنموية",
      time: "منذ يومين",
      icon: ShieldCheck,
      iconColor: "text-indigo-500 bg-indigo-500/10 dark:text-indigo-400 dark:bg-indigo-950/40",
      unread: false,
    },
  ];

  const notifs = isFounder ? founderNotifications : userNotifications;

  const isDarkMode = theme === 'dark';
  const handleDarkModeToggle = () => setTheme(isDarkMode ? 'light' : 'dark');

  return (
    <header className="sticky top-0 z-30 bg-surface/85 backdrop-blur-xl border-b border-border">

      {/* ── Top bar ─────────────────────────────── */}
      <div className="flex items-center gap-2 h-[50px] px-4">

        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden shrink-0 flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-white/[0.06] text-foreground transition-colors"
          aria-label="القائمة"
        >
          <Menu className="w-[18px] h-[18px]" />
        </button>

        {/* Page Title */}
        <h1 className="text-[15px] font-bold text-foreground tracking-tight leading-none shrink-0 truncate">
          {resolvedTitle}
        </h1>

        {/* Global Search Bar */}
        <div className="relative w-72 hidden md:block ms-4">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-fg" />
          <input
            type="text"
            placeholder="ابحث عن كيان، مبادرة، أو مستخدم..."
            className="w-full bg-slate-100 dark:bg-slate-900 border border-transparent dark:border-white/5 rounded-full pl-4 pr-9 py-2 text-sm focus:ring-1 focus:ring-teal-400 outline-none transition-all text-foreground placeholder:text-muted-fg"
          />
        </div>

        {/* Spacer */}
        <div className="flex-1 min-w-0" />

        {/* ── Action cluster ──────────────────────── */}
        <div className="flex items-center gap-1.5 shrink-0">

          {/* Dark Mode Toggle */}
          <button
            id="dark-mode-toggle"
            onClick={handleDarkModeToggle}
            aria-label={mounted && isDarkMode ? "التبديل إلى الوضع النهاري" : "التبديل إلى الوضع الليلي"}
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
          >
            {mounted ? (
              isDarkMode ? (
                <Sun className="w-[18px] h-[18px] text-amber-400" strokeWidth={2} />
              ) : (
                <Moon className="w-[18px] h-[18px] text-slate-500 dark:text-slate-400" strokeWidth={2} />
              )
            ) : (
              <Moon className="w-[18px] h-[18px] text-slate-500" strokeWidth={2} />
            )}
          </button>

          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
              }}
              className={`relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors ${
                showNotifications ? "text-indigo-600 dark:text-indigo-400 bg-slate-100 dark:bg-white/[0.06]" : "text-slate-500 dark:text-slate-400"
              }`}
              aria-label="إشعارات"
              aria-expanded={showNotifications}
            >
              <Bell className="w-[18px] h-[18px]" strokeWidth={2} />
              {/* Indigo badge dot */}
              {hasUnread && (
                <span className="absolute top-[9px] right-[9px] w-1.5 h-1.5 bg-indigo-500 border border-surface rounded-full" />
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden z-50 text-right"
                >
                  {/* Popover Header */}
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20">
                    <span className="text-[14px] font-black text-slate-900 dark:text-slate-100 font-sans">الإشعارات</span>
                    {hasUnread && (
                      <button
                        onClick={() => setHasUnread(false)}
                        className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        تحديد الكل كمقروء
                      </button>
                    )}
                  </div>

                  {/* Popover List */}
                  <div className="max-h-[300px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {notifs.map((n) => {
                      const Icon = n.icon;
                      return (
                        <div
                          key={n.id}
                          className={`p-4 flex gap-3 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer relative ${
                            n.unread && hasUnread ? "bg-slate-50/30 dark:bg-slate-900/10" : ""
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${n.iconColor}`}>
                            <Icon className="w-4 h-4" strokeWidth={2.5} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[12px] font-bold text-slate-800 dark:text-slate-200">{n.title}</span>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">{n.time}</span>
                            </div>
                            <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-1 leading-normal font-semibold">
                              {n.desc}
                            </p>
                          </div>
                          {n.unread && hasUnread && (
                            <span className="absolute top-1/2 left-3 -translate-y-1/2 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile → /profile */}
          <Link
            href="/profile"
            className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-white/[0.06] px-2 py-1 rounded-full transition-colors"
            aria-label="الملف الشخصي"
          >
            {/* Avatar */}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-teal-400/20 to-indigo-400/20 transition-all">
              <span className="text-[12px] font-bold text-foreground leading-none">ع</span>
              {/* Pulsing online dot */}
              <span className="absolute -bottom-px -left-px flex">
                <span className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400/60 animate-ping" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-500 border-[1.5px] border-surface" />
              </span>
            </div>

            {/* User Name */}
            <span className="hidden sm:inline text-[13.5px] font-bold text-slate-700 dark:text-slate-200 select-none">
              عبدالعزيز القحطاني
            </span>

            {/* Dropdown Arrow */}
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:inline" />
          </Link>

          {/* Left Panel Toggle — xl+ only, hidden on content-heavy routes */}
          {!hideLeftPanelToggle && (
            <button
              id="left-panel-toggle"
              onClick={onLeftPanelToggle}
              aria-label="إظهار/إخفاء لوحة الإحصاءات"
              aria-pressed={isLeftPanelOpen}
              className={`hidden xl:flex items-center justify-center w-9 h-9 rounded-xl border transition-all duration-200 shadow-sm ${
                isLeftPanelOpen
                  ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10 hover:border-slate-350 dark:hover:border-white/20 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:shadow-md"
              }`}
            >
              <PanelLeft className="w-[18px] h-[18px]" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
