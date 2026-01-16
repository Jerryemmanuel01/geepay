"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, KeyRound } from "lucide-react";
import { useForgotPasswordForm } from "@/hooks/useForgotPasswordForm";

export default function ForgotPasswordPage() {
  const { formik, isLoading, isSuccess } = useForgotPasswordForm();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <Link
            href="/auth/login"
            className="inline-flex items-center text-sm text-slate-500 hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" /> Back to Login
          </Link>
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-secondary to-accent flex items-center justify-center text-white font-bold text-xl shadow-lg mx-auto mb-4">
              <KeyRound size={24} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Forgot Password?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>

          {isSuccess ? (
            <div className="p-4 bg-green-50 text-green-700 rounded-lg text-center">
              <p className="font-medium">Check your email!</p>
              <p className="text-sm mt-1">
                If an account exists for {formik.values.email}, we have sent a
                reset link.
              </p>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-primary"
                  } bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
                  placeholder="john@example.com"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-lg bg-primary text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Sending Link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
