"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Image src="/favicon.png" alt="Logo" width={50} height={50} />
            <span className="font-bold text-2xl tracking-tight text-white">
              Geepay
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <div className="flex items-center gap-4 ml-4">
              <Link
                href="/auth/login"
                className="text-sm font-bold text-white hover:text-secondary transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-slate-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-slate-900 border-b border-white/10 absolute top-20 left-0 w-full"
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link
              href="#features"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-white/10 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-white/10 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col gap-3">
              <Link
                href="/auth/login"
                className="block w-full text-center px-4 py-3 rounded-lg border-2 border-primary/20 hover:border-primary text-white font-bold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="block w-full text-center px-4 py-3 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/25"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
