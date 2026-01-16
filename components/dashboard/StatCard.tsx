import React from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface StatCardProps {
  label: string;
  amount: number;
  type: "income" | "outgoing";
}

const StatCard = ({ label, amount, type }: StatCardProps) => {
  const isIncome = type === "income";

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 h-full flex items-start justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
          {label}
        </p>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          ₦
          {amount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h3>
      </div>

      <div
        className={`p-3 rounded-xl flex items-center justify-center ${
          isIncome
            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500"
            : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500"
        }`}
      >
        {isIncome ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
      </div>
    </div>
  );
};

export default StatCard;
