"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, X, FileText, UserCheck, ShieldAlert, Key, ChevronLeft } from "lucide-react";
import AuthPanel from "@/src/components/auth/AuthPanel";
import StepBasicData from "@/src/components/auth/StepBasicData";
import StepPledge from "@/src/components/auth/StepPledge";
import { useUserStore } from "@/src/store/useUserStore";

const STEPS = ["التحقق الوطني", "بيانات الحساب", "التعهد"];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const { setFounder } = useUserStore();

  // Nafath verification states
  const [nationalId, setNationalId] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [password, setPassword] = useState("");
  const [nafathStatus, setNafathStatus] = useState<"input" | "pending" | "retrieved">("input");
  const [randomCode, setRandomCode] = useState(0);
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState("");
  
  // Registration flow state
  const [submitting, setSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  // Countdown timer for Nafath app push notification
  useEffect(() => {
    if (nafathStatus !== "pending") return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setNafathStatus("input"); // Reset back to input if expired
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [nafathStatus]);

  // Simulate mobile app approval after 4 seconds
  useEffect(() => {
    if (nafathStatus !== "pending") return;
    const timeout = setTimeout(() => {
      setNafathStatus("retrieved");
    }, 4000);
    return () => clearTimeout(timeout);
  }, [nafathStatus]);

  const handleStartNafath = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[12]\d{9}$/.test(nationalId)) {
      setError("رقم الهوية الوطنية أو الإقامة يجب أن يتكون من 10 أرقام ويبدأ بـ 1 أو 2");
      return;
    }
    setError("");
    setRandomCode(Math.floor(Math.random() * 90) + 10);
    setCountdown(60);
    setNafathStatus("pending");
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    // Simulate final API registration
    await new Promise((r) => setTimeout(r, 1800));
    setSubmitting(false);
    setRegistrationSuccess(true);

    // Apply store update
    if (licenseNumber) {
      setFounder(true);
    } else {
      setFounder(false);
    }

    // Redirect user dynamically after success screen
    setTimeout(() => {
      window.location.href = licenseNumber ? "/entity" : "/";
    }, 2000);
  };

  return (
    <AuthPanel>
      {registrationSuccess ? (
        /* Success Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-5 py-6 text-center font-sans"
          dir="rtl"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mb-4"
            >
              <CheckCircle2 className="w-10 h-10" strokeWidth={2.5} />
            </motion.div>
            <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
              تم إنشاء حساب الكيان بنجاح!
            </h3>
            <p className="text-xs text-emerald-600 dark:text-emerald-450 font-bold mt-1 leading-relaxed">
              مرحباً بك يا خالد بن عبد الرحمن! جاري توجيهك إلى {licenseNumber ? "لوحة إدارة الكيان" : "الرئيسية"}...
            </p>
          </div>
        </motion.div>
      ) : (
        /* Main Registration Flow */
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="mb-6 flex justify-center">
            <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-900/40 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-white/5">
              {STEPS.map((label, i) => (
                <React.Fragment key={i}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6.5 h-6.5 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-300 ${
                        i <= step
                          ? "bg-tanmawy-gradient text-white shadow-sm ring-4 ring-teal-500/10"
                          : "bg-slate-200/60 dark:bg-slate-800 text-slate-400 dark:text-slate-550"
                      }`}
                    >
                      {i < step ? "✓" : i + 1}
                    </div>
                    <span
                      className={`text-[12px] font-bold transition-colors ${
                        i <= step ? "text-teal-600 dark:text-teal-400" : "text-slate-400 dark:text-slate-550"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`w-8 h-0.5 rounded-full transition-all duration-500 ${
                        i < step ? "bg-teal-500" : "bg-slate-200 dark:bg-slate-800"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {/* ── STEP 1: Nafath Single Sign-On ── */}
                {step === 0 && (
                  <div className="space-y-5 text-right font-sans" dir="rtl">
                    {nafathStatus === "input" && (
                      <div className="space-y-5">
                        <div>
                          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-1">
                            التحقق عبر نفاذ الوطني
                          </h2>
                          <p className="text-[12.5px] text-slate-500 dark:text-slate-450 font-semibold leading-relaxed">
                            الرجاء إدخال رقم الهوية الوطنية للتحقق الفوري من هويتك الرسمية وبدء التسجيل السريع
                          </p>
                        </div>

                        <form onSubmit={handleStartNafath} className="space-y-4">
                          <div className="space-y-1.5">
                            <label htmlFor="natId" className="block text-xs font-bold text-slate-700 dark:text-slate-350">
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
                              <p className="text-xs text-rose-500 font-semibold mt-1">{error}</p>
                            )}
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 rounded-2xl text-[14px] font-black text-white bg-gradient-to-l from-emerald-600 to-teal-600 shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                          >
                            بدء التحقق الرقمي عبر نفاذ
                          </button>
                        </form>
                      </div>
                    )}

                    {nafathStatus === "pending" && (
                      <div className="space-y-5 text-center">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-600 animate-spin flex items-center justify-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 font-black text-sm">
                              {countdown}
                            </div>
                          </div>
                          <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                            افتح تطبيق نفاذ للموافقة
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                            أرسلنا طلب التحقق إلى جهازك المسجل في نظام أبشر.
                          </p>
                        </div>

                        <div className="bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-2xl p-5">
                          <p className="text-xs text-slate-400 dark:text-slate-550 mb-2">رقم المطابقة في تطبيق نفاذ:</p>
                          <div className="text-5xl font-black tracking-wider text-emerald-600 dark:text-emerald-500 animate-pulse">
                            {randomCode}
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-450 dark:text-slate-500 leading-relaxed">
                          افتح تطبيق نفاذ على جوالك، اضغط على "قبول"، ثم اختر الرقم المطابق أعلاه لتأكيد هويتك.
                        </p>

                        <button
                          type="button"
                          onClick={() => setNafathStatus("input")}
                          className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-[13px] font-semibold text-slate-500 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          إلغاء
                        </button>
                      </div>
                    )}

                    {nafathStatus === "retrieved" && (
                      <div className="space-y-5">
                        <div className="text-center">
                          <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 flex items-center justify-center mx-auto mb-2 shadow-sm border border-teal-150/30">
                            <UserCheck className="w-6 h-6" />
                          </div>
                          <h3 className="text-md font-black text-slate-900 dark:text-slate-100">
                            تم التحقق من هويتك بنجاح
                          </h3>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                            لقد تم سحب البيانات الموثقة لهويتك من النفاذ الوطني الموحد:
                          </p>
                        </div>

                        <div className="bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-white/5 rounded-2xl p-4.5 space-y-3.5 text-[13px]">
                          <div className="flex justify-between border-b border-slate-200/50 dark:border-white/5 pb-2">
                            <span className="text-slate-400 dark:text-slate-500 font-semibold">الاسم الكامل</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">خالد بن عبد الرحمن القحطاني</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-200/50 dark:border-white/5 pb-2">
                            <span className="text-slate-400 dark:text-slate-500 font-semibold">رقم الهوية الوطنية</span>
                            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{nationalId}</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-200/50 dark:border-white/5 pb-2">
                            <span className="text-slate-400 dark:text-slate-500 font-semibold">البريد الإلكتروني الموثق</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">k.qahtani@najah.org.sa</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400 dark:text-slate-500 font-semibold">رقم الجوال المرتبط</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">050****847</span>
                          </div>
                        </div>

                        <button
                          onClick={() => goTo(1)}
                          className="w-full py-3 rounded-2xl text-[14px] font-black text-white bg-tanmawy-gradient shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          متابعة إعداد الحساب
                          <ChevronLeft className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* ── STEP 2: Account Details ── */}
                {step === 1 && (
                  <StepBasicData
                    onBack={() => goTo(0)}
                    onNext={(license, pass) => {
                      setLicenseNumber(license);
                      setPassword(pass);
                      goTo(2);
                    }}
                    initialValues={{ licenseNumber }}
                  />
                )}

                {/* ── STEP 3: The Pledge ── */}
                {step === 2 && (
                  <StepPledge
                    onBack={() => goTo(1)}
                    onSubmit={handleFinalSubmit}
                    submitting={submitting}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Link */}
          <div className="mt-6 border-t border-slate-100 dark:border-white/5 pt-4">
            <div className="text-center">
              <p className="text-[14px] text-slate-500 dark:text-slate-400 font-semibold">
                لديك حساب بالفعل؟{" "}
                <Link
                  href="/login"
                  className="text-teal-600 dark:text-teal-400 font-black hover:text-teal-700 dark:hover:text-teal-350 transition-colors inline-flex items-center gap-1"
                >
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </AuthPanel>
  );
}


