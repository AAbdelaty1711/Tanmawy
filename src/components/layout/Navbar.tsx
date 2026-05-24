"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Bell, Menu, Search, ChevronDown, PanelLeft, Sun, Moon } from "lucide-react";

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
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
            aria-label={isDarkMode ? "التبديل إلى الوضع النهاري" : "التبديل إلى الوضع الليلي"}
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
          <button
            className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-500 dark:text-slate-400 transition-colors"
            aria-label="إشعارات"
          >
            <Bell className="w-[18px] h-[18px]" strokeWidth={2} />
            {/* Indigo badge dot (secondary color for non-primary action) */}
            <span className="absolute top-[10px] right-[10px] w-1.5 h-1.5 bg-indigo-500 border border-surface rounded-full" />
          </button>

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
              عبدالله محمد
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
