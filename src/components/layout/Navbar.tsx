"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, Search, ChevronDown } from "lucide-react";

export interface NavbarProps {
  onMenuClick: () => void;
  isSidebarCollapsed: boolean;
  title?: string;
}

const ROUTE_TITLES: Record<string, string> = {
  "/": "الرئيسية",
  "/community": "مجتمع تنموي",
  "/entity": "إدارة الكيان",
  "/create-entity": "إنشاء كيان",
  "/ai": "تنموي AI",
  "/lab": "ممكّنو منصة تنموي",
  "/support": "مساعدة ودعم فني",
  "/profile": "الملف الشخصي",
};

export default function Navbar({ onMenuClick, title }: NavbarProps) {
  const pathname = usePathname();
  const resolvedTitle = ROUTE_TITLES[pathname] || title || "الرئيسية";

  return (
    <header className="sticky top-0 z-30 bg-surface/85 backdrop-blur-xl border-b border-border">

      {/* ── Top bar ─────────────────────────────── */}
      <div className="flex items-center gap-2 h-[50px] px-4">

        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden shrink-0 flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 text-foreground transition-colors"
          aria-label="القائمة"
        >
          <Menu className="w-[18px] h-[18px]" />
        </button>

        {/* Title */}
        <h1 className="text-[15px] font-bold text-foreground tracking-tight leading-none shrink-0 truncate">
          {resolvedTitle}
        </h1>

        {/* Global Search Bar */}
        <div className="relative w-72 hidden md:block ms-4">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-fg" />
          <input type="text" placeholder="ابحث عن كيان، مبادرة، أو مستخدم..." className="w-full bg-slate-100 border-none rounded-full pl-4 pr-9 py-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all" />
        </div>

        {/* Spacer */}
        <div className="flex-1 min-w-0" />

        {/* Action cluster */}
        <div className="flex items-center gap-1.5 shrink-0">

          {/* Bell */}
          <button
            className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
            aria-label="إشعارات"
          >
            <Bell className="w-[18px] h-[18px]" strokeWidth={2} />
            <span className="absolute top-[10px] right-[10px] w-1.5 h-1.5 bg-primary border border-surface rounded-full" />
          </button>

          {/* User Profile → /profile */}
          <Link
            href="/profile"
            className="flex items-center gap-2 hover:bg-slate-50 px-2 py-1 rounded-full transition-colors"
            aria-label="الملف الشخصي"
          >
            {/* Avatar */}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 transition-all">
              <span className="text-[12px] font-bold text-foreground leading-none">ع</span>
              {/* Pulsing online dot */}
              <span className="absolute -bottom-px -left-px flex">
                <span className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400/60 animate-ping" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-500 border-[1.5px] border-surface" />
              </span>
            </div>

            {/* User Name */}
            <span className="hidden sm:inline text-[13.5px] font-bold text-slate-700 select-none">
              عبدالله محمد
            </span>

            {/* Dropdown Arrow */}
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:inline" />
          </Link>
        </div>
      </div>
    </header>
  );
}
