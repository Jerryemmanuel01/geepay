"use client";

import React from "react";
import { Copy, CreditCard, TrendingUp, TrendingDown } from "lucide-react";

interface WalletCardProps {
  balance: number;
  currency?: string;
  username?: string;
}

export default function WalletCard({
  balance,
  currency = "USD",
  username = "GRANDSTORM",
}: WalletCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-8 isolate aspect-[1.8/1] sm:aspect-[2.2/1] md:aspect-auto md:h-64 flex flex-col justify-between group transition-transform hover:scale-[1.01] duration-500">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-primary/20 blur-3xl opacity-50 pointer-events-none group-hover:bg-primary/30 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-secondary/20 blur-3xl opacity-50 pointer-events-none group-hover:bg-secondary/30 transition-colors duration-500" />

      {/* Pattern Overlay example - CSS radial lines could serve as pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />

      {/* Top Section: Label and Chip */}
      <div className="flex justify-between items-start z-10">
        <div>
          <p className="text-slate-400 font-medium text-sm tracking-wider uppercase">
            Available Balance
          </p>
          <div className="mt-2 flex items-baseline space-x-1">
            <span className="text-2xl text-slate-400 font-light">₦</span>
            <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              {balance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
          <CreditCard size={16} className="text-white/80" />
          <span className="text-xs font-semibold text-white/90">
            Geepay Wallet
          </span>
        </div>
      </div>

      {/* Bottom Section: Account Details */}
      <div className="mt-auto pt-8 flex items-end justify-between z-10">
        <div>
          <p className="text-xs text-slate-500 mb-1">Account Holder</p>
          <p className="text-slate-300 font-mono tracking-wide">{username}</p>
          {/* Ideally this username should be passed in props too, simplified for visual */}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-end">
            <div className="flex items-center text-green-400 text-xs font-medium bg-green-950/30 px-2 py-1 rounded-lg border border-green-900/50 mb-1">
              <TrendingUp size={12} className="mr-1" /> +2.5%
            </div>
            <p className="text-[10px] text-slate-500">vs last month</p>
          </div>
        </div>
      </div>
    </div>
  );
}
