'use client'

import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { usePathname } from 'next/navigation'
import { Sparkles, Building2, Wallet, FolderKanban, Users } from 'lucide-react'
import { useUserStore } from '@/src/store/useUserStore'

interface DashboardLayoutProps {
  children: React.ReactNode
  /** Optional widget panel content for the left column */
  widgets?: React.ReactNode
}

export default function DashboardLayout({
  children,
  widgets,
}: DashboardLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  const hideLeftColumnRoutes = ['/entity', '/lab', '/create-entity', '/ai']
  const hideLeftColumn = hideLeftColumnRoutes.some((p) => pathname?.startsWith(p))

  // Prevent scrolling on the body when the mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  return (
    <div className="min-h-screen bg-background font-sans" dir="rtl">
      {/* ── 3-Column Page Shell ────────────────────────── */}
      <div className="flex w-full relative">
        {/* ── RIGHT COLUMN: Sidebar Navigation ──────────
            Fixed-width; sticks to the right side of the
            content container. Hidden on mobile (<lg).     */}
        <aside className="hidden lg:flex flex-col w-72 xl:w-80 shrink-0 sticky top-0 h-screen overflow-y-auto border-l border-border">
          <Sidebar
            isOpen={false}
            onClose={() => {}}
            isCollapsed={false}
            setIsCollapsed={() => {}}
          />
        </aside>

        {/* ── CENTRE COLUMN: Feed ───────────────────────
            max-w-2xl, left + right 1px borders, scrolls. */}
        <div className="flex-1 min-w-0 flex flex-col border-x border-border min-h-screen">
          {/* Sticky feed header (Navbar) */}
          <Navbar
            onMenuClick={() => setIsMobileOpen(true)}
            isSidebarCollapsed={false}
          />

          {/* Scrollable feed content */}
          <main className="flex-1">{children}</main>
        </div>

        {/* ── LEFT COLUMN: Widgets ──────────────────────────
            Visible only on xl screens. Hidden on content-heavy pages. */}
        {!hideLeftColumn && (
          <aside className="hidden xl:flex flex-col w-80 shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-border p-4 space-y-4">
            {widgets ?? <DefaultWidgets />}
          </aside>
        )}
      </div>

      {/* ── Mobile Sidebar Drawer ─────────────────────── */}
      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed top-0 right-0 z-50 w-72 h-screen overflow-hidden bg-surface shadow-2xl lg:hidden flex flex-col">
            <Sidebar
              isOpen={isMobileOpen}
              onClose={() => setIsMobileOpen(false)}
              isCollapsed={false}
              setIsCollapsed={() => {}}
            />
          </div>
        </>
      )}
    </div>
  )
}

/* ── Default Left-Column Widgets ───────────────────── */
function DefaultWidgets() {
  /* ── Widget 1 data ── */
  const urgentInitiatives = [
    {
      name: 'تجهيز 50 شنطة رمضان',
      entity: 'جمعية البر الخيري',
      progress: 75,
    },
    {
      name: 'دعم 20 أسرة محتاجة',
      entity: 'مؤسسة الرحمة الإنسانية',
      progress: 48,
    },
    {
      name: 'توفير كسوة العيد للأطفال',
      entity: 'جمعية أُسرة بلا مأوى',
      progress: 91,
    },
  ]

  const { isFounder } = useUserStore()

  return (
    <>
      {/* ── Widget 0: نظرة عامة على الكيان (Founder Only) ── */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isFounder ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className={`bg-surface rounded-2xl border border-slate-200 overflow-hidden ${isFounder ? "mb-4" : ""}`}>
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200">
            <Building2 className="w-[18px] h-[18px] text-primary shrink-0" strokeWidth={2.5} />
            <h3 className="text-sm font-bold text-foreground">نظرة عامة على الكيان</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2 text-slate-600">
                <Wallet className="w-4 h-4 text-emerald-500" />
                <span className="font-medium">التبرعات هذا الشهر</span>
              </div>
              <span className="font-bold text-emerald-600">15,000 ر.س</span>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2 text-slate-600">
                <FolderKanban className="w-4 h-4 text-amber-500" />
                <span className="font-medium">المبادرات النشطة</span>
              </div>
              <span className="font-bold text-foreground">2</span>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2 text-slate-600">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="font-medium">المستفيدين</span>
              </div>
              <span className="font-bold text-foreground">120</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Widget 1: مبادرات عاجلة ─────────────────── */}
      <div className="bg-surface rounded-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200">
          {/* Pulsing alert dot */}
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
          </span>
          <h3 className="text-sm font-bold text-foreground">مبادرات عاجلة</h3>
        </div>

        {/* Items */}
        <ul className="divide-y divide-slate-100">
          {urgentInitiatives.map((item) => {
            const remaining = 100 - item.progress
            return (
              <li
                key={item.name}
                className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                {/* Name + remaining label */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-[13px] font-semibold text-foreground leading-snug text-right">
                    {item.name}
                  </span>
                  <span className="shrink-0 text-[11px] font-bold text-[#14b8a6] whitespace-nowrap">
                    متبقي {remaining}%
                  </span>
                </div>

                {/* Entity */}
                <p className="text-[11px] text-muted-fg mb-2 text-right">
                  بواسطة: {item.entity}
                </p>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#14b8a6] rounded-full transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {/* ── Widget 2: رؤى تنموي AI ──────────────────── */}
      <div className="bg-surface rounded-2xl border border-slate-200 p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <Sparkles
            className="w-[18px] h-[18px] text-[#6366f1] shrink-0"
            strokeWidth={2.5}
          />
          <h3 className="text-sm font-bold text-foreground">رؤى تنموي AI</h3>
        </div>

        {/* Soft Indigo Card */}
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 text-right">
          <p className="text-[13px] text-slate-700 font-medium leading-relaxed">
            بناءً على اهتماماتك، نقترح عليك متابعة المبادرات البيئية الجديدة
            لتعظيم أثرك المجتمعي.
          </p>
          <div className="mt-3.5 flex items-center justify-between border-t border-indigo-100/50 pt-2.5">
            <span className="text-[10px] font-bold text-indigo-400 select-none">
              تحليل ذكي · شخصي
            </span>
            <button className="text-[11px] font-bold text-[#6366f1] hover:text-[#4f46e5] transition-colors">
              عرض المقترحات ←
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
