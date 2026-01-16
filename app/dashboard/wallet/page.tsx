"use client";

import React, { useState } from "react";
import DepositForm from "@/components/dashboard/wallet/DepositForm";
import WithdrawForm from "@/components/dashboard/wallet/WithdrawForm";
import WalletCard from "@/components/dashboard/wallet/WalletCard";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApi";
import { Loader2, ArrowDownLeft, ArrowUpRight } from "lucide-react";

export default function WalletPage() {
  const { data: user, isLoading } = useGetUserProfileQuery(null);
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            My Wallet
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage your funds securely and efficiently.
          </p>
        </div>
      </div>

      {/* Wallet Balance Card */}
      <WalletCard balance={user?.balance || 0} username={user?.username || ""} />

      {/* Actions Section */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab("deposit")}
            className={`flex-1 py-4 text-center font-medium text-sm transition-colors relative ${
              activeTab === "deposit"
                ? "text-green-600 dark:text-green-400 bg-green-50/50 dark:bg-green-900/10"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <ArrowDownLeft size={18} />
              <span>Add Money</span>
            </div>
            {activeTab === "deposit" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("withdraw")}
            className={`flex-1 py-4 text-center font-medium text-sm transition-colors relative ${
              activeTab === "withdraw"
                ? "text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-900/10"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <ArrowUpRight size={18} />
              <span>Withdraw</span>
            </div>
            {activeTab === "withdraw" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />
            )}
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 md:p-8 min-h-[400px]">
          <div className="max-w-md mx-auto">
            <div
              className={`transition-opacity duration-300 ${
                activeTab === "deposit"
                  ? "block animate-in fade-in slide-in-from-left-4"
                  : "hidden"
              }`}
            >
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Deposit Funds
                </h3>
                <p className="text-sm text-slate-500">
                  Add money via bank transfer or supported methods.
                </p>
              </div>
              {/* Simplified wrapper to remove duplicate styling inside the form component if needed, or just let it be */}
              <div className="[&>div]:shadow-none [&>div]:border-none [&>div]:p-0 [&>div]:bg-transparent">
                <DepositForm />
              </div>
            </div>

            <div
              className={`transition-opacity duration-300 ${
                activeTab === "withdraw"
                  ? "block animate-in fade-in slide-in-from-right-4"
                  : "hidden"
              }`}
            >
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Withdraw Funds
                </h3>
                <p className="text-sm text-slate-500">
                  Transfer funds to your linked bank account.
                </p>
              </div>
              <div className="[&>div]:shadow-none [&>div]:border-none [&>div]:p-0 [&>div]:bg-transparent">
                <WithdrawForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
