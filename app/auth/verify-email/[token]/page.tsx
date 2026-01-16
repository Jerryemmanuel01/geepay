"use client";

import React, { use } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import {
  useVerifyEmailQuery,
  useResendVerificationMutation,
} from "@/lib/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function VerifyEmailPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const { data, isLoading, isError, error } = useVerifyEmailQuery(token);
  const [resendVerification, { isLoading: isResending }] =
    useResendVerificationMutation();
  const [email, setEmail] = useState("");
  const [showResend, setShowResend] = useState(false);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await resendVerification({ email }).unwrap();
      toast.success("Verification link resent! Check your email.");
      setShowResend(false); // Hide form or show success state
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to resend link.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden text-center p-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Verifying Email...
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Please wait while we verify your email address.
            </p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4">
              <XCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Verification Failed
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-xs mx-auto">
              {(error as any)?.data?.message ||
                "Invalid or expired verification link."}
            </p>

            {!showResend ? (
              <div className="flex flex-col space-y-3 w-full">
                <button
                  onClick={() => setShowResend(true)}
                  className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                >
                  Resend Verification Link
                </button>
                <Link
                  href="/auth/login"
                  className="text-slate-500 font-medium hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                >
                  Back to Login
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleResend}
                className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300"
              >
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    type="submit"
                    disabled={isResending}
                    className="w-full px-6 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isResending ? (
                      <Loader2 className="animate-spin mr-2" size={18} />
                    ) : null}
                    {isResending ? "Sending..." : "Send Link"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResend(false)}
                    className="text-sm text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Email Verified!
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Your email has been successfully verified. You can now access all
              features.
            </p>
            <Link
              href="/auth/login"
              className="px-6 py-2.5 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
            >
              Continue to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
