"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetUserDetailsQuery } from "@/lib/redux/features/users/usersApi";
import {
  ArrowLeft,
  User as UserIcon,
  Mail,
  Calendar,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data, isLoading } = useGetUserDetailsQuery(params.id as string);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          User not found
        </h2>
        <button
          onClick={() => router.back()}
          className="mt-4 text-primary hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { user, transactions } = data;

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Users
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-3xl font-bold text-slate-400">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {user.username}
              </h1>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {user.role}
              </span>
              <div className="mt-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.isApproved
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                  }`}
                >
                  {user.isApproved ? "Active" : "Pending Approval"}
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                <Mail size={18} />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                <Calendar size={18} />
                <span className="text-sm">
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="text-blue-500" size={20} />
                Transaction History
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {transactions?.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-12 text-center text-slate-500"
                      >
                        No transactions found.
                      </td>
                    </tr>
                  ) : (
                    transactions?.map((tx: any) => (
                      <tr
                        key={tx._id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`p-2 rounded-full mr-3 ${
                                tx.type === "DEPOSIT"
                                  ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                            >
                              {tx.type === "DEPOSIT" ? (
                                <ArrowDownLeft size={16} />
                              ) : (
                                <ArrowUpRight size={16} />
                              )}
                            </div>
                            <span className="text-sm font-medium text-slate-900 dark:text-white capitalize">
                              {tx.type}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`text-sm font-bold ${
                              tx.type === "DEPOSIT"
                                ? "text-green-600 dark:text-green-400"
                                : "text-slate-900 dark:text-white"
                            }`}
                          >
                            {tx.type === "DEPOSIT" ? "+" : "-"}₦
                            {tx.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              tx.status === "COMPLETED"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : tx.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                          {new Date(tx.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
