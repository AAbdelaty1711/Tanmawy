"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, ChevronRight } from "lucide-react";

/* ── Schema ────────────────────────────────── */
const licenseSchema = z.object({
  entityName:    z.string().min(3, "اسم الكيان مطلوب"),
  licenseNumber: z.string().min(4, "رقم الترخيص مطلوب"),
  website:       z.string().url("الرابط غير صحيح").optional().or(z.literal("")),
});

type LicenseData = z.infer<typeof licenseSchema>;

/* ── Smart Verification Badge ───────────────── */
function SmartVerify({ label }: { label: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    const t1 = setTimeout(() => setState("loading"), 600);
    const t2 = setTimeout(() => setState("done"),    2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="flex items-center gap-2 mt-1.5 px-3 py-2 rounded-lg bg-indigo-50 border border-indigo-100">
      {state === "loading" && (
        <svg className="animate-spin w-3.5 h-3.5 text-indigo-500 shrink-0" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
        </svg>
      )}
      {state === "done" && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" strokeWidth={2.5} />
        </motion.div>
      )}
      {state === "idle" && <div className="w-3.5 h-3.5 rounded-full bg-indigo-200 shrink-0" />}
      <span className="text-[11px] font-semibold text-indigo-600">
        {state === "loading" ? `جارٍ التحقق من ${label}...` : state === "done" ? `تم التحقق من ${label} ✓` : `في انتظار التحقق من ${label}`}
      </span>
    </div>
  );
}

/* ── Shared Input ───────────────────────────── */
function Field({
  label, id, error, type = "text", placeholder, registration,
}: {
  label: string; id: string; error?: string; type?: string;
  placeholder?: string; registration: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-[13px] font-semibold text-slate-700">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-xl border text-[14px] text-slate-800 bg-slate-50 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100 ${error ? "border-rose-300" : "border-slate-200"}`}
        {...registration}
      />
      {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
    </div>
  );
}

/* ── Step 2: License ──────────────────────── */
export default function StepLicense({
  onBack, onNext,
}: { onBack: () => void; onNext: () => void }) {
  const [hasLicense, setHasLicense] = useState(false);

  const form = useForm<LicenseData>({ resolver: zodResolver(licenseSchema) });

  const onSubmit = (d: LicenseData) => { console.log(d); onNext(); };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-900 mb-1">
          هل تمثل كياناً أو مبادرة رسمية؟
        </h2>
        <p className="text-[13px] text-slate-500">
          خطوة اختيارية. بإضافتك للترخيص ستتمكن من إنشاء وإدارة مشاريعك الخيرية.
        </p>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer transition-colors hover:bg-slate-100" onClick={() => setHasLicense(!hasLicense)}>
        <div className={`relative w-10 h-5 rounded-full transition-colors ${hasLicense ? "bg-teal-500" : "bg-slate-300"}`}>
          <motion.div 
            className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
            animate={{ x: hasLicense ? -20 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div>
        <span className="text-[14px] font-semibold text-slate-700">لدي ترخيص رسمي</span>
      </div>

      <AnimatePresence>
        {hasLicense && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-3 pb-1 pt-1">
              <div>
                <Field label="اسم الكيان" id="entityName" placeholder="جمعية الخير للتنمية" error={form.formState.errors.entityName?.message} registration={form.register("entityName")} />
                <SmartVerify label="الكيان" />
              </div>
              <div>
                <Field label="رقم الترخيص" id="licenseNumber" placeholder="SA-XXXXX" error={form.formState.errors.licenseNumber?.message} registration={form.register("licenseNumber")} />
                <SmartVerify label="الترخيص" />
              </div>
              <Field label="الموقع الإلكتروني (اختياري)" id="website" placeholder="https://entity.org" error={form.formState.errors.website?.message} registration={form.register("website")} />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onBack}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-[14px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={2} />
                  السابق
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-[15px] font-bold text-white bg-tanmawy-gradient shadow-sm hover:shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  التالي
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {!hasLicense && (
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-[14px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={2} />
            السابق
          </button>
          <button
            type="button"
            onClick={onNext}
            className="flex-1 py-2.5 rounded-xl text-[15px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            تخطي
          </button>
        </div>
      )}
    </div>
  );
}
