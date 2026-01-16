"use client";

import React, { useState } from "react";
import { useMakeWithdrawalMutation } from "@/lib/redux/features/transactions/transactionsApi";
import { Loader2, Lock } from "lucide-react";
import { toast } from "react-hot-toast";

export default function WithdrawForm() {
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [makeWithdrawal, { isLoading }] = useMakeWithdrawalMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !pin) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await makeWithdrawal({ amount: Number(amount), pin }).unwrap();
      toast.success("Withdrawal successful!");
      setAmount("");
      setPin("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to withdraw funds");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
        Withdraw Funds
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Amount ($)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Transaction PIN
          </label>
          <div className="relative">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={4}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all tracking-widest"
              placeholder="••••"
              required
            />
            <div className="absolute left-3 top-2.5 text-slate-400">
              <Lock size={18} />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Enter your 4-digit transaction PIN.
          </p>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} /> Processing...
            </>
          ) : (
            "Confirm Withdrawal"
          )}
        </button>
      </form>
    </div>
  );
}
