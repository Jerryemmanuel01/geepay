"use client";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Image src="/favicon.png" alt="Logo" width={50} height={50} />
              <span className="font-bold text-xl text-white">Geepay</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm">
              Empowering communities to manage shared resources with trust and
              transparency.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Geepay. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-slate-500 hover:text-slate-300 text-sm"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-slate-500 hover:text-slate-300 text-sm"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
