"use client";

import React, { useState } from "react";
import { useGetTransactionsQuery } from "@/lib/redux/features/transactions/transactionsApi";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { Loader2, Filter } from "lucide-react";

export default function TransactionsPage() {
  const { data: transactions, isLoading } = useGetTransactionsQuery(null);
  const [filter, setFilter] = useState("all");

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const filteredTransactions = transactions?.filter((tx: any) => {
    if (filter === "all") return true;
    return tx.type.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Transactions
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            View your complete deposit and withdrawal history.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("deposit")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              filter === "deposit"
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                : "text-slate-500 dark:text-slate-400 hover:text-green-600"
            }`}
          >
            Deposits
          </button>
          <button
            onClick={() => setFilter("withdrawal")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              filter === "withdrawal"
                ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                : "text-slate-500 dark:text-slate-400 hover:text-red-600"
            }`}
          >
            Withdrawals
          </button>
        </div>
      </div>

      <RecentTransactions transactions={filteredTransactions || []} />
    </div>
  );
}
