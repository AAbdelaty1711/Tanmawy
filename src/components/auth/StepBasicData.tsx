"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

/* ── Schema ────────────────────────────────── */
const basicDataSchema = z.object({
  name:         z.string().min(3, "الاسم مطلوب (3 أحرف على الأقل)"),
  emailOrPhone: z.string().min(5, "البريد الإلكتروني أو رقم الهاتف مطلوب"),
  nationalId:   z.string().length(10, "رقم الهوية يجب أن يكون 10 أرقام"),
  password:     z.string().min(8, "كلمة المرور 8 أحرف على الأقل"),
});

type BasicData = z.infer<typeof basicDataSchema>;

/* ── Shared Input ───────────────────────────── */
function Field({
  label, id, error, type = "text", placeholder, suffix, registration,
}: {
  label: string; id: string; error?: string; type?: string;
  placeholder?: string; suffix?: React.ReactNode;
  registration: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-[13px] font-semibold text-slate-700">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`w-full px-4 ${suffix ? "pl-10" : ""} py-2.5 rounded-xl border text-[14px] text-slate-800 bg-slate-50 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100 ${error ? "border-rose-300" : "border-slate-200"}`}
          {...registration}
        />
        {suffix && <div className="absolute top-1/2 -translate-y-1/2 left-3">{suffix}</div>}
      </div>
      {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
    </div>
  );
}

/* ── Step 1: Basic Data ──────────────────────── */
export default function StepBasicData({
  onNext,
}: { onNext: () => void }) {
  const [showPass, setShowPass] = useState(false);

  const form = useForm<BasicData>({ resolver: zodResolver(basicDataSchema) });

  const onSubmit = (d: BasicData) => { console.log(d); onNext(); };

  const passwordSuffix = (
    <button type="button" onClick={() => setShowPass(p => !p)} className="text-slate-400 hover:text-slate-600 transition-colors">
      {showPass ? <EyeOff className="w-4 h-4" strokeWidth={1.8} /> : <Eye className="w-4 h-4" strokeWidth={1.8} />}
    </button>
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-900 mb-1">
          البيانات الأساسية
        </h2>
        <p className="text-[13px] text-slate-500">جميع البيانات محمية ومشفرة</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <Field label="اسم المستخدم" id="name" placeholder="الاسم الكامل" error={form.formState.errors.name?.message} registration={form.register("name")} />
        
        <Field label="البريد الإلكتروني أو رقم الهاتف" id="emailOrPhone" placeholder="example@mail.com / 05XXXXXXXX" error={form.formState.errors.emailOrPhone?.message} registration={form.register("emailOrPhone")} />
        
        <Field label="رقم الهوية" id="nationalId" placeholder="1XXXXXXXXX" error={form.formState.errors.nationalId?.message} registration={form.register("nationalId")} />
        
        <Field label="كلمة المرور" id="password" type={showPass ? "text" : "password"} placeholder="••••••••" error={form.formState.errors.password?.message} suffix={passwordSuffix} registration={form.register("password")} />
        
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-[15px] font-bold text-white bg-tanmawy-gradient shadow-sm hover:shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            التالي
          </button>
        </div>
      </form>
    </div>
  );
}
