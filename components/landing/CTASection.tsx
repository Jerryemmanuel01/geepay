"use client";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 bg-linear-to-br from-primary to-accent relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/20 rounded-full blur-3xl -ml-10 -mb-10" />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
          Ready to organize your finances?
        </h2>
        <p className="text-xl text-white/90 mb-10 font-medium">
          Join thousands of users who trust Geepay for their collective savings.
        </p>
        <Link href="/auth/signup">
          <button className="px-10 py-5 bg-white text-primary rounded-full font-bold text-xl shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all">
            Create Free Account
          </button>
        </Link>
      </div>
    </section>
  );
}
