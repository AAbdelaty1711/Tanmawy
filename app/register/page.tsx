"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AuthPanel from "@/src/components/auth/AuthPanel";
import StepBasicData from "@/src/components/auth/StepBasicData";
import StepLicense from "@/src/components/auth/StepLicense";
import StepPledge from "@/src/components/auth/StepPledge";

const STEPS = ["البيانات الأساسية", "الترخيص (اختياري)", "التعهد"];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function RegisterPage() {
  const [step, setStep]           = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  return (
    <AuthPanel>
      {/* Progress bar */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                  i <= step
                    ? "bg-tanmawy-gradient text-white shadow-sm"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span
                className={`text-[12px] font-semibold hidden sm:block transition-colors ${
                  i <= step ? "text-teal-600" : "text-slate-400"
                }`}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-8 h-0.5 mx-1 rounded-full transition-all duration-500 ${
                    i < step ? "bg-teal-400" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
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
              <StepLicense
                onBack={() => goTo(0)}
                onNext={() => goTo(2)}
              />
            )}
            {step === 2 && (
              <StepPledge onBack={() => goTo(1)} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6">
        <div className="relative flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[12px] text-slate-400 font-medium shrink-0">
            أو
          </span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
        <div className="text-center">
          <p className="text-[14px] text-slate-500">
            لديك حساب بالفعل؟{' '}
            <Link
              href="/login"
              className="text-teal-600 font-bold hover:text-teal-700 transition-colors inline-flex items-center gap-1"
            >
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </AuthPanel>
  );
}
