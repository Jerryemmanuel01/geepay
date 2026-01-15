"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Wallet } from "lucide-react";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24 bg-white dark:bg-slate-900 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            Why Choose Geepay?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We bring trust and structure to your informal financial circles.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<ShieldCheck className="text-white" size={32} />}
            color="bg-primary"
            title="Secure & Transparent"
            description="Every transaction is recorded and visible to authorized members. No more doubts about who paid what."
          />
          <FeatureCard
            icon={<Users className="text-white" size={32} />}
            color="bg-secondary"
            title="Peer Collaboration"
            description="Seamlessly invite members, assign roles, and manage larger groups without the administrative headache."
          />
          <FeatureCard
            icon={<Wallet className="text-white" size={32} />}
            color="bg-accent"
            title="Automated Tracking"
            description="Real-time balance updates, contribution history, and financial summaries at your fingertips."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  color,
  title,
  description,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all"
    >
      <div
        className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-6 shadow-lg`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
