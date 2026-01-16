"use client";

import React from "react";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApi";
import { useGetTransactionsQuery } from "@/lib/redux/features/transactions/transactionsApi";
import StatCard from "@/components/dashboard/StatCard";
import WalletCard from "@/components/dashboard/wallet/WalletCard";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { data: user, isLoading: isUserLoading } = useGetUserProfileQuery(null);
  const { data: transactions, isLoading: isTxLoading } =
    useGetTransactionsQuery(null);

  const isLoading = isUserLoading || isTxLoading;

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const recentTransactions = transactions ? transactions.slice(0, 5) : [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Overview
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Welcome back, {user?.username || "User"}!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Main Wallet Card - Spans 2 columns on large screens */}
        <div className="lg:col-span-2">
          <WalletCard balance={user?.balance || 0} username={user?.username} />
        </div>

        {/* Side Stats - Spans 1 column, stacked */}
        <div className="space-y-6 md:h-64 flex flex-col ">
          <StatCard
            label="Total Income"
            amount={user?.totalIncome || 0}
            type="income"
          />
          <StatCard
            label="Total Outgoing"
            amount={user?.totalOutgoing || 0}
            type="outgoing"
          />
        </div>
      </div>

      <RecentTransactions transactions={recentTransactions} />
    </div>
  );
}
