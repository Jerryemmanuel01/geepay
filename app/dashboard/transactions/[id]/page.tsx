"use client";

import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetTransactionByIdQuery } from "@/lib/redux/features/transactions/transactionsApi";
import {
  Loader2,
  ArrowLeft,
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  FileText,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";

export default function TransactionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resolvedParams = use(params);
  const router = useRouter();
  const {
    data: transaction,
    isLoading,
    error,
  } = useGetTransactionByIdQuery(resolvedParams.id);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-full text-red-500">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Transaction not found
        </h2>
        <button
          onClick={() => router.back()}
          className="text-primary hover:underline flex items-center"
        >
          <ArrowLeft size={16} className="mr-1" /> Back to Transactions
        </button>
      </div>
    );
  }

  const isDeposit = transaction.type.toLowerCase() === "deposit";
  const isCompleted = transaction.status.toLowerCase() === "completed";
  const isFailed = transaction.status.toLowerCase() === "failed";

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Transaction Details
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Status Banner */}
        <div
          className={`p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-700 ${
            isDeposit
              ? "bg-green-50/50 dark:bg-green-900/10"
              : "bg-red-50/50 dark:bg-red-900/10"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`p-3 rounded-full ${
                isDeposit
                  ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                  : "bg-red-100 text-red-600 dark:bg-red-900/30"
              }`}
            >
              {isDeposit ? (
                <ArrowDownLeft size={24} />
              ) : (
                <ArrowUpRight size={24} />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {transaction.type}
              </p>
              <p
                className={`text-2xl font-bold ${
                  isDeposit
                    ? "text-green-700 dark:text-green-400"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                {isDeposit ? "+" : "-"}₦
                {transaction.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          <div
            className={`sm:flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider hidden ${
              isCompleted
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : isFailed
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 size={14} className="mr-1" />
            ) : isFailed ? (
              <XCircle size={14} className="mr-1" />
            ) : (
              <AlertCircle size={14} className="mr-1" />
            )}
            {transaction.status}
          </div>
        </div>

        {/* Details List */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div className="flex items-start">
            <div className="mt-1 p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-500 mr-4">
              <FileText size={20} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400 block mb-1">
                Description
              </label>
              <p className="text-slate-900 dark:text-white font-medium">
                {transaction.description || "No description provided"}
              </p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-start">
            <div className="mt-1 p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-500 mr-4">
              <Calendar size={20} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400 block mb-1">
                Date & Time
              </label>
              <p className="text-slate-900 dark:text-white font-medium">
                {format(
                  new Date(transaction.createdAt),
                  "MMMM d, yyyy • h:mm a"
                )}
              </p>
            </div>
          </div>

          {/* User */}
          {transaction.user && (
            <div className="flex items-start">
              <div className="mt-1 p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-500 mr-4">
                <User size={20} />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400 block mb-1">
                  Initiated By
                </label>
                <p className="text-slate-900 dark:text-white font-medium">
                  @{transaction.user.username}
                </p>
                <p className="text-sm text-slate-500">
                  {transaction.user.email}
                </p>
              </div>
            </div>
          )}

          {/* Receipt Image */}
          {transaction.receipt && (
            <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400 block mb-4">
                Transaction Receipt
              </label>
              {transaction.receipt.startsWith("http") ? (
                <>
                  <div
                    className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 group cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <img
                      src={transaction.receipt}
                      alt="Receipt"
                      className="w-full h-auto object-contain max-h-[400px]"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 bg-white text-slate-900 rounded-full font-bold text-sm hover:bg-slate-100 transition-colors">
                        View Full Size
                      </span>
                    </div>
                  </div>

                  {/* Modal */}
                  {isModalOpen && (
                    <div
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                      onClick={() => setIsModalOpen(false)}
                    >
                      <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="absolute -top-12 right-0 text-white hover:text-white/80 transition-colors"
                        >
                          <XCircle size={32} />
                        </button>
                        <img
                          src={transaction.receipt}
                          alt="Receipt Full Size"
                          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-700 dark:text-slate-300 font-mono text-sm break-all">
                    {transaction.receipt}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
