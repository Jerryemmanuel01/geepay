"use client";

import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/redux/store";
import { logout } from "@/lib/redux/features/auth/authSlice";

export default function PendingApprovalPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Account Pending Approval
        </h2>
        <p className="text-slate-600 mb-8">
          Hello <strong>{user?.username}</strong>,<br />
          Your account is currently waiting for administrator approval. You
          won't be able to access the dashboard until an admin activates your
          account.
        </p>
        <div className="space-y-4">
          <button
            onClick={handleLogout}
            className="block w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
          >
            Sign Out
          </button>
          <div className="text-sm text-slate-500">
            Need help?{" "}
            <a
              href="mailto:jerryemmanuelolisa@gmail.com"
              className="text-primary hover:underline"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
