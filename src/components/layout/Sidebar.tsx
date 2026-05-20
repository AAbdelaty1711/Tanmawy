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

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { isFounder } = useUserStore();

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

      {/* ── Logo ──────────────────────────────────────── */}
      <div className="px-3 pt-3 pb-1">
        <Link
          href="/"
          className="inline-flex items-center justify-center w-12 h-12 rounded-full hover:bg-primary/10 transition-colors"
          aria-label="تنموي"
        >
          <Sprout className="w-7 h-7 text-primary" strokeWidth={2.5} />
        </Link>
      </div>

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
              className={`
                group flex items-center gap-4 px-3 py-2.5 rounded-full
                transition-all duration-150 mb-0.5
                ${item.isCallToAction
                  ? "border border-amber-200/60 bg-amber-50/50 hover:bg-amber-100 text-amber-700"
                  : isActive
                    ? "text-primary bg-primary/5"
                    : "text-slate-700 hover:bg-slate-100"
                }
              `}
            >
              {/* Icon wrapper — circle appears on hover exactly like Twitter */}
              <div className="relative shrink-0">
                <Icon
                  className={`w-[22px] h-[22px] transition-all ${
                    item.isCallToAction ? "text-amber-600" : isActive ? "text-primary" : "text-slate-600"
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {/* Notification badge */}
                {item.badge && (
                  <span className="absolute -top-1.5 -left-1 min-w-[18px] h-[18px] flex items-center justify-center bg-primary rounded-full text-white text-[10px] font-bold px-1">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[17px] leading-none ${
                  isOpen ? "block animate-fade-in" : "hidden xl:block"
                } ${
                  isActive ? "font-bold" : "font-normal group-hover:font-medium"
                }`}
              >
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom CTA button ────────────────────────────── */}
      <div className="px-3 pb-4 pt-2">
        {/* Wide sidebar (xl): full label */}
        <Link
          href={isFounder ? "/entity" : "/create-entity"}
          className={`${
            isOpen ? "flex" : "hidden xl:flex"
          } w-full items-center justify-center gap-2 bg-tanmawy-gradient text-white font-bold rounded-full py-3.5 text-[15px] transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]`}
        >
          {isFounder ? "إدارة الكيان" : "إنشاء كيان"}
        </Link>
        {/* Narrow sidebar: icon only */}
        <Link
          href={isFounder ? "/entity" : "/create-entity"}
          className={`${
            isOpen ? "hidden" : "xl:hidden flex"
          } items-center justify-center w-12 h-12 mx-auto bg-tanmawy-gradient text-white rounded-full transition-all shadow-sm hover:scale-[1.05] active:scale-[0.95]`}
        >
          <PlusCircle className="w-6 h-6" strokeWidth={2.5} />
        </Link>
      </div>

      {/* ── User profile footer ───────────────────────── */}
      <div className="px-2 pb-4">
        <button className="group flex items-center gap-3 w-full px-3 py-3 rounded-full hover:bg-slate-100 transition-colors">
          {/* Avatar with online dot */}
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
              <span className="text-[12px] font-bold text-foreground">ع</span>
            </div>
            <span className="absolute -bottom-0.5 -left-0.5 w-3 h-3 bg-emerald-500 border-2 border-surface rounded-full" />
          </div>

          {/* Name & handle */}
          <div className={`${isOpen ? "flex" : "hidden xl:flex"} flex-col flex-1 min-w-0 text-right`}>
            <span className="text-sm font-bold text-foreground truncate leading-tight">
              عبدالله محمد
            </span>
          </div>

          <MoreHorizontal className={`${isOpen ? "block" : "hidden xl:block"} w-4 h-4 text-muted-fg shrink-0`} />
        </button>
      </div>

      {/* Mobile close */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 left-4 flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        aria-label="إغلاق"
      >
        <X className="w-4.5 h-4.5" />
      </button>
    </div>
  );
}
