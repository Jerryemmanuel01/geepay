"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Image from "next/image";
import dashboardImg from "../../assets/geepay-dashboard.png";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[70%] rounded-full bg-secondary/10 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[60%] rounded-full bg-accent/10 blur-3xl animate-[pulse_6s_ease-in-out_infinite_1s]" />
        <div className="absolute bottom-0 right-0 w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-6 border border-secondary/20">
              Revolutionizing Savings Management
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
              Manage your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
                savings records
              </span>{" "}
              with ease.
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Geepay provides a centralized, transparent, and secure platform
              for savings tracking. Say goodbye to messy spreadsheets.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/signup">
                <button className="px-8 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all flex items-center gap-2">
                  Start Saving <ArrowRight size={20} />
                </button>
              </Link>
              <Link href="#how-it-works">
                <button className="px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                  How it Works
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Image / Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-16 md:mt-24 relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 glass-card p-2 md:p-4">
              <div className="rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 relative group aspect-video">
                <Image
                  src={dashboardImg}
                  alt="Geepay Dashboard"
                  fill
                  className="object-contain"
                  placeholder="blur"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
