"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Key, FileText, ChevronLeft, ChevronRight } from "lucide-react";

/* ── Schema ────────────────────────────────── */
const basicDataSchema = z.object({
  licenseNumber: z.string().optional().or(z.literal("")),
  password:      z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
  confirmPassword: z.string().min(8, "تأكيد كلمة المرور مطلوب"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمتا المرور غير متطابقتين",
  path: ["confirmPassword"],
});

type BasicData = z.infer<typeof basicDataSchema>;

/* ── Shared Input ───────────────────────────── */
function Field({
  label, id, error, type = "text", placeholder, suffix, prefix, registration,
}: {
  label: string; id: string; error?: string; type?: string;
  placeholder?: string; suffix?: React.ReactNode; prefix?: React.ReactNode;
  registration: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <div className="space-y-1.5 text-right">
      <label htmlFor={id} className="block text-[13px] font-bold text-slate-700 dark:text-slate-350">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`w-full pr-10 ${suffix ? "pl-10" : "pl-4"} py-2.5 rounded-xl border text-[14px] text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-900/50 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-950/20 ${error ? "border-rose-350 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20" : "border-slate-200 dark:border-white/10"}`}
          {...registration}
        />
        {prefix && <div className="absolute top-1/2 -translate-y-1/2 right-3 text-slate-400 dark:text-slate-550">{prefix}</div>}
        {suffix && <div className="absolute top-1/2 -translate-y-1/2 left-3">{suffix}</div>}
      </div>
      {error && <p className="text-[11px] text-rose-500 font-semibold leading-none mt-1">{error}</p>}
    </div>
  );
}

/* ── Step 2: Account Setup ────────────────────── */
export default function StepBasicData({
  onNext,
  onBack,
  initialValues,
}: {
  onNext: (license: string, pass: string) => void;
  onBack: () => void;
  initialValues?: { licenseNumber: string };
}) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const form = useForm<BasicData>({
    resolver: zodResolver(basicDataSchema),
    defaultValues: {
      licenseNumber: initialValues?.licenseNumber || "",
      password: "",
      confirmPassword: "",
    }
  });

  const onSubmit = (d: BasicData) => {
    onNext(d.licenseNumber || "", d.password);
  };

  const passwordSuffix = (
    <button type="button" onClick={() => setShowPass(p => !p)} className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-350 transition-colors">
      {showPass ? <EyeOff className="w-4 h-4" strokeWidth={1.8} /> : <Eye className="w-4 h-4" strokeWidth={1.8} />}
    </button>
  );

  const confirmPasswordSuffix = (
    <button type="button" onClick={() => setShowConfirmPass(p => !p)} className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-350 transition-colors">
      {showConfirmPass ? <EyeOff className="w-4 h-4" strokeWidth={1.8} /> : <Eye className="w-4 h-4" strokeWidth={1.8} />}
    </button>
  );

  return (
    <div className="space-y-5 text-right" dir="rtl">
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-1">
          إعداد بيانات الحساب
        </h2>
        <p className="text-[12.5px] text-slate-500 dark:text-slate-450 font-semibold">أدخل رقم ترخيص الكيان (اختياري) وكلمة مرور الحساب الجديد</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* License Number */}
        <Field 
          label="رقم الترخيص المعتمد (اختياري)" 
          id="licenseNumber" 
          placeholder="مثال: SA-10293" 
          error={form.formState.errors.licenseNumber?.message} 
          prefix={<FileText className="w-4 h-4" />}
          registration={form.register("licenseNumber")} 
        />
        
        {/* Password */}
        <Field 
          label="كلمة المرور للحساب" 
          id="password" 
          type={showPass ? "text" : "password"} 
          placeholder="••••••••" 
          error={form.formState.errors.password?.message} 
          prefix={<Key className="w-4 h-4" />}
          suffix={passwordSuffix} 
          registration={form.register("password")} 
        />

        {/* Confirm Password */}
        <Field 
          label="تأكيد كلمة المرور" 
          id="confirmPassword" 
          type={showConfirmPass ? "text" : "password"} 
          placeholder="••••••••" 
          error={form.formState.errors.confirmPassword?.message} 
          prefix={<Key className="w-4 h-4" />}
          suffix={confirmPasswordSuffix} 
          registration={form.register("confirmPassword")} 
        />
        
        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-[14px] font-semibold text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
            السابق
          </button>
          
          <button
            type="submit"
            className="flex-1 py-2.5 rounded-xl bg-tanmawy-gradient text-white text-[14px] font-bold shadow-sm hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            التالي
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
