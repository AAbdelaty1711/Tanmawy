'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import AuthPanel from '@/src/components/auth/AuthPanel'

/* ── Validation Schema ─────────────────────── */
const schema = z.object({
  identifier: z
    .string()
    .min(1, 'البريد الإلكتروني أو رقم الجوال مطلوب')
    .min(5, 'الرجاء إدخال بريد أو رقم صحيح'),
  password: z
    .string()
    .min(1, 'كلمة المرور مطلوبة')
    .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
})
type FormData = z.infer<typeof schema>

/* ── Input Component ───────────────────────── */
function Input({
  label,
  id,
  type = 'text',
  placeholder,
  icon: Icon,
  error,
  suffix,
  ...rest
}: {
  label: string
  id: string
  type?: string
  placeholder?: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  error?: string
  suffix?: React.ReactNode
  [key: string]: unknown
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          className="absolute top-1/2 -translate-y-1/2 right-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none"
          strokeWidth={1.8}
        />
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`
            w-full pr-10 pl-${suffix ? '10' : '4'} py-3 rounded-xl
            bg-slate-50 dark:bg-slate-900/50 border text-[15px] text-slate-800 dark:text-slate-100
            placeholder:text-slate-400 dark:placeholder:text-slate-600
            outline-none transition-all duration-200
            focus:bg-white dark:focus:bg-slate-900 focus:border-teal-400 dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-950/30
            ${error ? 'border-rose-300 bg-rose-50/40 dark:border-rose-900/40 dark:bg-rose-950/20' : 'border-slate-200 dark:border-white/10'}
          `}
          {...rest}
        />
        {suffix && (
          <div className="absolute top-1/2 -translate-y-1/2 left-3.5">
            {suffix}
          </div>
        )}
      </div>
      {error && (
        <motion.p
          className="text-xs text-rose-500 font-medium"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

/* ── Main Login Page ───────────────────────── */
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    console.log('Login data:', data)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500))
    setIsSubmitting(false)
  }

  return (
    <AuthPanel>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="space-y-7"
      >
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            مرحباً بعودتك
          </h1>
          <p className="text-[14px] text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
            سجّل دخولك للوصول إلى منصة تنموي
          </p>
        </div>



        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <Input
            label="البريد الإلكتروني أو رقم الجوال"
            id="identifier"
            type="text"
            placeholder="example@email.com"
            icon={Mail}
            error={errors.identifier?.message}
            {...register('identifier')}
          />

          <Input
            label="كلمة المرور"
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            icon={Lock}
            error={errors.password?.message}
            suffix={
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                aria-label="إظهار كلمة المرور"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" strokeWidth={1.8} />
                ) : (
                  <Eye className="w-4 h-4" strokeWidth={1.8} />
                )}
              </button>
            }
            {...register('password')}
          />

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold transition-colors"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl text-[15px] font-bold text-white bg-tanmawy-gradient shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                جارٍ تسجيل الدخول...
              </span>
            ) : (
              'تسجيل الدخول'
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200 dark:bg-white/5" />
          <span className="text-[12px] text-slate-400 dark:text-slate-500 font-medium shrink-0">
            أو
          </span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-white/5" />
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-[14px] text-slate-500 dark:text-slate-400">
            ليس لديك حساب؟{' '}
            <Link
              href="/register"
              className="text-teal-600 dark:text-teal-400 font-bold hover:text-teal-700 dark:hover:text-teal-300 transition-colors inline-flex items-center gap-1"
            >
              إنشاء حساب جديد
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
            </Link>
          </p>
        </div>
      </motion.div>
    </AuthPanel>
  )
}
