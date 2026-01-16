"use client";

import React, { useState } from "react";
import {
  useGetUserProfileQuery,
  useUpdateTransactionPinMutation,
} from "@/lib/redux/features/users/usersApi";
import { Loader2, User, Mail, ShieldCheck, Lock } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const { data: user, isLoading: isUserLoading } = useGetUserProfileQuery(null);
  const [updatePin, { isLoading: isUpdating }] =
    useUpdateTransactionPinMutation();
  const [pin, setPin] = useState("");

  const handleUpdatePin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin || pin.length < 4) {
      toast.error("PIN must be at least 4 digits");
      return;
    }

    try {
      await updatePin({ pin }).unwrap();
      toast.success("Transaction PIN updated successfully!");
      setPin("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update PIN");
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          My Profile
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          View your personal information and security settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Info Card */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <User className="mr-2 text-primary" size={20} />
            Personal Information
          </h3>

          <div className="space-y-6">
            <div className="flex items-start md:items-center flex-col md:flex-row gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-secondary to-accent flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                {user?.username?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Username
                </p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  @{user?.username}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 border border-slate-100 dark:border-slate-700 rounded-xl">
                <div className="flex items-center text-slate-500 dark:text-slate-400 mb-1">
                  <Mail size={16} className="mr-2" />
                  <span className="text-sm font-medium">Email Address</span>
                </div>
                <p className="text-slate-900 dark:text-white font-medium ml-6">
                  {user?.email}
                </p>
              </div>
              <div className="p-4 border border-slate-100 dark:border-slate-700 rounded-xl">
                <div className="flex items-center text-slate-500 dark:text-slate-400 mb-1">
                  <ShieldCheck size={16} className="mr-2" />
                  <span className="text-sm font-medium">Account Status</span>
                </div>
                <div className="ml-6 flex items-center mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user?.isVerified
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {user?.isVerified ? "Verified" : "Unverified"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-fit">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <Lock className="mr-2 text-primary" size={20} />
            Security
          </h3>

          <form onSubmit={handleUpdatePin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Update Transaction PIN
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={4}
                placeholder="New 4-digit PIN"
                className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
              <p className="text-xs text-slate-500">
                Enter a new 4-digit PIN to secure your withdrawals.
              </p>
            </div>
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-700 text-white font-bold hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors disabled:opacity-70 flex items-center justify-center"
            >
              {isUpdating ? (
                <Loader2 className="animate-spin mr-2" size={18} />
              ) : (
                "Update PIN"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
