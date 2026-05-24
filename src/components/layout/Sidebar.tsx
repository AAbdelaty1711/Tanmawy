"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  HeartHandshake,
  Building,
  LayoutDashboard,
  Sparkles,
  FlaskConical,
  LifeBuoy,
  X,
  Sprout,
  MoreHorizontal,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useUserStore } from "@/src/store/useUserStore";

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}

interface MenuItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconActive: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  badge?: number;
  badgeVariant?: "teal" | "indigo";
  isCallToAction?: boolean;
}

export default function Sidebar({
  isOpen,
  onClose,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const pathname = usePathname();
  const { isFounder } = useUserStore();

  // Show label if in mobile drawer OR desktop sidebar is expanded
  const showLabel = isOpen || !isCollapsed;
  // Desktop collapsed (icon-only) state
  const isIconOnly = isCollapsed && !isOpen;

  const menuItems: MenuItem[] = [
    // Always visible
    { title: "الرئيسية",             href: "/",              icon: Home,            iconActive: Home            },
    { title: "مجتمع تنموي",         href: "/community",     icon: HeartHandshake,  iconActive: HeartHandshake  },

    // Regular users only: CTA to register an entity
    ...(!isFounder
      ? [{ title: "إنشاء كيان", href: "/create-entity", icon: Building, iconActive: Building }]
      : []
    ),

    // Founder-only: Entity Management Dashboard
    ...(isFounder
      ? [{ title: "إدارة الكيان",      href: "/entity",        icon: LayoutDashboard, iconActive: LayoutDashboard }]
      : []
    ),

    // Always visible
    { title: "تنموي AI",            href: "/ai",            icon: Sparkles,        iconActive: Sparkles,       badgeVariant: "indigo" },

    // Founder-only: Tanmawy Platform Enablers (AI Agents)
    ...(isFounder
      ? [{ title: "ممكنين منصة تنموي",  href: "/lab",           icon: FlaskConical,    iconActive: FlaskConical    }]
      : []
    ),

    // Always visible
    { title: "مساعدة ودعم فني",     href: "/support",       icon: LifeBuoy,        iconActive: LifeBuoy        },
  ];

  return (
    <div className="flex flex-col flex-1 h-full w-full bg-surface overflow-hidden">

      {/* ── Top bar: Logo + Collapse Toggle ────────────────────
          Expanded: [Logo ←→ CollapseBtn] in a row
          Collapsed (icon-only): Logo + CollapseBtn stacked   */}
      {isIconOnly ? (
        /* ── Collapsed: stacked vertically, centered ── */
        <div className="hidden lg:flex flex-col items-center gap-1 py-3">
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-teal-50 dark:hover:bg-teal-950/40 transition-colors"
            aria-label="تنموي"
          >
            <Sprout className="w-6 h-6 text-teal-500" strokeWidth={2.5} />
          </Link>
          {/* Expand button */}
          <button
            onClick={() => setIsCollapsed(false)}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-white/[0.06] text-muted-fg transition-colors"
            aria-label="توسيع الشريط الجانبي"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* ── Expanded / mobile: Logo + optional collapse btn ── */
        <div className="flex items-center justify-between px-3 pt-3 pb-1">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full hover:bg-teal-50 dark:hover:bg-teal-950/40 transition-colors"
            aria-label="تنموي"
          >
            <Sprout className="w-7 h-7 text-teal-500" strokeWidth={2.5} />
          </Link>

          {/* Collapse button — desktop only, hidden in mobile drawer */}
          {!isOpen && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-white/[0.06] text-muted-fg transition-colors"
              aria-label="طي الشريط الجانبي"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* ── Nav items ─────────────────────────────────── */}
      <nav className="flex-1 px-2 py-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = isActive ? item.iconActive : item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={isIconOnly ? item.title : undefined}
              className={`
                group flex items-center gap-4 px-3 py-2.5 rounded-full
                transition-all duration-150 mb-0.5
                ${isIconOnly ? "justify-center" : ""}
                ${item.isCallToAction
                  ? "border border-amber-200/60 bg-amber-50/50 dark:bg-amber-900/10 hover:bg-amber-100 dark:hover:bg-amber-900/20 text-amber-700 dark:text-amber-400"
                  : isActive
                    ? "text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                }
              `}
            >
              {/* Icon wrapper */}
              <div className="relative shrink-0">
                <Icon
                  className={`w-[22px] h-[22px] transition-all ${
                    item.isCallToAction
                      ? "text-amber-600 dark:text-amber-400"
                      : isActive
                        ? "text-indigo-600 dark:text-indigo-300"
                        : "text-slate-600 dark:text-slate-400"
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {/* Numeric notification badge */}
                {item.badge && (
                  <span className="absolute -top-1.5 -left-1 min-w-[18px] h-[18px] flex items-center justify-center bg-indigo-500 rounded-full text-white text-[10px] font-bold px-1">
                    {item.badge}
                  </span>
                )}
                {/* Indigo AI indicator dot */}
                {item.badgeVariant === "indigo" && (
                  <span className="absolute -top-0.5 -left-0.5 w-2 h-2 rounded-full bg-indigo-500 border border-surface" />
                )}
              </div>

              {/* Text label — hidden in icon-only mode */}
              {showLabel && (
                <span
                  className={`text-[17px] leading-none whitespace-nowrap ${
                    isActive ? "font-bold" : "font-normal group-hover:font-medium"
                  }`}
                >
                  {item.title}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom CTA button ────────────────────────────── */}
      <div className={`px-3 pb-2 pt-2 ${isIconOnly ? "flex justify-center" : ""}`}>
        {showLabel ? (
          <Link
            href={isFounder ? "/entity" : "/create-entity"}
            className="flex w-full items-center justify-center gap-2 bg-tanmawy-gradient text-white font-bold rounded-full py-3.5 text-[15px] transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            {isFounder ? "إدارة الكيان" : "إنشاء كيان"}
          </Link>
        ) : (
          <Link
            href={isFounder ? "/entity" : "/create-entity"}
            title={isFounder ? "إدارة الكيان" : "إنشاء كيان"}
            className="flex items-center justify-center w-12 h-12 bg-tanmawy-gradient text-white rounded-full transition-all shadow-sm hover:scale-[1.05] active:scale-[0.95]"
          >
            <PlusCircle className="w-6 h-6" strokeWidth={2.5} />
          </Link>
        )}
      </div>

      {/* ── User profile footer ───────────────────────── */}
      <div className="px-2 pb-4">
        <button
          className={`group flex items-center gap-3 w-full px-3 py-3 rounded-full hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors ${
            isIconOnly ? "justify-center" : ""
          }`}
        >
          {/* Avatar with online dot */}
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400/30 to-indigo-400/30 flex items-center justify-center">
              <span className="text-[12px] font-bold text-foreground">ع</span>
            </div>
            <span className="absolute -bottom-0.5 -left-0.5 w-3 h-3 bg-emerald-500 border-2 border-surface rounded-full" />
          </div>

          {/* Name — hidden in icon-only mode */}
          {showLabel && (
            <div className="flex flex-col flex-1 min-w-0 text-right">
              <span className="text-sm font-bold text-foreground truncate leading-tight">
                عبدالله محمد
              </span>
            </div>
          )}

          {showLabel && (
            <MoreHorizontal className="w-4 h-4 text-muted-fg shrink-0" />
          )}
        </button>
      </div>

      {/* ── Mobile close button ───────────────────────── */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 left-4 flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/70 text-slate-600 dark:text-slate-300 transition-colors"
        aria-label="إغلاق"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
