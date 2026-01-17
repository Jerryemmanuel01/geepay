"use client";
import { motion } from "framer-motion";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-slate-50 dark:bg-slate-800/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Get started with Geepay in just a few simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-linear-to-r from-primary to-secondary opacity-20" />

          {[
            {
              id: 1,
              title: "Register & Verify",
              desc: "Create your account and verify your email to get started securely.",
            },
            {
              id: 2,
              title: "Get Approved",
              desc: "Your account is reviewed by our administrators to ensure community safety.",
            },
            {
              id: 3,
              title: "Manage Savings",
              desc: "Deposit funds, track your personal balance, and withdraw with ease.",
            },
          ].map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center z-10"
            >
              <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 border-4 border-slate-100 dark:border-slate-700 flex items-center justify-center text-3xl font-black text-primary shadow-xl mb-6">
                {step.id}
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">
                {step.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
