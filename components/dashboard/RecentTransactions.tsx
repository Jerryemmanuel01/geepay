import React from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";
import { format } from "date-fns";

interface Transaction {
  _id: string;
  amount: number;
  type: string;
  status: string;
  createdAt: string;
  receipt?: string;
  user?: {
    username: string;
  };
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  const router = useRouter();

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <Clock size={32} />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          No Transactions Yet
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Your recent activity will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white">
          Recent Activity
        </h3>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {transactions.map((tx) => (
          <div
            key={tx._id}
            onClick={() => router.push(`/dashboard/transactions/${tx._id}`)}
            className="p-4 sm:p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`md:w-12 md:h-12 w-8 h-8 rounded-full flex items-center justify-center ${
                  tx.type.toLowerCase() === "deposit"
                    ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                    : "bg-red-100 text-red-600 dark:bg-red-900/30"
                }`}
              >
                {tx.type.toLowerCase() === "deposit" ? (
                  <ArrowDownLeft className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white capitalize">
                  {tx.type}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {format(new Date(tx.createdAt), "MMM d, yyyy • h:mm a")}
                  {tx.user?.username && (
                    <span className="sm:ml-2 mt-1 sm:mt-0 px-2 py-0.5 block sm:inline w-fit rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300">
                      @{tx.user.username}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`font-bold ${
                  tx.type.toLowerCase() === "deposit"
                    ? "text-green-600"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                {tx.type.toLowerCase() === "deposit" ? "+" : "-"}₦
                {tx.amount.toLocaleString()}
              </p>
              <span
                className={`inline-block text-[10px] px-2 py-1 rounded-full capitalize mt-1 ${
                  tx.status.toLowerCase() === "completed"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : tx.status.toLowerCase() === "pending"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
