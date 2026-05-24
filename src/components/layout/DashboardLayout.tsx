'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false)
  const pathname = usePathname()

  const hideLeftColumnRoutes = ['/entity', '/lab', '/create-entity', '/ai']
  const hideLeftColumn = hideLeftColumnRoutes.some((p) => pathname?.startsWith(p))

  // ── Prevent body scroll when mobile drawer is open ─────
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

  // ── Close left panel on content-heavy routes ───────────
  useEffect(() => {
    if (hideLeftColumn) setIsLeftPanelOpen(false)
  }, [hideLeftColumn])

  const handleLeftPanelToggle = () => setIsLeftPanelOpen((o) => !o)

  return (
    <div className="min-h-screen bg-background font-sans" dir="rtl">

      {/* ── 3-Column Page Shell ────────────────────────── */}
      <div className="flex w-full relative">

        {/* ── RIGHT COLUMN: Sidebar Navigation ──────────
            Animated width via framer-motion.
            Collapses to icon-only strip (w-16 / 64px).
            Hidden on mobile (<lg); drawer used instead. */}
        <motion.aside
          className="hidden lg:flex flex-col shrink-0 sticky top-0 h-screen overflow-y-auto overflow-x-hidden border-l border-border bg-surface"
          animate={{ width: isSidebarCollapsed ? 64 : 288 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <Sidebar
            isOpen={false}
            onClose={() => {}}
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={setIsSidebarCollapsed}
          />
        </motion.aside>

        {/* ── CENTRE COLUMN: Feed ───────────────────────
            Flexible width; left + right borders; scrolls. */}
        <div className="flex-1 min-w-0 flex flex-col border-x border-border min-h-screen">
          {/* Sticky Navbar */}
          <Navbar
            onMenuClick={() => setIsMobileOpen(true)}
            isSidebarCollapsed={isSidebarCollapsed}
            onLeftPanelToggle={handleLeftPanelToggle}
            isLeftPanelOpen={isLeftPanelOpen}
            hideLeftPanelToggle={hideLeftColumn}
          />

          {/* Scrollable feed content */}
          <main className="flex-1">{children}</main>
        </div>

        {/* ── LEFT COLUMN: Widgets — slide-in drawer ─────
            Default: CLOSED. Opens via Navbar toggle.
            Animates width 0 → 320px, pushing content.
            Only visible on xl+ screens.               */}
        <AnimatePresence>
          {isLeftPanelOpen && !hideLeftColumn && (
            <motion.aside
              key="left-panel"
              className="hidden xl:flex flex-col shrink-0 sticky top-0 h-screen overflow-hidden border-r border-border bg-surface"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Fixed-width inner so content doesn't squish during animation */}
              <div className="w-80 flex flex-col h-full overflow-y-auto p-4 space-y-4">
                {widgets ?? <DefaultWidgets />}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* ── Mobile Sidebar Drawer ─────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileOpen(false)}
            />
            {/* Drawer — slides in from the right (RTL) */}
            <motion.div
              key="mobile-sidebar"
              className="fixed top-0 right-0 z-50 w-72 h-screen overflow-hidden bg-surface shadow-2xl lg:hidden flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <Sidebar
                isOpen={isMobileOpen}
                onClose={() => setIsMobileOpen(false)}
                isCollapsed={false}
                setIsCollapsed={() => {}}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Default Left-Column Widgets ───────────────────── */
function DefaultWidgets() {
  const completedInitiatives = [
    { name: 'تجهيز 50 شنطة رمضان',      entity: 'جمعية البر الخيري',            progress: 100, badge: 'مكتملة - قيد المتابعة' },
    { name: 'دعم 20 أسرة محتاجة',        entity: 'مؤسسة الرحمة الإنسانية',        progress: 100, badge: 'مكتملة - قيد المتابعة' },
    { name: 'توفير كسوة العيد للأطفال',  entity: 'جمعية أُسرة بلا مأوى',          progress: 100, badge: 'مكتملة - قيد المتابعة' },
  ]

  const { isFounder } = useUserStore()

  return (
    <>
      {/* ── Widget 0: نظرة عامة على الكيان (Founder Only) ── */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isFounder ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className={`bg-surface rounded-2xl border border-border overflow-hidden ${isFounder ? 'mb-4' : ''}`}>
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <Building2 className="w-[18px] h-[18px] text-teal-500 shrink-0" strokeWidth={2.5} />
            <h3 className="text-sm font-bold text-foreground">نظرة عامة على الكيان</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2 text-muted-fg">
                <Wallet className="w-4 h-4 text-teal-500" />
                <span className="font-medium">التبرعات هذا الشهر</span>
              </div>
              <span className="font-bold text-teal-600 dark:text-teal-400">15,000 ر.س</span>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2 text-muted-fg">
                <FolderKanban className="w-4 h-4 text-amber-500" />
                <span className="font-medium">المبادرات النشطة</span>
              </div>
              <span className="font-bold text-foreground">2</span>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2 text-muted-fg">
                <Users className="w-4 h-4 text-indigo-500" />
                <span className="font-medium">المستفيدين</span>
              </div>
              <span className="font-bold text-foreground">120</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Widget 1: المبادرات المكتملة ─────────────────── */}
      <div className="bg-surface rounded-2xl border border-border overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <h3 className="text-sm font-bold text-foreground">المبادرات المكتملة</h3>
        </div>

        <ul className="divide-y divide-border">
          {completedInitiatives.map((item) => {
            return (
              <li
                key={item.name}
                className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-[13px] font-semibold text-foreground leading-snug text-right">
                    {item.name}
                  </span>
                  <span className="shrink-0 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100/60 dark:border-emerald-900/40 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {item.badge}
                  </span>
                </div>
                <p className="text-[11px] text-muted-fg mb-2 text-right">
                  بواسطة: {item.entity}
                </p>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700/85 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `100%` }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {/* ── Widget 2: رؤى تنموي AI ──────────────────── */}
      <div className="bg-surface rounded-2xl border border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-[18px] h-[18px] text-indigo-500 shrink-0" strokeWidth={2.5} />
          <h3 className="text-sm font-bold text-foreground">رؤى تنموي AI</h3>
        </div>

        <div className="bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 rounded-xl p-4 text-right">
          <p className="text-[13px] text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
            بناءً على اهتماماتك، نقترح عليك متابعة المبادرات البيئية الجديدة
            لتعظيم أثرك المجتمعي.
          </p>
          <div className="mt-3.5 flex items-center justify-between border-t border-indigo-100/50 dark:border-indigo-900/25 pt-2.5">
            <span className="text-[10px] font-bold text-indigo-400 select-none">
              تحليل ذكي · شخصي
            </span>
            <button className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
              عرض المقترحات ←
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
