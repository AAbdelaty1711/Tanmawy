"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sprout, TreePine, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface AuthPanelProps {
  children: React.ReactNode;
}

/* ── Mock Card 1: Urgent Initiative ────────── */
function MockCardInitiative() {
  return (
    <motion.div
      className="w-full rounded-2xl p-4 text-white"
      style={{
        background: "rgba(255,255,255,0.13)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,0.22)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        rotate: "-1.5deg",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -12, 0] }}
      transition={{
        opacity: { duration: 0.5, delay: 0.5 },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
      }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <TreePine className="w-4 h-4 text-white" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-white/60 font-medium leading-none mb-0.5">مبادرة عاجلة</p>
          <p className="text-[13px] font-bold leading-tight">مبادرة تشجير الحي</p>
        </div>
        <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full shrink-0">75%</span>
      </div>
      <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-3">
        <motion.div
          className="h-full rounded-full bg-white/80"
          initial={{ width: "0%" }}
          animate={{ width: "75%" }}
          transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-1.5 space-x-reverse">
          {["#5eead4", "#a5b4fc", "#fda4af"].map((c, i) => (
            <div key={i} className="w-5 h-5 rounded-full border-2 border-white/30" style={{ background: c }} />
          ))}
        </div>
        <span className="text-[10px] text-white/50">بواسطة جمعية البر الخيري</span>
      </div>
    </motion.div>
  );
}

/* ── Mock Card 2: AI Insight ────────────────── */
function MockCardAI() {
  return (
    <motion.div
      className="w-[85%] rounded-2xl p-3.5 text-white self-end"
      style={{
        background: "rgba(99,102,241,0.22)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        rotate: "1.5deg",
        marginTop: "-10px",
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 0.93, y: [0, -9, 0] }}
      transition={{
        opacity: { duration: 0.5, delay: 0.9 },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
      }}
    >
      <div className="flex items-start gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2} />
        </div>
        <div>
          <p className="text-[10px] text-white/60 font-semibold mb-1">رؤى تنموي AI</p>
          <p className="text-[12.5px] font-bold leading-snug">✨ تم إيجاد تطابق</p>
          <div className="flex items-center gap-1 mt-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-300 shrink-0" strokeWidth={2.5} />
            <p className="text-[10px] text-white/60">مبادرة بيئية متوافقة مع اهتماماتك</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AuthPanel({ children }: AuthPanelProps) {
  return (
    <div
      className="relative min-h-screen auth-gradient-bg overflow-hidden"
      dir="rtl"
      style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
    >
      {/* ── Dot-grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.16) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
        }}
      />

      {/* ── Ambient glow orbs ── */}
      {[
        { size: 400, left: "-80px", top: "-100px", delay: 0   },
        { size: 300, left: "60%",   top: "55%",    delay: 1.2 },
        { size: 200, left: "15%",   top: "70%",    delay: 0.6 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: orb.size, height: orb.size,
            left: orb.left, top: orb.top,
            background: "rgba(255,255,255,0.06)",
            filter: "blur(60px)",
          }}
          animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 7 + i, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
        />
      ))}

      {/* ═══════════════════════════════════════════════════
          LAYOUT: In RTL, flex-row renders right→left.
          So: first child = RIGHT side, second child = LEFT side.
          • FORM CARD  → first  → appears on the RIGHT (form side)
          • BRANDING   → second → appears on the LEFT  (visual side)
         ═══════════════════════════════════════════════════ */}
      {/* ══════════════════════════════
           MOBILE LAYOUT (hidden on lg+)
          ══════════════════════════════ */}
      <div className="lg:hidden relative z-10 flex flex-col min-h-screen">

        {/* Hero gradient header with branding */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center px-6 py-10 text-center gap-3">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Link href="/" className="flex flex-col items-center gap-2">
              <img src="/logo.png" alt="تنموي" className="w-22 h-22 object-contain" />
              <span className="text-white text-2xl font-black tracking-tight drop-shadow-md">تنموي</span>
            </Link>
          </motion.div>
          <motion.p
            className="text-white/70 text-sm font-medium mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            نحو مجتمع تنموي ذكي ومستدام
          </motion.p>
        </div>

        {/* Bottom-sheet white card */}
        <motion.div
          className="flex-1 bg-white dark:bg-slate-900 rounded-t-3xl overflow-hidden"
          style={{ boxShadow: "0 -8px 40px rgba(0,0,0,0.15)" }}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
        >
          {/* Pill handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="px-6 py-6 overflow-y-auto">
            {children}
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════
           DESKTOP LAYOUT (hidden on mobile)
          ══════════════════════════════ */}
      <div className="hidden lg:flex relative z-10 min-h-screen flex-row items-center justify-between px-16 xl:px-24 gap-12 py-10">

        {/* ══ FORM CARD — first child → RIGHT in RTL ══ */}
        <motion.div
          className="flex-shrink-0 w-[420px] xl:w-[440px]"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
        >
          <div
            className="w-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-transparent dark:border-white/5"
            style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.24), 0 0 0 1px rgba(255,255,255,0.10)" }}
          >
            <div className="px-8 py-10 overflow-y-auto max-h-[88vh]">
              {children}
            </div>
          </div>
        </motion.div>

        {/* ══ BRANDING — second child → LEFT in RTL ══ */}
        <div className="flex flex-col flex-1 max-w-[400px] text-right items-end">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link href="/" className="inline-flex flex-col gap-2 group items-end">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src="/logo.png" alt="تنموي" className="w-22 h-22 object-contain" />
              </motion.div>
              <span className="text-white text-2xl font-black tracking-tight drop-shadow-md">تنموي</span>
            </Link>
          </motion.div>

          {/* Slogan */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mb-10"
          >
            <h1 className="text-white text-3xl font-black leading-snug drop-shadow-md mb-2">
              نحو مجتمع تنموي
              <br />
              <span className="text-white/75 font-semibold text-2xl">ذكي ومستدام</span>
            </h1>
            <p className="text-white/55 text-[14px] leading-relaxed font-normal">
              منصة متكاملة لتمكين الكيانات التنموية
              <br />وبناء مجتمعات واعية ومؤثرة
            </p>
          </motion.div>

          {/* Floating mock cards */}
          <motion.div
            className="flex flex-col gap-0 w-full"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <MockCardInitiative />
            <MockCardAI />
          </motion.div>

          {/* Indicator dots */}
          <motion.div
            className="flex gap-2 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {[true, false, false].map((active, i) => (
              <div
                key={i}
                className={`rounded-full transition-all ${
                  active ? "w-5 h-1.5 bg-white/70" : "w-1.5 h-1.5 bg-white/30"
                }`}
              />
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
