"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { BadgeCheck, X, ShieldCheck, ExternalLink } from "lucide-react";

/* ── Types ───────────────────────────────────────────── */
export interface InitiativeCardProps {
  id: number;
  entityName: string;
  category: string;
  categoryColor?: string;
  timestamp: string;
  title: string;
  description: string;
  collected: number;
  target: number;
  avatarGradient?: string;
}

/* ── Helpers ─────────────────────────────────────────── */
function formatNumber(n: number): string {
  return n.toLocaleString("ar-SA");
}

/* ── Payment Modal (rendered via Portal) ───────────── */
function PaymentModal({
  entityName,
  initiativeTitle,
  onClose,
}: {
  entityName: string;
  initiativeTitle: string;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return createPortal(
    /* Backdrop */
    <motion.div
      className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Modal Card */}
      <motion.div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient strip */}
        <div className="h-1.5 w-full bg-tanmawy-gradient" />

        <div className="px-6 pt-5 pb-6">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Icon badge */}
          <div className="flex flex-col items-center text-center mb-5">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3 shadow-sm">
              <ShieldCheck className="w-7 h-7 text-primary" strokeWidth={2} />
            </div>
            <h2 className="text-[18px] font-black text-slate-900 leading-tight">
              توجيه إلى منصة الدفع الرسمية
            </h2>
            <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">
              سيتم تحويلك لإتمام عملية الدعم عبر القنوات الرسمية المعتمدة
            </p>
          </div>

          {/* Info box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-5 text-right space-y-2.5">
            <div className="flex items-start justify-between gap-2">
              <span className="text-[12px] font-semibold text-slate-400 shrink-0">المبادرة</span>
              <span className="text-[13px] font-bold text-slate-800 text-right leading-snug">{initiativeTitle}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] font-semibold text-slate-400 shrink-0">الجهة</span>
              <span className="text-[13px] font-semibold text-slate-700 flex items-center gap-1">
                {entityName}
                <BadgeCheck className="w-3.5 h-3.5 text-primary shrink-0" />
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] font-semibold text-slate-400 shrink-0">عبر</span>
              <span className="text-[13px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                نفاذ / البنك المركزي
              </span>
            </div>
          </div>

          {/* Legal note */}
          <p className="text-[11px] text-slate-400 text-center mb-5 leading-relaxed px-2">
            لا تُجري منصة تنموي أي معاملات مالية مباشرة. يتم تحويل الدعم عبر البوابات الرسمية مباشرةً إلى الحساب المعتمد للكيان.
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-[14px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              إلغاء
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-tanmawy-gradient text-white text-[14px] font-bold shadow-sm hover:shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
              onClick={onClose}
            >
              <ExternalLink className="w-4 h-4" />
              انتقال رسمي
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

/* ── Initiative Card ─────────────────────────────────── */
export default function InitiativeCard({
  entityName,
  category,
  categoryColor = "bg-teal-50 text-teal-700 border-teal-100",
  timestamp,
  title,
  description,
  collected,
  target,
  avatarGradient = "from-primary/20 to-secondary/20",
}: InitiativeCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const pct = Math.min(Math.round((collected / target) * 100), 100);
  const remaining = 100 - pct;

  return (
    <>
      <article className="bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 group">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3">
          <div className="flex items-start gap-3 min-w-0">
            {/* Avatar */}
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarGradient} flex items-center justify-center shrink-0 ring-1 ring-border`}>
              <span className="text-[14px] font-black text-foreground">{entityName.charAt(0)}</span>
            </div>

            {/* Entity info */}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[14px] font-bold text-foreground leading-tight">{entityName}</span>
                <BadgeCheck className="w-4 h-4 text-primary shrink-0" strokeWidth={2.5} />
              </div>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className={`inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full border ${categoryColor}`}>
                  {category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  {timestamp}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="px-5 pb-4">
          <h3 className="text-[16px] font-black text-slate-900 leading-snug mb-2">
            {title}
          </h3>
          <p className="text-[13.5px] text-slate-500 leading-relaxed">
            {description}
          </p>
        </div>

        {/* ── Progress ── */}
        <div className="px-5 pb-4">
          {/* Bar */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2.5">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            />
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-between gap-2">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 font-medium">تم جمع</span>
              <p className="text-[13px] font-black text-primary leading-tight">
                {formatNumber(collected)} ر.س
              </p>
            </div>

            {/* Remaining badge */}
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
              remaining <= 10
                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                : remaining <= 30
                  ? "bg-amber-50 text-amber-700 border border-amber-100"
                  : "bg-slate-100 text-slate-600"
            }`}>
              متبقي {remaining}%
            </span>

            <div className="text-left">
              <span className="text-[11px] text-slate-400 font-medium">المستهدف</span>
              <p className="text-[13px] font-bold text-slate-600 leading-tight">
                {formatNumber(target)} ر.س
              </p>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="px-5 pb-5">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full py-2.5 rounded-xl bg-tanmawy-gradient text-white text-[14px] font-bold shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
          >
            دعم المبادرة
          </button>
        </div>

      </article>

      {/* Modal */}
      {modalOpen && (
        <PaymentModal
          entityName={entityName}
          initiativeTitle={title}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
