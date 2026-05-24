"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, X } from "lucide-react";
import AuthPanel from "@/src/components/auth/AuthPanel";
import StepBasicData from "@/src/components/auth/StepBasicData";
import StepPledge from "@/src/components/auth/StepPledge";

const STEPS = ["البيانات الأساسية", "التعهد"];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

/* ── Nafath Quick Auth Simulation Modal ── */
function NafathModal({ onClose }: { onClose: () => void }) {
  const [nationalId, setNationalId] = useState("");
  const [error, setError] = useState("");
  const [flowStep, setFlowStep] = useState<"input" | "pending" | "success">("input");
  const [randomCode, setRandomCode] = useState(0);
  const [countdown, setCountdown] = useState(60);

  // Countdown timer when pending
  React.useEffect(() => {
    if (flowStep !== "pending") return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onClose(); // Auto close if expired
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [flowStep, onClose]);

  // Simulate mobile app approval after 4.5 seconds
  React.useEffect(() => {
    if (flowStep !== "pending") return;
    const timeout = setTimeout(() => {
      setFlowStep("success");
    }, 4500);
    return () => clearTimeout(timeout);
  }, [flowStep]);

  // Redirect to homepage after success
  React.useEffect(() => {
    if (flowStep !== "success") return;
    const timeout = setTimeout(() => {
      window.location.href = "/";
    }, 2000);
    return () => clearTimeout(timeout);
  }, [flowStep]);

  const handleSubmitId = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[12]\d{9}$/.test(nationalId)) {
      setError("رقم الهوية الوطنية أو الإقامة يجب أن يتكون من 10 أرقام ويبدأ بـ 1 أو 2");
      return;
    }
    setError("");
    // Generate a random 2-digit verification code between 10 and 99
    setRandomCode(Math.floor(Math.random() * 90) + 10);
    setFlowStep("pending");
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50 dark:border-white/5"
      >
        {/* Header Bar */}
        <div className="h-1.5 w-full bg-gradient-to-l from-emerald-600 to-teal-600" />
        
        {/* Close Button */}
        {flowStep !== "success" && (
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="p-6 md:p-8 text-center font-sans">
          {flowStep === "input" && (
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center mb-3 text-emerald-600">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  تسجيل سريع عبر نفاذ الوطني
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  أدخل رقم الهوية أو الإقامة لتلقي طلب التحقق على تطبيق نفاذ
                </p>
              </div>

              <form onSubmit={handleSubmitId} className="space-y-4 text-right">
                <div className="space-y-1.5">
                  <label htmlFor="natId" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    رقم الهوية الوطنية / الإقامة
                  </label>
                  <input
                    id="natId"
                    type="text"
                    maxLength={10}
                    value={nationalId}
                    onChange={(e) => {
                      setNationalId(e.target.value.replace(/\D/g, ""));
                      setError("");
                    }}
                    placeholder="1XXXXXXXXX / 2XXXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-center font-bold tracking-[0.2em] text-[16px] text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-900/50 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-500 dark:focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950/20"
                  />
                  {error && (
                    <p className="text-xs text-rose-500 font-medium leading-relaxed">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-[14px] font-bold text-white bg-gradient-to-l from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
                >
                  إرسال طلب التحقق
                </button>
              </form>
            </div>
          )}

          {flowStep === "pending" && (
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-600 animate-spin flex items-center justify-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 font-black text-sm">
                    {countdown}
                  </div>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  يرجى فتح تطبيق نفاذ والموافقة
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  تم إرسال طلب التحقق إلى جهازك المسجل في أبشر.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-2xl p-6">
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">رقم التأكيد للمطابقة في التطبيق:</p>
                <div className="text-5xl font-black tracking-wider text-emerald-600 dark:text-emerald-500 animate-pulse">
                  {randomCode}
                </div>
              </div>

              <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
                افتح تطبيق نفاذ، اضغط على "قبول"، ثم اختر الرقم المطابق أعلاه لتأكيد الهوية.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-[13px] font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                إلغاء الطلب
              </button>
            </div>
          )}

          {flowStep === "success" && (
            <div className="space-y-5 py-4">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mb-4"
                >
                  <CheckCircle2 className="w-10 h-10" strokeWidth={2.5} />
                </motion.div>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  تم التحقق بنجاح
                </h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-450 font-bold mt-1">
                  مرحباً بك! جاري تهيئة حسابك في تنموي...
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function RegisterPage() {
  const [step, setStep]           = useState(0);
  const [direction, setDirection] = useState(1);
  const [showNafath, setShowNafath] = useState(false);

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  return (
    <AuthPanel>
      {/* Nafath Quick Registration Option */}
      {step === 0 && (
        <div className="mb-6" dir="rtl">
          <button
            type="button"
            onClick={() => setShowNafath(true)}
            className="w-full py-4 px-6 rounded-2xl text-[15px] font-black tracking-wide text-emerald-800 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 border-2 border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 flex items-center justify-center gap-3.5 active:scale-[0.99] cursor-pointer"
          >
            <span className="w-6.5 h-6.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-[12px] font-black shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500/20 animate-pulse">ن</span>
            التسجيل السريع عبر نفاذ الوطني
          </button>

          <div className="relative flex items-center gap-3 py-4">
            <div className="flex-1 h-px bg-slate-200 dark:bg-white/5" />
            <span className="text-[12px] text-slate-400 dark:text-slate-500 font-bold shrink-0">
              أو التسجيل العادي
            </span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-white/5" />
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="mb-8 flex justify-center">
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/40 px-5 py-2.5 rounded-2xl border border-slate-100 dark:border-white/5">
          {STEPS.map((label, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-6.5 h-6.5 rounded-full flex items-center justify-center text-[12px] font-black transition-all duration-300 ${
                    i <= step
                      ? "bg-tanmawy-gradient text-white shadow-sm ring-4 ring-teal-500/10"
                      : "bg-slate-200/60 dark:bg-slate-800 text-slate-400 dark:text-slate-550"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className={`text-[12.5px] font-bold transition-colors ${
                    i <= step ? "text-teal-600 dark:text-teal-400" : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-12 h-0.5 rounded-full transition-all duration-500 ${
                    i < step ? "bg-teal-500" : "bg-slate-200 dark:bg-slate-800"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Animated step content */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {step === 0 && (
              <StepBasicData
                onNext={() => goTo(1)}
              />
            )}
            {step === 1 && (
              <StepPledge onBack={() => goTo(0)} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6">
        <div className="relative flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-slate-200 dark:bg-white/5" />
          <span className="text-[12px] text-slate-400 dark:text-slate-500 font-medium shrink-0">
            أو
          </span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-white/5" />
        </div>
        <div className="text-center">
          <p className="text-[14px] text-slate-500 dark:text-slate-400">
            لديك حساب بالفعل؟{' '}
            <Link
              href="/login"
              className="text-teal-600 dark:text-teal-400 font-bold hover:text-teal-700 dark:hover:text-teal-300 transition-colors inline-flex items-center gap-1"
            >
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>

      {/* Nafath Modal Portal */}
      <AnimatePresence>
        {showNafath && (
          <NafathModal onClose={() => setShowNafath(false)} />
        )}
      </AnimatePresence>
    </AuthPanel>
  );
}
